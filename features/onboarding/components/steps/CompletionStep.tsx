'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Store, Share2, ExternalLink } from 'lucide-react';

interface CompletionStepProps {
  onComplete: () => void;
}

export function CompletionStep({ onComplete }: CompletionStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-gradient-to-br from-green-600 to-emerald-600 p-4">
            <CheckCircle className="h-16 w-16 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Congratulations!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Your business is ready to go!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-6">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => window.open('/dashboard/store', '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View Store
        </Button>
        <Button
          onClick={onComplete}
          className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600"
        >
          <Store className="h-4 w-4 mr-2" />
          Go to Dashboard
        </Button>
      </div>
    </motion.div>
  );
}