import { useEffect, useCallback, useRef } from 'react';
import enhancedSDK from '../lib/enhanced-sdk';

interface UseRealTimeUpdatesOptions {
  collections: string[];
  onUpdate?: (collection: string, data: any) => void;
  onError?: (collection: string, error: any) => void;
  immediate?: boolean;
}

export const useRealTimeUpdates = ({
  collections,
  onUpdate,
  onError,
  immediate = true
}: UseRealTimeUpdatesOptions) => {
  const unsubscribersRef = useRef<(() => void)[]>([]);
  const isActiveRef = useRef(true);

  const handleUpdate = useCallback((collection: string, data: any) => {
    if (isActiveRef.current && onUpdate) {
      onUpdate(collection, data);
    }
  }, [onUpdate]);

  const handleError = useCallback((collection: string, error: any) => {
    if (isActiveRef.current && onError) {
      onError(collection, error);
    }
  }, [onError]);

  useEffect(() => {
    if (!immediate) return;

    // Subscribe to all specified collections
    collections.forEach(collection => {
      const unsubscribe = enhancedSDK.subscribe(collection, (data) => {
        if (data.type === 'refresh' || data.type === 'update') {
          handleUpdate(collection, data.data);
        } else if (data.type === 'error') {
          handleError(collection, data.error);
        }
      });

      unsubscribersRef.current.push(unsubscribe);
    });

    // Listen for global data updates
    const handleGlobalUpdate = (event: CustomEvent) => {
      const { collection, data } = event.detail;
      if (collections.includes(collection)) {
        handleUpdate(collection, data);
      }
    };

    window.addEventListener('global-data-update', handleGlobalUpdate as EventListener);

    return () => {
      // Cleanup subscriptions
      unsubscribersRef.current.forEach(unsubscribe => unsubscribe());
      unsubscribersRef.current = [];
      window.removeEventListener('global-data-update', handleGlobalUpdate as EventListener);
    };
  }, [collections, handleUpdate, handleError, immediate]);

  const pause = useCallback(() => {
    isActiveRef.current = false;
  }, []);

  const resume = useCallback(() => {
    isActiveRef.current = true;
  }, []);

  const forceRefresh = useCallback(async (collection?: string) => {
    if (collection) {
      try {
        const data = await enhancedSDK.get(collection);
        handleUpdate(collection, data);
      } catch (error) {
        handleError(collection, error);
      }
    } else {
      // Refresh all collections
      for (const col of collections) {
        try {
          const data = await enhancedSDK.get(col);
          handleUpdate(col, data);
        } catch (error) {
          handleError(col, error);
        }
      }
    }
  }, [collections, handleUpdate, handleError]);

  return {
    pause,
    resume,
    forceRefresh,
    isActive: isActiveRef.current
  };
};

// Hook for listening to specific data changes
export const useDataSubscription = <T = any>(
  collection: string,
  onUpdate: (data: T[]) => void,
  dependencies: any[] = []
) => {
  useEffect(() => {
    const unsubscribe = enhancedSDK.subscribe(collection, (data) => {
      if (data.type === 'refresh' || data.type === 'update') {
        onUpdate(data.data);
      }
    });

    // Listen for global updates
    const handleGlobalUpdate = (event: CustomEvent) => {
      const { collection: updatedCollection, data } = event.detail;
      if (updatedCollection === collection) {
        onUpdate(data);
      }
    };

    window.addEventListener('global-data-update', handleGlobalUpdate as EventListener);

    return () => {
      unsubscribe();
      window.removeEventListener('global-data-update', handleGlobalUpdate as EventListener);
    };
  }, [collection, ...dependencies]);
};

// Hook for triggering updates across components
export const useUpdateTrigger = () => {
  const triggerUpdate = useCallback((collection: string, data?: any) => {
    window.dispatchEvent(new CustomEvent('global-data-update', {
      detail: { collection, data, timestamp: Date.now() }
    }));
  }, []);

  const triggerGlobalRefresh = useCallback(() => {
    window.dispatchEvent(new CustomEvent('global-refresh', {
      detail: { timestamp: Date.now() }
    }));
  }, []);

  return {
    triggerUpdate,
    triggerGlobalRefresh
  };
};
