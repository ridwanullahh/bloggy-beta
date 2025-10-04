import React, { useState } from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Send, Mail } from 'lucide-react';

export const CleanSlateContact: React.FC = () => {
  const { blog } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Thank you for your message!');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="clean-slate-contact">
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-6">Get in Touch</h1>
          <p className="text-lg text-gray-600 text-center mb-12">We'd love to hear from you.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea id="message" required rows={6} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center">
              {isSubmitting ? 'Sending...' : (<><Send className="w-5 h-5 mr-2" />Send Message</>)}
            </button>
          </form>
        </div>
      </section>

      <style>{`.clean-slate-contact { font-family: var(--theme-font-family); }`}</style>
    </div>
  );
};

export default CleanSlateContact;
