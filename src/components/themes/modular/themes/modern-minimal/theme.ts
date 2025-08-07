import { createTheme } from '../../ThemeRegistry';

export const modernMinimalTheme = createTheme({
  id: 'modern-minimal',
  name: 'Modern Minimal',
  description: 'Clean, minimal design with modern typography and subtle animations',
  category: 'minimal',
  
  config: {
    supportsDarkMode: true,
    supportsCustomColors: true,
    supportsCustomFonts: true,
    supportsCustomLayouts: true,
    isResponsive: true,
    hasAnimations: true
  },
  
  defaultStyles: {
    colors: {
      primary: '#1E293B',
      secondary: '#F8FAFC',
      accent: '#3B82F6',
      background: '#FFFFFF',
      surface: '#F1F5F9',
      text: '#0F172A',
      textSecondary: '#64748B',
      border: '#E2E8F0',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444'
    },
    
    typography: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      headingFont: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      codeFont: 'JetBrains Mono, Consolas, monospace',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem'
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },
      lineHeight: {
        tight: 1.25,
        normal: 1.6,
        relaxed: 1.8
      }
    },
    
    spacing: {
      xs: '0.5rem',
      sm: '0.75rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem'
    },
    
    borderRadius: {
      none: '0',
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      full: '9999px'
    },
    
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
    },
    
    animations: {
      duration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms'
      },
      easing: {
        linear: 'linear',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  },
  
  layout: {
    maxWidth: '1200px',
    headerHeight: '4rem',
    footerHeight: 'auto',
    sidebarWidth: '300px',
    contentPadding: '2rem',
    gridGap: '2rem'
  }
});

export default modernMinimalTheme;
