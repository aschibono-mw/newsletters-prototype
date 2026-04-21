# Playground - Prototype Collection

A collection of lightweight prototype applications built with React 19, Vite 7, and Material-UI 7.

## Apps Included

### Landing Pages

#### Home (`/`)
Centered hero landing page with search and quick navigation.

#### Insights (`/insights`)
Left-aligned hero with stats row and card grid.

**Features:**
- Left-aligned hero with Actions dropdown
- Stats row (3 metric cards)
- Filter tabs and card grid
- ArrowDropDownIcon for dropdown carets

#### Discover (`/discover`)
Left-aligned hero with filter tabs and content cards.

**Features:**
- Left-aligned hero with Actions dropdown
- Category filter tabs
- Card grid with hover states
- Consistent grey.100 background

#### Workspace (`/workspace`)
Left-aligned hero with team presence and 3 stacked modules.

**Features:**
- Stats row + team avatar stack
- Quick Access cards (3 cards with halo icons)
- Emerging section (3 AI-generated insight cards with images)
- Recommendations section (2 horizontal image cards)

#### Hub (`/hub`)
Centered hero with search bar and CRUD table.

**Features:**
- Centered hero with search bar
- "Need help?" link
- 3 Quick Access cards with halo icons
- Full CRUD table (add, edit, delete)
- Snackbar confirmations

### Seats Management (V10 - Current)

#### Seats V10 (`/seats-v10`)
Full user management with CRUD for users, roles, workspaces, and groups.

**Features:**
- Stat cards (Platform, View-Only, Interactor seats)
- TableHeader with filter chips and bulk actions
- User detail pages with tabbed views
- Role, workspace, and group management pages

#### Seats V2 (`/seats-v2`)
Earlier accordion-based grouping (archived for reference).

Note: V5-V9 archived in `src/pages/_archived/`

### Drawer Test (`/drawer-test`)
Drawer and sidebar pattern showcase.

**Features:**
- Settings-style grid layout (no hero)
- 6 drawer trigger cards (2 rows of 3)
- Quick Reference table
- Various drawer positions and widths

### AI Automation Setup (`/automation`)
Natural language automation rule creation with AI assistance.

**Features:**
- Toggle between AI Setup and Classic Setup
- Natural language input with example prompts
- AI-generated rule preview with conditions and actions
- Confirm/reject workflow before saving
- Card-based rule collection (max 6 rules)
- Active/inactive toggle for each rule

### Users & Groups Management (`/users`)
Organize users into groups for reporting and classification.

**Features:**
- Create and delete groups with unique names
- Assign up to 10 groups per user
- Multi-group filtering with AND logic
- Edit user groups via modal dialog
- Export users with group assignments to CSV

### API Token Management (`/api-tokens`)
Generate and manage API tokens with usage tracking.

**Features:**
- Generate up to 10 API tokens
- 2-step creation flow (name input → token display)
- Security warning about one-time token visibility
- Copy to clipboard functionality
- Token usage tracking (created date, last used, usage count)
- Revoke tokens with confirmation

### Studio (`/studio`)
AI-powered studio workspace with project management.

**Features:**
- Project selector with search, create, and manage options
- Chat history sidebar with slide-in animation
- AI companion interface
- Project context management
- Suggested prompts for quick actions

### Layout Demo (`/layout-demo`)
Advanced layout patterns with hybrid sidebar animations.

**Features:**
- 2-column content feed with insights panel
- Hybrid animation pattern for sidebars (slide in, fade out)
- Drilldown navigation with back button
- Filter controls, sorting, and search

### DS Collection (`/ds-collection`)
Design system component showcase and documentation.

**Features:**
- Comprehensive component library with 35+ components
- Categories: Inputs, Data Display, Feedback, Surfaces, Navigation, Tokens
- Live examples with all variants and states
- Responsive card grid with click-through detail pages
- Supports 4 palette modes (light + 3 colorblind variants)
- Live theme switching with palette selector

## Tech Stack

- **React 19** - Latest React with JSX
- **Vite 7** - Fast build tool with hot reload
- **Material-UI 7** - Component library
- **React Router 7** - Client-side routing
- **Emotion** - CSS-in-JS styling

## Design System

Uses simplified theme based on design-system-viewer tokens:
- **Brand Colors:** Teal (#0891B2) primary, Purple (#A21CAF) secondary
- **Typography:** Inter font family
- **Spacing:** 8px base unit
- **Border Radius:** 6px default
- **Status Colors:** Green (success), Orange (warning), Red (error), Blue (info)

## Development

### Install Dependencies
```bash
npm install
```

### Run Dev Server
```bash
npm run dev:playground
```

App runs at `http://localhost:5173` (or next available port)

### Build for Production
```bash
npm run build:playground
```

### Lint
```bash
npm run lint
```

## Project Structure

```
playground/
├── src/
│   ├── pages/
│   │   ├── HomePage.jsx                  # Centered hero LP
│   │   ├── InsightsPage.jsx              # Left-aligned hero LP
│   │   ├── DiscoverPage.jsx              # Left-aligned hero LP
│   │   ├── WorkspacePage.jsx             # Left-aligned hero LP
│   │   ├── HubPage.jsx                   # Centered hero + CRUD LP
│   │   ├── SeatsPage.jsx                 # Seats V1 (flat table)
│   │   ├── SeatsPageV2.jsx               # Seats V2 (accordions)
│   │   ├── SeatsPageV3.jsx               # Seats V3 (dialog-based)
│   │   ├── SeatsPageV4.jsx               # Seats V4 (settings grid)
│   │   ├── DrawerTestPage.jsx            # Drawer patterns
│   │   ├── AutomationSetupPage.jsx       # AI automation
│   │   ├── ApiTokensPage.jsx             # API token management
│   │   ├── UsersPage.jsx                 # Users & groups
│   │   ├── StudioPage.jsx                # Mira Studio
│   │   ├── LayoutDemoPage.jsx            # Layout patterns
│   │   └── DSCollectionPage.jsx          # Design system viewer
│   ├── components/
│   │   ├── comparison/
│   │   │   └── ComparisonLayout.jsx      # 2-column comparison grid
│   │   ├── mui-baseline/                 # Vanilla MUI components
│   │   └── themed/                       # Custom-themed components
│   ├── config/
│   │   ├── navigationConfig.js           # Sidebar nav items
│   │   └── routesConfig.jsx              # Route definitions
│   ├── App.jsx                           # Main app with routing
│   ├── main.jsx                          # Entry point
│   ├── theme.js                          # MUI theme configuration
│   ├── theme-tokens.js                   # Design tokens
│   ├── createDynamicTheme.js             # Theme factory
│   └── palette-variants.js               # 4 palette definitions
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## Navigation

### Landing Pages
- **Home** (`/`) - Centered hero with search
- **Insights** (`/insights`) - Left-aligned hero with stats
- **Discover** (`/discover`) - Left-aligned hero with filters
- **Workspace** (`/workspace`) - Left-aligned hero with team presence
- **Hub** (`/hub`) - Centered hero with CRUD table

### Seats Management (V10)
- **Seats V10** (`/seats-v10`) - User management dashboard (current)
- **User Detail** (`/seats-v10/users/:userId`) - User detail pages
- **Roles** (`/seats-v10/roles`) - Role management
- **Workspaces** (`/seats-v10/workspaces`) - Workspace management
- **Groups** (`/seats-v10/groups`) - Group management

### Other Apps
- **Automation** (`/automation`) - AI rule creation
- **API Tokens** (`/api-tokens`) - Token management
- **Users** (`/users`) - User and group management
- **Drawer Test** (`/drawer-test`) - Drawer patterns
- **Layout Demo** (`/layout-demo`) - Layout patterns
- **Studio** (`/studio`) - AI workspace
- **DS Collection** (`/ds-collection`) - Design system components
- **Templates** (`/templates/*`) - 35+ page templates

## Key Features

- **Landing Page Patterns:** Left-aligned hero (stats/actions) and centered hero (search/help)
- **Settings Page Pattern:** No hero, header inline with content (DrawerTest, SeatsV4)
- **4 Palette Modes:** Light + 3 colorblind variants (Protanopia, Deuteranopia, Tritanopia)
- **Design System Integration:** Compare vanilla MUI with custom-themed components
- **Responsive Layout:** Adapts to mobile, tablet, and desktop screens
- **Mira Companion:** Slide-in chat interface (placeholder for future integration)
- **Consistent Styling:** grey.100 backgrounds, ArrowDropDownIcon carets, halo icons

## Notes

- **UI Prototype Only:** No backend integration, all data is simulated
- **Static Data:** Mock data resets on page refresh (no persistence)
- **Limits Enforced:** 6 automation rules max, 10 API tokens max, 10 groups per user max
- **Design System:** Uses themed MUI components from design-system-viewer
