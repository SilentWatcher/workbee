import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEMES, THEME_CONFIG, generateThemeCSS } from '../config/themes';

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
    
    // Apply theme colors as CSS custom properties
    const themeData = THEMES[theme];
    if (themeData) {
      const root = document.documentElement;
      const cssVars = generateThemeCSS(themeData);
      
      // Create a style element to inject CSS variables
      let styleElement = document.getElementById('theme-variables');
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'theme-variables';
        document.head.appendChild(styleElement);
      }
      
      styleElement.textContent = `:root {\n  ${cssVars}\n}`;
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
