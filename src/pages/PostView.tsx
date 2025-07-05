
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import { Blog, Post, Comment } from '../types/blog';
import { getThemeById } from '../constants/themes';
import sdk from '../lib/sdk-instance';
import { Calendar, User, Tag, ArrowLeft, MessageCircle } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

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
    <div className="min-h-screen bg-gray-50" style={{ 
      backgroundColor: theme?.styles.secondaryColor || '#F3F4F6',
      fontFamily: theme?.styles.fontFamily || 'Inter, sans-serif'
    }}>
      {/* Header */}
      <div className="bg-white border-b" style={{ 
        backgroundColor: theme?.styles.primaryColor || '#1F2937',
        color: 'white'
      }}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/${blogSlug}`)}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {blog.title}
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{post.title}</h1>
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
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              <MDEditor.Markdown source={post.content} />
            </div>
          </CardContent>
        </Card>

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
  );
};

export default PostView;
