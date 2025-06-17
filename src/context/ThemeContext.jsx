import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    // Check user preference or system setting
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);
  
  useEffect(() => {
    console.log('Dark mode changed to:', darkMode);
    localStorage.setItem('darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
    console.log('Document classes:', document.documentElement.className);
  }, [darkMode]);
  
  const toggleDarkMode = () => {
    console.log('Toggle dark mode called, current darkMode:', darkMode);
    setDarkMode(!darkMode);
  };
  
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

