# Core Design System

Standard UI components for the application. Use these for general-purpose interfaces that don't require AI-specific branding.

## When to Use Core DS

Use core components when building:
- User management (seats, permissions, roles)
- Settings and configuration pages
- Standard data tables and lists
- Forms and CRUD interfaces
- Navigation and layout structures

**Use Mira DS instead for:**
- AI assistant features
- Studio/Mira-specific pages
- AI-generated content displays
- Prompt libraries and templates

## Key Components

### TableHeader
Reusable table header with two states:

```jsx
// Default state - shows title, count, actions
<TableHeader
  title="Users"
  count={users.length}
  primaryAction={{ label: 'Create User', onClick: handleCreate }}
  showFind
  findValue={search}
  onFindChange={setSearch}
/>

// Selection state - shows selection count and bulk actions
<TableHeader
  selectedCount={selected.length}
  onClearSelection={() => setSelected([])}
  selectedActions={[
    { label: 'Delete', onClick: handleBulkDelete }
  ]}
/>
```

### Indicator
Colored status labels (use instead of colored Chips):

```jsx
<Indicator label="Active" status="active" />
<Indicator label="Pending" status="pending" />
<Indicator label="Inactive" status="inactive" />
```

### BaseSidePanel
Sliding panel from right side:

```jsx
<BaseSidePanel
  open={panelOpen}
  onClose={() => setPanelOpen(false)}
  title="Panel Title"
>
  {/* Panel content */}
</BaseSidePanel>
```

### Sidebar
Main navigation sidebar (72px collapsed, 240px expanded):

```jsx
<Sidebar
  onExpandChange={setExpanded}
  colorblindType={colorblindType}
  onPaletteChange={handlePaletteChange}
/>
```

### AppHeader
Fixed 64px header:

```jsx
<AppHeader
  pageName="Users"
  parentName="Account"
  chatOpen={chatOpen}
  onChatToggle={handleChatToggle}
/>
```

## Component Rules

### Chips vs Indicators

| Component | Use For |
|-----------|---------|
| `Chip` | Grey tags, labels, filters (no color) |
| `Indicator` | Colored status badges |

```jsx
// CORRECT
<Chip label="Admin" />          // Grey chip for role tag
<Indicator label="Active" />    // Colored for status

// INCORRECT
<Chip color="success" />        // Never color chips
```

### Default Variants

| Component | Default |
|-----------|---------|
| TextField | Outlined |
| Select | Outlined |
| Button | Contained |
| Chip | Grey fill |

## Layout Patterns

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

### Filter Chips Pattern
```jsx
<Box sx={{ display: 'flex', gap: 1 }}>
  <Chip
    icon={<FilterListIcon />}
    label={`Types (${filters.length})`}
    onClick={handleFilterClick}
    variant="outlined"
  />
</Box>
```

## Import Pattern

```jsx
import TableHeader from '../components/core/TableHeader'
import Indicator from '../components/core/Indicator'
import BaseSidePanel from '../components/core/BaseSidePanel'
```

## Guidelines

1. **Use theme values** - Always use `theme.palette.*` for colors
2. **No dark mode** - Light mode only
3. **Grey chips only** - Use `Indicator` for colored status labels
4. **Consistent spacing** - Use MUI's 8px base unit
