
import { BlogTheme } from '../types/blog';

export const BLOG_THEMES: BlogTheme[] = [
  {
    id: 'modern',
    name: 'Modern Minimalist',
    description: 'Clean lines, plenty of white space, and elegant typography',
    preview: '/themes/modern.jpg',
    styles: {
      primaryColor: '#1F2937',
      secondaryColor: '#F3F4F6',
      fontFamily: 'Inter, sans-serif',
      layout: 'minimal',
      borderRadius: '0.5rem',
      shadows: 'soft',
      spacing: 'comfortable',
      headerStyle: 'clean',
      navigationStyle: 'horizontal',
      postCardStyle: 'elevated',
      buttonStyle: 'rounded',
      animationStyle: 'subtle'
    }
  },
  {
    id: 'dark-mode',
    name: 'Dark Professional',
    description: 'Sleek dark theme perfect for tech and coding blogs',
    preview: '/themes/dark.jpg',
    styles: {
      primaryColor: '#111827',
      secondaryColor: '#1F2937',
      fontFamily: 'JetBrains Mono, monospace',
      layout: 'grid',
      borderRadius: '0',
      shadows: 'sharp',
      spacing: 'compact',
      headerStyle: 'bold',
      navigationStyle: 'sidebar',
      postCardStyle: 'flat',
      buttonStyle: 'square',
      animationStyle: 'fast'
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
      fontFamily: 'Playfair Display, serif',
      layout: 'magazine',
      borderRadius: '0.25rem',
      shadows: 'dramatic',
      spacing: 'tight',
      headerStyle: 'magazine',
      navigationStyle: 'mega',
      postCardStyle: 'featured',
      buttonStyle: 'bold',
      animationStyle: 'smooth'
    }
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    description: 'Artistic design perfect for designers and creatives',
    preview: '/themes/creative.jpg',
    styles: {
      primaryColor: '#7C3AED',
      secondaryColor: '#F3E8FF',
      fontFamily: 'Poppins, sans-serif',
      layout: 'masonry',
      borderRadius: '1rem',
      shadows: 'colorful',
      spacing: 'artistic',
      headerStyle: 'creative',
      navigationStyle: 'floating',
      postCardStyle: 'artistic',
      buttonStyle: 'pill',
      animationStyle: 'playful'
    }
  },
  {
    id: 'business',
    name: 'Corporate Business',
    description: 'Professional and trustworthy design for business blogs',
    preview: '/themes/business.jpg',
    styles: {
      primaryColor: '#1E40AF',
      secondaryColor: '#EFF6FF',
      fontFamily: 'Roboto, sans-serif',
      layout: 'corporate',
      borderRadius: '0.375rem',
      shadows: 'professional',
      spacing: 'business',
      headerStyle: 'corporate',
      navigationStyle: 'business',
      postCardStyle: 'professional',
      buttonStyle: 'corporate',
      animationStyle: 'professional'
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
      fontFamily: 'Crimson Text, serif',
      layout: 'lifestyle',
      borderRadius: '2rem',
      shadows: 'elegant',
      spacing: 'luxurious',
      headerStyle: 'elegant',
      navigationStyle: 'minimal',
      postCardStyle: 'lifestyle',
      buttonStyle: 'elegant',
      animationStyle: 'graceful'
    }
  },
  {
    id: 'tech',
    name: 'Tech & Innovation',
    description: 'Futuristic design with vibrant accents for tech blogs',
    preview: '/themes/tech.jpg',
    styles: {
      primaryColor: '#0891B2',
      secondaryColor: '#ECFEFF',
      fontFamily: 'Space Grotesk, sans-serif',
      layout: 'tech',
      borderRadius: '0.75rem',
      shadows: 'neon',
      spacing: 'futuristic',
      headerStyle: 'tech',
      navigationStyle: 'tech',
      postCardStyle: 'tech',
      buttonStyle: 'futuristic',
      animationStyle: 'dynamic'
    }
  },
  {
    id: 'nature',
    name: 'Nature & Environment',
    description: 'Earth-toned design perfect for environmental content',
    preview: '/themes/nature.jpg',
    styles: {
      primaryColor: '#059669',
      secondaryColor: '#ECFDF5',
      fontFamily: 'Merriweather, serif',
      layout: 'organic',
      borderRadius: '1.5rem',
      shadows: 'natural',
      spacing: 'organic',
      headerStyle: 'organic',
      navigationStyle: 'natural',
      postCardStyle: 'organic',
      buttonStyle: 'natural',
      animationStyle: 'organic'
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
      fontFamily: 'Nunito, sans-serif',
      layout: 'recipe',
      borderRadius: '1.25rem',
      shadows: 'warm',
      spacing: 'cozy',
      headerStyle: 'warm',
      navigationStyle: 'cozy',
      postCardStyle: 'recipe',
      buttonStyle: 'warm',
      animationStyle: 'cozy'
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
      fontFamily: 'Open Sans, sans-serif',
      layout: 'adventure',
      borderRadius: '0.5rem',
      shadows: 'adventure',
      spacing: 'adventurous',
      headerStyle: 'adventure',
      navigationStyle: 'adventure',
      postCardStyle: 'travel',
      buttonStyle: 'adventure',
      animationStyle: 'adventurous'
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
      fontFamily: 'Montserrat, sans-serif',
      layout: 'fitness',
      borderRadius: '0.375rem',
      shadows: 'energetic',
      spacing: 'dynamic',
      headerStyle: 'energetic',
      navigationStyle: 'fitness',
      postCardStyle: 'fitness',
      buttonStyle: 'energetic',
      animationStyle: 'energetic'
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
      fontFamily: 'Source Sans Pro, sans-serif',
      layout: 'educational',
      borderRadius: '0.5rem',
      shadows: 'academic',
      spacing: 'structured',
      headerStyle: 'academic',
      navigationStyle: 'educational',
      postCardStyle: 'academic',
      buttonStyle: 'academic',
      animationStyle: 'structured'
    }
  },
  {
    id: 'gaming',
    name: 'Gaming & Entertainment',
    description: 'Dynamic design with bold colors for gaming content',
    preview: '/themes/gaming.jpg',
    styles: {
      primaryColor: '#7C3AED',
      secondaryColor: '#F3E8FF',
      fontFamily: 'Orbitron, monospace',
      layout: 'gaming',
      borderRadius: '1rem',
      shadows: 'gaming',
      spacing: 'gaming',
      headerStyle: 'gaming',
      navigationStyle: 'gaming',
      postCardStyle: 'gaming',
      buttonStyle: 'gaming',
      animationStyle: 'gaming'
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
      fontFamily: 'Libre Baskerville, serif',
      layout: 'journal',
      borderRadius: '0.75rem',
      shadows: 'personal',
      spacing: 'intimate',
      headerStyle: 'personal',
      navigationStyle: 'intimate',
      postCardStyle: 'journal',
      buttonStyle: 'personal',
      animationStyle: 'gentle'
    }
  },
  {
    id: 'news',
    name: 'News & Media',
    description: 'Traditional newspaper-style layout for news content',
    preview: '/themes/news.jpg',
    styles: {
      primaryColor: '#000000',
      secondaryColor: '#F9FAFB',
      fontFamily: 'Times New Roman, serif',
      layout: 'newspaper',
      borderRadius: '0',
      shadows: 'newspaper',
      spacing: 'news',
      headerStyle: 'newspaper',
      navigationStyle: 'news',
      postCardStyle: 'news',
      buttonStyle: 'news',
      animationStyle: 'crisp'
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
