import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { Blog, Post, Category, Tag } from '../types/blog';
import { getThemeById } from '../constants/themes';
import { UniversalPageThemeWrapper } from '../components/themes/UniversalPageThemeWrapper';
import sdk from '../lib/sdk-instance';
import { 
  Calendar, 
  User, 
  Tag as TagIcon, 
  Search,
  Filter,
  ArrowLeft,
  Clock,
  TrendingUp,
  Archive
} from 'lucide-react';

const BlogArchive: React.FC = () => {
  const { blogSlug } = useParams<{ blogSlug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    const fetchArchiveData = async () => {
      if (!blogSlug) return;

      try {
        const [allBlogs, allPosts, allCategories, allTags] = await Promise.all([
          sdk.get<Blog>('blogs'),
          sdk.get<Post>('posts'),
          sdk.get<Category>('categories'),
          sdk.get<Tag>('tags')
        ]);

        const foundBlog = allBlogs.find(b => b.slug === blogSlug && b.status === 'active');
        
        if (!foundBlog) {
          setBlog(null);
          setLoading(false);
          return;
        }

        setBlog(foundBlog);

        const blogPosts = allPosts
          .filter(p => p.blogId === foundBlog.id && p.status === 'published')
          .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
        
        const blogCategories = allCategories.filter(c => c.blogId === foundBlog.id);
        const blogTags = allTags.filter(t => t.blogId === foundBlog.id);

        setPosts(blogPosts);
        setCategories(blogCategories);
        setTags(blogTags);
      } catch (error) {
        console.error('Error fetching archive data:', error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArchiveData();
  }, [blogSlug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    const textContent = content.replace(/<[^>]*>/g, '').replace(/[#*`]/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...' 
      : textContent;
  };

  const handlePostClick = (post: Post) => {
    navigate(`/${blogSlug}/${post.slug}`);
  };

  // Filter and sort posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           (post.categories && post.categories.includes(selectedCategory));
    
    const matchesTag = selectedTag === 'all' || 
                      (post.tags && post.tags.includes(selectedTag));

    return matchesSearch && matchesCategory && matchesTag;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.publishedAt || a.createdAt).getTime() - new Date(b.publishedAt || b.createdAt).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'newest':
      default:
        return new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime();
    }
  });

  // Group posts by year and month
  const groupedPosts = filteredPosts.reduce((groups, post) => {
    const date = new Date(post.publishedAt || post.createdAt);
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!groups[yearMonth]) {
      groups[yearMonth] = [];
    }
    groups[yearMonth].push(post);
    return groups;
  }, {} as Record<string, Post[]>);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Blog not found</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  const theme = getThemeById(blog.theme);

  return (
    <UniversalPageThemeWrapper blogSlug={blogSlug!} pageType="archive">
      <div className="min-h-screen" style={{
        backgroundColor: theme?.styles.secondaryColor || '#F3F4F6',
        fontFamily: theme?.styles.fontFamily || 'Inter, sans-serif'
      }}>
      {/* Header */}
      <div className="bg-white border-b" style={{ 
        backgroundColor: theme?.styles.primaryColor || '#1F2937',
        color: 'white'
      }}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/${blogSlug}`)}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {blog.title}
          </Button>
          <div className="flex items-center space-x-3 mb-4">
            <Archive className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Archive</h1>
          </div>
          <p className="text-white/90 text-lg">Browse all posts from {blog.title}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger>
                  <SelectValue placeholder="All Tags" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {tags.map((tag) => (
                    <SelectItem key={tag.id} value={tag.slug}>
                      {tag.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="title">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Archive className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold">{filteredPosts.length}</h3>
                  <p className="text-gray-600">Total Posts</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TagIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold">{tags.length}</h3>
                  <p className="text-gray-600">Tags</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold">{categories.length}</h3>
                  <p className="text-gray-600">Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Posts by Month */}
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
                const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                
                return (
                  <div key={yearMonth}>
                    <div className="flex items-center space-x-3 mb-6">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <h2 className="text-2xl font-bold text-gray-900">{monthName}</h2>
                      <Badge variant="outline">{monthPosts.length} posts</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {monthPosts.map((post) => (
                        <Card 
                          key={post.id} 
                          className="hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() => handlePostClick(post)}
                        >
                          <CardHeader>
                            <CardTitle className="text-lg hover:text-blue-600">
                              {post.title}
                            </CardTitle>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(post.publishedAt || post.createdAt)}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            {post.excerpt ? (
                              <p className="text-gray-700 mb-4">{post.excerpt}</p>
                            ) : (
                              <p className="text-gray-700 mb-4">
                                {truncateContent(post.content)}
                              </p>
                            )}
                            
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {post.tags.slice(0, 3).map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {post.tags.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{post.tags.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
    </UniversalPageThemeWrapper>
  );
};

export default BlogArchive;