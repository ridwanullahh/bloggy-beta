import React, { useState } from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Gravatar } from '../../../utils/gravatar';

interface MediumContactProps { post?: any }

export const MediumContact: React.FC<MediumContactProps> = ({ post }) => {
  const { blog } = useTheme();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitting, setSubmitting] = useState(false);

  const onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="medium-contact">
      <section className="py-14 border-b">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Gravatar
            email={blog.ownerId}
            size={80}
            className="w-20 h-20 rounded-full border mx-auto"
            alt={blog.title}
            fallback={<div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center text-white font-bold text-2xl mx-auto">{blog.title.charAt(0).toUpperCase()}</div>}
          />
          <h1 className="text-3xl md:text-4xl font-bold mt-6" style={{ fontFamily: 'sohne, \"Helvetica Neue\", Helvetica, Arial, sans-serif' }}>Get in touch</h1>
          <p className="mt-3 opacity-80">I’d love to hear from you. Whether you have a question or just want to say hi.</p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {status === 'success' && (
            <div className="mb-6 p-3 rounded-md border flex items-center text-sm">
              <CheckCircle className="w-4 h-4 mr-2" /> Your message has been sent.
            </div>
          )}
          {status === 'error' && (
            <div className="mb-6 p-3 rounded-md border flex items-center text-sm">
              <AlertCircle className="w-4 h-4 mr-2" /> Something went wrong. Try again.
            </div>
          )}
          <form onSubmit={onSubmit} className="space-y-4" aria-label="Contact form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input id="name" name="name" value={form.name} onChange={onChange} required className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={onChange} required className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2" />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
              <input id="subject" name="subject" value={form.subject} onChange={onChange} required className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
              <textarea id="message" name="message" rows={6} value={form.message} onChange={onChange} required className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 resize-vertical" />
            </div>
            <button type="submit" disabled={submitting} className="inline-flex items-center px-5 py-2 rounded-md border text-sm font-medium">
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send message
                </>
              )}
            </button>
          </form>

          {post?.content && (
            <div className="prose max-w-none mt-10">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          )}
        </div>
      </section>

      <style>{`
        .medium-contact { font-family: var(--theme-font-family); color: var(--theme-color-text); }
        .medium-contact section { border-color: var(--theme-color-border); }
        .medium-contact input, .medium-contact textarea, .medium-contact button { border-color: var(--theme-color-border); background: var(--theme-color-surface); color: var(--theme-color-text); }
        .prose a { color: var(--theme-color-primary); }
      `}</style>
    </div>
  );
};

export default MediumContact;

