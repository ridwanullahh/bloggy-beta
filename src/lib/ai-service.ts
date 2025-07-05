
// AI Service for content generation using Chutes AI with Gemini fallback
export class AIService {
  private chutesApiKey: string;
  private geminiApiKey: string;

  constructor() {
    this.chutesApiKey = process.env.CHUTES_API_TOKEN || '';
    this.geminiApiKey = process.env.GEMINI_API_KEY || '';
  }

  async generateContent(prompt: string, type: 'post' | 'title' | 'summary' | 'seo' = 'post'): Promise<string> {
    try {
      return await this.generateWithChutes(prompt, type);
    } catch (error) {
      console.warn('Chutes AI failed, falling back to Gemini:', error);
      return await this.generateWithGemini(prompt, type);
    }
  }

  private async generateWithChutes(prompt: string, type: string): Promise<string> {
    const systemPrompts = {
      post: 'You are a professional blog writer. Create engaging, well-structured blog content with proper headings, paragraphs, and flow.',
      title: 'You are a creative title generator. Create compelling, SEO-friendly blog titles.',
      summary: 'You are a content summarizer. Create concise, engaging summaries that capture the essence of the content.',
      seo: 'You are an SEO expert. Generate meta descriptions, keywords, and SEO-optimized content.'
    };

    const response = await fetch('https://llm.chutes.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.chutesApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-V3-0324',
        messages: [
          {
            role: 'system',
            content: systemPrompts[type as keyof typeof systemPrompts]
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        stream: false,
        max_tokens: 2048,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`Chutes AI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }

  private async generateWithGemini(prompt: string, type: string): Promise<string> {
    const systemPrompts = {
      post: 'Create engaging, well-structured blog content with proper headings and flow.',
      title: 'Generate compelling, SEO-friendly blog titles.',
      summary: 'Create concise, engaging summaries.',
      seo: 'Generate SEO-optimized meta descriptions and keywords.'
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompts[type as keyof typeof systemPrompts]}\n\n${prompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || '';
  }

  async generateBlogPost(topic: string, keywords?: string[], tone: 'professional' | 'casual' | 'technical' = 'professional'): Promise<{
    title: string;
    content: string;
    excerpt: string;
    seo: {
      metaTitle: string;
      metaDescription: string;
      keywords: string[];
    };
  }> {
    const keywordText = keywords ? `Keywords to include: ${keywords.join(', ')}` : '';
    const prompt = `Write a comprehensive blog post about "${topic}". ${keywordText} Use a ${tone} tone. Structure it with proper headings and engaging content.`;

    const [title, content, excerpt, seoData] = await Promise.all([
      this.generateContent(`Generate a compelling title for a blog post about "${topic}"`, 'title'),
      this.generateContent(prompt, 'post'),
      this.generateContent(`Create a brief excerpt for a blog post about "${topic}"`, 'summary'),
      this.generateContent(`Generate SEO meta description and keywords for "${topic}"`, 'seo')
    ]);

    // Parse SEO data (simplified)
    const seoLines = seoData.split('\n');
    const metaDescription = seoLines.find(line => line.includes('description'))?.split(':')[1]?.trim() || excerpt.substring(0, 160);
    const keywordLine = seoLines.find(line => line.includes('keywords'))?.split(':')[1]?.trim() || '';
    const seoKeywords = keywordLine ? keywordLine.split(',').map(k => k.trim()) : keywords || [];

    return {
      title: title.replace(/^["']|["']$/g, ''), // Remove quotes
      content,
      excerpt,
      seo: {
        metaTitle: title.substring(0, 60),
        metaDescription,
        keywords: seoKeywords
      }
    };
  }

  async improveSEO(content: string, targetKeywords: string[]): Promise<{
    optimizedContent: string;
    suggestions: string[];
  }> {
    const prompt = `Optimize this content for SEO with keywords: ${targetKeywords.join(', ')}. Content: ${content}`;
    
    const optimizedContent = await this.generateContent(prompt, 'seo');
    
    return {
      optimizedContent,
      suggestions: [
        'Add more internal links',
        'Include target keywords in headings',
        'Optimize meta description',
        'Add alt text to images'
      ]
    };
  }

  async generateSocialMediaPosts(blogTitle: string, excerpt: string): Promise<{
    twitter: string;
    facebook: string;
    linkedin: string;
  }> {
    const [twitter, facebook, linkedin] = await Promise.all([
      this.generateContent(`Create a Twitter post for blog: "${blogTitle}". Excerpt: ${excerpt}`, 'summary'),
      this.generateContent(`Create a Facebook post for blog: "${blogTitle}". Excerpt: ${excerpt}`, 'summary'),
      this.generateContent(`Create a LinkedIn post for blog: "${blogTitle}". Excerpt: ${excerpt}`, 'summary')
    ]);

    return {
      twitter: twitter.substring(0, 280),
      facebook,
      linkedin
    };
  }
}

export const aiService = new AIService();
