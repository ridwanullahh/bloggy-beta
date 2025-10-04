import React from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Shield, Award, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { Gravatar } from '../../../utils/gravatar';

export const FinanceTrustAbout: React.FC = () => {
  const { blog } = useTheme();

  return (
    <div className="finance-trust-about">
      <section className="py-16 bg-gradient-to-br from-green-700 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-12 h-12" />
            <h1 className="text-5xl font-bold">About {blog.title}</h1>
          </div>
          <p className="text-xl text-green-100 max-w-3xl">Your trusted partner in financial planning and wealth management</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {blog.description || "We are committed to helping individuals and families achieve their financial goals through expert guidance, personalized strategies, and unwavering dedication to your financial success."}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                With decades of combined experience, our team of certified financial advisors brings deep expertise in investment management, retirement planning, tax strategies, and estate planning.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-700" />
                  <span className="text-gray-700">SEC Registered Investment Advisor</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-700" />
                  <span className="text-gray-700">Fiduciary Standard of Care</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-700" />
                  <span className="text-gray-700">Comprehensive Financial Planning</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-12 flex items-center justify-center">
              <Gravatar
                email={blog.ownerId}
                size={200}
                className="w-48 h-48 rounded-full shadow-xl border-4 border-white"
                alt={blog.title}
                fallback={
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold text-6xl shadow-xl border-4 border-white">
                    {blog.title.charAt(0).toUpperCase()}
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 mb-3">Trust & Security</h3>
              <p className="text-gray-600 text-center">Fully licensed, insured, and regulated to protect your interests</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 mb-3">Proven Track Record</h3>
              <p className="text-gray-600 text-center">Award-winning service and consistent client satisfaction</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 mb-3">Personalized Service</h3>
              <p className="text-gray-600 text-center">Tailored strategies designed for your unique situation</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 mb-3">Long-term Growth</h3>
              <p className="text-gray-600 text-center">Focus on sustainable wealth building strategies</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Financial Future?</h2>
          <p className="text-xl text-green-100 mb-8">Schedule a complimentary consultation with our financial advisors</p>
          <a href={`/${blog.slug}/contact`} className="inline-block px-8 py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Schedule Consultation
          </a>
        </div>
      </section>

      <style>{`
        .finance-trust-about {
          font-family: var(--theme-font-family);
        }
      `}</style>
    </div>
  );
};

export default FinanceTrustAbout;
