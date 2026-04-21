# Component Usage Rules

Guidelines for consistent component implementation.

---

## Variant Rules

### Default Variants

| Component | Default Variant | Notes |
|-----------|-----------------|-------|
| TextField | Outlined | No Standard/Filled in DS |
| Select | Outlined | No Standard/Filled in DS |
| Button | Contained | Primary action |
| Chip | Grey fill | NO colored variants |

### Variant Restrictions

- **Standard underline variant** - MUI baseline only, not in design system
- **Filled variant** - MUI baseline only, not in design system
- **Colored Chip fills** - Not allowed; use grey default with optional error border

---

## Sizing

### Small Size Variants

| Component | Small Padding | Regular Padding |
|-----------|---------------|-----------------|
| TextField | 8px | 14px |
| Select | 8px | 14px |
| Autocomplete | 8px | 14px |
| Search | 8px | 14px |
| Chip | 24px height | 32px height |
| ToggleButton | 4px/12px | 8px/16px |

---

## Color Usage

### Brand Colors

```jsx
// Primary actions
backgroundColor: theme.palette.primary.main  // #00827F (teal)

// Secondary actions
backgroundColor: theme.palette.secondary.main  // #B627A1 (purple)
```

### Status Colors

```jsx
// Success
theme.palette.success.main  // Use for positive states

// Warning
theme.palette.warning.main  // Use for warnings, also Rating stars

// Error
theme.palette.error.main    // Use for errors, destructive actions

// Info
theme.palette.info.main     // Use for informational states
```

### Never Hardcode Colors

```jsx
// WRONG
color: '#ffffff'
backgroundColor: 'rgba(33,33,33,0.26)'

// CORRECT
color: theme.palette.primary.contrastText
backgroundColor: theme.palette.action.disabled
```

---

## Focus States

### Standard Focus Pattern

```jsx
'&:focus-visible': {
  outline: `2px solid ${theme.palette.primary.light}`,
  outlineOffset: '2px',
}
```

### Checkbox/Radio Focus

- 2px outline offset using primary light (Aqua 300)
- Hover effect: 4% primary background

---

## Helper Text Pattern

```jsx
<FormHelperText>
  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <span>Description text</span>      {/* Left: description */}
    <span>2/100</span>                 {/* Right: count/indicator */}
  </Box>
</FormHelperText>
```

### Helper Text Margins

| Component | Left Margin |
|-----------|-------------|
| Checkbox | 32px |
| Radio | 32px |
| Switch | 50px |

---

## Infotip Pattern

- Only appears in floating label
- Shows when field has value/selection
- Icon positioned after label text

---

## Clear Button Pattern

```jsx
// Standard clear button styling
<IconButton
  size="small"
  sx={{
    backgroundColor: theme.palette.grey[200],
    width: 20,
    height: 20,
    '& .MuiSvgIcon-root': {
      fontSize: 14,
    },
  }}
>
  <CloseIcon />
</IconButton>
```

---

## Dark Mode Rules

### Use Dynamic Contrast

```jsx
// Automatic black/white text based on background luminance
color: theme.palette.primary.contrastText
```

### Mode-Aware Backgrounds

```jsx
backgroundColor: theme.palette.mode === 'dark'
  ? theme.palette.grey[800]   // Dark: #424242
  : theme.palette.grey[100]   // Light: #f5f5f5
```

### Always Use Theme References

```jsx
// Borders
borderColor: theme.palette.divider

// Icons
color: theme.palette.action.active

// Disabled states
backgroundColor: theme.palette.action.disabledBackground
```

---

## Spacing Rules

### Form Element Spacing

```jsx
<Stack spacing={4}>  {/* 32px between form elements */}
  <TextField />
  <Select />
  <Checkbox />
</Stack>
```

### Section Spacing

```jsx
// Between major sections
marginTop: '4rem'  // 64px

// Between subsections
marginTop: '2rem'  // 32px
```

---

## Border Radius

| Element | Radius |
|---------|--------|
| Buttons | 6px (`borderRadius.md`) |
| Inputs | 4px (`borderRadius.sm`) |
| Cards | 8px (`borderRadius.lg`) |
| Chips | 16px (pill-like) |

---

## Elevation Rules

| Context | Level |
|---------|-------|
| Cards on page | 1 |
| Dropdowns/Menus | 4 |
| Active/Floating | 8 |
| Modals/Dialogs | 24 |

---

## Disabled States

- 60% opacity for disabled elements
- Use `theme.palette.action.disabled` for colors
- Use `theme.palette.action.disabledBackground` for backgrounds
