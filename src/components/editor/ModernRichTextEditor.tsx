import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Link, 
  Image, 
  Table, 
  Eye, 
  EyeOff, 
  Heading1, 
  Heading2, 
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Save,
  Undo,
  Redo,
  FileText,
  Zap
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ModernRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
  theme?: 'light' | 'dark';
  onSave?: () => void;
  isSaving?: boolean;
  autosave?: boolean;
}

export const ModernRichTextEditor: React.FC<ModernRichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Start writing your amazing content...",
  height = 500,
  theme = 'light',
  onSave,
  isSaving = false,
  autosave = true
}) => {
  const [activeTab, setActiveTab] = useState<'write' | 'preview' | 'split'>('write');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    const words = value.trim().split(/\s+/).filter(word => word.length > 0).length;
    const chars = value.length;
    const reading = Math.ceil(words / 200); // 200 words per minute average
    
    setWordCount(words);
    setCharCount(chars);
    setReadingTime(reading);
  }, [value]);

  useEffect(() => {
    if (autosave && onSave) {
      const timer = setTimeout(() => {
        onSave();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [value, autosave, onSave]);

  const handleEditorChange = (newValue: string | undefined) => {
    onChange(newValue || '');
  };

  const insertText = (text: string) => {
    const currentValue = value;
    const newValue = currentValue + text;
    onChange(newValue);
  };

  const wrapSelection = (prefix: string, suffix: string = '') => {
    const newText = `${prefix}${suffix}`;
    insertText(newText);
  };

  const formatButtons = [
    { icon: Bold, label: 'Bold', action: () => wrapSelection('**', '**') },
    { icon: Italic, label: 'Italic', action: () => wrapSelection('*', '*') },
    { icon: Underline, label: 'Underline', action: () => wrapSelection('<u>', '</u>') },
    { icon: Strikethrough, label: 'Strikethrough', action: () => wrapSelection('~~', '~~') },
    { icon: Code, label: 'Code', action: () => wrapSelection('`', '`') },
  ];

  const headingButtons = [
    { icon: Heading1, label: 'Heading 1', action: () => insertText('# ') },
    { icon: Heading2, label: 'Heading 2', action: () => insertText('## ') },
    { icon: Heading3, label: 'Heading 3', action: () => insertText('### ') },
  ];

  const listButtons = [
    { icon: List, label: 'Bullet List', action: () => insertText('\n- ') },
    { icon: ListOrdered, label: 'Numbered List', action: () => insertText('\n1. ') },
    { icon: Quote, label: 'Quote', action: () => insertText('\n> ') },
  ];

  const mediaButtons = [
    { icon: Link, label: 'Link', action: () => insertText('[Link text](url)') },
    { icon: Image, label: 'Image', action: () => insertText('![Alt text](image-url)') },
    { icon: Table, label: 'Table', action: () => insertText('\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n') },
  ];

  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 16,
    lineHeight: 1.6,
    padding: { top: 20, bottom: 20 },
    wordWrap: 'on' as const,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    theme: theme === 'dark' ? 'vs-dark' : 'vs',
    language: 'markdown',
    folding: false,
    lineNumbers: 'off' as const,
    glyphMargin: false,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 0,
    renderLineHighlight: 'none' as const,
    scrollbar: {
      vertical: 'hidden' as const,
      horizontal: 'hidden' as const,
    },
  };

  return (
    <Card className={`w-full ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Rich Text Editor
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{wordCount} words</Badge>
            <Badge variant="outline">{charCount} characters</Badge>
            <Badge variant="outline">{readingTime} min read</Badge>
            {onSave && (
              <Button 
                size="sm" 
                onClick={onSave}
                disabled={isSaving}
                className="flex items-center space-x-1"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save'}</span>
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {/* Format Buttons */}
          <div className="flex items-center space-x-1">
            {formatButtons.map((button, index) => (
              <Button
                key={index}
                size="sm"
                variant="outline"
                onClick={button.action}
                className="p-2"
                title={button.label}
              >
                <button.icon className="w-4 h-4" />
              </Button>
            ))}
          </div>

          <Separator orientation="vertical" className="h-8" />

          {/* Heading Buttons */}
          <div className="flex items-center space-x-1">
            {headingButtons.map((button, index) => (
              <Button
                key={index}
                size="sm"
                variant="outline"
                onClick={button.action}
                className="p-2"
                title={button.label}
              >
                <button.icon className="w-4 h-4" />
              </Button>
            ))}
          </div>

          <Separator orientation="vertical" className="h-8" />

          {/* List Buttons */}
          <div className="flex items-center space-x-1">
            {listButtons.map((button, index) => (
              <Button
                key={index}
                size="sm"
                variant="outline"
                onClick={button.action}
                className="p-2"
                title={button.label}
              >
                <button.icon className="w-4 h-4" />
              </Button>
            ))}
          </div>

          <Separator orientation="vertical" className="h-8" />

          {/* Media Buttons */}
          <div className="flex items-center space-x-1">
            {mediaButtons.map((button, index) => (
              <Button
                key={index}
                size="sm"
                variant="outline"
                onClick={button.action}
                className="p-2"
                title={button.label}
              >
                <button.icon className="w-4 h-4" />
              </Button>
            ))}
          </div>

          <Separator orientation="vertical" className="h-8" />

          {/* AI Assistant */}
          <Button
            size="sm"
            variant="outline"
            className="flex items-center space-x-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:opacity-90"
            onClick={() => {
              // AI writing assistant functionality would go here
              console.log('AI Assistant clicked');
            }}
          >
            <Zap className="w-4 h-4" />
            <span>AI Assistant</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="split">Split View</TabsTrigger>
          </TabsList>

          <TabsContent value="write" className="m-0">
            <div className="border-t">
              <Editor
                height={height}
                value={value}
                onChange={handleEditorChange}
                options={editorOptions}
                onMount={(editor) => {
                  editorRef.current = editor;
                }}
                className="focus:outline-none"
              />
            </div>
          </TabsContent>

          <TabsContent value="preview" className="m-0">
            <div className="border-t p-6" style={{ height: height, overflow: 'auto' }}>
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown>{value || placeholder}</ReactMarkdown>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="split" className="m-0">
            <div className="border-t flex" style={{ height: height }}>
              <div className="flex-1 border-r">
                <Editor
                  height={height}
                  value={value}
                  onChange={handleEditorChange}
                  options={editorOptions}
                  onMount={(editor) => {
                    editorRef.current = editor;
                  }}
                />
              </div>
              <div className="flex-1 p-6 overflow-auto">
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown>{value || placeholder}</ReactMarkdown>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ModernRichTextEditor;