import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { useToast } from '../hooks/use-toast';
import { useBlogSubscriberAuth } from '../contexts/BlogSubscriberAuthContext';
import { Blog, Post, Bookmark, Note } from '../types/blog';
import sdk from '../lib/sdk-instance';
import { 
  BookmarkIcon, 
  StickyNote, 
  Settings, 
  User,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  Calendar,
  Tag,
  LogOut,
  ArrowLeft,
  Mail,
  Bell,
  BookOpen
} from 'lucide-react';

const BlogSubscriberDashboard: React.FC = () => {
  const { blogSlug } = useParams<{ blogSlug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { subscriber, logout, updatePreferences, setBlogId } = useBlogSubscriberAuth();
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [newNote, setNewNote] = useState({ content: '', tags: '', isPrivate: true });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    newPosts: true,
    newsletter: true,
    categories: [] as string[]
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!blogSlug) return;

      try {
        const blogs = await sdk.get<Blog>('blogs');
        const foundBlog = blogs.find(b => b.slug === blogSlug);
        
        if (!foundBlog) {
          navigate('/not-found');
          return;
        }

        setBlog(foundBlog);
        setBlogId(foundBlog.id);

        if (subscriber) {
          // Set preferences from subscriber data
          setPreferences(subscriber.preferences);

          // Fetch user-specific data
          const [bookmarksData, notesData] = await Promise.all([
            sdk.get<Bookmark>('bookmarks'),
            sdk.get<Note>('notes')
          ]);

          const userBookmarks = bookmarksData.filter(b => 
            b.userId === subscriber.id && b.blogId === foundBlog.id
          );
          const userNotes = notesData.filter(n => 
            n.userId === subscriber.id && 
            (n.blogId === foundBlog.id || !n.blogId)
          );

          setBookmarks(userBookmarks);
          setNotes(userNotes);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [blogSlug, subscriber, setBlogId, navigate, toast]);

  useEffect(() => {
    // Redirect to auth if not logged in
    if (!loading && !subscriber) {
      navigate(`/${blogSlug}/auth`);
    }
  }, [subscriber, loading, blogSlug, navigate]);

  const handleLogout = () => {
    logout();
    navigate(`/${blogSlug}`);
  };

  const handleRemoveBookmark = async (bookmarkId: string) => {
    try {
      await sdk.delete('bookmarks', bookmarkId);
      setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
      toast({
        title: "Bookmark removed",
        description: "The bookmark has been removed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove bookmark",
        variant: "destructive",
      });
    }
  };

  const handleCreateNote = async () => {
    if (!newNote.content.trim() || !subscriber || !blog) return;

    try {
      const noteData = {
        userId: subscriber.id,
        postId: '', // General note not tied to specific post
        blogId: blog.id,
        content: newNote.content,
        isPrivate: newNote.isPrivate,
        tags: newNote.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };

      const createdNote = await sdk.insert<Note>('notes', noteData);
      setNotes(prev => [createdNote, ...prev]);
      setNewNote({ content: '', tags: '', isPrivate: true });
      
      toast({
        title: "Note created",
        description: "Your note has been saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create note",
        variant: "destructive",
      });
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await sdk.delete('notes', noteId);
      setNotes(prev => prev.filter(n => n.id !== noteId));
      toast({
        title: "Note deleted",
        description: "The note has been deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      });
    }
  };

  const handleUpdatePreferences = async () => {
    try {
      await updatePreferences(preferences);
      toast({
        title: "Preferences updated",
        description: "Your subscription preferences have been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update preferences",
        variant: "destructive",
      });
    }
  };

  const filteredBookmarks = bookmarks.filter(bookmark =>
    bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (bookmark.excerpt && bookmark.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!subscriber || !blog) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate(`/${blog.slug}`)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to {blog.title}
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Subscriber Dashboard
                </h1>
                <p className="text-sm text-gray-600">{subscriber.email}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search bookmarks and notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="bookmarks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookmarks" className="flex items-center space-x-2">
              <BookmarkIcon className="w-4 h-4" />
              <span>Bookmarks</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center space-x-2">
              <StickyNote className="w-4 h-4" />
              <span>Notes</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Preferences</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookmarks">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookmarkIcon className="w-5 h-5" />
                  <span>Your Bookmarks</span>
                </CardTitle>
                <CardDescription>
                  Posts you've saved for later reading
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredBookmarks.length === 0 ? (
                  <div className="text-center py-8">
                    <BookmarkIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No bookmarks found</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Start reading posts to bookmark them for later
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredBookmarks.map((bookmark) => (
                      <div key={bookmark.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{bookmark.title}</h3>
                            {bookmark.excerpt && (
                              <p className="text-sm text-gray-600 mt-1">{bookmark.excerpt}</p>
                            )}
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(bookmark.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(bookmark.url, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveBookmark(bookmark.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Note</CardTitle>
                  <CardDescription>
                    Add a personal note or observation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="note-content">Content</Label>
                    <textarea
                      id="note-content"
                      className="w-full mt-1 p-2 border rounded-md resize-none"
                      rows={3}
                      placeholder="Write your note here..."
                      value={newNote.content}
                      onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="note-tags">Tags (comma-separated)</Label>
                    <Input
                      id="note-tags"
                      placeholder="tag1, tag2, tag3"
                      value={newNote.tags}
                      onChange={(e) => setNewNote(prev => ({ ...prev, tags: e.target.value }))}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="note-private"
                      checked={newNote.isPrivate}
                      onCheckedChange={(checked) => 
                        setNewNote(prev => ({ ...prev, isPrivate: !!checked }))
                      }
                    />
                    <Label htmlFor="note-private">Private note</Label>
                  </div>
                  <Button onClick={handleCreateNote} disabled={!newNote.content.trim()}>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Create Note
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <StickyNote className="w-5 h-5" />
                    <span>Your Notes</span>
                  </CardTitle>
                  <CardDescription>
                    Personal notes and observations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredNotes.length === 0 ? (
                    <div className="text-center py-8">
                      <StickyNote className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No notes found</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Create your first note above
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredNotes.map((note) => (
                        <div key={note.id} className="border rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-gray-900">{note.content}</p>
                              {note.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {note.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      <Tag className="w-3 h-3 mr-1" />
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                <span className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {new Date(note.createdAt).toLocaleDateString()}
                                </span>
                                {note.isPrivate && (
                                  <Badge variant="outline" className="text-xs">Private</Badge>
                                )}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteNote(note.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Subscription Preferences</span>
                </CardTitle>
                <CardDescription>
                  Manage your notification and subscription settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email-notifications"
                      checked={preferences.emailNotifications}
                      onCheckedChange={(checked) =>
                        setPreferences(prev => ({ ...prev, emailNotifications: !!checked }))
                      }
                    />
                    <Label htmlFor="email-notifications" className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email notifications
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="new-posts"
                      checked={preferences.newPosts}
                      onCheckedChange={(checked) =>
                        setPreferences(prev => ({ ...prev, newPosts: !!checked }))
                      }
                    />
                    <Label htmlFor="new-posts" className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      New post notifications
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newsletter"
                      checked={preferences.newsletter}
                      onCheckedChange={(checked) =>
                        setPreferences(prev => ({ ...prev, newsletter: !!checked }))
                      }
                    />
                    <Label htmlFor="newsletter" className="flex items-center">
                      <Bell className="w-4 h-4 mr-2" />
                      Newsletter subscription
                    </Label>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Subscription Status</p>
                      <p className="text-sm text-gray-600">
                        Current tier: {subscriber.subscriptionTier}
                      </p>
                    </div>
                    <Badge variant={subscriber.status === 'active' ? 'default' : 'secondary'}>
                      {subscriber.status}
                    </Badge>
                  </div>
                </div>

                <Button onClick={handleUpdatePreferences}>
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BlogSubscriberDashboard;