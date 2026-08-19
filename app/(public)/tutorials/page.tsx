'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { GraduationCap, Play, BookOpen, BarChart3, Store, CreditCard, Settings, Search, Clock } from 'lucide-react';

const tutorialCategories = [
  { icon: Store, title: 'Store Setup', count: '8 tutorials', duration: '2.5 hours', level: 'Beginner' },
  { icon: BarChart3, title: 'Analytics & Reports', count: '6 tutorials', duration: '2 hours', level: 'Intermediate' },
  { icon: CreditCard, title: 'Payments & Escrow', count: '5 tutorials', duration: '1.5 hours', level: 'Beginner' },
  { icon: Settings, title: 'Advanced Configuration', count: '7 tutorials', duration: '3 hours', level: 'Advanced' },
];

const featuredTutorials = [
  {
    title: 'Complete Guide to Setting Up Your Carticom Store',
    description: 'A step-by-step walkthrough from account creation to your first sale.',
    duration: '45 min',
    level: 'Beginner',
    category: 'Store Setup'},
  {
    title: 'Understanding the Escrow Payment System',
    description: 'Learn how our escrow system protects both buyers and sellers in transactions.',
    duration: '30 min',
    level: 'Beginner',
    category: 'Payments'},
  {
    title: 'Advanced Analytics: Making Data-Driven Decisions',
    description: 'Use Carticom analytics tools to optimize your store performance and increase sales.',
    duration: '60 min',
    level: 'Advanced',
    category: 'Analytics'},
  {
    title: 'Automating Your Workflow with Custom Solutions',
    description: 'Build automation workflows to streamline your business operations.',
    duration: '50 min',
    level: 'Advanced',
    category: 'Custom Solutions'},
  {
    title: 'Managing Inventory Across Multiple Channels',
    description: 'Keep your inventory synchronized across all your sales channels.',
    duration: '35 min',
    level: 'Intermediate',
    category: 'Inventory'},
  {
    title: 'Optimizing Your Store for Mobile Shoppers',
    description: 'Best practices for creating a seamless mobile shopping experience.',
    duration: '25 min',
    level: 'Intermediate',
    category: 'Store Design'},
];

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

export default function TutorialsPage() {
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
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tutorials</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Step-by-step guides and video tutorials to help you master the Carticom platform.
          </p>
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tutorials..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {levels.map((level) => (
            <button
              key={level}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${
                level === 'All Levels'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tutorialCategories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <cat.icon className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">{cat.title}</h3>
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                <span>{cat.count}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{cat.duration}</span>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                {cat.level}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTutorials.map((tutorial, index) => (
            <motion.div
              key={tutorial.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="h-40 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center relative">
                <Play className="w-12 h-12 text-white/70 group-hover:scale-110 transition-transform" />
                <span className="absolute bottom-3 right-3 px-2 py-1 bg-black/30 text-white text-xs rounded-lg">
                  {tutorial.duration}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                    {tutorial.category}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    {tutorial.level}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {tutorial.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">{tutorial.description}</p>
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
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
            <BookOpen className="w-4 h-4" />
            Browse All Tutorials
          </button>
        </motion.div>
      </Container>
    </main>
  );
}
