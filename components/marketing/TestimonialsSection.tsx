'use client';

import { motion } from 'framer-motion';
import { Star, Quote, User } from 'lucide-react';

const TESTIMONIALS = [
  { name: 'Chioma Okafor', business: 'Luxe Fashion NG, Lagos', role: 'Founder', quote: 'We used to run our boutique from Instagram DMs and bank transfers. Now every order, receipt and inventory count lives in one dashboard. It honestly feels like having a manager for the shop.', rating: 5 },
  { name: 'Emeka Nwosu', business: 'TechVille Electronics, Abuja', role: 'CEO', quote: 'The thing that sold me is that money lands with Paystack and Flutterwave — the same processors my customers already trust. No new payment apps, no distrust at checkout.', rating: 5 },
  { name: 'Amina Suleiman', business: 'Glow Beauty, Kano', role: 'Owner', quote: 'Reports I used to build by hand every Sunday now generate themselves. I finally know exactly which products move and which ones sit on the shelf.', rating: 5 },
  { name: 'Kwame Mensah', business: 'FreshHarvest, Accra', role: 'Director', quote: 'We joined from Ghana and sell across three cities. Multi-store management was the reason we chose Carticom — one login, all our shops, real-time stock.', rating: 5 },
  { name: 'Tunde Bakare', business: 'Adire Republic, Ibadan', role: 'Creative Director', quote: 'My storefront went live in an afternoon with a template that finally looks like our brand. Customers tell me it feels like shopping on a big global platform.', rating: 5 },
  { name: 'Wanjiru Kamau', business: 'Kiko Store, Nairobi', role: 'Co-founder', quote: 'Support answered within minutes when a payout was slow. That kind of care is why we moved our whole catalogue over within a week.', rating: 5 },
];

const CAPABILITIES = [
  { value: '10+', label: 'Storefront templates' },
  { value: '2', label: 'Payment providers (Paystack, Flutterwave)' },
  { value: '₦0', label: 'Commission on your sales' },
  { value: '30+', label: 'Currencies & regions supported' },
  { value: '24/7', label: 'Human support' },
  { value: '7', label: 'Days of free trial' },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">Trusted by Businesses</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">What Our Users Say</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 md:p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-blue-500 text-blue-500" />
                ))}
              </div>
              <Quote className="h-6 w-6 text-blue-200 mb-3" />
              <p className="text-gray-700 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.business}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 p-8 md:p-12 shadow-xl shadow-blue-200/30">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {CAPABILITIES.map((m) => (
                <div key={m.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-white">{m.value}</p>
                  <p className="text-sm text-blue-200 mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
