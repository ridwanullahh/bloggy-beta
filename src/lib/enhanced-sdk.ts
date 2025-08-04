import sdk from './sdk-instance';

// Enhanced SDK wrapper with queue system and real-time features
class EnhancedSDK {
  private writeQueue: Array<() => Promise<any>> = [];
  private isProcessingQueue = false;
  private subscribers: Map<string, Set<(data: any) => void>> = new Map();
  private pollingIntervals: Map<string, NodeJS.Timeout> = new Map();
  private retryAttempts = 3;
  private retryDelay = 1000; // 1 second

  constructor() {
    this.startQueueProcessor();
  }

  // Queue system for write operations to prevent 409 conflicts
  private async startQueueProcessor() {
    setInterval(async () => {
      if (this.writeQueue.length > 0 && !this.isProcessingQueue) {
        this.isProcessingQueue = true;
        const operation = this.writeQueue.shift();
        if (operation) {
          try {
            await operation();
          } catch (error) {
            console.error('Queue operation failed:', error);
          }
        }
        this.isProcessingQueue = false;
      }
    }, 200); // Process queue every 200ms to avoid rate limits
  }

  // Retry mechanism for failed operations
  private async retryOperation<T>(operation: () => Promise<T>, attempts = this.retryAttempts): Promise<T> {
    try {
      return await operation();
    } catch (error: any) {
      if (attempts > 1 && (error.status === 409 || error.status === 422 || error.status === 500)) {
        console.warn(`Operation failed, retrying... (${this.retryAttempts - attempts + 1}/${this.retryAttempts})`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return this.retryOperation(operation, attempts - 1);
      }
      throw error;
    }
  }

  // Enhanced get method with caching
  async get<T>(collection: string): Promise<T[]> {
    return this.retryOperation(() => sdk.get<T>(collection));
  }

  // Enhanced getById method
  async getById<T>(collection: string, id: string): Promise<T | null> {
    return this.retryOperation(() => sdk.getById<T>(collection, id));
  }

  // Enhanced insert with queue and retry
  async insert<T>(collection: string, data: Partial<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.writeQueue.push(async () => {
        try {
          const result = await this.retryOperation(() => sdk.insert<T>(collection, data));
          this.notifySubscribers(collection, { type: 'insert', data: result });
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  // Enhanced update with queue and retry
  async update<T>(collection: string, id: string, data: Partial<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.writeQueue.push(async () => {
        try {
          const result = await this.retryOperation(() => sdk.update<T>(collection, id, data));
          this.notifySubscribers(collection, { type: 'update', data: result });
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  // Enhanced delete with queue and retry
  async delete(collection: string, id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.writeQueue.push(async () => {
        try {
          await this.retryOperation(() => sdk.delete(collection, id));
          this.notifySubscribers(collection, { type: 'delete', id });
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  // Batch operations
  async batchInsert<T>(collection: string, items: Partial<T>[]): Promise<T[]> {
    const results: T[] = [];
    for (const item of items) {
      const result = await this.insert<T>(collection, item);
      results.push(result);
      // Small delay between batch operations
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return results;
  }

  // Real-time subscription system
  subscribe(collection: string, callback: (data: any) => void): () => void {
    if (!this.subscribers.has(collection)) {
      this.subscribers.set(collection, new Set());
      this.startPolling(collection);
    }
    
    this.subscribers.get(collection)!.add(callback);
    
    // Return unsubscribe function
    return () => {
      const subscribers = this.subscribers.get(collection);
      if (subscribers) {
        subscribers.delete(callback);
        if (subscribers.size === 0) {
          this.stopPolling(collection);
          this.subscribers.delete(collection);
        }
      }
    };
  }

  // Ultra-aggressive real-time polling for instant updates
  private startPolling(collection: string) {
    let pollInterval = 500; // 500ms for true real-time feel
    let consecutiveErrors = 0;
    let lastDataHash = '';

    const poll = async () => {
      try {
        const data = await this.get(collection);
        const dataHash = this.generateDataHash(data);

        // Only notify if data actually changed
        if (dataHash !== lastDataHash) {
          this.notifySubscribers(collection, { type: 'refresh', data, timestamp: Date.now() });
          lastDataHash = dataHash;
          console.log(`🔄 Real-time update: ${collection} changed`);

          // Trigger immediate re-render for UI components
          window.dispatchEvent(new CustomEvent(`${collection}-updated`, { detail: data }));
        }

        consecutiveErrors = 0;
        pollInterval = 500; // Keep ultra-aggressive polling
      } catch (error) {
        console.error(`Polling error for ${collection}:`, error);
        consecutiveErrors++;
        // Minimal backoff to maintain real-time feel
        pollInterval = Math.min(500 * (consecutiveErrors + 1), 2000); // Max 2 seconds
      }

      const timeout = setTimeout(poll, pollInterval);
      this.pollingIntervals.set(collection, timeout);
    };

    // Start immediately
    poll();
  }

  // Generate consistent hash for change detection
  private generateDataHash(data: any): string {
    return btoa(JSON.stringify(data, Object.keys(data).sort()));
  }

  // Stop polling
  private stopPolling(collection: string) {
    const interval = this.pollingIntervals.get(collection);
    if (interval) {
      clearTimeout(interval);
      this.pollingIntervals.delete(collection);
    }
  }

  // Notify subscribers
  private notifySubscribers(collection: string, data: any) {
    const subscribers = this.subscribers.get(collection);
    if (subscribers) {
      subscribers.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Subscriber callback error:', error);
        }
      });
    }
  }

  // Search functionality
  async search<T>(collection: string, query: string, fields: string[] = []): Promise<T[]> {
    const data = await this.get<T>(collection);
    if (!query.trim()) return data;

    const searchTerm = query.toLowerCase();
    return data.filter((item: any) => {
      if (fields.length === 0) {
        // Search all string fields
        return Object.values(item).some(value => 
          typeof value === 'string' && value.toLowerCase().includes(searchTerm)
        );
      } else {
        // Search specific fields
        return fields.some(field => {
          const value = item[field];
          return typeof value === 'string' && value.toLowerCase().includes(searchTerm);
        });
      }
    });
  }

  // Pagination
  async paginate<T>(collection: string, page: number = 1, limit: number = 10): Promise<{
    data: T[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const allData = await this.get<T>(collection);
    const total = allData.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const data = allData.slice(startIndex, endIndex);

    return {
      data,
      total,
      page,
      totalPages
    };
  }

  // Filter functionality
  async filter<T>(collection: string, filterFn: (item: T) => boolean): Promise<T[]> {
    const data = await this.get<T>(collection);
    return data.filter(filterFn);
  }

  // Sort functionality
  async sort<T>(collection: string, sortFn: (a: T, b: T) => number): Promise<T[]> {
    const data = await this.get<T>(collection);
    return [...data].sort(sortFn);
  }

  // Authentication methods (proxy to original SDK)
  async login(email: string, password: string) {
    return sdk.login(email, password);
  }

  async register(userData: any) {
    return sdk.register(userData);
  }

  async logout() {
    return sdk.logout();
  }

  async getCurrentUser() {
    return sdk.getCurrentUser();
  }

  async verifyOTP(email: string, otp: string) {
    return sdk.verifyOTP(email, otp);
  }

  // File upload methods (proxy to original SDK)
  async uploadFile(file: File, path?: string) {
    return sdk.uploadFile(file, path);
  }

  async deleteFile(path: string) {
    return sdk.deleteFile(path);
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.get('users');
      return true;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  // Get queue status
  getQueueStatus() {
    return {
      queueLength: this.writeQueue.length,
      isProcessing: this.isProcessingQueue,
      activeSubscriptions: this.subscribers.size
    };
  }

  // Cleanup method
  cleanup() {
    this.pollingIntervals.forEach(interval => clearTimeout(interval));
    this.pollingIntervals.clear();
    this.subscribers.clear();
    this.writeQueue.length = 0;
  }
}

// Create and export enhanced SDK instance
const enhancedSDK = new EnhancedSDK();

export default enhancedSDK;
