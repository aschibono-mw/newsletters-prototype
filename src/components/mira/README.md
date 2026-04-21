# Mira Design System

Components that establish the distinct AI-powered visual identity for Mira features.

## When to Use Mira DS

Use Mira components when building:
- AI assistant interfaces (chat, responses, thinking states)
- Studio/Mira landing pages and features
- Prompt libraries and templates
- AI-generated content sections
- Features that emphasize the AI-powered nature

**Do NOT use Mira components for:**
- Standard CRUD interfaces (use core DS)
- Non-AI features like user management, settings
- Generic buttons, forms, tables (use MUI defaults)

## Design Tokens

### Colors
```js
// Primary gradient endpoints
MIRA_COLORS.pink     = '#B627A1'  // Start of gradient
MIRA_COLORS.teal     = '#00827F'  // End of gradient

// Background tints
MIRA_COLORS.palePink = '#F5E8F3'
MIRA_COLORS.paleCyan = '#E8F3F5'

// Text gradient
MIRA_COLORS.darkPurple = '#8B5A9B'
MIRA_COLORS.slateTeal  = '#5A7B8B'
```

### Gradients
```js
// Border/accent gradient (pink → teal)
MIRA_GRADIENTS.primary

// Background gradient (pale pink → pale cyan)
MIRA_GRADIENTS.background

// Text gradient (dark purple → slate teal)
MIRA_GRADIENTS.text
```

### Utility Functions
```js
import { getMiraGradientBorderSx } from '../../constants/miraStyles'

// Add gradient border to any element
<Box sx={getMiraGradientBorderSx(2)} />  // 2px border width
```

## Component Categories

### Foundations (`/foundations`)
Base visual components for establishing Mira identity:
- `MiraGradientBox` - Container with gradient background
- `MiraGradientText` - Typography with gradient text
- `MiraButton` - Gradient-styled buttons
- `MiraFrostedToolbar` - Glassmorphism toolbar

### Chat (`/chat`)
Components for chat/conversation interfaces:
- `MiraChatInput` - Pill-shaped chat input
- `MiraChatMessage` - User/assistant message bubbles
- `MiraThinkingState` - Animated thinking dots

### Cards (`/cards`)
Card-based display components:
- `MiraPromptCard` - Clickable prompt suggestion
- `MiraSourceCard` - AI source citation
- `MiraPromoBanner` - Feature announcement banner

### Chips (`/chips`)
Small indicator elements:
- `MiraChip` - Gradient-bordered tag/badge
- `MiraStreamToolbar` - Stream view navigation

### Progress (`/progress`)
Progress and activity indicators:
- `MiraProgressStub` - Processing status with activity log
- `MiraProgressHeader` - Status header with icons
- `MiraProgressBar` - Styled progress bar
- `MiraSourcesChip` - Source count chip
- `MiraStopButton` - Stop processing button
- `MiraActivityLog` - Expandable activity list
- `MiraActivityLogToggle` - Toggle for activity list

### Layout (`/layout`)
Page structures and documentation helpers:
- `MiraCompanion` - Slide-in companion panel
- `MiraSourcesPanel` - Sources list container
- `MiraDetailPageLayout` - Component documentation page
- `MiraVariantSection` - Section with gradient border
- `MiraPropsTable` - Props documentation table
- `MiraCodeBlock` - Code example display

## Import Patterns

```jsx
// Standard import (recommended)
import { MiraButton, MiraGradientText } from '../../components/mira'

// Category import for better organization
import { MiraGradientBox, MiraButton } from '../../components/mira/foundations'
import { MiraChatInput, MiraThinkingState } from '../../components/mira/chat'

// Layout components for documentation pages
import {
  MiraDetailPageLayout,
  MiraVariantSection,
  MiraPropsTable
} from '../../components/mira/layout'
```

## Guidelines

1. **Don't mix systems** - A page should use either Mira DS or core DS, not both extensively
2. **Reserve gradients for emphasis** - Use gradient text sparingly for headers, not body copy
3. **Maintain consistency** - Use established color tokens, don't create new variations
4. **Accessibility first** - Ensure sufficient contrast when using gradients on text
