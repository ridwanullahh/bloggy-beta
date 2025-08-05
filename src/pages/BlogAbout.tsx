
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Blog } from '../types/blog';
import { getThemeById } from '../constants/themes';
import { UniversalThemeWrapper } from '../components/themes/UniversalThemeWrapper';
import { useBlogData } from '../hooks/use-blog-data';
import { ArrowLeft, User, Mail, Globe } from 'lucide-react';

const BlogAbout: React.FC = () => {
  const navigate = useNavigate();
  const { blog, loading, blogSlug } = useBlogData();

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
    <UniversalThemeWrapper blog={blog} theme={theme!} pageType="about">
      <div className="min-h-screen bg-gray-50" style={{
        backgroundColor: theme?.styles.secondaryColor || '#F3F4F6',
        fontFamily: theme?.styles.fontFamily || 'Inter, sans-serif'
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
          <h1 className="text-4xl font-bold">About {blog.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-500" />
                </div>
                <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                {blog.description && (
                  <p className="text-gray-600 text-lg">{blog.description}</p>
                )}
              </div>

              <div className="prose prose-lg max-w-none">
                <h3>Welcome to {blog.title}</h3>
                <p>
                  This blog is dedicated to sharing insights, stories, and valuable content with our readers. 
                  We're passionate about creating meaningful connections through the power of written word.
                </p>
                
                <h3>Our Mission</h3>
                <p>
                  We believe in the power of authentic storytelling and aim to provide content that informs, 
                  inspires, and engages our community. Every post is crafted with care and attention to detail.
                </p>

                <h3>What You'll Find Here</h3>
                <ul>
                  <li>Thoughtful articles and insights</li>
                  <li>Regular updates on topics that matter</li>
                  <li>A community-focused approach to content</li>
                  <li>Authentic perspectives and experiences</li>
                </ul>

                <h3>Connect With Us</h3>
                <p>
                  We love hearing from our readers! Feel free to reach out through our contact page 
                  or engage with us through comments on our posts.
                </p>
              </div>

              <div className="flex justify-center space-x-4 pt-6">
                <Button onClick={() => navigate(`/${blogSlug}/contact`)}>
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Us
                </Button>
                <Button variant="outline" onClick={() => navigate(`/${blogSlug}`)}>
                  <Globe className="w-4 h-4 mr-2" />
                  Visit Blog
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </UniversalThemeWrapper>
  );
};

export default BlogAbout;
