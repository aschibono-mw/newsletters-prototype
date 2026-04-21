/**
 * Mira DS Components
 * Reusable components that establish a distinct AI-powered visual identity
 *
 * Component categories:
 * - foundations/: Base visual components (gradients, buttons, toolbars)
 * - chat/: Chat and conversation components
 * - cards/: Card-based display components
 * - chips/: Small indicator elements
 * - progress/: Progress and activity indicators
 * - layout/: Page layouts and structural components
 */

// ============================================
// FOUNDATIONS - Base visual components
// ============================================
export { default as MiraGradientBox } from './MiraGradientBox'
export { default as MiraGradientText } from './MiraGradientText'
export { default as MiraButton } from './MiraButton'
export { default as MiraFrostedToolbar } from './MiraFrostedToolbar'
export { default as MiraAvatar } from './MiraAvatar'

// ============================================
// CHAT - Conversation components
// ============================================
export { default as MiraChatInput } from './MiraChatInput'
export { default as MiraChatMessage } from './MiraChatMessage'
export { default as MiraThinkingState } from './MiraThinkingState'
export { default as MiraSuggestionChip } from './MiraSuggestionChip'
export { default as MiraFeedbackButtons } from './MiraFeedbackButtons'

// ============================================
// CARDS - Card-based displays
// ============================================
export { default as MiraPromptCard } from './MiraPromptCard'
export { default as MiraSourceCard } from './MiraSourceCard'
export { default as MiraPromoBanner } from './MiraPromoBanner'
export { default as MiraEmptyState } from './MiraEmptyState'

// ============================================
// CHIPS - Small elements
// ============================================
export { default as MiraChip } from './MiraChip'
export { default as MiraStreamToolbar } from './MiraStreamToolbar'

// ============================================
// PROGRESS - Activity indicators
// ============================================
export { default as MiraActivityMessage } from './MiraActivityMessage'
export { default as MiraProgressStub } from './MiraProgressStub'

// ============================================
// LAYOUT - Page structures
// ============================================
export { default as MiraSourcesPanel } from './MiraSourcesPanel'
export { default as MiraCompanion } from './MiraCompanion'

// Subdirectory re-exports for organized imports
export * from './foundations'
export * from './chat'
export * from './cards'
export * from './chips'
export * from './progress'
export * from './layout'
