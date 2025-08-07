import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Blog, Post, Category, Tag } from '../types/blog';
import enhancedSDK from '../lib/enhanced-sdk';
import { performanceCache, CacheKeys } from '../lib/performance-cache';

export const useBlogData = () => {
  const { blogSlug } = useParams<{ blogSlug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!blogSlug) return;

      try {
        // Use optimized caching methods
        const blog = await enhancedSDK.getBlog(blogSlug);

        if (!blog || blog.status !== 'active') {
          setBlog(null);
          setLoading(false);
          return;
        }

        setBlog(blog);

        // Fetch related data in parallel using cached methods
        const [blogPosts, blogCategories, blogTags] = await Promise.all([
          enhancedSDK.getBlogPosts(blog.id, { status: 'published' }),
          enhancedSDK.getBlogCategories(blog.id),
          enhancedSDK.getBlogTags(blog.id)
        ]);

        // Sort posts by date
        const sortedPosts = blogPosts.sort((a, b) =>
          new Date(b.publishedAt || b.createdAt).getTime() -
          new Date(a.publishedAt || a.createdAt).getTime()
        );

        setPosts(sortedPosts);
        setCategories(blogCategories);
        setTags(blogTags);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();

    const unsubscribe = enhancedSDK.subscribe('blogs', (data) => {
      if (data.type === 'update' || data.type === 'refresh') {
        const updatedBlog = Array.isArray(data.data) 
          ? data.data.find((b: Blog) => b.slug === blogSlug)
          : data.data.slug === blogSlug ? data.data : null;
        
        if (updatedBlog) {
          setBlog(updatedBlog);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [blogSlug]);

  return { blog, posts, categories, tags, loading, blogSlug };
};