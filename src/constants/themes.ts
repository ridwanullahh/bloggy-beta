import { BlogTheme } from '../types/blog';

export const BLOG_THEMES: BlogTheme[] = [
  {
    id: 'hashnode-modern',
    name: 'HashNode Modern',
    description: 'Developer-focused design with clean code aesthetics and modern typography',
    preview: '/themes/hashnode-modern.jpg',
    styles: {
      primaryColor: '#2563eb',
      secondaryColor: '#f8fafc',
      accentColor: '#3b82f6',
      textColor: '#1e293b',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      headingFont: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      layout: 'grid',
      borderRadius: '12px',
      shadows: 'modern',
      spacing: 'comfortable',
      cardStyle: 'elevated',
      buttonStyle: 'modern',
      headerStyle: 'developer',
      navigationStyle: 'horizontal'
    }
  },
  {
    id: 'medium-inspired',
    name: 'Medium Inspired',
    description: 'Clean reading experience with focus on typography and content',
    preview: '/themes/medium-inspired.jpg',
    styles: {
      primaryColor: '#1a1a1a',
      secondaryColor: '#ffffff',
      accentColor: '#1a8917',
      textColor: '#292929',
      fontFamily: 'Charter, Georgia, serif',
      headingFont: 'SF Pro Display, -apple-system, sans-serif',
      layout: 'list',
      borderRadius: '4px',
      shadows: 'subtle',
      spacing: 'relaxed',
      cardStyle: 'minimal',
      buttonStyle: 'rounded',
      headerStyle: 'clean',
      navigationStyle: 'minimal'
    }
  },
  {
    id: 'notion-blocks',
    name: 'Notion Blocks',
    description: 'Block-based layout inspired by Notion with clean organization',
    preview: '/themes/notion-blocks.jpg',
    styles: {
      primaryColor: '#2f3437',
      secondaryColor: '#ffffff',
      accentColor: '#0f62fe',
      textColor: '#37352f',
      fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif',
      headingFont: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif',
      layout: 'minimal',
      borderRadius: '6px',
      shadows: 'none',
      spacing: 'tight',
      cardStyle: 'bordered',
      buttonStyle: 'minimal',
      headerStyle: 'minimal',
      navigationStyle: 'sidebar'
    }
  },
  {
    id: 'ghost-publication',
    name: 'Ghost Publication',
    description: 'Publication-focused design with editorial layout and typography',
    preview: '/themes/ghost-publication.jpg',
    styles: {
      primaryColor: '#15171a',
      secondaryColor: '#ffffff',
      accentColor: '#ff6b35',
      textColor: '#3c4858',
      fontFamily: 'Source Serif Pro, Georgia, serif',
      headingFont: 'Source Sans Pro, -apple-system, sans-serif',
      layout: 'magazine',
      borderRadius: '8px',
      shadows: 'editorial',
      spacing: 'editorial',
      cardStyle: 'editorial',
      buttonStyle: 'editorial',
      headerStyle: 'publication',
      navigationStyle: 'editorial'
    }
  },
  {
    id: 'substack-newsletter',
    name: 'Substack Newsletter',
    description: 'Newsletter-focused layout optimized for email-style content',
    preview: '/themes/substack-newsletter.jpg',
    styles: {
      primaryColor: '#ff6719',
      secondaryColor: '#f7f7f7',
      accentColor: '#ff6719',
      textColor: '#424242',
      fontFamily: 'Georgia, serif',
      headingFont: 'Helvetica Neue, Arial, sans-serif',
      layout: 'list',
      borderRadius: '4px',
      shadows: 'soft',
      spacing: 'newsletter',
      cardStyle: 'newsletter',
      buttonStyle: 'newsletter',
      headerStyle: 'newsletter',
      navigationStyle: 'simple'
    }
  },
  {
    id: 'devto-community',
    name: 'Dev.to Community',
    description: 'Community-driven design with developer-friendly features',
    preview: '/themes/devto-community.jpg',
    styles: {
      primaryColor: '#0a0a0a',
      secondaryColor: '#f9f9f9',
      accentColor: '#3b49df',
      textColor: '#0a0a0a',
      fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
      headingFont: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
      layout: 'grid',
      borderRadius: '6px',
      shadows: 'community',
      spacing: 'community',
      cardStyle: 'community',
      buttonStyle: 'community',
      headerStyle: 'community',
      navigationStyle: 'community'
    }
  },
  {
    id: 'techcrunch-news',
    name: 'TechCrunch News',
    description: 'News magazine layout with bold headlines and structured content',
    preview: '/themes/techcrunch-news.jpg',
    styles: {
      primaryColor: '#0f1419',
      secondaryColor: '#ffffff',
      accentColor: '#00d084',
      textColor: '#0f1419',
      fontFamily: 'Helvetica Neue, Arial, sans-serif',
      headingFont: 'Helvetica Neue, Arial, sans-serif',
      layout: 'magazine',
      borderRadius: '0px',
      shadows: 'news',
      spacing: 'news',
      cardStyle: 'news',
      buttonStyle: 'news',
      headerStyle: 'news',
      navigationStyle: 'news'
    }
  },
  {
    id: 'behance-creative',
    name: 'Behance Creative',
    description: 'Creative portfolio style with visual-first design approach',
    preview: '/themes/behance-creative.jpg',
    styles: {
      primaryColor: '#1769ff',
      secondaryColor: '#f5f5f5',
      accentColor: '#ff3366',
      textColor: '#191919',
      fontFamily: 'Adobe Clean, -apple-system, sans-serif',
      headingFont: 'Adobe Clean, -apple-system, sans-serif',
      layout: 'grid',
      borderRadius: '12px',
      shadows: 'creative',
      spacing: 'creative',
      cardStyle: 'creative',
      buttonStyle: 'creative',
      headerStyle: 'creative',
      navigationStyle: 'creative'
    }
  },
  {
    id: 'dribbble-visual',
    name: 'Dribbble Visual',
    description: 'Visual-first design with emphasis on imagery and creative layouts',
    preview: '/themes/dribbble-visual.jpg',
    styles: {
      primaryColor: '#ea4c89',
      secondaryColor: '#f8f7f4',
      accentColor: '#0d99ff',
      textColor: '#3d3d4e',
      fontFamily: 'Haas Grot Text, -apple-system, sans-serif',
      headingFont: 'Haas Grot Display, -apple-system, sans-serif',
      layout: 'grid',
      borderRadius: '16px',
      shadows: 'visual',
      spacing: 'visual',
      cardStyle: 'visual',
      buttonStyle: 'visual',
      headerStyle: 'visual',
      navigationStyle: 'visual'
    }
  },
  {
    id: 'linkedin-professional',
    name: 'LinkedIn Professional',
    description: 'Professional content layout optimized for business communication',
    preview: '/themes/linkedin-professional.jpg',
    styles: {
      primaryColor: '#0a66c2',
      secondaryColor: '#ffffff',
      accentColor: '#70b5f9',
      textColor: '#000000',
      fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, sans-serif',
      headingFont: '-apple-system, system-ui, BlinkMacSystemFont, sans-serif',
      layout: 'list',
      borderRadius: '8px',
      shadows: 'professional',
      spacing: 'professional',
      cardStyle: 'professional',
      buttonStyle: 'professional',
      headerStyle: 'professional',
      navigationStyle: 'professional'
    }
  },
  {
    id: 'modern-magazine',
    name: 'Modern Magazine',
    description: 'Editorial-style layout with sophisticated typography and grid system',
    preview: '/themes/modern-magazine.jpg',
    styles: {
      primaryColor: '#1a1a1a',
      secondaryColor: '#ffffff',
      accentColor: '#ff6b6b',
      textColor: '#2c2c2c',
      fontFamily: 'Playfair Display, Georgia, serif',
      headingFont: 'Montserrat, -apple-system, sans-serif',
      layout: 'magazine',
      borderRadius: '0px',
      shadows: 'magazine',
      spacing: 'magazine',
      cardStyle: 'magazine',
      buttonStyle: 'magazine',
      headerStyle: 'magazine',
      navigationStyle: 'magazine'
    }
  },
  {
    id: 'minimalist-blog',
    name: 'Minimalist Blog',
    description: 'Ultra-clean design with focus on content and readability',
    preview: '/themes/minimalist-blog.jpg',
    styles: {
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      accentColor: '#6366f1',
      textColor: '#374151',
      fontFamily: 'Inter, -apple-system, sans-serif',
      headingFont: 'Inter, -apple-system, sans-serif',
      layout: 'minimal',
      borderRadius: '0px',
      shadows: 'none',
      spacing: 'minimal',
      cardStyle: 'minimal',
      buttonStyle: 'minimal',
      headerStyle: 'minimal',
      navigationStyle: 'minimal'
    }
  },
  {
    id: 'dark-developer',
    name: 'Dark Developer',
    description: 'Developer-friendly dark theme with syntax highlighting aesthetics',
    preview: '/themes/dark-developer.jpg',
    styles: {
      primaryColor: '#0d1117',
      secondaryColor: '#161b22',
      accentColor: '#58a6ff',
      textColor: '#f0f6fc',
      fontFamily: 'JetBrains Mono, Consolas, monospace',
      headingFont: 'Inter, -apple-system, sans-serif',
      layout: 'grid',
      borderRadius: '6px',
      shadows: 'dark',
      spacing: 'developer',
      cardStyle: 'dark',
      buttonStyle: 'dark',
      headerStyle: 'dark',
      navigationStyle: 'dark'
    }
  },
  {
    id: 'academic-journal',
    name: 'Academic Journal',
    description: 'Research-focused layout with academic formatting and citations',
    preview: '/themes/academic-journal.jpg',
    styles: {
      primaryColor: '#1e3a8a',
      secondaryColor: '#f8fafc',
      accentColor: '#3b82f6',
      textColor: '#1e293b',
      fontFamily: 'Times New Roman, Times, serif',
      headingFont: 'Times New Roman, Times, serif',
      layout: 'list',
      borderRadius: '4px',
      shadows: 'academic',
      spacing: 'academic',
      cardStyle: 'academic',
      buttonStyle: 'academic',
      headerStyle: 'academic',
      navigationStyle: 'academic'
    }
  },
  {
    id: 'creative-agency',
    name: 'Creative Agency',
    description: 'Bold, modern design with vibrant colors and dynamic layouts',
    preview: '/themes/creative-agency.jpg',
    styles: {
      primaryColor: '#ff3366',
      secondaryColor: '#f8f9fa',
      accentColor: '#00d4aa',
      textColor: '#212529',
      fontFamily: 'Poppins, -apple-system, sans-serif',
      headingFont: 'Poppins, -apple-system, sans-serif',
      layout: 'grid',
      borderRadius: '20px',
      shadows: 'bold',
      spacing: 'dynamic',
      cardStyle: 'bold',
      buttonStyle: 'bold',
      headerStyle: 'bold',
      navigationStyle: 'bold'
    }
  },
  {
    id: 'startup-tech',
    name: 'Startup Tech',
    description: 'Tech startup aesthetic with modern gradients and clean interfaces',
    preview: '/themes/startup-tech.jpg',
    styles: {
      primaryColor: '#667eea',
      secondaryColor: '#ffffff',
      accentColor: '#764ba2',
      textColor: '#2d3748',
      fontFamily: 'Inter, -apple-system, sans-serif',
      headingFont: 'Inter, -apple-system, sans-serif',
      layout: 'grid',
      borderRadius: '12px',
      shadows: 'startup',
      spacing: 'startup',
      cardStyle: 'startup',
      buttonStyle: 'startup',
      headerStyle: 'startup',
      navigationStyle: 'startup'
    }
  },
  {
    id: 'personal-brand',
    name: 'Personal Brand',
    description: 'Individual blogger focus with personal branding elements',
    preview: '/themes/personal-brand.jpg',
    styles: {
      primaryColor: '#8b5cf6',
      secondaryColor: '#faf5ff',
      accentColor: '#a78bfa',
      textColor: '#374151',
      fontFamily: 'Source Sans Pro, -apple-system, sans-serif',
      headingFont: 'Source Sans Pro, -apple-system, sans-serif',
      layout: 'minimal',
      borderRadius: '8px',
      shadows: 'personal',
      spacing: 'personal',
      cardStyle: 'personal',
      buttonStyle: 'personal',
      headerStyle: 'personal',
      navigationStyle: 'personal'
    }
  },
  {
    id: 'corporate-business',
    name: 'Corporate Business',
    description: 'Business-professional style with corporate branding elements',
    preview: '/themes/corporate-business.jpg',
    styles: {
      primaryColor: '#1e40af',
      secondaryColor: '#f8fafc',
      accentColor: '#3b82f6',
      textColor: '#1e293b',
      fontFamily: 'Open Sans, -apple-system, sans-serif',
      headingFont: 'Open Sans, -apple-system, sans-serif',
      layout: 'list',
      borderRadius: '4px',
      shadows: 'corporate',
      spacing: 'corporate',
      cardStyle: 'corporate',
      buttonStyle: 'corporate',
      headerStyle: 'corporate',
      navigationStyle: 'corporate'
    }
  },
  {
    id: 'photography-portfolio',
    name: 'Photography Portfolio',
    description: 'Image-centric layout optimized for visual storytelling',
    preview: '/themes/photography-portfolio.jpg',
    styles: {
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      accentColor: '#f59e0b',
      textColor: '#374151',
      fontFamily: 'Lato, -apple-system, sans-serif',
      headingFont: 'Lato, -apple-system, sans-serif',
      layout: 'grid',
      borderRadius: '0px',
      shadows: 'photography',
      spacing: 'photography',
      cardStyle: 'photography',
      buttonStyle: 'photography',
      headerStyle: 'photography',
      navigationStyle: 'photography'
    }
  },
  {
    id: 'food-lifestyle',
    name: 'Food & Lifestyle',
    description: 'Recipe and lifestyle focused with warm, inviting design',
    preview: '/themes/food-lifestyle.jpg',
    styles: {
      primaryColor: '#dc2626',
      secondaryColor: '#fef2f2',
      accentColor: '#f97316',
      textColor: '#374151',
      fontFamily: 'Crimson Text, Georgia, serif',
      headingFont: 'Playfair Display, Georgia, serif',
      layout: 'magazine',
      borderRadius: '12px',
      shadows: 'warm',
      spacing: 'lifestyle',
      cardStyle: 'lifestyle',
      buttonStyle: 'lifestyle',
      headerStyle: 'lifestyle',
      navigationStyle: 'lifestyle'
    }
  },
  {
    id: 'travel-adventure',
    name: 'Travel & Adventure',
    description: 'Adventure and journey focused with wanderlust-inspiring design',
    preview: '/themes/travel-adventure.jpg',
    styles: {
      primaryColor: '#0891b2',
      secondaryColor: '#f0f9ff',
      accentColor: '#0284c7',
      textColor: '#0f172a',
      fontFamily: 'Nunito, -apple-system, sans-serif',
      headingFont: 'Nunito, -apple-system, sans-serif',
      layout: 'grid',
      borderRadius: '16px',
      shadows: 'adventure',
      spacing: 'adventure',
      cardStyle: 'adventure',
      buttonStyle: 'adventure',
      headerStyle: 'adventure',
      navigationStyle: 'adventure'
    }
  },
  {
    id: 'fashion-style',
    name: 'Fashion & Style',
    description: 'Style and trend focused with elegant, sophisticated design',
    preview: '/themes/fashion-style.jpg',
    styles: {
      primaryColor: '#be185d',
      secondaryColor: '#fdf2f8',
      accentColor: '#ec4899',
      textColor: '#374151',
      fontFamily: 'Cormorant Garamond, Georgia, serif',
      headingFont: 'Cormorant Garamond, Georgia, serif',
      layout: 'magazine',
      borderRadius: '8px',
      shadows: 'elegant',
      spacing: 'fashion',
      cardStyle: 'fashion',
      buttonStyle: 'fashion',
      headerStyle: 'fashion',
      navigationStyle: 'fashion'
    }
  },
  {
    id: 'tech-review',
    name: 'Tech Review',
    description: 'Product review focused with technical specifications layout',
    preview: '/themes/tech-review.jpg',
    styles: {
      primaryColor: '#059669',
      secondaryColor: '#f0fdf4',
      accentColor: '#10b981',
      textColor: '#065f46',
      fontFamily: 'Roboto, -apple-system, sans-serif',
      headingFont: 'Roboto, -apple-system, sans-serif',
      layout: 'list',
      borderRadius: '8px',
      shadows: 'tech',
      spacing: 'tech',
      cardStyle: 'tech',
      buttonStyle: 'tech',
      headerStyle: 'tech',
      navigationStyle: 'tech'
    }
  },
  {
    id: 'educational-learning',
    name: 'Educational Learning',
    description: 'Learning and tutorial focused with clear instructional design',
    preview: '/themes/educational-learning.jpg',
    styles: {
      primaryColor: '#7c3aed',
      secondaryColor: '#faf5ff',
      accentColor: '#a855f7',
      textColor: '#374151',
      fontFamily: 'Source Sans Pro, -apple-system, sans-serif',
      headingFont: 'Source Sans Pro, -apple-system, sans-serif',
      layout: 'list',
      borderRadius: '8px',
      shadows: 'educational',
      spacing: 'educational',
      cardStyle: 'educational',
      buttonStyle: 'educational',
      headerStyle: 'educational',
      navigationStyle: 'educational'
    }
  },
  {
    id: 'news-portal',
    name: 'News Portal',
    description: 'Breaking news layout with urgent, attention-grabbing design',
    preview: '/themes/news-portal.jpg',
    styles: {
      primaryColor: '#dc2626',
      secondaryColor: '#ffffff',
      accentColor: '#991b1b',
      textColor: '#1f2937',
      fontFamily: 'Arial, Helvetica, sans-serif',
      headingFont: 'Arial, Helvetica, sans-serif',
      layout: 'magazine',
      borderRadius: '0px',
      shadows: 'news',
      spacing: 'news',
      cardStyle: 'news',
      buttonStyle: 'news',
      headerStyle: 'news',
      navigationStyle: 'news'
    }
  },
  {
    id: 'glassmorphism-modern',
    name: 'Glassmorphism Modern',
    description: 'Ultra-modern glassmorphism design with frosted glass effects and vibrant gradients',
    preview: '/themes/glassmorphism-modern.jpg',
    styles: {
      primaryColor: '#667eea',
      secondaryColor: '#f7fafc',
      accentColor: '#764ba2',
      textColor: '#2d3748',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      headingFont: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      layout: 'grid',
      borderRadius: '20px',
      shadows: 'glassmorphism',
      spacing: 'modern',
      cardStyle: 'glassmorphism',
      buttonStyle: 'glassmorphism',
      headerStyle: 'glassmorphism',
      navigationStyle: 'glassmorphism'
    }
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon',
    description: 'Futuristic cyberpunk design with neon accents and dark sci-fi aesthetics',
    preview: '/themes/cyberpunk-neon.jpg',
    styles: {
      primaryColor: '#0a0a0a',
      secondaryColor: '#1a1a2e',
      accentColor: '#00ff88',
      textColor: '#e0e0e0',
      fontFamily: 'JetBrains Mono, Consolas, monospace',
      headingFont: 'Orbitron, monospace',
      layout: 'grid',
      borderRadius: '0px',
      shadows: 'neon',
      spacing: 'cyberpunk',
      cardStyle: 'cyberpunk',
      buttonStyle: 'cyberpunk',
      headerStyle: 'cyberpunk',
      navigationStyle: 'cyberpunk'
    }
  },
  {
    id: 'brutalist-concrete',
    name: 'Brutalist Concrete',
    description: 'Bold brutalist design with raw concrete aesthetics and strong geometric shapes',
    preview: '/themes/brutalist-concrete.jpg',
    styles: {
      primaryColor: '#2c2c2c',
      secondaryColor: '#f5f5f5',
      accentColor: '#ff6b35',
      textColor: '#1a1a1a',
      fontFamily: 'Arial Black, Arial, sans-serif',
      headingFont: 'Impact, Arial Black, sans-serif',
      layout: 'magazine',
      borderRadius: '0px',
      shadows: 'harsh',
      spacing: 'brutalist',
      cardStyle: 'brutalist',
      buttonStyle: 'brutalist',
      headerStyle: 'brutalist',
      navigationStyle: 'brutalist'
    }
  },
  {
    id: 'neumorphism-soft',
    name: 'Neumorphism Soft',
    description: 'Soft neumorphism design with subtle shadows and tactile interface elements',
    preview: '/themes/neumorphism-soft.jpg',
    styles: {
      primaryColor: '#e0e5ec',
      secondaryColor: '#e0e5ec',
      accentColor: '#5a67d8',
      textColor: '#4a5568',
      fontFamily: 'SF Pro Display, -apple-system, sans-serif',
      headingFont: 'SF Pro Display, -apple-system, sans-serif',
      layout: 'minimal',
      borderRadius: '16px',
      shadows: 'neumorphism',
      spacing: 'neumorphism',
      cardStyle: 'neumorphism',
      buttonStyle: 'neumorphism',
      headerStyle: 'neumorphism',
      navigationStyle: 'neumorphism'
    }
  },
  {
    id: 'retro-synthwave',
    name: 'Retro Synthwave',
    description: '80s-inspired synthwave design with neon grids and retro-futuristic aesthetics',
    preview: '/themes/retro-synthwave.jpg',
    styles: {
      primaryColor: '#1a0033',
      secondaryColor: '#0d001a',
      accentColor: '#ff0080',
      textColor: '#ffffff',
      fontFamily: 'Orbitron, monospace',
      headingFont: 'Orbitron, monospace',
      layout: 'grid',
      borderRadius: '8px',
      shadows: 'synthwave',
      spacing: 'synthwave',
      cardStyle: 'synthwave',
      buttonStyle: 'synthwave',
      headerStyle: 'synthwave',
      navigationStyle: 'synthwave'
    }
  },
  {
    id: 'organic-nature',
    name: 'Organic Nature',
    description: 'Organic design inspired by nature with flowing curves and earth tones',
    preview: '/themes/organic-nature.jpg',
    styles: {
      primaryColor: '#2d5016',
      secondaryColor: '#f7f9f3',
      accentColor: '#7cb342',
      textColor: '#1b5e20',
      fontFamily: 'Crimson Text, Georgia, serif',
      headingFont: 'Playfair Display, Georgia, serif',
      layout: 'magazine',
      borderRadius: '24px',
      shadows: 'organic',
      spacing: 'organic',
      cardStyle: 'organic',
      buttonStyle: 'organic',
      headerStyle: 'organic',
      navigationStyle: 'organic'
    }
  },
  {
    id: 'luxury-gold',
    name: 'Luxury Gold',
    description: 'Premium luxury design with gold accents and sophisticated typography',
    preview: '/themes/luxury-gold.jpg',
    styles: {
      primaryColor: '#1a1a1a',
      secondaryColor: '#fafafa',
      accentColor: '#d4af37',
      textColor: '#2c2c2c',
      fontFamily: 'Playfair Display, Georgia, serif',
      headingFont: 'Playfair Display, Georgia, serif',
      layout: 'magazine',
      borderRadius: '8px',
      shadows: 'luxury',
      spacing: 'luxury',
      cardStyle: 'luxury',
      buttonStyle: 'luxury',
      headerStyle: 'luxury',
      navigationStyle: 'luxury'
    }
  },
  {
    id: 'kawaii-pastel',
    name: 'Kawaii Pastel',
    description: 'Cute kawaii design with soft pastel colors and playful elements',
    preview: '/themes/kawaii-pastel.jpg',
    styles: {
      primaryColor: '#ffb3d9',
      secondaryColor: '#fff0f8',
      accentColor: '#ff80cc',
      textColor: '#4a4a4a',
      fontFamily: 'Nunito, -apple-system, sans-serif',
      headingFont: 'Nunito, -apple-system, sans-serif',
      layout: 'grid',
      borderRadius: '20px',
      shadows: 'kawaii',
      spacing: 'kawaii',
      cardStyle: 'kawaii',
      buttonStyle: 'kawaii',
      headerStyle: 'kawaii',
      navigationStyle: 'kawaii'
    }
  },
  {
    id: 'industrial-steel',
    name: 'Industrial Steel',
    description: 'Industrial design with metallic textures and mechanical aesthetics',
    preview: '/themes/industrial-steel.jpg',
    styles: {
      primaryColor: '#37474f',
      secondaryColor: '#eceff1',
      accentColor: '#ff5722',
      textColor: '#263238',
      fontFamily: 'Roboto Condensed, Arial, sans-serif',
      headingFont: 'Roboto Condensed, Arial, sans-serif',
      layout: 'list',
      borderRadius: '4px',
      shadows: 'industrial',
      spacing: 'industrial',
      cardStyle: 'industrial',
      buttonStyle: 'industrial',
      headerStyle: 'industrial',
      navigationStyle: 'industrial'
    }
  },
  {
    id: 'holographic-iridescent',
    name: 'Holographic Iridescent',
    description: 'Futuristic holographic design with iridescent colors and prismatic effects',
    preview: '/themes/holographic-iridescent.jpg',
    styles: {
      primaryColor: '#1a1a2e',
      secondaryColor: '#16213e',
      accentColor: '#00d4ff',
      textColor: '#ffffff',
      fontFamily: 'Space Grotesk, -apple-system, sans-serif',
      headingFont: 'Space Grotesk, -apple-system, sans-serif',
      layout: 'grid',
      borderRadius: '12px',
      shadows: 'holographic',
      spacing: 'holographic',
      cardStyle: 'holographic',
      buttonStyle: 'holographic',
      headerStyle: 'holographic',
      navigationStyle: 'holographic'
    }
  },
  {
    id: 'art-deco-vintage',
    name: 'Art Deco Vintage',
    description: 'Elegant Art Deco design with vintage glamour and geometric patterns',
    preview: '/themes/art-deco-vintage.jpg',
    styles: {
      primaryColor: '#1a1a1a',
      secondaryColor: '#f8f6f0',
      accentColor: '#c9a96e',
      textColor: '#2c2c2c',
      fontFamily: 'Cormorant Garamond, Georgia, serif',
      headingFont: 'Cormorant Garamond, Georgia, serif',
      layout: 'magazine',
      borderRadius: '0px',
      shadows: 'vintage',
      spacing: 'vintage',
      cardStyle: 'vintage',
      buttonStyle: 'vintage',
      headerStyle: 'vintage',
      navigationStyle: 'vintage'
    }
  },
  {
    id: 'nordic-minimal',
    name: 'Nordic Minimal',
    description: 'Scandinavian-inspired minimal design with clean lines and natural colors',
    preview: '/themes/nordic-minimal.jpg',
    styles: {
      primaryColor: '#2c3e50',
      secondaryColor: '#ffffff',
      accentColor: '#3498db',
      textColor: '#34495e',
      fontFamily: 'Source Sans Pro, -apple-system, sans-serif',
      headingFont: 'Source Sans Pro, -apple-system, sans-serif',
      layout: 'minimal',
      borderRadius: '8px',
      shadows: 'minimal',
      spacing: 'nordic',
      cardStyle: 'nordic',
      buttonStyle: 'nordic',
      headerStyle: 'nordic',
      navigationStyle: 'nordic'
    }
  },
  {
    id: 'cosmic-space',
    name: 'Cosmic Space',
    description: 'Space-themed design with cosmic gradients and stellar visual effects',
    preview: '/themes/cosmic-space.jpg',
    styles: {
      primaryColor: '#0c0c1e',
      secondaryColor: '#1a1a2e',
      accentColor: '#7209b7',
      textColor: '#ffffff',
      fontFamily: 'Space Mono, monospace',
      headingFont: 'Space Mono, monospace',
      layout: 'grid',
      borderRadius: '16px',
      shadows: 'cosmic',
      spacing: 'cosmic',
      cardStyle: 'cosmic',
      buttonStyle: 'cosmic',
      headerStyle: 'cosmic',
      navigationStyle: 'cosmic'
    }
  },
  {
    id: 'watercolor-artistic',
    name: 'Watercolor Artistic',
    description: 'Artistic watercolor design with soft brushstrokes and creative layouts',
    preview: '/themes/watercolor-artistic.jpg',
    styles: {
      primaryColor: '#6a4c93',
      secondaryColor: '#fef9f3',
      accentColor: '#ff6b9d',
      textColor: '#4a4a4a',
      fontFamily: 'Dancing Script, cursive',
      headingFont: 'Playfair Display, Georgia, serif',
      layout: 'magazine',
      borderRadius: '20px',
      shadows: 'artistic',
      spacing: 'artistic',
      cardStyle: 'artistic',
      buttonStyle: 'artistic',
      headerStyle: 'artistic',
      navigationStyle: 'artistic'
    }
  },
  {
    id: 'matrix-code',
    name: 'Matrix Code',
    description: 'Matrix-inspired design with falling code effects and hacker aesthetics',
    preview: '/themes/matrix-code.jpg',
    styles: {
      primaryColor: '#000000',
      secondaryColor: '#001100',
      accentColor: '#00ff00',
      textColor: '#00ff00',
      fontFamily: 'Courier New, monospace',
      headingFont: 'Courier New, monospace',
      layout: 'list',
      borderRadius: '0px',
      shadows: 'matrix',
      spacing: 'matrix',
      cardStyle: 'matrix',
      buttonStyle: 'matrix',
      headerStyle: 'matrix',
      navigationStyle: 'matrix'
    }
  },
  {
    id: 'tropical-paradise',
    name: 'Tropical Paradise',
    description: 'Vibrant tropical design with lush colors and vacation vibes',
    preview: '/themes/tropical-paradise.jpg',
    styles: {
      primaryColor: '#00695c',
      secondaryColor: '#e0f2f1',
      accentColor: '#ff7043',
      textColor: '#004d40',
      fontFamily: 'Lato, -apple-system, sans-serif',
      headingFont: 'Lato, -apple-system, sans-serif',
      layout: 'grid',
      borderRadius: '16px',
      shadows: 'tropical',
      spacing: 'tropical',
      cardStyle: 'tropical',
      buttonStyle: 'tropical',
      headerStyle: 'tropical',
      navigationStyle: 'tropical'
    }
  },
  {
    id: 'steampunk-vintage',
    name: 'Steampunk Vintage',
    description: 'Victorian steampunk design with brass accents and mechanical elements',
    preview: '/themes/steampunk-vintage.jpg',
    styles: {
      primaryColor: '#3e2723',
      secondaryColor: '#efebe9',
      accentColor: '#bf360c',
      textColor: '#1a1a1a',
      fontFamily: 'Crimson Text, Georgia, serif',
      headingFont: 'Cinzel, Georgia, serif',
      layout: 'magazine',
      borderRadius: '8px',
      shadows: 'steampunk',
      spacing: 'steampunk',
      cardStyle: 'steampunk',
      buttonStyle: 'steampunk',
      headerStyle: 'steampunk',
      navigationStyle: 'steampunk'
    }
  },
  {
    id: 'neon-tokyo',
    name: 'Neon Tokyo',
    description: 'Tokyo-inspired neon design with Japanese aesthetics and vibrant colors',
    preview: '/themes/neon-tokyo.jpg',
    styles: {
      primaryColor: '#1a1a2e',
      secondaryColor: '#16213e',
      accentColor: '#ff0080',
      textColor: '#ffffff',
      fontFamily: 'Noto Sans JP, -apple-system, sans-serif',
      headingFont: 'Noto Sans JP, -apple-system, sans-serif',
      layout: 'grid',
      borderRadius: '12px',
      shadows: 'neon',
      spacing: 'tokyo',
      cardStyle: 'tokyo',
      buttonStyle: 'tokyo',
      headerStyle: 'tokyo',
      navigationStyle: 'tokyo'
    }
  },
  {
    id: 'aurora-borealis',
    name: 'Aurora Borealis',
    description: 'Northern lights inspired design with ethereal gradients and mystical colors',
    preview: '/themes/aurora-borealis.jpg',
    styles: {
      primaryColor: '#1a237e',
      secondaryColor: '#e8eaf6',
      accentColor: '#00e676',
      textColor: '#1a1a1a',
      fontFamily: 'Quicksand, -apple-system, sans-serif',
      headingFont: 'Quicksand, -apple-system, sans-serif',
      layout: 'grid',
      borderRadius: '20px',
      shadows: 'aurora',
      spacing: 'aurora',
      cardStyle: 'aurora',
      buttonStyle: 'aurora',
      headerStyle: 'aurora',
      navigationStyle: 'aurora'
    }
  },
  {
    id: 'desert-sunset',
    name: 'Desert Sunset',
    description: 'Warm desert sunset design with earthy tones and southwestern vibes',
    preview: '/themes/desert-sunset.jpg',
    styles: {
      primaryColor: '#bf360c',
      secondaryColor: '#fff3e0',
      accentColor: '#ff9800',
      textColor: '#3e2723',
      fontFamily: 'Merriweather, Georgia, serif',
      headingFont: 'Merriweather, Georgia, serif',
      layout: 'magazine',
      borderRadius: '12px',
      shadows: 'desert',
      spacing: 'desert',
      cardStyle: 'desert',
      buttonStyle: 'desert',
      headerStyle: 'desert',
      navigationStyle: 'desert'
    }
  },
  {
    id: 'ocean-depths',
    name: 'Ocean Depths',
    description: 'Deep ocean design with aquatic blues and underwater mystique',
    preview: '/themes/ocean-depths.jpg',
    styles: {
      primaryColor: '#0d47a1',
      secondaryColor: '#e3f2fd',
      accentColor: '#00bcd4',
      textColor: '#1a1a1a',
      fontFamily: 'Lora, Georgia, serif',
      headingFont: 'Lora, Georgia, serif',
      layout: 'grid',
      borderRadius: '16px',
      shadows: 'ocean',
      spacing: 'ocean',
      cardStyle: 'ocean',
      buttonStyle: 'ocean',
      headerStyle: 'ocean',
      navigationStyle: 'ocean'
    }
  },
  {
    id: 'crystal-prism',
    name: 'Crystal Prism',
    description: 'Crystalline design with prismatic effects and geometric crystal patterns',
    preview: '/themes/crystal-prism.jpg',
    styles: {
      primaryColor: '#4a148c',
      secondaryColor: '#f3e5f5',
      accentColor: '#e91e63',
      textColor: '#1a1a1a',
      fontFamily: 'Raleway, -apple-system, sans-serif',
      headingFont: 'Raleway, -apple-system, sans-serif',
      layout: 'grid',
      borderRadius: '0px',
      shadows: 'crystal',
      spacing: 'crystal',
      cardStyle: 'crystal',
      buttonStyle: 'crystal',
      headerStyle: 'crystal',
      navigationStyle: 'crystal'
    }
  },
  {
    id: 'forest-canopy',
    name: 'Forest Canopy',
    description: 'Lush forest design with green canopy and natural woodland aesthetics',
    preview: '/themes/forest-canopy.jpg',
    styles: {
      primaryColor: '#1b5e20',
      secondaryColor: '#e8f5e8',
      accentColor: '#4caf50',
      textColor: '#2e7d32',
      fontFamily: 'Libre Baskerville, Georgia, serif',
      headingFont: 'Libre Baskerville, Georgia, serif',
      layout: 'magazine',
      borderRadius: '24px',
      shadows: 'forest',
      spacing: 'forest',
      cardStyle: 'forest',
      buttonStyle: 'forest',
      headerStyle: 'forest',
      navigationStyle: 'forest'
    }
  },
  {
    id: 'midnight-galaxy',
    name: 'Midnight Galaxy',
    description: 'Galactic midnight design with starfield backgrounds and cosmic elements',
    preview: '/themes/midnight-galaxy.jpg',
    styles: {
      primaryColor: '#0a0a0a',
      secondaryColor: '#1a1a2e',
      accentColor: '#9c27b0',
      textColor: '#ffffff',
      fontFamily: 'Exo 2, -apple-system, sans-serif',
      headingFont: 'Exo 2, -apple-system, sans-serif',
      layout: 'grid',
      borderRadius: '16px',
      shadows: 'galaxy',
      spacing: 'galaxy',
      cardStyle: 'galaxy',
      buttonStyle: 'galaxy',
      headerStyle: 'galaxy',
      navigationStyle: 'galaxy'
    }
  },
  {
    id: 'vintage-newspaper',
    name: 'Vintage Newspaper',
    description: 'Classic newspaper design with vintage typography and editorial layouts',
    preview: '/themes/vintage-newspaper.jpg',
    styles: {
      primaryColor: '#1a1a1a',
      secondaryColor: '#f5f5dc',
      accentColor: '#8b0000',
      textColor: '#2c2c2c',
      fontFamily: 'Times New Roman, Georgia, serif',
      headingFont: 'Times New Roman, Georgia, serif',
      layout: 'magazine',
      borderRadius: '0px',
      shadows: 'vintage',
      spacing: 'newspaper',
      cardStyle: 'newspaper',
      buttonStyle: 'newspaper',
      headerStyle: 'newspaper',
      navigationStyle: 'newspaper'
    }
  },
  {
    id: 'electric-circuit',
    name: 'Electric Circuit',
    description: 'Electronic circuit design with tech patterns and electric blue accents',
    preview: '/themes/electric-circuit.jpg',
    styles: {
      primaryColor: '#0d1421',
      secondaryColor: '#1a202c',
      accentColor: '#00d4ff',
      textColor: '#e2e8f0',
      fontFamily: 'Fira Code, monospace',
      headingFont: 'Fira Code, monospace',
      layout: 'grid',
      borderRadius: '8px',
      shadows: 'electric',
      spacing: 'electric',
      cardStyle: 'electric',
      buttonStyle: 'electric',
      headerStyle: 'electric',
      navigationStyle: 'electric'
    }
  },
  {
    id: 'cherry-blossom',
    name: 'Cherry Blossom',
    description: 'Japanese cherry blossom design with soft pinks and zen aesthetics',
    preview: '/themes/cherry-blossom.jpg',
    styles: {
      primaryColor: '#880e4f',
      secondaryColor: '#fce4ec',
      accentColor: '#e91e63',
      textColor: '#4a4a4a',
      fontFamily: 'Noto Serif JP, Georgia, serif',
      headingFont: 'Noto Serif JP, Georgia, serif',
      layout: 'minimal',
      borderRadius: '20px',
      shadows: 'zen',
      spacing: 'zen',
      cardStyle: 'zen',
      buttonStyle: 'zen',
      headerStyle: 'zen',
      navigationStyle: 'zen'
    }
  },
  {
    id: 'urban-graffiti',
    name: 'Urban Graffiti',
    description: 'Street art inspired design with graffiti elements and urban culture',
    preview: '/themes/urban-graffiti.jpg',
    styles: {
      primaryColor: '#212121',
      secondaryColor: '#fafafa',
      accentColor: '#ff5722',
      textColor: '#424242',
      fontFamily: 'Bangers, cursive',
      headingFont: 'Bangers, cursive',
      layout: 'magazine',
      borderRadius: '0px',
      shadows: 'urban',
      spacing: 'urban',
      cardStyle: 'urban',
      buttonStyle: 'urban',
      headerStyle: 'urban',
      navigationStyle: 'urban'
    }
  },
  {
    id: 'arctic-ice',
    name: 'Arctic Ice',
    description: 'Cool arctic design with icy blues and crystalline frost effects',
    preview: '/themes/arctic-ice.jpg',
    styles: {
      primaryColor: '#0277bd',
      secondaryColor: '#e1f5fe',
      accentColor: '#00acc1',
      textColor: '#01579b',
      fontFamily: 'Roboto, -apple-system, sans-serif',
      headingFont: 'Roboto, -apple-system, sans-serif',
      layout: 'grid',
      borderRadius: '12px',
      shadows: 'arctic',
      spacing: 'arctic',
      cardStyle: 'arctic',
      buttonStyle: 'arctic',
      headerStyle: 'arctic',
      navigationStyle: 'arctic'
    }
  },
  {
    id: 'volcanic-fire',
    name: 'Volcanic Fire',
    description: 'Fiery volcanic design with lava colors and molten rock textures',
    preview: '/themes/volcanic-fire.jpg',
    styles: {
      primaryColor: '#bf360c',
      secondaryColor: '#fff3e0',
      accentColor: '#ff5722',
      textColor: '#3e2723',
      fontFamily: 'Oswald, -apple-system, sans-serif',
      headingFont: 'Oswald, -apple-system, sans-serif',
      layout: 'magazine',
      borderRadius: '8px',
      shadows: 'volcanic',
      spacing: 'volcanic',
      cardStyle: 'volcanic',
      buttonStyle: 'volcanic',
      headerStyle: 'volcanic',
      navigationStyle: 'volcanic'
    }
  },
  {
    id: 'quantum-physics',
    name: 'Quantum Physics',
    description: 'Scientific quantum design with particle effects and physics-inspired layouts',
    preview: '/themes/quantum-physics.jpg',
    styles: {
      primaryColor: '#1a237e',
      secondaryColor: '#e8eaf6',
      accentColor: '#3f51b5',
      textColor: '#1a1a1a',
      fontFamily: 'Computer Modern, serif',
      headingFont: 'Computer Modern, serif',
      layout: 'list',
      borderRadius: '4px',
      shadows: 'quantum',
      spacing: 'quantum',
      cardStyle: 'quantum',
      buttonStyle: 'quantum',
      headerStyle: 'quantum',
      navigationStyle: 'quantum'
    }
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    description: 'Warm golden hour design with sunset colors and magical lighting',
    preview: '/themes/golden-hour.jpg',
    styles: {
      primaryColor: '#e65100',
      secondaryColor: '#fff8e1',
      accentColor: '#ffc107',
      textColor: '#3e2723',
      fontFamily: 'Libre Baskerville, Georgia, serif',
      headingFont: 'Libre Baskerville, Georgia, serif',
      layout: 'grid',
      borderRadius: '16px',
      shadows: 'golden',
      spacing: 'golden',
      cardStyle: 'golden',
      buttonStyle: 'golden',
      headerStyle: 'golden',
      navigationStyle: 'golden'
    }
  },
  {
    id: 'digital-rain',
    name: 'Digital Rain',
    description: 'Matrix-style digital rain with cascading code and cyber aesthetics',
    preview: '/themes/digital-rain.jpg',
    styles: {
      primaryColor: '#000000',
      secondaryColor: '#0a0a0a',
      accentColor: '#00ff41',
      textColor: '#00ff41',
      fontFamily: 'Source Code Pro, monospace',
      headingFont: 'Source Code Pro, monospace',
      layout: 'list',
      borderRadius: '0px',
      shadows: 'digital',
      spacing: 'digital',
      cardStyle: 'digital',
      buttonStyle: 'digital',
      headerStyle: 'digital',
      navigationStyle: 'digital'
    }
  },
  {
    id: 'cosmic-nebula',
    name: 'Cosmic Nebula',
    description: 'Nebula-inspired design with cosmic clouds and stellar formations',
    preview: '/themes/cosmic-nebula.jpg',
    styles: {
      primaryColor: '#1a0033',
      secondaryColor: '#0d001a',
      accentColor: '#ff6ec7',
      textColor: '#ffffff',
      fontFamily: 'Space Grotesk, -apple-system, sans-serif',
      headingFont: 'Space Grotesk, -apple-system, sans-serif',
      layout: 'grid',
      borderRadius: '20px',
      shadows: 'nebula',
      spacing: 'nebula',
      cardStyle: 'nebula',
      buttonStyle: 'nebula',
      headerStyle: 'nebula',
      navigationStyle: 'nebula'
    }
  },
  {
    id: 'zen-garden',
    name: 'Zen Garden',
    description: 'Peaceful zen garden design with minimalist aesthetics and natural harmony',
    preview: '/themes/zen-garden.jpg',
    styles: {
      primaryColor: '#3e2723',
      secondaryColor: '#f5f5f5',
      accentColor: '#8bc34a',
      textColor: '#424242',
      fontFamily: 'Noto Sans, -apple-system, sans-serif',
      headingFont: 'Noto Sans, -apple-system, sans-serif',
      layout: 'minimal',
      borderRadius: '24px',
      shadows: 'zen',
      spacing: 'zen',
      cardStyle: 'zen',
      buttonStyle: 'zen',
      headerStyle: 'zen',
      navigationStyle: 'zen'
    }
  }
];

// Helper function to get theme by ID
export const getThemeById = (themeId: string): BlogTheme | undefined => {
  return BLOG_THEMES.find(theme => theme.id === themeId);
};

// Helper function to get themes by category
export const getThemesByCategory = (category: string): BlogTheme[] => {
  if (category === 'all') return BLOG_THEMES;

  return BLOG_THEMES.filter(theme =>
    theme.name.toLowerCase().includes(category.toLowerCase()) ||
    theme.description.toLowerCase().includes(category.toLowerCase())
  );
};

// Helper function to get theme categories
export const getThemeCategories = () => {
  return [
    { id: 'all', name: 'All Themes', count: BLOG_THEMES.length },
    { id: 'modern', name: 'Modern', count: BLOG_THEMES.filter(t => t.name.toLowerCase().includes('modern')).length },
    { id: 'professional', name: 'Professional', count: BLOG_THEMES.filter(t => t.description.toLowerCase().includes('professional') || t.description.toLowerCase().includes('business')).length },
    { id: 'creative', name: 'Creative', count: BLOG_THEMES.filter(t => t.description.toLowerCase().includes('creative') || t.description.toLowerCase().includes('artistic')).length },
    { id: 'minimal', name: 'Minimal', count: BLOG_THEMES.filter(t => t.description.toLowerCase().includes('minimal') || t.description.toLowerCase().includes('clean')).length },
    { id: 'dark', name: 'Dark', count: BLOG_THEMES.filter(t => t.name.toLowerCase().includes('dark') || t.description.toLowerCase().includes('dark')).length },
    { id: 'futuristic', name: 'Futuristic', count: BLOG_THEMES.filter(t => t.description.toLowerCase().includes('futuristic') || t.description.toLowerCase().includes('cyber')).length },
    { id: 'nature', name: 'Nature', count: BLOG_THEMES.filter(t => t.description.toLowerCase().includes('nature') || t.description.toLowerCase().includes('organic')).length }
  ];
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