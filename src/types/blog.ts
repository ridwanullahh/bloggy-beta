
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
    accentColor: string;
    textColor: string;
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
