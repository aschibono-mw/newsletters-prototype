/**
 * Design System Tokens
 * Extracted from Figma design system specifications
 * Last updated: Dec 5, 2025
 *
 * Supports light mode with colorblind-accessible variants:
 * - Default (standard light theme)
 * - Protanopia (red-blind accessible)
 * - Deuteranopia (green-blind accessible)
 * - Tritanopia (blue-blind accessible)
 */

import { getPalette } from './palette-variants.js';

// ==========================================
// COLOR TOKENS (Dynamic based on palette)
// ==========================================

// Default palette
let currentPalette = getPalette('none');

// Function to get current colors
export const getColors = () => ({
  // Brand Colors
  brand: currentPalette.brand,

  // Accent Colors (derived from brand primary)
  accent: {
    main: currentPalette.brand.primary,
    light: currentPalette.brand.primaryLight,
    dark: currentPalette.brand.primaryDark,
  },

  // Greys (constant across all modes)
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    A100: '#f5f5f5',
    A200: '#eeeeee',
    A400: '#bdbdbd',
    A700: '#616161',
  },

  // Background
  background: currentPalette.background,

  // Text
  text: currentPalette.text,

  // Divider
  divider: currentPalette.divider,

  // Status Colors
  status: currentPalette.status,

  // Product Colors (constant across modes - for data visualization)
  product: {
    blue: {
      main: '#1e88e5',
      light: '#e3f2fd',
      dark: '#0d47a1',
    },
    yellow: {
      main: '#fdd835',
      light: '#fffde7',
      dark: '#f57f17',
    },
    pink: {
      main: '#f06292',
      light: '#fce4ec',
      dark: '#d81b60',
    },
    lightGreen: {
      main: '#8bc34a',
      light: '#f1f8e9',
      dark: '#558b2f',
    },
    orange: {
      main: '#f57c00',
      light: '#fff3e0',
      dark: '#e65100',
    },
    cyan: {
      main: '#00acc1',
      light: '#e0f7fa',
      dark: '#00838f',
    },
    deepPurple: {
      main: '#9575cd',
      light: '#ede7f6',
      dark: '#5e35b1',
    },
    brown: {
      main: '#795548',
      light: '#efebe9',
      dark: '#4e342e',
    },
    indigo: {
      main: '#3f51b5',
      light: '#e8eaf6',
      dark: '#1a237e',
    },
    blueGrey: {
      main: '#607d8b',
      light: '#eceff1',
      dark: '#37474f',
    },
  },

  // Social Colors (constant across modes - brand colors)
  social: {
    bilibili: '#00AEEC',
    bluesky: '#1185FE',
    dailymotion: '#00AAFF',
    discord: '#5865F2',
    douyin: '#5AB8B5',
    facebook: '#0866FF',
    instagram: '#F00075',
    kakaotalk: '#000000',
    linevoom: '#06c755',
    linkedin: '#0077B5',
    littleRedBook: '#EB3F4A',
    pinterest: '#F0002A',
    reddit: '#FF4500',
    salesforce: '#00A1E0',
    snapchat: '#FFFC00',
    threads: '#000000',
    tiktok: '#000000',
    twitch: '#9146FF',
    vkontakte: '#507299',
    wechat: '#00C40B',
    weibo: '#E6162D',
    youtube: '#FF0000',
    x: '#000000',
    xing: '#026466',
    youku: '#FF008C',
  },

  // Media Colors (constant across modes)
  media: {
    broadcast: '#1E88E5',
    news: '#00acc1',
    offlinePress: '#5e35b1',
    podcasts: '#3f51b5',
    premium: '#ffeb3b',
    rss: '#f57c00',
    radio: '#f06292',
    television: '#8bc34a',
    socialBlogs: '#795548',
    socialComments: '#9575cd',
    socialMedias: '#f57c00',
    socialMessageBoards: '#607d8b',
    socialReviews: '#ffeb3b',
    socialRFP: '#607d8b',
    socialWebsites: '#8bc34a',
  },

  // Action Colors
  action: currentPalette.action,

  // Common
  common: {
    black: '#000',
    white: '#fff',
  },
});

// Export default colors for backward compatibility
export const colors = getColors();

// Function to update palette
export const setPalette = (colorblindType = 'none') => {
  currentPalette = getPalette(colorblindType);
  return getColors();
};

// ==========================================
// TYPOGRAPHY TOKENS
// ==========================================

export const typography = {
  fontFamily: {
    base: '"Helvetica Neue", Helvetica, Arial, Inter, "Segoe UI", sans-serif',
  },

  fontWeight: {
    regular: 400,
    bold: 700,
  },

  // Type scale
  display: {
    fontSize: '40px',
    lineHeight: '52px',
    fontWeight: 700,
    use: 'Dashboard metrics (analytics)',
  },

  h5: {
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: 400,
    use: 'Modal headers, navigation card headers',
  },

  h5Heavy: {
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: 700,
    use: 'Empty state headers, Modal headers, navigation card headers',
  },

  h6: {
    fontSize: '20px',
    lineHeight: '26px',
    fontWeight: 400,
    use: 'Subheader',
  },

  h6Heavy: {
    fontSize: '20px',
    lineHeight: '26px',
    fontWeight: 700,
    use: 'Modal headers, navigation card headers',
  },

  title: {
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: 400,
    use: 'Content card headers',
  },

  titleHeavy: {
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: 700,
    use: 'Side panel headers',
  },

  subtitle1: {
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 400,
    use: 'Subtitle',
  },

  subtitle1Heavy: {
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 700,
    use: 'Side panel content headers',
  },

  body1: {
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: 400,
    use: 'Default copy text',
  },

  body1Heavy: {
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: 700,
    use: 'Content card header source name',
  },

  caption: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
    use: 'Caption label',
  },

  captionHeavy: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 700,
    use: 'Caption label heavy',
  },
};

// ==========================================
// SPACING TOKENS
// ==========================================

export const spacing = {
  0.5: '4px',
  1: '8px',
  1.5: '12px',
  2: '16px',
  2.5: '20px',
  3: '24px',
  3.5: '28px',
  4: '32px',      // Top margin between toolbar and page elements
  4.5: '36px',
  5: '40px',
  5.5: '44px',
  6: '48px',
  6.5: '52px',
  7: '56px',
  7.5: '60px',
  8: '64px',
  8.5: '68px',
  9: '72px',
  9.5: '76px',
  10: '80px',
  10.5: '84px',
  11: '88px',
  11.5: '92px',
  12: '96px',
};

// ==========================================
// ELEVATION TOKENS (Shadows)
// ==========================================

export const elevation = {
  0: 'none',
  1: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  4: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  8: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
  24: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',

  use: {
    0: 'Lowest element on a page. Backgrounds',
    1: 'Elements sitting on top of the lowest level on a page. eg. cards, toolbars, etc.',
    4: 'Elements that lift on top of page elements. eg. dropdowns, popups, etc.',
    8: 'Elements that float above the page. eg. banners, active states, etc.',
    24: 'Elements sitting above everything on a page. eg. dialogs/modals, side panels, etc.',
  },
};

// ==========================================
// BREAKPOINTS
// ==========================================

export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,

  // Actual sizes from Figma
  mobile: 444,
  tablet: 600,
  desktop: 900,
  wide: 1200,
  ultraWide: 1536,
};

// ==========================================
// BORDER RADIUS
// ==========================================

export const borderRadius = {
  none: 0,
  sm: '4px',
  md: '4px',
  lg: '8px',
  xl: '12px',
  full: '9999px',
};

// ==========================================
// TRANSITIONS
// ==========================================

export const transitions = {
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
};

// ==========================================
// COMPONENT-SPECIFIC TOKENS
// ==========================================

export const components = {
  button: {
    borderRadius: borderRadius.md,
    padding: {
      small: '6px 16px',
      medium: '8px 20px',
      large: '10px 24px',
    },
    fontSize: {
      small: '13px',
      medium: '14px',
      large: '15px',
    },
  },
};
