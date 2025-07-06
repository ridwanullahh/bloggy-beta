
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Share2, Facebook, Twitter, Linkedin, Link, Mail, MessageCircle } from 'lucide-react';
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
    url: window.location.href
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      });
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const shareToSocial = (platform: string) => {
    const encodedUrl = encodeURIComponent(window.location.href);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description || title);

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
    };

    if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={handleNativeShare}
        variant="outline"
        size="sm"
        className="flex items-center space-x-2"
        style={{ 
          borderColor: theme?.styles.primaryColor,
          color: theme?.styles.primaryColor 
        }}
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </Button>

      {isOpen && (
        <Card className="absolute top-12 right-0 z-50 w-64 shadow-lg">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareToSocial('facebook')}
                className="flex items-center space-x-2"
              >
                <Facebook className="w-4 h-4 text-blue-600" />
                <span>Facebook</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareToSocial('twitter')}
                className="flex items-center space-x-2"
              >
                <Twitter className="w-4 h-4 text-blue-400" />
                <span>Twitter</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareToSocial('linkedin')}
                className="flex items-center space-x-2"
              >
                <Linkedin className="w-4 h-4 text-blue-700" />
                <span>LinkedIn</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareToSocial('whatsapp')}
                className="flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4 text-green-600" />
                <span>WhatsApp</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareToSocial('email')}
                className="flex items-center space-x-2"
              >
                <Mail className="w-4 h-4 text-gray-600" />
                <span>Email</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center space-x-2"
              >
                <Link className="w-4 h-4 text-gray-600" />
                <span>Copy Link</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SocialShare;
