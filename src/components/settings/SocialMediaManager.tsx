import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Blog } from '../../types/blog';
import { Twitter, Facebook, Instagram, Linkedin, Github, Youtube, Mail } from 'lucide-react';

interface SocialMediaManagerProps {
  blog: Blog;
  onUpdate: (updatedBlog: Blog) => void;
}

export const SocialMediaManager: React.FC<SocialMediaManagerProps> = ({ blog, onUpdate }) => {
  const handleSocialChange = (platform: string, value: string | boolean) => {
    const updatedBlog = {
      ...blog,
      customization: {
        ...blog.customization,
        socialMedia: {
          ...blog.customization?.socialMedia,
          [platform]: value
        }
      }
    };
    onUpdate(updatedBlog);
  };

  const socialPlatforms = [
    { name: 'twitter', icon: Twitter, placeholder: 'https://twitter.com/username' },
    { name: 'facebook', icon: Facebook, placeholder: 'https://facebook.com/username' },
    { name: 'instagram', icon: Instagram, placeholder: 'https://instagram.com/username' },
    { name: 'linkedin', icon: Linkedin, placeholder: 'https://linkedin.com/in/username' },
    { name: 'github', icon: Github, placeholder: 'https://github.com/username' },
    { name: 'youtube', icon: Youtube, placeholder: 'https://youtube.com/channel/...' },
    { name: 'email', icon: Mail, placeholder: 'your-email@example.com' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Links</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {socialPlatforms.map(platform => (
          <div key={platform.name} className="flex items-center space-x-4">
            <platform.icon className="w-6 h-6" />
            <Input
              placeholder={platform.placeholder}
              value={blog.customization?.socialMedia?.[platform.name as keyof typeof blog.customization.socialMedia] as string || ''}
              onChange={(e) => handleSocialChange(platform.name, e.target.value)}
            />
            <Switch
              checked={blog.customization?.socialMedia?.[`enable${platform.name.charAt(0).toUpperCase() + platform.name.slice(1)}` as keyof typeof blog.customization.socialMedia] as boolean || false}
              onCheckedChange={(checked) => handleSocialChange(`enable${platform.name.charAt(0).toUpperCase() + platform.name.slice(1)}`, checked)}
            />
            <Label>Enable</Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};