import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { getThemeById } from '../constants/themes';
import { ComprehensiveThemeSystem } from '../components/themes/ComprehensiveThemeSystem';
import { useBlogData } from '../hooks/use-blog-data';
import enhancedSDK from '../lib/enhanced-sdk';
import { ArrowLeft, Mail, MessageCircle, User } from 'lucide-react';

const BlogContact: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { blog, loading, blogSlug } = useBlogData();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog || !form.name || !form.email || !form.subject || !form.message) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      // Store contact form submission for blog owner to review
      await enhancedSDK.insert('contactSubmissions', {
        blogId: blog.id,
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        status: 'unread'
      });

      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Blog not found</p>
        </div>
      </div>
    );
  }

  const theme = getThemeById(blog.theme);

  return (
    <ComprehensiveThemeSystem blogSlug={blogSlug!} pageType="contact">
      <div className="min-h-screen bg-gray-50" style={{
        backgroundColor: theme?.styles.secondaryColor || '#F3F4F6',
        fontFamily: theme?.styles.fontFamily || 'Inter, sans-serif',
      }}>
      {/* Header */}
      <div className="bg-white border-b" style={{ 
        backgroundColor: theme?.styles.primaryColor || '#1F2937',
        color: 'white'
      }}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/${blogSlug}`)}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {blog.title}
          </Button>
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-xl opacity-90 mt-2">Get in touch with the {blog.title} team</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <Input
                  placeholder="Subject"
                  value={form.subject}
                  onChange={(e) => setForm(prev => ({ ...prev, subject: e.target.value }))}
                  required
                />
                <Textarea
                  placeholder="Your message..."
                  value={form.message}
                  onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                  rows={6}
                  required
                />
                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">About {blog.title}</h3>
                <p className="text-gray-600">
                  {blog.description || `Welcome to ${blog.title}. We're here to share valuable content and connect with our community.`}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Why Contact Us?</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• General inquiries and questions</li>
                  <li>• Collaboration opportunities</li>
                  <li>• Feedback and suggestions</li>
                  <li>• Media and press inquiries</li>
                  <li>• Technical support</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-gray-600">
                  We typically respond to messages within 24-48 hours during business days. 
                  Thank you for your patience!
                </p>
              </div>

              <div className="pt-4">
                <Button variant="outline" onClick={() => navigate(`/${blogSlug}/about`)} className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  Learn More About Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </ComprehensiveThemeSystem>
  );
};

export default BlogContact;
