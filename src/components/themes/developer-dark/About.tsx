import React from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Terminal, Code } from 'lucide-react';
import { Gravatar } from '../../../utils/gravatar';

export const DeveloperDarkAbout: React.FC = () => {
  const { blog } = useTheme();

  return (
    <div className="developer-dark-about bg-gray-900 min-h-screen text-gray-300">
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-6">
            <Terminal className="w-10 h-10 text-green-500" />
            <h1 className="text-4xl font-mono text-green-500"># About</h1>
          </div>
          <p className="text-xl text-gray-400 font-mono">$ whoami</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Gravatar email={blog.ownerId} size={120} className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-green-500" alt={blog.title} fallback={
              <div className="w-32 h-32 rounded-full mx-auto mb-6 bg-gray-800 border-4 border-green-500 flex items-center justify-center">
                <Code className="w-16 h-16 text-green-500" />
              </div>
            } />
          </div>

          <div className="prose prose-invert prose-lg max-w-none font-mono">
            <p className="text-lg text-gray-400 leading-relaxed mb-6">{'>'} {blog.description || "Developer, writer, problem solver."}</p>
            <p className="text-gray-400 leading-relaxed mb-6">
              {'>'} This blog is where I share my journey through code, technology, and software development.
            </p>
            <p className="text-gray-400 leading-relaxed">
              {'>'} console.log("Thanks for visiting!");
            </p>
          </div>
        </div>
      </section>

      <style>{`.developer-dark-about { font-family: var(--theme-font-family); }`}</style>
    </div>
  );
};

export default DeveloperDarkAbout;
