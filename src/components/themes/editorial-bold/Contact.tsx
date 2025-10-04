import React, { useState } from 'react';
import { useTheme } from '../modular/ThemeProvider';
import { Send, Mail, Phone } from 'lucide-react';

export const EditorialBoldContact: React.FC = () => {
  const { blog } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Thank you for contacting us!');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="editorial-bold-contact">
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6 uppercase">Contact Us</h1>
          <p className="text-xl text-red-100">Have a story tip or want to get in touch?</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6 uppercase">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-600 text-white flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <p className="text-gray-600">news@{blog.slug}.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-600 text-white flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2 uppercase">Name</label>
                <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 focus:ring-0" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 uppercase">Email</label>
                <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 focus:ring-0" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2 uppercase">Message</label>
                <textarea id="message" required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 focus:ring-0" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-red-600 text-white py-3 font-bold uppercase tracking-wide hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center">
                {isSubmitting ? 'Sending...' : (<><Send className="w-5 h-5 mr-2" />Send Message</>)}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`.editorial-bold-contact { font-family: var(--theme-font-family); }`}</style>
    </div>
  );
};

export default EditorialBoldContact;
