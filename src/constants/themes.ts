
export interface ThemeStyle {
  id: string;
  name: string;
  preview: string;
  styles: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    textColor: string;
    backgroundColor: string;
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    borderRadius: string;
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    layout: {
      maxWidth: string;
      headerHeight: string;
      sidebarWidth: string;
    };
    components: {
      card: {
        padding: string;
        shadow: string;
        border: string;
        borderRadius: string;
      };
      button: {
        padding: string;
        borderRadius: string;
        fontSize: string;
        fontWeight: string;
      };
      navigation: {
        height: string;
        padding: string;
        fontSize: string;
      };
    };
  };
}

export const themes: ThemeStyle[] = [
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    preview: '/themes/modern-minimal.jpg',
    styles: {
      primaryColor: '#1a1a1a',
      secondaryColor: '#f8fafc',
      accentColor: '#3b82f6',
      textColor: '#374151',
      backgroundColor: '#ffffff',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
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
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem'
      },
      borderRadius: '0.5rem',
      shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      },
      layout: {
        maxWidth: '1200px',
        headerHeight: '4rem',
        sidebarWidth: '16rem'
      },
      components: {
        card: {
          padding: '1.5rem',
          shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem'
        },
        button: {
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: '500'
        },
        navigation: {
          height: '4rem',
          padding: '1rem',
          fontSize: '0.875rem'
        }
      }
    }
  },
  {
    id: 'elegant-serif',
    name: 'Elegant Serif',
    preview: '/themes/elegant-serif.jpg',
    styles: {
      primaryColor: '#8b5a3c',
      secondaryColor: '#fefdfb',
      accentColor: '#d4a574',
      textColor: '#2d1b14',
      backgroundColor: '#ffffff',
      fontFamily: 'Playfair Display, Georgia, serif',
      fontSize: {
        xs: '0.8rem',
        sm: '0.9rem',
        base: '1.1rem',
        lg: '1.3rem',
        xl: '1.5rem',
        '2xl': '1.8rem',
        '3xl': '2.2rem',
        '4xl': '2.8rem'
      },
      spacing: {
        xs: '0.75rem',
        sm: '1.25rem',
        md: '2rem',
        lg: '2.5rem',
        xl: '3.5rem'
      },
      borderRadius: '0.25rem',
      shadows: {
        sm: '0 2px 4px 0 rgba(139, 90, 60, 0.1)',
        md: '0 6px 12px -2px rgba(139, 90, 60, 0.15)',
        lg: '0 15px 25px -5px rgba(139, 90, 60, 0.2)',
        xl: '0 25px 35px -8px rgba(139, 90, 60, 0.25)'
      },
      layout: {
        maxWidth: '1000px',
        headerHeight: '5rem',
        sidebarWidth: '18rem'
      },
      components: {
        card: {
          padding: '2rem',
          shadow: '0 6px 12px -2px rgba(139, 90, 60, 0.15)',
          border: '1px solid #e8d5c4',
          borderRadius: '0.25rem'
        },
        button: {
          padding: '1rem 2rem',
          borderRadius: '0.25rem',
          fontSize: '1rem',
          fontWeight: '400'
        },
        navigation: {
          height: '5rem',
          padding: '1.5rem',
          fontSize: '1rem'
        }
      }
    }
  },
  {
    id: 'tech-futuristic',
    name: 'Tech Futuristic',
    preview: '/themes/tech-futuristic.jpg',
    styles: {
      primaryColor: '#0d1117',
      secondaryColor: '#161b22',
      accentColor: '#00d8ff',
      textColor: '#c9d1d9',
      backgroundColor: '#0d1117',
      fontFamily: 'JetBrains Mono, Consolas, monospace',
      fontSize: {
        xs: '0.7rem',
        sm: '0.8rem',
        base: '0.9rem',
        lg: '1rem',
        xl: '1.1rem',
        '2xl': '1.3rem',
        '3xl': '1.6rem',
        '4xl': '2rem'
      },
      spacing: {
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2.5rem'
      },
      borderRadius: '0.75rem',
      shadows: {
        sm: '0 0 10px rgba(0, 216, 255, 0.1)',
        md: '0 0 20px rgba(0, 216, 255, 0.15)',
        lg: '0 0 30px rgba(0, 216, 255, 0.2)',
        xl: '0 0 40px rgba(0, 216, 255, 0.25)'
      },
      layout: {
        maxWidth: '1400px',
        headerHeight: '3.5rem',
        sidebarWidth: '15rem'
      },
      components: {
        card: {
          padding: '1.25rem',
          shadow: '0 0 20px rgba(0, 216, 255, 0.15)',
          border: '1px solid #30363d',
          borderRadius: '0.75rem'
        },
        button: {
          padding: '0.625rem 1.25rem',
          borderRadius: '0.75rem',
          fontSize: '0.8rem',
          fontWeight: '600'
        },
        navigation: {
          height: '3.5rem',
          padding: '0.75rem',
          fontSize: '0.8rem'
        }
      }
    }
  },
  {
    id: 'creative-bold',
    name: 'Creative Bold',
    preview: '/themes/creative-bold.jpg',
    styles: {
      primaryColor: '#ff6b35',
      secondaryColor: '#fff8f3',
      accentColor: '#7209b7',
      textColor: '#2d3748',
      backgroundColor: '#ffffff',
      fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.2rem',
        xl: '1.4rem',
        '2xl': '1.7rem',
        '3xl': '2.1rem',
        '4xl': '2.6rem'
      },
      spacing: {
        xs: '0.625rem',
        sm: '1.125rem',
        md: '1.75rem',
        lg: '2.25rem',
        xl: '3.25rem'
      },
      borderRadius: '1rem',
      shadows: {
        sm: '0 2px 8px rgba(255, 107, 53, 0.1)',
        md: '0 8px 16px rgba(255, 107, 53, 0.15)',
        lg: '0 16px 32px rgba(255, 107, 53, 0.2)',
        xl: '0 24px 48px rgba(255, 107, 53, 0.25)'
      },
      layout: {
        maxWidth: '1300px',
        headerHeight: '4.5rem',
        sidebarWidth: '17rem'
      },
      components: {
        card: {
          padding: '1.75rem',
          shadow: '0 8px 16px rgba(255, 107, 53, 0.15)',
          border: '2px solid #fed7cf',
          borderRadius: '1rem'
        },
        button: {
          padding: '0.875rem 1.75rem',
          borderRadius: '1rem',
          fontSize: '0.9rem',
          fontWeight: '600'
        },
        navigation: {
          height: '4.5rem',
          padding: '1.25rem',
          fontSize: '0.9rem'
        }
      }
    }
  },
  {
    id: 'nature-organic',
    name: 'Nature Organic',
    preview: '/themes/nature-organic.jpg',
    styles: {
      primaryColor: '#2d5016',
      secondaryColor: '#f7faf5',
      accentColor: '#84cc16',
      textColor: '#1f2937',
      backgroundColor: '#ffffff',
      fontFamily: 'Lora, Georgia, serif',
      fontSize: {
        xs: '0.8rem',
        sm: '0.9rem',
        base: '1.05rem',
        lg: '1.2rem',
        xl: '1.4rem',
        '2xl': '1.65rem',
        '3xl': '2rem',
        '4xl': '2.5rem'
      },
      spacing: {
        xs: '0.7rem',
        sm: '1.1rem',
        md: '1.8rem',
        lg: '2.3rem',
        xl: '3.2rem'
      },
      borderRadius: '1.5rem',
      shadows: {
        sm: '0 3px 6px rgba(45, 80, 22, 0.08)',
        md: '0 6px 12px rgba(45, 80, 22, 0.12)',
        lg: '0 12px 24px rgba(45, 80, 22, 0.16)',
        xl: '0 18px 36px rgba(45, 80, 22, 0.2)'
      },
      layout: {
        maxWidth: '1100px',
        headerHeight: '4.75rem',
        sidebarWidth: '16.5rem'
      },
      components: {
        card: {
          padding: '2.25rem',
          shadow: '0 6px 12px rgba(45, 80, 22, 0.12)',
          border: '1px solid #d9f2a7',
          borderRadius: '1.5rem'
        },
        button: {
          padding: '1rem 2.25rem',
          borderRadius: '1.5rem',
          fontSize: '0.95rem',
          fontWeight: '500'
        },
        navigation: {
          height: '4.75rem',
          padding: '1.4rem',
          fontSize: '0.95rem'
        }
      }
    }
  }
];

export const getThemeById = (id: string): ThemeStyle | undefined => {
  return themes.find(theme => theme.id === id);
};

export const getDefaultTheme = (): ThemeStyle => {
  return themes[0];
};
