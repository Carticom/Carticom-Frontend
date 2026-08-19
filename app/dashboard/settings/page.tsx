'use client';

import { useState } from 'react';
import { useCurrentStoreId } from '@/hooks/useCurrentStore';
import { useSettings, useUpdateSettings } from '@/features/dashboard/hooks/useSettings';
import type { SettingsDto } from '@/features/dashboard/types/settings.types';
import { LoadingState, ErrorState } from '@/components/dashboard/shared/StateComponents';


const SECTIONS = [
  'Business', 'Account', 'Security', 'Notifications',
  'Payments', 'Integrations', 'Branding', 'API Keys', 'Danger Zone'
] as const;

type Section = typeof SECTIONS[number];

export default function SettingsPage() {
  const { storeId, isLoading: storeLoading } = useCurrentStoreId();
  const { data: settings, isLoading, error, refetch } = useSettings(storeId ?? '');
  const updateSettings = useUpdateSettings();
  const [activeSection, setActiveSection] = useState<Section>('Business');

  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const [syncedSettings, setSyncedSettings] = useState<SettingsDto | undefined>(undefined);
  if (settings !== syncedSettings) {
    setSyncedSettings(settings);
    if (settings?.business) {
      setBusinessName(settings.business.businessName ?? '');
      setPhone(settings.business.phone ?? '');
      setEmail(settings.business.email ?? '');
      setAddress(settings.business.address ?? '');
    }
  }

  const handleSaveBusiness = () => {
    if (!storeId) return;
    updateSettings.mutate({
      storeId: storeId,
      data: {
        business: {
          businessName,
          email,
          phone,
          address}}});
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
          {SECTIONS.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {section}
            </button>
          ))}
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
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Account preferences and email settings will appear here.
              </p>
            </div>
          )}

          {activeSection === 'Security' && (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
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
                <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
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
                {([
                  { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                  { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive notifications via SMS' },
                  { key: 'orderNotifications', label: 'Order Notifications', desc: 'Get notified about new orders' },
                  { key: 'customerNotifications', label: 'Customer Notifications', desc: 'Customer activity alerts' },
                  { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive marketing and promotional emails' },
                ] as const).map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
                      <p className="text-xs text-gray-500">{desc}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      settings?.notifications?.[key]
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {settings?.notifications?.[key] ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'Payments' && (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Settings</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Configure your payment methods, payout schedules, and payment gateway preferences.
              </p>
            </div>
          )}

          {activeSection === 'Integrations' && (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Integrations</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Connect your store with third-party tools and services.
              </p>
            </div>
          )}

          {activeSection === 'Branding' && (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Branding</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Customize your store appearance, logo, and brand colors.
              </p>
            </div>
          )}

          {activeSection === 'API Keys' && (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">API Keys</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your API keys for third-party integrations and programmatic access.
              </p>
            </div>
          )}

          {activeSection === 'Danger Zone' && (
            <div className="rounded-2xl border border-red-200 dark:border-red-900/50 bg-white dark:bg-gray-900 p-6">
              <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">Danger Zone</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Irreversible and destructive actions. Proceed with caution.
              </p>
              <div className="space-y-3">
                <button className="px-6 py-2.5 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium">
                  Delete Store
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
