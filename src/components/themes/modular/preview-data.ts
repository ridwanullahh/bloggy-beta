import { ThemePreviewData } from './types';

// Shariah-compliant dummy content for theme previews
export const themePreviewData: ThemePreviewData = {
  blog: {
    title: 'Knowledge & Wisdom',
    description: 'Sharing insights on technology, personal development, and meaningful living',
    author: 'Ahmad Rahman',
    logo: undefined
  },
  
  posts: [
    {
      id: '1',
      title: 'The Art of Mindful Programming',
      excerpt: 'Exploring how mindfulness principles can improve our approach to software development and create more meaningful code.',
      content: `
        <p>In our fast-paced world of software development, we often rush from one feature to the next, one bug fix to another. But what if we approached programming with the same mindfulness we bring to other important aspects of our lives?</p>
        
        <h2>What is Mindful Programming?</h2>
        <p>Mindful programming is about being fully present and intentional in our coding practice. It means taking time to understand the problem deeply before jumping to solutions.</p>
        
        <h3>Key Principles</h3>
        <ul>
          <li>Focus on one task at a time</li>
          <li>Write code with clear intention</li>
          <li>Take regular breaks for reflection</li>
          <li>Consider the long-term impact of your decisions</li>
        </ul>
        
        <blockquote>
          "The best code is not just functional, but also reflects the clarity of thought of its creator."
        </blockquote>
        
        <p>When we program mindfully, we create software that is not only more reliable and maintainable, but also more aligned with our values and the needs of those who will use it.</p>
      `,
      author: 'Ahmad Rahman',
      publishedAt: '2024-01-15',
      readTime: '8 min read',
      tags: ['Programming', 'Mindfulness', 'Development'],
      category: 'Technology',
      featuredImage: undefined,
      likes: 42,
      comments: 8
    },
    
    {
      id: '2',
      title: 'Building Sustainable Habits for Success',
      excerpt: 'Small, consistent actions compound over time to create remarkable results. Learn how to build habits that last.',
      content: `
        <p>Success is not about grand gestures or overnight transformations. It's about the small, consistent actions we take every day that compound over time.</p>
        
        <h2>The Power of Compound Growth</h2>
        <p>Just as money grows through compound interest, our skills and achievements grow through compound effort. A 1% improvement each day leads to being 37 times better over a year.</p>
        
        <h3>Steps to Build Lasting Habits</h3>
        <ol>
          <li>Start incredibly small</li>
          <li>Attach new habits to existing ones</li>
          <li>Design your environment for success</li>
          <li>Track your progress</li>
          <li>Celebrate small wins</li>
        </ol>
        
        <p>Remember, the goal is not perfection but consistency. Focus on showing up every day, even if it's just for a few minutes.</p>
      `,
      author: 'Ahmad Rahman',
      publishedAt: '2024-01-12',
      readTime: '6 min read',
      tags: ['Habits', 'Personal Development', 'Success'],
      category: 'Personal Development',
      featuredImage: undefined,
      likes: 67,
      comments: 15
    },
    
    {
      id: '3',
      title: 'The Ethics of Artificial Intelligence',
      excerpt: 'As AI becomes more prevalent, we must consider the ethical implications and ensure technology serves humanity.',
      content: `
        <p>Artificial Intelligence is transforming our world at an unprecedented pace. With this power comes great responsibility to ensure AI serves humanity's best interests.</p>
        
        <h2>Key Ethical Considerations</h2>
        <p>As we develop and deploy AI systems, we must carefully consider their impact on society, privacy, and human dignity.</p>
        
        <h3>Principles for Ethical AI</h3>
        <ul>
          <li>Transparency and explainability</li>
          <li>Fairness and non-discrimination</li>
          <li>Privacy and data protection</li>
          <li>Human oversight and control</li>
          <li>Beneficial outcomes for society</li>
        </ul>
        
        <p>The future of AI depends not just on technical advancement, but on our commitment to developing it responsibly.</p>
      `,
      author: 'Ahmad Rahman',
      publishedAt: '2024-01-10',
      readTime: '10 min read',
      tags: ['AI', 'Ethics', 'Technology'],
      category: 'Technology',
      featuredImage: undefined,
      likes: 89,
      comments: 23
    },
    
    {
      id: '4',
      title: 'Finding Balance in a Digital World',
      excerpt: 'Technology should enhance our lives, not consume them. Discover strategies for maintaining digital wellness.',
      content: `
        <p>In our hyperconnected world, finding balance between digital engagement and real-world presence has become crucial for our well-being.</p>
        
        <h2>The Challenge of Digital Overwhelm</h2>
        <p>Constant notifications, endless scrolling, and the pressure to stay connected can lead to stress, anxiety, and a sense of being overwhelmed.</p>
        
        <h3>Strategies for Digital Wellness</h3>
        <ul>
          <li>Set specific times for checking devices</li>
          <li>Create tech-free zones in your home</li>
          <li>Practice mindful consumption of content</li>
          <li>Prioritize face-to-face interactions</li>
          <li>Use technology intentionally, not habitually</li>
        </ul>
        
        <p>Remember, technology is a tool. The key is to use it purposefully to enhance your life rather than letting it control you.</p>
      `,
      author: 'Ahmad Rahman',
      publishedAt: '2024-01-08',
      readTime: '7 min read',
      tags: ['Digital Wellness', 'Balance', 'Mindfulness'],
      category: 'Personal Development',
      featuredImage: undefined,
      likes: 54,
      comments: 12
    },
    
    {
      id: '5',
      title: 'The Future of Remote Work',
      excerpt: 'Remote work is here to stay. Learn how to thrive in a distributed work environment and build meaningful connections.',
      content: `
        <p>The pandemic accelerated the adoption of remote work, and it's clear that this shift is permanent for many organizations and workers.</p>
        
        <h2>Benefits and Challenges</h2>
        <p>Remote work offers flexibility and eliminates commutes, but it also presents challenges in communication, collaboration, and work-life balance.</p>
        
        <h3>Keys to Remote Work Success</h3>
        <ol>
          <li>Establish clear boundaries</li>
          <li>Invest in good communication tools</li>
          <li>Create a dedicated workspace</li>
          <li>Maintain regular schedules</li>
          <li>Prioritize team connection</li>
        </ol>
        
        <p>The future of work is flexible, but success still requires intention, discipline, and strong relationships with colleagues.</p>
      `,
      author: 'Ahmad Rahman',
      publishedAt: '2024-01-05',
      readTime: '9 min read',
      tags: ['Remote Work', 'Future of Work', 'Productivity'],
      category: 'Technology',
      featuredImage: undefined,
      likes: 76,
      comments: 19
    }
  ],
  
  categories: [
    { id: '1', name: 'Technology', count: 15 },
    { id: '2', name: 'Personal Development', count: 12 },
    { id: '3', name: 'Productivity', count: 8 },
    { id: '4', name: 'Mindfulness', count: 6 },
    { id: '5', name: 'Career', count: 5 },
    { id: '6', name: 'Learning', count: 4 }
  ],
  
  tags: [
    { id: '1', name: 'Programming', count: 8 },
    { id: '2', name: 'AI', count: 6 },
    { id: '3', name: 'Habits', count: 5 },
    { id: '4', name: 'Mindfulness', count: 7 },
    { id: '5', name: 'Remote Work', count: 4 },
    { id: '6', name: 'Ethics', count: 3 },
    { id: '7', name: 'Balance', count: 5 },
    { id: '8', name: 'Success', count: 6 }
  ]
};

export default themePreviewData;
