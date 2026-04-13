// Work Bee Global Theme Configuration
// Easily modify theme colors and settings here

export const THEMES = {
  light: {
    name: 'Light',
    colors: {
      // Primary Colors - Professional Indigo
      primary: '#4f46e5',           // Indigo-600
      primaryContainer: '#eef2ff',  // Indigo-50
      onPrimary: '#ffffff',
      onPrimaryContainer: '#3730a3', // Indigo-800

      // Secondary Colors - Slate
      secondary: '#64748b',         // Slate-500
      secondaryContainer: '#f1f5f9', // Slate-100
      onSecondary: '#1e293b',       // Slate-800
      onSecondaryContainer: '#0f172a', // Slate-900

      // Tertiary Colors - Cyan/Teal
      tertiary: '#0891b2',          // Cyan-600
      tertiaryContainer: '#ecfeff', // Cyan-50
      onTertiary: '#ffffff',
      onTertiaryContainer: '#155e75', // Cyan-800

      // Surface Colors - White/Slate based
      surface: '#ffffff',
      surfaceContainerLow: '#f8fafc',
      surfaceContainer: '#f1f5f9',
      surfaceContainerHigh: '#e2e8f0',
      surfaceContainerHighest: '#cbd5e1',
      surfaceContainerLowest: '#ffffff',
      surfaceDim: '#f1f5f9',
      surfaceBright: '#ffffff',
      surfaceVariant: '#f1f5f9',

      // Error Colors
      error: '#ef4444',
      errorContainer: '#fef2f2',
      onError: '#ffffff',
      onErrorContainer: '#991b1b',

      // Outline Colors
      outline: '#e2e8f0',
      outlineVariant: '#cbd5e1',

      // Inverse Colors
      inverseSurface: '#0f172a',
      inverseOnSurface: '#f8fafc',
      inversePrimary: '#818cf8',

      // Text Colors
      onSurface: '#0f172a',
      onSurfaceVariant: '#475569',
      onBackground: '#0f172a',

      // Glass effect
      glassBg: 'rgba(255, 255, 255, 0.8)',
    }
  },

  dark: {
    name: 'Dark',
    colors: {
      // Primary Colors - Bright Indigo
      primary: '#818cf8',           // Indigo-400
      primaryContainer: '#312e81',  // Indigo-900
      onPrimary: '#ffffff',
      onPrimaryContainer: '#eef2ff', // Indigo-50

      // Secondary Colors - Slate
      secondary: '#94a3b8',         // Slate-400
      secondaryContainer: '#1e293b', // Slate-800
      onSecondary: '#f1f5f9',       // Slate-100
      onSecondaryContainer: '#cbd5e1', // Slate-300

      // Tertiary Colors - Cyan
      tertiary: '#22d3ee',          // Cyan-400
      tertiaryContainer: '#164e63', // Cyan-900
      onTertiary: '#0891b2',
      onTertiaryContainer: '#ecfeff', // Cyan-50

      // Surface Colors - Deep Slate based
      surface: '#0f172a',           // Slate-900
      surfaceContainerLow: '#1e293b', // Slate-800
      surfaceContainer: '#1e293b',   // Slate-800
      surfaceContainerHigh: '#334155', // Slate-700
      surfaceContainerHighest: '#475569', // Slate-600
      surfaceContainerLowest: '#020617', // Slate-950
      surfaceDim: '#0f172a',
      surfaceBright: '#1e293b',
      surfaceVariant: '#1e293b',

      // Error Colors
      error: '#f87171',
      errorContainer: '#7f1d1d',
      onError: '#ffffff',
      onErrorContainer: '#fecaca',

      // Outline Colors
      outline: '#334155',
      outlineVariant: '#475569',

      // Inverse Colors
      inverseSurface: '#f8fafc',
      inverseOnSurface: '#0f172a',
      inversePrimary: '#4f46e5',

      // Text Colors
      onSurface: '#f1f5f9',
      onSurfaceVariant: '#94a3b8',
      onBackground: '#f1f5f9',

      // Glass effect
      glassBg: 'rgba(15, 23, 42, 0.8)',
    }
  }
};

// Theme configuration
export const THEME_CONFIG = {
  defaultTheme: 'light',
  localStorageKey: 'workbee-theme',
  accentStorageKey: 'workbee-accent',
  profileStorageKey: 'workbee-profile',
  preferencesStorageKey: 'workbee-preferences',
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
