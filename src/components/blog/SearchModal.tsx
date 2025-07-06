
import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, Calendar, FileText } from 'lucide-react';
import { Blog, Post } from '../../types/blog';
import { ThemeStyle } from '../../constants/themes';
import sdk from '../../lib/sdk-instance';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog: Blog;
  theme?: ThemeStyle;
  onPostSelect: (post: Post) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ 
  isOpen, 
  onClose, 
  blog, 
  theme, 
  onPostSelect 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch posts when modal opens
  React.useEffect(() => {
    if (isOpen && posts.length === 0) {
      const fetchPosts = async () => {
        try {
          const allPosts = await sdk.get<Post>('posts');
          const blogPosts = allPosts
            .filter(p => p.blogId === blog.id && p.status === 'published')
            .sort((a, b) => 
              new Date(b.publishedAt || b.createdAt).getTime() - 
              new Date(a.publishedAt || a.createdAt).getTime()
            );
          setPosts(blogPosts);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
      fetchPosts();
    }
  }, [isOpen, blog.id, posts.length]);

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts.slice(0, 10);
    
    const query = searchQuery.toLowerCase();
    return posts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(query))
    ).slice(0, 10);
  }, [posts, searchQuery]);

  const handlePostClick = (post: Post) => {
    onPostSelect(post);
    onClose();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Search Posts
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search for posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No posts found</p>
              </div>
            ) : (
              filteredPosts.map(post => (
                <div
                  key={post.id}
                  className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handlePostClick(post)}
                >
                  <h4 className="font-medium text-sm mb-1">{post.title}</h4>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(post.publishedAt || post.createdAt)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
