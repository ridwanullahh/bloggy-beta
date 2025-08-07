import React from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { 
  User, 
  MapPin, 
  Calendar, 
  Globe, 
  Mail, 
  Github, 
  Twitter, 
  Linkedin,
  Award,
  BookOpen,
  Users,
  Heart,
  Coffee,
  Code,
  Lightbulb
} from 'lucide-react';
import { Gravatar } from '../../../utils/gravatar';

interface HashnodeAboutProps {
  post?: any;
}

export const HashnodeAbout: React.FC<HashnodeAboutProps> = ({ post }) => {
  const { blog } = useTheme();

  const stats = [
    { label: 'Articles Published', value: '50+', icon: BookOpen },
    { label: 'Total Readers', value: '10K+', icon: Users },
    { label: 'Years Writing', value: '3+', icon: Calendar },
    { label: 'Topics Covered', value: '25+', icon: Lightbulb }
  ];

  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Go',
    'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'MongoDB', 'PostgreSQL'
  ];

  const achievements = [
    {
      title: 'Top Writer in Technology',
      description: 'Recognized as a top contributor in the technology category',
      icon: Award,
      date: '2024'
    },
    {
      title: 'Open Source Contributor',
      description: 'Active contributor to various open source projects',
      icon: Code,
      date: '2023'
    },
    {
      title: 'Community Builder',
      description: 'Built and managed a community of 1000+ developers',
      icon: Users,
      date: '2023'
    }
  ];

  const socialLinks = blog.customization?.socialMedia?.platforms || {};

  return (
    <div className="hashnode-about">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Profile Image */}
            <div className="flex justify-center">
              <Gravatar
                email={blog.ownerId}
                size={120}
                className="w-30 h-30 rounded-full border-4 border-white shadow-lg"
                alt={blog.title}
                fallback={
                  <div className="w-30 h-30 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-4xl border-4 border-white shadow-lg">
                    {blog.title.charAt(0).toUpperCase()}
                  </div>
                }
              />
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                About {blog.title}
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {blog.description || 'Passionate writer and developer sharing insights about technology, programming, and personal growth.'}
              </p>

              {/* Quick Info */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Remote</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Writing since 2021</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  <span>Available worldwide</span>
                </div>
              </div>

              {/* Social Links */}
              {Object.keys(socialLinks).length > 0 && (
                <div className="flex justify-center space-x-4">
                  {Object.entries(socialLinks).map(([platform, url]) => {
                    if (!url) return null;
                    const getIcon = () => {
                      switch (platform.toLowerCase()) {
                        case 'github': return Github;
                        case 'twitter': return Twitter;
                        case 'linkedin': return Linkedin;
                        default: return Globe;
                      }
                    };
                    const IconComponent = getIcon();
                    
                    return (
                      <a
                        key={platform}
                        href={url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white hover:bg-blue-600 text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
                      >
                        <IconComponent className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">My Story</h2>
            
            <div className="prose prose-lg max-w-none">
              {post?.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p>
                    Welcome to my corner of the internet! I'm a passionate developer and writer who believes in the power of sharing knowledge and building communities. Through this blog, I aim to share insights, tutorials, and thoughts on technology, programming, and personal growth.
                  </p>
                  
                  <p>
                    My journey in technology started several years ago, and since then, I've been fascinated by how code can solve real-world problems and create meaningful experiences. I specialize in web development, with a particular focus on modern JavaScript frameworks and cloud technologies.
                  </p>
                  
                  <p>
                    When I'm not coding or writing, you can find me exploring new technologies, contributing to open source projects, or mentoring aspiring developers. I believe that the best way to learn is by teaching others, which is why I'm committed to creating content that helps fellow developers grow in their careers.
                  </p>
                  
                  <p>
                    Thank you for visiting my blog. I hope you find the content valuable and inspiring. Feel free to reach out if you have any questions or just want to connect!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Skills & Technologies</h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Achievements</h2>
          
          <div className="space-y-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{achievement.title}</h3>
                      <span className="text-sm text-gray-500">{achievement.date}</span>
                    </div>
                    <p className="text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Let's Connect!</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              I'm always interested in connecting with fellow developers, writers, and tech enthusiasts. 
              Feel free to reach out for collaborations, questions, or just to say hello!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`mailto:contact@${blog.slug}.com`}
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Email
              </a>
              
              <a
                href={`/${blog.slug}/contact`}
                className="inline-flex items-center px-6 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors"
              >
                <Coffee className="w-5 h-5 mr-2" />
                Contact Form
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .hashnode-about {
          font-family: var(--theme-font-family);
          color: var(--theme-color-text);
        }
        
        .prose {
          color: var(--theme-color-text);
        }
        
        .prose h1,
        .prose h2,
        .prose h3,
        .prose h4,
        .prose h5,
        .prose h6 {
          color: var(--theme-color-text);
          font-family: var(--theme-font-heading);
        }
        
        .prose a {
          color: var(--theme-color-primary);
        }
      `}</style>
    </div>
  );
};

export default HashnodeAbout;
