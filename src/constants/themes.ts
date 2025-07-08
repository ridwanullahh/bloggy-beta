import { BlogTheme } from '../types/blog';

export const BLOG_THEMES: BlogTheme[] = [
  {
    id: 'modern',
    name: 'Modern Minimalist',
    description: 'Clean lines, plenty of white space, and elegant typography',
    preview: '/themes/modern.jpg',
    styles: {
      primaryColor: '#1F2937',
      secondaryColor: '#F8FAFC',
      accentColor: '#3B82F6',
      textColor: '#374151',
      fontFamily: 'Inter, -apple-system, sans-serif',
      headingFont: 'Inter, -apple-system, sans-serif',
      layout: 'minimal',
      borderRadius: '8px',
      shadows: 'subtle',
      spacing: 'comfortable',
      cardStyle: 'flat',
      buttonStyle: 'rounded',
      headerStyle: 'minimal',
      navigationStyle: 'clean'
    }
  },
  {
    id: 'dark-mode',
    name: 'Dark Professional',
    description: 'Sleek dark theme perfect for tech and coding blogs',
    preview: '/themes/dark.jpg',
    styles: {
      primaryColor: '#0F172A',
      secondaryColor: '#1E293B',
      accentColor: '#06B6D4',
      textColor: '#E2E8F0',
      fontFamily: 'JetBrains Mono, Monaco, "Cascadia Code", monospace',
      headingFont: 'JetBrains Mono, Monaco, "Cascadia Code", monospace',
      layout: 'grid',
      borderRadius: '4px',
      shadows: 'glow',
      spacing: 'tight',
      cardStyle: 'bordered',
      buttonStyle: 'sharp',
      headerStyle: 'dark',
      navigationStyle: 'sidebar'
    }
  },
  {
    id: 'magazine',
    name: 'Magazine Style',
    description: 'Bold headlines and image-rich layout like traditional magazines',
    preview: '/themes/magazine.jpg',
    styles: {
      primaryColor: '#DC2626',
      secondaryColor: '#FEF2F2',
      accentColor: '#F59E0B',
      textColor: '#1F2937',
      fontFamily: 'Georgia, "Times New Roman", serif',
      headingFont: 'Playfair Display, Georgia, serif',
      layout: 'magazine',
      borderRadius: '0px',
      shadows: 'dramatic',
      spacing: 'dense',
      cardStyle: 'elevated',
      buttonStyle: 'bold',
      headerStyle: 'banner',
      navigationStyle: 'tabs'
    }
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    description: 'Artistic design perfect for designers and creatives',
    preview: '/themes/creative.jpg',
    styles: {
      primaryColor: '#7C3AED',
      secondaryColor: '#FAF5FF',
      accentColor: '#F59E0B',
      textColor: '#374151',
      fontFamily: 'Poppins, -apple-system, sans-serif',
      headingFont: 'Poppins, -apple-system, sans-serif',
      layout: 'grid',
      borderRadius: '20px',
      shadows: 'colorful',
      spacing: 'artistic',
      cardStyle: 'rounded',
      buttonStyle: 'pill',
      headerStyle: 'creative',
      navigationStyle: 'floating'
    }
  },
  {
    id: 'business',
    name: 'Corporate Business',
    description: 'Professional and trustworthy design for business blogs',
    preview: '/themes/business.jpg',
    styles: {
      primaryColor: '#1E40AF',
      secondaryColor: '#F8FAFC',
      accentColor: '#059669',
      textColor: '#374151',
      fontFamily: 'Roboto, -apple-system, sans-serif',
      headingFont: 'Roboto, -apple-system, sans-serif',
      layout: 'list',
      borderRadius: '6px',
      shadows: 'professional',
      spacing: 'structured',
      cardStyle: 'corporate',
      buttonStyle: 'professional',
      headerStyle: 'corporate',
      navigationStyle: 'structured'
    }
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle & Fashion',
    description: 'Elegant and stylish design for lifestyle content',
    preview: '/themes/lifestyle.jpg',
    styles: {
      primaryColor: '#EC4899',
      secondaryColor: '#FDF2F8',
      accentColor: '#A855F7',
      textColor: '#374151',
      fontFamily: 'Crimson Text, Georgia, serif',
      headingFont: 'Crimson Text, Georgia, serif',
      layout: 'magazine',
      borderRadius: '12px',
      shadows: 'soft',
      spacing: 'elegant',
      cardStyle: 'elegant',
      buttonStyle: 'elegant',
      headerStyle: 'fashion',
      navigationStyle: 'elegant'
    }
  },
  {
    id: 'tech',
    name: 'Tech & Innovation',
    description: 'Futuristic design with vibrant accents for tech blogs',
    preview: '/themes/tech.jpg',
    styles: {
      primaryColor: '#0891B2',
      secondaryColor: '#F0F9FF',
      accentColor: '#06B6D4',
      textColor: '#0F172A',
      fontFamily: 'Space Grotesk, -apple-system, sans-serif',
      headingFont: 'Space Grotesk, -apple-system, sans-serif',
      layout: 'grid',
      borderRadius: '8px',
      shadows: 'tech',
      spacing: 'futuristic',
      cardStyle: 'tech',
      buttonStyle: 'tech',
      headerStyle: 'tech',
      navigationStyle: 'tech'
    }
  },
  {
    id: 'nature',
    name: 'Nature & Environment',
    description: 'Earth-toned design perfect for environmental content',
    preview: '/themes/nature.jpg',
    styles: {
      primaryColor: '#059669',
      secondaryColor: '#F0FDF4',
      accentColor: '#84CC16',
      textColor: '#1F2937',
      fontFamily: 'Merriweather, Georgia, serif',
      headingFont: 'Merriweather, Georgia, serif',
      layout: 'minimal',
      borderRadius: '16px',
      shadows: 'organic',
      spacing: 'natural',
      cardStyle: 'organic',
      buttonStyle: 'organic',
      headerStyle: 'nature',
      navigationStyle: 'organic'
    }
  },
  {
    id: 'food',
    name: 'Food & Culinary',
    description: 'Warm and inviting design for food and recipe blogs',
    preview: '/themes/food.jpg',
    styles: {
      primaryColor: '#EA580C',
      secondaryColor: '#FFF7ED',
      accentColor: '#F59E0B',
      textColor: '#1F2937',
      fontFamily: 'Nunito, -apple-system, sans-serif',
      headingFont: 'Nunito, -apple-system, sans-serif',
      layout: 'magazine',
      borderRadius: '12px',
      shadows: 'warm',
      spacing: 'cozy',
      cardStyle: 'warm',
      buttonStyle: 'warm',
      headerStyle: 'food',
      navigationStyle: 'cozy'
    }
  },
  {
    id: 'travel',
    name: 'Travel & Adventure',
    description: 'Adventurous design with vibrant colors for travel blogs',
    preview: '/themes/travel.jpg',
    styles: {
      primaryColor: '#0369A1',
      secondaryColor: '#F0F9FF',
      accentColor: '#0891B2',
      textColor: '#1F2937',
      fontFamily: 'Open Sans, -apple-system, sans-serif',
      headingFont: 'Open Sans, -apple-system, sans-serif',
      layout: 'grid',
      borderRadius: '10px',
      shadows: 'adventure',
      spacing: 'dynamic',
      cardStyle: 'adventure',
      buttonStyle: 'adventure',
      headerStyle: 'travel',
      navigationStyle: 'adventure'
    }
  },
  {
    id: 'fitness',
    name: 'Health & Fitness',
    description: 'Energetic design for health and fitness content',
    preview: '/themes/fitness.jpg',
    styles: {
      primaryColor: '#DC2626',
      secondaryColor: '#FEF2F2',
      accentColor: '#F59E0B',
      textColor: '#1F2937',
      fontFamily: 'Montserrat, -apple-system, sans-serif',
      headingFont: 'Montserrat, -apple-system, sans-serif',
      layout: 'list',
      borderRadius: '8px',
      shadows: 'energetic',
      spacing: 'active',
      cardStyle: 'fitness',
      buttonStyle: 'fitness',
      headerStyle: 'fitness',
      navigationStyle: 'active'
    }
  },
  {
    id: 'education',
    name: 'Education & Learning',
    description: 'Clean and focused design for educational content',
    preview: '/themes/education.jpg',
    styles: {
      primaryColor: '#7C2D12',
      secondaryColor: '#FEF7ED',
      accentColor: '#059669',
      textColor: '#1F2937',
      fontFamily: 'Source Sans Pro, -apple-system, sans-serif',
      headingFont: 'Source Sans Pro, -apple-system, sans-serif',
      layout: 'minimal',
      borderRadius: '6px',
      shadows: 'academic',
      spacing: 'structured',
      cardStyle: 'academic',
      buttonStyle: 'academic',
      headerStyle: 'education',
      navigationStyle: 'structured'
    }
  },
  {
    id: 'gaming',
    name: 'Gaming & Entertainment',
    description: 'Dynamic design with bold colors for gaming content',
    preview: '/themes/gaming.jpg',
    styles: {
      primaryColor: '#7C3AED',
      secondaryColor: '#1E1B4B',
      accentColor: '#F59E0B',
      textColor: '#E2E8F0',
      fontFamily: 'Orbitron, Monaco, monospace',
      headingFont: 'Orbitron, Monaco, monospace',
      layout: 'grid',
      borderRadius: '0px',
      shadows: 'neon',
      spacing: 'gaming',
      cardStyle: 'gaming',
      buttonStyle: 'gaming',
      headerStyle: 'gaming',
      navigationStyle: 'gaming'
    }
  },
  {
    id: 'personal',
    name: 'Personal Journal',
    description: 'Intimate and personal design for diary-style blogs',
    preview: '/themes/personal.jpg',
    styles: {
      primaryColor: '#92400E',
      secondaryColor: '#FFFBEB',
      accentColor: '#F59E0B',
      textColor: '#1F2937',
      fontFamily: 'Libre Baskerville, Georgia, serif',
      headingFont: 'Libre Baskerville, Georgia, serif',
      layout: 'minimal',
      borderRadius: '8px',
      shadows: 'intimate',
      spacing: 'personal',
      cardStyle: 'journal',
      buttonStyle: 'personal',
      headerStyle: 'personal',
      navigationStyle: 'intimate'
    }
  },
  {
    id: 'news',
    name: 'News & Media',
    description: 'Traditional newspaper-style layout for news content',
    preview: '/themes/news.jpg',
    styles: {
      primaryColor: '#000000',
      secondaryColor: '#FFFFFF',
      accentColor: '#DC2626',
      textColor: '#1F2937',
      fontFamily: 'Times New Roman, Georgia, serif',
      headingFont: 'Times New Roman, Georgia, serif',
      layout: 'list',
      borderRadius: '0px',
      shadows: 'none',
      spacing: 'newspaper',
      cardStyle: 'newspaper',
      buttonStyle: 'newspaper',
      headerStyle: 'newspaper',
      navigationStyle: 'newspaper'
    }
  }
];

export const getThemeById = (id: string): BlogTheme | undefined => {
  return BLOG_THEMES.find(theme => theme.id === id);
};

export const getThemesByCategory = (category: string): BlogTheme[] => {
  return BLOG_THEMES.filter(theme => 
    theme.name.toLowerCase().includes(category.toLowerCase()) ||
    theme.description.toLowerCase().includes(category.toLowerCase())
  );
};

export const getThemeStyles = (theme: BlogTheme) => {
  const styles = theme.styles;
  
  return {
    // Base styles
    fontFamily: styles.fontFamily,
    headingFont: styles.headingFont,
    primaryColor: styles.primaryColor,
    secondaryColor: styles.secondaryColor,
    accentColor: styles.accentColor,
    textColor: styles.textColor,
    
    // Layout styles
    containerClass: getContainerClass(styles.layout),
    cardClass: getCardClass(styles.cardStyle, styles.borderRadius, styles.shadows),
    buttonClass: getButtonClass(styles.buttonStyle, styles.borderRadius),
    headerClass: getHeaderClass(styles.headerStyle),
    navigationClass: getNavigationClass(styles.navigationStyle),
    
    // Spacing
    spacing: getSpacingClass(styles.spacing),
    
    // Shadows
    shadows: getShadowClass(styles.shadows)
  };
};

const getContainerClass = (layout: string) => {
  switch (layout) {
    case 'grid':
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    case 'magazine':
      return 'space-y-8';
    case 'list':
      return 'space-y-4';
    default:
      return 'space-y-6';
  }
};

const getCardClass = (cardStyle: string, borderRadius: string, shadows: string) => {
  let baseClass = 'bg-white transition-all duration-300';
  
  // Add border radius
  if (borderRadius === '0px') {
    baseClass += ' rounded-none';
  } else if (borderRadius === '20px') {
    baseClass += ' rounded-2xl';
  } else if (borderRadius === '16px') {
    baseClass += ' rounded-xl';
  } else if (borderRadius === '12px') {
    baseClass += ' rounded-lg';
  } else {
    baseClass += ' rounded-md';
  }
  
  // Add shadows
  if (shadows === 'dramatic') {
    baseClass += ' shadow-2xl';
  } else if (shadows === 'glow') {
    baseClass += ' shadow-lg shadow-blue-500/20';
  } else if (shadows === 'colorful') {
    baseClass += ' shadow-lg shadow-purple-500/20';
  } else if (shadows === 'none') {
    baseClass += ' shadow-none border';
  } else {
    baseClass += ' shadow-md';
  }
  
  return baseClass;
};

const getButtonClass = (buttonStyle: string, borderRadius: string) => {
  let baseClass = 'inline-flex items-center justify-center font-medium transition-all duration-200';
  
  // Add border radius
  if (borderRadius === '0px') {
    baseClass += ' rounded-none';
  } else if (borderRadius === '20px') {
    baseClass += ' rounded-full';
  } else if (borderRadius === '16px') {
    baseClass += ' rounded-xl';
  } else if (borderRadius === '12px') {
    baseClass += ' rounded-lg';
  } else {
    baseClass += ' rounded-md';
  }
  
  // Add button-specific styles
  switch (buttonStyle) {
    case 'pill':
      baseClass += ' px-6 py-2 rounded-full';
      break;
    case 'sharp':
      baseClass += ' px-4 py-2 rounded-none';
      break;
    case 'bold':
      baseClass += ' px-6 py-3 font-bold';
      break;
    default:
      baseClass += ' px-4 py-2';
  }
  
  return baseClass;
};

const getHeaderClass = (headerStyle: string) => {
  switch (headerStyle) {
    case 'minimal':
      return 'border-b border-gray-200';
    case 'dark':
      return 'border-b border-gray-700 bg-gray-900';
    case 'banner':
      return 'border-b-4 border-red-600 bg-red-50';
    case 'creative':
      return 'border-b-2 border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50';
    case 'corporate':
      return 'border-b border-blue-200 bg-blue-50';
    case 'fashion':
      return 'border-b border-pink-200 bg-pink-50';
    case 'tech':
      return 'border-b border-cyan-200 bg-cyan-50';
    case 'nature':
      return 'border-b border-green-200 bg-green-50';
    case 'food':
      return 'border-b border-orange-200 bg-orange-50';
    case 'travel':
      return 'border-b border-blue-200 bg-blue-50';
    case 'fitness':
      return 'border-b border-red-200 bg-red-50';
    case 'education':
      return 'border-b border-yellow-200 bg-yellow-50';
    case 'gaming':
      return 'border-b border-purple-500 bg-gray-900';
    case 'personal':
      return 'border-b border-yellow-200 bg-yellow-50';
    case 'newspaper':
      return 'border-b-2 border-black bg-white';
    default:
      return 'border-b border-gray-200';
  }
};

const getNavigationClass = (navigationStyle: string) => {
  switch (navigationStyle) {
    case 'sidebar':
      return 'w-64 bg-gray-800 text-white';
    case 'tabs':
      return 'flex border-b border-gray-200';
    case 'floating':
      return 'flex space-x-4 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg';
    case 'structured':
      return 'flex space-x-6 bg-gray-50 px-6 py-4';
    case 'elegant':
      return 'flex space-x-6 bg-pink-50 px-6 py-4';
    case 'tech':
      return 'flex space-x-6 bg-cyan-50 px-6 py-4';
    case 'organic':
      return 'flex space-x-6 bg-green-50 px-6 py-4';
    case 'cozy':
      return 'flex space-x-6 bg-orange-50 px-6 py-4';
    case 'adventure':
      return 'flex space-x-6 bg-blue-50 px-6 py-4';
    case 'active':
      return 'flex space-x-6 bg-red-50 px-6 py-4';
    case 'gaming':
      return 'flex space-x-6 bg-gray-900 text-white px-6 py-4';
    case 'intimate':
      return 'flex space-x-6 bg-yellow-50 px-6 py-4';
    case 'newspaper':
      return 'flex space-x-6 bg-white border-b border-gray-200 px-6 py-4';
    default:
      return 'flex space-x-6';
  }
};

const getSpacingClass = (spacing: string) => {
  switch (spacing) {
    case 'tight':
      return 'space-y-2';
    case 'dense':
      return 'space-y-3';
    case 'comfortable':
      return 'space-y-6';
    case 'artistic':
      return 'space-y-8';
    case 'elegant':
      return 'space-y-5';
    case 'futuristic':
      return 'space-y-4';
    case 'natural':
      return 'space-y-6';
    case 'cozy':
      return 'space-y-4';
    case 'dynamic':
      return 'space-y-6';
    case 'active':
      return 'space-y-4';
    case 'structured':
      return 'space-y-5';
    case 'gaming':
      return 'space-y-6';
    case 'personal':
      return 'space-y-5';
    case 'newspaper':
      return 'space-y-2';
    default:
      return 'space-y-6';
  }
};

const getShadowClass = (shadows: string) => {
  switch (shadows) {
    case 'subtle':
      return 'shadow-sm';
    case 'glow':
      return 'shadow-lg shadow-blue-500/20';
    case 'dramatic':
      return 'shadow-2xl';
    case 'colorful':
      return 'shadow-lg shadow-purple-500/20';
    case 'professional':
      return 'shadow-md';
    case 'soft':
      return 'shadow-lg';
    case 'tech':
      return 'shadow-lg shadow-cyan-500/20';
    case 'organic':
      return 'shadow-lg shadow-green-500/20';
    case 'warm':
      return 'shadow-lg shadow-orange-500/20';
    case 'adventure':
      return 'shadow-lg shadow-blue-500/20';
    case 'energetic':
      return 'shadow-lg shadow-red-500/20';
    case 'academic':
      return 'shadow-md';
    case 'neon':
      return 'shadow-2xl shadow-purple-500/30';
    case 'intimate':
      return 'shadow-lg shadow-yellow-500/20';
    case 'none':
      return 'shadow-none';
    default:
      return 'shadow-md';
  }
};