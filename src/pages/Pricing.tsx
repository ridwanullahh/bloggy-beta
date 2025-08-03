import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  DollarSign,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  Award,
  Zap,
  Users,
  Mail,
  BarChart3,
  Globe,
  Palette,
  Brain,
  Lock,
  CreditCard,
  Settings,
  Code,
  Rocket,
  Star,
  X,
  HelpCircle
} from 'lucide-react';

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const pricingPlans = [
    {
      name: "Creator",
      monthlyPrice: 12,
      yearlyPrice: 10,
      originalMonthlyPrice: 19,
      originalYearlyPrice: 16,
      description: "Perfect for individual content creators",
      features: [
        "1 Professional Blog",
        "Unlimited AI Content Generation",
        "All 50 Premium Themes",
        "Custom Domain & SSL",
        "Basic Analytics & Insights",
        "Email Marketing (1,000 subscribers)",
        "Social Media Integration",
        "24/7 Email Support",
        "SEO Optimization Tools",
        "Content Scheduling"
      ],
      highlight: "Most Popular for Beginners",
      popular: false
    },
    {
      name: "Professional",
      monthlyPrice: 39,
      yearlyPrice: 32,
      originalMonthlyPrice: 59,
      originalYearlyPrice: 49,
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
        "Content Scheduling",
        "Custom Integrations",
        "White-label Options"
      ],
      highlight: "Best Value for Growth",
      popular: true
    },
    {
      name: "Enterprise",
      monthlyPrice: 129,
      yearlyPrice: 99,
      originalMonthlyPrice: 199,
      originalYearlyPrice: 159,
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
        "99.99% SLA Guarantee",
        "Custom Onboarding & Training"
      ],
      highlight: "Maximum Power & Control",
      popular: false
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
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-green-100 text-green-800 border-green-200">
            <DollarSign className="h-4 w-4 mr-1" />
            Special Launch Pricing - Save up to 50%
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Choose Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
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
                      <span className="text-5xl font-bold text-gray-900">${getPrice(plan)}</span>
                      <span className="text-gray-500 ml-1">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-lg text-gray-400 line-through">${getOriginalPrice(plan)}/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        Save {getSavings(plan)}%
                      </Badge>
                    </div>
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
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare Plans</h2>
            <p className="text-xl text-gray-600">See what's included in each plan</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Creator</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">Professional</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonFeatures.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.feature}</td>
                    <td className="px-6 py-4 text-center">
                      {item.creator === true ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      ) : item.creator === false ? (
                        <X className="h-5 w-5 text-red-400 mx-auto" />
                      ) : (
                        <span className="text-sm text-gray-600">{item.creator}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.professional === true ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      ) : item.professional === false ? (
                        <X className="h-5 w-5 text-red-400 mx-auto" />
                      ) : (
                        <span className="text-sm text-blue-600 font-medium">{item.professional}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.enterprise === true ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our pricing</p>
          </div>
          
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <HelpCircle className="h-5 w-5 mr-3 text-blue-600" />
                    {item.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Start Your
            <span className="block text-yellow-300">Blogging Journey?</span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join thousands of creators who've chosen Bloggy for their blogging needs. Start your free trial today!
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
