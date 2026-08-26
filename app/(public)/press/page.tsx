'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Download, FileText, Image, Video, Newspaper, BookOpen, Mail, ExternalLink } from 'lucide-react';

const pressResources = [
  { icon: Download, title: 'Brand Kit', description: 'Download our logo, colors, and brand guidelines in various formats.', items: 'SVG, PNG, EPS' },
  { icon: Image, title: 'Press Photos', description: 'High-resolution photos of our team, office, and leadership.', items: 'JPG, 300dpi' },
  { icon: FileText, title: 'Fact Sheet', description: 'Key company facts, metrics, and milestones for media reference.', items: 'PDF' },
  { icon: Video, title: 'B-Roll & Media', description: 'Video footage and multimedia assets for broadcast use.', items: 'MP4, MOV' },
];

const pressReleases = [
  { title: 'Carticom Raises $10M Series A to Expand Across Africa', date: 'Jun 20, 2026', source: 'TechCrunch' },
  { title: 'Carticom Launches AI-Powered Customer Support for Merchants', date: 'Jun 5, 2026', source: 'Techpoint Africa' },
  { title: 'Carticom Partners with Paystack for Seamless Payments', date: 'May 15, 2026', source: 'Business Day' },
  { title: 'Carticom Crosses 50,000 Active Merchants Milestone', date: 'Apr 28, 2026', source: 'Nairametrics' },
  { title: 'Carticom Launches Integrated Payment System for Trusted Trade', date: 'Apr 10, 2026', source: 'Punch Nigeria' },
];

export default function PressPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Press Kit</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Resources for journalists, analysts, and media professionals covering Carticom and the African commerce ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pressResources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <resource.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{resource.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{resource.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{resource.items}</span>
                <Download className="w-4 h-4 text-blue-600" />
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
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Press Releases</h2>
          <div className="space-y-4">
            {pressReleases.map((release, index) => (
              <motion.div
                key={release.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-wrap items-center justify-between gap-4 hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                    {release.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                    <span>{release.source}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>{release.date}</span>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-2xl p-8 text-center"
        >
          <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Media Inquiries</h2>
          <p className="text-gray-600 mb-4 max-w-lg mx-auto">
            For press and media inquiries, please reach out to our communications team.
          </p>
          <a
            href="mailto:press@carticom.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            <Mail className="w-4 h-4" />
            press@carticom.com
          </a>
        </motion.div>
      </Container>
    </main>
  );
}
