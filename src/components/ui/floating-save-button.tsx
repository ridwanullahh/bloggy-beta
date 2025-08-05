import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { Save, Check, X, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FloatingSaveButtonProps {
  onSave: () => Promise<void> | void;
  hasChanges: boolean;
  disabled?: boolean;
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  showOnScroll?: boolean;
  saveText?: string;
  savingText?: string;
  savedText?: string;
}

export const FloatingSaveButton: React.FC<FloatingSaveButtonProps> = ({
  onSave,
  hasChanges,
  disabled = false,
  className = '',
  position = 'bottom-right',
  showOnScroll = true,
  saveText = 'Save Changes',
  savingText = 'Saving...',
  savedText = 'Saved!'
}) => {
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [isVisible, setIsVisible] = useState(!showOnScroll);

  useEffect(() => {
    if (!showOnScroll) return;

    const handleScroll = () => {
      const scrolled = window.scrollY > 200;
      setIsVisible(scrolled && hasChanges);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showOnScroll, hasChanges]);

  useEffect(() => {
    if (!showOnScroll) {
      setIsVisible(hasChanges);
    }
  }, [hasChanges, showOnScroll]);

  const handleSave = async () => {
    if (saving || disabled || !hasChanges) return;

    setSaving(true);
    setSaveStatus('saving');

    try {
      await onSave();
      setSaveStatus('saved');
      
      // Reset status after 2 seconds
      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    } catch (error) {
      setSaveStatus('error');
      console.error('Save failed:', error);
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    } finally {
      setSaving(false);
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'bottom-center':
        return 'bottom-6 left-1/2 transform -translate-x-1/2';
      case 'bottom-right':
      default:
        return 'bottom-6 right-6';
    }
  };

  const getButtonContent = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
            {savingText}
          </>
        );
      case 'saved':
        return (
          <>
            <Check className="w-4 h-4 mr-2" />
            {savedText}
          </>
        );
      case 'error':
        return (
          <>
            <AlertCircle className="w-4 h-4 mr-2" />
            Error - Retry
          </>
        );
      default:
        return (
          <>
            <Save className="w-4 h-4 mr-2" />
            {saveText}
          </>
        );
    }
  };

  const getButtonVariant = () => {
    switch (saveStatus) {
      case 'saved':
        return 'default';
      case 'error':
        return 'destructive';
      default:
        return 'default';
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed z-50 transition-all duration-300 ease-in-out',
        getPositionClasses(),
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
    >
      <Button
        onClick={handleSave}
        disabled={disabled || saving || !hasChanges}
        variant={getButtonVariant()}
        size="lg"
        className={cn(
          'shadow-lg hover:shadow-xl transition-all duration-200',
          'bg-blue-600 hover:bg-blue-700 text-white',
          saveStatus === 'saved' && 'bg-green-600 hover:bg-green-700',
          saveStatus === 'error' && 'bg-red-600 hover:bg-red-700',
          'min-w-[140px] justify-center'
        )}
      >
        {getButtonContent()}
      </Button>
    </div>
  );
};

// Hook for managing save state
export const useSaveState = (initialHasChanges = false) => {
  const [hasChanges, setHasChanges] = useState(initialHasChanges);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const markAsChanged = () => setHasChanges(true);
  const markAsSaved = () => {
    setHasChanges(false);
    setLastSaved(new Date());
  };
  const resetChanges = () => setHasChanges(false);

  return {
    hasChanges,
    lastSaved,
    markAsChanged,
    markAsSaved,
    resetChanges,
    setHasChanges
  };
};

// Sticky save bar component for forms
export const StickySaveBar: React.FC<{
  onSave: () => Promise<void> | void;
  onCancel?: () => void;
  hasChanges: boolean;
  disabled?: boolean;
  saveText?: string;
  cancelText?: string;
}> = ({
  onSave,
  onCancel,
  hasChanges,
  disabled = false,
  saveText = 'Save Changes',
  cancelText = 'Cancel'
}) => {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (saving || disabled || !hasChanges) return;

    setSaving(true);
    try {
      await onSave();
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setSaving(false);
    }
  };

  if (!hasChanges) return null;

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-sm text-gray-600">
          You have unsaved changes
        </div>
        <div className="flex items-center space-x-3">
          {onCancel && (
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={saving}
            >
              {cancelText}
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={disabled || saving || !hasChanges}
            className="min-w-[120px]"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {saveText}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Keyboard shortcut hook for save functionality
export const useSaveShortcut = (onSave: () => void, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        onSave();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSave, enabled]);
};
