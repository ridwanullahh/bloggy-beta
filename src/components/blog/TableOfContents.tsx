
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { BookOpen, ChevronDown, ChevronRight } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
  element: HTMLElement;
}

interface TableOfContentsProps {
  content: string;
  theme?: any;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content, theme }) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const parseContent = () => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
      
      const items: TocItem[] = Array.from(headings).map((heading, index) => {
        const id = heading.id || `toc-${index}`;
        const level = parseInt(heading.tagName.charAt(1));
        return {
          id,
          text: heading.textContent || '',
          level,
          element: heading as HTMLElement
        };
      });

      setTocItems(items);
    };

    if (content) {
      parseContent();
    }
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let current = '';

      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          current = heading.id || '';
        }
      });

      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <Card className="sticky top-24 z-10" style={{ 
      fontFamily: theme?.styles.fontFamily,
      borderRadius: theme?.styles.borderRadius === '0' ? '0' : '0.5rem'
    }}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-2" />
            Table of Contents
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-6 w-6 p-0"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </CardTitle>
      </CardHeader>
      {!isCollapsed && (
        <CardContent className="pt-0">
          <nav className="space-y-1">
            {tocItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className={`block w-full text-left text-sm py-1 px-2 rounded transition-colors ${
                  activeId === item.id
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                style={{ 
                  paddingLeft: `${(item.level - 1) * 12 + 8}px`,
                  color: activeId === item.id ? theme?.styles.primaryColor : undefined
                }}
              >
                {item.text}
              </button>
            ))}
          </nav>
        </CardContent>
      )}
    </Card>
  );
};

export default TableOfContents;
