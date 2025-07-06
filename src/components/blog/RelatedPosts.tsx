
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar, Tag } from 'lucide-react';
import { Post, Blog } from '../../types/blog';
import sdk from '../../lib/sdk-instance';

interface RelatedPostsProps {
  currentPost: Post;
  blog: Blog;
  theme?: any;
  onPostClick: (post: Post) => void;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ 
  currentPost, 
  blog, 
  theme, 
  onPostClick 
}) => {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const allPosts = await sdk.get<Post>('posts');
        const blogPosts = allPosts
          .filter(post => 
            post.blogId === blog.id && 
            post.status === 'published' && 
            post.id !== currentPost.id
          );

        // Simple related posts logic - based on shared tags
        const related = blogPosts
          .filter(post => 
            post.tags && currentPost.tags && 
            post.tags.some(tag => currentPost.tags?.includes(tag))
          )
          .slice(0, 3);

        // If no tag matches, get latest posts
        if (related.length === 0) {
          related.push(...blogPosts
            .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime())
            .slice(0, 3)
          );
        }

        setRelatedPosts(related);
      } catch (error) {
        console.error('Error fetching related posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [currentPost, blog]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 120) => {
    const textContent = content.replace(/<[^>]*>/g, '').replace(/[#*`]/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...' 
      : textContent;
  };

  if (loading || relatedPosts.length === 0) {
    return null;
  }

  return (
    <Card style={{ 
      borderRadius: theme?.styles.borderRadius || '0.5rem',
      fontFamily: theme?.styles.fontFamily 
    }}>
      <CardHeader>
        <CardTitle style={{ color: theme?.styles.primaryColor }}>
          Related Articles
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {relatedPosts.map((post) => (
            <div 
              key={post.id}
              className="border-l-4 pl-4 cursor-pointer hover:bg-gray-50 p-3 rounded transition-colors"
              style={{ borderColor: theme?.styles.primaryColor }}
              onClick={() => onPostClick(post)}
            >
              <h4 className="font-medium text-lg mb-2 hover:text-blue-600 transition-colors">
                {post.title}
              </h4>
              
              {post.excerpt && (
                <p className="text-gray-600 text-sm mb-2">
                  {truncateContent(post.excerpt, 100)}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(post.publishedAt || post.createdAt)}
                </div>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Tag className="w-3 h-3" />
                    <div className="flex space-x-1">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedPosts;
