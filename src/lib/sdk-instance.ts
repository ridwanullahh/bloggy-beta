
import UniversalSDK from './sdk';

// SDK Configuration - Replace with your GitHub repo details
const sdkConfig = {
  owner: 'your-github-username', // Replace with your GitHub username
  repo: 'blog-platform-db', // Replace with your repository name
  token: process.env.GITHUB_TOKEN || 'your-github-token', // Replace with your GitHub token
  branch: 'main',
  basePath: 'db',
  mediaPath: 'media',
  auth: {
    requireEmailVerification: true,
    otpTriggers: ['register', 'login']
  },
  schemas: {
    users: {
      required: ['email'],
      types: {
        email: 'string',
        password: 'string',
        verified: 'boolean',
        roles: 'array'
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
        theme: 'string',
        status: 'string'
      },
      defaults: {
        theme: 'modern',
        status: 'active',
        createdAt: new Date().toISOString()
      }
    },
    posts: {
      required: ['title', 'content', 'blogId', 'authorId'],
      types: {
        title: 'string',
        content: 'string',
        blogId: 'string',
        authorId: 'string',
        status: 'string'
      },
      defaults: {
        status: 'draft',
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
