
import React, { useState, useMemo, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Search, Calendar, Tag, FileText, Clock, X } from 'lucide-react';
import { Post } from '../../types/blog';
import { ThemeStyle } from '../../constants/themes';

interface EnhancedSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  posts: Post[];
  blogSlug: string;
  theme?: ThemeStyle;
}

export const EnhancedSearchModal: React.FC<EnhancedSearchModalProps> = ({
  open,
  onOpenChange,
  posts,
  blogSlug,
  theme
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Reset search when modal opens/closes
  useEffect(() => {
    if (!open) {
      setSearchQuery('');
      setSelectedTags([]);
    }
  }, [open]);

  // Get all unique tags from posts
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Filter posts based on search query and selected tags
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(query)) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post =>
        post.tags && selectedTags.every(tag => post.tags!.includes(tag))
      );
    }

    return filtered.sort((a, b) => 
      new Date(b.publishedAt || b.createdAt).getTime() - 
      new Date(a.publishedAt || a.createdAt).getTime()
    );
  }, [posts, searchQuery, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handlePostClick = (post: Post) => {
    window.location.href = `/${blogSlug}/${post.slug}`;
    onOpenChange(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    const textContent = content.replace(/<[^>]*>/g, '').replace(/[#*`]/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...' 
      : textContent;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Search Posts
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-4 flex-1 overflow-hidden">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search posts by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Filter by tags:</p>
              <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-blue-100"
                    onClick={() => handleTagToggle(tag)}
                    style={{
                      backgroundColor: selectedTags.includes(tag) 
                        ? theme?.styles.primaryColor 
                        : 'transparent',
                      borderColor: theme?.styles.primaryColor
                    }}
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                    {selectedTags.includes(tag) && (
                      <X className="w-3 h-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No posts found</p>
                <p className="text-sm">Try adjusting your search terms or tags</p>
              </div>
            ) : (
              filteredPosts.map(post => (
                <div
                  key={post.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => handlePostClick(post)}
                  style={{ borderColor: theme?.styles.primaryColor + '20' }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 
                      className="font-semibold text-lg group-hover:opacity-80 transition-opacity line-clamp-2"
                      style={{ color: theme?.styles.primaryColor }}
                    >
                      {post.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post.publishedAt || post.createdAt)}
                    </div>
                    {post.readingTime && (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readingTime} min read
                      </div>
                    )}
                  </div>

                  {post.excerpt ? (
                    <p className="text-gray-700 mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                  ) : (
                    <p className="text-gray-700 mb-3 line-clamp-2">
                      {truncateContent(post.content)}
                    </p>
                  )}

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{post.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Results Count */}
          {filteredPosts.length > 0 && (
            <div className="text-sm text-gray-500 text-center border-t pt-2">
              Showing {filteredPosts.length} of {posts.length} posts
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
