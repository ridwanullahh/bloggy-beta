import React from 'react';
import { Blog, BlogTheme, Post } from '../../../types/blog';
import { UniversalPageLayout } from './UniversalPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { 
  Calendar, 
  User, 
  Tag, 
  ArrowLeft, 
  Share2, 
  BookmarkPlus, 
  Heart,
  MessageCircle,
  Clock,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PostPageLayoutProps {
  blog: Blog;
  theme: BlogTheme;
  post: Post;
  children: React.ReactNode;
}

export const PostPageLayout: React.FC<PostPageLayoutProps> = ({
  blog,
  theme,
  post,
  children
}) => {
  const navigate = useNavigate();
  const brandColors = blog.customization?.brandColors || {};

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const PostHeader = () => (
    <div className="bg-white border-b">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/${blog.slug}`)}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {blog.title}
        </Button>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(post.publishedAt || post.createdAt)}
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {post.authorName || 'Author'}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {estimateReadingTime(post.content)} min read
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              {post.views || 0} views
            </div>
          </div>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mt-8">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const PostActions = () => (
    <div className="sticky top-20 z-40">
      <Card className="shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col space-y-3">
            <Button variant="outline" size="sm" className="justify-start">
              <Heart className="w-4 h-4 mr-2" />
              {post.likes || 0}
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <MessageCircle className="w-4 h-4 mr-2" />
              {post.comments?.length || 0}
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <BookmarkPlus className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const PostContent = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Actions */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="hidden lg:block">
            <PostActions />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-10 order-1 lg:order-2">
          <Card>
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                {children}
              </div>
            </CardContent>
          </Card>

          {/* Mobile Actions */}
          <div className="lg:hidden mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-around">
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    {post.likes || 0}
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {post.comments?.length || 0}
                  </Button>
                  <Button variant="outline" size="sm">
                    <BookmarkPlus className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Author Bio */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                About the Author
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{post.authorName || 'Author'}</h4>
                  <p className="text-gray-600 mt-2">
                    Passionate writer and content creator sharing insights and stories 
                    that matter. Follow for more engaging content.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <UniversalPageLayout blog={blog} theme={theme} pageType="post">
      <PostHeader />
      <PostContent />
    </UniversalPageLayout>
  );
};
