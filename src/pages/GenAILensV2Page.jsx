import { useState, useCallback, useRef } from 'react'
import GenAIOnboarding from '../components/genai-lens/GenAIOnboarding'
import GenAIMainLayout from '../components/genai-lens/GenAIMainLayout'
import { runModel, sleep, MODELS, MODEL_META } from '../lib/ai/runModel.js'
import { buildBrandPrompt } from '../lib/ai/prompts.js'
import {
  enrichBrand,
  discoverCompetitors,
  generateAIPerspectives,
  synthesizeResults,
  analyzePerspectives,
  generateExecutiveBrief,
  generateActions,
} from '../lib/ai/aggregate.js'

// ─── Default perspectives ─────────────────────────────────────────────────────

const DEFAULT_PERSPECTIVES = [
  { id: 1, question: 'How are we being described?',       description: 'Brand Persona — Defines how AI models characterize your brand identity, positioning language, and market category consistently across AI-generated answers.', enabled: true },
  { id: 2, question: 'What do they say we do?',           description: 'Product Clarity — Whether AI systems accurately represent your core offerings, feature sets, and use cases.', enabled: true },
  { id: 3, question: 'Are we seen as credible?',          description: 'Trust & Credibility — How AI models weigh trust signals about your organization.', enabled: true },
  { id: 4, question: 'How do we compare?',                description: 'Competitive Position — How you appear relative to direct alternatives.', enabled: true },
  { id: 5, question: 'Who do they think we serve?',       description: 'Audience Clarity — Whether AI correctly identifies your ideal buyer persona and company size.', enabled: true },
  { id: 6, question: "How is the brand's relationship with social media platforms and data privacy when described?", description: "In an era of restricted API access, the brand's perceived legitimacy in data sourcing shapes its competitive narrative.", enabled: true },
]

// ─── Initial analysis state ───────────────────────────────────────────────────

function initialAnalysis() {
  return {
    status: 'idle',          // 'idle' | 'running' | 'complete' | 'error'
    progress: 0,
    modelStatus: Object.fromEntries(MODELS.map(m => [m, 'pending'])),
    modelRetry: {},          // { [model]: { attempt, maxAttempts, waitSeconds, startedAt } | null }
    results: null,
    rawResponses: {},
    error: null,
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GenAILensV2Page() {
  const [view, setView]                       = useState('onboarding')
  const [brand, setBrand]                     = useState({ name: '', website: '' })
  const [competitors, setCompetitors]         = useState([])
  const [competitorsLoading, setCompetitorsLoading] = useState(false)
  const [competitorsError, setCompetitorsError] = useState(null)
  const [aiSuggestedPerspectives, setAiSuggestedPerspectives] = useState([])
  const [aiPerspectivesLoading, setAiPerspectivesLoading] = useState(false)
  const [perspectives, setPerspectives]       = useState(DEFAULT_PERSPECTIVES)
  const [activeTab, setActiveTab]             = useState('brand-perception')
  const [analysis, setAnalysis]               = useState(initialAnalysis)
  const [brandContext, setBrandContext]       = useState('')

  // Guard against stale async updates after re-analyze
  const runIdRef = useRef(0)

  // ── Competitor discovery (called when user finishes Step 1) ───────────────────

  const handleBrandComplete = useCallback(async (brandData) => {
    setCompetitors([])
    setCompetitorsError(null)
    setCompetitorsLoading(true)
    setAiSuggestedPerspectives([])
    setAiPerspectivesLoading(true)
    setBrandContext('')

    // Phase 0: Enrich brand FIRST so context anchors all downstream calls
    let ctx = ''
    try {
      ctx = await enrichBrand(brandData)
    } catch (e) {
      console.warn('[enrichBrand] failed:', e.message)
    }
    setBrandContext(ctx)
    console.log(`[Brand Enrichment] ${brandData.name}: ${ctx}`)

    // Phase 1: Discover competitors and perspectives using the brand context
    const [competitorResult, perspectivesResult] = await Promise.allSettled([
      discoverCompetitors(brandData, ctx),
      generateAIPerspectives(brandData, ctx),
    ])

    if (competitorResult.status === 'fulfilled') {
      setCompetitors(competitorResult.value)
    } else {
      console.error('[handleBrandComplete] competitor discovery failed:', competitorResult.reason)
      setCompetitorsError(competitorResult.reason?.message || 'Could not discover competitors automatically')
    }

    if (perspectivesResult.status === 'fulfilled') {
      setAiSuggestedPerspectives(perspectivesResult.value)
    }

    setCompetitorsLoading(false)
    setAiPerspectivesLoading(false)
  }, [])

  // ── Helpers ──────────────────────────────────────────────────────────────────

  const setModelStatus = useCallback((runId, model, status) => {
    if (runIdRef.current !== runId) return
    setAnalysis(prev => ({
      ...prev,
      modelStatus: { ...prev.modelStatus, [model]: status },
    }))
  }, [])

  const setProgress = useCallback((runId, value) => {
    if (runIdRef.current !== runId) return
    setAnalysis(prev => ({ ...prev, progress: value }))
  }, [])

  // ── Run analysis ─────────────────────────────────────────────────────────────

  const runAnalysis = useCallback(async () => {
    const runId = ++runIdRef.current

    setAnalysis({
      status: 'running',
      progress: 0,
      modelStatus: Object.fromEntries(MODELS.map(m => [m, 'pending'])),
      modelRetry: {},
      results: null,
      rawResponses: {},
      error: null,
    })

    const brandPrompt = buildBrandPrompt(brand, competitors, brandContext)
    const rawResponses = {}
    const completedModels = new Set()

    // ── Phase 1: Parallel model queries ──────────────────────────────────────
    // Stagger start times to reduce rate-limit bursts (200ms apart)

    const setModelRetry = (model, retryInfo) => {
      if (runIdRef.current !== runId) return
      setAnalysis(prev => ({
        ...prev,
        modelRetry: { ...prev.modelRetry, [model]: retryInfo },
      }))
    }

    const modelPromises = MODELS.map(async (model, i) => {
      // Stagger: 0ms, 200ms, 400ms
      await sleep(i * 200)
      if (runIdRef.current !== runId) return

      setModelStatus(runId, model, 'loading')

      try {
        const text = await runModel(model, brandPrompt, {
          onRetry: ({ attempt, maxAttempts, waitSeconds, startedAt }) => {
            setModelRetry(model, { attempt, maxAttempts, waitSeconds, startedAt })
          },
        })
        rawResponses[model] = text
        setModelRetry(model, null)   // clear retry badge on success
        setModelStatus(runId, model, 'complete')
      } catch (err) {
        console.error(`[runAnalysis] ${model} failed:`, err.message)
        rawResponses[model] = ''
        setModelRetry(model, null)
        setModelStatus(runId, model, 'error')
      }

      completedModels.add(model)
      const progress = Math.round((completedModels.size / MODELS.length) * 40)
      setProgress(runId, progress)
    })

    await Promise.allSettled(modelPromises)
    if (runIdRef.current !== runId) return

    setProgress(runId, 45)

    // ── Phase 2: Synthesis ────────────────────────────────────────────────────

    let synthesisResult = null
    try {
      synthesisResult = await synthesizeResults(brand, competitors, rawResponses, brandContext)
    } catch (err) {
      console.error('[runAnalysis] synthesis failed:', err)
      setAnalysis(prev => ({ ...prev, status: 'error', error: 'Synthesis failed. Check API keys.' }))
      return
    }

    if (runIdRef.current !== runId) return
    setProgress(runId, 60)

    // ── Phase 3: Perspectives + Brief + Actions in parallel ───────────────────

    const [perspectiveResults, brief, actions] = await Promise.all([
      analyzePerspectives(perspectives, brand, synthesisResult, rawResponses, brandContext)
        .then(r => { if (runIdRef.current === runId) setProgress(runId, 75); return r }),
      generateExecutiveBrief(brand, synthesisResult)
        .then(r => { if (runIdRef.current === runId) setProgress(runId, 85); return r })
        .catch(() => null),
      generateActions(brand, synthesisResult)
        .then(r => { if (runIdRef.current === runId) setProgress(runId, 95); return r })
        .catch(() => []),
    ])

    if (runIdRef.current !== runId) return

    // ── Phase 4: Store results ────────────────────────────────────────────────

    setAnalysis({
      status: 'complete',
      progress: 100,
      modelStatus: Object.fromEntries(
        MODELS.map(m => [m, rawResponses[m] ? 'complete' : 'error'])
      ),
      results: {
        ...synthesisResult,
        perspectiveResults: perspectiveResults || [],
        brief,
        actions: actions.length > 0 ? actions : null,
      },
      rawResponses,
      error: null,
    })
  }, [brand, competitors, perspectives, brandContext, setModelStatus, setProgress])

  // ── Event handlers ────────────────────────────────────────────────────────────

  const handleRunAnalysis = useCallback(() => {
    setView('app')
    setActiveTab('brand-perception')
    runAnalysis()
  }, [runAnalysis])

  const handleReanalyze = useCallback(() => {
    setActiveTab('brand-perception')
    runAnalysis()
  }, [runAnalysis])

  // ── Render ────────────────────────────────────────────────────────────────────

  if (view === 'onboarding') {
    return (
      <GenAIOnboarding
        brand={brand}
        setBrand={setBrand}
        competitors={competitors}
        setCompetitors={setCompetitors}
        competitorsLoading={competitorsLoading}
        competitorsError={competitorsError}
        onBrandComplete={handleBrandComplete}
        perspectives={perspectives}
        setPerspectives={setPerspectives}
        aiSuggestedPerspectives={aiSuggestedPerspectives}
        aiPerspectivesLoading={aiPerspectivesLoading}
        onComplete={handleRunAnalysis}
      />
    )
  }

  return (
    <GenAIMainLayout
      brand={brand}
      analysis={analysis}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      perspectives={perspectives}
      setPerspectives={setPerspectives}
      onReanalyze={handleReanalyze}
    />
  )
}
