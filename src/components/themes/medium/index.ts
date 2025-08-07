import { ModularThemeComponents } from '../modular/types';
import { mediumTheme } from './theme';
import { MediumHeader } from './Header';
import { MediumHomepage } from './Homepage';
import { MediumFooter } from './Footer';
import { MediumSinglePost } from './SinglePost';
import { MediumArchive } from './Archive';
import { MediumAbout } from './About';
import { MediumContact } from './Contact';

export const mediumComponents: ModularThemeComponents = {
  homepage: {
    header: { name: 'MediumHeader', component: MediumHeader },
    footer: { name: 'MediumFooter', component: MediumFooter },
    content: { name: 'MediumHomepage', component: MediumHomepage }
  },
  singlePost: {
    header: { name: 'MediumHeader', component: MediumHeader },
    footer: { name: 'MediumFooter', component: MediumFooter },
    content: { name: 'MediumSinglePost', component: MediumSinglePost }
  },
  archive: {
    header: { name: 'MediumHeader', component: MediumHeader },
    footer: { name: 'MediumFooter', component: MediumFooter },
    content: { name: 'MediumArchive', component: MediumArchive }
  },
  about: {
    header: { name: 'MediumHeader', component: MediumHeader },
    footer: { name: 'MediumFooter', component: MediumFooter },
    content: { name: 'MediumAbout', component: MediumAbout }
  },
  contact: {
    header: { name: 'MediumHeader', component: MediumHeader },
    footer: { name: 'MediumFooter', component: MediumFooter },
    content: { name: 'MediumContact', component: MediumContact }
  },
  category: {
    header: { name: 'MediumHeader', component: MediumHeader },
    footer: { name: 'MediumFooter', component: MediumFooter },
    content: { name: 'MediumArchive', component: MediumArchive }
  },
  tag: {
    header: { name: 'MediumHeader', component: MediumHeader },
    footer: { name: 'MediumFooter', component: MediumFooter },
    content: { name: 'MediumArchive', component: MediumArchive }
  },

  // For now, reuse some primitives from Hashnode theme where applicable via registry until Medium-specific ones are created
  postCard: { name: 'MediumPostCard', component: MediumArchive as unknown as any },
  postList: { name: 'MediumPostList', component: MediumArchive as unknown as any },
  postGrid: { name: 'MediumPostGrid', component: MediumArchive as unknown as any },
  featuredPost: { name: 'MediumFeaturedPost', component: MediumHomepage as unknown as any },
  authorCard: { name: 'MediumAuthorCard', component: MediumAbout as unknown as any },
  categoryCard: { name: 'MediumCategoryCard', component: MediumArchive as unknown as any },
  tagCloud: { name: 'MediumTagCloud', component: MediumArchive as unknown as any },
  newsletter: { name: 'MediumNewsletter', component: MediumFooter as unknown as any },
  searchBox: { name: 'MediumSearchBox', component: MediumArchive as unknown as any },
  pagination: { name: 'MediumPagination', component: MediumArchive as unknown as any },
  breadcrumb: { name: 'MediumBreadcrumb', component: MediumArchive as unknown as any },
  socialShare: { name: 'MediumSocialShare', component: MediumSinglePost as unknown as any },
  relatedPosts: { name: 'MediumRelatedPosts', component: MediumSinglePost as unknown as any },
  comments: { name: 'MediumComments', component: MediumSinglePost as unknown as any },
  tableOfContents: { name: 'MediumTableOfContents', component: MediumSinglePost as unknown as any }
};

export { mediumTheme };
export default { theme: mediumTheme, components: mediumComponents };

