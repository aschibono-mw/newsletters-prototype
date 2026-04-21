// ─── LLM provider: Groq (primary) + OpenRouter (fallback) ─────────────────────
//
// Groq: free, no credit card, responses in <2 seconds
//   → get a key at console.groq.com → add VITE_GROQ_API_KEY to .env
//
// OpenRouter: free tier backup if Groq key not set
//   → key already in VITE_OPENROUTER_API_KEY

const GROQ_KEY       = import.meta.env.VITE_GROQ_API_KEY
const OPENROUTER_KEY = import.meta.env.VITE_OPENROUTER_API_KEY

// Groq free models — fast (<2s), reliable JSON output
const GROQ_MODELS = {
  openai:    'llama-3.1-8b-instant',
  anthropic: 'llama3-8b-8192',
  gemini:    'llama-3.3-70b-versatile',
}

// OpenRouter fallback — free tier auto-router
const OPENROUTER_MODELS = {
  openai:    'openrouter/free',
  anthropic: 'openrouter/free',
  gemini:    'openrouter/free',
}

const TIMEOUT_MS  = 35_000
const MAX_RETRIES = 7

export const sleep = ms => new Promise(r => setTimeout(r, ms))

async function fetchWithTimeout(url, options) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } catch (err) {
    if (err.name === 'AbortError') throw new Error(`Request timed out after ${TIMEOUT_MS / 1000}s`)
    throw err
  } finally {
    clearTimeout(timeoutId)
  }
}

// Parse Groq's retry-after headers — they can be seconds (number) or ISO duration
function parseRetryAfter(res, attempt) {
  const raw = res.headers.get('retry-after') || res.headers.get('x-ratelimit-reset-requests') || ''

  // ISO 8601 duration e.g. "PT14.32S"
  const isoMatch = raw.match(/PT(\d+(?:\.\d+)?)S/)
  if (isoMatch) return Math.ceil(parseFloat(isoMatch[1]))

  // Plain seconds
  const n = parseInt(raw, 10)
  if (!isNaN(n) && n > 0) return n

  // Exponential back-off fallback: 10s, 14s, 19s, 25s, 32s, 40s, 50s
  return Math.min(10 + Math.round(attempt * attempt * 1.5), 60)
}

async function callGroq(model, prompt, { jsonMode = false, onRetry = null } = {}) {
  if (!GROQ_KEY) throw new Error('VITE_GROQ_API_KEY not set')

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    let res

    try {
      res = await fetchWithTimeout('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_KEY}`,
        },
        body: JSON.stringify({
          model: GROQ_MODELS[model],
          messages: [
            {
              role: 'system',
              content: jsonMode
                ? 'You are a helpful assistant. Respond with valid JSON only — no markdown, no explanation, no extra text.'
                : 'You are a helpful assistant.',
            },
            { role: 'user', content: prompt },
          ],
          max_tokens: 2000,
          temperature: 0.3,
        }),
      })
    } catch (fetchErr) {
      // Network error or timeout — retry with backoff
      if (attempt < MAX_RETRIES) {
        const wait = Math.min(8 + attempt * 5, 40)
        onRetry?.({ attempt: attempt + 1, maxAttempts: MAX_RETRIES, waitSeconds: wait, startedAt: Date.now() })
        await sleep(wait * 1000)
        continue
      }
      throw fetchErr
    }

    // Rate-limited (429) or server overloaded (503 / 529)
    if (res.status === 429 || res.status === 503 || res.status === 529) {
      if (attempt < MAX_RETRIES) {
        const wait = parseRetryAfter(res, attempt)
        onRetry?.({ attempt: attempt + 1, maxAttempts: MAX_RETRIES, waitSeconds: wait, startedAt: Date.now() })
        await sleep(wait * 1000)
        continue
      }
      // Exhausted retries
      const data = await res.json().catch(() => ({}))
      throw new Error(data.error?.message || `Rate limited after ${MAX_RETRIES} retries`)
    }

    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error?.message || `Groq error ${res.status}`)
    const content = data.choices?.[0]?.message?.content
    if (!content) throw new Error('Empty response from Groq')
    return content
  }

  throw new Error(`Groq model ${model} exhausted all retries`)
}

async function callOpenRouter(model, prompt, { jsonMode = false } = {}) {
  if (!OPENROUTER_KEY) throw new Error('VITE_OPENROUTER_API_KEY not set')
  const res = await fetchWithTimeout('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENROUTER_KEY}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'GenAI Lens',
    },
    body: JSON.stringify({
      model: OPENROUTER_MODELS[model],
      messages: [
        {
          role: 'system',
          content: jsonMode
            ? 'You are a helpful assistant. Respond with valid JSON only — no markdown, no explanation, no extra text.'
            : 'You are a helpful assistant.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.3,
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message || `OpenRouter error ${res.status}`)
  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error('Empty response from OpenRouter')
  return content
}

// ─── Unified entry point ───────────────────────────────────────────────────────
// Uses Groq if VITE_GROQ_API_KEY is set, falls back to OpenRouter

export async function runModel(model, prompt, options = {}) {
  if (GROQ_KEY) {
    return callGroq(model, prompt, options)
  }
  return callOpenRouter(model, prompt, options)
}

// ─── Available models list ─────────────────────────────────────────────────────

export const MODELS = ['openai', 'anthropic', 'gemini']

export const MODEL_META = {
  openai:    { label: 'Llama 3.1 8B',  color: '#10a37f', letter: 'L' },
  anthropic: { label: 'Llama 3 8B',    color: '#4285f4', letter: 'L3' },
  gemini:    { label: 'Llama 3.3 70B', color: '#ff6b35', letter: 'L3' },
}
