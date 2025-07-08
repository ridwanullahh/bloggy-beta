import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { Bookmark, Note, UserPreferences } from '../types/blog';
import sdk from '../lib/sdk-instance';
import { 
  BookmarkIcon, 
  StickyNote, 
  Settings, 
  Wallet, 
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  Calendar,
  Tag
} from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [newNote, setNewNote] = useState({ content: '', tags: '', isPrivate: true });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const [bookmarksData, notesData, preferencesData] = await Promise.all([
          sdk.get<Bookmark>('bookmarks'),
          sdk.get<Note>('notes'),
          sdk.get<UserPreferences>('userPreferences')
        ]);

        const userBookmarks = bookmarksData.filter(b => b.userId === user.id);
        const userNotes = notesData.filter(n => n.userId === user.id);
        const userPrefs = preferencesData.find(p => p.userId === user.id);

        setBookmarks(userBookmarks);
        setNotes(userNotes);
        setPreferences(userPrefs || null);

        // Create default preferences if none exist
        if (!userPrefs) {
          const defaultPrefs = await sdk.insert<UserPreferences>('userPreferences', {
            userId: user.id!
          });
          setPreferences(defaultPrefs);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: "Error",
          description: "Failed to load your dashboard data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, toast]);

  const handleRemoveBookmark = async (bookmarkId: string) => {
    try {
      await sdk.delete('bookmarks', bookmarkId);
      setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
      toast({
        title: "Success",
        description: "Bookmark removed successfully.",
      });
    } catch (error) {
      console.error('Error removing bookmark:', error);
      toast({
        title: "Error",
        description: "Failed to remove bookmark.",
        variant: "destructive",
      });
    }
  };

  const handleCreateNote = async () => {
    if (!user || !newNote.content.trim()) return;

    try {
      const noteData = {
        userId: user.id!,
        postId: 'general',
        content: newNote.content,
        isPrivate: newNote.isPrivate,
        tags: newNote.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };

      const createdNote = await sdk.insert<Note>('notes', noteData);
      setNotes(prev => [createdNote, ...prev]);
      setNewNote({ content: '', tags: '', isPrivate: true });
      
      toast({
        title: "Success",
        description: "Note created successfully.",
      });
    } catch (error) {
      console.error('Error creating note:', error);
      toast({
        title: "Error",
        description: "Failed to create note.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await sdk.delete('notes', noteId);
      setNotes(prev => prev.filter(n => n.id !== noteId));
      toast({
        title: "Success",
        description: "Note deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting note:', error);
      toast({
        title: "Error",
        description: "Failed to delete note.",
        variant: "destructive",
      });
    }
  };

  const filteredBookmarks = bookmarks.filter(bookmark =>
    bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bookmark.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your bookmarks, notes, and preferences</p>
        </div>

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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookmarks" className="flex items-center">
              <BookmarkIcon className="w-4 h-4 mr-2" />
              Bookmarks ({bookmarks.length})
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center">
              <StickyNote className="w-4 h-4 mr-2" />
              Notes ({notes.length})
            </TabsTrigger>
            <TabsTrigger value="wallet" className="flex items-center">
              <Wallet className="w-4 h-4 mr-2" />
              Wallet
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Preferences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookmarks" className="space-y-6">
            {filteredBookmarks.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <BookmarkIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks yet</h3>
                  <p className="text-gray-500">Start bookmarking posts you want to read later</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBookmarks.map((bookmark) => (
                  <Card key={bookmark.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{bookmark.title}</CardTitle>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(bookmark.url, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemoveBookmark(bookmark.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {bookmark.excerpt && (
                        <p className="text-gray-600 mb-3">{bookmark.excerpt}</p>
                      )}
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(bookmark.createdAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Note</CardTitle>
                <CardDescription>Add a personal note or thought</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Write your note here..."
                  value={newNote.content}
                  onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                  rows={3}
                />
                <Input
                  placeholder="Tags (comma separated)"
                  value={newNote.tags}
                  onChange={(e) => setNewNote(prev => ({ ...prev, tags: e.target.value }))}
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newNote.isPrivate}
                      onChange={(e) => setNewNote(prev => ({ ...prev, isPrivate: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-sm">Private note</span>
                  </label>
                  <Button onClick={handleCreateNote} disabled={!newNote.content.trim()}>
                    Create Note
                  </Button>
                </div>
              </CardContent>
            </Card>

            {filteredNotes.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <StickyNote className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
                  <p className="text-gray-500">Create your first note to get started</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map((note) => (
                  <Card key={note.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <StickyNote className="w-4 h-4 text-blue-500" />
                          {note.isPrivate && (
                            <Badge variant="secondary" className="text-xs">Private</Badge>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              // Edit functionality would go here
                              console.log('Edit note:', note.id);
                            }}
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteNote(note.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-800 mb-3">{note.content}</p>
                      {note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {note.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="text-sm text-gray-500">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="wallet" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Wallet</CardTitle>
                <CardDescription>Manage your payments and subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Wallet Coming Soon</h3>
                  <p className="text-gray-500">Payment and subscription management features will be available soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Preferences</CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Preferences Coming Soon</h3>
                  <p className="text-gray-500">Customization options will be available soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;