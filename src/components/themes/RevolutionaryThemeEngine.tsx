import React, { useEffect, useState } from 'react';
import { BlogTheme } from '../../types/blog';

interface RevolutionaryThemeEngineProps {
  theme: BlogTheme;
  brandColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  children: React.ReactNode;
}

export const RevolutionaryThemeEngine: React.FC<RevolutionaryThemeEngineProps> = ({
  theme,
  brandColors,
  children
}) => {
  const [cssVariables, setCssVariables] = useState<Record<string, string>>({});

  useEffect(() => {
    // Generate CSS variables from theme and brand colors
    const variables: Record<string, string> = {
      // Base theme colors (fallback if no brand colors)
      '--theme-primary': brandColors?.primary || theme.styles.primaryColor,
      '--theme-secondary': brandColors?.secondary || theme.styles.secondaryColor,
      '--theme-accent': brandColors?.accent || theme.styles.accentColor,
      '--theme-text': theme.styles.textColor,
      '--theme-font-family': theme.styles.fontFamily,
      '--theme-heading-font': theme.styles.headingFont,
      '--theme-border-radius': theme.styles.borderRadius,
      
      // Generate complementary colors from brand colors
      '--theme-primary-light': brandColors?.primary ? lightenColor(brandColors.primary, 20) : lightenColor(theme.styles.primaryColor, 20),
      '--theme-primary-dark': brandColors?.primary ? darkenColor(brandColors.primary, 20) : darkenColor(theme.styles.primaryColor, 20),
      '--theme-secondary-light': brandColors?.secondary ? lightenColor(brandColors.secondary, 20) : lightenColor(theme.styles.secondaryColor, 20),
      '--theme-accent-light': brandColors?.accent ? lightenColor(brandColors.accent, 20) : lightenColor(theme.styles.accentColor, 20),
      
      // Layout variables
      '--theme-layout': theme.styles.layout,
      '--theme-spacing': theme.styles.spacing === 'comfortable' ? '1.5rem' : theme.styles.spacing === 'relaxed' ? '2rem' : '1rem',
      '--theme-card-style': theme.styles.cardStyle,
      '--theme-button-style': theme.styles.buttonStyle,
      '--theme-header-style': theme.styles.headerStyle,
      '--theme-navigation-style': theme.styles.navigationStyle,
      
      // Shadow variables
      '--theme-shadow-sm': theme.styles.shadows === 'modern' ? '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' : 
                          theme.styles.shadows === 'subtle' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
      '--theme-shadow-md': theme.styles.shadows === 'modern' ? '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)' : 
                          theme.styles.shadows === 'subtle' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
      '--theme-shadow-lg': theme.styles.shadows === 'modern' ? '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)' : 
                          theme.styles.shadows === 'subtle' ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
    };

    setCssVariables(variables);

    // Apply CSS variables to document root
    const root = document.documentElement;
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    return () => {
      // Cleanup CSS variables
      Object.keys(variables).forEach(key => {
        root.style.removeProperty(key);
      });
    };
  }, [theme, brandColors]);

  // Helper functions for color manipulation
  const lightenColor = (color: string, percent: number): string => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  };

  const darkenColor = (color: string, percent: number): string => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
      (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
      (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
  };

  return (
    <div 
      className={`revolutionary-theme-${theme.id}`}
      style={{
        fontFamily: 'var(--theme-font-family)',
        color: 'var(--theme-text)',
        ...cssVariables
      }}
    >
      {children}
    </div>
  );
};

// Theme-specific CSS classes generator
export const generateThemeCSS = (theme: BlogTheme, brandColors?: { primary: string; secondary: string; accent: string }) => {
  const primaryColor = brandColors?.primary || theme.styles.primaryColor;
  const secondaryColor = brandColors?.secondary || theme.styles.secondaryColor;
  const accentColor = brandColors?.accent || theme.styles.accentColor;

  return `
    .revolutionary-theme-${theme.id} {
      --primary: ${primaryColor};
      --secondary: ${secondaryColor};
      --accent: ${accentColor};
      --text: ${theme.styles.textColor};
      --font-family: ${theme.styles.fontFamily};
      --heading-font: ${theme.styles.headingFont};
      --border-radius: ${theme.styles.borderRadius};
    }

    .revolutionary-theme-${theme.id} .theme-header {
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: white;
      padding: 2rem;
      border-radius: var(--border-radius);
    }

    .revolutionary-theme-${theme.id} .theme-card {
      background: var(--secondary);
      border-radius: var(--border-radius);
      padding: 1.5rem;
      box-shadow: var(--theme-shadow-md);
      transition: all 0.3s ease;
    }

    .revolutionary-theme-${theme.id} .theme-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--theme-shadow-lg);
    }

    .revolutionary-theme-${theme.id} .theme-button {
      background: var(--primary);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: var(--border-radius);
      font-family: var(--font-family);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .revolutionary-theme-${theme.id} .theme-button:hover {
      background: var(--accent);
      transform: translateY(-1px);
    }

    .revolutionary-theme-${theme.id} h1,
    .revolutionary-theme-${theme.id} h2,
    .revolutionary-theme-${theme.id} h3,
    .revolutionary-theme-${theme.id} h4,
    .revolutionary-theme-${theme.id} h5,
    .revolutionary-theme-${theme.id} h6 {
      font-family: var(--heading-font);
      color: var(--primary);
    }
  `;
};

export default RevolutionaryThemeEngine;
