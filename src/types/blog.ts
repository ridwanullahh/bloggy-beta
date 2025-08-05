
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
  customization?: {
    brandColors?: {
      primary: string;
      secondary: string;
      accent: string;
      headerBg?: string;
      headerText?: string;
      footerBg?: string;
      footerText?: string;
      siteBg?: string;
      siteText?: string;
    };
    homepageSettings?: {
      showFeaturedPosts: boolean;
      showRecentPosts: boolean;
      showCategories: boolean;
      showNewsletter: boolean;
      showTrending: boolean;
      heroStyle: 'minimal' | 'full' | 'banner';
    };
    socialMedia?: {
      enabled: boolean;
      platforms: {
        twitter: { enabled: boolean; handle: string; url: string; };
        facebook: { enabled: boolean; handle: string; url: string; };
        instagram: { enabled: boolean; handle: string; url: string; };
        linkedin: { enabled: boolean; handle: string; url: string; };
        youtube: { enabled: boolean; handle: string; url: string; };
        github: { enabled: boolean; handle: string; url: string; };
        discord: { enabled: boolean; handle: string; url: string; };
        telegram: { enabled: boolean; handle: string; url: string; };
      };
    };
    branding?: {
      showBlogNameOnHomepage: boolean;
      useGravatarInHeader: boolean;
      customLogo?: string;
      favicon?: string;
      customCSS?: string;
    };
    fonts?: {
      primaryFont: string;
      headingFont: string;
      codeFont: string;
      fontSource: 'google' | 'system' | 'custom';
      customFontUrl?: string;
    };
    darkMode?: {
      enabled: boolean;
      defaultMode: 'light' | 'dark' | 'system';
      customDarkColors?: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
      };
    };
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
    allowSubscriptions: boolean;
    requireEmailVerification: boolean;
    enableNotifications: boolean;
    autosave: {
      enabled: boolean;
      interval: number;
      onlyContentChanges: boolean;
    };
  };
  createdAt: string;
  updatedAt: string;
  subscriberCount?: number;
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
  createdAt: string;
  updatedAt: string;
  views?: number;
}

export interface BlogTheme {
  id: string;
  name: string;
  description: string;
  preview: string;
  styles: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    textColor: string;
    backgroundColor: string;
    fontFamily: string;
    headingFont: string;
    layout: 'grid' | 'list' | 'magazine' | 'minimal';
    borderRadius: string;
    shadows: string;
    spacing: string;
    cardStyle: string;
    buttonStyle: string;
    headerStyle: string;
    navigationStyle: string;
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
  type: 'about' | 'contact' | 'terms' | 'privacy' | 'custom';
  title: string;
  content: string;
  slug: string;
  isPublished: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt: string;
  updatedAt?: string;
}

export interface Bookmark {
  id: string;
  uid: string;
  userId: string;
  postId: string;
  blogId: string;
  title: string;
  excerpt?: string;
  url: string;
  createdAt: string;
}

export interface Note {
  id: string;
  uid: string;
  userId: string;
  postId: string;
  blogId?: string;
  content: string;
  isPrivate: boolean;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface UserPreferences {
  id: string;
  uid: string;
  userId: string;
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    newPosts: boolean;
    comments: boolean;
  };
  privacy: {
    showProfile: boolean;
    showActivity: boolean;
  };
  display: {
    density: 'compact' | 'comfortable' | 'spacious';
    fontSize: 'small' | 'medium' | 'large';
  };
  createdAt: string;
  updatedAt?: string;
}

export interface SearchRecord {
  id: string;
  uid: string;
  blogId: string;
  query: string;
  results: any[];
  userId?: string;
  ipAddress?: string;
  createdAt: string;
}
