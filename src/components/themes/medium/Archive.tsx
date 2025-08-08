import React, { useMemo, useState } from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Search, Grid, List, Tag } from 'lucide-react';

interface MediumArchiveProps {
  posts: any[];
  categories: any[];
  tags: any[];
  onPostClick: (post: any) => void;
}

export const MediumArchive: React.FC<MediumArchiveProps> = ({ posts, categories, tags, onPostClick }) => {
  const { blog } = useTheme();
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [category, setCategory] = useState<string>('all');
  const [tag, setTag] = useState<string>('all');

  const filtered = useMemo(() => {
    return posts
      .filter((p) => {
        const matchesQuery = (p.title + ' ' + p.content).toLowerCase().includes(query.toLowerCase());
        const matchesCat = category === 'all' || p.category === category;
        const matchesTag = tag === 'all' || (p.tags || []).includes(tag);
        return matchesQuery && matchesCat && matchesTag;
      })
      .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
  }, [posts, query, category, tag]);

  const truncate = (html: string, n = 140) => html.replace(/<[^>]*>/g, '').slice(0, n) + (html.length > n ? '...' : '');

  return (
    <div className="medium-archive">
      {/* Header */}
      <section className="py-12 border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif' }}>Stories</h1>
          <p className="opacity-80 mb-6">Explore all articles from {blog.title}. Find exactly what you're looking for.</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search stories"
                  className="w-full pl-10 pr-4 py-3 rounded-md border focus:outline-none focus:ring-2"
                  aria-label="Search articles"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button className={`px-3 py-2 rounded-md border text-sm ${view === 'grid' ? 'opacity-100' : 'opacity-70'}`} onClick={() => setView('grid')} aria-pressed={view==='grid'}>
                <Grid className="w-4 h-4" />
              </button>
              <button className={`px-3 py-2 rounded-md border text-sm ${view === 'list' ? 'opacity-100' : 'opacity-70'}`} onClick={() => setView('list')} aria-pressed={view==='list'}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-4 flex flex-wrap gap-3">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 rounded-md border text-sm">
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
            <select value={tag} onChange={(e) => setTag(e.target.value)} className="px-3 py-2 rounded-md border text-sm">
              <option value="all">All tags</option>
              {tags.map((t) => (
                <option key={t.id} value={t.name}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="opacity-80">No articles found.</p>
          ) : (
            <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : 'space-y-8'}>
              {filtered.map((post) => (
                <article key={post.id} className="cursor-pointer" onClick={() => onPostClick(post)}>
                  <h3 className="text-xl font-semibold leading-snug mb-2 hover:underline">{post.title}</h3>
                  <p className="opacity-80 mb-3">{truncate(post.excerpt || post.content)}</p>
                  <div className="flex items-center gap-2 text-sm opacity-70">
                    <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>·</span>
                    <span>{Math.ceil(post.content.replace(/<[^>]*>/g, '').split(' ').length / 200)} min read</span>
                  </div>
                  {post.tags?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tg: string) => (
                        <span key={tg} className="inline-flex items-center px-2 py-1 rounded-full border text-xs">
                          <Tag className="w-3 h-3 mr-1" /> {tg}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .medium-archive { font-family: var(--theme-font-family); color: var(--theme-color-text); }
        .medium-archive section { border-color: var(--theme-color-border); }
        .medium-archive input, .medium-archive select, .medium-archive button { border-color: var(--theme-color-border); background: var(--theme-color-surface); color: var(--theme-color-text); }
        .medium-archive a, .medium-archive .hover\:underline:hover { color: var(--theme-color-text); }
        .medium-archive a:hover { color: var(--theme-color-primary); }
      `}</style>
    </div>
  );
};

export default MediumArchive;

