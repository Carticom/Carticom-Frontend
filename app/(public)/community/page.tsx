'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Users, MessageCircle, Calendar, Award, Code2, X, Globe, ArrowRight } from 'lucide-react';

const communityLinks = [
  { icon: MessageCircle, title: 'Discord Server', description: 'Join our real-time chat community for discussions and support.', members: '3,500+', color: 'bg-indigo-50 text-indigo-600' },
  { icon: Code2, title: 'GitHub', description: 'Contribute to open-source projects and explore our codebase.', members: '1,200+', color: 'bg-gray-50 text-gray-900' },
  { icon: X, title: 'Twitter (X)', description: 'Follow us for the latest updates, tips, and community highlights.', members: '15,000+', color: 'bg-sky-50 text-sky-600' },
  { icon: Globe, title: 'Community Forum', description: 'Ask questions, share knowledge, and connect with other merchants.', members: '8,000+', color: 'bg-emerald-50 text-emerald-600' },
];

const events = [
  { title: 'Carticom Connect Lagos 2026', date: 'Aug 15, 2026', type: 'In-Person', attendees: '200+' },
  { title: 'E-Commerce Masterclass: Scaling Your Store', date: 'Aug 22, 2026', type: 'Webinar', attendees: '500+' },
  { title: 'Community AMA with the CTO', date: 'Sep 5, 2026', type: 'Live Stream', attendees: '1,000+' },
  { title: 'Hackathon: Build on Carticom API', date: 'Sep 20, 2026', type: 'Virtual', attendees: '300+' },
];

export default function CommunityPage() {
  return (
    <main className="flex-1 py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mb-6">
            <Users className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of merchants, developers, and partners building the future of commerce in Africa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {communityLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${link.color}`}>
                <link.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{link.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{link.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{link.members} members</span>
                <ArrowRight className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{event.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                    <span>{event.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>{event.type}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>{event.attendees}</span>
                  </div>
                </div>
                <Award className="w-5 h-5 text-gray-300 flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-10 text-center text-white"
        >
          <Users className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-3">Join Our Community</h2>
          <p className="text-blue-100 mb-6 max-w-lg mx-auto">
            Be part of the fastest-growing merchant community in Africa. Share insights, get support, and grow together.
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-xl font-medium hover:bg-blue-50 transition-colors">
            <MessageCircle className="w-4 h-4" />
            Join Discord
          </button>
        </motion.div>
      </Container>
    </main>
  );
}
