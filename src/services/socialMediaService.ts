import sdk from '../lib/sdk-instance';
import { SocialMediaAccount, SocialMediaPost } from '../types/social';
import { Post } from '../types/blog';

type SocialPlatform = 'facebook' | 'twitter' | 'linkedin' | 'telegram' | 'instagram' | 'tiktok' | 'whatsapp' | 'snapchat';

export class SocialMediaService {
  static async connectAccount(
    blogId: string,
    platform: SocialPlatform,
    accountId: string,
    accountName: string,
    accessToken: string,
    refreshToken?: string,
    expiresAt?: string
  ): Promise<SocialMediaAccount> {
    return await sdk.insert<SocialMediaAccount>('socialMediaAccounts', {
      blogId,
      platform,
      accountId,
      accountName,
      accessToken,
      refreshToken,
      expiresAt,
      isActive: true
    });
  }

  static async getConnectedAccounts(blogId: string): Promise<SocialMediaAccount[]> {
    const accounts = await sdk.get<SocialMediaAccount>('socialMediaAccounts');
    return accounts.filter(a => a.blogId === blogId && a.isActive);
  }

  static async disconnectAccount(accountId: string): Promise<void> {
    await sdk.update<SocialMediaAccount>('socialMediaAccounts', accountId, {
      isActive: false,
      updatedAt: new Date().toISOString()
    });
  }

  static async createSocialPost(
    postId: string,
    blogId: string,
    platform: string,
    content: string,
    mediaUrls: string[] = [],
    scheduledFor?: string
  ): Promise<SocialMediaPost> {
    return await sdk.insert<SocialMediaPost>('socialMediaPosts', {
      postId,
      blogId,
      platform,
      content,
      mediaUrls,
      scheduledFor,
      status: scheduledFor ? 'scheduled' : 'draft'
    });
  }

  static async publishPost(socialPostId: string): Promise<void> {
    const socialPosts = await sdk.get<SocialMediaPost>('socialMediaPosts');
    const socialPost = socialPosts.find(sp => sp.id === socialPostId);
    
    if (!socialPost) {
      throw new Error('Social media post not found');
    }

    const accounts = await sdk.get<SocialMediaAccount>('socialMediaAccounts');
    const account = accounts.find(a => 
      a.blogId === socialPost.blogId && 
      a.platform === socialPost.platform && 
      a.isActive
    );

    if (!account) {
      throw new Error(`No active ${socialPost.platform} account found`);
    }

    try {
      // In a real implementation, this would call the respective social media APIs
      const platformPostId = await this.publishToPlatform(
        socialPost.platform,
        account.accessToken,
        socialPost.content,
        socialPost.mediaUrls
      );

      await sdk.update<SocialMediaPost>('socialMediaPosts', socialPostId, {
        status: 'published',
        platformPostId,
        publishedAt: new Date().toISOString()
      });
    } catch (error) {
      await sdk.update<SocialMediaPost>('socialMediaPosts', socialPostId, {
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  private static async publishToPlatform(
    platform: string,
    accessToken: string,
    content: string,
    mediaUrls: string[]
  ): Promise<string> {
    // Simulate API calls to different platforms
    console.log(`Publishing to ${platform}:`, { content, mediaUrls });
    
    switch (platform) {
      case 'twitter':
        return await this.publishToTwitter(accessToken, content, mediaUrls);
      case 'facebook':
        return await this.publishToFacebook(accessToken, content, mediaUrls);
      case 'linkedin':
        return await this.publishToLinkedIn(accessToken, content, mediaUrls);
      case 'telegram':
        return await this.publishToTelegram(accessToken, content, mediaUrls);
      case 'instagram':
        return await this.publishToInstagram(accessToken, content, mediaUrls);
      case 'tiktok':
        return await this.publishToTikTok(accessToken, content, mediaUrls);
      default:
        throw new Error(`Platform ${platform} not supported`);
    }
  }

  private static async publishToTwitter(accessToken: string, content: string, mediaUrls: string[]): Promise<string> {
    // Simulate Twitter API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `twitter_${Date.now()}`;
  }

  private static async publishToFacebook(accessToken: string, content: string, mediaUrls: string[]): Promise<string> {
    // Simulate Facebook API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `facebook_${Date.now()}`;
  }

  private static async publishToLinkedIn(accessToken: string, content: string, mediaUrls: string[]): Promise<string> {
    // Simulate LinkedIn API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `linkedin_${Date.now()}`;
  }

  private static async publishToTelegram(accessToken: string, content: string, mediaUrls: string[]): Promise<string> {
    // Simulate Telegram API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `telegram_${Date.now()}`;
  }

  private static async publishToInstagram(accessToken: string, content: string, mediaUrls: string[]): Promise<string> {
    // Simulate Instagram API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `instagram_${Date.now()}`;
  }

  private static async publishToTikTok(accessToken: string, content: string, mediaUrls: string[]): Promise<string> {
    // Simulate TikTok API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `tiktok_${Date.now()}`;
  }

  static async autoPublishForPost(postId: string): Promise<void> {
    const posts = await sdk.get<Post>('posts');
    const post = posts.find(p => p.id === postId);
    
    if (!post || post.status !== 'published') {
      return;
    }

    const accounts = await this.getConnectedAccounts(post.blogId);
    const autoPostContent = this.generateAutoPostContent(post);

    for (const account of accounts) {
      try {
        const socialPost = await this.createSocialPost(
          postId,
          post.blogId,
          account.platform,
          autoPostContent,
          []
        );
        
        await this.publishPost(socialPost.id);
      } catch (error) {
        console.error(`Failed to auto-publish to ${account.platform}:`, error);
      }
    }
  }

  private static generateAutoPostContent(post: Post): string {
    const excerpt = post.excerpt || post.content.substring(0, 150) + '...';
    return `New blog post: ${post.title}\n\n${excerpt}\n\nRead more at: [Blog URL]`;
  }

  static async processScheduledPosts(): Promise<void> {
    const socialPosts = await sdk.get<SocialMediaPost>('socialMediaPosts');
    const scheduledPosts = socialPosts.filter(
      sp => sp.status === 'scheduled' && 
      sp.scheduledFor && 
      new Date(sp.scheduledFor) <= new Date()
    );

    for (const post of scheduledPosts) {
      try {
        await this.publishPost(post.id);
      } catch (error) {
        console.error(`Failed to publish scheduled post ${post.id}:`, error);
      }
    }
  }
}
