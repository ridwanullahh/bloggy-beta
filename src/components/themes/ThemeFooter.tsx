import React from 'react';
import { Blog } from '../../types/blog';
import { Twitter, Facebook, Instagram, Linkedin, Github, Youtube, Mail } from 'lucide-react';

interface ThemeFooterProps {
  blog: Blog;
}

export const ThemeFooter: React.FC<ThemeFooterProps> = ({ blog }) => {
  const socialMedia = blog.customization?.socialMedia;
  if (!socialMedia) return null;

  const socialPlatforms = [
    { name: 'twitter', icon: Twitter, enabled: socialMedia.enableTwitter, link: socialMedia.twitter },
    { name: 'facebook', icon: Facebook, enabled: socialMedia.enableFacebook, link: socialMedia.facebook },
    { name: 'instagram', icon: Instagram, enabled: socialMedia.enableInstagram, link: socialMedia.instagram },
    { name: 'linkedin', icon: Linkedin, enabled: socialMedia.enableLinkedin, link: socialMedia.linkedin },
    { name: 'github', icon: Github, enabled: socialMedia.enableGithub, link: socialMedia.github },
    { name: 'youtube', icon: Youtube, enabled: socialMedia.enableYoutube, link: socialMedia.youtube },
    { name: 'email', icon: Mail, enabled: socialMedia.enableEmail, link: `mailto:${socialMedia.email}` }
  ];

  const enabledPlatforms = socialPlatforms.filter(p => p.enabled && p.link);

  if (enabledPlatforms.length === 0) return null;

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} {blog.title}. All rights reserved.</p>
        <div className="flex space-x-4">
          {enabledPlatforms.map(platform => (
            <a key={platform.name} href={platform.link} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <platform.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
