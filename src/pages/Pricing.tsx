import React, { useState } from 'react';
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
  Paintbrush,
  CreditCard,
  HelpCircle,
  X
} from 'lucide-react';
import '../styles/modern.css';

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

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

  const faqItems = [
    {
      question: "Can I switch plans anytime?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any billing differences."
    },
    {
      question: "What's included in the free trial?",
      answer: "Your 30-day free trial includes full access to all Professional plan features, including AI content generation, all themes, and monetization tools."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee on all plans. If you're not satisfied, we'll refund your payment in full."
    },
    {
      question: "Can I use my own domain?",
      answer: "Yes! All plans include custom domain support with free SSL certificates. You can connect your existing domain or register a new one."
    },
    {
      question: "Is there a setup fee?",
      answer: "No setup fees ever! The price you see is the price you pay. We believe in transparent, straightforward pricing."
    },
    {
      question: "How does AI content generation work?",
      answer: "Our AI analyzes your brand voice, audience preferences, and content goals to generate high-quality, SEO-optimized blog posts that match your style."
    }
  ];

  const comparisonFeatures = [
    { feature: "AI Content Generation", creator: true, professional: true, enterprise: true },
    { feature: "Number of Blogs", creator: "1", professional: "5", enterprise: "Unlimited" },
    { feature: "Premium Themes", creator: "50", professional: "50 + Custom", enterprise: "50 + Custom Dev" },
    { feature: "Email Subscribers", creator: "1,000", professional: "10,000", enterprise: "Unlimited" },
    { feature: "Custom Domain", creator: true, professional: true, enterprise: true },
    { feature: "Monetization Tools", creator: false, professional: true, enterprise: true },
    { feature: "API Access", creator: false, professional: "Limited", enterprise: "Full" },
    { feature: "White-label", creator: false, professional: "Partial", enterprise: true },
    { feature: "Priority Support", creator: false, professional: true, enterprise: true },
    { feature: "Custom Integrations", creator: false, professional: true, enterprise: true }
  ];

  const getPrice = (plan: any) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getOriginalPrice = (plan: any) => {
    return billingCycle === 'monthly' ? plan.originalMonthlyPrice : plan.originalYearlyPrice;
  };

  const getSavings = (plan: any) => {
    const current = getPrice(plan);
    const original = getOriginalPrice(plan);
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--light-background)' }}>
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-100 z-50">
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
            
            <div className="flex items-center space-x-3">
              <Link to="/">
                <Button variant="ghost">Back to Home</Button>
              </Link>
              <Link to="/auth">
                <Button style={{ backgroundColor: 'var(--primary-green)', color: 'var(--utility-white)'}}>
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--light-background)'}}>
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6" style={{ backgroundColor: 'var(--utility-white)', color: 'var(--primary-green)'}}>
            <DollarSign className="h-4 w-4 mr-1" />
            Special Launch Pricing - Save up to 50%
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-8" style={{ color: 'var(--brand-dark)'}}>
            Choose Your
            <span className="block" style={{ color: 'var(--primary-green)'}}>
              Perfect Plan
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Start your blogging journey with our risk-free 30-day trial. All plans include our money-back guarantee and can be upgraded anytime.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-xl">
              <button
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  billingCycle === 'monthly' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  billingCycle === 'yearly' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setBillingCycle('yearly')}
              >
                Yearly
                <Badge className="ml-2 bg-green-100 text-green-800 text-xs">Save 20%</Badge>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`modern-card relative overflow-hidden ${
                plan.popular 
                  ? 'border-2 border-blue-500 shadow-2xl scale-105' 
                  : 'border border-gray-200 shadow-lg hover:shadow-xl transition-shadow'
              }`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 text-white text-center py-2 text-sm font-medium" style={{ backgroundColor: 'var(--primary-green)'}}>
                    🔥 Most Popular Choice
                  </div>
                )}
                
                <div className={`text-center ${plan.popular ? 'pt-12' : 'pt-8'}`}>
                  <div className="mb-4">
                    <Badge variant="outline" className="text-xs">
                      {plan.highlight}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--brand-dark)'}}>{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold" style={{ color: 'var(--brand-dark)'}}>${getPrice(plan)}</span>
                      <span className="text-gray-500 ml-1">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-lg text-gray-400 line-through">${getOriginalPrice(plan)}/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                      <Badge className="text-xs" style={{ backgroundColor: 'var(--light-background)', color: 'var(--primary-green)'}}>
                        Save {getSavings(plan)}%
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 pb-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: 'var(--primary-green)'}}/>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/auth" className="block">
                    <Button 
                      className={`w-full py-3 text-base font-semibold ${
                        plan.popular 
                          ? 'text-white shadow-lg' 
                          : 'text-white'
                      }`}
                      style={{ backgroundColor: plan.popular ? 'var(--primary-green)' : 'var(--brand-dark)'}}
                    >
                      {plan.popular ? 'Start Free Trial' : 'Get Started'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  
                  <p className="text-xs text-gray-500 text-center mt-3">
                    30-day money-back guarantee
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--light-background)'}}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--brand-dark)'}}>Compare Plans</h2>
            <p className="text-xl text-gray-600">See what's included in each plan</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
              <thead style={{ backgroundColor: 'var(--light-background)'}}>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--brand-dark)'}}>Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Creator</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold" style={{ color: 'var(--primary-green)'}}>Professional</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonFeatures.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium" style={{ color: 'var(--brand-dark)'}}>{item.feature}</td>
                    <td className="px-6 py-4 text-center">
                      {item.creator === true ? (
                        <CheckCircle className="h-5 w-5 mx-auto" style={{ color: 'var(--primary-green)'}}/>
                      ) : item.creator === false ? (
                        <X className="h-5 w-5 text-red-400 mx-auto" />
                      ) : (
                        <span className="text-sm text-gray-600">{item.creator}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.professional === true ? (
                        <CheckCircle className="h-5 w-5 mx-auto" style={{ color: 'var(--primary-green)'}}/>
                      ) : item.professional === false ? (
                        <X className="h-5 w-5 text-red-400 mx-auto" />
                      ) : (
                        <span className="text-sm font-medium" style={{ color: 'var(--primary-green)'}}>{item.professional}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.enterprise === true ? (
                        <CheckCircle className="h-5 w-5 mx-auto" style={{ color: 'var(--primary-green)'}}/>
                      ) : item.enterprise === false ? (
                        <X className="h-5 w-5 text-red-400 mx-auto" />
                      ) : (
                        <span className="text-sm text-gray-600">{item.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--brand-dark)'}}>Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our pricing</p>
          </div>
          
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="modern-card">
                <h3 className="text-lg flex items-center font-semibold">
                  <HelpCircle className="h-5 w-5 mr-3" style={{ color: 'var(--primary-green)'}}/>
                  {item.question}
                </h3>
                <p className="text-gray-600 leading-relaxed mt-2">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--primary-green)'}}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Start Your
            <span className="block" style={{ color: 'var(--accent-gold)'}}>Blogging Journey?</span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join thousands of creators who've chosen Bloggy for their blogging needs. Start your free trial today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/auth">
              <Button size="lg" className="px-8 py-4 text-lg font-semibold shadow-xl" style={{ backgroundColor: 'var(--utility-white)', color: 'var(--primary-green)'}}>
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
          
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <span>30-day guarantee</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              <span>No setup fees</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
