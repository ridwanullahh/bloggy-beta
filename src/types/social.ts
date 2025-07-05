
export interface SocialMediaAccount {
  id: string;
  uid: string;
  blogId: string;
  platform: 'facebook' | 'twitter' | 'linkedin' | 'telegram' | 'instagram' | 'tiktok' | 'whatsapp' | 'snapchat';
  accountId: string;
  accountName: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SocialMediaPost {
  id: string;
  uid: string;
  postId: string;
  blogId: string;
  platform: string;
  content: string;
  mediaUrls?: string[];
  scheduledFor?: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  platformPostId?: string;
  error?: string;
  publishedAt?: string;
  createdAt: string;
}
