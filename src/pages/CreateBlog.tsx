import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { Blog } from '../types/blog';
import { themes } from '../constants/themes';
import sdk from '../lib/sdk-instance';

const CreateBlog: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    title: '',
    slug: ''
  });

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    theme: 'modern-minimal'
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const validateForm = () => {
    let isValid = true;
    const errors: { title: string; slug: string } = { title: '', slug: '' };

    if (!formData.title.trim()) {
      errors.title = 'Blog title is required';
      isValid = false;
    }

    if (!formData.slug.trim()) {
      errors.slug = 'Blog URL is required';
      isValid = false;
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      errors.slug = 'Only lowercase letters, numbers, and hyphens allowed';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!user) return;

    setLoading(true);
    try {
      const blogData = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        ownerId: user.id,
        theme: formData.theme,
        status: 'active' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const newBlog = await sdk.insert<Blog>('blogs', blogData);
      
      toast({
        title: "Success",
        description: "Blog created successfully!",
      });
      
      navigate(`/blog/${newBlog.slug}/manage`);
    } catch (error) {
      console.error('Error creating blog:', error);
      toast({
        title: "Error",
        description: "Failed to create blog. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Blog</h1>
          <p className="text-gray-600">Start sharing your thoughts with the world</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Blog Details</CardTitle>
            <CardDescription>
              Fill in the basic information for your new blog
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Blog Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    title: e.target.value,
                    slug: generateSlug(e.target.value)
                  }))}
                  placeholder="My Awesome Blog"
                  required
                />
                {formErrors.title && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
                )}
              </div>

              <div>
                <Label htmlFor="slug">Blog URL *</Label>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">yourdomain.com/</span>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="my-awesome-blog"
                    pattern="[a-z0-9-]+"
                    title="Only lowercase letters, numbers, and hyphens allowed"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  This will be your blog's URL. Only lowercase letters, numbers, and hyphens allowed.
                </p>
                {formErrors.slug && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.slug}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="A brief description of what your blog is about..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="theme">Choose a Theme</Label>
                <Select value={formData.theme} onValueChange={(value) => setFormData(prev => ({ ...prev, theme: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {themes.map((theme) => (
                      <SelectItem key={theme.id} value={theme.id}>
                        <div>
                          <div className="font-medium">{theme.name}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Blog'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CreateBlog;
