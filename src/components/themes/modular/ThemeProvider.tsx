import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { ModularTheme, ThemeCustomization, ThemeContext, ThemeProviderProps } from './types';

const ThemeContextProvider = createContext<ThemeContext | null>(null);

export const useTheme = (): ThemeContext => {
  const context = useContext(ThemeContextProvider);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  customization = {},
  blog,
  isDarkMode = false,
  isPreview = false,
  children
}) => {
  // Merge theme defaults with customization
  const mergedTheme = useMemo(() => {
    const merged = { ...theme };
    
    if (customization.colors) {
      merged.defaultStyles.colors = { ...merged.defaultStyles.colors, ...customization.colors };
    }
    
    if (customization.typography) {
      merged.defaultStyles.typography = { ...merged.defaultStyles.typography, ...customization.typography };
    }
    
    if (customization.spacing) {
      merged.defaultStyles.spacing = { ...merged.defaultStyles.spacing, ...customization.spacing };
    }
    
    if (customization.borderRadius) {
      merged.defaultStyles.borderRadius = { ...merged.defaultStyles.borderRadius, ...customization.borderRadius };
    }
    
    if (customization.shadows) {
      merged.defaultStyles.shadows = { ...merged.defaultStyles.shadows, ...customization.shadows };
    }
    
    if (customization.layout) {
      merged.layout = { ...merged.layout, ...customization.layout };
    }
    
    return merged;
  }, [theme, customization]);

  // Generate CSS variables
  const cssVariables = useMemo(() => {
    const colors = mergedTheme.defaultStyles.colors;
    const typography = mergedTheme.defaultStyles.typography;
    const spacing = mergedTheme.defaultStyles.spacing;
    const borderRadius = mergedTheme.defaultStyles.borderRadius;
    const shadows = mergedTheme.defaultStyles.shadows;
    const layout = mergedTheme.layout;
    
    return {
      // Colors
      '--theme-color-primary': colors.primary,
      '--theme-color-secondary': colors.secondary,
      '--theme-color-accent': colors.accent,
      '--theme-color-background': colors.background,
      '--theme-color-surface': colors.surface,
      '--theme-color-text': colors.text,
      '--theme-color-text-secondary': colors.textSecondary,
      '--theme-color-border': colors.border,
      '--theme-color-success': colors.success,
      '--theme-color-warning': colors.warning,
      '--theme-color-error': colors.error,
      
      // Typography
      '--theme-font-family': typography.fontFamily,
      '--theme-font-heading': typography.headingFont,
      '--theme-font-code': typography.codeFont,
      '--theme-font-size-xs': typography.fontSize.xs,
      '--theme-font-size-sm': typography.fontSize.sm,
      '--theme-font-size-base': typography.fontSize.base,
      '--theme-font-size-lg': typography.fontSize.lg,
      '--theme-font-size-xl': typography.fontSize.xl,
      '--theme-font-size-2xl': typography.fontSize['2xl'],
      '--theme-font-size-3xl': typography.fontSize['3xl'],
      '--theme-font-size-4xl': typography.fontSize['4xl'],
      '--theme-font-weight-normal': typography.fontWeight.normal.toString(),
      '--theme-font-weight-medium': typography.fontWeight.medium.toString(),
      '--theme-font-weight-semibold': typography.fontWeight.semibold.toString(),
      '--theme-font-weight-bold': typography.fontWeight.bold.toString(),
      '--theme-line-height-tight': typography.lineHeight.tight.toString(),
      '--theme-line-height-normal': typography.lineHeight.normal.toString(),
      '--theme-line-height-relaxed': typography.lineHeight.relaxed.toString(),
      
      // Spacing
      '--theme-spacing-xs': spacing.xs,
      '--theme-spacing-sm': spacing.sm,
      '--theme-spacing-md': spacing.md,
      '--theme-spacing-lg': spacing.lg,
      '--theme-spacing-xl': spacing.xl,
      '--theme-spacing-2xl': spacing['2xl'],
      '--theme-spacing-3xl': spacing['3xl'],
      
      // Border Radius
      '--theme-border-radius-none': borderRadius.none,
      '--theme-border-radius-sm': borderRadius.sm,
      '--theme-border-radius-md': borderRadius.md,
      '--theme-border-radius-lg': borderRadius.lg,
      '--theme-border-radius-xl': borderRadius.xl,
      '--theme-border-radius-full': borderRadius.full,
      
      // Shadows
      '--theme-shadow-sm': shadows.sm,
      '--theme-shadow-md': shadows.md,
      '--theme-shadow-lg': shadows.lg,
      '--theme-shadow-xl': shadows.xl,
      
      // Layout
      '--theme-layout-max-width': layout.maxWidth,
      '--theme-layout-header-height': layout.headerHeight,
      '--theme-layout-footer-height': layout.footerHeight,
      '--theme-layout-sidebar-width': layout.sidebarWidth,
      '--theme-layout-content-padding': layout.contentPadding,
      '--theme-layout-grid-gap': layout.gridGap,
      
      // Animations
      '--theme-animation-duration-fast': mergedTheme.defaultStyles.animations.duration.fast,
      '--theme-animation-duration-normal': mergedTheme.defaultStyles.animations.duration.normal,
      '--theme-animation-duration-slow': mergedTheme.defaultStyles.animations.duration.slow,
      '--theme-animation-easing-linear': mergedTheme.defaultStyles.animations.easing.linear,
      '--theme-animation-easing-ease-in': mergedTheme.defaultStyles.animations.easing.easeIn,
      '--theme-animation-easing-ease-out': mergedTheme.defaultStyles.animations.easing.easeOut,
      '--theme-animation-easing-ease-in-out': mergedTheme.defaultStyles.animations.easing.easeInOut,
    };
  }, [mergedTheme]);

  // Apply CSS variables to document root
  useEffect(() => {
    const root = document.documentElement;
    
    Object.entries(cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    // Apply theme class
    document.body.classList.remove(...Array.from(document.body.classList).filter(cls => cls.startsWith('theme-')));
    document.body.classList.add(`theme-${theme.id}`);
    
    // Apply dark mode class
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Apply preview mode class
    if (isPreview) {
      document.body.classList.add('theme-preview');
    } else {
      document.body.classList.remove('theme-preview');
    }
    
    return () => {
      // Cleanup on unmount
      Object.keys(cssVariables).forEach(property => {
        root.style.removeProperty(property);
      });
      document.body.classList.remove(`theme-${theme.id}`, 'dark-mode', 'theme-preview');
    };
  }, [cssVariables, theme.id, isDarkMode, isPreview]);

  // Inject custom CSS if provided
  useEffect(() => {
    if (customization.customCSS) {
      const styleElement = document.createElement('style');
      styleElement.id = `theme-${theme.id}-custom-css`;
      styleElement.textContent = customization.customCSS;
      document.head.appendChild(styleElement);
      
      return () => {
        const existingStyle = document.getElementById(`theme-${theme.id}-custom-css`);
        if (existingStyle) {
          existingStyle.remove();
        }
      };
    }
  }, [customization.customCSS, theme.id]);

  const contextValue: ThemeContext = {
    theme: mergedTheme,
    customization,
    blog,
    isDarkMode,
    isPreview
  };

  return (
    <ThemeContextProvider.Provider value={contextValue}>
      <div className={`modular-theme-wrapper theme-${theme.id} ${isDarkMode ? 'dark-mode' : ''} ${isPreview ? 'theme-preview' : ''}`}>
        {children}
      </div>
    </ThemeContextProvider.Provider>
  );
};

export default ThemeProvider;
