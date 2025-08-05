import React, { useEffect, useState, useCallback } from 'react';
import { Blog, BlogTheme } from '../../types/blog';
import enhancedSDK from '../../lib/enhanced-sdk';
import { getThemeById } from '../../constants/themes';
import { ThemeHeader } from './ThemeHeader';
import { ThemeFooter } from './ThemeFooter';

interface UniversalThemeWrapperProps {
  blogSlug: string;
  pageType: 'home' | 'post' | 'archive' | 'about' | 'contact' | 'category' | 'tag';
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  onSearch?: () => void;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export const UniversalThemeWrapper: React.FC<UniversalThemeWrapperProps> = ({
  blogSlug,
  pageType,
  children,
  showHeader = true,
  showFooter = true,
  onSearch,
  onThemeToggle,
  isDarkMode = false
}) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [theme, setTheme] = useState<BlogTheme | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper functions
  const getSpacingValue = useCallback((spacing: string) => {
    switch (spacing) {
      case 'compact': return '1rem';
      case 'comfortable': return '1.5rem';
      case 'relaxed': return '2rem';
      default: return '1.5rem';
    }
  }, []);

  const getShadowValue = useCallback((shadowType: string, size: string) => {
    const shadows = {
      none: { sm: 'none', md: 'none', lg: 'none' },
      subtle: { 
        sm: '0 1px 2px rgba(0,0,0,0.1)', 
        md: '0 2px 4px rgba(0,0,0,0.1)', 
        lg: '0 4px 8px rgba(0,0,0,0.1)' 
      },
      modern: { 
        sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', 
        md: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)', 
        lg: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)' 
      }
    };
    return shadows[shadowType as keyof typeof shadows]?.[size as keyof typeof shadows.none] || shadows.modern[size as keyof typeof shadows.modern];
  }, []);

  const lightenColor = useCallback((color: string, percent: number): string => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }, []);

  const darkenColor = useCallback((color: string, percent: number): string => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
      (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
      (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
  }, []);

  const loadGoogleFonts = useCallback((fonts: any) => {
    const fontsToLoad = [];
    if (fonts.primaryFont && fonts.primaryFont !== 'Inter') fontsToLoad.push(fonts.primaryFont);
    if (fonts.headingFont && fonts.headingFont !== fonts.primaryFont) fontsToLoad.push(fonts.headingFont);
    if (fonts.codeFont && fonts.codeFont !== 'JetBrains Mono') fontsToLoad.push(fonts.codeFont);

    if (fontsToLoad.length > 0) {
      const fontLink = document.getElementById('google-fonts') as HTMLLinkElement;
      const fontUrl = `https://fonts.googleapis.com/css2?${fontsToLoad.map(font =>
        `family=${font.replace(/\s+/g, '+')}:wght@300;400;500;600;700`
      ).join('&')}&display=swap`;

      if (fontLink) {
        fontLink.href = fontUrl;
      } else {
        const link = document.createElement('link');
        link.id = 'google-fonts';
        link.rel = 'stylesheet';
        link.href = fontUrl;
        document.head.appendChild(link);
      }
    }
  }, []);

  const getPageSpecificCSS = useCallback((themeData: BlogTheme, currentPageType: string) => {
    const baseStyles = `
      font-family: var(--theme-font-family);
      color: var(--theme-site-text);
      background-color: var(--theme-site-bg);
    `;

    switch (currentPageType) {
      case 'home':
        return `
          ${baseStyles}
          padding: 0;

          /* Home page specific theme styling */
          .hero-section {
            background: linear-gradient(135deg, var(--theme-primary), var(--theme-primary-dark));
            color: white;
            padding: 4rem 0;
          }

          .featured-posts {
            padding: 3rem 0;
            background: var(--theme-secondary);
          }

          .post-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: var(--theme-spacing);
            padding: var(--theme-spacing);
          }
        `;
      case 'post':
        return `
          ${baseStyles}

          /* Post page specific theme styling */
          .post-content {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.8;
            font-size: 1.1rem;
          }

          .post-header {
            background: var(--theme-primary);
            color: white;
            padding: 3rem 0;
            text-align: center;
          }

          .post-meta {
            color: var(--theme-accent);
            font-size: 0.9rem;
            margin-bottom: 2rem;
          }

          .post-content h1, .post-content h2, .post-content h3 {
            color: var(--theme-primary);
            margin-top: 2rem;
            margin-bottom: 1rem;
          }

          .post-content blockquote {
            border-left: 4px solid var(--theme-accent);
            padding-left: 1rem;
            margin: 2rem 0;
            font-style: italic;
            background: var(--theme-secondary);
            padding: 1rem;
            border-radius: var(--theme-border-radius);
          }
        `;
      case 'archive':
        return `
          ${baseStyles}
          padding: 2rem;

          /* Archive page specific theme styling */
          .archive-header {
            background: var(--theme-primary);
            color: white;
            padding: 2rem 0;
            margin-bottom: 2rem;
          }

          .archive-filters {
            background: var(--theme-secondary);
            padding: 1.5rem;
            border-radius: var(--theme-border-radius);
            margin-bottom: 2rem;
          }

          .archive-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: var(--theme-spacing);
          }

          .archive-card {
            background: white;
            border-radius: var(--theme-border-radius);
            box-shadow: var(--theme-shadow-md);
            transition: all 0.3s ease;
          }

          .archive-card:hover {
            transform: translateY(-2px);
            box-shadow: var(--theme-shadow-lg);
          }
        `;
      case 'about':
        return `
          ${baseStyles}

          /* About page specific theme styling */
          .about-content {
            max-width: 700px;
            margin: 0 auto;
            padding: 2rem;
          }

          .about-header {
            text-align: center;
            padding: 3rem 0;
            background: linear-gradient(135deg, var(--theme-primary), var(--theme-accent));
            color: white;
            margin-bottom: 3rem;
          }

          .about-card {
            background: white;
            border-radius: var(--theme-border-radius);
            box-shadow: var(--theme-shadow-lg);
            padding: 3rem;
            margin: 2rem 0;
          }

          .about-avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 4px solid var(--theme-accent);
            margin: 0 auto 2rem;
          }
        `;
      case 'contact':
        return `
          ${baseStyles}

          /* Contact page specific theme styling */
          .contact-content {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
          }

          .contact-header {
            text-align: center;
            padding: 3rem 0;
            background: var(--theme-primary);
            color: white;
            margin-bottom: 3rem;
          }

          .contact-form {
            background: white;
            border-radius: var(--theme-border-radius);
            box-shadow: var(--theme-shadow-lg);
            padding: 2rem;
          }

          .contact-info {
            background: var(--theme-secondary);
            border-radius: var(--theme-border-radius);
            padding: 2rem;
          }

          .contact-form input, .contact-form textarea {
            border: 2px solid var(--theme-secondary);
            border-radius: var(--theme-border-radius);
            padding: 0.75rem;
            transition: border-color 0.3s ease;
          }

          .contact-form input:focus, .contact-form textarea:focus {
            border-color: var(--theme-primary);
            outline: none;
          }
        `;
      case 'category':
      case 'tag':
        return `
          ${baseStyles}
          padding: 2rem;

          /* Category/Tag page specific theme styling */
          .taxonomy-header {
            background: var(--theme-accent);
            color: white;
            padding: 2rem 0;
            text-align: center;
            margin-bottom: 2rem;
          }

          .taxonomy-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: var(--theme-spacing);
          }
        `;
      default:
        return `
          ${baseStyles}
          padding: 1rem;
        `;
    }
  }, []);

  const generateUniversalThemeCSS = useCallback((themeData: BlogTheme, currentPageType: string) => {
    return `
      /* Universal Theme: ${themeData.name} - Page: ${currentPageType} */
      
      /* Global theme styles for all pages */
      .theme-${themeData.id} {
        font-family: var(--theme-font-family);
        color: var(--theme-site-text);
        background-color: var(--theme-site-bg);
        min-height: 100vh;
      }

      /* Header styles for all pages */
      .theme-${themeData.id} .universal-theme-header {
        background-color: var(--theme-header-bg);
        color: var(--theme-header-text);
        box-shadow: var(--theme-shadow-md);
        position: sticky;
        top: 0;
        z-index: 50;
      }

      .theme-${themeData.id} .universal-theme-header a {
        color: var(--theme-header-text);
        text-decoration: none;
      }

      .theme-${themeData.id} .universal-theme-header a:hover {
        color: var(--theme-accent);
      }

      /* Footer styles for all pages */
      .theme-${themeData.id} .universal-theme-footer {
        background-color: var(--theme-footer-bg);
        color: var(--theme-footer-text);
        margin-top: auto;
      }

      .theme-${themeData.id} .universal-theme-footer a {
        color: var(--theme-footer-text);
        text-decoration: none;
      }

      .theme-${themeData.id} .universal-theme-footer a:hover {
        color: var(--theme-accent);
      }

      /* Content area styles for all pages */
      .theme-${themeData.id} .universal-theme-content {
        background-color: var(--theme-site-bg);
        color: var(--theme-site-text);
        flex: 1;
      }

      /* Card styles for all pages */
      .theme-${themeData.id} .theme-card {
        background: white;
        border-radius: var(--theme-border-radius);
        box-shadow: var(--theme-shadow-md);
        padding: var(--theme-spacing);
        margin-bottom: var(--theme-spacing);
        border: 1px solid rgba(0,0,0,0.1);
      }

      /* Button styles for all pages */
      .theme-${themeData.id} .theme-button {
        background: var(--theme-primary);
        color: white;
        border: none;
        border-radius: var(--theme-border-radius);
        padding: 0.75rem 1.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: var(--theme-font-family);
      }

      .theme-${themeData.id} .theme-button:hover {
        background: var(--theme-primary-dark);
        transform: translateY(-1px);
        box-shadow: var(--theme-shadow-lg);
      }

      .theme-${themeData.id} .theme-button-secondary {
        background: var(--theme-secondary);
        color: var(--theme-primary);
        border: 2px solid var(--theme-primary);
      }

      .theme-${themeData.id} .theme-button-secondary:hover {
        background: var(--theme-primary);
        color: white;
      }

      /* Typography for all pages */
      .theme-${themeData.id} h1,
      .theme-${themeData.id} h2,
      .theme-${themeData.id} h3,
      .theme-${themeData.id} h4,
      .theme-${themeData.id} h5,
      .theme-${themeData.id} h6 {
        font-family: var(--theme-heading-font);
        color: var(--theme-primary);
        line-height: 1.2;
        margin-bottom: 1rem;
      }

      .theme-${themeData.id} a {
        color: var(--theme-primary);
        text-decoration: none;
        transition: color 0.3s ease;
      }

      .theme-${themeData.id} a:hover {
        color: var(--theme-primary-dark);
        text-decoration: underline;
      }

      .theme-${themeData.id} code {
        font-family: var(--theme-code-font);
        background: rgba(0,0,0,0.1);
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        font-size: 0.9em;
      }

      /* Page-specific styles with comprehensive theme integration */
      .theme-${themeData.id}.page-home {
        ${getPageSpecificCSS(themeData, 'home')}
      }

      .theme-${themeData.id}.page-post {
        ${getPageSpecificCSS(themeData, 'post')}
      }

      .theme-${themeData.id}.page-archive {
        ${getPageSpecificCSS(themeData, 'archive')}
      }

      .theme-${themeData.id}.page-about {
        ${getPageSpecificCSS(themeData, 'about')}
      }

      .theme-${themeData.id}.page-contact {
        ${getPageSpecificCSS(themeData, 'contact')}
      }

      .theme-${themeData.id}.page-category,
      .theme-${themeData.id}.page-tag {
        ${getPageSpecificCSS(themeData, 'category')}
      }

      /* Enhanced theme-specific component styling */
      .theme-${themeData.id} .theme-post-card {
        background: white;
        border-radius: var(--theme-border-radius);
        box-shadow: var(--theme-shadow-md);
        padding: var(--theme-spacing);
        margin-bottom: var(--theme-spacing);
        border: 1px solid rgba(0,0,0,0.1);
        transition: all 0.3s ease;
      }

      .theme-${themeData.id} .theme-post-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--theme-shadow-lg);
      }

      .theme-${themeData.id} .theme-post-title {
        color: var(--theme-primary);
        font-family: var(--theme-heading-font);
        font-weight: 600;
        margin-bottom: 0.5rem;
        transition: color 0.3s ease;
      }

      .theme-${themeData.id} .theme-post-title:hover {
        color: var(--theme-primary-dark);
      }

      .theme-${themeData.id} .theme-post-meta {
        color: var(--theme-accent);
        font-size: 0.875rem;
        margin-bottom: 1rem;
      }

      .theme-${themeData.id} .theme-post-excerpt {
        color: var(--theme-site-text);
        line-height: 1.6;
        margin-bottom: 1rem;
      }

      .theme-${themeData.id} .theme-badge {
        background: var(--theme-accent);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: calc(var(--theme-border-radius) / 2);
        font-size: 0.75rem;
        font-weight: 500;
      }

      .theme-${themeData.id} .theme-input {
        border: 2px solid var(--theme-secondary);
        border-radius: var(--theme-border-radius);
        padding: 0.75rem;
        font-family: var(--theme-font-family);
        transition: border-color 0.3s ease;
        background: white;
      }

      .theme-${themeData.id} .theme-input:focus {
        border-color: var(--theme-primary);
        outline: none;
        box-shadow: 0 0 0 3px rgba(var(--theme-primary-rgb), 0.1);
      }

      /* Dark mode styles */
      .theme-${themeData.id}.dark {
        background-color: var(--theme-dark-bg);
        color: var(--theme-dark-text);
      }

      .theme-${themeData.id}.dark .theme-card {
        background: var(--theme-dark-secondary);
        color: var(--theme-dark-text);
        border-color: rgba(255,255,255,0.1);
      }

      .theme-${themeData.id}.dark .universal-theme-content {
        background-color: var(--theme-dark-bg);
        color: var(--theme-dark-text);
      }

      /* Responsive design for all pages */
      @media (max-width: 768px) {
        .theme-${themeData.id} .page-content {
          padding: 1rem;
        }
        
        .theme-${themeData.id} .theme-card {
          margin-bottom: 1rem;
        }
      }

      /* Animation and transitions */
      .theme-${themeData.id} * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
      }
    `;
  }, [getPageSpecificCSS]);

  const injectThemeCSS = useCallback((themeData: BlogTheme, currentPageType: string) => {
    // Remove existing theme CSS
    const existingStyle = document.getElementById('universal-theme-css');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create comprehensive theme CSS for all pages
    const style = document.createElement('style');
    style.id = 'universal-theme-css';
    style.textContent = generateUniversalThemeCSS(themeData, currentPageType);
    document.head.appendChild(style);
  }, [generateUniversalThemeCSS]);

  const applyThemeStyles = useCallback((themeData: BlogTheme | null, blogData: Blog | null) => {
    if (!themeData || !blogData) return;

    const root = document.documentElement;
    const brandColors = blogData.customization?.brandColors || {
      primary: themeData.styles.primaryColor,
      secondary: themeData.styles.secondaryColor,
      accent: themeData.styles.accentColor,
      headerBg: themeData.styles.primaryColor,
      headerText: '#FFFFFF',
      footerBg: themeData.styles.primaryColor,
      footerText: '#FFFFFF',
      siteBg: themeData.styles.backgroundColor,
      siteText: themeData.styles.textColor
    };
    const fonts = blogData.customization?.fonts || {
      primaryFont: themeData.styles.fontFamily,
      headingFont: themeData.styles.headingFont,
      codeFont: 'JetBrains Mono, monospace',
      fontSource: 'system'
    };
    const darkMode = blogData.customization?.darkMode || {
      enabled: false,
      defaultMode: 'light'
    };
    
    // Apply comprehensive theme variables for all pages
    const themeVars = {
      // Brand colors (priority over theme defaults)
      '--theme-primary': brandColors.primary || themeData.styles.primaryColor,
      '--theme-secondary': brandColors.secondary || themeData.styles.secondaryColor,
      '--theme-accent': brandColors.accent || themeData.styles.accentColor,
      
      // Extended brand colors for all page elements
      '--theme-header-bg': brandColors.headerBg || themeData.styles.primaryColor,
      '--theme-header-text': brandColors.headerText || '#FFFFFF',
      '--theme-footer-bg': brandColors.footerBg || themeData.styles.primaryColor,
      '--theme-footer-text': brandColors.footerText || '#FFFFFF',
      '--theme-site-bg': brandColors.siteBg || themeData.styles.backgroundColor,
      '--theme-site-text': brandColors.siteText || themeData.styles.textColor,
      
      // Typography with font customization
      '--theme-font-family': fonts.primaryFont || themeData.styles.fontFamily,
      '--theme-heading-font': fonts.headingFont || themeData.styles.headingFont,
      '--theme-code-font': fonts.codeFont || 'JetBrains Mono, monospace',
      '--theme-text-color': themeData.styles.textColor,
      '--theme-bg-color': themeData.styles.backgroundColor,

      // Dark mode colors
      '--theme-dark-primary': darkMode.customDarkColors?.primary || brandColors.primary || themeData.styles.primaryColor,
      '--theme-dark-secondary': darkMode.customDarkColors?.secondary || '#1a1a1a',
      '--theme-dark-accent': darkMode.customDarkColors?.accent || brandColors.accent || themeData.styles.accentColor,
      '--theme-dark-bg': darkMode.customDarkColors?.background || '#0f0f0f',
      '--theme-dark-text': darkMode.customDarkColors?.text || '#ffffff',
      
      // Layout
      '--theme-border-radius': themeData.styles.borderRadius,
      '--theme-spacing': getSpacingValue(themeData.styles.spacing),
      
      // Shadows
      '--theme-shadow-sm': getShadowValue(themeData.styles.shadows, 'sm'),
      '--theme-shadow-md': getShadowValue(themeData.styles.shadows, 'md'),
      '--theme-shadow-lg': getShadowValue(themeData.styles.shadows, 'lg'),
      
      // Generated colors
      '--theme-primary-light': lightenColor(brandColors.primary || themeData.styles.primaryColor, 20),
      '--theme-primary-dark': darkenColor(brandColors.primary || themeData.styles.primaryColor, 20),
      '--theme-secondary-light': lightenColor(brandColors.secondary || themeData.styles.secondaryColor, 20),
      '--theme-accent-light': lightenColor(brandColors.accent || themeData.styles.accentColor, 20)
    };

    // Apply all CSS variables
    Object.entries(themeVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Load Google Fonts if specified
    if (fonts.fontSource === 'google' && (fonts.primaryFont || fonts.headingFont)) {
      loadGoogleFonts(fonts);
    }

    // Enhanced dark mode application
    if (darkMode.enabled) {
      const isDark = isDarkMode || darkMode.defaultMode === 'dark' ||
                    (darkMode.defaultMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

      if (isDark) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');

        // Apply dark mode theme variables
        root.style.setProperty('--theme-current-bg', themeVars['--theme-dark-bg']);
        root.style.setProperty('--theme-current-text', themeVars['--theme-dark-text']);
        root.style.setProperty('--theme-current-primary', themeVars['--theme-dark-primary']);
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');

        // Apply light mode theme variables
        root.style.setProperty('--theme-current-bg', themeVars['--theme-site-bg']);
        root.style.setProperty('--theme-current-text', themeVars['--theme-site-text']);
        root.style.setProperty('--theme-current-primary', themeVars['--theme-primary']);
      }
    } else {
      // Ensure dark mode is disabled
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');

      // Apply light mode theme variables
      root.style.setProperty('--theme-current-bg', themeVars['--theme-site-bg']);
      root.style.setProperty('--theme-current-text', themeVars['--theme-site-text']);
      root.style.setProperty('--theme-current-primary', themeVars['--theme-primary']);
    }

    // Apply theme-specific body classes for all pages
    document.body.className = document.body.className.replace(/theme-\w+|page-\w+/g, '');
    document.body.classList.add(`theme-${themeData.id}`, `page-${pageType}`);

    // Inject theme-specific CSS for all page types
    injectThemeCSS(themeData, pageType);

    console.log(`🎨 Universal theme applied: ${themeData.name} for ${pageType} page`);
  }, [pageType, isDarkMode, getSpacingValue, getShadowValue, lightenColor, darkenColor, loadGoogleFonts, injectThemeCSS]);

  const loadTheme = useCallback(async (themeId: string) => {
    try {
      // First try to get from database
      const themes = await enhancedSDK.get<BlogTheme>('themes');
      let foundTheme = themes.find(t => t.id === themeId);
      
      // If not found in database, get from constants
      if (!foundTheme) {
        foundTheme = getThemeById(themeId);
      }
      
      if (foundTheme) {
        setTheme(foundTheme);
        applyThemeStyles(foundTheme, blog);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      // Fallback to default theme
      const defaultTheme = getThemeById('hashnode-modern');
      if (defaultTheme) {
        setTheme(defaultTheme);
        applyThemeStyles(defaultTheme, blog);
      }
    }
  }, [blog, applyThemeStyles]);

  const loadBlogAndTheme = useCallback(async () => {
    try {
      const blogs = await enhancedSDK.get<Blog>('blogs');
      const foundBlog = blogs.find(b => b.slug === blogSlug);
      
      if (foundBlog) {
        setBlog(foundBlog);
        await loadTheme(foundBlog.theme);
      }
    } catch (error) {
      console.error('Error loading blog and theme:', error);
    } finally {
      setLoading(false);
    }
  }, [blogSlug, loadTheme]);

  useEffect(() => {
    loadBlogAndTheme();

    // Ultra-responsive real-time theme updates with immediate UI refresh
    const unsubscribeBlog = enhancedSDK.subscribe('blogs', (data) => {
      if (data.type === 'refresh' || data.type === 'update') {
        const blogs = Array.isArray(data.data) ? data.data : [data.data];
        const updatedBlog = blogs.find((b: Blog) => b.slug === blogSlug);
        if (updatedBlog) {
          setBlog(updatedBlog);
          loadTheme(updatedBlog.theme);
          // Multiple immediate re-render attempts for instant updates
          requestAnimationFrame(() => applyThemeStyles(theme, updatedBlog));
          setTimeout(() => applyThemeStyles(theme, updatedBlog), 0);
          setTimeout(() => applyThemeStyles(theme, updatedBlog), 50);
        }
      }
    });

    const unsubscribeThemes = enhancedSDK.subscribe('themes', (data) => {
      if (data.type === 'refresh' || data.type === 'update') {
        const themes = Array.isArray(data.data) ? data.data : [data.data];
        const updatedTheme = themes.find((t: BlogTheme) => t.id === blog?.theme);
        if (updatedTheme) {
          setTheme(updatedTheme);
          applyThemeStyles(updatedTheme, blog);
        }
      }
    });

    // Listen for global data updates for immediate theme changes
    const handleGlobalUpdate = (event: CustomEvent) => {
      const { collection, data } = event.detail;
      if (collection === 'blogs') {
        const blogs = Array.isArray(data) ? data : [data];
        const updatedBlog = blogs.find((b: Blog) => b.slug === blogSlug);
        if (updatedBlog) {
          setBlog(updatedBlog);
          loadTheme(updatedBlog.theme);
        }
      } else if (collection === 'themes') {
        const themes = Array.isArray(data) ? data : [data];
        const updatedTheme = themes.find((t: BlogTheme) => t.id === blog?.theme);
        if (updatedTheme) {
          setTheme(updatedTheme);
          applyThemeStyles(updatedTheme, blog);
        }
      }
    };

    // Listen for custom theme update events for immediate changes
    const handleThemeUpdate = () => {
      loadBlogAndTheme();
    };

    window.addEventListener('global-data-update', handleGlobalUpdate as EventListener);
    window.addEventListener('theme-updated', handleThemeUpdate);
    window.addEventListener('blogs-updated', handleThemeUpdate);

    return () => {
      unsubscribeBlog();
      unsubscribeThemes();
      window.removeEventListener('global-data-update', handleGlobalUpdate as EventListener);
      window.removeEventListener('theme-updated', handleThemeUpdate);
      window.removeEventListener('blogs-updated', handleThemeUpdate);
    };
  }, [blogSlug, loadBlogAndTheme, loadTheme, applyThemeStyles, blog?.theme, theme]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        backgroundColor: '#E9FBF1',
        color: '#181F25'
      }}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{
          borderColor: '#05B34D'
        }}></div>
      </div>
    );
  }

  if (!blog || !theme) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Blog or theme not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`universal-theme-wrapper theme-${theme.id} page-${pageType} min-h-screen flex flex-col`}>
      {showHeader && (
        <ThemeHeader 
          blog={blog} 
          theme={theme} 
          pageType={pageType}
          className="universal-theme-header"
          onSearch={onSearch}
          onThemeToggle={onThemeToggle}
          isDarkMode={isDarkMode}
        />
      )}
      
      <main className="universal-theme-content flex-1">
        <div className="page-content">
          {children}
        </div>
      </main>
      
      {showFooter && (
        <ThemeFooter 
          blog={blog} 
          theme={theme} 
          pageType={pageType}
          className="universal-theme-footer"
        />
      )}
    </div>
  );
};

export default UniversalThemeWrapper;