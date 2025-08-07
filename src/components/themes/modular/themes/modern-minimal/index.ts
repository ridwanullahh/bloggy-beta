import { ModularThemeComponents } from '../../types';
import { modernMinimalTheme } from './theme';
import { ModernMinimalHeader } from './Header';
import { ModernMinimalFooter } from './Footer';
import { ModernMinimalHomepage } from './Homepage';
import { ModernMinimalSinglePost } from './SinglePost';

// Create archive, about, and contact components (simplified versions for now)
const ModernMinimalArchive = ModernMinimalHomepage; // Reuse homepage layout for archive
const ModernMinimalAbout = ModernMinimalSinglePost; // Reuse single post layout for about
const ModernMinimalContact = ModernMinimalSinglePost; // Reuse single post layout for contact

// Simple post card component
const ModernMinimalPostCard: React.FC<any> = ({ post, onClick }) => (
  <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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

export const modernMinimalComponents: ModularThemeComponents = {
  // Page layouts
  homepage: {
    header: { name: 'ModernMinimalHeader', component: ModernMinimalHeader },
    footer: { name: 'ModernMinimalFooter', component: ModernMinimalFooter },
    content: { name: 'ModernMinimalHomepage', component: ModernMinimalHomepage }
  },
  
  singlePost: {
    header: { name: 'ModernMinimalHeader', component: ModernMinimalHeader },
    footer: { name: 'ModernMinimalFooter', component: ModernMinimalFooter },
    content: { name: 'ModernMinimalSinglePost', component: ModernMinimalSinglePost }
  },
  
  archive: {
    header: { name: 'ModernMinimalHeader', component: ModernMinimalHeader },
    footer: { name: 'ModernMinimalFooter', component: ModernMinimalFooter },
    content: { name: 'ModernMinimalArchive', component: ModernMinimalArchive }
  },
  
  about: {
    header: { name: 'ModernMinimalHeader', component: ModernMinimalHeader },
    footer: { name: 'ModernMinimalFooter', component: ModernMinimalFooter },
    content: { name: 'ModernMinimalAbout', component: ModernMinimalAbout }
  },
  
  contact: {
    header: { name: 'ModernMinimalHeader', component: ModernMinimalHeader },
    footer: { name: 'ModernMinimalFooter', component: ModernMinimalFooter },
    content: { name: 'ModernMinimalContact', component: ModernMinimalContact }
  },
  
  category: {
    header: { name: 'ModernMinimalHeader', component: ModernMinimalHeader },
    footer: { name: 'ModernMinimalFooter', component: ModernMinimalFooter },
    content: { name: 'ModernMinimalArchive', component: ModernMinimalArchive }
  },
  
  tag: {
    header: { name: 'ModernMinimalHeader', component: ModernMinimalHeader },
    footer: { name: 'ModernMinimalFooter', component: ModernMinimalFooter },
    content: { name: 'ModernMinimalArchive', component: ModernMinimalArchive }
  },
  
  // Reusable components
  postCard: { name: 'ModernMinimalPostCard', component: ModernMinimalPostCard },
  postList: { name: 'ModernMinimalPostCard', component: ModernMinimalPostCard },
  postGrid: { name: 'ModernMinimalPostCard', component: ModernMinimalPostCard },
  featuredPost: { name: 'ModernMinimalPostCard', component: ModernMinimalPostCard },
  authorCard: { name: 'ModernMinimalPostCard', component: ModernMinimalPostCard },
  categoryCard: { name: 'ModernMinimalPostCard', component: ModernMinimalPostCard },
  tagCloud: { name: 'ModernMinimalPostCard', component: ModernMinimalPostCard },
  newsletter: { name: 'ModernMinimalPostCard', component: ModernMinimalPostCard },
  searchBox: { name: 'ModernMinimalPostCard', component: ModernMinimalPostCard },
  pagination: { name: 'ModernMinimalPostCard', component: ModernMinimalPostCard },
  breadcrumb: { name: 'ModernMinimalPostCard', component: ModernMinimalPostCard },
  socialShare: { name: 'ModernMinimalPostCard', component: ModernMinimalPostCard },
  relatedPosts: { name: 'ModernMinimalPostCard', component: ModernMinimalPostCard },
  comments: { name: 'ModernMinimalPostCard', component: ModernMinimalPostCard },
  tableOfContents: { name: 'ModernMinimalPostCard', component: ModernMinimalPostCard }
};

export { modernMinimalTheme };
export default {
  theme: modernMinimalTheme,
  components: modernMinimalComponents
};
