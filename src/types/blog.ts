
export interface Blog {
  id: string;
  uid: string;
  title: string;
  slug: string;
  description?: string;
  ownerId: string;
  theme: string;
  status: 'active' | 'inactive' | 'suspended';
  customDomain?: string;
  darkMode?: boolean;
  aboutContent?: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
    socialLinks?: Record<string, string>;
  };
  monetization?: {
    enabled: boolean;
    allowFreeContent: boolean;
    subscriptionPrice?: number;
    payPerArticle?: boolean;
    paywallEnabled?: boolean;
  };
  marketing?: {
    emailMarketing: boolean;
    socialAutoPost: boolean;
    contentScheduling: boolean;
  };
  settings?: {
    allowComments: boolean;
    moderateComments: boolean;
    seoOptimized: boolean;
    showReadingTime?: boolean;
    enableTableOfContents?: boolean;
    enableSocialShare?: boolean;
    enableRelatedPosts?: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  uid: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  blogId: string;
  authorId: string;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  tags?: string[];
  categories?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  monetization?: {
    isPaid: boolean;
    price: number;
    currency: string;
  };
  scheduledFor?: string;
  publishedAt?: string;
  readingTime?: number;
  featuredImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogTheme {
  id: string;
  name: string;
  description: string;
  preview: string;
  styles: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    layout: 'grid' | 'list' | 'magazine' | 'minimal' | 'masonry' | 'corporate' | 'lifestyle' | 'tech' | 'organic' | 'recipe' | 'adventure' | 'fitness' | 'educational' | 'gaming' | 'journal' | 'newspaper';
    borderRadius?: string;
    shadows?: string;
    spacing?: string;
    headerStyle?: string;
    navigationStyle?: string;
    postCardStyle?: string;
    buttonStyle?: string;
    animationStyle?: string;
  };
}

export interface BlogSubscriber {
  id: string;
  uid: string;
  email: string;
  blogId: string;
  status: 'active' | 'inactive';
  subscriptionTier?: 'free' | 'premium';
  subscriptionDate: string;
}

export interface Comment {
  id: string;
  uid: string;
  postId: string;
  authorName: string;
  authorEmail: string;
  content: string;
  status: 'pending' | 'approved' | 'spam';
  parentId?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  uid: string;
  name: string;
  slug: string;
  blogId: string;
  description?: string;
  color?: string;
  parentId?: string;
  createdAt: string;
}

export interface Tag {
  id: string;
  uid: string;
  name: string;
  slug: string;
  blogId: string;
  color?: string;
  createdAt: string;
}

export interface BlogPage {
  id: string;
  uid: string;
  blogId: string;
  type: 'about' | 'contact' | 'terms' | 'privacy' | 'archive' | 'custom';
  title: string;
  content: string;
  slug?: string;
  isEnabled: boolean;
  customFields?: Record<string, any>;
  createdAt: string;
}

export interface BlogSettings {
  id: string;
  uid: string;
  blogId: string;
  customDomain?: string;
  favicon?: string;
  logo?: string;
  socialLinks?: Record<string, string>;
  analyticsCode?: string;
  customCSS?: string;
  customJS?: string;
  seoSettings?: {
    sitemap: boolean;
    robotsTxt: boolean;
    structuredData: boolean;
  };
  createdAt: string;
}

export interface UserBookmark {
  id: string;
  uid: string;
  userId: string;
  postId: string;
  blogId: string;
  notes?: string;
  createdAt: string;
}

export interface UserAnnotation {
  id: string;
  uid: string;
  userId: string;
  postId: string;
  blogId: string;
  selectedText: string;
  annotation: string;
  position?: Record<string, any>;
  highlightColor?: string;
  createdAt: string;
}
