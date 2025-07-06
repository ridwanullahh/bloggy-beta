
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, Calendar, Tag } from 'lucide-react';
import { Post, Blog } from '../../types/blog';
import sdk from '../../lib/sdk-instance';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog: Blog;
  theme?: any;
  onPostSelect: (post: Post) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  blog,
  theme,
  onPostSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchPosts();
    }
  }, [isOpen, blog.id]);

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, allPosts]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const posts = await sdk.get<Post>('posts');
      const blogPosts = posts.filter(post => 
        post.blogId === blog.id && post.status === 'published'
      );
      setAllPosts(blogPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const performSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    const results = allPosts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(query);
      const contentMatch = post.content.toLowerCase().includes(query);
      const excerptMatch = post.excerpt?.toLowerCase().includes(query);
      const tagMatch = post.tags?.some(tag => tag.toLowerCase().includes(query));
      
      return titleMatch || contentMatch || excerptMatch || tagMatch;
    });

    // Sort by relevance (title matches first)
    results.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(query);
      const bTitle = b.title.toLowerCase().includes(query);
      
      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      
      return new Date(b.publishedAt || b.createdAt).getTime() - 
             new Date(a.publishedAt || a.createdAt).getTime();
    });

    setSearchResults(results.slice(0, 10)); // Limit to 10 results
  };

  const handlePostSelect = (post: Post) => {
    onPostSelect(post);
    onClose();
    setSearchQuery('');
    setSearchResults([]);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    const textContent = content.replace(/<[^>]*>/g, '').replace(/[#*`]/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...' 
      : textContent;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Search {blog.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search articles, tags, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              autoFocus
              style={{ 
                borderColor: theme?.styles.primaryColor + '40',
                fontFamily: theme?.styles.fontFamily 
              }}
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
              </div>
            ) : searchQuery.trim() && searchResults.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No articles found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className="space-y-3">
                {searchResults.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handlePostSelect(post)}
                    style={{ 
                      borderColor: theme?.styles.primaryColor + '20',
                      borderRadius: theme?.styles.borderRadius || '0.5rem'
                    }}
                  >
                    <h3 
                      className="font-medium text-lg mb-2 hover:text-blue-600 transition-colors"
                      dangerouslySetInnerHTML={{ 
                        __html: highlightMatch(post.title, searchQuery) 
                      }}
                    />
                    
                    {post.excerpt && (
                      <p 
                        className="text-gray-600 text-sm mb-2"
                        dangerouslySetInnerHTML={{ 
                          __html: highlightMatch(truncateContent(post.excerpt), searchQuery) 
                        }}
                      />
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
                            {post.tags.slice(0, 3).map((tag, index) => (
                              <Badge 
                                key={index} 
                                variant="outline" 
                                className="text-xs"
                                style={{ 
                                  backgroundColor: searchQuery.toLowerCase().includes(tag.toLowerCase()) 
                                    ? theme?.styles.primaryColor + '20' 
                                    : undefined 
                                }}
                              >
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
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
