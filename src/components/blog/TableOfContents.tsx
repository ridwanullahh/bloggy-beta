
import React, { useState, useEffect } from 'react';
import { ThemeStyle } from '../../constants/themes';

interface TableOfContentsProps {
  content: string;
  theme?: ThemeStyle;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content, theme }) => {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      
      headings.push({ id, text, level });
    }

    setToc(headings);
  }, [content]);

  useEffect(() => {
    const observerOptions = {
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all headings
    toc.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [toc]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (toc.length === 0) return null;

  return (
    <div className="sticky top-8">
      <h4 className="font-semibold mb-4 text-gray-900">Table of Contents</h4>
      <nav className="space-y-1">
        {toc.map(({ id, text, level }) => (
          <button
            key={id}
            onClick={() => scrollToHeading(id)}
            className={`block text-left text-sm transition-colors hover:opacity-80 ${
              activeId === id
                ? 'font-medium'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            style={{
              paddingLeft: `${(level - 1) * 12}px`,
              color: activeId === id ? theme?.styles.primaryColor : undefined
            }}
          >
            {text}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;
