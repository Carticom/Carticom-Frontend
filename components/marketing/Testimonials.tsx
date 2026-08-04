'use client';


import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Container } from '@/components/common/Container';

const testimonials = [
  {
    quote: 'Carticom transformed our business. We went from struggling with multiple tools to having everything in one place. Our revenue grew 300% in 6 months.',
    author: 'Chidi Okafor',
    role: 'CEO, TechStyle NG',
    avatar: 'CO',
    rating: 5},
  {
    quote: 'The AI automation for WhatsApp is a game-changer. We handle 10x more customer inquiries without hiring additional support staff.',
    author: 'Emeka Nwosu',
    role: 'Operations Manager, QuickMart',
    avatar: 'EN',
    rating: 5},
  {
    quote: 'Finally, a platform that understands the African market. The payment integrations with Paystack and Flutterwave work flawlessly.',
    author: 'Fatima Ibrahim',
    role: 'E-commerce Director, ShopNaija',
    avatar: 'FI',
    rating: 5},
  {
    quote: 'The analytics dashboard helps us make data-driven decisions. We can see exactly what products are trending and optimize our inventory.',
    author: 'Oluwaseun Adeyemi',
    role: 'Head of Sales, GadgetWorld',
    avatar: 'OA',
    rating: 5},
  {
    quote: 'Carticom support is exceptional. They helped us migrate from our old platform in just 3 days with zero downtime.',
    author: 'Ngozi Eze',
    role: 'CTO, FreshFoods',
    avatar: 'NE',
    rating: 5},
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 text-yellow-600 text-sm font-medium mb-6"
          >
            <Star className="h-4 w-4" aria-hidden="true" />
            Customer Stories
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Loved by thousands of African businesses
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Join over 50,000 merchants who trust Carticom to power their businesses across Africa.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                ))}
              </div>

              <div className="relative mb-4">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-100" aria-hidden="true" />
                <p className="text-gray-700 leading-relaxed relative z-10">
                  {testimonial.quote}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 flex-wrap justify-center">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['JD', 'AS', 'MK', 'PO'].map((initials, i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 ml-2">
                <span className="font-semibold text-gray-900">50,000+</span> happy merchants
              </p>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
              ))}
              <span className="ml-2 text-sm font-medium text-gray-700">4.9/5 from 2,000+ reviews</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}