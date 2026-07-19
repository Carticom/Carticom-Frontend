import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
        <ShieldAlert className="h-8 w-8 text-red-500" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h1>
      <p className="max-w-md text-sm text-gray-500 dark:text-gray-400">
        You do not have permission to access this area. Please contact your administrator if you believe this is a mistake.
      </p>
      <Link href="/dashboard" className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
        Back to Dashboard
      </Link>
    </div>
  );
}
