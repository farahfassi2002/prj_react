import React, { createContext, useState, useContext, useEffect } from 'react';

// ÉTAPE 1 : déclarer le canal, une seule fois, hors de tout composant
export const ThemeContext = createContext(null);

// ÉTAPE 2 : fournir l'état et la fonction de modification
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app_theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ÉTAPE 4 : hook personnalisé sécurisé
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme doit être utilisé à l'intérieur d'un <ThemeProvider>");
  }
  return context;
}
