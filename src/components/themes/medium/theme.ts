import { createTheme } from '../modular/ThemeRegistry';

export const mediumTheme = createTheme({
  id: 'medium',
  name: 'Medium',
  description: 'Elegant, content-focused design inspired by Medium with excellent typography and reading experience',
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
      primary: '#1A8917',
      secondary: '#F7F7F7',
      accent: '#FFC017',
      background: '#FFFFFF',
      surface: '#FAFAFA',
      text: '#242424',
      textSecondary: '#6B6B6B',
      border: '#E6E6E6',
      success: '#1A8917',
      warning: '#F7931E',
      error: '#C94A3C'
    },
    
    typography: {
      fontFamily: 'Charter, Georgia, Cambria, "Times New Roman", Times, serif',
      headingFont: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',
      codeFont: 'Menlo, Monaco, "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1.125rem',
        lg: '1.25rem',
        xl: '1.375rem',
        '2xl': '1.625rem',
        '3xl': '2rem',
        '4xl': '2.5rem'
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },
      lineHeight: {
        tight: 1.25,
        normal: 1.75,
        relaxed: 1.9
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
      sm: '0.125rem',
      md: '0.25rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px'
    },
    
    shadows: {
      sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px 0 rgb(0 0 0 / 0.06)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)'
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
    maxWidth: '728px',
    headerHeight: '3.5rem',
    footerHeight: 'auto',
    sidebarWidth: '240px',
    contentPadding: '1.5rem',
    gridGap: '1.5rem'
  }
});

export default mediumTheme;
