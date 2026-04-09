import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEMES, THEME_CONFIG } from '../config/themes';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem(THEME_CONFIG.localStorageKey);
    if (savedTheme && THEMES[savedTheme]) {
      return savedTheme;
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : THEME_CONFIG.defaultTheme;
  });

  useEffect(() => {
    // Update data attribute on document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Apply theme colors as CSS custom properties directly on :root
    const themeData = THEMES[theme];
    if (themeData) {
      const root = document.documentElement;
      Object.entries(themeData.colors).forEach(([key, value]) => {
        const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        root.style.setProperty(cssVar, value);
      });

      // Keep initial boot inline styles in sync when toggling theme.
      // Without this, some inherited text/background can remain from first paint.
      const surface = themeData.colors.surface;
      const onSurface = themeData.colors.onSurface;
      root.style.backgroundColor = surface;
      root.style.color = onSurface;
      document.body.style.backgroundColor = surface;
      document.body.style.color = onSurface;
    }
    
    // Save to localStorage
    localStorage.setItem(THEME_CONFIG.localStorageKey, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const availableThemes = Object.keys(THEMES);
      const currentIndex = availableThemes.indexOf(prevTheme);
      const nextIndex = (currentIndex + 1) % availableThemes.length;
      return availableThemes[nextIndex];
    });
  };

  const setSpecificTheme = (themeName) => {
    if (THEMES[themeName]) {
      setTheme(themeName);
    }
  };

  const value = {
    theme,
    themeData: THEMES[theme],
    availableThemes: Object.keys(THEMES),
    toggleTheme,
    setTheme: setSpecificTheme,
    config: THEME_CONFIG
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
