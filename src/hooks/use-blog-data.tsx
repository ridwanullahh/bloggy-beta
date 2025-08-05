import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Blog, Post, Category, Tag } from '../types/blog';
import enhancedSDK from '../lib/enhanced-sdk';

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
        const [allBlogs, allPosts, allCategories, allTags] = await Promise.all([
          enhancedSDK.get<Blog>('blogs'),
          enhancedSDK.get<Post>('posts'),
          enhancedSDK.get<Category>('categories'),
          enhancedSDK.get<Tag>('tags')
        ]);

        const foundBlog = allBlogs.find(b => b.slug === blogSlug && b.status === 'active');
        
        if (!foundBlog) {
          setBlog(null);
          setLoading(false);
          return;
        }

        setBlog(foundBlog);

        const blogPosts = allPosts
          .filter(p => p.blogId === foundBlog.id && p.status === 'published')
          .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
        
        const blogCategories = allCategories.filter(c => c.blogId === foundBlog.id);
        const blogTags = allTags.filter(t => t.blogId === foundBlog.id);

        setPosts(blogPosts);
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