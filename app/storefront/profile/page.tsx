'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User, LogIn, LogOut, Package, Mail, Phone, BadgeCheck } from 'lucide-react';
import { useAuthStore } from '@/features/auth/store/auth.store';
import {
  getCustomerToken,
  getCustomerUser,
  clearCustomerSession,
  type CustomerAuthData,
} from '@/features/storefront/services/customer-auth.service';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LoadingState } from '@/components/dashboard/shared/StateComponents';

function SignedOutPanel() {
  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 space-y-4">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Profile</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Sign in to view your profile, manage your details, and access your order history.
        </p>
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link href="/storefront/login">
            <LogIn className="h-5 w-5 mr-2" />
            Customer sign in
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
          <Link href="/login?redirect=/dashboard">Business owner sign in</Link>
        </Button>
      </div>
    </div>
  );
}

function CustomerPanel({ customer }: { customer: CustomerAuthData }) {
  const router = useRouter();
  const initials = (customer.fullName || customer.email || 'C')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Profile</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your store account details.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 rounded-full">
            <AvatarFallback className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-lg font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              {customer.fullName || 'Customer'}
              <BadgeCheck className="h-5 w-5 text-emerald-500" aria-label="Customer account" />
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Store customer</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 border-t border-gray-100 dark:border-gray-800 pt-6">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> Email
            </p>
            <p className="text-sm text-gray-900 dark:text-white">{customer.email}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 border-t border-gray-100 dark:border-gray-800 pt-6">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/storefront/orders">
              <Package className="h-4 w-4 mr-2" />
              View my orders
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full sm:w-auto text-red-600 dark:text-red-400 hover:text-red-700"
            onClick={() => {
              clearCustomerSession();
              router.refresh();
            }}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const authLoading = useAuthStore((s) => s.isLoading);
  const logout = useAuthStore((s) => s.logout);
  const [customer, setCustomer] = useState<CustomerAuthData | null>(null);
  const [customerChecked, setCustomerChecked] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setCustomer(getCustomerUser());
      setCustomerChecked(true);
    }
  }, [authLoading, isAuthenticated]);

  if (authLoading) return <LoadingState message="Checking your account..." />;

  // Storefront customers use their own store-scoped session.
  if (!isAuthenticated || !user) {
    if (!customerChecked) return <LoadingState message="Checking your account..." />;
    if (customer && getCustomerToken()) return <CustomerPanel customer={customer} />;
    return <SignedOutPanel />;
  }

  const initials = user.fullName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Profile</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your account details across Carticom stores.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 rounded-full">
            <AvatarImage src={user.avatarUrl} alt={user.fullName} />
            <AvatarFallback className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-lg font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              {user.fullName}
              {user.emailVerified && (
                <BadgeCheck className="h-5 w-5 text-emerald-500" aria-label="Email verified" />
              )}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.role.replace(/_/g, ' ')}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 border-t border-gray-100 dark:border-gray-800 pt-6">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> Email
            </p>
            <p className="text-sm text-gray-900 dark:text-white">{user.email}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" /> Phone
            </p>
            <p className="text-sm text-gray-900 dark:text-white">{user.phone || 'Not provided'}</p>
          </div>
          {user.businessName && (
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
                Business
              </p>
              <p className="text-sm text-gray-900 dark:text-white">{user.businessName}</p>
            </div>
          )}
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Member since
            </p>
            <p className="text-sm text-gray-900 dark:text-white">
              {new Date(user.createdAt).toLocaleDateString('en-NG', {
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 border-t border-gray-100 dark:border-gray-800 pt-6">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/storefront/orders">
              <Package className="h-4 w-4 mr-2" />
              View my orders
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full sm:w-auto text-red-600 dark:text-red-400 hover:text-red-700"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}
