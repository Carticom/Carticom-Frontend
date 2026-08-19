'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Briefcase, MapPin, Clock, Users, Rocket, Heart, Lightbulb, Handshake } from 'lucide-react';

const openRoles = [
  { title: 'Senior Software Engineer', department: 'Engineering', location: 'Lagos, Nigeria', type: 'Full-time' },
  { title: 'Product Designer', department: 'Design', location: 'Remote', type: 'Full-time' },
  { title: 'Customer Success Manager', department: 'Operations', location: 'Lagos, Nigeria', type: 'Full-time' },
  { title: 'Marketing Lead', department: 'Marketing', location: 'Lagos, Nigeria', type: 'Full-time' },
  { title: 'Data Analyst', department: 'Data', location: 'Remote', type: 'Contract' },
  { title: 'DevOps Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time' },
];

const values = [
  { icon: Rocket, title: 'Innovation', description: 'We push boundaries to build solutions that empower African businesses.' },
  { icon: Heart, title: 'Customer First', description: 'Every decision we make starts with what is best for our users.' },
  { icon: Lightbulb, title: 'Ownership', description: 'We take responsibility and act like owners of the business.' },
  { icon: Handshake, title: 'Integrity', description: 'We operate with transparency and honesty in everything we do.' },
];

export default function CareersPage() {
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
            <Briefcase className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join the Carticom Team</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help us build the commerce operating system that powers African businesses.
            We are looking for passionate people to join our mission.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{value.title}</h3>
              <p className="text-sm text-gray-500">{value.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Open Positions</h2>
          <div className="space-y-4">
            {openRoles.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-wrap items-center justify-between gap-4 hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{role.title}</h3>
                    <p className="text-sm text-gray-500">{role.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {role.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {role.type}
                  </span>
                </div>
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
          <h2 className="text-2xl font-bold mb-3">Do Not See a Role That Fits?</h2>
          <p className="text-blue-100 mb-6 max-w-lg mx-auto">
            We are always looking for talented individuals. Send us your resume and we will keep you in mind for future opportunities.
          </p>
          <a
            href="mailto:careers@carticom.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-xl font-medium hover:bg-blue-50 transition-colors"
          >
            <Briefcase className="w-4 h-4" />
            Send Your Application
          </a>
        </motion.div>
      </Container>
    </main>
  );
}
