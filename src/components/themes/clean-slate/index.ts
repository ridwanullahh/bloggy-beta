import { ModularThemeComponents } from '../modular/types';
import { cleanSlateTheme } from './theme';
import { CleanSlateHeader } from './Header';
import { CleanSlateHomepage } from './Homepage';
import { CleanSlateFooter } from './Footer';
import { CleanSlateSinglePost } from './SinglePost';
import { CleanSlateArchive } from './Archive';
import { CleanSlateAbout } from './About';
import { CleanSlateContact } from './Contact';

export const cleanSlateComponents: ModularThemeComponents = {
  homepage: { header: { name: 'CleanSlateHeader', component: CleanSlateHeader }, footer: { name: 'CleanSlateFooter', component: CleanSlateFooter }, content: { name: 'CleanSlateHomepage', component: CleanSlateHomepage } },
  singlePost: { header: { name: 'CleanSlateHeader', component: CleanSlateHeader }, footer: { name: 'CleanSlateFooter', component: CleanSlateFooter }, content: { name: 'CleanSlateSinglePost', component: CleanSlateSinglePost } },
  archive: { header: { name: 'CleanSlateHeader', component: CleanSlateHeader }, footer: { name: 'CleanSlateFooter', component: CleanSlateFooter }, content: { name: 'CleanSlateArchive', component: CleanSlateArchive } },
  about: { header: { name: 'CleanSlateHeader', component: CleanSlateHeader }, footer: { name: 'CleanSlateFooter', component: CleanSlateFooter }, content: { name: 'CleanSlateAbout', component: CleanSlateAbout } },
  contact: { header: { name: 'CleanSlateHeader', component: CleanSlateHeader }, footer: { name: 'CleanSlateFooter', component: CleanSlateFooter }, content: { name: 'CleanSlateContact', component: CleanSlateContact } },
  category: { header: { name: 'CleanSlateHeader', component: CleanSlateHeader }, footer: { name: 'CleanSlateFooter', component: CleanSlateFooter }, content: { name: 'CleanSlateArchive', component: CleanSlateArchive } },
  tag: { header: { name: 'CleanSlateHeader', component: CleanSlateHeader }, footer: { name: 'CleanSlateFooter', component: CleanSlateFooter }, content: { name: 'CleanSlateArchive', component: CleanSlateArchive } },
  postCard: { name: 'CleanSlatePostCard', component: CleanSlateArchive as unknown as any },
  postList: { name: 'CleanSlatePostList', component: CleanSlateArchive as unknown as any },
  postGrid: { name: 'CleanSlatePostGrid', component: CleanSlateArchive as unknown as any },
  featuredPost: { name: 'CleanSlateFeaturedPost', component: CleanSlateHomepage as unknown as any },
  authorCard: { name: 'CleanSlateAuthorCard', component: CleanSlateAbout as unknown as any },
  categoryCard: { name: 'CleanSlateCategoryCard', component: CleanSlateArchive as unknown as any },
  tagCloud: { name: 'CleanSlateTagCloud', component: CleanSlateArchive as unknown as any },
  newsletter: { name: 'CleanSlateNewsletter', component: CleanSlateFooter as unknown as any },
  searchBox: { name: 'CleanSlateSearchBox', component: CleanSlateArchive as unknown as any },
  pagination: { name: 'CleanSlatePagination', component: CleanSlateArchive as unknown as any },
  breadcrumb: { name: 'CleanSlateBreadcrumb', component: CleanSlateArchive as unknown as any },
  socialShare: { name: 'CleanSlateSocialShare', component: CleanSlateSinglePost as unknown as any },
  relatedPosts: { name: 'CleanSlateRelatedPosts', component: CleanSlateSinglePost as unknown as any },
  comments: { name: 'CleanSlateComments', component: CleanSlateSinglePost as unknown as any },
  tableOfContents: { name: 'CleanSlateTableOfContents', component: CleanSlateSinglePost as unknown as any }
};

export { cleanSlateTheme };
export default { theme: cleanSlateTheme, components: cleanSlateComponents };
