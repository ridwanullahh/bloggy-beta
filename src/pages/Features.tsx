import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Brain, 
  Palette, 
  Rocket, 
  DollarSign, 
  BarChart3, 
  Globe,
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  Target,
  Award,
  Clock,
  Heart,
  MessageSquare,
  Share2,
  ArrowRight,
  CheckCircle,
  Layers,
  Eye,
  Users,
  Mail,
  Settings,
  Lock,
  Smartphone,
  Search,
  Code,
  Paintbrush
} from 'lucide-react';

const Features: React.FC = () => {
  const featureCategories = [
    {
      title: "AI-Powered Content Creation",
      description: "Revolutionary AI tools that understand your brand and audience",
      icon: <Brain className="h-8 w-8" />,
      color: "from-blue-500 to-purple-500",
      features: [
        {
          icon: <Sparkles className="h-5 w-5" />,
          title: "Smart Content Generation",
          description: "Generate high-quality blog posts, headlines, and SEO-optimized content that matches your brand voice and engages your audience."
        },
        {
          icon: <Target className="h-5 w-5" />,
          title: "Audience-Aware Writing",
          description: "AI analyzes your audience preferences and creates content tailored to their interests and reading patterns."
        },
        {
          icon: <Search className="h-5 w-5" />,
          title: "SEO Optimization",
          description: "Automatic keyword research, meta descriptions, and content optimization to rank higher in search results."
        },
        {
          icon: <Clock className="h-5 w-5" />,
          title: "Content Scheduling",
          description: "Plan and schedule your content calendar with AI-suggested optimal posting times for maximum engagement."
        }
      ]
    },
    {
      title: "50 Modern Blog Themes",
      description: "Stunning, responsive themes with cutting-edge visual effects",
      icon: <Palette className="h-8 w-8" />,
      color: "from-purple-500 to-pink-500",
      features: [
        {
          icon: <Layers className="h-5 w-5" />,
          title: "50 Unique Designs",
          description: "From minimalist to futuristic, each theme is crafted for different content types and audiences with distinct layouts."
        },
        {
          icon: <Sparkles className="h-5 w-5" />,
          title: "Advanced Visual Effects",
          description: "Glassmorphism, neumorphism, neon glows, and holographic effects that make your blog unforgettable."
        },
        {
          icon: <Paintbrush className="h-5 w-5" />,
          title: "Brand Color Integration",
          description: "Custom brand colors automatically applied across all themes with perfect harmony and visual consistency."
        },
        {
          icon: <Smartphone className="h-5 w-5" />,
          title: "Fully Responsive",
          description: "All themes work perfectly on desktop, tablet, and mobile devices with optimized user experience."
        }
      ]
    },
    {
      title: "Marketing & Growth Tools",
      description: "Everything you need to grow and engage your audience",
      icon: <Rocket className="h-8 w-8" />,
      color: "from-green-500 to-blue-500",
      features: [
        {
          icon: <Mail className="h-5 w-5" />,
          title: "Email Marketing Suite",
          description: "Built-in email marketing with automation, segmentation, and beautiful newsletter templates."
        },
        {
          icon: <Share2 className="h-5 w-5" />,
          title: "Social Media Automation",
          description: "Automatically share your posts across social platforms with optimized formatting and scheduling."
        },
        {
          icon: <BarChart3 className="h-5 w-5" />,
          title: "Advanced Analytics",
          description: "Deep insights into reader behavior, content performance, and growth metrics with actionable recommendations."
        },
        {
          icon: <Users className="h-5 w-5" />,
          title: "Subscriber Management",
          description: "Comprehensive subscriber dashboard with segmentation, engagement tracking, and retention analytics."
        }
      ]
    },
    {
      title: "Monetization & Revenue",
      description: "Multiple ways to monetize your content and grow revenue",
      icon: <DollarSign className="h-8 w-8" />,
      color: "from-yellow-500 to-orange-500",
      features: [
        {
          icon: <Lock className="h-5 w-5" />,
          title: "Flexible Paywalls",
          description: "Create premium content with customizable paywalls, free article limits, and subscription tiers."
        },
        {
          icon: <CreditCard className="h-5 w-5" />,
          title: "Multiple Payment Options",
          description: "Accept payments via Stripe, PayPal, and other gateways with automatic subscription management."
        },
        {
          icon: <TrendingUp className="h-5 w-5" />,
          title: "Revenue Analytics",
          description: "Track subscription growth, revenue trends, and customer lifetime value with detailed financial reports."
        },
        {
          icon: <Award className="h-5 w-5" />,
          title: "Membership Tiers",
          description: "Create multiple subscription levels with different access rights and exclusive content for each tier."
        }
      ]
    },
    {
      title: "Professional Hosting & Performance",
      description: "Enterprise-grade hosting with lightning-fast performance",
      icon: <Globe className="h-8 w-8" />,
      color: "from-indigo-500 to-purple-500",
      features: [
        {
          icon: <Zap className="h-5 w-5" />,
          title: "Lightning Fast Loading",
          description: "Global CDN, optimized images, and advanced caching ensure your blog loads in under 2 seconds worldwide."
        },
        {
          icon: <Shield className="h-5 w-5" />,
          title: "99.9% Uptime Guarantee",
          description: "Enterprise-grade hosting infrastructure with automatic backups and disaster recovery."
        },
        {
          icon: <Settings className="h-5 w-5" />,
          title: "Custom Domains & SSL",
          description: "Use your own domain with free SSL certificates and professional email addresses."
        },
        {
          icon: <Code className="h-5 w-5" />,
          title: "Developer-Friendly",
          description: "API access, webhooks, custom integrations, and advanced customization options for developers."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="text-white h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-xl text-gray-900">Bloggy</span>
                <span className="text-xs text-gray-500 block -mt-1">AI-Powered Blogging</span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-3">
              <Link to="/">
                <Button variant="ghost">Back to Home</Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">
            <Zap className="h-4 w-4 mr-1" />
            Complete Feature Overview
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Everything You Need to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Build & Grow
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Discover all the powerful features that make Bloggy the most advanced blogging platform. 
            From AI content generation to advanced monetization, we've got you covered.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-xl">
                <Rocket className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
            </Link>
            <Link to="/#pricing">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2">
                View Pricing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {featureCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-24 last:mb-0">
              <div className="text-center mb-16">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.color} text-white mb-6`}>
                  {category.icon}
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">{category.title}</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.features.map((feature, featureIndex) => (
                  <Card key={featureIndex} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Experience
            <span className="block text-yellow-300">All These Features?</span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Start your free trial today and discover why thousands of creators choose Bloggy for their blogging needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl">
                <Rocket className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
