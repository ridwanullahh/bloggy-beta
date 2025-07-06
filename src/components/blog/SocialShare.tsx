
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Share2, Copy, Check } from 'lucide-react';
import { ThemeStyle } from '../../constants/themes';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  theme?: ThemeStyle;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title, description, theme }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const shareData = {
    title,
    text: description,
    url
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleNativeShare}
      className="text-white hover:bg-white/10"
    >
      {copied ? <Check className="w-4 h-4 mr-1" /> : <Share2 className="w-4 h-4 mr-1" />}
      {copied ? 'Copied!' : 'Share'}
    </Button>
  );
};

export default SocialShare;
