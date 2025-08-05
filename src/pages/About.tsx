import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  ArrowRight,
  Sparkles,
  Users,
  Target,
  Award,
  Heart,
  Globe,
  Rocket,
  Shield,
  TrendingUp,
  Coffee,
  Lightbulb,
  Zap,
  Star
} from 'lucide-react';
import '../styles/modern.css';

const About: React.FC = () => {
  const teamValues = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation First",
      description: "We constantly push the boundaries of what's possible in blogging technology, bringing you cutting-edge features before anyone else."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Creator-Focused",
      description: "Every feature we build is designed with content creators in mind. Your success is our success, and we're here to support your journey."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Reliability & Trust",
      description: "We provide enterprise-grade security and 99.9% uptime because your content and audience deserve nothing less than the best."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Community",
      description: "We're building a worldwide community of creators who inspire, educate, and connect through the power of storytelling."
    }
  ];

  const milestones = [
    { year: "2023", event: "Bloggy Founded", description: "Started with a vision to revolutionize blogging" },
    { year: "2024", event: "10K+ Creators", description: "Reached our first major milestone of active users" },
    { year: "2024", event: "Modern Design System", description: "Launched comprehensive design tools" },
    { year: "2024", event: "Global Expansion", description: "Serving creators in 50+ countries worldwide" }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--light-background)' }}>
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b" style={{ backgroundColor: 'var(--utility-white)' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: 'var(--primary-green)' }}
            >
              B
            </div>
            <span className="text-xl font-bold" style={{ color: 'var(--brand-dark)' }}>Bloggy</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors font-semibold" style={{ color: 'var(--primary-green)' }}>About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link to="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button style={{ backgroundColor: 'var(--primary-green)', color: 'var(--utility-white)' }}>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6" style={{ backgroundColor: 'var(--utility-white)', color: 'var(--primary-green)' }}>
            <Heart className="h-4 w-4 mr-1" />
            Our Story
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-8" style={{ color: 'var(--brand-dark)' }}>
            Empowering Creators
            <span className="block" style={{ color: 'var(--primary-green)' }}>
              Worldwide
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
            We believe every voice deserves to be heard. Bloggy was born from the vision of making 
            professional blogging accessible to everyone, regardless of technical expertise.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: 'var(--primary-green)' }}>10K+</div>
              <div className="text-gray-600">Active Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: 'var(--primary-green)' }}>50+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: 'var(--primary-green)' }}>99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--utility-white)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--brand-dark)' }}>
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To democratize professional blogging by providing powerful, intuitive tools that help creators 
              build, grow, and monetize their online presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamValues.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: 'var(--primary-green)' }}
                  >
                    <div className="text-white">
                      {value.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl" style={{ color: 'var(--brand-dark)' }}>
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--light-background)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--brand-dark)' }}>
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              From a simple idea to empowering thousands of creators worldwide
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--primary-green)' }}
                >
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <span 
                      className="text-lg font-bold"
                      style={{ color: 'var(--primary-green)' }}
                    >
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-semibold" style={{ color: 'var(--brand-dark)' }}>
                      {milestone.event}
                    </h3>
                  </div>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--primary-green)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-green-100 mb-12 max-w-2xl mx-auto">
            Start your blogging journey today and become part of a global community of creators 
            who are changing the world, one story at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/auth">
              <Button 
                size="lg" 
                className="w-full sm:w-auto px-8 py-4 text-lg"
                style={{ backgroundColor: 'var(--utility-white)', color: 'var(--primary-green)' }}
              >
                <Rocket className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--brand-dark)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: 'var(--primary-green)' }}
            >
              B
            </div>
            <span className="text-xl font-bold text-white">Bloggy</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8 text-gray-400">
            <Link to="/features" className="hover:text-white transition-colors">Features</Link>
            <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link to="/auth" className="hover:text-white transition-colors">Sign In</Link>
          </div>
          
          <p className="text-gray-400">
            © 2024 Bloggy. All rights reserved. Made with ❤️ for creators worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
