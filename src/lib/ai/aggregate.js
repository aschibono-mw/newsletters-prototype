import { runModel } from './runModel.js'
import {
  buildBrandEnrichmentPrompt,
  buildAIPerspectivesPrompt,
  buildCompetitorDiscoveryPrompt,
  buildSynthesisPrompt,
  buildPerspectivePrompt,
  buildExecutiveBriefPrompt,
  buildActionsPrompt,
} from './prompts.js'

// ─── JSON extraction helper ───────────────────────────────────────────────────

export function parseJSON(text) {
  if (!text) throw new Error('Empty response')

  // Strip markdown fences (``` or ```json or ```JSON)
  let s = text.replace(/```[\w]*\n?/gi, '').replace(/```/g, '').trim()

  // Try direct parse first
  try {
    return JSON.parse(s)
  } catch {
    // continue to next strategy
  }

  // Find the outermost [...] array — greedy from first [ to last ]
  const arrStart = s.indexOf('[')
  const arrEnd   = s.lastIndexOf(']')
  if (arrStart !== -1 && arrEnd > arrStart) {
    const candidate = s.slice(arrStart, arrEnd + 1)
    try {
      return JSON.parse(candidate)
    } catch {
      // continue to cleanup attempt
    }

    // Try fixing common issues: trailing commas before ] or }
    const cleaned = candidate
      .replace(/,\s*([}\]])/g, '$1')   // remove trailing commas
      .replace(/'/g, '"')               // single → double quotes
    try {
      return JSON.parse(cleaned)
    } catch {
      // continue to next strategy
    }
  }

  // Try finding outermost {...} object
  const objStart = s.indexOf('{')
  const objEnd   = s.lastIndexOf('}')
  if (objStart !== -1 && objEnd > objStart) {
    const candidate = s.slice(objStart, objEnd + 1)
    try {
      return JSON.parse(candidate)
    } catch {
      // continue to cleanup attempt
    }

    const cleaned = candidate
      .replace(/,\s*([}\]])/g, '$1')
      .replace(/'/g, '"')
    try {
      return JSON.parse(cleaned)
    } catch {
      // unable to parse, fall through to error
    }
  }

  console.error('[parseJSON] Could not parse:', s.slice(0, 300))
  throw new Error('Could not parse JSON from model response')
}

// ─── Brand enrichment ─────────────────────────────────────────────────────────

export async function enrichBrand(brand) {
  const prompt = buildBrandEnrichmentPrompt(brand)
  try {
    const response = await runModel('gemini', prompt)
    return response.trim().replace(/^["']|["']$/g, '')
  } catch {
    return ''
  }
}

// Try a list of models in order until one succeeds
async function tryModels(models, prompt, options = {}) {
  for (const model of models) {
    try {
      const response = await runModel(model, prompt, options)
      return response
    } catch (err) {
      console.warn(`[aggregate] ${model} failed:`, err.message)
    }
  }
  throw new Error('All models failed')
}

// Use gemini (llama-3.3-70b) as primary synthesis — most capable available model
const SYNTHESIS_MODELS = ['gemini', 'anthropic']

// ─── URL generation per competitor ────────────────────────────────────────────

function generateCompetitorUrls(name, domain) {
  // Derive a clean slug from the name (e.g. "Sprout Social" → "sproutsocial")
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '')
  const domainBase = domain.replace(/\.(com|io|co|net|org).*$/, '')

  const urls = [domain]

  // Company / investor subdomain variants
  if (!domain.startsWith('www.')) urls.push(`www.${domain}`)
  if (domainBase !== slug) urls.push(`${slug}.com`)

  // Social media — use both slug and domainBase in case they differ
  const handle = slug
  urls.push(
    `twitter.com/${handle}`,
    `linkedin.com/company/${handle}`,
    `instagram.com/${handle}`,
    `facebook.com/${handle}`,
    `youtube.com/@${handle}`,
    `tiktok.com/@${handle}`,
  )

  // Deduplicate and return
  return [...new Set(urls)]
}

// ─── AI Perspective Generation ────────────────────────────────────────────────

export async function generateAIPerspectives(brand, brandContext = '') {
  const prompt = buildAIPerspectivesPrompt(brand, brandContext)
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await runModel('gemini', prompt, { jsonMode: true })
      const parsed = parseJSON(response)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((p, i) => ({
          id: `ai-${Date.now()}-${i}`,
          question: p.question || '',
          description: p.description || '',
        }))
      }
    } catch (err) {
      console.warn(`[generateAIPerspectives] attempt ${attempt + 1} failed:`, err.message)
    }
  }
  return []
}

// ─── Competitor Discovery ─────────────────────────────────────────────────────

export async function discoverCompetitors(brand, brandContext = '') {
  const prompt = buildCompetitorDiscoveryPrompt(brand, brandContext)

  let parsed = null
  let lastError = null

  // Use gemini slot (llama-3.3-70b-versatile) — most capable, reliable model
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await runModel('gemini', prompt, { jsonMode: true })
      console.log(`[discoverCompetitors] attempt ${attempt + 1} raw:`, response.slice(0, 400))
      parsed = parseJSON(response)
      if (Array.isArray(parsed) && parsed.length > 0) break
    } catch (err) {
      lastError = err
      console.warn(`[discoverCompetitors] attempt ${attempt + 1} failed:`, err.message)
    }
  }

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw lastError || new Error('No competitors returned')
  }

  return parsed
    .filter(c => c.name && c.domain)
    .map((c, i) => {
      const urls = generateCompetitorUrls(c.name, c.domain)
      return {
        id: Date.now() + i,
        name: c.name,
        domain: c.domain,
        urls,
        urlCount: urls.length,
        selected: true,
      }
    })
}

// ─── Synthesis ────────────────────────────────────────────────────────────────

export async function synthesizeResults(brand, competitors, rawResponses, brandContext = '') {
  const prompt = buildSynthesisPrompt(brand, competitors, rawResponses, brandContext)
  const response = await tryModels(SYNTHESIS_MODELS, prompt, { jsonMode: true })
  return parseJSON(response)
}

// ─── Perspectives ─────────────────────────────────────────────────────────────

export async function analyzePerspectives(perspectives, brand, synthesisResult, rawResponses, brandContext = '') {
  const enabled = perspectives.filter(p => p.enabled)

  const settled = await Promise.allSettled(
    enabled.map(async perspective => {
      const prompt = buildPerspectivePrompt(perspective, brand, synthesisResult, rawResponses, brandContext)
      try {
        const response = await tryModels(SYNTHESIS_MODELS, prompt, { jsonMode: true })
        const parsed = parseJSON(response)
        return { id: perspective.id, question: perspective.question, ...parsed }
      } catch {
        return {
          id: perspective.id,
          question: perspective.question,
          insight: 'Analysis unavailable for this perspective.',
          signals: [],
          riskOrOpportunity: '',
        }
      }
    })
  )

  return settled
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value)
}

// ─── Executive Brief ──────────────────────────────────────────────────────────

export async function generateExecutiveBrief(brand, synthesisResult) {
  const prompt = buildExecutiveBriefPrompt(brand, synthesisResult)
  const response = await tryModels(SYNTHESIS_MODELS, prompt)
  return parseJSON(response)
}

// ─── Actions ─────────────────────────────────────────────────────────────────

export async function generateActions(brand, synthesisResult) {
  const prompt = buildActionsPrompt(brand, synthesisResult)
  const response = await tryModels(SYNTHESIS_MODELS, prompt)
  const parsed = parseJSON(response)
  return Array.isArray(parsed) ? parsed : []
}
