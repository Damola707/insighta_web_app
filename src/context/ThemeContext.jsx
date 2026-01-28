import React, { createContext, useState, useEffect, useCallback } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('insighta_theme');
    return stored || 'light';
  });

  const applyTheme = useCallback((newTheme) => {
    const root = document.documentElement;
    
    if (newTheme === 'auto') {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else {
      root.classList.toggle('dark', newTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('insighta_theme', theme);
  }, [theme, applyTheme]);

  // Listen for system theme changes when in auto mode
  useEffect(() => {
    if (theme !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      document.documentElement.classList.toggle('dark', e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  const value = {
    theme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}