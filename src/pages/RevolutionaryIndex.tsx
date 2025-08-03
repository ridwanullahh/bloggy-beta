import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Sparkles, 
  Zap, 
  Users, 
  DollarSign, 
  BarChart3, 
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Play,
  Palette,
  Brain,
  Rocket,
  Shield,
  Heart,
  TrendingUp,
  Award,
  Eye,
  MessageSquare,
  Share2,
  Mail,
  Code,
  Layers,
  Target,
  Clock,
  Smartphone,
  Search,
  Settings,
  Lock,
  CreditCard,
  Paintbrush,
  MousePointer,
  Cpu,
  Database,
  Wifi,
  Monitor,
  Headphones,
  Camera,
  Mic,
  Volume2,
  Bluetooth,
  Battery,
  Fingerprint,
  Gamepad2,
  Menu,
  X,
  ChevronDown,
  ExternalLink
} from 'lucide-react';

const RevolutionaryIndex: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Interactive mouse tracking for hero section
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const revolutionaryFeatures = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Neural AI Content Engine",
      description: "Advanced AI that learns your writing style and creates content that sounds authentically you",
      gradient: "from-purple-600 via-pink-600 to-red-600",
      stats: "10x faster content creation"
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Quantum Theme System",
      description: "50+ themes with real-time brand color adaptation and advanced visual effects",
      gradient: "from-blue-600 via-cyan-600 to-teal-600",
      stats: "Infinite customization possibilities"
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Hyper-Speed Performance",
      description: "Lightning-fast loading with edge computing and intelligent caching",
      gradient: "from-green-600 via-emerald-600 to-cyan-600",
      stats: "Sub-second page loads globally"
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Smart Monetization Matrix",
      description: "AI-powered revenue optimization with dynamic pricing and audience insights",
      gradient: "from-yellow-600 via-orange-600 to-red-600",
      stats: "300% average revenue increase"
    }
  ];

  const floatingElements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
        
        {/* Floating Geometric Elements */}
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-xl animate-pulse"
            style={{
              width: `${element.size}px`,
              height: `${element.size}px`,
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDuration: `${element.duration}s`,
              animationDelay: `${element.delay}s`
            }}
          />
        ))}
        
        {/* Interactive Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
            {Array.from({ length: 400 }).map((_, i) => (
              <div
                key={i}
                className="border border-cyan-500/20 hover:bg-cyan-500/5 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-2xl">
                <Sparkles className="text-white h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Bloggy
                </span>
                <span className="text-xs text-gray-400 block -mt-1">Neural Blogging Platform</span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
              <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
              <Link to="/auth" className="text-gray-300 hover:text-white transition-colors">Sign In</Link>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-2xl">
                  Start Creating
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
            <div className="px-4 py-6 space-y-4">
              <Link to="/features" className="block text-gray-300 hover:text-white transition-colors">Features</Link>
              <Link to="/pricing" className="block text-gray-300 hover:text-white transition-colors">Pricing</Link>
              <Link to="/auth" className="block text-gray-300 hover:text-white transition-colors">Sign In</Link>
              <Link to="/auth" className="block">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
                  Start Creating
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Revolutionary Hero Section */}
      <section 
        ref={heroRef}
        className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          {/* Floating Badge */}
          <div className="mb-8 inline-flex">
            <Badge className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-purple-300 border-purple-500/30 px-6 py-2 text-sm backdrop-blur-xl">
              <Zap className="h-4 w-4 mr-2" />
              Revolutionary AI-Powered Blogging Platform
            </Badge>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Create
            </span>
            <br />
            <span className="text-white">Beyond</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Imagination
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            The world's first neural blogging platform that adapts to your creativity. 
            <span className="text-cyan-400"> AI-powered content generation</span>, 
            <span className="text-purple-400"> quantum theme system</span>, and 
            <span className="text-pink-400"> hyper-intelligent monetization</span> - all in one revolutionary platform.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-12 py-6 text-xl font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                <Rocket className="mr-3 h-6 w-6" />
                Launch Your Blog
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-xl px-12 py-6 text-xl font-semibold">
              <Play className="mr-3 h-6 w-6" />
              Watch Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "50+", label: "Neural Themes" },
              { number: "10x", label: "Faster Creation" },
              { number: "300%", label: "Revenue Boost" },
              { number: "99.9%", label: "Uptime SLA" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revolutionary Features Section */}
      <section className="relative z-10 py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Revolutionary
              </span>
              <br />
              <span className="text-white">Features</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of blogging with our groundbreaking features that redefine what's possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Feature Cards */}
            <div className="space-y-8">
              {revolutionaryFeatures.map((feature, index) => (
                <Card 
                  key={index}
                  className={`border-0 bg-gradient-to-r ${feature.gradient} p-1 rounded-2xl cursor-pointer transition-all duration-500 ${
                    activeFeature === index ? 'scale-105 shadow-2xl' : 'scale-100 opacity-70'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="bg-black rounded-2xl p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-300">{feature.description}</p>
                      </div>
                    </div>
                    <div className="text-sm text-cyan-400 font-semibold">
                      {feature.stats}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Interactive Demo */}
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-3xl p-8 backdrop-blur-xl border border-white/10">
                <div className="aspect-video bg-black rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-cyan-900/50"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-white font-semibold">Interactive Demo</p>
                    <p className="text-gray-400 text-sm">See the magic in action</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RevolutionaryIndex;
