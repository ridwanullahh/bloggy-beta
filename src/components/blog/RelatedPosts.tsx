
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar, Clock, Tag } from 'lucide-react';
import { Blog, Post } from '../../types/blog';
import { ThemeStyle } from '../../constants/themes';
import sdk from '../../lib/sdk-instance';

interface RelatedPostsProps {
  currentPost: Post;
  blog: Blog;
  theme?: ThemeStyle;
  onPostClick: (post: Post) => void;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ 
  currentPost, 
  blog, 
  theme, 
  onPostClick 
}) => {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const allPosts = await sdk.get<Post>('posts');
        const blogPosts = allPosts
          .filter(p => 
            p.blogId === blog.id && 
            p.status === 'published' && 
            p.id !== currentPost.id
          );

        // Simple related posts algorithm - match by tags and recent posts
        let related = blogPosts;

        // If current post has tags, prioritize posts with matching tags
        if (currentPost.tags && currentPost.tags.length > 0) {
          related = related.sort((a, b) => {
            const aMatches = a.tags ? a.tags.filter(tag => currentPost.tags!.includes(tag)).length : 0;
            const bMatches = b.tags ? b.tags.filter(tag => currentPost.tags!.includes(tag)).length : 0;
            
            if (aMatches !== bMatches) {
              return bMatches - aMatches;
            }
            
            // Secondary sort by date
            return new Date(b.publishedAt || b.createdAt).getTime() - 
                   new Date(a.publishedAt || a.createdAt).getTime();
          });
        } else {
          // Sort by date if no tags
          related = related.sort((a, b) => 
            new Date(b.publishedAt || b.createdAt).getTime() - 
            new Date(a.publishedAt || a.createdAt).getTime()
          );
        }

        setRelatedPosts(related.slice(0, 3));
      } catch (error) {
        console.error('Error fetching related posts:', error);
      }
    };

    fetchRelatedPosts();
  }, [currentPost, blog]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 120) => {
    const textContent = content.replace(/<[^>]*>/g, '').replace(/[#*`]/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...' 
      : textContent;
  };

  if (relatedPosts.length === 0) return null;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Tag className="w-5 h-5 mr-2" />
          Related Posts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {relatedPosts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onPostClick(post)}
              style={{ borderColor: theme?.styles.primaryColor + '20' }}
            >
              <div className="flex-1">
                <h4 
                  className="font-semibold text-lg mb-2 hover:opacity-80 transition-opacity"
                  style={{ color: theme?.styles.primaryColor }}
                >
                  {post.title}
                </h4>
                
                <p className="text-gray-600 text-sm mb-3">
                  {post.excerpt || truncateContent(post.content)}
                </p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(post.publishedAt || post.createdAt)}
                  </div>
                  {post.readingTime && (
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readingTime} min
                    </div>
                  )}
                </div>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
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
