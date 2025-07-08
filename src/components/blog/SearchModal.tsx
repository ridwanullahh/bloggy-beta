import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { Post, Blog } from '../../types/blog';
import sdk from '../../lib/sdk-instance';
import { Search, Clock, FileText, ArrowRight, X } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  blogSlug?: string;
  blog?: Blog | null;
}

interface SearchResult {
  type: 'post';
  post: Post;
  relevanceScore: number;
}

export const SearchModal: React.FC<SearchModalProps> = ({ 
  isOpen, 
  onClose, 
  blogSlug,
  blog 
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem(`recent-searches-${blogSlug || 'global'}`);
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, [blogSlug]);

  useEffect(() => {
    const searchPosts = async () => {
      if (!query.trim() || query.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const allPosts = await sdk.get<Post>('posts');
        
        let postsToSearch = allPosts.filter(p => p.status === 'published');
        
        // If we have a specific blog, filter to that blog's posts
        if (blog) {
          postsToSearch = postsToSearch.filter(p => p.blogId === blog.id);
        }

        const searchResults: SearchResult[] = postsToSearch
          .map(post => {
            const titleMatch = post.title.toLowerCase().includes(query.toLowerCase());
            const contentMatch = post.content.toLowerCase().includes(query.toLowerCase());
            const excerptMatch = post.excerpt?.toLowerCase().includes(query.toLowerCase());
            const tagMatch = post.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
            const categoryMatch = post.categories?.some(cat => cat.toLowerCase().includes(query.toLowerCase()));

            let relevanceScore = 0;
            if (titleMatch) relevanceScore += 10;
            if (excerptMatch) relevanceScore += 5;
            if (contentMatch) relevanceScore += 3;
            if (tagMatch) relevanceScore += 2;
            if (categoryMatch) relevanceScore += 2;

            return {
              type: 'post' as const,
              post,
              relevanceScore
            };
          })
          .filter(result => result.relevanceScore > 0)
          .sort((a, b) => b.relevanceScore - a.relevanceScore)
          .slice(0, 10);

        setResults(searchResults);
        
        // Record search
        if (blog) {
          await sdk.insert('searches', {
            blogId: blog.id,
            query: query.trim(),
            results: searchResults.map(r => ({ id: r.post.id, title: r.post.title }))
          });
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchPosts, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, blog]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleResultClick(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleResultClick = (result: SearchResult) => {
    const { post } = result;
    
    // Add to recent searches
    const newRecentSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(newRecentSearches);
    localStorage.setItem(`recent-searches-${blogSlug || 'global'}`, JSON.stringify(newRecentSearches));

    // Navigate to post
    if (blogSlug) {
      navigate(`/${blogSlug}/${post.slug}`);
    } else {
      // For global search, we'd need to find the blog slug
      navigate(`/post/${post.id}`);
    }
    
    onClose();
    setQuery('');
    setSelectedIndex(-1);
  };

  const handleRecentSearchClick = (recentQuery: string) => {
    setQuery(recentQuery);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(`recent-searches-${blogSlug || 'global'}`);
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Search {blog ? blog.title : 'Posts'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="px-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              ref={inputRef}
              placeholder="Search for posts, topics, or keywords..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-10"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {!query && recentSearches.length > 0 && (
            <div className="p-6 pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Recent Searches
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearRecentSearches}
                  className="text-xs"
                >
                  Clear
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((recentQuery, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleRecentSearchClick(recentQuery)}
                  >
                    {recentQuery}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {query && (
            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-500 mt-2">Searching...</p>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-2 p-4">
                  {results.map((result, index) => (
                    <div
                      key={result.post.id}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        index === selectedIndex 
                          ? 'bg-blue-50 border border-blue-200' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {highlightText(result.post.title, query)}
                          </h4>
                          {result.post.excerpt && (
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {highlightText(result.post.excerpt, query)}
                            </p>
                          )}
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500">
                              {new Date(result.post.publishedAt || result.post.createdAt).toLocaleDateString()}
                            </span>
                            {result.post.tags && result.post.tags.length > 0 && (
                              <div className="flex space-x-1">
                                {result.post.tags.slice(0, 2).map((tag, tagIndex) => (
                                  <Badge key={tagIndex} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : query.length >= 2 ? (
                <div className="p-6 text-center">
                  <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No results found for "{query}"</p>
                  <p className="text-sm text-gray-400 mt-1">Try different keywords or check your spelling</p>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {query.length < 2 && query.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Type at least 2 characters to search
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;