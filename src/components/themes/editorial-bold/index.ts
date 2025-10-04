import { ModularThemeComponents } from '../modular/types';
import { editorialBoldTheme } from './theme';
import { EditorialBoldHeader } from './Header';
import { EditorialBoldHomepage } from './Homepage';
import { EditorialBoldFooter } from './Footer';
import { EditorialBoldSinglePost } from './SinglePost';
import { EditorialBoldArchive } from './Archive';
import { EditorialBoldAbout } from './About';
import { EditorialBoldContact } from './Contact';

export const editorialBoldComponents: ModularThemeComponents = {
  homepage: { header: { name: 'EditorialBoldHeader', component: EditorialBoldHeader }, footer: { name: 'EditorialBoldFooter', component: EditorialBoldFooter }, content: { name: 'EditorialBoldHomepage', component: EditorialBoldHomepage } },
  singlePost: { header: { name: 'EditorialBoldHeader', component: EditorialBoldHeader }, footer: { name: 'EditorialBoldFooter', component: EditorialBoldFooter }, content: { name: 'EditorialBoldSinglePost', component: EditorialBoldSinglePost } },
  archive: { header: { name: 'EditorialBoldHeader', component: EditorialBoldHeader }, footer: { name: 'EditorialBoldFooter', component: EditorialBoldFooter }, content: { name: 'EditorialBoldArchive', component: EditorialBoldArchive } },
  about: { header: { name: 'EditorialBoldHeader', component: EditorialBoldHeader }, footer: { name: 'EditorialBoldFooter', component: EditorialBoldFooter }, content: { name: 'EditorialBoldAbout', component: EditorialBoldAbout } },
  contact: { header: { name: 'EditorialBoldHeader', component: EditorialBoldHeader }, footer: { name: 'EditorialBoldFooter', component: EditorialBoldFooter }, content: { name: 'EditorialBoldContact', component: EditorialBoldContact } },
  category: { header: { name: 'EditorialBoldHeader', component: EditorialBoldHeader }, footer: { name: 'EditorialBoldFooter', component: EditorialBoldFooter }, content: { name: 'EditorialBoldArchive', component: EditorialBoldArchive } },
  tag: { header: { name: 'EditorialBoldHeader', component: EditorialBoldHeader }, footer: { name: 'EditorialBoldFooter', component: EditorialBoldFooter }, content: { name: 'EditorialBoldArchive', component: EditorialBoldArchive } },
  postCard: { name: 'EditorialBoldPostCard', component: EditorialBoldArchive as unknown as any },
  postList: { name: 'EditorialBoldPostList', component: EditorialBoldArchive as unknown as any },
  postGrid: { name: 'EditorialBoldPostGrid', component: EditorialBoldArchive as unknown as any },
  featuredPost: { name: 'EditorialBoldFeaturedPost', component: EditorialBoldHomepage as unknown as any },
  authorCard: { name: 'EditorialBoldAuthorCard', component: EditorialBoldAbout as unknown as any },
  categoryCard: { name: 'EditorialBoldCategoryCard', component: EditorialBoldArchive as unknown as any },
  tagCloud: { name: 'EditorialBoldTagCloud', component: EditorialBoldArchive as unknown as any },
  newsletter: { name: 'EditorialBoldNewsletter', component: EditorialBoldFooter as unknown as any },
  searchBox: { name: 'EditorialBoldSearchBox', component: EditorialBoldArchive as unknown as any },
  pagination: { name: 'EditorialBoldPagination', component: EditorialBoldArchive as unknown as any },
  breadcrumb: { name: 'EditorialBoldBreadcrumb', component: EditorialBoldArchive as unknown as any },
  socialShare: { name: 'EditorialBoldSocialShare', component: EditorialBoldSinglePost as unknown as any },
  relatedPosts: { name: 'EditorialBoldRelatedPosts', component: EditorialBoldSinglePost as unknown as any },
  comments: { name: 'EditorialBoldComments', component: EditorialBoldSinglePost as unknown as any },
  tableOfContents: { name: 'EditorialBoldTableOfContents', component: EditorialBoldSinglePost as unknown as any }
};

export { editorialBoldTheme };
export default { theme: editorialBoldTheme, components: editorialBoldComponents };
