
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { QueryClient } from '@tanstack/react-query';
import { Toaster } from './components/ui/sonner';

// Import all pages
import Index from './pages/Index';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import CreateBlog from './pages/CreateBlog';
import BlogManagement from './pages/BlogManagement';
import BlogSettings from './pages/BlogSettings';
import PostEditor from './pages/PostEditor';
import BlogView from './pages/BlogView';
import PostView from './pages/PostView';
import BlogAbout from './pages/BlogAbout';
import BlogContact from './pages/BlogContact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <AuthProvider>
        <QueryClient>
          <div className="min-h-screen bg-gray-50">
            <Toaster />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-blog" element={<CreateBlog />} />
              <Route path="/blog/:slug/manage" element={<BlogManagement />} />
              <Route path="/blog/:slug/settings" element={<BlogSettings />} />
              <Route path="/blog/:slug/post/new" element={<PostEditor />} />
              <Route path="/blog/:slug/post/:postId/edit" element={<PostEditor />} />
              <Route path="/:slug" element={<BlogView />} />
              <Route path="/:blogSlug/:postSlug" element={<PostView />} />
              <Route path="/:slug/about" element={<BlogAbout />} />
              <Route path="/:slug/contact" element={<BlogContact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </QueryClient>
      </AuthProvider>
    </Router>
  );
}

export default App;
