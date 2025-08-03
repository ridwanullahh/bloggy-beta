
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Edit,
  Globe,
  Zap,
  Users,
  BarChart3,
  Mail,
  CreditCard,
  Palette,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  Rocket,
  Shield,
  TrendingUp,
  Brain,
  Layers,
  Target,
  Award,
  Clock,
  DollarSign,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  Play,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const Index: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Advanced AI Content Generation",
      description: "Create compelling blog posts, headlines, and SEO-optimized content with our state-of-the-art AI that understands your brand voice and audience.",
      highlight: "10x faster content creation"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "50 Modern Blog Themes",
      description: "Choose from 50 stunning, responsive themes with advanced visual effects like glassmorphism, neumorphism, and neon designs that make your blog stand out.",
      highlight: "WordPress-beating variety"
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Built-in Marketing Suite",
      description: "Email marketing, social media automation, content scheduling, and subscriber management - all integrated seamlessly into your blogging workflow.",
      highlight: "All-in-one solution"
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Multiple Monetization Options",
      description: "Subscriptions, paywalls, pay-per-article, and premium content tiers with integrated payment processing and subscriber management.",
      highlight: "Start earning immediately"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Analytics & Insights",
      description: "Deep reader engagement analytics, content performance tracking, revenue analytics, and growth insights to optimize your blog strategy.",
      highlight: "Data-driven growth"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Professional Blog Hosting",
      description: "Lightning-fast hosting with custom domains, SSL certificates, CDN, and 99.9% uptime guarantee for professional blog presence.",
      highlight: "Enterprise-grade hosting"
    }
  ];

  const platformStats = [
    { number: "50+", label: "Modern Themes", icon: <Layers className="h-5 w-5" /> },
    { number: "99.9%", label: "Uptime", icon: <Shield className="h-5 w-5" /> },
    { number: "10x", label: "Faster Setup", icon: <Zap className="h-5 w-5" /> },
    { number: "24/7", label: "Support", icon: <Heart className="h-5 w-5" /> }
  ];

  const comparisonFeatures = [
    {
      feature: "AI Content Generation",
      us: true,
      wordpress: false,
      medium: false,
      hashnode: false
    },
    {
      feature: "50+ Modern Themes",
      us: true,
      wordpress: "Limited",
      medium: false,
      hashnode: "Basic"
    },
    {
      feature: "Built-in Marketing Tools",
      us: true,
      wordpress: "Plugins Required",
      medium: false,
      hashnode: false
    },
    {
      feature: "Advanced Monetization",
      us: true,
      wordpress: "Complex Setup",
      medium: "Limited",
      hashnode: false
    },
    {
      feature: "Professional Hosting",
      us: true,
      wordpress: "Self-hosted",
      medium: "No Control",
      hashnode: "Basic"
    }
  ];

  const themes = [
    {
      name: "HashNode Modern",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      category: "Developer",
      effect: "Clean & Professional"
    },
    {
      name: "Glassmorphism",
      color: "bg-gradient-to-br from-purple-400 to-pink-400",
      category: "Modern",
      effect: "Frosted Glass"
    },
    {
      name: "Cyberpunk Neon",
      color: "bg-gradient-to-br from-gray-900 to-black",
      category: "Futuristic",
      effect: "Neon Glow"
    },
    {
      name: "Neumorphism",
      color: "bg-gradient-to-br from-gray-200 to-gray-300",
      category: "Soft UI",
      effect: "Tactile Design"
    },
    {
      name: "Aurora Borealis",
      color: "bg-gradient-to-br from-green-400 to-blue-500",
      category: "Nature",
      effect: "Ethereal Gradients"
    },
    {
      name: "Luxury Gold",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
      category: "Premium",
      effect: "Sophisticated"
    },
    {
      name: "Ocean Depths",
      color: "bg-gradient-to-br from-blue-600 to-teal-600",
      category: "Nature",
      effect: "Aquatic Blues"
    },
    {
      name: "Cosmic Space",
      color: "bg-gradient-to-br from-purple-900 to-indigo-900",
      category: "Space",
      effect: "Stellar Effects"
    }
  ];

  const pricingPlans = [
    {
      name: "Creator",
      price: "$12",
      period: "/month",
      originalPrice: "$19",
      description: "Perfect for individual content creators",
      features: [
        "1 Professional Blog",
        "Unlimited AI Content Generation",
        "All 50 Premium Themes",
        "Custom Domain & SSL",
        "Basic Analytics & Insights",
        "Email Marketing (1,000 subscribers)",
        "Social Media Integration",
        "24/7 Email Support"
      ],
      highlight: "Most Popular for Beginners"
    },
    {
      name: "Professional",
      price: "$39",
      period: "/month",
      originalPrice: "$59",
      description: "For serious bloggers and businesses",
      features: [
        "5 Professional Blogs",
        "Advanced AI Content Suite",
        "All 50 Themes + Custom Branding",
        "Advanced Analytics & Revenue Tracking",
        "Email Marketing (10,000 subscribers)",
        "Social Media Automation",
        "Monetization Tools (Subscriptions, Paywalls)",
        "Priority Support & Live Chat",
        "SEO Optimization Tools",
        "Content Scheduling"
      ],
      popular: true,
      highlight: "Best Value for Growth"
    },
    {
      name: "Enterprise",
      price: "$129",
      period: "/month",
      originalPrice: "$199",
      description: "For agencies, teams, and large creators",
      features: [
        "Unlimited Professional Blogs",
        "White-label Solution",
        "Custom Theme Development",
        "Advanced AI with Custom Training",
        "Unlimited Email Marketing",
        "Multi-user Team Management",
        "API Access & Integrations",
        "Dedicated Account Manager",
        "Custom Analytics Dashboard",
        "Priority Feature Requests",
        "99.99% SLA Guarantee"
      ],
      highlight: "Maximum Power & Control"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="text-white h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-xl text-gray-900">Bloggy</span>
                <span className="text-xs text-gray-500 block -mt-1">AI-Powered Blogging</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#themes" className="text-gray-600 hover:text-gray-900 transition-colors">Themes</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#comparison" className="text-gray-600 hover:text-gray-900 transition-colors">Compare</a>
            </nav>

            <div className="flex items-center space-x-3">
              <Link to="/auth">
                <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                  Start Free Trial
                </Button>
              </Link>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4">
              <nav className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
                <a href="#themes" className="text-gray-600 hover:text-gray-900 transition-colors">Themes</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
                <a href="#comparison" className="text-gray-600 hover:text-gray-900 transition-colors">Compare</a>
                <Link to="/auth" className="text-gray-600 hover:text-gray-900 transition-colors">Sign In</Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Modern Hero Section */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-500"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            {/* Announcement Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-8 border border-blue-200">
              <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-800">Introducing 50 Modern Blog Themes with AI</span>
              <ChevronRight className="h-4 w-4 text-blue-600 ml-2" />
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Build Your
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Dream Blog
              </span>
              in Minutes
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              The most advanced blogging platform with <strong>AI content generation</strong>,
              <strong> 50 stunning themes</strong>, built-in marketing tools, and powerful monetization.
              Everything you need to create, grow, and monetize your blog.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/auth">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-4 text-lg border-2 hover:bg-gray-50">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Platform Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {platformStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modern Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
              <Zap className="h-4 w-4 mr-1" />
              Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Build & Grow
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From AI-powered content creation to advanced monetization, we've built the most comprehensive blogging platform for modern creators.
            </p>
          </div>

          {/* Interactive Feature Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                    currentFeature === index
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => setCurrentFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${
                      currentFeature === index
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 mb-3">{feature.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        {feature.highlight}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Visualization */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg"></div>
                      <div className="h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg"></div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <div className="h-8 bg-blue-500 rounded px-4 flex items-center">
                        <span className="text-white text-xs">Publish</span>
                      </div>
                      <div className="h-8 bg-gray-200 rounded px-4 flex items-center">
                        <span className="text-gray-600 text-xs">Draft</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Themes Showcase */}
      <section id="themes" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
              <Palette className="h-4 w-4 mr-1" />
              50 Modern Themes
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Themes That Make You
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Stand Out
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From glassmorphism to cyberpunk, our themes feature cutting-edge design trends and advanced visual effects that make your blog unforgettable.
            </p>
          </div>

          {/* Theme Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {themes.map((theme, index) => (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 cursor-pointer border-0 shadow-lg hover:shadow-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className={`${theme.color} h-32 relative overflow-hidden`}>
                      {/* Theme preview elements */}
                      <div className="absolute inset-0 p-3">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg h-full p-2">
                          <div className="bg-white/30 rounded h-2 w-3/4 mb-2"></div>
                          <div className="bg-white/20 rounded h-1 w-full mb-1"></div>
                          <div className="bg-white/20 rounded h-1 w-2/3 mb-2"></div>
                          <div className="bg-white/40 rounded h-4 w-16 mt-auto"></div>
                        </div>
                      </div>

                      {/* Category badge */}
                      <div className="absolute top-2 right-2">
                        <Badge className="text-xs bg-white/20 backdrop-blur-sm text-white border-white/30">
                          {theme.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{theme.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{theme.effect}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Eye className="h-3 w-3 mr-1" />
                        <span>Preview</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Theme Features */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Layers className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">50 Unique Designs</h3>
                <p className="text-gray-600">From minimalist to futuristic, each theme is crafted for different content types and audiences.</p>
              </div>

              <div>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Effects</h3>
                <p className="text-gray-600">Glassmorphism, neumorphism, neon glows, and other cutting-edge visual effects.</p>
              </div>

              <div>
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Brand Integration</h3>
                <p className="text-gray-600">Custom brand colors automatically applied across all themes with perfect harmony.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Pricing Section */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              <DollarSign className="h-4 w-4 mr-1" />
              Special Launch Pricing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Start Your Blog Journey
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Risk-Free
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your blogging goals. All plans include our 30-day money-back guarantee and can be upgraded anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative overflow-hidden ${
                plan.popular
                  ? 'border-2 border-blue-500 shadow-2xl scale-105 bg-white'
                  : 'border border-gray-200 shadow-lg bg-white hover:shadow-xl transition-shadow'
              }`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-2 text-sm font-medium">
                    🔥 Most Popular Choice
                  </div>
                )}

                <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-8'}`}>
                  <div className="mb-4">
                    <Badge variant="outline" className="text-xs">
                      {plan.highlight}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600 mb-6">{plan.description}</CardDescription>

                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500 ml-1">{plan.period}</span>
                    </div>
                    {plan.originalPrice && (
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg text-gray-400 line-through">{plan.originalPrice}/month</span>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Save {Math.round((parseInt(plan.originalPrice.replace('$', '')) - parseInt(plan.price.replace('$', ''))) / parseInt(plan.originalPrice.replace('$', '')) * 100)}%
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="px-6 pb-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/auth" className="block">
                    <Button
                      className={`w-full py-3 text-base font-semibold ${
                        plan.popular
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                      }`}
                    >
                      {plan.popular ? 'Start Free Trial' : 'Get Started'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    30-day money-back guarantee
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pricing FAQ */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">
              All plans include SSL certificates, CDN, 99.9% uptime, and 24/7 support
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                <span>30-day guarantee</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-1" />
                <span>No setup fees</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200">
              <Target className="h-4 w-4 mr-1" />
              Platform Comparison
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Bloggy Over Others?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we stack up against WordPress, Medium, and HashNode. We've built everything you need in one platform.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">Bloggy</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">WordPress</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Medium</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">HashNode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonFeatures.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.feature}</td>
                    <td className="px-6 py-4 text-center">
                      {item.us === true ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-sm text-blue-600 font-medium">{item.us}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.wordpress === true ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      ) : item.wordpress === false ? (
                        <X className="h-5 w-5 text-red-400 mx-auto" />
                      ) : (
                        <span className="text-sm text-gray-600">{item.wordpress}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.medium === true ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      ) : item.medium === false ? (
                        <X className="h-5 w-5 text-red-400 mx-auto" />
                      ) : (
                        <span className="text-sm text-gray-600">{item.medium}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.hashnode === true ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      ) : item.hashnode === false ? (
                        <X className="h-5 w-5 text-red-400 mx-auto" />
                      ) : (
                        <span className="text-sm text-gray-600">{item.hashnode}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
            <Sparkles className="h-4 w-4 text-white mr-2" />
            <span className="text-sm font-medium text-white">Join 10,000+ Content Creators</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to Build Your
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Dream Blog?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Start your free trial today and experience the future of blogging. No credit card required, cancel anytime.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/auth">
              <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl">
                <Rocket className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <span>30-day guarantee</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>Setup in 5 minutes</span>
            </div>
            <div className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="text-white h-5 w-5" />
                </div>
                <div>
                  <span className="font-bold text-2xl">Bloggy</span>
                  <span className="text-xs text-gray-400 block -mt-1">AI-Powered Blogging</span>
                </div>
              </div>
              <p className="text-gray-400 text-lg mb-6 max-w-md">
                The most advanced blogging platform with AI content generation, 50 modern themes, and powerful monetization tools.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <span className="text-sm">𝕏</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <span className="text-sm">in</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <span className="text-sm">f</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-lg">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#themes" className="hover:text-white transition-colors">50 Themes</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#comparison" className="hover:text-white transition-colors">Compare</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-lg">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">
                <p>&copy; 2024 Bloggy. All rights reserved.</p>
              </div>
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
