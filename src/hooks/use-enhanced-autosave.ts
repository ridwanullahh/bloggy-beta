import { useCallback, useRef, useEffect } from 'react';
import enhancedSDK from '../lib/enhanced-sdk';

interface AutosaveOptions {
  delay?: number; // Delay in milliseconds (default: 90000 = 1.5 minutes)
  onSave?: (data: any) => void;
  onError?: (error: any) => void;
  onSuccess?: () => void;
  enabled?: boolean;
}

interface AutosaveData {
  collection: string;
  id?: string;
  data: any;
  isNew?: boolean;
}

export const useEnhancedAutosave = (options: AutosaveOptions = {}) => {
  const {
    delay = 90000, // 1.5 minutes as requested
    onSave,
    onError,
    onSuccess,
    enabled = true
  } = options;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSaveRef = useRef<number>(0);
  const pendingDataRef = useRef<AutosaveData | null>(null);
  const isSavingRef = useRef<boolean>(false);

  // Clear existing timeout
  const clearAutosaveTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Perform the actual save operation
  const performSave = useCallback(async (autosaveData: AutosaveData) => {
    if (isSavingRef.current || !enabled) return;

    try {
      isSavingRef.current = true;
      onSave?.(autosaveData.data);

      let result;
      if (autosaveData.isNew) {
        result = await enhancedSDK.insert(autosaveData.collection, autosaveData.data);
      } else if (autosaveData.id) {
        result = await enhancedSDK.update(autosaveData.collection, autosaveData.id, autosaveData.data);
      } else {
        throw new Error('No ID provided for update operation');
      }

      lastSaveRef.current = Date.now();
      pendingDataRef.current = null;
      onSuccess?.();
      
      return result;
    } catch (error) {
      console.error('Autosave failed:', error);
      onError?.(error);
      throw error;
    } finally {
      isSavingRef.current = false;
    }
  }, [enabled, onSave, onError, onSuccess]);

  // Schedule autosave
  const scheduleAutosave = useCallback((autosaveData: AutosaveData) => {
    if (!enabled) return;

    // Store the pending data
    pendingDataRef.current = autosaveData;

    // Clear existing timeout
    clearAutosaveTimeout();

    // Set new timeout
    timeoutRef.current = setTimeout(async () => {
      if (pendingDataRef.current && !isSavingRef.current) {
        try {
          await performSave(pendingDataRef.current);
        } catch (error) {
          // Error already handled in performSave
        }
      }
    }, delay);
  }, [enabled, delay, clearAutosaveTimeout, performSave]);

  // Manual save (bypasses delay)
  const saveNow = useCallback(async (autosaveData?: AutosaveData) => {
    const dataToSave = autosaveData || pendingDataRef.current;
    if (!dataToSave) return null;

    clearAutosaveTimeout();
    return await performSave(dataToSave);
  }, [clearAutosaveTimeout, performSave]);

  // Check if autosave is pending
  const hasPendingChanges = useCallback(() => {
    return pendingDataRef.current !== null && !isSavingRef.current;
  }, []);

  // Get time since last save
  const getTimeSinceLastSave = useCallback(() => {
    return Date.now() - lastSaveRef.current;
  }, []);

  // Get time until next autosave
  const getTimeUntilNextSave = useCallback(() => {
    if (!pendingDataRef.current || isSavingRef.current) return 0;
    
    const elapsed = Date.now() - (lastSaveRef.current || 0);
    return Math.max(0, delay - elapsed);
  }, [delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAutosaveTimeout();
    };
  }, [clearAutosaveTimeout]);

  return {
    scheduleAutosave,
    saveNow,
    clearAutosaveTimeout,
    hasPendingChanges,
    getTimeSinceLastSave,
    getTimeUntilNextSave,
    isSaving: () => isSavingRef.current
  };
};

// Specialized hook for post editing
export const usePostAutosave = (
  post: any,
  blog: any,
  user: any,
  options: Omit<AutosaveOptions, 'onSave'> & {
    onPostUpdate?: (updatedPost: any) => void;
  } = {}
) => {
  const { onPostUpdate, ...autosaveOptions } = options;

  const autosave = useEnhancedAutosave({
    ...autosaveOptions,
    onSave: (data) => {
      console.log('Auto-saving post...', data.title);
    },
    onSuccess: () => {
      console.log('Post auto-saved successfully');
    },
    onError: (error) => {
      console.error('Post autosave failed:', error);
    }
  });

  const schedulePostSave = useCallback((formData: any) => {
    if (!blog || !user || !formData.title || !formData.content) {
      return;
    }

    const postData = {
      title: formData.title,
      slug: formData.slug,
      content: formData.content,
      excerpt: formData.excerpt,
      blogId: blog.id,
      authorId: user.id,
      status: formData.status || 'draft',
      categories: formData.selectedCategories || [],
      tags: formData.selectedTags || [],
      seo: {
        metaTitle: formData.seoTitle,
        metaDescription: formData.seoDescription,
        keywords: formData.seoKeywords?.split(',').map((k: string) => k.trim()).filter((k: string) => k) || []
      },
      monetization: {
        isPaid: formData.isPaid || false,
        price: formData.price || 0,
        currency: formData.currency || 'USD'
      },
      updatedAt: new Date().toISOString()
    };

    autosave.scheduleAutosave({
      collection: 'posts',
      id: post?.id,
      data: postData,
      isNew: !post?.id
    });
  }, [blog, user, post, autosave, onPostUpdate]);

  const savePostNow = useCallback(async (formData?: any) => {
    if (formData) {
      schedulePostSave(formData);
    }
    return await autosave.saveNow();
  }, [autosave, schedulePostSave]);

  return {
    ...autosave,
    schedulePostSave,
    savePostNow
  };
};

// Specialized hook for blog settings autosave
export const useBlogSettingsAutosave = (
  blog: any,
  options: Omit<AutosaveOptions, 'onSave'> & {
    onBlogUpdate?: (updatedBlog: any) => void;
  } = {}
) => {
  const { onBlogUpdate, ...autosaveOptions } = options;

  const autosave = useEnhancedAutosave({
    ...autosaveOptions,
    delay: 30000, // 30 seconds for settings
    onSave: (data) => {
      console.log('Auto-saving blog settings...', data.title);
    },
    onSuccess: () => {
      console.log('Blog settings auto-saved successfully');
    },
    onError: (error) => {
      console.error('Blog settings autosave failed:', error);
    }
  });

  const scheduleBlogSave = useCallback((formData: any) => {
    if (!blog || !formData.title) {
      return;
    }

    const blogData = {
      ...blog,
      title: formData.title,
      description: formData.description,
      theme: formData.theme,
      customDomain: formData.customDomain,
      customization: {
        brandColors: {
          primary: formData.primaryColor,
          secondary: formData.secondaryColor,
          accent: formData.accentColor
        },
        homepageSettings: {
          showFeaturedPosts: formData.showFeaturedPosts,
          showRecentPosts: formData.showRecentPosts,
          showCategories: formData.showCategories,
          showNewsletter: formData.showNewsletter,
          showTrending: formData.showTrending,
          heroStyle: formData.heroStyle
        },
        socialMedia: formData.socialMedia
      },
      settings: {
        allowComments: formData.allowComments,
        moderateComments: formData.moderateComments,
        seoOptimized: formData.seoOptimized
      },
      monetization: {
        enabled: formData.monetizationEnabled,
        allowFreeContent: formData.allowFreeContent,
        subscriptionPrice: formData.subscriptionPrice,
        payPerArticle: formData.payPerArticle,
        paywallEnabled: formData.paywallEnabled
      },
      marketing: {
        emailMarketing: formData.emailMarketing,
        socialAutoPost: formData.socialAutoPost,
        contentScheduling: formData.contentScheduling
      },
      updatedAt: new Date().toISOString()
    };

    autosave.scheduleAutosave({
      collection: 'blogs',
      id: blog.id,
      data: blogData
    });
  }, [blog, autosave, onBlogUpdate]);

  const saveBlogNow = useCallback(async (formData?: any) => {
    if (formData) {
      scheduleBlogSave(formData);
    }
    return await autosave.saveNow();
  }, [autosave, scheduleBlogSave]);

  return {
    ...autosave,
    scheduleBlogSave,
    saveBlogNow
  };
};

export default useEnhancedAutosave;
