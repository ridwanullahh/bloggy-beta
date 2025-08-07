import { ModularTheme, ModularThemeComponents, ThemeRegistry } from './types';

// Theme registry for dynamic loading
class ThemeRegistryManager {
  private registry: ThemeRegistry = {};
  private loadedThemes: Map<string, ModularThemeComponents> = new Map();

  // Register a theme
  registerTheme(
    themeId: string, 
    theme: ModularTheme, 
    components: ModularThemeComponents,
    loader?: () => Promise<ModularThemeComponents>
  ) {
    this.registry[themeId] = {
      theme,
      components,
      loader: loader || (() => Promise.resolve(components))
    };
  }

  // Get theme definition
  getTheme(themeId: string): ModularTheme | null {
    return this.registry[themeId]?.theme || null;
  }

  // Get theme components (with lazy loading)
  async getThemeComponents(themeId: string): Promise<ModularThemeComponents | null> {
    if (this.loadedThemes.has(themeId)) {
      return this.loadedThemes.get(themeId)!;
    }

    const themeEntry = this.registry[themeId];
    if (!themeEntry) {
      return null;
    }

    try {
      const components = await themeEntry.loader();
      this.loadedThemes.set(themeId, components);
      return components;
    } catch (error) {
      console.error(`Failed to load theme components for ${themeId}:`, error);
      return null;
    }
  }

  // Get all registered themes
  getAllThemes(): ModularTheme[] {
    return Object.values(this.registry).map(entry => entry.theme);
  }

  // Get themes by category
  getThemesByCategory(category: string): ModularTheme[] {
    return this.getAllThemes().filter(theme => theme.category === category);
  }

  // Check if theme is registered
  isThemeRegistered(themeId: string): boolean {
    return themeId in this.registry;
  }

  // Unregister theme
  unregisterTheme(themeId: string) {
    delete this.registry[themeId];
    this.loadedThemes.delete(themeId);
  }

  // Clear all themes
  clearRegistry() {
    this.registry = {};
    this.loadedThemes.clear();
  }

  // Get theme categories
  getCategories(): Array<{ id: string; name: string; count: number }> {
    const categories = new Map<string, number>();
    
    this.getAllThemes().forEach(theme => {
      categories.set(theme.category, (categories.get(theme.category) || 0) + 1);
    });

    const categoryNames: Record<string, string> = {
      modern: 'Modern',
      minimal: 'Minimal',
      creative: 'Creative',
      professional: 'Professional',
      magazine: 'Magazine'
    };

    return Array.from(categories.entries()).map(([id, count]) => ({
      id,
      name: categoryNames[id] || id,
      count
    }));
  }
}

// Create singleton instance
export const themeRegistry = new ThemeRegistryManager();

// Helper function to create theme definition
export const createTheme = (config: Partial<ModularTheme> & { id: string; name: string }): ModularTheme => {
  return {
    version: '1.0.0',
    author: 'Bloggy Team',
    preview: `/themes/${config.id}.jpg`,
    category: 'modern',
    description: '',
    
    config: {
      supportsDarkMode: true,
      supportsCustomColors: true,
      supportsCustomFonts: true,
      supportsCustomLayouts: true,
      isResponsive: true,
      hasAnimations: true,
      ...config.config
    },
    
    defaultStyles: {
      colors: {
        primary: '#05B34D',
        secondary: '#E9FBF1',
        accent: '#F2B91C',
        background: '#FFFFFF',
        surface: '#F8FAFC',
        text: '#1E293B',
        textSecondary: '#64748B',
        border: '#E2E8F0',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        ...config.defaultStyles?.colors
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
          normal: 1.5,
          relaxed: 1.75
        },
        ...config.defaultStyles?.typography
      },
      
      spacing: {
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        ...config.defaultStyles?.spacing
      },
      
      borderRadius: {
        none: '0',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
        ...config.defaultStyles?.borderRadius
      },
      
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        ...config.defaultStyles?.shadows
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
        },
        ...config.defaultStyles?.animations
      }
    },
    
    layout: {
      maxWidth: '1200px',
      headerHeight: '4rem',
      footerHeight: 'auto',
      sidebarWidth: '300px',
      contentPadding: '2rem',
      gridGap: '2rem',
      ...config.layout
    },
    
    ...config
  };
};

export default themeRegistry;
