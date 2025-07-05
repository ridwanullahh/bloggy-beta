
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
        customDomain: 'string',
        featuredImage: 'string',
        monetization: 'object',
        marketing: 'object',
        settings: 'object'
      },
      defaults: {
        theme: 'modern',
        status: 'active',
        monetization: {
          enabled: false,
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
        featuredImage: 'string',
        blogId: 'string',
        authorId: 'string',
        status: 'string',
        tags: 'array',
        categories: 'array',
        seo: 'object',
        scheduledFor: 'string',
        publishedAt: 'string'
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
    payments: {
      required: ['userId', 'blogId', 'amount', 'currency'],
      types: {
        userId: 'string',
        blogId: 'string',
        amount: 'number',
        currency: 'string',
        status: 'string',
        paymentMethod: 'string',
        paystackReference: 'string'
      },
      defaults: {
        status: 'pending',
        currency: 'NGN',
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
