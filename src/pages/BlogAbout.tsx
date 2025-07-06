
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ArrowLeft, User, Mail, Globe, Calendar } from 'lucide-react';
import { Blog } from '../types/blog';
import { getThemeById } from '../constants/themes';
import sdk from '../lib/sdk-instance';

const BlogAbout: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!slug) return;

      try {
        const allBlogs = await sdk.get<Blog>('blogs');
        const foundBlog = allBlogs.find(b => b.slug === slug && b.status === 'active');
        setBlog(foundBlog || null);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [slug]);

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
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: theme?.styles.secondaryColor || '#F3F4F6',
        fontFamily: theme?.styles.fontFamily || 'Inter, sans-serif'
      }}
    >
      {/* Header */}
      <div 
        className="border-b"
        style={{ backgroundColor: theme?.styles.primaryColor || '#1F2937' }}
      >
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center mb-4">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="text-white hover:bg-white/10 mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
          
          <h1 className="text-4xl font-bold mb-2 text-white">
            About {blog.title}
          </h1>
          <p className="text-xl text-white/90">
            Learn more about this blog and its mission
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Main About Section */}
          <Card style={{ borderRadius: theme?.styles.borderRadius }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                About This Blog
              </CardTitle>
            </CardHeader>
            <CardContent>
              {blog.description ? (
                <p className="text-gray-700 leading-relaxed mb-6">
                  {blog.description}
                </p>
              ) : (
                <p className="text-gray-700 leading-relaxed mb-6">
                  Welcome to {blog.title}! This blog shares insights, stories, and valuable content 
                  on topics that matter. We're passionate about creating quality content that 
                  informs, inspires, and engages our readers.
                </p>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Blog Details</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      <span>Theme: {theme?.name || 'Modern'}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Created: {new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Technology</Badge>
                    <Badge variant="outline">Lifestyle</Badge>
                    <Badge variant="outline">Insights</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mission Statement */}
          <Card style={{ borderRadius: theme?.styles.borderRadius }}>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to create meaningful content that adds value to our readers' lives. 
                We believe in the power of storytelling and knowledge sharing to build connections 
                and foster understanding in our community.
              </p>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card style={{ borderRadius: theme?.styles.borderRadius }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Have questions or suggestions? We'd love to hear from you!
              </p>
              <Button 
                onClick={() => window.location.href = `/${slug}/contact`}
                style={{ 
                  backgroundColor: theme?.styles.primaryColor,
                  borderRadius: theme?.styles.borderRadius
                }}
              >
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogAbout;
