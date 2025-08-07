// Modular Theme System Types
export interface ModularTheme {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  preview: string;
  category: 'modern' | 'minimal' | 'creative' | 'professional' | 'magazine';
  
  // Theme configuration
  config: {
    supportsDarkMode: boolean;
    supportsCustomColors: boolean;
    supportsCustomFonts: boolean;
    supportsCustomLayouts: boolean;
    isResponsive: boolean;
    hasAnimations: boolean;
  };
  
  // Default styling
  defaultStyles: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      surface: string;
      text: string;
      textSecondary: string;
      border: string;
      success: string;
      warning: string;
      error: string;
    };
    
    typography: {
      fontFamily: string;
      headingFont: string;
      codeFont: string;
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
      fontWeight: {
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
      };
      lineHeight: {
        tight: number;
        normal: number;
        relaxed: number;
      };
    };
    
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    
    borderRadius: {
      none: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      full: string;
    };
    
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    
    animations: {
      duration: {
        fast: string;
        normal: string;
        slow: string;
      };
      easing: {
        linear: string;
        easeIn: string;
        easeOut: string;
        easeInOut: string;
      };
    };
  };
  
  // Layout configuration
  layout: {
    maxWidth: string;
    headerHeight: string;
    footerHeight: string;
    sidebarWidth: string;
    contentPadding: string;
    gridGap: string;
  };
}

export interface ThemeComponent {
  name: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
}

export interface ThemePageLayout {
  header: ThemeComponent;
  footer: ThemeComponent;
  sidebar?: ThemeComponent;
  content: ThemeComponent;
  meta?: ThemeComponent;
}

export interface ModularThemeComponents {
  // Page layouts
  homepage: ThemePageLayout;
  singlePost: ThemePageLayout;
  archive: ThemePageLayout;
  about: ThemePageLayout;
  contact: ThemePageLayout;
  category: ThemePageLayout;
  tag: ThemePageLayout;
  
  // Reusable components
  postCard: ThemeComponent;
  postList: ThemeComponent;
  postGrid: ThemeComponent;
  featuredPost: ThemeComponent;
  authorCard: ThemeComponent;
  categoryCard: ThemeComponent;
  tagCloud: ThemeComponent;
  newsletter: ThemeComponent;
  searchBox: ThemeComponent;
  pagination: ThemeComponent;
  breadcrumb: ThemeComponent;
  socialShare: ThemeComponent;
  relatedPosts: ThemeComponent;
  comments: ThemeComponent;
  tableOfContents: ThemeComponent;
}

export interface ThemeCustomization {
  colors?: Partial<ModularTheme['defaultStyles']['colors']>;
  typography?: Partial<ModularTheme['defaultStyles']['typography']>;
  spacing?: Partial<ModularTheme['defaultStyles']['spacing']>;
  borderRadius?: Partial<ModularTheme['defaultStyles']['borderRadius']>;
  shadows?: Partial<ModularTheme['defaultStyles']['shadows']>;
  layout?: Partial<ModularTheme['layout']>;
  customCSS?: string;
}

export interface ThemeContext {
  theme: ModularTheme;
  customization: ThemeCustomization;
  blog: any; // Blog type
  isDarkMode: boolean;
  isPreview: boolean;
}

export interface ThemeProviderProps {
  theme: ModularTheme;
  customization?: ThemeCustomization;
  blog: any;
  isDarkMode?: boolean;
  isPreview?: boolean;
  children: React.ReactNode;
}

// Theme registry for dynamic loading
export interface ThemeRegistry {
  [themeId: string]: {
    theme: ModularTheme;
    components: ModularThemeComponents;
    loader: () => Promise<ModularThemeComponents>;
  };
}

// Preview data structure
export interface ThemePreviewData {
  blog: {
    title: string;
    description: string;
    author: string;
    logo?: string;
  };
  posts: Array<{
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    publishedAt: string;
    readTime: string;
    tags: string[];
    category: string;
    featuredImage?: string;
    likes: number;
    comments: number;
  }>;
  categories: Array<{
    id: string;
    name: string;
    count: number;
  }>;
  tags: Array<{
    id: string;
    name: string;
    count: number;
  }>;
}
