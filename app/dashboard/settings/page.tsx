'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCurrentStoreId } from '@/hooks/useCurrentStore';
import { useSettings, useUpdateSettings } from '@/features/dashboard/hooks/useSettings';
import type { SettingsDto } from '@/features/dashboard/types/settings.types';
import { LoadingState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { useAuthStore } from '@/features/auth/store/auth.store';
import axiosInstance from '@/lib/axios';
import { showToast } from '@/lib/notifications/toast';
import {
  User, Shield, Bell, CreditCard, Puzzle, Palette,
  Key, Trash2, Lock, ExternalLink, CheckCircle, XCircle,
  AlertTriangle, Eye, EyeOff, Send
} from 'lucide-react';

const SECTIONS = [
  'Business', 'Account', 'Security', 'Notifications',
  'Payments', 'Integrations', 'Branding', 'API Keys', 'Danger Zone'
] as const;

type Section = typeof SECTIONS[number];

export default function SettingsPage() {
  const { storeId, isLoading: storeLoading } = useCurrentStoreId();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const { data: settings, isLoading, error, refetch } = useSettings(storeId ?? '');
  const updateSettings = useUpdateSettings();
  const [activeSection, setActiveSection] = useState<Section>('Business');

  // Business fields
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  // Account fields
  const [fullName, setFullName] = useState('');
  const [accountPhone, setAccountPhone] = useState('');
  const [savingAccount, setSavingAccount] = useState(false);

  // Notification fields
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [orderNotifications, setOrderNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [savingNotifications, setSavingNotifications] = useState(false);

  // Branding fields
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [secondaryColor, setSecondaryColor] = useState('#10B981');
  const [savingBranding, setSavingBranding] = useState(false);

  // Danger zone
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingStore, setDeletingStore] = useState(false);

  // Integration toggles
  const [whatsappAiEnabled, setWhatsappAiEnabled] = useState(false);
  const [instagramEnabled, setInstagramEnabled] = useState(false);
  const [facebookEnabled, setFacebookEnabled] = useState(false);

  const [syncedSettings, setSyncedSettings] = useState<SettingsDto | undefined>(undefined);
  if (settings !== syncedSettings) {
    setSyncedSettings(settings);
    if (settings?.business) {
      setBusinessName(settings.business.businessName ?? '');
      setPhone(settings.business.phone ?? '');
      setEmail(settings.business.email ?? '');
      setAddress(settings.business.address ?? '');
    }
    if (settings?.notifications) {
      setEmailNotifications(settings.notifications.emailNotifications ?? false);
      setOrderNotifications(settings.notifications.orderNotifications ?? false);
      setMarketingEmails(settings.notifications.marketingEmails ?? false);
    }
  }

  useEffect(() => {
    if (user) {
      setFullName(user.fullName ?? '');
      setAccountPhone(user.phone ?? '');
    }
  }, [user]);

  const handleSaveBusiness = () => {
    if (!storeId) return;
    updateSettings.mutate({
      storeId: storeId,
      data: {
        business: {
          businessName,
          email,
          phone,
          address
        }
      }
    });
  };

  const handleSaveAccount = async () => {
    if (!user) return;
    setSavingAccount(true);
    try {
      await axiosInstance.put('/api/v1/auth/profile', {
        fullName,
        phone: accountPhone,
      });
      setUser({ ...user, fullName, phone: accountPhone });
      showToast('success', 'Account updated successfully');
    } catch {
      showToast('error', 'Failed to update account');
    } finally {
      setSavingAccount(false);
    }
  };

  const handleSaveNotifications = async () => {
    if (!storeId) return;
    setSavingNotifications(true);
    try {
      await axiosInstance.put(`/api/v1/stores/${storeId}/settings`, {
        notifications: {
          emailNotifications,
          orderNotifications,
          marketingEmails,
        },
      });
      showToast('success', 'Notification preferences saved');
      refetch();
    } catch {
      showToast('error', 'Failed to save notification preferences');
    } finally {
      setSavingNotifications(false);
    }
  };

  const handleSaveBranding = async () => {
    if (!storeId) return;
    setSavingBranding(true);
    try {
      await axiosInstance.put(`/api/v1/stores/${storeId}`, {
        primaryColor,
        secondaryColor,
      });
      showToast('success', 'Branding saved successfully');
      refetch();
    } catch {
      showToast('error', 'Failed to save branding');
    } finally {
      setSavingBranding(false);
    }
  };

  const handleDeleteStore = async () => {
    if (!storeId) return;
    setDeletingStore(true);
    try {
      await axiosInstance.delete(`/api/v1/stores/${storeId}`);
      showToast('success', 'Store deleted successfully');
      window.location.href = '/dashboard';
    } catch {
      showToast('error', 'Failed to delete store');
    } finally {
      setDeletingStore(false);
      setShowDeleteConfirm(false);
    }
  };

  if (storeLoading || isLoading) {
    return <LoadingState message="Loading settings..." />;
  }

  if (error) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Configure your business, account, and integrations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="space-y-1">
          {SECTIONS.map((section) => {
            const iconMap: Record<Section, React.ReactNode> = {
              'Business': <User className="h-4 w-4" />,
              'Account': <User className="h-4 w-4" />,
              'Security': <Shield className="h-4 w-4" />,
              'Notifications': <Bell className="h-4 w-4" />,
              'Payments': <CreditCard className="h-4 w-4" />,
              'Integrations': <Puzzle className="h-4 w-4" />,
              'Branding': <Palette className="h-4 w-4" />,
              'API Keys': <Key className="h-4 w-4" />,
              'Danger Zone': <Trash2 className="h-4 w-4" />,
            };
            return (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === section
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                {iconMap[section]}
                {section}
              </button>
            );
          })}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeSection === 'Business' && (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Business Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Business Name</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Your business name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    rows={3}
                    placeholder="Business address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="+234"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSaveBusiness}
                  disabled={updateSettings.isPending}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {updateSettings.isPending ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {activeSection === 'Account' && (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={user?.email ?? ''}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed here</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={accountPhone}
                    onChange={(e) => setAccountPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="+234"
                  />
                </div>
                <button
                  onClick={handleSaveAccount}
                  disabled={savingAccount}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {savingAccount ? 'Saving...' : 'Save Account'}
                </button>
              </div>
            </div>
          )}

          {activeSection === 'Security' && (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Change Password</p>
                    <p className="text-xs text-gray-500">Update your account password regularly</p>
                  </div>
                  <Link
                    href="/change-password"
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 inline-flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    Change
                  </Link>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-500">Add an extra layer of security</p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    settings?.security?.twoFactorEnabled
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {settings?.security?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Active Sessions</p>
                    <p className="text-xs text-gray-500">
                      {settings?.security?.allowedIps?.length
                        ? `${settings.security.allowedIps.length} IP${settings.security.allowedIps.length !== 1 ? 's' : ''} whitelisted`
                        : 'No IP restrictions'}
                    </p>
                  </div>
                  <button className="px-4 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm">View</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'Notifications' && (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</p>
                    <p className="text-xs text-gray-500">Receive notifications via email</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={emailNotifications}
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      emailNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Order Notifications</p>
                    <p className="text-xs text-gray-500">Get notified about new orders</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={orderNotifications}
                    onClick={() => setOrderNotifications(!orderNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      orderNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      orderNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Marketing Emails</p>
                    <p className="text-xs text-gray-500">Receive marketing and promotional emails</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={marketingEmails}
                    onClick={() => setMarketingEmails(!marketingEmails)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      marketingEmails ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      marketingEmails ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <button
                  onClick={handleSaveNotifications}
                  disabled={savingNotifications}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {savingNotifications ? 'Saving...' : 'Save Preferences'}
                </button>
              </div>
            </div>
          )}

          {activeSection === 'Payments' && (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Paystack</p>
                      <p className="text-xs text-gray-500">Accept card & bank transfers</p>
                    </div>
                  </div>
                  <button
                    disabled
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Flutterwave</p>
                      <p className="text-xs text-gray-500">Accept payments across Africa</p>
                    </div>
                  </div>
                  <button
                    disabled
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Payment gateway integration is coming soon. You can configure your payment providers from this page once available.
                </p>
              </div>
            </div>
          )}

          {activeSection === 'Integrations' && (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Integrations</h2>
              <div className="space-y-4">
                {[
                  { key: 'whatsapp', label: 'WhatsApp AI', desc: 'AI-powered WhatsApp ordering', enabled: whatsappAiEnabled, toggle: () => setWhatsappAiEnabled(!whatsappAiEnabled) },
                  { key: 'instagram', label: 'Instagram Shopping', desc: 'Sync products to Instagram', enabled: instagramEnabled, toggle: () => setInstagramEnabled(!instagramEnabled) },
                  { key: 'facebook', label: 'Facebook Shop', desc: 'Sell on Facebook Marketplace', enabled: facebookEnabled, toggle: () => setFacebookEnabled(!facebookEnabled) },
                ].map(({ key, label, desc, enabled, toggle }) => (
                  <div key={key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
                      <p className="text-xs text-gray-500">{desc}</p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={enabled}
                      onClick={toggle}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        enabled ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'Branding' && (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Branding</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-700 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-mono"
                    />
                    <span className="text-sm text-gray-500">Used for buttons, links, and accents</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Secondary Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-700 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-mono"
                    />
                    <span className="text-sm text-gray-500">Used for secondary elements</span>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <p className="text-xs font-medium text-gray-500 uppercase mb-2">Preview</p>
                  <div className="flex gap-2">
                    <div
                      className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Primary Button
                    </div>
                    <div
                      className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                      style={{ backgroundColor: secondaryColor }}
                    >
                      Secondary Button
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSaveBranding}
                  disabled={savingBranding}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {savingBranding ? 'Saving...' : 'Save Branding'}
                </button>
              </div>
            </div>
          )}

          {activeSection === 'API Keys' && (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">API Keys</h2>
              <div className="space-y-4">
                <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                  <Key className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">API keys are coming soon</p>
                  <p className="text-xs text-gray-400 mt-1">You&apos;ll be able to generate API keys for programmatic access</p>
                </div>
                <button
                  disabled
                  className="px-6 py-2.5 bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed text-sm font-medium"
                >
                  Generate API Key
                </button>
              </div>
            </div>
          )}

          {activeSection === 'Danger Zone' && (
            <div className="rounded-2xl border border-red-200 dark:border-red-900/50 bg-white dark:bg-gray-900 p-6">
              <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">Danger Zone</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Irreversible and destructive actions. Proceed with caution.
              </p>
              <div className="space-y-3">
                {showDeleteConfirm ? (
                  <div className="p-4 border border-red-200 dark:border-red-900 rounded-lg bg-red-50 dark:bg-red-900/10">
                    <div className="flex items-start gap-3 mb-4">
                      <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-red-800 dark:text-red-300">
                          Are you absolutely sure?
                        </p>
                        <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                          This action cannot be undone. This will permanently delete your store and all associated data.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleDeleteStore}
                        disabled={deletingStore}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 text-sm font-medium"
                      >
                        {deletingStore ? 'Deleting...' : 'Yes, delete my store'}
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-6 py-2.5 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium"
                  >
                    Delete Store
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
