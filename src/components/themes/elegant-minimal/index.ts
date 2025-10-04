import { ModularThemeComponents } from '../modular/types';
import { elegantMinimalTheme } from './theme';
import { ElegantMinimalHeader } from './Header';
import { ElegantMinimalHomepage } from './Homepage';
import { ElegantMinimalFooter } from './Footer';
import { ElegantMinimalSinglePost } from './SinglePost';
import { ElegantMinimalArchive } from './Archive';
import { ElegantMinimalAbout } from './About';
import { ElegantMinimalContact } from './Contact';

export const elegantMinimalComponents: ModularThemeComponents = {
  homepage: {
    header: { name: 'ElegantMinimalHeader', component: ElegantMinimalHeader },
    footer: { name: 'ElegantMinimalFooter', component: ElegantMinimalFooter },
    content: { name: 'ElegantMinimalHomepage', component: ElegantMinimalHomepage }
  },
  singlePost: {
    header: { name: 'ElegantMinimalHeader', component: ElegantMinimalHeader },
    footer: { name: 'ElegantMinimalFooter', component: ElegantMinimalFooter },
    content: { name: 'ElegantMinimalSinglePost', component: ElegantMinimalSinglePost }
  },
  archive: {
    header: { name: 'ElegantMinimalHeader', component: ElegantMinimalHeader },
    footer: { name: 'ElegantMinimalFooter', component: ElegantMinimalFooter },
    content: { name: 'ElegantMinimalArchive', component: ElegantMinimalArchive }
  },
  about: {
    header: { name: 'ElegantMinimalHeader', component: ElegantMinimalHeader },
    footer: { name: 'ElegantMinimalFooter', component: ElegantMinimalFooter },
    content: { name: 'ElegantMinimalAbout', component: ElegantMinimalAbout }
  },
  contact: {
    header: { name: 'ElegantMinimalHeader', component: ElegantMinimalHeader },
    footer: { name: 'ElegantMinimalFooter', component: ElegantMinimalFooter },
    content: { name: 'ElegantMinimalContact', component: ElegantMinimalContact }
  },
  category: {
    header: { name: 'ElegantMinimalHeader', component: ElegantMinimalHeader },
    footer: { name: 'ElegantMinimalFooter', component: ElegantMinimalFooter },
    content: { name: 'ElegantMinimalArchive', component: ElegantMinimalArchive }
  },
  tag: {
    header: { name: 'ElegantMinimalHeader', component: ElegantMinimalHeader },
    footer: { name: 'ElegantMinimalFooter', component: ElegantMinimalFooter },
    content: { name: 'ElegantMinimalArchive', component: ElegantMinimalArchive }
  },

  postCard: { name: 'ElegantMinimalPostCard', component: ElegantMinimalArchive as unknown as any },
  postList: { name: 'ElegantMinimalPostList', component: ElegantMinimalArchive as unknown as any },
  postGrid: { name: 'ElegantMinimalPostGrid', component: ElegantMinimalArchive as unknown as any },
  featuredPost: { name: 'ElegantMinimalFeaturedPost', component: ElegantMinimalHomepage as unknown as any },
  authorCard: { name: 'ElegantMinimalAuthorCard', component: ElegantMinimalAbout as unknown as any },
  categoryCard: { name: 'ElegantMinimalCategoryCard', component: ElegantMinimalArchive as unknown as any },
  tagCloud: { name: 'ElegantMinimalTagCloud', component: ElegantMinimalArchive as unknown as any },
  newsletter: { name: 'ElegantMinimalNewsletter', component: ElegantMinimalFooter as unknown as any },
  searchBox: { name: 'ElegantMinimalSearchBox', component: ElegantMinimalArchive as unknown as any },
  pagination: { name: 'ElegantMinimalPagination', component: ElegantMinimalArchive as unknown as any },
  breadcrumb: { name: 'ElegantMinimalBreadcrumb', component: ElegantMinimalArchive as unknown as any },
  socialShare: { name: 'ElegantMinimalSocialShare', component: ElegantMinimalSinglePost as unknown as any },
  relatedPosts: { name: 'ElegantMinimalRelatedPosts', component: ElegantMinimalSinglePost as unknown as any },
  comments: { name: 'ElegantMinimalComments', component: ElegantMinimalSinglePost as unknown as any },
  tableOfContents: { name: 'ElegantMinimalTableOfContents', component: ElegantMinimalSinglePost as unknown as any }
};

export { elegantMinimalTheme };
export default { theme: elegantMinimalTheme, components: elegantMinimalComponents };
