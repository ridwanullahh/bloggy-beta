/**
 * Database initialization script
 * Runs once on application startup to verify and create missing database files
 */

interface InitStatus {
  isInitialized: boolean;
  timestamp: number;
}

const INIT_FLAG_KEY = 'db_init_status';
const INIT_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

class DatabaseInitializer {
  private owner: string;
  private repo: string;
  private token: string;
  private branch: string;
  private basePath: string;

  constructor() {
    this.owner = import.meta.env.VITE_GITHUB_OWNER;
    this.repo = import.meta.env.VITE_GITHUB_REPO;
    this.token = import.meta.env.VITE_GITHUB_TOKEN;
    this.branch = 'main';
    this.basePath = 'db';
  }

  private headers(): Record<string, string> {
    return {
      Authorization: `token ${this.token}`,
      'Content-Type': 'application/json',
    };
  }

  private async request(path: string, method: string = 'GET', body: any = null): Promise<any> {
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}${method === 'GET' ? `?ref=${this.branch}` : ''}`;
    
    const response = await fetch(url, {
      method,
      headers: this.headers(),
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub API Error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  private async checkFileExists(filePath: string): Promise<{ exists: boolean; sha?: string }> {
    try {
      const response = await this.request(filePath);
      return { exists: true, sha: response.sha };
    } catch (error: any) {
      if (error.message.includes('404')) {
        return { exists: false };
      }
      throw error;
    }
  }

  private getDefaultThemesData() {
    // Only include fully implemented themes with complete component sets
    return [
      {
        id: "hashnode",
        uid: crypto.randomUUID(),
        name: "Hashnode",
        description: "Modern, clean design inspired by Hashnode",
        preview: "/themes/hashnode.jpg",
        category: "professional",
        styles: {
          colors: {
            primary: "#05B34D",
            secondary: "#FFFFFF",
            accent: "#F2B91C",
            background: "#FFFFFF",
            surface: "#E9FBF1",
            text: "#181F25",
            textSecondary: "#64748B",
            border: "#E2E8F0"
          },
          typography: {
            fontFamily: "Inter, sans-serif",
            headingFont: "Inter, sans-serif",
            codeFont: "JetBrains Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "medium",
        uid: crypto.randomUUID(),
        name: "Medium",
        description: "Clean, content-focused design inspired by Medium",
        preview: "/themes/medium.jpg",
        category: "minimal",
        styles: {
          colors: {
            primary: "#3B82F6",
            secondary: "#F8FAFC",
            accent: "#8B5CF6",
            background: "#FFFFFF",
            surface: "#F1F5F9",
            text: "#0F172A",
            textSecondary: "#64748B",
            border: "#CBD5E1"
          },
          typography: {
            fontFamily: "Inter, sans-serif",
            headingFont: "Inter, sans-serif",
            codeFont: "Fira Code, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "medium",
        uid: crypto.randomUUID(),
        name: "Medium",
        description: "Clean, content-focused design inspired by Medium",
        preview: "/themes/medium.jpg",
        category: "minimal",
        styles: {
          colors: {
            primary: "#1A8917",
            secondary: "#FFFFFF",
            accent: "#FFC017",
            background: "#FFFFFF",
            surface: "#F7F4ED",
            text: "#242424",
            textSecondary: "#757575",
            border: "#E6E6E6"
          },
          typography: {
            fontFamily: "Charter, Georgia, serif",
            headingFont: "sohne, Helvetica Neue, sans-serif",
            codeFont: "Menlo, Monaco, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "creative-magazine",
        uid: crypto.randomUUID(),
        name: "Creative Magazine",
        description: "Bold, magazine-style layout with dynamic typography",
        preview: "/themes/creative-magazine.jpg",
        category: "magazine",
        styles: {
          colors: {
            primary: "#E11D48",
            secondary: "#FEF2F2",
            accent: "#F59E0B",
            background: "#FFFFFF",
            surface: "#F9FAFB",
            text: "#111827",
            textSecondary: "#6B7280",
            border: "#E5E7EB"
          },
          typography: {
            fontFamily: "Playfair Display, Georgia, serif",
            headingFont: "Playfair Display, Georgia, serif",
            codeFont: "JetBrains Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "professional-corporate",
        uid: crypto.randomUUID(),
        name: "Professional Corporate",
        description: "Clean, professional design for business blogs",
        preview: "/themes/professional-corporate.jpg",
        category: "professional",
        styles: {
          colors: {
            primary: "#1E40AF",
            secondary: "#F8FAFC",
            accent: "#059669",
            background: "#FFFFFF",
            surface: "#F1F5F9",
            text: "#0F172A",
            textSecondary: "#64748B",
            border: "#CBD5E1"
          },
          typography: {
            fontFamily: "Source Sans Pro, sans-serif",
            headingFont: "Source Sans Pro, sans-serif",
            codeFont: "Source Code Pro, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "tech-corporate",
        uid: crypto.randomUUID(),
        name: "Tech Corporate",
        description: "Modern corporate design for technology companies",
        preview: "/themes/tech-corporate.jpg",
        category: "professional",
        styles: {
          colors: {
            primary: "#0EA5E9",
            secondary: "#F0F9FF",
            accent: "#F59E0B",
            background: "#FFFFFF",
            surface: "#F8FAFC",
            text: "#0F172A",
            textSecondary: "#64748B",
            border: "#CBD5E1"
          },
          typography: {
            fontFamily: "Roboto, sans-serif",
            headingFont: "Roboto, sans-serif",
            codeFont: "Roboto Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "finance-trust",
        uid: crypto.randomUUID(),
        name: "Finance Trust",
        description: "Professional design for financial and banking blogs",
        preview: "/themes/finance-trust.jpg",
        category: "professional",
        styles: {
          colors: {
            primary: "#166534",
            secondary: "#F0FDF4",
            accent: "#D97706",
            background: "#FFFFFF",
            surface: "#F9FAFB",
            text: "#1F2937",
            textSecondary: "#6B7280",
            border: "#D1D5DB"
          },
          typography: {
            fontFamily: "Merriweather, Georgia, serif",
            headingFont: "Lato, sans-serif",
            codeFont: "Courier New, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "legal-authority",
        uid: crypto.randomUUID(),
        name: "Legal Authority",
        description: "Authoritative design for law firms and legal blogs",
        preview: "/themes/legal-authority.jpg",
        category: "professional",
        styles: {
          colors: {
            primary: "#1E3A8A",
            secondary: "#EFF6FF",
            accent: "#92400E",
            background: "#FFFFFF",
            surface: "#F9FAFB",
            text: "#1F2937",
            textSecondary: "#6B7280",
            border: "#D1D5DB"
          },
          typography: {
            fontFamily: "Georgia, serif",
            headingFont: "Playfair Display, serif",
            codeFont: "Courier New, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "medical-care",
        uid: crypto.randomUUID(),
        name: "Medical Care",
        description: "Clean, trustworthy design for healthcare blogs",
        preview: "/themes/medical-care.jpg",
        category: "professional",
        styles: {
          colors: {
            primary: "#0891B2",
            secondary: "#ECFEFF",
            accent: "#DC2626",
            background: "#FFFFFF",
            surface: "#F9FAFB",
            text: "#1F2937",
            textSecondary: "#6B7280",
            border: "#E5E7EB"
          },
          typography: {
            fontFamily: "Open Sans, sans-serif",
            headingFont: "Montserrat, sans-serif",
            codeFont: "Monaco, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "education-bright",
        uid: crypto.randomUUID(),
        name: "Education Bright",
        description: "Bright, engaging design for educational content",
        preview: "/themes/education-bright.jpg",
        category: "professional",
        styles: {
          colors: {
            primary: "#7C3AED",
            secondary: "#FAF5FF",
            accent: "#F59E0B",
            background: "#FFFFFF",
            surface: "#F9FAFB",
            text: "#1F2937",
            textSecondary: "#6B7280",
            border: "#E5E7EB"
          },
          typography: {
            fontFamily: "Nunito, sans-serif",
            headingFont: "Poppins, sans-serif",
            codeFont: "Fira Code, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "consulting-pro",
        uid: crypto.randomUUID(),
        name: "Consulting Pro",
        description: "Professional design for consulting and advisory blogs",
        preview: "/themes/consulting-pro.jpg",
        category: "professional",
        styles: {
          colors: {
            primary: "#047857",
            secondary: "#ECFDF5",
            accent: "#DC2626",
            background: "#FFFFFF",
            surface: "#F9FAFB",
            text: "#1F2937",
            textSecondary: "#6B7280",
            border: "#D1D5DB"
          },
          typography: {
            fontFamily: "IBM Plex Sans, sans-serif",
            headingFont: "IBM Plex Sans, sans-serif",
            codeFont: "IBM Plex Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "insurance-secure",
        uid: crypto.randomUUID(),
        name: "Insurance Secure",
        description: "Secure, professional design for insurance companies",
        preview: "/themes/insurance-secure.jpg",
        category: "professional",
        styles: {
          colors: {
            primary: "#1E40AF",
            secondary: "#DBEAFE",
            accent: "#EA580C",
            background: "#FFFFFF",
            surface: "#F9FAFB",
            text: "#1F2937",
            textSecondary: "#6B7280",
            border: "#D1D5DB"
          },
          typography: {
            fontFamily: "Arial, sans-serif",
            headingFont: "Arial, sans-serif",
            codeFont: "Consolas, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "enterprise-suite",
        uid: crypto.randomUUID(),
        name: "Enterprise Suite",
        description: "Enterprise-grade design for large organizations",
        preview: "/themes/enterprise-suite.jpg",
        category: "professional",
        styles: {
          colors: {
            primary: "#18181B",
            secondary: "#F4F4F5",
            accent: "#3B82F6",
            background: "#FFFFFF",
            surface: "#FAFAFA",
            text: "#18181B",
            textSecondary: "#71717A",
            border: "#E4E4E7"
          },
          typography: {
            fontFamily: "Inter, sans-serif",
            headingFont: "Inter, sans-serif",
            codeFont: "JetBrains Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "business-intelligence",
        uid: crypto.randomUUID(),
        name: "Business Intelligence",
        description: "Data-driven design for analytics and BI blogs",
        preview: "/themes/business-intelligence.jpg",
        category: "professional",
        styles: {
          colors: {
            primary: "#6366F1",
            secondary: "#EEF2FF",
            accent: "#10B981",
            background: "#FFFFFF",
            surface: "#F9FAFB",
            text: "#1F2937",
            textSecondary: "#6B7280",
            border: "#E5E7EB"
          },
          typography: {
            fontFamily: "system-ui, sans-serif",
            headingFont: "system-ui, sans-serif",
            codeFont: "Monaco, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "executive-portfolio",
        uid: crypto.randomUUID(),
        name: "Executive Portfolio",
        description: "Premium design for executive and leadership blogs",
        preview: "/themes/executive-portfolio.jpg",
        category: "professional",
        styles: {
          colors: {
            primary: "#7C2D12",
            secondary: "#FFF7ED",
            accent: "#CA8A04",
            background: "#FFFFFF",
            surface: "#FAFAF9",
            text: "#292524",
            textSecondary: "#78716C",
            border: "#E7E5E4"
          },
          typography: {
            fontFamily: "Crimson Text, serif",
            headingFont: "Montserrat, sans-serif",
            codeFont: "Source Code Pro, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "startup-modern",
        uid: crypto.randomUUID(),
        name: "Startup Modern",
        description: "Fresh, modern design for startup blogs",
        preview: "/themes/startup-modern.jpg",
        category: "professional",
        styles: {
          colors: {
            primary: "#EC4899",
            secondary: "#FDF2F8",
            accent: "#8B5CF6",
            background: "#FFFFFF",
            surface: "#FAFAFA",
            text: "#18181B",
            textSecondary: "#71717A",
            border: "#E4E4E7"
          },
          typography: {
            fontFamily: "Work Sans, sans-serif",
            headingFont: "Work Sans, sans-serif",
            codeFont: "Fira Code, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "agency-creative",
        uid: crypto.randomUUID(),
        name: "Agency Creative",
        description: "Creative design for digital agencies",
        preview: "/themes/agency-creative.jpg",
        category: "professional",
        styles: {
          colors: {
            primary: "#F59E0B",
            secondary: "#FFFBEB",
            accent: "#EF4444",
            background: "#FFFFFF",
            surface: "#FAFAF9",
            text: "#1C1917",
            textSecondary: "#78716C",
            border: "#E7E5E4"
          },
          typography: {
            fontFamily: "Space Grotesk, sans-serif",
            headingFont: "Space Grotesk, sans-serif",
            codeFont: "Fira Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "portfolio-pro",
        uid: crypto.randomUUID(),
        name: "Portfolio Pro",
        description: "Professional portfolio design for showcasing work",
        preview: "/themes/portfolio-pro.jpg",
        category: "professional",
        styles: {
          colors: {
            primary: "#0F172A",
            secondary: "#F8FAFC",
            accent: "#06B6D4",
            background: "#FFFFFF",
            surface: "#F1F5F9",
            text: "#0F172A",
            textSecondary: "#475569",
            border: "#CBD5E1"
          },
          typography: {
            fontFamily: "DM Sans, sans-serif",
            headingFont: "DM Sans, sans-serif",
            codeFont: "JetBrains Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "peaceful-minimal",
        uid: crypto.randomUUID(),
        name: "Peaceful Minimal",
        description: "Peaceful, minimalist design for focused content",
        preview: "/themes/peaceful-minimal.jpg",
        category: "minimal",
        styles: {
          colors: {
            primary: "#6B7280",
            secondary: "#FFFFFF",
            accent: "#10B981",
            background: "#FFFFFF",
            surface: "#F9FAFB",
            text: "#1F2937",
            textSecondary: "#9CA3AF",
            border: "#E5E7EB"
          },
          typography: {
            fontFamily: "Noto Sans, sans-serif",
            headingFont: "Noto Serif, serif",
            codeFont: "Noto Sans Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "bright-clean",
        uid: crypto.randomUUID(),
        name: "Bright Clean",
        description: "Clean design with bright, open spaces",
        preview: "/themes/bright-clean.jpg",
        category: "minimal",
        styles: {
          colors: {
            primary: "#0EA5E9",
            secondary: "#F0F9FF",
            accent: "#F59E0B",
            background: "#FFFFFF",
            surface: "#FAFAFA",
            text: "#18181B",
            textSecondary: "#71717A",
            border: "#E4E4E7"
          },
          typography: {
            fontFamily: "Karla, sans-serif",
            headingFont: "Rubik, sans-serif",
            codeFont: "Inconsolata, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "swiss-design",
        uid: crypto.randomUUID(),
        name: "Swiss Design",
        description: "Minimalist Swiss design principles with grid layouts",
        preview: "/themes/swiss-design.jpg",
        category: "minimal",
        styles: {
          colors: {
            primary: "#DC2626",
            secondary: "#FFFFFF",
            accent: "#000000",
            background: "#FFFFFF",
            surface: "#FAFAFA",
            text: "#000000",
            textSecondary: "#737373",
            border: "#E5E5E5"
          },
          typography: {
            fontFamily: "Helvetica, Arial, sans-serif",
            headingFont: "Helvetica, Arial, sans-serif",
            codeFont: "Courier, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "brutalist-simple",
        uid: crypto.randomUUID(),
        name: "Brutalist Simple",
        description: "Bold, raw brutalist design aesthetic",
        preview: "/themes/brutalist-simple.jpg",
        category: "minimal",
        styles: {
          colors: {
            primary: "#000000",
            secondary: "#FFFFFF",
            accent: "#FFFF00",
            background: "#FFFFFF",
            surface: "#F5F5F5",
            text: "#000000",
            textSecondary: "#525252",
            border: "#000000"
          },
          typography: {
            fontFamily: "Courier New, monospace",
            headingFont: "Arial Black, sans-serif",
            codeFont: "Courier New, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "elegant-minimal",
        uid: crypto.randomUUID(),
        name: "Elegant Minimal",
        description: "Elegant minimalist aesthetic with subtle design",
        preview: "/themes/elegant-minimal.jpg",
        category: "minimal",
        styles: {
          colors: {
            primary: "#DC2626",
            secondary: "#FEF2F2",
            accent: "#1F2937",
            background: "#FFFBF5",
            surface: "#FFF8F0",
            text: "#1F2937",
            textSecondary: "#6B7280",
            border: "#F3E8DD"
          },
          typography: {
            fontFamily: "system-ui, sans-serif",
            headingFont: "Georgia, serif",
            codeFont: "Courier New, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "light-airy",
        uid: crypto.randomUUID(),
        name: "Light Airy",
        description: "Light, airy design with spacious layout",
        preview: "/themes/light-airy.jpg",
        category: "minimal",
        styles: {
          colors: {
            primary: "#475569",
            secondary: "#F8FAFC",
            accent: "#F59E0B",
            background: "#FFFFFF",
            surface: "#F1F5F9",
            text: "#0F172A",
            textSecondary: "#64748B",
            border: "#E2E8F0"
          },
          typography: {
            fontFamily: "Lato, sans-serif",
            headingFont: "Lato, sans-serif",
            codeFont: "Ubuntu Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "clean-slate",
        uid: crypto.randomUUID(),
        name: "Clean Slate",
        description: "Fresh start with clean, minimal design",
        preview: "/themes/clean-slate.jpg",
        category: "minimal",
        styles: {
          colors: {
            primary: "#2563EB",
            secondary: "#EFF6FF",
            accent: "#14B8A6",
            background: "#FFFFFF",
            surface: "#F9FAFB",
            text: "#111827",
            textSecondary: "#6B7280",
            border: "#E5E7EB"
          },
          typography: {
            fontFamily: "Raleway, sans-serif",
            headingFont: "Raleway, sans-serif",
            codeFont: "Roboto Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "pure-content",
        uid: crypto.randomUUID(),
        name: "Pure Content",
        description: "Focus purely on content with minimal distractions",
        preview: "/themes/pure-content.jpg",
        category: "minimal",
        styles: {
          colors: {
            primary: "#1F2937",
            secondary: "#F9FAFB",
            accent: "#3B82F6",
            background: "#FFFFFF",
            surface: "#F3F4F6",
            text: "#111827",
            textSecondary: "#6B7280",
            border: "#D1D5DB"
          },
          typography: {
            fontFamily: "PT Serif, serif",
            headingFont: "PT Sans, sans-serif",
            codeFont: "PT Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "simple-elegance",
        uid: crypto.randomUUID(),
        name: "Simple Elegance",
        description: "Elegant simplicity in design",
        preview: "/themes/simple-elegance.jpg",
        category: "minimal",
        styles: {
          colors: {
            primary: "#4F46E5",
            secondary: "#F5F3FF",
            accent: "#A855F7",
            background: "#FFFFFF",
            surface: "#FAFAFA",
            text: "#1F2937",
            textSecondary: "#6B7280",
            border: "#E5E7EB"
          },
          typography: {
            fontFamily: "Lora, serif",
            headingFont: "Lora, serif",
            codeFont: "Source Code Pro, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "minimal-focus",
        uid: crypto.randomUUID(),
        name: "Minimal Focus",
        description: "Focused minimalism for better reading",
        preview: "/themes/minimal-focus.jpg",
        category: "minimal",
        styles: {
          colors: {
            primary: "#059669",
            secondary: "#ECFDF5",
            accent: "#0891B2",
            background: "#FFFFFF",
            surface: "#F0FDFA",
            text: "#064E3B",
            textSecondary: "#047857",
            border: "#A7F3D0"
          },
          typography: {
            fontFamily: "Spectral, serif",
            headingFont: "Spectral, serif",
            codeFont: "Inconsolata, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "whitespace-master",
        uid: crypto.randomUUID(),
        name: "Whitespace Master",
        description: "Master of whitespace and breathing room",
        preview: "/themes/whitespace-master.jpg",
        category: "minimal",
        styles: {
          colors: {
            primary: "#0F172A",
            secondary: "#FFFFFF",
            accent: "#06B6D4",
            background: "#FFFFFF",
            surface: "#FAFAFA",
            text: "#0F172A",
            textSecondary: "#475569",
            border: "#E2E8F0"
          },
          typography: {
            fontFamily: "Libre Baskerville, serif",
            headingFont: "Libre Franklin, sans-serif",
            codeFont: "Fira Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "less-is-more",
        uid: crypto.randomUUID(),
        name: "Less is More",
        description: "Minimalist philosophy in action",
        preview: "/themes/less-is-more.jpg",
        category: "minimal",
        styles: {
          colors: {
            primary: "#18181B",
            secondary: "#FAFAFA",
            accent: "#EF4444",
            background: "#FFFFFF",
            surface: "#F4F4F5",
            text: "#18181B",
            textSecondary: "#71717A",
            border: "#E4E4E7"
          },
          typography: {
            fontFamily: "Merriweather, serif",
            headingFont: "Merriweather Sans, sans-serif",
            codeFont: "Courier Prime, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "clarity-blog",
        uid: crypto.randomUUID(),
        name: "Clarity Blog",
        description: "Crystal clear design for maximum readability",
        preview: "/themes/clarity-blog.jpg",
        category: "minimal",
        styles: {
          colors: {
            primary: "#0369A1",
            secondary: "#F0F9FF",
            accent: "#FB923C",
            background: "#FFFFFF",
            surface: "#F9FAFB",
            text: "#0C4A6E",
            textSecondary: "#075985",
            border: "#BAE6FD"
          },
          typography: {
            fontFamily: "Source Sans Pro, sans-serif",
            headingFont: "Source Sans Pro, sans-serif",
            codeFont: "Source Code Pro, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "editorial-bold",
        uid: crypto.randomUUID(),
        name: "Editorial Bold",
        description: "Bold editorial design for impactful stories",
        preview: "/themes/editorial-bold.jpg",
        category: "magazine",
        styles: {
          colors: {
            primary: "#DC2626",
            secondary: "#FEF2F2",
            accent: "#1F2937",
            background: "#FFFFFF",
            surface: "#F9FAFB",
            text: "#111827",
            textSecondary: "#6B7280",
            border: "#E5E7EB"
          },
          typography: {
            fontFamily: "Bitter, serif",
            headingFont: "Oswald, sans-serif",
            codeFont: "Courier Prime, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "lifestyle-chic",
        uid: crypto.randomUUID(),
        name: "Lifestyle Chic",
        description: "Chic design for lifestyle and fashion blogs",
        preview: "/themes/lifestyle-chic.jpg",
        category: "magazine",
        styles: {
          colors: {
            primary: "#EC4899",
            secondary: "#FDF2F8",
            accent: "#F59E0B",
            background: "#FFFFFF",
            surface: "#FEF3F2",
            text: "#831843",
            textSecondary: "#9F1239",
            border: "#FBCFE8"
          },
          typography: {
            fontFamily: "Cormorant Garamond, serif",
            headingFont: "Montserrat, sans-serif",
            codeFont: "Fira Code, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "fashion-forward",
        uid: crypto.randomUUID(),
        name: "Fashion Forward",
        description: "Forward-thinking design for fashion content",
        preview: "/themes/fashion-forward.jpg",
        category: "magazine",
        styles: {
          colors: {
            primary: "#000000",
            secondary: "#FFFFFF",
            accent: "#D946EF",
            background: "#FAFAFA",
            surface: "#F5F5F5",
            text: "#000000",
            textSecondary: "#525252",
            border: "#E5E5E5"
          },
          typography: {
            fontFamily: "Didot, serif",
            headingFont: "Futura, sans-serif",
            codeFont: "Monaco, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "travel-blog",
        uid: crypto.randomUUID(),
        name: "Travel Blog",
        description: "Adventurous design for travel stories",
        preview: "/themes/travel-blog.jpg",
        category: "magazine",
        styles: {
          colors: {
            primary: "#0891B2",
            secondary: "#ECFEFF",
            accent: "#F59E0B",
            background: "#FFFFFF",
            surface: "#F0FDFA",
            text: "#0F172A",
            textSecondary: "#475569",
            border: "#CBD5E1"
          },
          typography: {
            fontFamily: "Cabin, sans-serif",
            headingFont: "Abril Fatface, serif",
            codeFont: "Inconsolata, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "food-magazine",
        uid: crypto.randomUUID(),
        name: "Food Magazine",
        description: "Delicious design for food and recipe blogs",
        preview: "/themes/food-magazine.jpg",
        category: "magazine",
        styles: {
          colors: {
            primary: "#EA580C",
            secondary: "#FFF7ED",
            accent: "#16A34A",
            background: "#FFFBF5",
            surface: "#FEF3C7",
            text: "#7C2D12",
            textSecondary: "#92400E",
            border: "#FED7AA"
          },
          typography: {
            fontFamily: "Crimson Text, serif",
            headingFont: "Pacifico, cursive",
            codeFont: "Courier New, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "culture-hub",
        uid: crypto.randomUUID(),
        name: "Culture Hub",
        description: "Cultural magazine design for arts and society",
        preview: "/themes/culture-hub.jpg",
        category: "magazine",
        styles: {
          colors: {
            primary: "#7C3AED",
            secondary: "#FAF5FF",
            accent: "#DC2626",
            background: "#FFFFFF",
            surface: "#F5F3FF",
            text: "#1F2937",
            textSecondary: "#6B7280",
            border: "#DDD6FE"
          },
          typography: {
            fontFamily: "Literata, serif",
            headingFont: "Archivo, sans-serif",
            codeFont: "Roboto Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "art-gallery",
        uid: crypto.randomUUID(),
        name: "Art Gallery",
        description: "Gallery-inspired design for art blogs",
        preview: "/themes/art-gallery.jpg",
        category: "magazine",
        styles: {
          colors: {
            primary: "#18181B",
            secondary: "#FAFAFA",
            accent: "#F59E0B",
            background: "#FFFFFF",
            surface: "#F4F4F5",
            text: "#18181B",
            textSecondary: "#52525B",
            border: "#D4D4D8"
          },
          typography: {
            fontFamily: "Crimson Pro, serif",
            headingFont: "Cinzel, serif",
            codeFont: "Courier Prime, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "photography-pro",
        uid: crypto.randomUUID(),
        name: "Photography Pro",
        description: "Professional design for photography portfolios",
        preview: "/themes/photography-pro.jpg",
        category: "magazine",
        styles: {
          colors: {
            primary: "#0F172A",
            secondary: "#F8FAFC",
            accent: "#06B6D4",
            background: "#FFFFFF",
            surface: "#F1F5F9",
            text: "#0F172A",
            textSecondary: "#475569",
            border: "#CBD5E1"
          },
          typography: {
            fontFamily: "Archivo Narrow, sans-serif",
            headingFont: "Bebas Neue, sans-serif",
            codeFont: "Ubuntu Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "design-showcase",
        uid: crypto.randomUUID(),
        name: "Design Showcase",
        description: "Showcase design work beautifully",
        preview: "/themes/design-showcase.jpg",
        category: "magazine",
        styles: {
          colors: {
            primary: "#6366F1",
            secondary: "#EEF2FF",
            accent: "#EC4899",
            background: "#FFFFFF",
            surface: "#F9FAFB",
            text: "#1E1B4B",
            textSecondary: "#4C1D95",
            border: "#C7D2FE"
          },
          typography: {
            fontFamily: "DM Sans, sans-serif",
            headingFont: "Space Mono, monospace",
            codeFont: "Space Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "luxury-magazine",
        uid: crypto.randomUUID(),
        name: "Luxury Magazine",
        description: "Luxurious design for premium content",
        preview: "/themes/luxury-magazine.jpg",
        category: "magazine",
        styles: {
          colors: {
            primary: "#92400E",
            secondary: "#FFF7ED",
            accent: "#CA8A04",
            background: "#FFFBF5",
            surface: "#FEF3C7",
            text: "#78350F",
            textSecondary: "#92400E",
            border: "#FDE68A"
          },
          typography: {
            fontFamily: "Bodoni Moda, serif",
            headingFont: "Bodoni Moda, serif",
            codeFont: "IBM Plex Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "urban-lifestyle",
        uid: crypto.randomUUID(),
        name: "Urban Lifestyle",
        description: "Urban-inspired lifestyle magazine design",
        preview: "/themes/urban-lifestyle.jpg",
        category: "magazine",
        styles: {
          colors: {
            primary: "#1F2937",
            secondary: "#F3F4F6",
            accent: "#EF4444",
            background: "#FFFFFF",
            surface: "#F9FAFB",
            text: "#111827",
            textSecondary: "#6B7280",
            border: "#D1D5DB"
          },
          typography: {
            fontFamily: "Inter, sans-serif",
            headingFont: "Anton, sans-serif",
            codeFont: "JetBrains Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "visual-stories",
        uid: crypto.randomUUID(),
        name: "Visual Stories",
        description: "Visual storytelling magazine design",
        preview: "/themes/visual-stories.jpg",
        category: "magazine",
        styles: {
          colors: {
            primary: "#059669",
            secondary: "#ECFDF5",
            accent: "#F59E0B",
            background: "#FFFFFF",
            surface: "#F0FDF4",
            text: "#064E3B",
            textSecondary: "#047857",
            border: "#A7F3D0"
          },
          typography: {
            fontFamily: "Vollkorn, serif",
            headingFont: "Righteous, sans-serif",
            codeFont: "Fira Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "modern-editorial",
        uid: crypto.randomUUID(),
        name: "Modern Editorial",
        description: "Modern take on editorial design",
        preview: "/themes/modern-editorial.jpg",
        category: "magazine",
        styles: {
          colors: {
            primary: "#2563EB",
            secondary: "#EFF6FF",
            accent: "#DC2626",
            background: "#FFFFFF",
            surface: "#F9FAFB",
            text: "#1E3A8A",
            textSecondary: "#3B82F6",
            border: "#BFDBFE"
          },
          typography: {
            fontFamily: "Newsreader, serif",
            headingFont: "Public Sans, sans-serif",
            codeFont: "Overpass Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "bold-magazine",
        uid: crypto.randomUUID(),
        name: "Bold Magazine",
        description: "Bold and eye-catching magazine design",
        preview: "/themes/bold-magazine.jpg",
        category: "magazine",
        styles: {
          colors: {
            primary: "#EF4444",
            secondary: "#FEF2F2",
            accent: "#1F2937",
            background: "#FFFFFF",
            surface: "#F9FAFB",
            text: "#991B1B",
            textSecondary: "#DC2626",
            border: "#FECACA"
          },
          typography: {
            fontFamily: "Arvo, serif",
            headingFont: "Passion One, sans-serif",
            codeFont: "Anonymous Pro, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "developer-dark",
        uid: crypto.randomUUID(),
        name: "Developer Dark",
        description: "Dark theme for developers and coders",
        preview: "/themes/developer-dark.jpg",
        category: "technical",
        styles: {
          colors: {
            primary: "#10B981",
            secondary: "#1F2937",
            accent: "#3B82F6",
            background: "#111827",
            surface: "#1F2937",
            text: "#F9FAFB",
            textSecondary: "#9CA3AF",
            border: "#374151"
          },
          typography: {
            fontFamily: "JetBrains Mono, monospace",
            headingFont: "Inter, sans-serif",
            codeFont: "JetBrains Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "code-hub",
        uid: crypto.randomUUID(),
        name: "Code Hub",
        description: "Central hub design for coding blogs",
        preview: "/themes/code-hub.jpg",
        category: "technical",
        styles: {
          colors: {
            primary: "#3B82F6",
            secondary: "#EFF6FF",
            accent: "#8B5CF6",
            background: "#FFFFFF",
            surface: "#F9FAFB",
            text: "#1E3A8A",
            textSecondary: "#3B82F6",
            border: "#BFDBFE"
          },
          typography: {
            fontFamily: "Fira Code, monospace",
            headingFont: "Roboto, sans-serif",
            codeFont: "Fira Code, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "github-dark",
        uid: crypto.randomUUID(),
        name: "GitHub Dark",
        description: "GitHub-inspired dark theme",
        preview: "/themes/github-dark.jpg",
        category: "technical",
        styles: {
          colors: {
            primary: "#58A6FF",
            secondary: "#0D1117",
            accent: "#F78166",
            background: "#0D1117",
            surface: "#161B22",
            text: "#C9D1D9",
            textSecondary: "#8B949E",
            border: "#30363D"
          },
          typography: {
            fontFamily: "ui-monospace, monospace",
            headingFont: "-apple-system, sans-serif",
            codeFont: "ui-monospace, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "stackoverflow-inspired",
        uid: crypto.randomUUID(),
        name: "Stack Overflow Inspired",
        description: "Q&A focused design inspired by Stack Overflow",
        preview: "/themes/stackoverflow-inspired.jpg",
        category: "technical",
        styles: {
          colors: {
            primary: "#F48024",
            secondary: "#FFFFFF",
            accent: "#0095FF",
            background: "#FFFFFF",
            surface: "#F8F9F9",
            text: "#242729",
            textSecondary: "#6A737C",
            border: "#D6D9DC"
          },
          typography: {
            fontFamily: "Arial, sans-serif",
            headingFont: "Arial, sans-serif",
            codeFont: "Consolas, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "documentation-pro",
        uid: crypto.randomUUID(),
        name: "Documentation Pro",
        description: "Professional design for technical documentation",
        preview: "/themes/documentation-pro.jpg",
        category: "technical",
        styles: {
          colors: {
            primary: "#2563EB",
            secondary: "#F8FAFC",
            accent: "#10B981",
            background: "#FFFFFF",
            surface: "#F1F5F9",
            text: "#0F172A",
            textSecondary: "#475569",
            border: "#CBD5E1"
          },
          typography: {
            fontFamily: "system-ui, sans-serif",
            headingFont: "system-ui, sans-serif",
            codeFont: "Menlo, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "api-docs",
        uid: crypto.randomUUID(),
        name: "API Docs",
        description: "Clean design for API documentation",
        preview: "/themes/api-docs.jpg",
        category: "technical",
        styles: {
          colors: {
            primary: "#059669",
            secondary: "#ECFDF5",
            accent: "#0891B2",
            background: "#FFFFFF",
            surface: "#F0FDFA",
            text: "#064E3B",
            textSecondary: "#047857",
            border: "#A7F3D0"
          },
          typography: {
            fontFamily: "Inter, sans-serif",
            headingFont: "Inter, sans-serif",
            codeFont: "Source Code Pro, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "tech-writer",
        uid: crypto.randomUUID(),
        name: "Tech Writer",
        description: "Technical writing focused design",
        preview: "/themes/tech-writer.jpg",
        category: "technical",
        styles: {
          colors: {
            primary: "#6366F1",
            secondary: "#EEF2FF",
            accent: "#EC4899",
            background: "#FFFFFF",
            surface: "#F9FAFB",
            text: "#1E1B4B",
            textSecondary: "#4C1D95",
            border: "#C7D2FE"
          },
          typography: {
            fontFamily: "IBM Plex Sans, sans-serif",
            headingFont: "IBM Plex Sans, sans-serif",
            codeFont: "IBM Plex Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "dev-blog",
        uid: crypto.randomUUID(),
        name: "Dev Blog",
        description: "Developer blog with code-first design",
        preview: "/themes/dev-blog.jpg",
        category: "technical",
        styles: {
          colors: {
            primary: "#14B8A6",
            secondary: "#F0FDFA",
            accent: "#F59E0B",
            background: "#FFFFFF",
            surface: "#CCFBF1",
            text: "#134E4A",
            textSecondary: "#0F766E",
            border: "#5EEAD4"
          },
          typography: {
            fontFamily: "Ubuntu, sans-serif",
            headingFont: "Ubuntu, sans-serif",
            codeFont: "Ubuntu Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "programming-hub",
        uid: crypto.randomUUID(),
        name: "Programming Hub",
        description: "Hub for programming tutorials and guides",
        preview: "/themes/programming-hub.jpg",
        category: "technical",
        styles: {
          colors: {
            primary: "#8B5CF6",
            secondary: "#F5F3FF",
            accent: "#06B6D4",
            background: "#FFFFFF",
            surface: "#FAF5FF",
            text: "#5B21B6",
            textSecondary: "#7C3AED",
            border: "#DDD6FE"
          },
          typography: {
            fontFamily: "Cascadia Code, monospace",
            headingFont: "Segoe UI, sans-serif",
            codeFont: "Cascadia Code, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "devops-theme",
        uid: crypto.randomUUID(),
        name: "DevOps Theme",
        description: "DevOps and infrastructure focused design",
        preview: "/themes/devops-theme.jpg",
        category: "technical",
        styles: {
          colors: {
            primary: "#0891B2",
            secondary: "#ECFEFF",
            accent: "#F59E0B",
            background: "#FFFFFF",
            surface: "#CFFAFE",
            text: "#164E63",
            textSecondary: "#0E7490",
            border: "#67E8F9"
          },
          typography: {
            fontFamily: "Red Hat Mono, monospace",
            headingFont: "Red Hat Display, sans-serif",
            codeFont: "Red Hat Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "news-portal",
        uid: crypto.randomUUID(),
        name: "News Portal",
        description: "News portal design for journalism",
        preview: "/themes/news-portal.jpg",
        category: "editorial",
        styles: {
          colors: {
            primary: "#DC2626",
            secondary: "#FFFFFF",
            accent: "#1F2937",
            background: "#F9FAFB",
            surface: "#FFFFFF",
            text: "#111827",
            textSecondary: "#4B5563",
            border: "#E5E7EB"
          },
          typography: {
            fontFamily: "Georgia, serif",
            headingFont: "Arial Black, sans-serif",
            codeFont: "Courier New, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "publishing-house",
        uid: crypto.randomUUID(),
        name: "Publishing House",
        description: "Traditional publishing house design",
        preview: "/themes/publishing-house.jpg",
        category: "editorial",
        styles: {
          colors: {
            primary: "#1F2937",
            secondary: "#F9FAFB",
            accent: "#92400E",
            background: "#FFFBF5",
            surface: "#FFF8F0",
            text: "#1F2937",
            textSecondary: "#4B5563",
            border: "#E5E7EB"
          },
          typography: {
            fontFamily: "Baskerville, serif",
            headingFont: "Garamond, serif",
            codeFont: "Courier, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "journal-classic",
        uid: crypto.randomUUID(),
        name: "Journal Classic",
        description: "Classic academic journal design",
        preview: "/themes/journal-classic.jpg",
        category: "editorial",
        styles: {
          colors: {
            primary: "#0F172A",
            secondary: "#F8FAFC",
            accent: "#7C2D12",
            background: "#FFFFFF",
            surface: "#F1F5F9",
            text: "#0F172A",
            textSecondary: "#475569",
            border: "#CBD5E1"
          },
          typography: {
            fontFamily: "Times New Roman, serif",
            headingFont: "Times New Roman, serif",
            codeFont: "Courier New, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "literary-blog",
        uid: crypto.randomUUID(),
        name: "Literary Blog",
        description: "Literary magazine design for book reviews and essays",
        preview: "/themes/literary-blog.jpg",
        category: "editorial",
        styles: {
          colors: {
            primary: "#78350F",
            secondary: "#FFF7ED",
            accent: "#7C2D12",
            background: "#FFFBF5",
            surface: "#FEF3C7",
            text: "#451A03",
            textSecondary: "#78350F",
            border: "#FED7AA"
          },
          typography: {
            fontFamily: "Palatino, serif",
            headingFont: "Palatino, serif",
            codeFont: "Monaco, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "investigative-theme",
        uid: crypto.randomUUID(),
        name: "Investigative Theme",
        description: "Investigative journalism focused design",
        preview: "/themes/investigative-theme.jpg",
        category: "editorial",
        styles: {
          colors: {
            primary: "#1E40AF",
            secondary: "#EFF6FF",
            accent: "#DC2626",
            background: "#FFFFFF",
            surface: "#F9FAFB",
            text: "#1E3A8A",
            textSecondary: "#3B82F6",
            border: "#BFDBFE"
          },
          typography: {
            fontFamily: "Helvetica Neue, sans-serif",
            headingFont: "Helvetica Neue, sans-serif",
            codeFont: "Menlo, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "essential-content",
        uid: crypto.randomUUID(),
        name: "Essential Content",
        description: "Content-first minimal design",
        preview: "/themes/essential-content.jpg",
        category: "minimal",
        styles: {
          colors: {
            primary: "#475569",
            secondary: "#F8FAFC",
            accent: "#0891B2",
            background: "#FFFFFF",
            surface: "#F1F5F9",
            text: "#0F172A",
            textSecondary: "#64748B",
            border: "#CBD5E1"
          },
          typography: {
            fontFamily: "Georgia, serif",
            headingFont: "Helvetica, sans-serif",
            codeFont: "Menlo, monospace"
          }
        },
        createdAt: new Date().toISOString()
      },
      {
        id: "minimalist-writer",
        uid: crypto.randomUUID(),
        name: "Minimalist Writer",
        description: "Minimalist design for writers",
        preview: "/themes/minimalist-writer.jpg",
        category: "minimal",
        styles: {
          colors: {
            primary: "#1F2937",
            secondary: "#F9FAFB",
            accent: "#059669",
            background: "#FFFFFF",
            surface: "#F3F4F6",
            text: "#111827",
            textSecondary: "#6B7280",
            border: "#D1D5DB"
          },
          typography: {
            fontFamily: "Iowan Old Style, serif",
            headingFont: "San Francisco, sans-serif",
            codeFont: "SF Mono, monospace"
          }
        },
        createdAt: new Date().toISOString()
      }
    ];
  }

  private async createThemesFile(): Promise<void> {
    console.log('🔧 Creating themes.json file...');
    
    const defaultThemes = this.getDefaultThemesData();
    const content = btoa(JSON.stringify(defaultThemes, null, 2));

    await this.request(`${this.basePath}/themes.json`, 'PUT', {
      message: 'Initialize themes database',
      content,
      branch: this.branch,
    });

    console.log('✅ themes.json file created successfully');
  }

  private isInitialized(): boolean {
    try {
      const stored = localStorage.getItem(INIT_FLAG_KEY);
      if (!stored) return false;

      const status: InitStatus = JSON.parse(stored);
      const now = Date.now();

      // Re-initialize if expired
      if (now - status.timestamp > INIT_EXPIRY) {
        return false;
      }

      return status.isInitialized;
    } catch {
      return false;
    }
  }

  private markAsInitialized(): void {
    const status: InitStatus = {
      isInitialized: true,
      timestamp: Date.now(),
    };
    localStorage.setItem(INIT_FLAG_KEY, JSON.stringify(status));
  }

  async initialize(): Promise<void> {
    // Check if already initialized recently
    if (this.isInitialized()) {
      console.log('📦 Database already initialized');
      return;
    }

    console.log('🚀 Starting database initialization...');

    // Validate configuration
    if (!this.owner || !this.repo || !this.token) {
      console.error('❌ GitHub configuration missing. Please check your environment variables.');
      return;
    }

    try {
      // Check if themes.json exists
      const themesPath = `${this.basePath}/themes.json`;
      const { exists } = await this.checkFileExists(themesPath);

      if (!exists) {
        console.log('⚠️  themes.json not found, creating...');
        await this.createThemesFile();
      } else {
        console.log('✅ themes.json exists');
      }

      // Mark as initialized
      this.markAsInitialized();
      console.log('🎉 Database initialization completed');
    } catch (error: any) {
      console.error('❌ Database initialization failed:', error);

      // Provide helpful error messages
      if (error.message.includes('403')) {
        console.error(`
⚠️  Permission Error (403):
- Your GitHub token may not have the required permissions
- Required scopes: 'repo' or 'public_repo' (for public repos)
- Check your VITE_GITHUB_TOKEN in .env file
- Generate a new token at: https://github.com/settings/tokens
        `);
      } else if (error.message.includes('404')) {
        console.error(`
⚠️  Not Found Error (404):
- Repository not found: ${this.owner}/${this.repo}
- Check VITE_GITHUB_OWNER and VITE_GITHUB_REPO in .env file
- Ensure the repository exists and is accessible
        `);
      }

      // Don't throw - allow app to continue even if initialization fails
    }
  }

  // Force re-initialization (useful for debugging)
  async forceReinitialize(): Promise<void> {
    localStorage.removeItem(INIT_FLAG_KEY);
    await this.initialize();
  }
}

// Export singleton instance
export const databaseInitializer = new DatabaseInitializer();

// Auto-initialize on import
databaseInitializer.initialize().catch(console.error);
