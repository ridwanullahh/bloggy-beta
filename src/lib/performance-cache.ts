// Enhanced caching system for improved performance
class PerformanceCache {
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();
  private memoryCache: Map<string, any> = new Map();
  private requestQueue: Map<string, Promise<any>> = new Map();

  // Cache with TTL (Time To Live)
  set(key: string, data: any, ttl: number = 300000) { // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });

    // Also store in memory cache for immediate access
    this.memoryCache.set(key, data);
  }

  // Get from cache
  get(key: string): any | null {
    // First check memory cache
    if (this.memoryCache.has(key)) {
      return this.memoryCache.get(key);
    }

    // Then check main cache
    const cached = this.cache.get(key);
    if (!cached) return null;

    // Check if expired
    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      this.memoryCache.delete(key);
      return null;
    }

    // Update memory cache
    this.memoryCache.set(key, cached.data);
    return cached.data;
  }

  // Check if key exists and is valid
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  // Delete from cache
  delete(key: string): void {
    this.cache.delete(key);
    this.memoryCache.delete(key);
  }

  // Clear all cache
  clear(): void {
    this.cache.clear();
    this.memoryCache.clear();
  }

  // Prevent duplicate requests
  async getOrFetch<T>(
    key: string, 
    fetchFn: () => Promise<T>, 
    ttl: number = 300000
  ): Promise<T> {
    // Check cache first
    const cached = this.get(key);
    if (cached) {
      return cached;
    }

    // Check if request is already in progress
    if (this.requestQueue.has(key)) {
      return this.requestQueue.get(key)!;
    }

    // Start new request
    const promise = fetchFn().then(data => {
      this.set(key, data, ttl);
      this.requestQueue.delete(key);
      return data;
    }).catch(error => {
      this.requestQueue.delete(key);
      throw error;
    });

    this.requestQueue.set(key, promise);
    return promise;
  }

  // Batch operations
  setBatch(items: Array<{ key: string; data: any; ttl?: number }>): void {
    items.forEach(({ key, data, ttl }) => {
      this.set(key, data, ttl);
    });
  }

  getBatch(keys: string[]): Record<string, any> {
    const result: Record<string, any> = {};
    keys.forEach(key => {
      const data = this.get(key);
      if (data !== null) {
        result[key] = data;
      }
    });
    return result;
  }

  // Preload data
  async preload(key: string, fetchFn: () => Promise<any>, ttl?: number): Promise<void> {
    if (!this.has(key)) {
      try {
        const data = await fetchFn();
        this.set(key, data, ttl);
      } catch (error) {
        console.warn(`Failed to preload ${key}:`, error);
      }
    }
  }

  // Cache statistics
  getStats(): { size: number; memorySize: number; hitRate: number } {
    return {
      size: this.cache.size,
      memorySize: this.memoryCache.size,
      hitRate: 0 // TODO: Implement hit rate tracking
    };
  }

  // Cleanup expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, cached] of this.cache.entries()) {
      if (now - cached.timestamp > cached.ttl) {
        this.cache.delete(key);
        this.memoryCache.delete(key);
      }
    }
  }
}

// Blog-specific cache keys
export const CacheKeys = {
  BLOG: (slug: string) => `blog:${slug}`,
  BLOG_POSTS: (blogId: string) => `blog_posts:${blogId}`,
  BLOG_CATEGORIES: (blogId: string) => `blog_categories:${blogId}`,
  BLOG_TAGS: (blogId: string) => `blog_tags:${blogId}`,
  POST: (slug: string) => `post:${slug}`,
  THEME: (themeId: string) => `theme:${themeId}`,
  USER_BLOGS: (userId: string) => `user_blogs:${userId}`,
  SEARCH_RESULTS: (blogId: string, query: string) => `search:${blogId}:${query}`,
  BLOG_STATS: (blogId: string) => `blog_stats:${blogId}`,
  RECENT_POSTS: (blogId: string) => `recent_posts:${blogId}`,
  FEATURED_POSTS: (blogId: string) => `featured_posts:${blogId}`
};

// Cache TTL constants (in milliseconds)
export const CacheTTL = {
  BLOG: 600000, // 10 minutes
  POSTS: 300000, // 5 minutes
  CATEGORIES: 900000, // 15 minutes
  TAGS: 900000, // 15 minutes
  THEME: 1800000, // 30 minutes
  SEARCH: 180000, // 3 minutes
  STATS: 120000, // 2 minutes
  USER_DATA: 300000 // 5 minutes
};

// Create singleton instance
export const performanceCache = new PerformanceCache();

// Auto cleanup every 5 minutes
setInterval(() => {
  performanceCache.cleanup();
}, 300000);

export default performanceCache;
