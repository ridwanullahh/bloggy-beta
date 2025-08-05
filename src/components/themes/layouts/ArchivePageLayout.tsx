import React, { useState } from 'react';
import { Blog, BlogTheme, Post } from '../../../types/blog';
import { UniversalPageLayout } from './UniversalPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { 
  Archive, 
  Calendar, 
  Search, 
  Filter, 
  Grid, 
  List,
  ArrowLeft,
  Tag,
  Clock,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ArchivePageLayoutProps {
  blog: Blog;
  theme: BlogTheme;
  posts: Post[];
  onPostClick: (post: Post) => void;
}

export const ArchivePageLayout: React.FC<ArchivePageLayoutProps> = ({
  blog,
  theme,
  posts,
  onPostClick
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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

  // Filter and group posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    const matchesYear = !selectedYear || 
                       new Date(post.publishedAt || post.createdAt).getFullYear().toString() === selectedYear;
    
    return matchesSearch && matchesCategory && matchesYear;
  });

  const groupedPosts = filteredPosts.reduce((groups, post) => {
    const date = new Date(post.publishedAt || post.createdAt);
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!groups[yearMonth]) {
      groups[yearMonth] = [];
    }
    groups[yearMonth].push(post);
    return groups;
  }, {} as Record<string, Post[]>);

  const categories = [...new Set(posts.map(post => post.category).filter(Boolean))];
  const years = [...new Set(posts.map(post => 
    new Date(post.publishedAt || post.createdAt).getFullYear().toString()
  ))].sort((a, b) => b.localeCompare(a));

  const ArchiveHeader = () => (
    <div className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/${blog.slug}`)}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {blog.title}
        </Button>

        <div className="flex items-center space-x-3 mb-6">
          <Archive className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-4xl font-bold">Archive</h1>
            <p className="text-gray-600 mt-2">
              Browse through all {posts.length} posts organized by date and category
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const PostCard = ({ post }: { post: Post }) => (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer h-full"
      onClick={() => onPostClick(post)}
    >
      {post.featuredImage && (
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {post.category || 'Uncategorized'}
          </Badge>
          <span className="text-xs text-gray-500">
            {formatDate(post.publishedAt || post.createdAt)}
          </span>
        </div>
        <CardTitle className="text-lg hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4 line-clamp-3">
          {post.excerpt || truncateContent(post.content)}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {post.views || 0}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {Math.ceil(post.content.split(' ').length / 200)} min
            </span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center">
              <Tag className="w-3 h-3 mr-1" />
              <span>{post.tags.length} tags</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const PostList = ({ post }: { post: Post }) => (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onPostClick(post)}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {post.category || 'Uncategorized'}
              </Badge>
              <span className="text-xs text-gray-500">
                {formatDate(post.publishedAt || post.createdAt)}
              </span>
            </div>
            <h3 className="text-xl font-semibold hover:text-blue-600 transition-colors mb-2">
              {post.title}
            </h3>
            <p className="text-gray-700 mb-3 line-clamp-2">
              {post.excerpt || truncateContent(post.content)}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {post.views || 0}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {Math.ceil(post.content.split(' ').length / 200)} min
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <UniversalPageLayout blog={blog} theme={theme} pageType="archive">
      <ArchiveHeader />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {Object.keys(groupedPosts).length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Archive className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedPosts)
              .sort(([a], [b]) => b.localeCompare(a))
              .map(([yearMonth, monthPosts]) => {
                const [year, month] = yearMonth.split('-');
                const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                });

                return (
                  <div key={yearMonth}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Calendar className="w-6 h-6 mr-2" />
                      {monthName}
                      <span className="ml-2 text-sm font-normal text-gray-500">
                        ({monthPosts.length} posts)
                      </span>
                    </h2>
                    
                    <div className={
                      viewMode === 'grid' 
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        : "space-y-4"
                    }>
                      {monthPosts.map((post) => 
                        viewMode === 'grid' ? (
                          <PostCard key={post.id} post={post} />
                        ) : (
                          <PostList key={post.id} post={post} />
                        )
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </UniversalPageLayout>
  );
};
