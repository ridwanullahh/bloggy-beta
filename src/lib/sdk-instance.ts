import UniversalSDK from './sdk';

// SDK Configuration - Replace with your GitHub repo details
const sdkConfig = {
  owner: 'ridwanullahh', // Replace with your GitHub username
  repo: 'bloggybetadb', // Replace with your repository name
  token: process.env.GITHUB_TOKEN || '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', // Replace with your GitHub token
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
        monetization: 'object',
        marketing: 'object',
        settings: 'object'
      },
      defaults: {
        theme: 'modern',
        status: 'active',
        monetization: {
          enabled: false,
          allowFreeContent: true,
          subscriptionPrice: 0,
          payPerArticle: false
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
    }
  }
};

// Initialize SDK instance
export const sdk = new UniversalSDK(sdkConfig);

// Initialize the SDK on first import
sdk.listCollections().catch(console.error);

export default sdk;
