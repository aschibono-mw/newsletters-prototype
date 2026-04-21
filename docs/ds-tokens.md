# Design System Tokens

Reference for all design tokens used in the design system.

---

## Color Tokens

### Brand Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `primary` | `#00827F` | `#4DBABA` | Primary brand teal |
| `primaryLight` | `#E0F1F2` | `#2C3E3F` | Backgrounds, hover states |
| `primaryDark` | `#00726E` | `#7DD5D5` | Emphasis, pressed states |
| `secondary` | `#B627A1` | `#D946C4` | Secondary brand purple |
| `secondaryLight` | `#F7E6F3` | `#3D2639` | Backgrounds |
| `secondaryDark` | `#971B94` | `#E87DD4` | Emphasis |

### Status Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `success` | `#4caf50` | `#66BB6A` | Success states |
| `successLight` | `#e8f5e9` | `#2E3B2F` | Success backgrounds |
| `warning` | `#fb8c00` | `#FFA726` | Warning states |
| `warningLight` | `#fff3e0` | `#3D3328` | Warning backgrounds |
| `error` | `#f44336` | `#EF5350` | Error states |
| `errorLight` | `#ffebee` | `#3D2B2B` | Error backgrounds |
| `info` | `#2196f3` | `#42A5F5` | Info states |
| `infoLight` | `#e3f2fd` | `#2A3842` | Info backgrounds |

### Text Colors

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| `text.primary` | `#212121` | `#ffffff` |
| `text.secondary` | `#616161` | `#b0b0b0` |
| `text.light` | `#757575` | `#9e9e9e` |
| `text.disabled` | `rgba(0,0,0,0.38)` | `rgba(255,255,255,0.38)` |

### Background Colors

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| `background.default` | `#f5f5f5` | `#121212` |
| `background.paper` | `#fff` | `#1e1e1e` |
| `divider` | `rgba(33,33,33,0.12)` | `rgba(255,255,255,0.12)` |

### Grey Scale

```
grey.50:  #fafafa
grey.100: #f5f5f5
grey.200: #eeeeee
grey.300: #e0e0e0
grey.400: #bdbdbd
grey.500: #9e9e9e
grey.600: #757575
grey.700: #616161
grey.800: #424242
grey.900: #212121
```

---

## Typography Tokens

### Font Family

```
"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif
```

### Font Weights

| Token | Value |
|-------|-------|
| `regular` | 400 |
| `bold` | 700 |

### Type Scale

| Style | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `display` | 40px | 52px | 700 | Dashboard metrics |
| `h5` | 24px | 32px | 400 | Modal headers, nav card headers |
| `h5Heavy` | 24px | 32px | 700 | Empty state headers |
| `h6` | 20px | 26px | 400 | Subheaders |
| `h6Heavy` | 20px | 26px | 700 | Modal headers |
| `title` | 18px | 24px | 400 | Content card headers |
| `titleHeavy` | 18px | 24px | 700 | Side panel headers |
| `subtitle1` | 16px | 22px | 400 | Subtitles |
| `subtitle1Heavy` | 16px | 22px | 700 | Side panel content headers |
| `body1` | 14px | 18px | 400 | Default copy text |
| `body1Heavy` | 14px | 18px | 700 | Content card source name |
| `caption` | 12px | 16px | 400 | Caption label |
| `captionHeavy` | 12px | 16px | 700 | Caption label heavy |

---

## Spacing Tokens

Based on 8px grid system.

| Token | Value | Common Usage |
|-------|-------|--------------|
| `0.5` | 4px | Tight spacing |
| `1` | 8px | Minimal gaps |
| `1.5` | 12px | Small gaps |
| `2` | 16px | Standard spacing |
| `2.5` | 20px | Medium spacing |
| `3` | 24px | Section padding |
| `4` | 32px | Toolbar margins |
| `5` | 40px | Large gaps |
| `6` | 48px | Section breaks |
| `8` | 64px | Major sections |

---

## Elevation Tokens

| Level | Shadow | Usage |
|-------|--------|-------|
| `0` | none | Page backgrounds |
| `1` | `0px 2px 1px...` | Cards, toolbars |
| `4` | `0px 2px 4px...` | Dropdowns, popups |
| `8` | `0px 5px 5px...` | Banners, active states |
| `24` | `0px 11px 15px...` | Modals, side panels |

---

## Border Radius Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `none` | 0 | Sharp edges |
| `sm` | 4px | Subtle rounding |
| `md` | 6px | Buttons, inputs |
| `lg` | 8px | Cards |
| `xl` | 12px | Large containers |
| `full` | 9999px | Pills, circles |

---

## Breakpoints

| Token | Value | Description |
|-------|-------|-------------|
| `xs` | 0 | Extra small |
| `sm` | 600px | Small/tablet |
| `md` | 900px | Medium/desktop |
| `lg` | 1200px | Large |
| `xl` | 1536px | Extra large |

---

## Transition Tokens

### Durations

| Token | Value |
|-------|-------|
| `shortest` | 150ms |
| `shorter` | 200ms |
| `short` | 250ms |
| `standard` | 300ms |
| `complex` | 375ms |
| `enteringScreen` | 225ms |
| `leavingScreen` | 195ms |

### Easing

| Token | Value |
|-------|-------|
| `easeInOut` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `easeOut` | `cubic-bezier(0.0, 0, 0.2, 1)` |
| `easeIn` | `cubic-bezier(0.4, 0, 1, 1)` |
| `sharp` | `cubic-bezier(0.4, 0, 0.6, 1)` |

---

## Accessibility Palettes

The system supports 8 palette modes for accessibility:

1. **Light** - Default light mode
2. **Dark** - Dark mode for low-light
3. **Light Protanopia** - Red-blind accessible
4. **Light Deuteranopia** - Green-blind accessible
5. **Light Tritanopia** - Blue-blind accessible
6. **Dark Protanopia** - Red-blind dark mode
7. **Dark Deuteranopia** - Green-blind dark mode
8. **Dark Tritanopia** - Blue-blind dark mode

### Colorblind Adaptations

| Condition | Adaptation |
|-----------|------------|
| Protanopia/Deuteranopia | Blue replaces green for success, orange replaces red for error |
| Tritanopia | Pink replaces teal for primary, magenta replaces blue for info |
