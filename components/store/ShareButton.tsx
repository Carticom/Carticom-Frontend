'use client';

import { useState } from 'react';
import { Share2, Check, MessageCircle, LinkIcon } from 'lucide-react';

interface ShareButtonProps {
  url: string;
  title: string;
}

export function ShareButton({ url, title }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Check out ${title} on Carticom: ${url}`)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <button
            onClick={() => { window.open(whatsappUrl, '_blank'); setOpen(false); }}
            className="flex items-center gap-2 rounded-full bg-green-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-green-600 transition-all"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </button>
          <button
            onClick={() => { copyLink(); setOpen(false); }}
            className="flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-gray-900 transition-all"
          >
            {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-blue-600 p-3 text-white shadow-lg hover:bg-blue-700 transition-all"
        aria-label="Share store"
      >
        <Share2 className="h-5 w-5" />
      </button>
    </div>
  );
}
