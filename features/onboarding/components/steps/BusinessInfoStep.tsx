'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building2, Upload, Loader2 } from 'lucide-react';
import { businessInfoSchema, type BusinessInfoFormData } from '@/features/onboarding/schemas';
import { useCreateStore } from '@/features/onboarding/hooks/useOnboarding';
import { axiosInstance } from '@/lib/axios';
import type { StoreDto } from '@/features/onboarding/types';

const BUSINESS_CATEGORY_OPTIONS = [
  'Fashion & Clothing',
  'Electronics & Gadgets',
  'Food & Beverages',
  'Health & Beauty',
  'Home & Furniture',
  'Sports & Fitness',
  'Books & Stationery',
  'Arts & Crafts',
  'Agriculture & Grocery',
  'Services (Salon, Repair, etc.)',
  'Other',
];

const COUNTRY_CURRENCY_MAP: Record<string, string> = {
  Nigeria: 'NGN',
  Ghana: 'GHS',
  Kenya: 'KES',
  'South Africa': 'ZAR',
  'United States': 'USD',
  'United Kingdom': 'GBP',
};

interface BusinessInfoStepProps {
  onNext: () => void;
  onBack: () => void;
  initialData?: BusinessInfoFormData;
  onSave: (data: BusinessInfoFormData) => void;
  onStoreCreated: (store: StoreDto) => void;
}

export function BusinessInfoStep({ onNext, onBack, initialData, onSave, onStoreCreated }: BusinessInfoStepProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [country, setCountry] = useState('Nigeria');
  const [currency, setCurrency] = useState('NGN');
  const createStore = useCreateStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }} = useForm<BusinessInfoFormData>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: initialData ?? {
      businessName: '',
      businessCategory: '',
      phone: '',
      email: '',
      address: '',
      description: ''}});

  const onSubmit = async (data: BusinessInfoFormData) => {
    setSubmitError(null);
    try {
      onSave(data);
      const slug = data.businessName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      const store = await createStore.mutateAsync({
        storeName: data.businessName,
        storeSlug: slug,
        phone: data.phone,
        description: data.description || undefined,
        businessCategory: data.businessCategory,
        email: data.email || undefined,
        address: data.address || undefined,
        country,
        currency});

      if (logoFile && store.id) {
        const formData = new FormData();
        formData.append('file', logoFile);
        await axiosInstance.post(`/api/v1/stores/${store.id}/logo`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }});
      }
      if (bannerFile && store.id) {
        const formData = new FormData();
        formData.append('file', bannerFile);
        await axiosInstance.post(`/api/v1/stores/${store.id}/banner`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }});
      }

      onStoreCreated(store);
      onNext();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to save. Please try again.';
      setSubmitError(msg);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Business Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tell us about your business
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {submitError && (
          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
            <span className="mt-0.5 shrink-0">⚠</span>
            <p>{submitError}</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name *</Label>
            <Input id="businessName" placeholder="My Awesome Store" {...register('businessName')} />
            {errors.businessName && (
              <p className="text-sm text-red-500">{errors.businessName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessCategory">Business Category *</Label>
            <select
              id="businessCategory"
              {...register('businessCategory')}
              className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white ring-offset-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {BUSINESS_CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.businessCategory && (
              <p className="text-sm text-red-500">{errors.businessCategory.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input id="phone" type="tel" placeholder="+234 801 234 5678" {...register('phone')} />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Business Email *</Label>
            <Input id="email" type="email" placeholder="hello@mystore.com" {...register('email')} />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Business Address</Label>
          <Input id="address" placeholder="123 Business Street, Lagos" {...register('address')} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country *</Label>
            <select
              id="country"
              value={country}
              onChange={(e) => {
                const val = e.target.value;
                setCountry(val);
                setCurrency(COUNTRY_CURRENCY_MAP[val] || 'USD');
              }}
              className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white ring-offset-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(COUNTRY_CURRENCY_MAP).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency *</Label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white ring-offset-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.values(COUNTRY_CURRENCY_MAP).filter((v, i, a) => a.indexOf(v) === i).map((cur) => (
                <option key={cur} value={cur}>{cur}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Business Description</Label>
          <Textarea
            id="description"
            placeholder="Tell us about your business..."
            rows={4}
            {...register('description')}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Business Logo</Label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="h-8 w-8 text-gray-500 dark:text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {logoFile ? logoFile.name : 'Click to upload logo'}
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>
          <div className="space-y-2">
            <Label>Banner Image</Label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Building2 className="h-8 w-8 text-gray-500 dark:text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {bannerFile ? bannerFile.name : 'Click to upload banner'}
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setBannerFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
            Back
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}