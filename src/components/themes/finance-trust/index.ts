import { ModularThemeComponents } from '../modular/types';
import { financeTrustTheme } from './theme';
import { FinanceTrustHeader } from './Header';
import { FinanceTrustHomepage } from './Homepage';
import { FinanceTrustFooter } from './Footer';
import { FinanceTrustSinglePost } from './SinglePost';
import { FinanceTrustArchive } from './Archive';
import { FinanceTrustAbout } from './About';
import { FinanceTrustContact } from './Contact';

export const financeTrustComponents: ModularThemeComponents = {
  homepage: {
    header: { name: 'FinanceTrustHeader', component: FinanceTrustHeader },
    footer: { name: 'FinanceTrustFooter', component: FinanceTrustFooter },
    content: { name: 'FinanceTrustHomepage', component: FinanceTrustHomepage }
  },
  singlePost: {
    header: { name: 'FinanceTrustHeader', component: FinanceTrustHeader },
    footer: { name: 'FinanceTrustFooter', component: FinanceTrustFooter },
    content: { name: 'FinanceTrustSinglePost', component: FinanceTrustSinglePost }
  },
  archive: {
    header: { name: 'FinanceTrustHeader', component: FinanceTrustHeader },
    footer: { name: 'FinanceTrustFooter', component: FinanceTrustFooter },
    content: { name: 'FinanceTrustArchive', component: FinanceTrustArchive }
  },
  about: {
    header: { name: 'FinanceTrustHeader', component: FinanceTrustHeader },
    footer: { name: 'FinanceTrustFooter', component: FinanceTrustFooter },
    content: { name: 'FinanceTrustAbout', component: FinanceTrustAbout }
  },
  contact: {
    header: { name: 'FinanceTrustHeader', component: FinanceTrustHeader },
    footer: { name: 'FinanceTrustFooter', component: FinanceTrustFooter },
    content: { name: 'FinanceTrustContact', component: FinanceTrustContact }
  },
  category: {
    header: { name: 'FinanceTrustHeader', component: FinanceTrustHeader },
    footer: { name: 'FinanceTrustFooter', component: FinanceTrustFooter },
    content: { name: 'FinanceTrustArchive', component: FinanceTrustArchive }
  },
  tag: {
    header: { name: 'FinanceTrustHeader', component: FinanceTrustHeader },
    footer: { name: 'FinanceTrustFooter', component: FinanceTrustFooter },
    content: { name: 'FinanceTrustArchive', component: FinanceTrustArchive }
  },

  postCard: { name: 'FinanceTrustPostCard', component: FinanceTrustArchive as unknown as any },
  postList: { name: 'FinanceTrustPostList', component: FinanceTrustArchive as unknown as any },
  postGrid: { name: 'FinanceTrustPostGrid', component: FinanceTrustArchive as unknown as any },
  featuredPost: { name: 'FinanceTrustFeaturedPost', component: FinanceTrustHomepage as unknown as any },
  authorCard: { name: 'FinanceTrustAuthorCard', component: FinanceTrustAbout as unknown as any },
  categoryCard: { name: 'FinanceTrustCategoryCard', component: FinanceTrustArchive as unknown as any },
  tagCloud: { name: 'FinanceTrustTagCloud', component: FinanceTrustArchive as unknown as any },
  newsletter: { name: 'FinanceTrustNewsletter', component: FinanceTrustFooter as unknown as any },
  searchBox: { name: 'FinanceTrustSearchBox', component: FinanceTrustArchive as unknown as any },
  pagination: { name: 'FinanceTrustPagination', component: FinanceTrustArchive as unknown as any },
  breadcrumb: { name: 'FinanceTrustBreadcrumb', component: FinanceTrustArchive as unknown as any },
  socialShare: { name: 'FinanceTrustSocialShare', component: FinanceTrustSinglePost as unknown as any },
  relatedPosts: { name: 'FinanceTrustRelatedPosts', component: FinanceTrustSinglePost as unknown as any },
  comments: { name: 'FinanceTrustComments', component: FinanceTrustSinglePost as unknown as any },
  tableOfContents: { name: 'FinanceTrustTableOfContents', component: FinanceTrustSinglePost as unknown as any }
};

export { financeTrustTheme };
export default { theme: financeTrustTheme, components: financeTrustComponents };
