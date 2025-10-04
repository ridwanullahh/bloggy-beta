import { ModularThemeComponents } from '../modular/types';
import { techCorporateTheme } from './theme';
import { TechCorporateHeader } from './Header';
import { TechCorporateHomepage } from './Homepage';
import { TechCorporateFooter } from './Footer';
import { TechCorporateSinglePost } from './SinglePost';
import { TechCorporateArchive } from './Archive';
import { TechCorporateAbout } from './About';
import { TechCorporateContact } from './Contact';

export const techCorporateComponents: ModularThemeComponents = {
  homepage: {
    header: { name: 'TechCorporateHeader', component: TechCorporateHeader },
    footer: { name: 'TechCorporateFooter', component: TechCorporateFooter },
    content: { name: 'TechCorporateHomepage', component: TechCorporateHomepage }
  },
  singlePost: {
    header: { name: 'TechCorporateHeader', component: TechCorporateHeader },
    footer: { name: 'TechCorporateFooter', component: TechCorporateFooter },
    content: { name: 'TechCorporateSinglePost', component: TechCorporateSinglePost }
  },
  archive: {
    header: { name: 'TechCorporateHeader', component: TechCorporateHeader },
    footer: { name: 'TechCorporateFooter', component: TechCorporateFooter },
    content: { name: 'TechCorporateArchive', component: TechCorporateArchive }
  },
  about: {
    header: { name: 'TechCorporateHeader', component: TechCorporateHeader },
    footer: { name: 'TechCorporateFooter', component: TechCorporateFooter },
    content: { name: 'TechCorporateAbout', component: TechCorporateAbout }
  },
  contact: {
    header: { name: 'TechCorporateHeader', component: TechCorporateHeader },
    footer: { name: 'TechCorporateFooter', component: TechCorporateFooter },
    content: { name: 'TechCorporateContact', component: TechCorporateContact }
  },
  category: {
    header: { name: 'TechCorporateHeader', component: TechCorporateHeader },
    footer: { name: 'TechCorporateFooter', component: TechCorporateFooter },
    content: { name: 'TechCorporateArchive', component: TechCorporateArchive }
  },
  tag: {
    header: { name: 'TechCorporateHeader', component: TechCorporateHeader },
    footer: { name: 'TechCorporateFooter', component: TechCorporateFooter },
    content: { name: 'TechCorporateArchive', component: TechCorporateArchive }
  },

  postCard: { name: 'TechCorporatePostCard', component: TechCorporateArchive as unknown as any },
  postList: { name: 'TechCorporatePostList', component: TechCorporateArchive as unknown as any },
  postGrid: { name: 'TechCorporatePostGrid', component: TechCorporateArchive as unknown as any },
  featuredPost: { name: 'TechCorporateFeaturedPost', component: TechCorporateHomepage as unknown as any },
  authorCard: { name: 'TechCorporateAuthorCard', component: TechCorporateAbout as unknown as any },
  categoryCard: { name: 'TechCorporateCategoryCard', component: TechCorporateArchive as unknown as any },
  tagCloud: { name: 'TechCorporateTagCloud', component: TechCorporateArchive as unknown as any },
  newsletter: { name: 'TechCorporateNewsletter', component: TechCorporateFooter as unknown as any },
  searchBox: { name: 'TechCorporateSearchBox', component: TechCorporateArchive as unknown as any },
  pagination: { name: 'TechCorporatePagination', component: TechCorporateArchive as unknown as any },
  breadcrumb: { name: 'TechCorporateBreadcrumb', component: TechCorporateArchive as unknown as any },
  socialShare: { name: 'TechCorporateSocialShare', component: TechCorporateSinglePost as unknown as any },
  relatedPosts: { name: 'TechCorporateRelatedPosts', component: TechCorporateSinglePost as unknown as any },
  comments: { name: 'TechCorporateComments', component: TechCorporateSinglePost as unknown as any },
  tableOfContents: { name: 'TechCorporateTableOfContents', component: TechCorporateSinglePost as unknown as any }
};

export { techCorporateTheme };
export default { theme: techCorporateTheme, components: techCorporateComponents };
