import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState('USD');
  
  // Save dark mode preference to localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  return (
    <AppContext.Provider value={{ 
      darkMode, 
      toggleDarkMode,
      currency,
      setCurrency
    }}>
      {children}
    </AppContext.Provider>
  );
};
