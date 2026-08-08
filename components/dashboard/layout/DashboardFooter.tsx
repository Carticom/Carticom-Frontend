import Link from 'next/link';

export function DashboardFooter() {
  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
        <p>Carticom &copy; {new Date().getFullYear()} Pan-African Commerce</p>
        <div className="flex items-center gap-4">
          <span>Version 1.0.0</span>
          <span className="hidden sm:inline">|</span>
          <Link href="/legal/privacy" className="hover:text-gray-700 dark:hover:text-gray-200">Privacy</Link>
          <Link href="/legal/terms" className="hover:text-gray-700 dark:hover:text-gray-200">Terms</Link>
          <Link href="/dashboard/support" className="hover:text-gray-700 dark:hover:text-gray-200">Support</Link>
        </div>
      </div>
    </footer>
  );
}
