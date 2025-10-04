import { ModularThemeComponents } from '../modular/types';
import { developerDarkTheme } from './theme';
import { DeveloperDarkHeader } from './Header';
import { DeveloperDarkHomepage } from './Homepage';
import { DeveloperDarkFooter } from './Footer';
import { DeveloperDarkSinglePost } from './SinglePost';
import { DeveloperDarkArchive } from './Archive';
import { DeveloperDarkAbout } from './About';
import { DeveloperDarkContact } from './Contact';

export const developerDarkComponents: ModularThemeComponents = {
  homepage: { header: { name: 'DeveloperDarkHeader', component: DeveloperDarkHeader }, footer: { name: 'DeveloperDarkFooter', component: DeveloperDarkFooter }, content: { name: 'DeveloperDarkHomepage', component: DeveloperDarkHomepage } },
  singlePost: { header: { name: 'DeveloperDarkHeader', component: DeveloperDarkHeader }, footer: { name: 'DeveloperDarkFooter', component: DeveloperDarkFooter }, content: { name: 'DeveloperDarkSinglePost', component: DeveloperDarkSinglePost } },
  archive: { header: { name: 'DeveloperDarkHeader', component: DeveloperDarkHeader }, footer: { name: 'DeveloperDarkFooter', component: DeveloperDarkFooter }, content: { name: 'DeveloperDarkArchive', component: DeveloperDarkArchive } },
  about: { header: { name: 'DeveloperDarkHeader', component: DeveloperDarkHeader }, footer: { name: 'DeveloperDarkFooter', component: DeveloperDarkFooter }, content: { name: 'DeveloperDarkAbout', component: DeveloperDarkAbout } },
  contact: { header: { name: 'DeveloperDarkHeader', component: DeveloperDarkHeader }, footer: { name: 'DeveloperDarkFooter', component: DeveloperDarkFooter }, content: { name: 'DeveloperDarkContact', component: DeveloperDarkContact } },
  category: { header: { name: 'DeveloperDarkHeader', component: DeveloperDarkHeader }, footer: { name: 'DeveloperDarkFooter', component: DeveloperDarkFooter }, content: { name: 'DeveloperDarkArchive', component: DeveloperDarkArchive } },
  tag: { header: { name: 'DeveloperDarkHeader', component: DeveloperDarkHeader }, footer: { name: 'DeveloperDarkFooter', component: DeveloperDarkFooter }, content: { name: 'DeveloperDarkArchive', component: DeveloperDarkArchive } },
  postCard: { name: 'DeveloperDarkPostCard', component: DeveloperDarkArchive as unknown as any },
  postList: { name: 'DeveloperDarkPostList', component: DeveloperDarkArchive as unknown as any },
  postGrid: { name: 'DeveloperDarkPostGrid', component: DeveloperDarkArchive as unknown as any },
  featuredPost: { name: 'DeveloperDarkFeaturedPost', component: DeveloperDarkHomepage as unknown as any },
  authorCard: { name: 'DeveloperDarkAuthorCard', component: DeveloperDarkAbout as unknown as any },
  categoryCard: { name: 'DeveloperDarkCategoryCard', component: DeveloperDarkArchive as unknown as any },
  tagCloud: { name: 'DeveloperDarkTagCloud', component: DeveloperDarkArchive as unknown as any },
  newsletter: { name: 'DeveloperDarkNewsletter', component: DeveloperDarkFooter as unknown as any },
  searchBox: { name: 'DeveloperDarkSearchBox', component: DeveloperDarkArchive as unknown as any },
  pagination: { name: 'DeveloperDarkPagination', component: DeveloperDarkArchive as unknown as any },
  breadcrumb: { name: 'DeveloperDarkBreadcrumb', component: DeveloperDarkArchive as unknown as any },
  socialShare: { name: 'DeveloperDarkSocialShare', component: DeveloperDarkSinglePost as unknown as any },
  relatedPosts: { name: 'DeveloperDarkRelatedPosts', component: DeveloperDarkSinglePost as unknown as any },
  comments: { name: 'DeveloperDarkComments', component: DeveloperDarkSinglePost as unknown as any },
  tableOfContents: { name: 'DeveloperDarkTableOfContents', component: DeveloperDarkSinglePost as unknown as any }
};

export { developerDarkTheme };
export default { theme: developerDarkTheme, components: developerDarkComponents };
