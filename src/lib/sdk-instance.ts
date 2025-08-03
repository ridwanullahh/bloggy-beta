
import UniversalSDK from './sdk';

// SDK Configuration - Replace with your GitHub repo details
const sdkConfig = {
  owner: import.meta.env.VITE_GITHUB_OWNER, // Replace with your GitHub username
  repo: import.meta.env.VITE_GITHUB_REPO, // Replace with your repository name
  token: import.meta.env.VITE_GITHUB_TOKEN, // Replace with your GitHub token
  branch: 'main',
  basePath: 'db',
  mediaPath: 'media',
  auth: {
    requireEmailVerification: false,
    otpTriggers: ['register', 'login']
  },
  schemas: {
    users: {
      required: ['email'],
      types: {
        email: 'string',
        password: 'string',
        verified: 'boolean',
        roles: 'array',
        firstName: 'string',
        lastName: 'string',
        avatar: 'string',
        bio: 'string'
      },
      defaults: {
        verified: false,
        roles: ['user'],
        createdAt: new Date().toISOString()
      }
    },
    blogs: {
      required: ['title', 'slug', 'ownerId'],
      types: {
        title: 'string',
        slug: 'string',
        ownerId: 'string',
        description: 'string',
        theme: 'string',
        status: 'string',
        customDomain: 'string',
        customization: 'object',
        monetization: 'object',
        marketing: 'object',
        settings: 'object'
      },
      defaults: {
        theme: 'hashnode-modern',
        status: 'active',
        customization: {
          brandColors: {
            primary: '#2563eb',
            secondary: '#f8fafc',
            accent: '#3b82f6'
          },
          homepageSettings: {
            showFeaturedPosts: true,
            showRecentPosts: true,
            showCategories: true,
            showNewsletter: true,
            showTrending: true,
            heroStyle: 'minimal'
          }
        },
        monetization: {
          enabled: false,
          allowFreeContent: true,
          subscriptionPrice: 0,
          payPerArticle: false,
          paywallEnabled: false
        },
        marketing: {
          emailMarketing: false,
          socialAutoPost: false,
          contentScheduling: false
        },
        settings: {
          allowComments: true,
          moderateComments: false,
          seoOptimized: true
        },
        createdAt: new Date().toISOString()
      }
    },
    posts: {
      required: ['title', 'content', 'blogId', 'authorId'],
      types: {
        title: 'string',
        slug: 'string',
        content: 'string',
        excerpt: 'string',
        blogId: 'string',
        authorId: 'string',
        status: 'string',
        tags: 'array',
        categories: 'array',
        seo: 'object',
        scheduledFor: 'string',
        publishedAt: 'string',
        monetization: 'object'
      },
      defaults: {
        status: 'draft',
        tags: [],
        categories: [],
        seo: {
          metaTitle: '',
          metaDescription: '',
          keywords: []
        },
        monetization: {
          isPaid: false,
          price: 0,
          currency: 'NGN'
        },
        createdAt: new Date().toISOString()
      }
    },
    categories: {
      required: ['name', 'slug', 'blogId'],
      types: {
        name: 'string',
        slug: 'string',
        blogId: 'string',
        description: 'string',
        color: 'string'
      },
      defaults: {
        color: '#3B82F6',
        createdAt: new Date().toISOString()
      }
    },
    tags: {
      required: ['name', 'slug', 'blogId'],
      types: {
        name: 'string',
        slug: 'string',
        blogId: 'string',
        color: 'string'
      },
      defaults: {
        color: '#10B981',
        createdAt: new Date().toISOString()
      }
    },
    subscribers: {
      required: ['email', 'blogId'],
      types: {
        email: 'string',
        blogId: 'string',
        status: 'string',
        subscriptionTier: 'string',
        subscriptionDate: 'string',
        paymentStatus: 'string'
      },
      defaults: {
        status: 'active',
        subscriptionTier: 'free',
        subscriptionDate: new Date().toISOString(),
        paymentStatus: 'none'
      }
    },
    comments: {
      required: ['postId', 'authorName', 'authorEmail', 'content'],
      types: {
        postId: 'string',
        authorName: 'string',
        authorEmail: 'string',
        content: 'string',
        status: 'string',
        parentId: 'string'
      },
      defaults: {
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    },
    contactSubmissions: {
      required: ['blogId', 'name', 'email', 'subject', 'message'],
      types: {
        blogId: 'string',
        name: 'string',
        email: 'string',
        subject: 'string',
        message: 'string',
        status: 'string'
      },
      defaults: {
        status: 'unread',
        createdAt: new Date().toISOString()
      }
    },
    themes: {
      required: ['name', 'styles'],
      types: {
        name: 'string',
        description: 'string',
        preview: 'string',
        styles: 'object',
        category: 'string'
      },
      defaults: {
        category: 'modern',
        createdAt: new Date().toISOString()
      }
    },
    wallets: {
      required: ['userId'],
      types: {
        userId: 'string',
        balance: 'number',
        currency: 'string',
        status: 'string'
      },
      defaults: {
        balance: 0,
        currency: 'NGN',
        status: 'active',
        createdAt: new Date().toISOString()
      }
    },
    walletTransactions: {
      required: ['walletId', 'type', 'amount', 'reference'],
      types: {
        walletId: 'string',
        type: 'string',
        amount: 'number',
        currency: 'string',
        reference: 'string',
        description: 'string',
        status: 'string',
        metadata: 'object'
      },
      defaults: {
        currency: 'NGN',
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    },
    paystackTransactions: {
      required: ['userId', 'walletId', 'reference', 'amount'],
      types: {
        userId: 'string',
        walletId: 'string',
        reference: 'string',
        amount: 'number',
        currency: 'string',
        status: 'string',
        paystackReference: 'string',
        authorizationUrl: 'string'
      },
      defaults: {
        currency: 'NGN',
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    },
    emailTemplates: {
      required: ['blogId', 'name', 'subject', 'htmlContent'],
      types: {
        blogId: 'string',
        name: 'string',
        subject: 'string',
        htmlContent: 'string',
        textContent: 'string',
        type: 'string'
      },
      defaults: {
        type: 'newsletter',
        textContent: '',
        createdAt: new Date().toISOString()
      }
    },
    emailCampaigns: {
      required: ['blogId', 'templateId', 'name', 'subject'],
      types: {
        blogId: 'string',
        templateId: 'string',
        name: 'string',
        subject: 'string',
        scheduledFor: 'string',
        status: 'string',
        recipientCount: 'number',
        sentCount: 'number',
        openCount: 'number',
        clickCount: 'number',
        sentAt: 'string'
      },
      defaults: {
        status: 'draft',
        recipientCount: 0,
        sentCount: 0,
        openCount: 0,
        clickCount: 0,
        createdAt: new Date().toISOString()
      }
    },
    socialMediaAccounts: {
      required: ['blogId', 'platform', 'accountId', 'accessToken'],
      types: {
        blogId: 'string',
        platform: 'string',
        accountId: 'string',
        accountName: 'string',
        accessToken: 'string',
        refreshToken: 'string',
        expiresAt: 'string',
        isActive: 'boolean'
      },
      defaults: {
        isActive: true,
        createdAt: new Date().toISOString()
      }
    },
    socialMediaPosts: {
      required: ['postId', 'blogId', 'platform', 'content'],
      types: {
        postId: 'string',
        blogId: 'string',
        platform: 'string',
        content: 'string',
        mediaUrls: 'array',
        scheduledFor: 'string',
        status: 'string',
        platformPostId: 'string',
        error: 'string',
        publishedAt: 'string'
      },
      defaults: {
        mediaUrls: [],
        status: 'draft',
        createdAt: new Date().toISOString()
      }
    },
    analytics: {
      required: ['blogId', 'postId', 'metric', 'value'],
      types: {
        blogId: 'string',
        postId: 'string',
        metric: 'string',
        value: 'number',
        date: 'string'
      },
      defaults: {
        date: new Date().toISOString()
      }
    },
    blogSubscribers: {
      required: ['email', 'blogId'],
      types: {
        email: 'string',
        blogId: 'string',
        status: 'string',
        subscriptionTier: 'string',
        subscribedAt: 'string',
        preferences: 'object',
        subscriberType: 'string'
      },
      defaults: {
        status: 'active',
        subscriptionTier: 'free',
        subscribedAt: new Date().toISOString(),
        subscriberType: 'blog_subscriber',
        preferences: {
          emailNotifications: true,
          newPosts: true,
          newsletter: true,
          categories: []
        },
        createdAt: new Date().toISOString()
      }
    },
    subscriberSessions: {
      required: ['subscriberId', 'blogId'],
      types: {
        subscriberId: 'string',
        blogId: 'string',
        sessionToken: 'string',
        expiresAt: 'string'
      },
      defaults: {
        createdAt: new Date().toISOString()
      }
    },
    smtpConfigurations: {
      required: ['blogId', 'host', 'port', 'user', 'fromEmail'],
      types: {
        blogId: 'string',
        host: 'string',
        port: 'number',
        user: 'string',
        pass: 'string',
        fromEmail: 'string',
        fromName: 'string',
        secure: 'boolean'
      },
      defaults: {
        secure: true,
        fromName: 'Blog Newsletter',
        createdAt: new Date().toISOString()
      }
    },
    bookmarks: {
      required: ['userId', 'postId', 'blogId'],
      types: {
        userId: 'string',
        postId: 'string',
        blogId: 'string',
        title: 'string',
        excerpt: 'string',
        url: 'string'
      },
      defaults: {
        createdAt: new Date().toISOString()
      }
    },
    notes: {
      required: ['userId', 'postId', 'content'],
      types: {
        userId: 'string',
        postId: 'string',
        blogId: 'string',
        content: 'string',
        isPrivate: 'boolean',
        tags: 'array'
      },
      defaults: {
        isPrivate: true,
        tags: [],
        createdAt: new Date().toISOString()
      }
    },
    userPreferences: {
      required: ['userId'],
      types: {
        userId: 'string',
        theme: 'string',
        language: 'string',
        notifications: 'object',
        privacy: 'object',
        display: 'object'
      },
      defaults: {
        theme: 'light',
        language: 'en',
        notifications: {
          email: true,
          push: true,
          newPosts: true,
          comments: true
        },
        privacy: {
          showProfile: true,
          showActivity: false
        },
        display: {
          density: 'comfortable',
          fontSize: 'medium'
        },
        createdAt: new Date().toISOString()
      }
    },
    blogPages: {
      required: ['blogId', 'type', 'title', 'content'],
      types: {
        blogId: 'string',
        type: 'string',
        title: 'string',
        content: 'string',
        slug: 'string',
        isPublished: 'boolean',
        seo: 'object'
      },
      defaults: {
        isPublished: true,
        seo: {
          metaTitle: '',
          metaDescription: '',
          keywords: []
        },
        createdAt: new Date().toISOString()
      }
    },
    searches: {
      required: ['blogId', 'query'],
      types: {
        blogId: 'string',
        query: 'string',
        results: 'array',
        userId: 'string',
        ipAddress: 'string'
      },
      defaults: {
        results: [],
        createdAt: new Date().toISOString()
      }
    }
  }
};

// Initialize SDK instance
export const sdk = new UniversalSDK(sdkConfig);

// Initialize the SDK on first import
sdk.listCollections().catch(console.error);

export default sdk;
