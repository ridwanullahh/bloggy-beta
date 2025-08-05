import { useState, useEffect, useCallback } from 'react';
import { Blog } from '../types/blog';

interface UseDarkModeOptions {
  blog?: Blog;
  defaultMode?: 'light' | 'dark' | 'system';
}

export const useDarkMode = ({ blog, defaultMode = 'light' }: UseDarkModeOptions = {}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mode, setMode] = useState<'light' | 'dark' | 'system'>(defaultMode);

  // Get the effective dark mode setting from blog customization
  const blogDarkMode = blog?.customization?.darkMode;
  const effectiveDefaultMode = blogDarkMode?.defaultMode || defaultMode;
  const darkModeEnabled = blogDarkMode?.enabled ?? true;

  // Initialize dark mode state
  useEffect(() => {
    if (!darkModeEnabled) {
      setIsDarkMode(false);
      setMode('light');
      return;
    }

    const savedMode = localStorage.getItem(`darkMode-${blog?.slug || 'global'}`) as 'light' | 'dark' | 'system' | null;
    const initialMode = savedMode || effectiveDefaultMode;
    setMode(initialMode);

    const updateDarkMode = () => {
      if (initialMode === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(systemPrefersDark);
      } else {
        setIsDarkMode(initialMode === 'dark');
      }
    };

    updateDarkMode();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (mode === 'system') {
        setIsDarkMode(mediaQuery.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [blog?.slug, effectiveDefaultMode, darkModeEnabled, mode]);

  // Apply dark mode styles
  useEffect(() => {
    const root = document.documentElement;
    
    if (isDarkMode && darkModeEnabled) {
      root.classList.add('dark');
      
      // Apply custom dark colors if available
      if (blogDarkMode?.customDarkColors) {
        const { customDarkColors } = blogDarkMode;
        root.style.setProperty('--dark-primary', customDarkColors.primary);
        root.style.setProperty('--dark-secondary', customDarkColors.secondary);
        root.style.setProperty('--dark-accent', customDarkColors.accent);
        root.style.setProperty('--dark-background', customDarkColors.background);
        root.style.setProperty('--dark-text', customDarkColors.text);
      }
    } else {
      root.classList.remove('dark');
      
      // Remove custom dark color variables
      root.style.removeProperty('--dark-primary');
      root.style.removeProperty('--dark-secondary');
      root.style.removeProperty('--dark-accent');
      root.style.removeProperty('--dark-background');
      root.style.removeProperty('--dark-text');
    }
  }, [isDarkMode, darkModeEnabled, blogDarkMode?.customDarkColors]);

  const toggleDarkMode = useCallback(() => {
    if (!darkModeEnabled) return;

    const newMode = isDarkMode ? 'light' : 'dark';
    setMode(newMode);
    setIsDarkMode(newMode === 'dark');
    localStorage.setItem(`darkMode-${blog?.slug || 'global'}`, newMode);
  }, [isDarkMode, darkModeEnabled, blog?.slug]);

  const setDarkMode = useCallback((newMode: 'light' | 'dark' | 'system') => {
    if (!darkModeEnabled) return;

    setMode(newMode);
    localStorage.setItem(`darkMode-${blog?.slug || 'global'}`, newMode);

    if (newMode === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemPrefersDark);
    } else {
      setIsDarkMode(newMode === 'dark');
    }
  }, [darkModeEnabled, blog?.slug]);

  return {
    isDarkMode,
    mode,
    darkModeEnabled,
    toggleDarkMode,
    setDarkMode,
    customDarkColors: blogDarkMode?.customDarkColors
  };
};

// Hook for getting dark mode classes
export const useDarkModeClasses = (blog?: Blog) => {
  const { isDarkMode } = useDarkMode({ blog });

  const getDarkModeClass = useCallback((lightClass: string, darkClass: string) => {
    return isDarkMode ? darkClass : lightClass;
  }, [isDarkMode]);

  const getConditionalClass = useCallback((className: string, condition: boolean = true) => {
    return condition && isDarkMode ? `dark:${className}` : '';
  }, [isDarkMode]);

  return {
    isDarkMode,
    getDarkModeClass,
    getConditionalClass,
    darkModeClass: isDarkMode ? 'dark' : 'light'
  };
};

// Global dark mode context for the entire app
export const useGlobalDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('globalDarkMode');
    if (saved) return JSON.parse(saved);
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('globalDarkMode', JSON.stringify(isDarkMode));
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleGlobalDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  return {
    isDarkMode,
    toggleDarkMode: toggleGlobalDarkMode,
    setDarkMode: setIsDarkMode
  };
};
