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

interface BusinessInfoStepProps {
  onNext: () => void;
  onBack: () => void;
  initialData?: BusinessInfoFormData;
  onSave: (data: BusinessInfoFormData) => void;
}

export function BusinessInfoStep({ onNext, onBack, initialData, onSave }: BusinessInfoStepProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
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
      await createStore.mutateAsync({
        name: data.businessName,
        description: data.description || undefined});
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
            <Input id="businessCategory" placeholder="Electronics, Fashion, etc." {...register('businessCategory')} />
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
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
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