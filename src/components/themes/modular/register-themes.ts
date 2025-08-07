import { themeRegistry } from './ThemeRegistry';
import modernMinimal from './themes/modern-minimal';
import hashnode from '../hashnode';
import { mediumTheme } from '../medium/theme';
import { MediumHeader } from '../medium/Header';
import { MediumHomepage } from '../medium/Homepage';

// Register all available themes
export const registerAllThemes = () => {
  // Register Modern Minimal theme
  themeRegistry.registerTheme(
    'modern-minimal',
    modernMinimal.theme,
    modernMinimal.components,
    () => Promise.resolve(modernMinimal.components)
  );

  // Register Hashnode theme
  themeRegistry.registerTheme(
    'hashnode',
    hashnode.theme,
    hashnode.components,
    () => Promise.resolve(hashnode.components)
  );

  // Register Medium theme (partial implementation for demo)
  const mediumComponents = {
    homepage: {
      header: { name: 'MediumHeader', component: MediumHeader },
      footer: { name: 'HashnodeFooter', component: hashnode.components.homepage.footer.component },
      content: { name: 'MediumHomepage', component: MediumHomepage }
    },
    singlePost: {
      header: { name: 'MediumHeader', component: MediumHeader },
      footer: { name: 'HashnodeFooter', component: hashnode.components.homepage.footer.component },
      content: { name: 'HashnodeSinglePost', component: hashnode.components.singlePost.content.component }
    },
    archive: {
      header: { name: 'MediumHeader', component: MediumHeader },
      footer: { name: 'HashnodeFooter', component: hashnode.components.homepage.footer.component },
      content: { name: 'HashnodeArchive', component: hashnode.components.archive.content.component }
    },
    about: {
      header: { name: 'MediumHeader', component: MediumHeader },
      footer: { name: 'HashnodeFooter', component: hashnode.components.homepage.footer.component },
      content: { name: 'HashnodeAbout', component: hashnode.components.about.content.component }
    },
    contact: {
      header: { name: 'MediumHeader', component: MediumHeader },
      footer: { name: 'HashnodeFooter', component: hashnode.components.homepage.footer.component },
      content: { name: 'HashnodeContact', component: hashnode.components.contact.content.component }
    },
    category: {
      header: { name: 'MediumHeader', component: MediumHeader },
      footer: { name: 'HashnodeFooter', component: hashnode.components.homepage.footer.component },
      content: { name: 'HashnodeArchive', component: hashnode.components.archive.content.component }
    },
    tag: {
      header: { name: 'MediumHeader', component: MediumHeader },
      footer: { name: 'HashnodeFooter', component: hashnode.components.homepage.footer.component },
      content: { name: 'HashnodeArchive', component: hashnode.components.archive.content.component }
    },
    postCard: hashnode.components.postCard,
    postList: hashnode.components.postList,
    postGrid: hashnode.components.postGrid,
    featuredPost: hashnode.components.featuredPost,
    authorCard: hashnode.components.authorCard,
    categoryCard: hashnode.components.categoryCard,
    tagCloud: hashnode.components.tagCloud,
    newsletter: hashnode.components.newsletter,
    searchBox: hashnode.components.searchBox,
    pagination: hashnode.components.pagination,
    breadcrumb: hashnode.components.breadcrumb,
    socialShare: hashnode.components.socialShare,
    relatedPosts: hashnode.components.relatedPosts,
    comments: hashnode.components.comments,
    tableOfContents: hashnode.components.tableOfContents
  };

  themeRegistry.registerTheme(
    'medium',
    mediumTheme,
    mediumComponents,
    () => Promise.resolve(mediumComponents)
  );

  // Register additional themes (we'll create these)
  registerAdditionalThemes();
};

const registerAdditionalThemes = () => {
  // Creative Magazine Theme
  themeRegistry.registerTheme(
    'creative-magazine',
    {
      id: 'creative-magazine',
      name: 'Creative Magazine',
      description: 'Bold, magazine-style layout with dynamic typography and vibrant colors',
      version: '1.0.0',
      author: 'Bloggy Team',
      preview: '/themes/creative-magazine.jpg',
      category: 'magazine',
      
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
          primary: '#E11D48',
          secondary: '#FEF2F2',
          accent: '#F59E0B',
          background: '#FFFFFF',
          surface: '#F9FAFB',
          text: '#111827',
          textSecondary: '#6B7280',
          border: '#E5E7EB',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444'
        },
        typography: {
          fontFamily: 'Playfair Display, Georgia, serif',
          headingFont: 'Playfair Display, Georgia, serif',
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
        maxWidth: '1400px',
        headerHeight: '5rem',
        footerHeight: 'auto',
        sidebarWidth: '350px',
        contentPadding: '2rem',
        gridGap: '2rem'
      }
    },
    modernMinimal.components, // Reuse components for now
    () => Promise.resolve(modernMinimal.components)
  );

  // Professional Corporate Theme
  themeRegistry.registerTheme(
    'professional-corporate',
    {
      id: 'professional-corporate',
      name: 'Professional Corporate',
      description: 'Clean, professional design perfect for business blogs and corporate communications',
      version: '1.0.0',
      author: 'Bloggy Team',
      preview: '/themes/professional-corporate.jpg',
      category: 'professional',
      
      config: {
        supportsDarkMode: true,
        supportsCustomColors: true,
        supportsCustomFonts: true,
        supportsCustomLayouts: true,
        isResponsive: true,
        hasAnimations: false
      },
      
      defaultStyles: {
        colors: {
          primary: '#1E40AF',
          secondary: '#F8FAFC',
          accent: '#059669',
          background: '#FFFFFF',
          surface: '#F1F5F9',
          text: '#0F172A',
          textSecondary: '#64748B',
          border: '#CBD5E1',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444'
        },
        typography: {
          fontFamily: 'Source Sans Pro, -apple-system, BlinkMacSystemFont, sans-serif',
          headingFont: 'Source Sans Pro, -apple-system, BlinkMacSystemFont, sans-serif',
          codeFont: 'Source Code Pro, Consolas, monospace',
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
          sm: '0.125rem',
          md: '0.25rem',
          lg: '0.5rem',
          xl: '0.75rem',
          full: '9999px'
        },
        shadows: {
          sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          md: '0 2px 4px -1px rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          lg: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          xl: '0 8px 10px -2px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
        },
        animations: {
          duration: {
            fast: '100ms',
            normal: '200ms',
            slow: '300ms'
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
        sidebarWidth: '280px',
        contentPadding: '2rem',
        gridGap: '1.5rem'
      }
    },
    modernMinimal.components, // Reuse components for now
    () => Promise.resolve(modernMinimal.components)
  );

  // Add more themes here...
  registerMoreThemes();
};

const registerMoreThemes = () => {
  // We'll add more themes here to reach 15-21 total
  console.log('Additional themes will be registered here');
};

export default registerAllThemes;
