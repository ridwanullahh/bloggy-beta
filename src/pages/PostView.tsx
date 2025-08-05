
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import { Blog, Post, Comment } from '../types/blog';
import { getThemeById } from '../constants/themes';
import sdk from '../lib/sdk-instance';
import { Calendar, User, Tag, ArrowLeft, MessageCircle, Share2, Twitter, Facebook, Linkedin, Link, BookmarkPlus, Bookmark, Moon, Sun, Search, List } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { SearchModal } from '../components/blog/SearchModal';
import { MobileNavigation } from '../components/blog/MobileNavigation';
import { Separator } from '../components/ui/separator';
import { ScrollArea } from '../components/ui/scroll-area';
import { UniversalThemeWrapper } from '../components/themes/UniversalThemeWrapper';

const PostView: React.FC = () => {
  const { blogSlug, postSlug } = useParams<{ blogSlug: string; postSlug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState({
    authorName: '',
    authorEmail: '',
    content: ''
  });
  const [submittingComment, setSubmittingComment] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showToc, setShowToc] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!blogSlug || !postSlug) return;

      try {
        const allBlogs = await sdk.get<Blog>('blogs');
        const foundBlog = allBlogs.find(b => b.slug === blogSlug && b.status === 'active');
        
        if (!foundBlog) {
          setBlog(null);
          setLoading(false);
          return;
        }

        setBlog(foundBlog);

        const allPosts = await sdk.get<Post>('posts');
        const foundPost = allPosts.find(p => p.slug === postSlug && p.blogId === foundBlog.id && p.status === 'published');
        
        if (!foundPost) {
          setPost(null);
          setLoading(false);
          return;
        }

        setPost(foundPost);

        const allComments = await sdk.get<Comment>('comments');
        const postComments = allComments
          .filter(c => c.postId === foundPost.id && c.status === 'approved')
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
        setComments(postComments);
      } catch (error) {
        console.error('Error fetching post data:', error);
        setBlog(null);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [blogSlug, postSlug]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !commentForm.authorName || !commentForm.authorEmail || !commentForm.content) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(commentForm.authorEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setSubmittingComment(true);
    try {
      await sdk.insert<Comment>('comments', {
        postId: post.id,
        authorName: commentForm.authorName,
        authorEmail: commentForm.authorEmail,
        content: commentForm.content,
        status: 'pending'
      });

      toast({
        title: "Comment Submitted",
        description: "Your comment has been submitted for review.",
      });
      setCommentForm({ authorName: '', authorEmail: '', content: '' });
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast({
        title: "Error",
        description: "Failed to submit comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmittingComment(false);
    }
  };

  // Table of contents generation
  const tableOfContents = useMemo(() => {
    if (!post?.content) return [];
    
    const headings = post.content.match(/^#{1,6}\s+.+$/gm) || [];
    return headings.map((heading, index) => {
      const level = heading.match(/^#+/)?.[0].length || 1;
      const text = heading.replace(/^#+\s+/, '');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return { id, text, level, index };
    });
  }, [post?.content]);

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = post?.title || '';
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      copy: url
    };

    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link Copied",
          description: "Post link copied to clipboard.",
        });
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    } else {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
    }
  };

  const handleBookmark = async () => {
    if (!post || !blog) return;
    
    try {
      if (isBookmarked) {
        // Remove bookmark logic would go here
        setIsBookmarked(false);
        toast({
          title: "Bookmark Removed",
          description: "Post removed from bookmarks.",
        });
      } else {
        // Add bookmark logic would go here
        setIsBookmarked(true);
        toast({
          title: "Bookmarked",
          description: "Post added to bookmarks.",
        });
      }
    } catch (error) {
      console.error('Bookmark error:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Post not found</p>
          <Button onClick={() => navigate(`/${blogSlug}`)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const theme = getThemeById(blog.theme);

  return (
    <UniversalThemeWrapper blog={blog} theme={theme!} pageType="post" isDarkMode={isDarkMode}>
      <div className="min-h-screen bg-gray-50" style={{
        backgroundColor: theme?.styles.secondaryColor || '#F3F4F6',
        fontFamily: theme?.styles.fontFamily || 'Inter, sans-serif'
      }}>
      {/* Enhanced Navigation Header */}
      <nav className="bg-white border-b sticky top-0 z-50" style={{ 
        backgroundColor: theme?.styles.primaryColor || '#1F2937',
      }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate(`/${blogSlug}`)}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to {blog.title}
              </Button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => setShowToc(!showToc)}
                className="text-white hover:bg-white/10"
              >
                <List className="w-4 h-4 mr-1" />
                ToC
              </Button>
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => setSearchModalOpen(true)}
                className="text-white hover:bg-white/10"
              >
                <Search className="w-4 h-4 mr-1" />
                Search
              </Button>
              <Button 
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className="text-white hover:bg-white/10"
              >
                {isBookmarked ? <Bookmark className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
              </Button>
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="text-white hover:bg-white/10"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>

            {/* Mobile Navigation Component */}
            <MobileNavigation
              blog={blog}
              blogSlug={blogSlug}
              onSearch={() => setSearchModalOpen(true)}
              onThemeToggle={() => setIsDarkMode(!isDarkMode)}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </nav>

      {/* Post Header */}
      <div className="bg-white border-b" style={{ 
        backgroundColor: theme?.styles.primaryColor || '#1F2937',
        color: 'white'
      }}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm opacity-90">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(post.publishedAt || post.createdAt)}
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center space-x-1">
                  <Tag className="w-4 h-4" />
                  <div className="flex space-x-1">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Share Buttons */}
            <div className="flex items-center space-x-2">
              <span className="text-sm opacity-75 mr-2">Share:</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleShare('twitter')}
                className="text-white hover:bg-white/10"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleShare('facebook')}
                className="text-white hover:bg-white/10"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleShare('linkedin')}
                className="text-white hover:bg-white/10"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleShare('copy')}
                className="text-white hover:bg-white/10"
              >
                <Link className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        blog={blog}
        blogSlug={blogSlug || ''}
      />

      {/* Content with ToC */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Table of Contents Sidebar */}
          {showToc && tableOfContents.length > 0 && (
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center">
                      <List className="w-4 h-4 mr-2" />
                      Table of Contents
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ScrollArea className="h-96">
                      <nav className="space-y-1">
                        {tableOfContents.map((item) => (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`block text-sm py-1 px-2 rounded transition-colors hover:bg-gray-100 ${
                              item.level > 1 ? `ml-${(item.level - 1) * 3}` : ''
                            }`}
                            style={{ marginLeft: item.level > 1 ? `${(item.level - 1) * 12}px` : '0' }}
                          >
                            {item.text}
                          </a>
                        ))}
                      </nav>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <MDEditor.Markdown source={post.content} />
                </div>
              </CardContent>
            </Card>

            {/* Mobile ToC */}
            {showToc && tableOfContents.length > 0 && (
              <Card className="lg:hidden mb-8">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center">
                    <List className="w-4 h-4 mr-2" />
                    Table of Contents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-1">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-sm py-1 px-2 rounded transition-colors hover:bg-gray-100 ${
                          item.level > 1 ? `ml-${(item.level - 1) * 3}` : ''
                        }`}
                        style={{ marginLeft: item.level > 1 ? `${(item.level - 1) * 12}px` : '0' }}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Comments Section */}
        {blog.settings?.allowComments && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Comments ({comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    value={commentForm.authorName}
                    onChange={(e) => setCommentForm(prev => ({ ...prev, authorName: e.target.value }))}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={commentForm.authorEmail}
                    onChange={(e) => setCommentForm(prev => ({ ...prev, authorEmail: e.target.value }))}
                    required
                  />
                </div>
                <Textarea
                  placeholder="Write your comment..."
                  value={commentForm.content}
                  onChange={(e) => setCommentForm(prev => ({ ...prev, content: e.target.value }))}
                  rows={4}
                  required
                />
                <Button type="submit" disabled={submittingComment}>
                  {submittingComment ? 'Submitting...' : 'Submit Comment'}
                </Button>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{comment.authorName}</h4>
                        <span className="text-sm text-gray-500">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
    </UniversalThemeWrapper>
  );
};

export default PostView;
