import { ModularThemeComponents } from '../modular/types';
import { lifestyleChicTheme } from './theme';
import { LifestyleChicHeader } from './Header';
import { LifestyleChicHomepage } from './Homepage';
import { LifestyleChicFooter } from './Footer';
import { LifestyleChicSinglePost } from './SinglePost';
import { LifestyleChicArchive } from './Archive';
import { LifestyleChicAbout } from './About';
import { LifestyleChicContact } from './Contact';

export const lifestyleChicComponents: ModularThemeComponents = {
  homepage: { header: { name: 'LifestyleChicHeader', component: LifestyleChicHeader }, footer: { name: 'LifestyleChicFooter', component: LifestyleChicFooter }, content: { name: 'LifestyleChicHomepage', component: LifestyleChicHomepage } },
  singlePost: { header: { name: 'LifestyleChicHeader', component: LifestyleChicHeader }, footer: { name: 'LifestyleChicFooter', component: LifestyleChicFooter }, content: { name: 'LifestyleChicSinglePost', component: LifestyleChicSinglePost } },
  archive: { header: { name: 'LifestyleChicHeader', component: LifestyleChicHeader }, footer: { name: 'LifestyleChicFooter', component: LifestyleChicFooter }, content: { name: 'LifestyleChicArchive', component: LifestyleChicArchive } },
  about: { header: { name: 'LifestyleChicHeader', component: LifestyleChicHeader }, footer: { name: 'LifestyleChicFooter', component: LifestyleChicFooter }, content: { name: 'LifestyleChicAbout', component: LifestyleChicAbout } },
  contact: { header: { name: 'LifestyleChicHeader', component: LifestyleChicHeader }, footer: { name: 'LifestyleChicFooter', component: LifestyleChicFooter }, content: { name: 'LifestyleChicContact', component: LifestyleChicContact } },
  category: { header: { name: 'LifestyleChicHeader', component: LifestyleChicHeader }, footer: { name: 'LifestyleChicFooter', component: LifestyleChicFooter }, content: { name: 'LifestyleChicArchive', component: LifestyleChicArchive } },
  tag: { header: { name: 'LifestyleChicHeader', component: LifestyleChicHeader }, footer: { name: 'LifestyleChicFooter', component: LifestyleChicFooter }, content: { name: 'LifestyleChicArchive', component: LifestyleChicArchive } },
  postCard: { name: 'LifestyleChicPostCard', component: LifestyleChicArchive as unknown as any },
  postList: { name: 'LifestyleChicPostList', component: LifestyleChicArchive as unknown as any },
  postGrid: { name: 'LifestyleChicPostGrid', component: LifestyleChicArchive as unknown as any },
  featuredPost: { name: 'LifestyleChicFeaturedPost', component: LifestyleChicHomepage as unknown as any },
  authorCard: { name: 'LifestyleChicAuthorCard', component: LifestyleChicAbout as unknown as any },
  categoryCard: { name: 'LifestyleChicCategoryCard', component: LifestyleChicArchive as unknown as any },
  tagCloud: { name: 'LifestyleChicTagCloud', component: LifestyleChicArchive as unknown as any },
  newsletter: { name: 'LifestyleChicNewsletter', component: LifestyleChicFooter as unknown as any },
  searchBox: { name: 'LifestyleChicSearchBox', component: LifestyleChicArchive as unknown as any },
  pagination: { name: 'LifestyleChicPagination', component: LifestyleChicArchive as unknown as any },
  breadcrumb: { name: 'LifestyleChicBreadcrumb', component: LifestyleChicArchive as unknown as any },
  socialShare: { name: 'LifestyleChicSocialShare', component: LifestyleChicSinglePost as unknown as any },
  relatedPosts: { name: 'LifestyleChicRelatedPosts', component: LifestyleChicSinglePost as unknown as any },
  comments: { name: 'LifestyleChicComments', component: LifestyleChicSinglePost as unknown as any },
  tableOfContents: { name: 'LifestyleChicTableOfContents', component: LifestyleChicSinglePost as unknown as any }
};

export { lifestyleChicTheme };
export default { theme: lifestyleChicTheme, components: lifestyleChicComponents };
