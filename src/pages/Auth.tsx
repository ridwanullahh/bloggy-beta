import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Sparkles, ArrowLeft, Shield, Zap, Users, Star } from 'lucide-react';
import '../styles/modern.css';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const benefits = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "AI Content Generation",
      description: "Create amazing blog posts with AI assistance"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "50 Modern Themes",
      description: "Choose from stunning, responsive designs"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Built-in Marketing",
      description: "Email marketing and social media automation"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Professional Hosting",
      description: "Fast, secure, and reliable blog hosting"
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--light-background)' }}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: 'var(--primary-green)'}}>
                <Sparkles className="text-white h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-xl" style={{ color: 'var(--brand-dark)'}}>Bloggy</span>
                <span className="text-xs text-gray-500 block -mt-1">AI-Powered Blogging</span>
              </div>
            </Link>

            <Link to="/">
              <Button variant="ghost" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* Left Side - Benefits */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ backgroundColor: 'var(--primary-green)'}}>
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-center px-12 py-16">
            <div className="mb-8">
              <Badge className="mb-4 bg-white/10 text-white border-white/20">
                <Star className="h-4 w-4 mr-1" />
                Join 10,000+ Creators
              </Badge>
              <h1 className="text-4xl font-bold text-white mb-4">
                Start Your Blogging Journey Today
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Join thousands of creators who are building successful blogs with our AI-powered platform.
              </p>
            </div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                    <p className="text-blue-100 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="flex items-center space-x-4 text-white">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <p className="font-semibold">10,000+ creators trust Bloggy</p>
                  <p className="text-sm text-blue-100">Start your free trial today</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
          <div className="w-full max-w-md">
            {isLogin ? (
              <LoginForm onToggleMode={toggleMode} />
            ) : (
              <RegisterForm onToggleMode={toggleMode} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
