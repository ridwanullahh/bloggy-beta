import React, { useState } from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Send, Heart } from 'lucide-react';

export const LifestyleChicContact: React.FC = () => {
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
    <div className="lifestyle-chic-contact">
      <section className="py-16 bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-serif italic text-pink-900 mb-6">Let's Connect</h1>
          <p className="text-xl text-pink-800 italic">We'd love to hear from you</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-3xl shadow-xl p-8">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-pink-900 mb-2 italic">Your Name</label>
            <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border border-pink-300 rounded-full focus:ring-2 focus:ring-pink-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-pink-900 mb-2 italic">Email Address</label>
            <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-pink-300 rounded-full focus:ring-2 focus:ring-pink-500" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-pink-900 mb-2 italic">Message</label>
            <textarea id="message" required rows={6} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 border border-pink-300 rounded-3xl focus:ring-2 focus:ring-pink-500" />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-full font-semibold hover:from-pink-700 hover:to-purple-700 transition-all disabled:opacity-50 flex items-center justify-center shadow-lg">
            {isSubmitting ? 'Sending...' : (<><Send className="w-5 h-5 mr-2" />Send Message with <Heart className="w-4 h-4 mx-1 fill-current" /></>)}
          </button>
        </form>
      </div>

      <style>{`.lifestyle-chic-contact { font-family: var(--theme-font-family); }`}</style>
    </div>
  );
};

export default LifestyleChicContact;
