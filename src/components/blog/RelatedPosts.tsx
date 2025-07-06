
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
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
        const blogPosts = allPosts.filter(p => 
          p.blogId === blog.id && 
          p.id !== currentPost.id && 
          p.status === 'published'
        );

        // Simple related posts algorithm based on tags and categories
        const scoredPosts = blogPosts.map(post => {
          let score = 0;
          
          // Score based on shared tags
          if (currentPost.tags && post.tags) {
            const sharedTags = currentPost.tags.filter(tag => post.tags?.includes(tag));
            score += sharedTags.length * 2;
          }
          
          // Score based on shared categories
          if (currentPost.categories && post.categories) {
            const sharedCategories = currentPost.categories.filter(cat => post.categories?.includes(cat));
            score += sharedCategories.length * 3;
          }
          
          // Add recency bonus
          const daysSincePublished = Math.floor(
            (Date.now() - new Date(post.publishedAt || post.createdAt).getTime()) / (1000 * 60 * 60 * 24)
          );
          score += Math.max(0, 30 - daysSincePublished) * 0.1;
          
          return { post, score };
        });

        // Sort by score and take top 3
        const topRelated = scoredPosts
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map(item => item.post);

        // If we don't have enough related posts, fill with recent posts
        if (topRelated.length < 3) {
          const recentPosts = blogPosts
            .filter(p => !topRelated.find(rp => rp.id === p.id))
            .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime())
            .slice(0, 3 - topRelated.length);
          
          topRelated.push(...recentPosts);
        }

        setRelatedPosts(topRelated);
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

  const truncateText = (text: string, maxLength: number = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading || relatedPosts.length === 0) return null;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle 
          className="text-xl font-bold"
          style={{ color: theme?.styles.primaryColor }}
        >
          Related Articles
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
          {relatedPosts.map((post) => (
            <div 
              key={post.id} 
              className="group cursor-pointer p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md"
              onClick={() => onPostClick(post)}
              style={{ 
                borderRadius: theme?.styles.borderRadius,
                borderColor: theme?.styles.primaryColor + '20'
              }}
            >
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                
                {post.excerpt && (
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {truncateText(post.excerpt)}
                  </p>
                )}
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(post.publishedAt || post.createdAt)}
                  </div>
                  {post.readingTime && (
                    <span>{post.readingTime} min read</span>
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
                
                <div className="flex items-center text-sm text-blue-600 group-hover:text-blue-700 transition-colors">
                  <span>Read more</span>
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedPosts;
