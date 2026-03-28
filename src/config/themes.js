// Work Bee Global Theme Configuration
// Easily modify theme colors and settings here

export const THEMES = {
  light: {
    name: 'Light',
    colors: {
      // Primary Colors - Yellow
      primary: '#fbbf24',           // Yellow-400
      primaryContainer: '#fef3c7',  // Yellow-100
      onPrimary: '#78350f',         // Yellow-900
      onPrimaryContainer: '#451a03', // Yellow-950

      // Secondary Colors - Gray
      secondary: '#e5e7eb',         // Gray-200
      secondaryContainer: '#f9fafb', // Gray-50
      onSecondary: '#374151',       // Gray-700
      onSecondaryContainer: '#1f2937', // Gray-800

      // Tertiary Colors - Yellow variants
      tertiary: '#fde68a',          // Yellow-200
      tertiaryContainer: '#fef9c3', // Yellow-50
      onTertiary: '#854d0e',        // Yellow-800
      onTertiaryContainer: '#713f12', // Yellow-900

      // Surface Colors - White based
      surface: '#ffffff',
      surfaceContainerLow: '#fafafa',
      surfaceContainer: '#f4f4f5',
      surfaceContainerHigh: '#e4e4e7',
      surfaceContainerHighest: '#d4d4d8',
      surfaceContainerLowest: '#ffffff',
      surfaceDim: '#d1d5db',
      surfaceBright: '#ffffff',
      surfaceVariant: '#e5e7eb',

      // Error Colors
      error: '#dc2626',
      errorContainer: '#fef2f2',
      onError: '#ffffff',
      onErrorContainer: '#991b1b',

      // Outline Colors
      outline: '#d1d5db',
      outlineVariant: '#e5e7eb',

      // Inverse Colors
      inverseSurface: '#404040',
      inverseOnSurface: '#fafafa',
      inversePrimary: '#1c1917',

      // Text Colors
      onSurface: '#1c1917',
      onSurfaceVariant: '#404040',
      onBackground: '#1c1917',

      // Glass effect
      glassBg: 'rgba(255, 255, 255, 0.7)',
    }
  },

  dark: {
    name: 'Dark',
    colors: {
      // Primary Colors - Yellow
      primary: '#facc15',           // Yellow-400
      primaryContainer: '#854d0e',  // Yellow-800
      onPrimary: '#1c1917',         // Stone-900
      onPrimaryContainer: '#fef3c7', // Yellow-100

      // Secondary Colors - Gray
      secondary: '#d4d4d8',         // Gray-300
      secondaryContainer: '#262626', // Neutral-800
      onSecondary: '#1c1917',       // Stone-900
      onSecondaryContainer: '#a1a1aa', // Gray-400

      // Tertiary Colors - Yellow variants
      tertiary: '#fde047',          // Yellow-300
      tertiaryContainer: '#713f12', // Yellow-900
      onTertiary: '#1c1917',        // Stone-900
      onTertiaryContainer: '#fef9c3', // Yellow-50

      // Surface Colors - Black based
      surface: '#000000',           // Pure black
      surfaceContainerLow: '#171717', // Neutral-900
      surfaceContainer: '#262626',   // Neutral-800
      surfaceContainerHigh: '#404040', // Neutral-700
      surfaceContainerHighest: '#525252', // Neutral-600
      surfaceContainerLowest: '#0a0a0a', // Neutral-950
      surfaceDim: '#000000',
      surfaceBright: '#171717',
      surfaceVariant: '#262626',

      // Error Colors
      error: '#ef4444',
      errorContainer: '#7f1d1d',
      onError: '#ffffff',
      onErrorContainer: '#fecaca',

      // Outline Colors
      outline: '#525252',
      outlineVariant: '#404040',

      // Inverse Colors
      inverseSurface: '#fafafa',
      inverseOnSurface: '#1c1917',
      inversePrimary: '#facc15',

      // Text Colors
      onSurface: '#fafafa',
      onSurfaceVariant: '#d4d4d8',
      onBackground: '#fafafa',

      // Glass effect
      glassBg: 'rgba(0, 0, 0, 0.7)',
    }
  }
};

// Theme configuration
export const THEME_CONFIG = {
  defaultTheme: 'light',
  localStorageKey: 'workbee-theme',
  transitionDuration: '0.3s',
  transitionEasing: 'ease',
};

// Helper function to generate CSS custom properties
export const generateThemeCSS = (theme) => {
  const colors = theme.colors;
  return Object.entries(colors).map(([key, value]) => {
    const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `--${cssVar}: ${value};`;
  }).join('\n  ');
};

// Export theme names for easy access
export const THEME_NAMES = Object.keys(THEMES);
