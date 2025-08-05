import React from 'react';
import { Blog, BlogTheme } from '../../../types/blog';
import { UniversalPageLayout } from './UniversalPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { 
  User, 
  Mail, 
  Globe, 
  ArrowLeft,
  Calendar,
  MapPin,
  Heart,
  Coffee,
  BookOpen,
  Target,
  Users,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AboutPageLayoutProps {
  blog: Blog;
  theme: BlogTheme;
  children?: React.ReactNode;
}

export const AboutPageLayout: React.FC<AboutPageLayoutProps> = ({
  blog,
  theme,
  children
}) => {
  const navigate = useNavigate();
  const brandColors = blog.customization?.brandColors || {};
  const socialMedia = blog.customization?.socialMedia || {};

  const AboutHeader = () => (
    <div className="bg-white border-b">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/${blog.slug}`)}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {blog.title}
        </Button>

        <div className="text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            {blog.title.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-4xl font-bold mb-4">About {blog.title}</h1>
          {blog.description && (
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {blog.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const StatsSection = () => (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">50+</div>
            <div className="text-sm text-gray-600">Articles Published</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{blog.subscriberCount || 0}</div>
            <div className="text-sm text-gray-600">Subscribers</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">1K+</div>
            <div className="text-sm text-gray-600">Likes Received</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">2</div>
            <div className="text-sm text-gray-600">Years Active</div>
          </div>
        </div>
      </div>
    </div>
  );

  const MainContent = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                We're passionate about sharing knowledge, insights, and stories that inspire and educate. 
                Our mission is to create a community where ideas flourish and meaningful conversations happen. 
                Through thoughtful content and engaging discussions, we aim to make a positive impact on our readers' lives.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Coffee className="w-5 h-5 mr-2" />
                What We Write About
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Our content spans across various topics that matter to our community:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Technology trends and innovations
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Personal development and growth
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Industry insights and analysis
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Creative inspiration and tutorials
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Our Values
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Authenticity</h4>
                  <p className="text-sm text-gray-600">
                    We believe in genuine, honest content that reflects real experiences and insights.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Quality</h4>
                  <p className="text-sm text-gray-600">
                    Every piece of content is carefully crafted to provide value to our readers.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Community</h4>
                  <p className="text-sm text-gray-600">
                    We foster an inclusive environment where everyone's voice is heard and valued.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Growth</h4>
                  <p className="text-sm text-gray-600">
                    We're committed to continuous learning and helping others grow along the way.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {children && (
            <Card>
              <CardContent className="p-6">
                {children}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Quick Facts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <div className="text-sm font-medium">Founded</div>
                  <div className="text-sm text-gray-600">
                    {new Date(blog.createdAt).getFullYear()}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-500" />
                <div>
                  <div className="text-sm font-medium">Location</div>
                  <div className="text-sm text-gray-600">Global</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <BookOpen className="w-4 h-4 text-gray-500" />
                <div>
                  <div className="text-sm font-medium">Content Focus</div>
                  <div className="text-sm text-gray-600">Educational & Inspiring</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Get In Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                We love hearing from our readers! Feel free to reach out with questions, 
                suggestions, or just to say hello.
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={() => navigate(`/${blog.slug}/contact`)} 
                  className="w-full"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Us
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate(`/${blog.slug}`)} 
                  className="w-full"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Visit Blog
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Signup */}
          <Card>
            <CardHeader>
              <CardTitle>Stay Updated</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Subscribe to our newsletter for the latest posts and updates.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="w-full">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <UniversalPageLayout blog={blog} theme={theme} pageType="about">
      <AboutHeader />
      <StatsSection />
      <MainContent />
    </UniversalPageLayout>
  );
};
