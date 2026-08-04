'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Newspaper, Calendar, User, Clock, Tag, ArrowRight, Search } from 'lucide-react';

const featuredPosts = [
  {
    category: 'Product',
    title: 'Introducing AI-Powered Customer Support for African Businesses',
    excerpt: 'Carticom launches intelligent automation tools to help merchants provide 24/7 customer support across multiple channels.',
    author: 'Carticom Team',
    date: 'Jul 15, 2026',
    readTime: '5 min read'},
  {
    category: 'Business',
    title: 'The Rise of Digital Commerce in West Africa: 2026 Trends',
    excerpt: 'An in-depth analysis of the e-commerce landscape in West Africa and how businesses can capitalize on emerging opportunities.',
    author: 'Carticom Team',
    date: 'Jul 10, 2026',
    readTime: '8 min read'},
  {
    category: 'Tutorial',
    title: 'How to Set Up Your First Online Store in Under 30 Minutes',
    excerpt: 'A step-by-step guide to launching your e-commerce store with Carticom, from registration to your first sale.',
    author: 'Carticom Team',
    date: 'Jul 5, 2026',
    readTime: '6 min read'},
];

const categories = ['All', 'Product', 'Business', 'Tutorial', 'Engineering', 'Community', 'Events'];

export default function BlogPage() {
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
            <Newspaper className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Carticom Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, tutorials, and updates from the team building the commerce operating system for Africa.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  cat === 'All'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Newspaper className="w-12 h-12 text-white/50" />
              </div>
              <div className="p-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 mb-3">
                  <Tag className="w-3 h-3 mr-1" />
                  {post.category}
                </span>
                <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium">
            Load More Articles
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </Container>
    </main>
  );
}
