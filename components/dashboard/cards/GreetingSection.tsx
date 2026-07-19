'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Store } from 'lucide-react';

interface GreetingSectionProps {
  userName: string;
  businessName?: string;
}

export function GreetingSection({ userName, businessName }: GreetingSectionProps) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const displayName = businessName || userName;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
      <div className="flex items-center gap-3">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{greeting}, {displayName}</h1>
        <span className="text-xl md:text-2xl" role="img" aria-label="waving hand">👋</span>
      </div>
      {businessName && (
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Store className="h-3.5 w-3.5" />
          <span>Manage your store</span>
        </div>
      )}
      <p className="text-sm text-gray-500 dark:text-gray-400">Here's what's happening with your business today.</p>
    </motion.div>
  );
}
