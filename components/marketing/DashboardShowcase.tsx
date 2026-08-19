'use client';

import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Settings,
  Wallet,
  Bell,
  Search,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: ShoppingCart, label: 'Orders' },
  { icon: Package, label: 'Products' },
  { icon: Users, label: 'Customers' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
];

const KPIS = [
  { icon: Wallet, label: 'Total sales', value: '₦1,284,500', delta: '+18.2%' },
  { icon: ShoppingCart, label: 'Orders', value: '246', delta: '+12.5%' },
  { icon: Package, label: 'Products', value: '132', delta: 'this month' },
  { icon: Users, label: 'Customers', value: '89', delta: '+9.1%' },
];

const ORDERS = [
  { id: '#1042', customer: 'Chioma Okafor', item: 'Linen Dress (M)', amount: '₦45,000', status: 'Paid', tone: 'bg-brand-soft text-brand-dark' },
  { id: '#1041', customer: 'Tunde Bakare', item: 'Leather Loafers', amount: '₦62,000', status: 'Paid', tone: 'bg-brand-soft text-brand-dark' },
  { id: '#1040', customer: 'Amaka Nwosu', item: 'Beige Handbag', amount: '₦38,000', status: 'Pending', tone: 'bg-amber-50 text-amber-600' },
  { id: '#1039', customer: 'Emeka Umeh', item: 'Sneakers (42)', amount: '₦55,000', status: 'Delivered', tone: 'bg-brand-soft text-brand' },
  { id: '#1038', customer: 'Funke Adeyemi', item: 'Ankara Gown', amount: '₦29,500', status: 'Paid', tone: 'bg-brand-soft text-brand-dark' },
];

const LOW_STOCK = [
  { name: 'Adire Wrap Skirt', stock: 3 },
  { name: 'Men’s Tee (L)', stock: 5 },
  { name: 'Handmade Beads', stock: 2 },
];

export function DashboardShowcase() {
  return (
    <section className="relative overflow-hidden bg-brand-soft/50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">Product</p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Your entire business, in one place</h2>
          <p className="mt-4 text-lg text-gray-600">
            A clean dashboard that gives you everything at a glance — sales, orders, products, inventory, customers and
            analytics.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand/10 via-brand/10 to-transparent blur-2xl" />

          <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-2xl shadow-brand/10">
            <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/80 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-brand/70" />
              </div>
              <div className="ml-3 flex-1 rounded-lg bg-white border border-gray-200/70 px-3 py-1 text-xs text-gray-400">
                app.carticom.com/dashboard
              </div>
            </div>

            <div className="flex">
              <aside className="hidden w-52 shrink-0 border-r border-gray-100 bg-gray-50/40 p-4 md:block">
                <div className="mb-6 flex items-center gap-2 px-1">
                  <span className="h-5 w-5 rounded-md bg-brand" />
                  <span className="text-sm font-bold text-brand">Carticom</span>
                </div>
                <nav className="space-y-1">
                  {NAV.map((n) => (
                    <div
                      key={n.label}
                      className={cn(
                        'flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                        n.active ? 'bg-brand text-white' : 'text-gray-500 hover:bg-gray-100'
                      )}
                    >
                      <n.icon className="h-4 w-4" />
                      {n.label}
                    </div>
                  ))}
                </nav>
              </aside>

              <div className="min-w-0 flex-1 p-4 md:p-6">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Sales overview</h3>
                    <p className="text-xs text-gray-500">Last 30 days</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 sm:flex">
                      <Search className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-xs text-gray-400">Search</span>
                    </div>
                    <div className="relative">
                      <Bell className="h-4.5 w-4.5 text-gray-500" />
                      <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-brand" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {KPIS.map((k) => (
                    <div key={k.label} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <k.icon className="h-4 w-4 text-brand/60" />
                        <span className="text-[10px] font-semibold text-brand-dark">{k.delta}</span>
                      </div>
                      <p className="mt-2 text-lg font-bold text-gray-900 md:text-xl">{k.value}</p>
                      <p className="text-xs text-gray-500">{k.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
                  <div className="rounded-xl border border-gray-100 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-800">Revenue</p>
                      <p className="text-xs text-gray-400">Jun — Jul</p>
                    </div>
                    <svg viewBox="0 0 300 100" className="h-28 w-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.18" />
                          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 78 L30 62 L60 70 L90 48 L120 56 L150 38 L180 46 L210 24 L240 34 L270 16 L300 26 L300 100 L0 100 Z"
                        fill="url(#revenueFill)"
                      />
                      <path
                        d="M0 78 L30 62 L60 70 L90 48 L120 56 L150 38 L180 46 L210 24 L240 34 L270 16 L300 26"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="mt-1 flex justify-between text-[10px] text-gray-400">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-100 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-800">Inventory</p>
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600">
                        3 low stock
                      </span>
                    </div>
                    <div className="space-y-3">
                      {LOW_STOCK.map((item) => (
                        <div key={item.name}>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="font-medium text-gray-700">{item.name}</span>
                            <span className="text-gray-400">{item.stock} left</span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                            <div
                              className={cn('h-full rounded-full', item.stock <= 3 ? 'bg-amber-400' : 'bg-brand')}
                              style={{ width: `${Math.max(8, item.stock * 8)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 overflow-hidden rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/60 px-4 py-2.5">
                    <p className="text-sm font-semibold text-gray-800">Recent orders</p>
                    <span className="text-xs font-medium text-brand-dark">View all</span>
                  </div>
                  <div className="hidden grid-cols-[1fr_1fr_1fr_0.6fr_0.5fr] gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400 sm:grid">
                    <span>Order</span>
                    <span>Customer</span>
                    <span>Item</span>
                    <span>Amount</span>
                    <span className="text-right">Status</span>
                  </div>
                  {ORDERS.map((o, i) => (
                    <div
                      key={o.id}
                      className={cn('grid grid-cols-2 gap-2 px-4 py-2.5 text-xs sm:grid-cols-[1fr_1fr_1fr_0.6fr_0.5fr] sm:items-center', i > 0 && 'border-t border-gray-50')}
                    >
                      <span className="font-medium text-gray-700">{o.id}</span>
                      <span className="hidden text-gray-600 sm:block">{o.customer}</span>
                      <span className="text-gray-500">{o.item}</span>
                      <span className="font-semibold text-gray-800">{o.amount}</span>
                      <span className="justify-self-end">
                        <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold', o.tone)}>{o.status}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute -right-3 -top-6 flex items-center gap-2.5 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-xl shadow-brand/10"
          >
            <CheckCircle2 className="h-4.5 w-4.5 text-brand" />
            <div>
              <p className="text-xs font-semibold text-gray-900">Order #1042 marked Paid</p>
              <p className="text-[11px] text-gray-500">₦45,000 settled to your balance</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="absolute -left-3 -bottom-6 flex items-center gap-2.5 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-xl shadow-brand/10"
          >
            <AlertTriangle className="h-4.5 w-4.5 text-amber-500" />
            <div>
              <p className="text-xs font-semibold text-gray-900">Inventory alert</p>
              <p className="text-[11px] text-gray-500">Adire Wrap Skirt — only 3 left</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
