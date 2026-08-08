'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const channels = [
  { icon: Mail, label: 'Email', value: 'hello@carticom.com', href: 'mailto:hello@carticom.com' },
  { icon: MessageSquare, label: 'Live Chat', value: 'Available 24/7', href: '#' },
  { icon: Phone, label: 'Phone', value: '+234 800 000 0000', href: 'tel:+2348000000000' },
  { icon: MapPin, label: 'Office', value: 'Lagos, Nigeria', href: '#' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 mb-6">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700">Get in touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Have a question or need help? We&apos;re here for you.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
            {channels.map((ch) => (
              <a key={ch.label} href={ch.href} className="flex items-center gap-4 p-5 rounded-2xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors">
                  <ch.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{ch.label}</p>
                  <p className="text-sm text-gray-500">{ch.value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center rounded-2xl bg-green-50 border border-green-200">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                  <Send className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
                <p className="text-gray-600 mt-2">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-2xl border border-gray-200 bg-gray-50/50">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                    <input required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                    <input required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input type="email" required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                    <option>General Inquiry</option>
                    <option>Sales</option>
                    <option>Support</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                  <textarea rows={4} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" />
                </div>
                <Button type="submit" className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white h-12 text-sm">
                  <Send className="h-4 w-4 mr-2" /> Send Message
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
