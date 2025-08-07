import React from 'react';
import { ModularThemeComponents } from '../modular/types';
import { hashnodeTheme } from './theme';
import { HashnodeHeader } from './Header';
import { HashnodeFooter } from './Footer';
import { HashnodeHomepage } from './Homepage';
import { HashnodeSinglePost } from './SinglePost';
import { HashnodeArchive } from './Archive';
import { HashnodeAbout } from './About';
import { HashnodeContact } from './Contact';

// Reusable components for the Hashnode theme
const HashnodePostCard: React.FC<any> = ({ post, onClick }) => {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
        </p>
        <button
          onClick={() => onClick(post)}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          Read More →
        </button>
      </div>
    </article>
  );
};

const HashnodePostList: React.FC<any> = ({ posts, onPostClick }) => {
  return (
    <div className="space-y-6">
      {posts.map((post: any) => (
        <HashnodePostCard key={post.id} post={post} onClick={onPostClick} />
      ))}
    </div>
  );
};

const HashnodePostGrid: React.FC<any> = ({ posts, onPostClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post: any) => (
        <HashnodePostCard key={post.id} post={post} onClick={onPostClick} />
      ))}
    </div>
  );
};

const HashnodeFeaturedPost: React.FC<any> = ({ post, onClick }) => {
  return (
    <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 cursor-pointer">
      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          {post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...'}
        </p>
        <button
          onClick={() => onClick(post)}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Read More
        </button>
      </div>
    </article>
  );
};

const HashnodeAuthorCard: React.FC<any> = ({ author, blog }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
          {(author.name || blog.title).charAt(0).toUpperCase()}
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">{author.name || blog.title}</h3>
        <p className="text-sm text-gray-600">{author.bio || blog.description}</p>
      </div>
    </div>
  );
};

const HashnodeCategoryCard: React.FC<any> = ({ category }) => {
  return (
    <div className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-200">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
        {category.name.charAt(0).toUpperCase()}
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
      <p className="text-sm text-gray-500">{category.postCount || 0} articles</p>
    </div>
  );
};

const HashnodeTagCloud: React.FC<any> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag: any) => (
        <span
          key={tag.id}
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer"
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
};

const HashnodeNewsletter: React.FC<any> = () => {
  return (
    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Subscribe to Newsletter</h3>
      <p className="text-gray-600 text-sm mb-4">Get the latest posts delivered right to your inbox.</p>
      <div className="flex space-x-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          Subscribe
        </button>
      </div>
    </div>
  );
};

const HashnodeSearchBox: React.FC<any> = ({ onSearch }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search articles..."
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onSearch?.(e.target.value)}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
};

const HashnodePagination: React.FC<any> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center space-x-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

const HashnodeBreadcrumb: React.FC<any> = ({ items }) => {
  return (
    <nav className="flex space-x-2 text-sm text-gray-600">
      {items.map((item: any, index: number) => (
        <React.Fragment key={index}>
          {index > 0 && <span>/</span>}
          <span className={index === items.length - 1 ? 'text-gray-900 font-medium' : 'hover:text-blue-600'}>
            {item.name}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
};

const HashnodeSocialShare: React.FC<any> = ({ post }) => {
  return (
    <div className="flex space-x-2">
      <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Share
      </button>
    </div>
  );
};

const HashnodeRelatedPosts: React.FC<any> = ({ posts, onPostClick }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Related Articles</h3>
      <div className="space-y-3">
        {posts.slice(0, 3).map((post: any) => (
          <div key={post.id} className="flex space-x-3 cursor-pointer" onClick={() => onPostClick(post)}>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                {post.title}
              </h4>
              <p className="text-sm text-gray-600">{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HashnodeComments: React.FC<any> = ({ comments }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Comments ({comments?.length || 0})</h3>
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-gray-600 text-center">Comments will be displayed here.</p>
      </div>
    </div>
  );
};

const HashnodeTableOfContents: React.FC<any> = ({ headings }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Table of Contents</h3>
      <nav className="space-y-2">
        {headings?.map((heading: any, index: number) => (
          <a
            key={index}
            href={`#${heading.id}`}
            className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
};

export const hashnodeComponents: ModularThemeComponents = {
  // Page layouts
  homepage: {
    header: { name: 'HashnodeHeader', component: HashnodeHeader },
    footer: { name: 'HashnodeFooter', component: HashnodeFooter },
    content: { name: 'HashnodeHomepage', component: HashnodeHomepage }
  },
  
  singlePost: {
    header: { name: 'HashnodeHeader', component: HashnodeHeader },
    footer: { name: 'HashnodeFooter', component: HashnodeFooter },
    content: { name: 'HashnodeSinglePost', component: HashnodeSinglePost }
  },
  
  archive: {
    header: { name: 'HashnodeHeader', component: HashnodeHeader },
    footer: { name: 'HashnodeFooter', component: HashnodeFooter },
    content: { name: 'HashnodeArchive', component: HashnodeArchive }
  },
  
  about: {
    header: { name: 'HashnodeHeader', component: HashnodeHeader },
    footer: { name: 'HashnodeFooter', component: HashnodeFooter },
    content: { name: 'HashnodeAbout', component: HashnodeAbout }
  },
  
  contact: {
    header: { name: 'HashnodeHeader', component: HashnodeHeader },
    footer: { name: 'HashnodeFooter', component: HashnodeFooter },
    content: { name: 'HashnodeContact', component: HashnodeContact }
  },
  
  category: {
    header: { name: 'HashnodeHeader', component: HashnodeHeader },
    footer: { name: 'HashnodeFooter', component: HashnodeFooter },
    content: { name: 'HashnodeArchive', component: HashnodeArchive }
  },
  
  tag: {
    header: { name: 'HashnodeHeader', component: HashnodeHeader },
    footer: { name: 'HashnodeFooter', component: HashnodeFooter },
    content: { name: 'HashnodeArchive', component: HashnodeArchive }
  },
  
  // Reusable components
  postCard: { name: 'HashnodePostCard', component: HashnodePostCard },
  postList: { name: 'HashnodePostList', component: HashnodePostList },
  postGrid: { name: 'HashnodePostGrid', component: HashnodePostGrid },
  featuredPost: { name: 'HashnodeFeaturedPost', component: HashnodeFeaturedPost },
  authorCard: { name: 'HashnodeAuthorCard', component: HashnodeAuthorCard },
  categoryCard: { name: 'HashnodeCategoryCard', component: HashnodeCategoryCard },
  tagCloud: { name: 'HashnodeTagCloud', component: HashnodeTagCloud },
  newsletter: { name: 'HashnodeNewsletter', component: HashnodeNewsletter },
  searchBox: { name: 'HashnodeSearchBox', component: HashnodeSearchBox },
  pagination: { name: 'HashnodePagination', component: HashnodePagination },
  breadcrumb: { name: 'HashnodeBreadcrumb', component: HashnodeBreadcrumb },
  socialShare: { name: 'HashnodeSocialShare', component: HashnodeSocialShare },
  relatedPosts: { name: 'HashnodeRelatedPosts', component: HashnodeRelatedPosts },
  comments: { name: 'HashnodeComments', component: HashnodeComments },
  tableOfContents: { name: 'HashnodeTableOfContents', component: HashnodeTableOfContents }
};

export { hashnodeTheme };
export default {
  theme: hashnodeTheme,
  components: hashnodeComponents
};
