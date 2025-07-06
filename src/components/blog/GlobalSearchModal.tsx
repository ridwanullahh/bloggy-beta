
import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, Clock, Tag, Calendar, ArrowRight, Command } from 'lucide-react';
import { Post } from '../../types/blog';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';

interface GlobalSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  posts: Post[];
  blogSlug: string;
  theme?: any;
  isDarkMode?: boolean;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  open,
  onOpenChange,
  posts,
  blogSlug,
  theme,
  isDarkMode = false
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const saved = localStorage.getItem(`globalSearchHistory_${blogSlug}`);
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, [blogSlug]);

  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const filtered = posts.filter(post => {
      const searchLower = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.excerpt?.toLowerCase().includes(searchLower) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    });

    // Sort by relevance
    filtered.sort((a, b) => {
      const queryLower = searchQuery.toLowerCase();
      const aTitle = a.title.toLowerCase().includes(queryLower);
      const bTitle = b.title.toLowerCase().includes(queryLower);
      
      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setResults(filtered.slice(0, 10));
    setSelectedIndex(0);
  }, [posts]);

  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem(`globalSearchHistory_${blogSlug}`, JSON.stringify(updated));

    onOpenChange(false);
    setQuery('');
  };

  const handlePostClick = (post: Post) => {
    handleSearch(query);
    navigate(`/${blogSlug}/${post.slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handlePostClick(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      onOpenChange(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className={`px-1 rounded ${
          isDarkMode ? 'bg-yellow-600/50 text-yellow-200' : 'bg-yellow-200 text-yellow-900'
        }`}>
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={`max-w-2xl max-h-[85vh] overflow-hidden p-0 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
        }`}
        style={{ fontFamily: theme?.styles?.fontFamily }}
      >
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className={`flex items-center gap-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <Search className="w-5 h-5" style={{ color: theme?.styles?.primaryColor }} />
            Search Posts
          </DialogTitle>
        </DialogHeader>

        <div className="px-6">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <Input
              placeholder="Search for posts, topics, tags..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`pl-10 text-lg py-3 border-2 focus:ring-2 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' 
                  : 'bg-white border-gray-200 text-gray-900'
              }`}
              style={{ 
                borderColor: theme?.styles?.primaryColor,
                fontFamily: theme?.styles?.fontFamily
              }}
              autoFocus
            />
            <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-xs ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {query && results.length > 0 && (
            <div className="px-6 py-4">
              <h3 className={`text-sm font-semibold mb-3 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </h3>
              <div className="space-y-3">
                {results.map((post, index) => (
                  <div
                    key={post.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border ${
                      index === selectedIndex 
                        ? `border-blue-200 shadow-sm ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}` 
                        : `hover:border-gray-200 ${isDarkMode ? 'border-gray-600 hover:bg-gray-700 bg-gray-750' : 'border-gray-100 hover:bg-gray-50'}`
                    }`}
                    onClick={() => handlePostClick(post)}
                    style={{ borderRadius: theme?.styles?.borderRadius }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`font-semibold mb-1 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {highlightMatch(post.title, query)}
                        </h4>
                        {post.excerpt && (
                          <p className={`text-sm mb-2 line-clamp-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {highlightMatch(post.excerpt, query)}
                          </p>
                        )}
                        <div className={`flex items-center gap-4 text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.createdAt)}
                          </div>
                          {post.readingTime && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readingTime} min read
                            </div>
                          )}
                        </div>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex items-center gap-1 mt-2">
                            <Tag className={`w-3 h-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                            <div className="flex gap-1">
                              {post.tags.slice(0, 3).map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="outline" className={`text-xs ${
                                  isDarkMode ? 'border-gray-600 text-gray-300' : ''
                                }`}>
                                  {highlightMatch(tag, query)}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <ArrowRight className={`w-4 h-4 ml-4 flex-shrink-0 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-400'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="px-6 py-8 text-center">
              <Search className={`w-12 h-12 mx-auto mb-4 ${
                isDarkMode ? 'text-gray-500' : 'text-gray-300'
              }`} />
              <h3 className={`text-lg font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>No results found</h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                Try adjusting your search terms or browse recent posts.
              </p>
            </div>
          )}

          {!query && recentSearches.length > 0 && (
            <div className="px-6 py-4">
              <h3 className={`text-sm font-semibold mb-3 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Recent Searches</h3>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(search)}
                    className={`flex items-center gap-2 w-full text-left p-2 rounded-md transition-colors ${
                      isDarkMode 
                        ? 'hover:bg-gray-700 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Clock className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                    <span className="text-sm">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!query && recentSearches.length === 0 && (
            <div className="px-6 py-8 text-center">
              <Search className={`w-12 h-12 mx-auto mb-4 ${
                isDarkMode ? 'text-gray-500' : 'text-gray-300'
              }`} />
              <h3 className={`text-lg font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Start searching</h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                Find posts by title, content, or tags.
              </p>
            </div>
          )}
        </div>

        <div className={`px-6 py-4 border-t text-xs flex items-center gap-4 ${
          isDarkMode 
            ? 'border-gray-700 bg-gray-800 text-gray-400' 
            : 'border-gray-200 bg-gray-50 text-gray-500'
        }`}>
          <div className="flex items-center gap-2">
            <kbd className={`px-2 py-1 border rounded text-xs ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            }`}>↑</kbd>
            <kbd className={`px-2 py-1 border rounded text-xs ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            }`}>↓</kbd>
            <span>Navigate</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className={`px-2 py-1 border rounded text-xs ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            }`}>Enter</kbd>
            <span>Select</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className={`px-2 py-1 border rounded text-xs ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            }`}>Esc</kbd>
            <span>Close</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalSearchModal;
