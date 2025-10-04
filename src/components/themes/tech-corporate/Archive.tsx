import React, { useState } from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Calendar, Clock, Tag, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TechCorporateArchiveProps {
  posts: any[];
  categories: any[];
  tags: any[];
}

export const TechCorporateArchive: React.FC<TechCorporateArchiveProps> = ({
  posts,
  categories,
  tags
}) => {
  const { blog } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    const textContent = content.replace(/<[^>]*>/g, '');
    return textContent.length > maxLength ? textContent.substring(0, maxLength) + '...' : textContent;
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.categories?.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="tech-corporate-archive">
      <section className="py-12 bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Solutions & Insights</h1>
          <p className="text-xl text-cyan-100">Explore our latest technology solutions and industry insights</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 space-y-6">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${!selectedCategory ? 'bg-cyan-50 text-cyan-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === category.id ? 'bg-cyan-50 text-cyan-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 10).map((tag) => (
                  <span key={tag.id} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 cursor-pointer transition-colors">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600">{filteredPosts.length} articles found</p>
            </div>

            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>5 min read</span>
                      </div>
                    </div>

                    <Link to={`/${blog.slug}/post/${post.slug}`}>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-cyan-600 transition-colors">{post.title}</h2>
                    </Link>

                    <p className="text-gray-600 mb-4">{truncateContent(post.content, 200)}</p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag: string) => (
                          <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-cyan-50 text-cyan-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      to={`/${blog.slug}/post/${post.slug}`}
                      className="text-cyan-600 font-semibold hover:text-cyan-700 transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </main>
        </div>
      </div>

      <style>{`
        .tech-corporate-archive {
          font-family: var(--theme-font-family);
        }
      `}</style>
    </div>
  );
};

export default TechCorporateArchive;
