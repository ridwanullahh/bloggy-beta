import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import { Blog, Post, Comment } from '../types/blog';
import { getThemeById } from '../constants/themes';
import sdk from '../lib/sdk-instance';
import { Calendar, User, Tag, ArrowLeft, MessageCircle, Clock, Bookmark, Share2, Moon, Sun, Search } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import TableOfContents from '../components/blog/TableOfContents';
import { ReadingProgress } from '../components/blog/ReadingProgress';
import SocialShare from '../components/blog/SocialShare';
import RelatedPosts from '../components/blog/RelatedPosts';
import SearchModal from '../components/blog/SearchModal';

const PostView: React.FC = () => {
  const { blogSlug, postSlug } = useParams<{ blogSlug: string; postSlug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentForm, setCommentForm] = useState({
    authorName: '',
    authorEmail: '',
    content: ''
  });
  const [submittingComment, setSubmittingComment] = useState(false);

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
        setIsDarkMode(foundBlog.darkMode || false);

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

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark Removed" : "Post Bookmarked",
      description: isBookmarked ? "Post removed from bookmarks" : "Post saved to your bookmarks",
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleRelatedPostClick = (relatedPost: Post) => {
    navigate(`/${blogSlug}/${relatedPost.slug}`);
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
  const readingTime = post.readingTime || calculateReadingTime(post.content);
  const themeClasses = isDarkMode ? 'dark' : '';

  return (
    <div className={`min-h-screen ${themeClasses}`} style={{ 
      backgroundColor: isDarkMode ? '#111827' : theme?.styles.secondaryColor || '#F3F4F6',
      fontFamily: theme?.styles.fontFamily || 'Inter, sans-serif'
    }}>
      <ReadingProgress theme={theme} />
      
      {/* Header */}
      <div className="bg-white border-b" style={{ 
        backgroundColor: isDarkMode ? '#1F2937' : theme?.styles.primaryColor || '#1F2937',
        color: 'white'
      }}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate(`/${blogSlug}`)}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {blog.title}
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="text-white hover:bg-white/10"
              >
                <Search className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="text-white hover:bg-white/10"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleBookmark}
                className={`text-white hover:bg-white/10 ${isBookmarked ? 'text-yellow-300' : ''}`}
              >
                <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
              </Button>
              <SocialShare
                url={window.location.href}
                title={post.title}
                description={post.excerpt}
                theme={theme}
              />
            </div>
          </div>
          
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
            
            <div className="flex flex-wrap items-center space-x-6 text-sm opacity-90 mb-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(post.publishedAt || post.createdAt)}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {readingTime} min read
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4" />
                  <div className="flex space-x-1">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-white/20 text-white">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {post.excerpt && (
              <p className="text-xl opacity-90 leading-relaxed">{post.excerpt}</p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <TableOfContents content={post.content} theme={theme} />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="mb-8" style={{ 
              backgroundColor: isDarkMode ? '#1F2937' : 'white',
              color: isDarkMode ? 'white' : 'inherit',
              borderRadius: theme?.styles.borderRadius
            }}>
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none" style={{ 
                  color: isDarkMode ? 'white' : 'inherit',
                  fontFamily: theme?.styles.fontFamily 
                }}>
                  <MDEditor.Markdown 
                    source={post.content} 
                    data-color-mode={isDarkMode ? 'dark' : 'light'}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Related Posts */}
            {blog.settings?.enableRelatedPosts && (
              <RelatedPosts
                currentPost={post}
                blog={blog}
                theme={theme}
                onPostClick={handleRelatedPostClick}
              />
            )}

            {/* Comments Section */}
            {blog.settings?.allowComments && (
              <Card className="mt-8" style={{ 
                backgroundColor: isDarkMode ? '#1F2937' : 'white',
                color: isDarkMode ? 'white' : 'inherit',
                borderRadius: theme?.styles.borderRadius
              }}>
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
                        style={{ 
                          backgroundColor: isDarkMode ? '#374151' : 'white',
                          color: isDarkMode ? 'white' : 'inherit',
                          borderColor: theme?.styles.primaryColor + '40'
                        }}
                      />
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={commentForm.authorEmail}
                        onChange={(e) => setCommentForm(prev => ({ ...prev, authorEmail: e.target.value }))}
                        required
                        style={{ 
                          backgroundColor: isDarkMode ? '#374151' : 'white',
                          color: isDarkMode ? 'white' : 'inherit',
                          borderColor: theme?.styles.primaryColor + '40'
                        }}
                      />
                    </div>
                    <Textarea
                      placeholder="Write your comment..."
                      value={commentForm.content}
                      onChange={(e) => setCommentForm(prev => ({ ...prev, content: e.target.value }))}
                      rows={4}
                      required
                      style={{ 
                        backgroundColor: isDarkMode ? '#374151' : 'white',
                        color: isDarkMode ? 'white' : 'inherit',
                        borderColor: theme?.styles.primaryColor + '40'
                      }}
                    />
                    <Button 
                      type="submit" 
                      disabled={submittingComment}
                      style={{ 
                        backgroundColor: theme?.styles.primaryColor,
                        borderRadius: theme?.styles.borderRadius
                      }}
                    >
                      {submittingComment ? 'Submitting...' : 'Submit Comment'}
                    </Button>
                  </form>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {comments.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
                    ) : (
                      comments.map((comment) => (
                        <div key={comment.id} className="border-l-4 pl-4" style={{ borderColor: theme?.styles.primaryColor }}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{comment.authorName}</h4>
                            <span className="text-sm text-gray-500">
                              {formatDate(comment.createdAt)}
                            </span>
                          </div>
                          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{comment.content}</p>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        blog={blog}
        theme={theme}
        onPostSelect={handleRelatedPostClick}
      />
    </div>
  );
};

export default PostView;
