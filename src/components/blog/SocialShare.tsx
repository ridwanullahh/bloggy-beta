
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Share2, Facebook, Twitter, Linkedin, Link } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  theme?: any;
}

export const SocialShare: React.FC<SocialShareProps> = ({ url, title, description, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const shareData = {
    title,
    text: description || title,
    url
  };

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        setIsOpen(!isOpen);
      }
    } catch (error) {
      setIsOpen(!isOpen);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied",
        description: "Post URL copied to clipboard!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleNativeShare}
        className="text-white hover:bg-white/10"
      >
        <Share2 className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border p-4 z-50 w-48"
          style={{ 
            backgroundColor: theme?.styles.secondaryColor || 'white',
            borderRadius: theme?.styles.borderRadius || '0.5rem'
          }}
        >
          <div className="space-y-2">
            <a
              href={shareUrls.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
            >
              <Facebook className="w-4 h-4 text-blue-600" />
              <span className="text-sm">Facebook</span>
            </a>
            <a
              href={shareUrls.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
            >
              <Twitter className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Twitter</span>
            </a>
            <a
              href={shareUrls.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
            >
              <Linkedin className="w-4 h-4 text-blue-700" />
              <span className="text-sm">LinkedIn</span>
            </a>
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100 transition-colors w-full text-left"
            >
              <Link className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Copy Link</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialShare;
