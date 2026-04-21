# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install    # Install dependencies
npm run dev    # Dev server at localhost:5173
npm run build  # Production build
npm run lint   # ESLint
```

**Important:** Never run the server proactively. Ask the user to start it.

## Tech Stack

- React 19 (JSX, no TypeScript)
- Vite 7
- Material-UI 7
- React Router 7
- Emotion (CSS-in-JS)

## Architecture

### Entry Point

```
main.jsx → ThemedApp (ThemeProvider) → App.jsx (Router + Layout)
```

### Theme System

Light mode only with colorblind-accessible palettes available:

| Mode | Description |
|------|-------------|
| none | Default light theme |
| protanopia | Red-blind accessible |
| deuteranopia | Green-blind accessible |
| tritanopia | Blue-blind accessible |

**Key files:**
- `src/palette-variants.js` - Palette definitions
- `src/createDynamicTheme.js` - Theme factory
- `src/theme-tokens.js` - Design tokens

### Navigation

Configured in `src/config/navigationConfig.js`. Routes defined in `src/config/routesConfig.jsx`.

### Active Routes

| Area | Routes | Description |
|------|--------|-------------|
| **Seats V10** | `/seats-v10`, `/seats-v10/users/new`, `/seats-v10/users/:userId`, `/seats-v10/roles`, `/seats-v10/workspaces`, `/seats-v10/groups` | User & permissions management |
| **Account** | `/account-v10` | Account settings & usage |
| **Studio** | `/studio`, `/studio/library`, `/studio/projects`, `/studio/recurring/new`, `/studio/recurring/:promptId` | Mira AI assistant |
| **Core** | `/`, `/insights`, `/discover`, `/workspace`, `/hub` | Main app sections |
| **API** | `/api-tokens` | API token management |
| **DS Collection** | `/ds-collection`, `/mira-components/*` | Component showcase |

## Design Tokens

- **Primary:** Teal (#00827F)
- **Secondary:** Purple (#B627A1)
- **Spacing:** 8px base unit
- **Border radius:** 4px default

## Component Rules

### Chip vs Indicator

```jsx
// Grey chip for tags
<Chip label="Tag Name" />

// Indicator for colored status
<Indicator label="Active" status="active" />
<Indicator label="Pending" status="pending" />
```

**Chips are grey only.** Use `Indicator` for colored labels.

### TableHeader Component

Reusable header with two states:

```jsx
// Default state
<TableHeader
  title="Users"
  count={users.length}
  primaryAction={{ label: 'Create User', onClick: handleCreate }}
  showFind
  findValue={search}
  onFindChange={setSearch}
/>

// Selection state (selectedCount > 0)
<TableHeader
  selectedCount={selected.length}
  onClearSelection={() => setSelected([])}
  selectedActions={[
    { label: 'Delete', onClick: handleBulkDelete }
  ]}
/>
```

### Default Variants

| Component | Default |
|-----------|---------|
| TextField | Outlined |
| Select | Outlined |
| Button | Contained |
| Chip | Grey fill |

## Key Patterns

### Hover Actions (no layout shift)

```jsx
<TableRow
  sx={{
    '& .action-buttons': { opacity: 0 },
    '&:hover .action-buttons': { opacity: 1 },
  }}
>
  <TableCell>
    <Stack className="action-buttons">
      <IconButton><EditIcon /></IconButton>
    </Stack>
  </TableCell>
</TableRow>
```

### Filter Chips in Table Header

SeatsPageV10 pattern - filter dropdowns as chips in table toolbar:

```jsx
<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
  <Chip
    icon={<FilterListIcon />}
    label={`Seat Types${filters.length > 0 ? ` (${filters.length})` : ''}`}
    onClick={(e) => setFilterAnchor(e.currentTarget)}
    deleteIcon={<ArrowDropDownIcon />}
    variant="outlined"
  />
  <Menu anchorEl={filterAnchor} open={Boolean(filterAnchor)}>
    {options.map((opt) => (
      <MenuItem key={opt.id} onClick={() => toggleFilter(opt.id)}>
        <Checkbox checked={filters.includes(opt.id)} />
        <ListItemText primary={opt.label} />
      </MenuItem>
    ))}
  </Menu>
</Box>
```

### Accordion Arrows

```jsx
{expanded
  ? <ExpandMoreIcon />  // Points down when open
  : <ExpandMoreIcon sx={{ transform: 'rotate(-90deg)' }} />  // Points right when closed
}
```

### Panel Animations

```javascript
const getPanelStyles = (isOpen) => ({
  transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
  opacity: isOpen ? 1 : 0,
  visibility: isOpen ? 'visible' : 'hidden',
  transition: isOpen
    ? 'transform 0.3s ease, opacity 0.3s ease'
    : 'transform 0.3s ease, opacity 0.3s ease, visibility 0s linear 0.3s',
})
```

## Layout Structure

- **AppHeader** - Fixed 64px header
- **Sidebar** - 72px collapsed, 240px expanded
- **AI Chat panel** - 400px slide-in from right

## File Organization

```
src/
├── components/
│   ├── core/           # Shared DS components (Indicator, TableHeader, Sidebar, etc.)
│   ├── seats/          # Seats & permissions components
│   ├── studio/         # Studio page components
│   ├── mira/           # Mira AI assistant components
│   ├── home/           # HomePage components
│   ├── cards/          # Reusable card components
│   ├── docs/           # Documentation page components
│   ├── layout/         # Layout utilities
│   ├── charts/         # Chart components
│   └── themed/         # Themed MUI component variants
├── pages/
│   └── _archived/      # Previous versions (V5-V9)
├── config/             # Routes & navigation
├── constants/          # App constants
├── data/               # Mock data files
└── theme/              # MUI customization
```

## Avoid

- Hardcoded colors (use `theme.palette.*`)
- Colored chips (use Indicator)
- Running the server without asking
- Dark mode (removed)
- Transition delays on hover effects
