
import React, { useState, useCallback } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link, Image, Code, Quote, Heading1, Heading2, Heading3, Eye, Edit } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import { Toggle } from '../ui/toggle';

interface ModernRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
}

export const ModernRichTextEditor: React.FC<ModernRichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Write your content here...",
  height = 400
}) => {
  const [isPreview, setIsPreview] = useState(false);
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    setSelection({ start: e.target.selectionStart, end: e.target.selectionEnd });
  };

  const insertText = useCallback((before: string, after: string = '') => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  }, [value, onChange]);

  const formatActions = [
    { icon: Heading1, action: () => insertText('# '), tooltip: 'Heading 1' },
    { icon: Heading2, action: () => insertText('## '), tooltip: 'Heading 2' },
    { icon: Heading3, action: () => insertText('### '), tooltip: 'Heading 3' },
    { icon: Bold, action: () => insertText('**', '**'), tooltip: 'Bold' },
    { icon: Italic, action: () => insertText('*', '*'), tooltip: 'Italic' },
    { icon: Underline, action: () => insertText('<u>', '</u>'), tooltip: 'Underline' },
    { icon: List, action: () => insertText('- '), tooltip: 'Bullet List' },
    { icon: ListOrdered, action: () => insertText('1. '), tooltip: 'Numbered List' },
    { icon: Link, action: () => insertText('[', '](url)'), tooltip: 'Link' },
    { icon: Image, action: () => insertText('![alt text](', ')'), tooltip: 'Image' },
    { icon: Code, action: () => insertText('`', '`'), tooltip: 'Inline Code' },
    { icon: Quote, action: () => insertText('> '), tooltip: 'Quote' },
  ];

  const renderMarkdown = (text: string) => {
    return text
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/!\[([^\]]*)\]\(([^\)]*)\)/gim, '<img alt="$1" src="$2" />')
      .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2">$1</a>')
      .replace(/`([^`]*)`/gim, '<code>$1</code>')
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/^\- (.*$)/gim, '<li>$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
      .replace(/\n/gim, '<br>');
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b bg-gray-50">
        {formatActions.map((action, index) => (
          <Toggle
            key={index}
            size="sm"
            onClick={action.action}
            title={action.tooltip}
          >
            <action.icon className="w-4 h-4" />
          </Toggle>
        ))}
        
        <Separator orientation="vertical" className="h-6 mx-2" />
        
        <Button
          variant={isPreview ? "default" : "outline"}
          size="sm"
          onClick={() => setIsPreview(!isPreview)}
        >
          {isPreview ? <Edit className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
          {isPreview ? 'Edit' : 'Preview'}
        </Button>
      </div>

      {/* Content Area */}
      <div style={{ height }}>
        {isPreview ? (
          <div
            className="p-4 prose prose-sm max-w-none overflow-auto h-full"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
          />
        ) : (
          <Textarea
            value={value}
            onChange={handleTextareaChange}
            placeholder={placeholder}
            className="w-full border-0 resize-none focus-visible:ring-0 rounded-none font-mono"
            style={{ height, minHeight: height }}
          />
        )}
      </div>
    </div>
  );
};

export default ModernRichTextEditor;
