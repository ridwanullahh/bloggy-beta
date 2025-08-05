import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Headphones,
  Globe,
  Coffee,
  Heart,
  CheckCircle
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import '../styles/modern.css';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you within 24 hours.",
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      description: "Get help from our support team",
      contact: "support@bloggy.com",
      action: "Send Email"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Live Chat",
      description: "Chat with us in real-time",
      contact: "Available 24/7",
      action: "Start Chat"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      description: "Speak directly with our team",
      contact: "+1 (555) 123-4567",
      action: "Call Now"
    }
  ];

  const faqs = [
    {
      question: "How quickly do you respond to inquiries?",
      answer: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please use our live chat feature."
    },
    {
      question: "Do you offer technical support?",
      answer: "Yes! Our technical support team is available 24/7 to help with any platform-related questions or issues you might encounter."
    },
    {
      question: "Can I schedule a demo or consultation?",
      answer: "Absolutely! We offer personalized demos and consultations to help you get the most out of Bloggy. Contact us to schedule a session."
    },
    {
      question: "Do you provide migration assistance?",
      answer: "Yes, we offer free migration assistance to help you move your existing blog content to Bloggy. Our team will guide you through the entire process."
    }
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
            <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors font-semibold" style={{ color: 'var(--primary-green)' }}>Contact</Link>
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
            <Headphones className="h-4 w-4 mr-1" />
            Get in Touch
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-8" style={{ color: 'var(--brand-dark)' }}>
            We're Here to
            <span className="block" style={{ color: 'var(--primary-green)' }}>
              Help You Succeed
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
            Have questions about Bloggy? Need help getting started? Our friendly team is here to support 
            you every step of the way.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <Clock className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--primary-green)' }} />
              <div className="font-semibold" style={{ color: 'var(--brand-dark)' }}>24/7 Support</div>
              <div className="text-sm text-gray-600">Always here when you need us</div>
            </div>
            <div className="text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--primary-green)' }} />
              <div className="font-semibold" style={{ color: 'var(--brand-dark)' }}>Quick Response</div>
              <div className="text-sm text-gray-600">Usually within 24 hours</div>
            </div>
            <div className="text-center">
              <Heart className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--primary-green)' }} />
              <div className="font-semibold" style={{ color: 'var(--brand-dark)' }}>Personal Touch</div>
              <div className="text-sm text-gray-600">Real humans, real help</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--utility-white)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--brand-dark)' }}>
              Choose Your Preferred Way to Connect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you prefer email, chat, or phone, we're available through multiple channels to provide 
              the support you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: 'var(--primary-green)' }}
                  >
                    <div className="text-white">
                      {method.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl" style={{ color: 'var(--brand-dark)' }}>
                    {method.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <p className="font-semibold mb-4" style={{ color: 'var(--brand-dark)' }}>
                    {method.contact}
                  </p>
                  <Button 
                    className="w-full"
                    style={{ backgroundColor: 'var(--primary-green)', color: 'var(--utility-white)' }}
                  >
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center" style={{ color: 'var(--brand-dark)' }}>
                  Send us a Message
                </CardTitle>
                <p className="text-center text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={sending}
                    className="w-full"
                    style={{ backgroundColor: 'var(--primary-green)', color: 'var(--utility-white)' }}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {sending ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--light-background)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--brand-dark)' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about our support and services
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--brand-dark)' }}>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
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

export default Contact;
