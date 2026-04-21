// ─── Prompt builders ──────────────────────────────────────────────────────────

export function buildBrandEnrichmentPrompt(brand) {
  return `The company "${brand.name}" has website ${brand.website || brand.domain}.
Based on the website URL, in exactly 1 sentence describe: what industry this company is in and what their primary product or service is.
Important: be specific about THIS company at that URL — not any other company that might share a similar name.
Output only the 1-sentence description, no other text.`
}

export function buildAIPerspectivesPrompt(brand, brandContext = '') {
  const context = brandContext
    ? `${brand.name} — ${brandContext}`
    : `${brand.name} (${brand.website || brand.domain})`

  return `Generate 5 strategic questions to analyze how AI models perceive the brand: ${context}

Each question should probe a different angle specific to THIS brand's actual industry: positioning, credibility, audience fit, competitive standing, or narrative gaps. Do NOT use generic questions.

Output ONLY this JSON array:
[{"question":"<specific strategic question relevant to this brand's industry>","description":"<1-2 sentence explanation>"},{"question":"...","description":"..."},{"question":"...","description":"..."},{"question":"...","description":"..."},{"question":"...","description":"..."}]`
}

export function buildCompetitorDiscoveryPrompt(brand, brandContext = '') {
  const description = brandContext
    ? `${brand.name} — ${brandContext}`
    : `${brand.name} (${brand.website || brand.domain})`

  return `${description}

Return a JSON array of 6 real direct competitors of this specific company in its actual industry. No other text, just the array:
[{"name":"CompanyA","domain":"companya.com"},{"name":"CompanyB","domain":"companyb.com"},{"name":"CompanyC","domain":"companyc.com"},{"name":"CompanyD","domain":"companyd.com"},{"name":"CompanyE","domain":"companye.com"},{"name":"CompanyF","domain":"companyf.com"}]`
}

export function buildBrandPrompt(brand, competitors, brandContext = '') {
  const competitorList = competitors
    .filter(c => c.selected)
    .map(c => `- ${c.name} (${c.domain})`)
    .join('\n')

  const contextLine = brandContext
    ? `Company context: ${brand.name} — ${brandContext}`
    : `Brand: ${brand.name} (${brand.website || brand.domain})`

  return `${contextLine}
Competitors: ${competitorList || 'none provided'}

Analyze how this specific brand is perceived by AI language models and in online discourse.
Answer concisely:
1. What does this company do and who is it for?
2. How is it positioned vs competitors?
3. What are its 3 key strengths in AI perception?
4. What are its 3 key weaknesses or gaps in AI perception?
5. How well does AI accurately represent this brand?

Write 3 focused paragraphs. Be specific to this brand's actual industry.`
}

export function buildSynthesisPrompt(brand, competitors, rawResponses, brandContext = '') {
  const responseTexts = Object.entries(rawResponses)
    .filter(([, text]) => text && text.trim())
    .map(([model, text]) => `[${model}]: ${text.slice(0, 350)}`)
    .join('\n')

  const competitorNames = competitors
    .filter(c => c.selected)
    .slice(0, 4)
    .map(c => c.name)

  const contextLine = brandContext
    ? `${brand.name} — ${brandContext}`
    : `${brand.name} (${brand.website})`

  return `Analyzing: ${contextLine}
Competitors: ${competitorNames.join(', ')}

AI model observations:
${responseTexts}

Output ONLY this JSON object, replace ALL angle-bracket placeholders with real values:
{"narrative":"<2-3 sentence summary of how AI models collectively perceive this brand in its actual industry>","stats":{"visibilityScore":<0-100 how often AI mentions this brand in relevant queries>,"positiveSentiment":<0-100 positive tone %>,"aiAccuracy":<0-100 how accurately AI describes what this company actually does>,"shareOfVoice":<0-100 estimated % share vs competitors>,"citationFrequency":<0-100 how frequently cited>,"topThreeMentionRate":<0-100 how often in top 3 results>,"competitiveRank":<integer rank 1-${competitorNames.length + 1}>,"brandClarity":<0-100 how clearly AI identifies the brand>,"narrativeControl":<0-100>,"audienceAccuracy":<0-100>},"competitivePosition":[{"name":"${brand.name}","score":<0-100>},${competitorNames.map(n => `{"name":"${n}","score":<0-100>}`).join(',')}],"differentiators":[{"label":"<key differentiator relevant to this brand's industry>","status":"Strong presence","level":"strong"},{"label":"<differentiator>","status":"Moderate recognition","level":"moderate"},{"label":"<differentiator>","status":"Underrepresented","level":"weak"},{"label":"<differentiator>","status":"Moderate recognition","level":"moderate"},{"label":"<differentiator>","status":"Underrepresented","level":"weak"}],"strengths":["<s1>","<s2>","<s3>"],"weaknesses":["<w1>","<w2>","<w3>"],"positioning":"<1 sentence>","competitiveSummary":"<1 sentence>","risks":["<r1>","<r2>","<r3>"]}`
}

export function buildPerspectivePrompt(perspective, brand, synthesisResult, rawResponses, brandContext = '') {
  const context = brandContext
    ? `${brand.name} — ${brandContext}`
    : brand.name
  const key = synthesisResult
    ? `Positioning: ${synthesisResult.positioning || ''}. Strengths: ${(synthesisResult.strengths || []).join(', ')}. Weaknesses: ${(synthesisResult.weaknesses || []).join(', ')}.`
    : ''

  return `Brand: ${context}
${key}

Answer this question about the brand's AI perception: "${perspective.question}"

Output ONLY this JSON:
{"insight":"<2 sentence direct answer specific to this brand's industry>","signals":["<specific signal 1>","<specific signal 2>","<specific signal 3>"],"riskOrOpportunity":"<1 sentence risk or opportunity>"}`
}

export function buildExecutiveBriefPrompt(brand, synthesisResult) {
  const summary = synthesisResult
    ? `Narrative: ${synthesisResult.narrative || ''}. Strengths: ${(synthesisResult.strengths || []).join(', ')}. Risks: ${(synthesisResult.risks || []).join(', ')}.`
    : `Brand: ${brand.name}`

  return `Executive brief for AI visibility analysis of "${brand.name}".
${summary}

Return ONLY valid JSON (no markdown):
{
  "headline": "<1–2 sentence executive summary: key finding + recommended action>",
  "findings": [
    { "severity": "high", "title": "<finding title>", "description": "<2–3 sentence explanation>" },
    { "severity": "medium", "title": "<finding title>", "description": "<2–3 sentence explanation>" },
    { "severity": "low", "title": "<finding title>", "description": "<2–3 sentence explanation>" }
  ],
  "opportunities": [
    { "title": "<strategic opportunity>", "description": "<2–3 sentences on what to do and why>" },
    { "title": "<strategic opportunity>", "description": "<2–3 sentences>" },
    { "title": "<strategic opportunity>", "description": "<2–3 sentences>" }
  ],
  "actionItems": [
    "<specific, actionable task 1>",
    "<specific, actionable task 2>",
    "<specific, actionable task 3>",
    "<specific, actionable task 4>",
    "<specific, actionable task 5>"
  ]
}`
}

export function buildActionsPrompt(brand, synthesisResult) {
  const summary = synthesisResult
    ? `Strengths: ${(synthesisResult.strengths || []).join(', ')}. Weaknesses: ${(synthesisResult.weaknesses || []).join(', ')}. Risks: ${(synthesisResult.risks || []).join(', ')}.`
    : `Brand: ${brand.name}`

  return `Generate 6 prioritized strategic actions to improve AI visibility for "${brand.name}".
${summary}

Return ONLY a valid JSON array (no markdown):
[
  {
    "id": 1,
    "priority": "HIGH",
    "title": "<specific action title>",
    "description": "<2–3 sentence description of the action and its expected impact>",
    "effort": "Large",
    "signals": "<N risk signals · Expected Effect>"
  }
]

Rules:
- 2 HIGH priority, 4 MEDIUM priority
- Effort must be exactly: Small, Medium, or Large
- Actions must be specific and derived from the analysis findings
- Order by priority then effort (quick wins first within each tier)`
}
