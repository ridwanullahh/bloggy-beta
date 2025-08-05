import React, { useState } from 'react';
import { Blog, BlogTheme } from '../../../types/blog';
import { UniversalPageLayout } from './UniversalPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowLeft,
  Send,
  Clock,
  MessageCircle,
  User,
  Globe,
  Twitter,
  Facebook,
  Instagram,
  Linkedin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../hooks/use-toast';

interface ContactPageLayoutProps {
  blog: Blog;
  theme: BlogTheme;
  children?: React.ReactNode;
}

export const ContactPageLayout: React.FC<ContactPageLayoutProps> = ({
  blog,
  theme,
  children
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);

  const brandColors = blog.customization?.brandColors || {};
  const socialMedia = blog.customization?.socialMedia || {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const ContactHeader = () => (
    <div className="bg-white border-b">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/${blog.slug}`)}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {blog.title}
        </Button>

        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Get in touch with the {blog.title} team. We'd love to hear from you!
          </p>
        </div>
      </div>
    </div>
  );

  const ContactForm = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          Send us a Message
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <Input
              id="subject"
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <Textarea
              id="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Tell us more about your inquiry..."
            />
          </div>

          <Button 
            type="submit" 
            disabled={sending}
            className="w-full"
          >
            <Send className="w-4 h-4 mr-2" />
            {sending ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  const ContactInfo = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Get in Touch
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <div className="font-medium">Email</div>
              <div className="text-sm text-gray-600">hello@{blog.slug}.com</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <div className="font-medium">Response Time</div>
              <div className="text-sm text-gray-600">Usually within 24 hours</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Globe className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <div className="font-medium">Location</div>
              <div className="text-sm text-gray-600">Remote & Global</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {socialMedia.enabled && socialMedia.platforms && (
        <Card>
          <CardHeader>
            <CardTitle>Follow Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Connect with us on social media for updates and behind-the-scenes content.
            </p>
            <div className="space-y-3">
              {Object.entries(socialMedia.platforms).map(([platform, config]: [string, any]) => {
                if (!config.enabled) return null;

                const icons = {
                  twitter: Twitter,
                  facebook: Facebook,
                  instagram: Instagram,
                  linkedin: Linkedin
                };

                const Icon = icons[platform as keyof typeof icons];
                if (!Icon) return null;

                return (
                  <a
                    key={platform}
                    href={config.url || `https://${platform}.com/${config.handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="font-medium capitalize">{platform}</div>
                      <div className="text-sm text-gray-600">@{config.handle}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">How quickly do you respond?</h4>
            <p className="text-sm text-gray-600">
              We typically respond to messages within 24-48 hours during business days. 
              Thank you for your patience!
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Can I guest post?</h4>
            <p className="text-sm text-gray-600">
              We're always interested in quality guest content. Please include your 
              writing samples and proposed topics in your message.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Do you offer collaborations?</h4>
            <p className="text-sm text-gray-600">
              Yes! We're open to partnerships and collaborations that align with our 
              values and provide value to our audience.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Other Ways to Connect</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/${blog.slug}/about`)} 
            className="w-full justify-start"
          >
            <User className="w-4 h-4 mr-2" />
            Learn More About Us
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate(`/${blog.slug}`)} 
            className="w-full justify-start"
          >
            <Globe className="w-4 h-4 mr-2" />
            Visit Our Blog
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <UniversalPageLayout blog={blog} theme={theme} pageType="contact">
      <ContactHeader />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ContactForm />
            {children && (
              <div className="mt-8">
                {children}
              </div>
            )}
          </div>
          <div>
            <ContactInfo />
          </div>
        </div>
      </div>
    </UniversalPageLayout>
  );
};
