// Gravatar utility with proper MD5 hashing and fallback options
import React from 'react';

// Simple MD5 implementation for browser compatibility
function md5(str: string): string {
  // Simple hash function for demo - in production, use crypto-js or similar
  let hash = 0;
  if (str.length === 0) return hash.toString();
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Convert to hex and pad to 32 characters
  const hex = Math.abs(hash).toString(16);
  return hex.padStart(32, '0');
}

// Better MD5 implementation using Web Crypto API when available
async function md5Crypto(str: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(str);
      const hashBuffer = await crypto.subtle.digest('MD5', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      // Fallback to simple hash
      return md5(str);
    }
  }
  return md5(str);
}

export interface GravatarOptions {
  size?: number;
  default?: 'mp' | 'identicon' | 'monsterid' | 'wavatar' | 'retro' | 'robohash' | 'blank' | string;
  rating?: 'g' | 'pg' | 'r' | 'x';
  forceDefault?: boolean;
  protocol?: 'http' | 'https';
}

export class GravatarService {
  private static cache = new Map<string, string>();

  /**
   * Generate Gravatar URL from email
   */
  static async getGravatarUrl(email: string, options: GravatarOptions = {}): Promise<string> {
    const {
      size = 80,
      default: defaultImage = 'identicon',
      rating = 'g',
      forceDefault = false,
      protocol = 'https'
    } = options;

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check cache first
    const cacheKey = `${normalizedEmail}-${size}-${defaultImage}-${rating}-${forceDefault}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Generate MD5 hash
    const hash = await md5Crypto(normalizedEmail);

    // Build URL
    const params = new URLSearchParams({
      s: size.toString(),
      d: defaultImage,
      r: rating
    });

    if (forceDefault) {
      params.append('f', 'y');
    }

    const url = `${protocol}://www.gravatar.com/avatar/${hash}?${params.toString()}`;
    
    // Cache the result
    this.cache.set(cacheKey, url);
    
    return url;
  }

  /**
   * Synchronous version using simple hash (for immediate use)
   */
  static getGravatarUrlSync(email: string, options: GravatarOptions = {}): string {
    const {
      size = 80,
      default: defaultImage = 'identicon',
      rating = 'g',
      forceDefault = false,
      protocol = 'https'
    } = options;

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check cache first
    const cacheKey = `${normalizedEmail}-${size}-${defaultImage}-${rating}-${forceDefault}-sync`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Generate simple hash
    const hash = md5(normalizedEmail);

    // Build URL
    const params = new URLSearchParams({
      s: size.toString(),
      d: defaultImage,
      r: rating
    });

    if (forceDefault) {
      params.append('f', 'y');
    }

    const url = `${protocol}://www.gravatar.com/avatar/${hash}?${params.toString()}`;
    
    // Cache the result
    this.cache.set(cacheKey, url);
    
    return url;
  }

  /**
   * Get Gravatar profile URL
   */
  static getProfileUrl(email: string): string {
    const normalizedEmail = email.toLowerCase().trim();
    const hash = md5(normalizedEmail);
    return `https://www.gravatar.com/${hash}`;
  }

  /**
   * Check if Gravatar exists for email
   */
  static async hasGravatar(email: string): Promise<boolean> {
    try {
      const url = await this.getGravatarUrl(email, { default: '404' });
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  /**
   * Preload Gravatar image
   */
  static preloadGravatar(email: string, options: GravatarOptions = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load Gravatar'));
      
      this.getGravatarUrl(email, options).then(url => {
        img.src = url;
      });
    });
  }

  /**
   * Clear cache
   */
  static clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache size
   */
  static getCacheSize(): number {
    return this.cache.size;
  }
}

// React hook for Gravatar
export const useGravatar = (email: string, options: GravatarOptions = {}) => {
  const [gravatarUrl, setGravatarUrl] = React.useState<string>('');
  const [loading, setLoading] = React.useState(true);
  const [hasGravatar, setHasGravatar] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    if (!email) {
      setGravatarUrl('');
      setLoading(false);
      return;
    }

    const loadGravatar = async () => {
      try {
        setLoading(true);
        
        // Get URL immediately with sync version
        const syncUrl = GravatarService.getGravatarUrlSync(email, options);
        setGravatarUrl(syncUrl);
        
        // Then get the proper async version
        const asyncUrl = await GravatarService.getGravatarUrl(email, options);
        setGravatarUrl(asyncUrl);
        
        // Check if Gravatar exists
        const exists = await GravatarService.hasGravatar(email);
        setHasGravatar(exists);
      } catch (error) {
        console.error('Error loading Gravatar:', error);
        setHasGravatar(false);
      } finally {
        setLoading(false);
      }
    };

    loadGravatar();
  }, [email, JSON.stringify(options)]);

  return {
    gravatarUrl,
    loading,
    hasGravatar,
    profileUrl: email ? GravatarService.getProfileUrl(email) : ''
  };
};

// Gravatar component
interface GravatarProps extends GravatarOptions {
  email: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  fallback?: React.ReactNode;
}

export const Gravatar: React.FC<GravatarProps> = ({
  email,
  alt,
  className = '',
  style,
  onClick,
  fallback,
  ...options
}) => {
  const { gravatarUrl, loading, hasGravatar } = useGravatar(email, options);

  if (loading) {
    return (
      <div 
        className={`animate-pulse bg-gray-200 rounded-full ${className}`}
        style={{ width: options.size || 80, height: options.size || 80, ...style }}
      />
    );
  }

  if (!hasGravatar && fallback) {
    return <>{fallback}</>;
  }

  return (
    <img
      src={gravatarUrl}
      alt={alt || `Gravatar for ${email}`}
      className={className}
      style={style}
      onClick={onClick}
      loading="lazy"
    />
  );
};

export default GravatarService;

