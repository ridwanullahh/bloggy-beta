
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
      layout: 'minimal'
    }
  },
  {
    id: 'dark-mode',
    name: 'Dark Professional',
    description: 'Sleek dark theme perfect for tech and coding blogs',
    preview: '/themes/dark.jpg',
    styles: {
      primaryColor: '#111827',
      secondaryColor: '#374151',
      fontFamily: 'JetBrains Mono, monospace',
      layout: 'grid'
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
      layout: 'magazine'
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
      layout: 'grid'
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
      layout: 'list'
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
      layout: 'magazine'
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
      layout: 'grid'
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
      layout: 'minimal'
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
      layout: 'magazine'
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
      layout: 'grid'
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
      layout: 'list'
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
      layout: 'minimal'
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
      layout: 'grid'
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
      layout: 'minimal'
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
      layout: 'list'
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
