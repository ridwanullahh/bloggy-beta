import React from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Users, Target, Award, TrendingUp } from 'lucide-react';
import { Gravatar } from '../../../utils/gravatar';

export const TechCorporateAbout: React.FC = () => {
  const { blog } = useTheme();

  return (
    <div className="tech-corporate-about">
      <section className="py-16 bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">About {blog.title}</h1>
          <p className="text-xl text-cyan-100 max-w-3xl">Driving technological innovation and digital transformation for businesses worldwide</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {blog.description || "We are dedicated to empowering businesses through cutting-edge technology solutions and innovative digital strategies. Our mission is to help organizations navigate the complexities of digital transformation and achieve sustainable growth."}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                With years of experience in the technology sector, we provide expert insights, practical solutions, and strategic guidance to help you stay ahead in the rapidly evolving digital landscape.
              </p>
            </div>
            <div className="bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl p-12 flex items-center justify-center">
              <Gravatar
                email={blog.ownerId}
                size={200}
                className="w-48 h-48 rounded-full shadow-xl"
                alt={blog.title}
                fallback={
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-6xl shadow-xl">
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
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Strategic Consulting</h3>
              <p className="text-gray-600">Expert guidance for digital transformation and technology strategy</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Growth Solutions</h3>
              <p className="text-gray-600">Scalable technology solutions to drive business growth</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Industry Expertise</h3>
              <p className="text-gray-600">Deep knowledge across multiple technology domains</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Team Collaboration</h3>
              <p className="text-gray-600">Working together to achieve exceptional results</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-600 mb-8">Let's discuss how we can help you achieve your technology goals</p>
          <a href={`/${blog.slug}/contact`} className="inline-block px-8 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors">
            Get in Touch
          </a>
        </div>
      </section>

      <style>{`
        .tech-corporate-about {
          font-family: var(--theme-font-family);
        }
      `}</style>
    </div>
  );
};

export default TechCorporateAbout;
