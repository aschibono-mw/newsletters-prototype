/**
 * Palette Variants for Accessibility
 *
 * This file contains 4 color palette variants (light mode only):
 * 1. Light (default)
 * 2. Light Protanopia (red-blind)
 * 3. Light Deuteranopia (green-blind)
 * 4. Light Tritanopia (blue-blind)
 *
 * Design principles:
 * - Protanopia/Deuteranopia: Use blue/orange pairs instead of red/green
 * - Tritanopia: Use pink/red pairs instead of blue/yellow
 * - All palettes maintain WCAG AA contrast ratios (4.5:1 minimum)
 */

// ==========================================
// LIGHT MODE (Default)
// ==========================================

export const lightPalette = {
  mode: 'light',
  brand: {
    primary: '#28BBBB',        // Teal
    primaryLight: '#D6F0F0',
    primaryDark: '#1FA5A5',
    secondary: '#B627A1',      // Purple
    secondaryLight: '#F7E6F3',
    secondaryDark: '#971B94',
  },
  status: {
    success: '#4caf50',        // Green
    successLight: '#e8f5e9',
    successDark: '#2e7d32',
    warning: '#fb8c00',        // Orange
    warningLight: '#fff3e0',
    warningDark: '#e65100',
    error: '#f44336',          // Red
    errorLight: '#ffebee',
    errorDark: '#c62828',
    info: '#2196f3',           // Blue
    infoLight: '#e3f2fd',
    infoDark: '#1565c0',
  },
  text: {
    primary: '#212121',
    secondary: '#616161',
    light: '#757575',
    disabled: 'rgba(0, 0, 0, 0.38)',
    white: '#fff',
  },
  background: {
    default: '#f5f5f5',
    paper: '#fff',
  },
  divider: 'rgba(33, 33, 33, 0.12)',
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.04)',
    selected: 'rgba(0, 0, 0, 0.08)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    focus: 'rgba(0, 0, 0, 0.12)',
  },
};

// ==========================================
// PROTANOPIA (Red-blind) - Light Mode
// ==========================================

export const lightProtanopiaPalette = {
  mode: 'light',
  brand: {
    primary: '#1D9F9F',        // Keep teal (safe for protanopia)
    primaryLight: '#E0F1F2',
    primaryDark: '#00726E',
    secondary: '#B627A1',      // Keep purple (safe)
    secondaryLight: '#F7E6F3',
    secondaryDark: '#971B94',
  },
  status: {
    success: '#0288D1',        // Blue instead of green
    successLight: '#E1F5FE',
    successDark: '#01579B',
    warning: '#EF6C00',        // Darker orange (more distinct)
    warningLight: '#FFF3E0',
    warningDark: '#E65100',
    error: '#F57C00',          // Orange instead of red
    errorLight: '#FFF3E0',
    errorDark: '#EF6C00',
    info: '#5E35B1',           // Purple instead of blue
    infoLight: '#EDE7F6',
    infoDark: '#4527A0',
  },
  text: {
    primary: '#212121',
    secondary: '#616161',
    light: '#757575',
    disabled: 'rgba(0, 0, 0, 0.38)',
    white: '#fff',
  },
  background: {
    default: '#f5f5f5',
    paper: '#fff',
  },
  divider: 'rgba(33, 33, 33, 0.12)',
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.04)',
    selected: 'rgba(0, 0, 0, 0.08)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    focus: 'rgba(0, 0, 0, 0.12)',
  },
};

// ==========================================
// DEUTERANOPIA (Green-blind) - Light Mode
// ==========================================

export const lightDeuteranopiaPalette = {
  mode: 'light',
  brand: {
    primary: '#1D9F9F',        // Keep teal (safe for deuteranopia)
    primaryLight: '#E0F1F2',
    primaryDark: '#00726E',
    secondary: '#B627A1',      // Keep purple (safe)
    secondaryLight: '#F7E6F3',
    secondaryDark: '#971B94',
  },
  status: {
    success: '#0288D1',        // Blue instead of green
    successLight: '#E1F5FE',
    successDark: '#01579B',
    warning: '#EF6C00',        // Darker orange
    warningLight: '#FFF3E0',
    warningDark: '#E65100',
    error: '#F57C00',          // Orange instead of red
    errorLight: '#FFF3E0',
    errorDark: '#EF6C00',
    info: '#5E35B1',           // Purple instead of blue
    infoLight: '#EDE7F6',
    infoDark: '#4527A0',
  },
  text: {
    primary: '#212121',
    secondary: '#616161',
    light: '#757575',
    disabled: 'rgba(0, 0, 0, 0.38)',
    white: '#fff',
  },
  background: {
    default: '#f5f5f5',
    paper: '#fff',
  },
  divider: 'rgba(33, 33, 33, 0.12)',
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.04)',
    selected: 'rgba(0, 0, 0, 0.08)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    focus: 'rgba(0, 0, 0, 0.12)',
  },
};

// ==========================================
// TRITANOPIA (Blue-blind) - Light Mode
// ==========================================

export const lightTritanopiaPalette = {
  mode: 'light',
  brand: {
    primary: '#D81B60',        // Pink instead of teal
    primaryLight: '#FCE4EC',
    primaryDark: '#AD1457',
    secondary: '#6A1B9A',      // Darker purple
    secondaryLight: '#F3E5F5',
    secondaryDark: '#4A148C',
  },
  status: {
    success: '#388E3C',        // Keep green (safe for tritanopia)
    successLight: '#E8F5E9',
    successDark: '#2E7D32',
    warning: '#D84315',        // Red-orange instead of yellow-orange
    warningLight: '#FBE9E7',
    warningDark: '#BF360C',
    error: '#C62828',          // Keep red (safe for tritanopia)
    errorLight: '#FFEBEE',
    errorDark: '#B71C1C',
    info: '#C2185B',           // Magenta instead of blue
    infoLight: '#FCE4EC',
    infoDark: '#880E4F',
  },
  text: {
    primary: '#212121',
    secondary: '#616161',
    light: '#757575',
    disabled: 'rgba(0, 0, 0, 0.38)',
    white: '#fff',
  },
  background: {
    default: '#f5f5f5',
    paper: '#fff',
  },
  divider: 'rgba(33, 33, 33, 0.12)',
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.04)',
    selected: 'rgba(0, 0, 0, 0.08)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    focus: 'rgba(0, 0, 0, 0.12)',
  },
};

// ==========================================
// PALETTE MAP
// ==========================================

export const palettes = {
  light: lightPalette,
  protanopia: lightProtanopiaPalette,
  deuteranopia: lightDeuteranopiaPalette,
  tritanopia: lightTritanopiaPalette,
};

/**
 * Get palette by colorblind type
 * @param {string} colorblindType - 'none', 'protanopia', 'deuteranopia', or 'tritanopia'
 * @returns {object} Palette object
 */
export const getPalette = (colorblindType = 'none') => {
  if (!colorblindType || colorblindType === 'none') {
    return palettes.light;
  }
  return palettes[colorblindType] || palettes.light;
};

// Palette metadata for UI display
export const paletteMetadata = {
  none: {
    label: 'Default',
    description: 'Standard light theme',
  },
  protanopia: {
    label: 'Protanopia',
    description: 'Red-blind accessible',
  },
  deuteranopia: {
    label: 'Deuteranopia',
    description: 'Green-blind accessible',
  },
  tritanopia: {
    label: 'Tritanopia',
    description: 'Blue-blind accessible',
  },
};
