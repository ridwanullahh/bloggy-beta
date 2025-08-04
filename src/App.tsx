import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { BlogSubscriberAuthProvider } from "./contexts/BlogSubscriberAuthContext";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Auth from "./pages/Auth";
import UltraModernDashboard from "./pages/UltraModernDashboard";
import CreateBlog from "./pages/CreateBlog";
import BlogManagement from "./pages/BlogManagement";
import PostEditor from "./pages/PostEditor";
import NotFound from "./pages/NotFound";
import BlogView from "./pages/BlogView";
import PostView from "./pages/PostView";
import BlogAbout from "./pages/BlogAbout";
import BlogContact from "./pages/BlogContact";
import BlogSettings from "./pages/BlogSettings";
import UserDashboard from "./pages/UserDashboard";
import BlogAuth from "./pages/BlogAuth";
import BlogSubscriberDashboard from "./pages/BlogSubscriberDashboard";
import BlogArchive from "./pages/BlogArchive";
import PageManager from "./pages/PageManager";
import SocialMediaManager from "./pages/SocialMediaManager";
import EmailMarketingManager from "./pages/EmailMarketingManager";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

// Public Route Component (redirects to dashboard if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={
        <PublicRoute>
          <Index />
        </PublicRoute>
      } />
      <Route path="/features" element={
        <PublicRoute>
          <Features />
        </PublicRoute>
      } />
      <Route path="/pricing" element={
        <PublicRoute>
          <Pricing />
        </PublicRoute>
      } />
      <Route path="/auth" element={
        <PublicRoute>
          <Auth />
        </PublicRoute>
      } />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <UltraModernDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/user/dashboard" element={
        <ProtectedRoute>
          <UserDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/create-blog" element={
        <ProtectedRoute>
          <CreateBlog />
        </ProtectedRoute>
      } />
      
      <Route path="/blog/:slug/manage" element={
        <ProtectedRoute>
          <BlogManagement />
        </ProtectedRoute>
      } />
      
      <Route path="/blog/:slug/pages" element={
        <ProtectedRoute>
          <PageManager />
        </ProtectedRoute>
      } />
      
      <Route path="/blog/:slug/pages/:pageType" element={
        <ProtectedRoute>
          <PageManager />
        </ProtectedRoute>
      } />
      
      <Route path="/blog/:blogSlug/post/new" element={
        <ProtectedRoute>
          <PostEditor />
        </ProtectedRoute>
      } />
      
      <Route path="/blog/:blogSlug/post/:postId/edit" element={
        <ProtectedRoute>
          <PostEditor />
        </ProtectedRoute>
      } />
      
      <Route path="/blog/:slug/settings" element={
        <ProtectedRoute>
          <BlogSettings />
        </ProtectedRoute>
      } />
      
      <Route path="/blog/:slug/social-media" element={
        <ProtectedRoute>
          <SocialMediaManager />
        </ProtectedRoute>
      } />
      
      <Route path="/blog/:slug/email-marketing" element={
        <ProtectedRoute>
          <EmailMarketingManager />
        </ProtectedRoute>
      } />
      
      {/* Blog public pages */}
      <Route path="/:blogSlug/auth" element={<BlogAuth />} />
      <Route path="/:blogSlug/dashboard" element={<BlogSubscriberDashboard />} />
      <Route path="/:blogSlug/archive" element={<BlogArchive />} />
      <Route path="/:blogSlug/about" element={<BlogAbout />} />
      <Route path="/:blogSlug/contact" element={<BlogContact />} />
      <Route path="/:blogSlug/:postSlug" element={<PostView />} />
      
      {/* Catch-all route for blog slugs */}
      <Route path="/:slug" element={<BlogView />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BlogSubscriberAuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </BlogSubscriberAuthProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;