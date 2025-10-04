import React, { useState } from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Send, Terminal } from 'lucide-react';

export const DeveloperDarkContact: React.FC = () => {
  const { blog } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Message sent!');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="developer-dark-contact bg-gray-900 min-h-screen text-gray-300">
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-6">
            <Terminal className="w-10 h-10 text-green-500" />
            <h1 className="text-4xl font-mono text-green-500">$ contact</h1>
          </div>
          <p className="text-xl text-gray-400 font-mono">> Let's connect</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 rounded-lg border border-gray-700 p-8">
          <div>
            <label htmlFor="name" className="block text-sm font-mono text-green-500 mb-2"># Name</label>
            <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-gray-300 focus:border-green-500 focus:outline-none font-mono" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-mono text-green-500 mb-2"># Email</label>
            <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-gray-300 focus:border-green-500 focus:outline-none font-mono" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-mono text-green-500 mb-2"># Message</label>
            <textarea id="message" required rows={6} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-gray-300 focus:border-green-500 focus:outline-none font-mono" />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-gray-900 py-3 rounded font-mono font-bold hover:bg-green-500 transition-colors disabled:opacity-50 flex items-center justify-center">
            {isSubmitting ? '// Sending...' : (<><Send className="w-5 h-5 mr-2" />$ send</>)}
          </button>
        </form>
      </div>

      <style>{`.developer-dark-contact { font-family: var(--theme-font-family); }`}</style>
    </div>
  );
};

export default DeveloperDarkContact;
