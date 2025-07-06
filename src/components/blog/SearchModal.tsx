
import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Search, Calendar, Tag, X } from 'lucide-react';
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
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await sdk.get<Post>('posts');
        const blogPosts = posts.filter(p => p.blogId === blog.id && p.status === 'published');
        setAllPosts(blogPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (isOpen) {
      fetchPosts();
    }
  }, [isOpen, blog.id]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timeoutId = setTimeout(() => {
      const filtered = allPosts.filter(post => {
        const searchTerms = query.toLowerCase().split(' ');
        const content = `${post.title} ${post.content} ${post.excerpt || ''} ${(post.tags || []).join(' ')} ${(post.categories || []).join(' ')}`.toLowerCase();
        
        return searchTerms.every(term => content.includes(term));
      });

      // Sort by relevance (title matches first, then content)
      const sorted = filtered.sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();
        const queryLower = query.toLowerCase();
        
        if (aTitle.includes(queryLower) && !bTitle.includes(queryLower)) return -1;
        if (!aTitle.includes(queryLower) && bTitle.includes(queryLower)) return 1;
        
        return new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime();
      });

      setResults(sorted.slice(0, 10)); // Limit to 10 results
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, allPosts]);

  const handlePostSelect = (post: Post) => {
    onPostSelect(post);
    onClose();
    setQuery('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={index} className="bg-yellow-200 px-1">{part}</mark> : part
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Search className="w-5 h-5 mr-2" style={{ color: theme?.styles.primaryColor }} />
              Search {blog.title}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col min-h-0">
          <div className="mb-4">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search articles, tags, categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full"
              style={{ 
                borderColor: theme?.styles.primaryColor + '40',
                fontFamily: theme?.styles.fontFamily 
              }}
            />
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: theme?.styles.primaryColor }}></div>
              </div>
            ) : query && results.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No articles found for "{query}"</p>
                <p className="text-sm mt-2">Try different keywords or check your spelling</p>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => handlePostSelect(post)}
                    className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-all duration-200 hover:shadow-md"
                    style={{ 
                      borderRadius: theme?.styles.borderRadius,
                      borderColor: theme?.styles.primaryColor + '20'
                    }}
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {highlightText(post.title, query)}
                    </h3>
                    
                    {post.excerpt && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {highlightText(post.excerpt.substring(0, 150), query)}
                        {post.excerpt.length > 150 && '...'}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(post.publishedAt || post.createdAt)}
                      </div>
                      {post.readingTime && (
                        <span>{post.readingTime} min read</span>
                      )}
                    </div>
                    
                    {(post.tags && post.tags.length > 0) || (post.categories && post.categories.length > 0) ? (
                      <div className="flex flex-wrap gap-1">
                        {post.categories?.slice(0, 2).map((category, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {highlightText(category, query)}
                          </Badge>
                        ))}
                        {post.tags?.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Tag className="w-2 h-2 mr-1" />
                            {highlightText(tag, query)}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {query && results.length > 0 && (
            <div className="mt-4 pt-4 border-t text-center text-sm text-gray-500">
              Showing {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
