'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { customSolutionsService } from '@/features/custom-solutions/services/custom-solutions.service';
import { SERVICE_OPTIONS } from '@/features/custom-solutions/types';
import type { CreateCustomSolutionDto } from '@/features/custom-solutions/types';

const industries = [
  'E-commerce', 'Retail', 'Healthcare', 'Education', 'Finance',
  'Logistics', 'Agriculture', 'Real Estate', 'Hospitality', 'Manufacturing', 'Other',
];

const countries = [
  'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Egypt', 'Rwanda',
  'Ethiopia', 'Tanzania', 'Uganda', 'Senegal', 'Other',
];

export default function NewCustomSolutionPage() {
  const router = useRouter();
  const [form, setForm] = useState<CreateCustomSolutionDto>({
    businessName: '',
    industry: '',
    country: '',
    currentWebsite: '',
    employees: '',
    monthlyOrders: '',
    budget: '',
    timeline: '',
    services: [],
    additionalRequirements: '',
  });

  const mutation = useMutation({
    mutationFn: (dto: CreateCustomSolutionDto) => customSolutionsService.submit(dto),
    onSuccess: () => {
      router.push('/dashboard/custom-solutions');
    },
  });

  const update = <K extends keyof CreateCustomSolutionDto>(key: K, value: CreateCustomSolutionDto[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleService = (service: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  const inputClass = 'mt-1 block w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white';
  const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300';
  const selectClass = inputClass;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Link
          href="/dashboard/custom-solutions"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Custom Solutions
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Request Custom Solution</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Tell us about your needs and we&apos;ll build a tailored solution for your business.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Business Information</h2>

          <div>
            <label htmlFor="businessName" className={labelClass}>Business Name *</label>
            <input id="businessName" type="text" required value={form.businessName} onChange={(e) => update('businessName', e.target.value)} className={inputClass} placeholder="Your business name" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="industry" className={labelClass}>Industry *</label>
              <select id="industry" required value={form.industry} onChange={(e) => update('industry', e.target.value)} className={selectClass}>
                <option value="">Select industry</option>
                {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="country" className={labelClass}>Country *</label>
              <select id="country" required value={form.country} onChange={(e) => update('country', e.target.value)} className={selectClass}>
                <option value="">Select country</option>
                {countries.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="currentWebsite" className={labelClass}>Current Website</label>
            <input id="currentWebsite" type="url" value={form.currentWebsite} onChange={(e) => update('currentWebsite', e.target.value)} className={inputClass} placeholder="https://example.com" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="employees" className={labelClass}>Number of Employees *</label>
              <select id="employees" required value={form.employees} onChange={(e) => update('employees', e.target.value)} className={selectClass}>
                <option value="">Select range</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="500+">500+</option>
              </select>
            </div>
            <div>
              <label htmlFor="monthlyOrders" className={labelClass}>Monthly Orders *</label>
              <select id="monthlyOrders" required value={form.monthlyOrders} onChange={(e) => update('monthlyOrders', e.target.value)} className={selectClass}>
                <option value="">Select range</option>
                <option value="0-100">0-100</option>
                <option value="101-1000">101-1,000</option>
                <option value="1001-10000">1,001-10,000</option>
                <option value="10000+">10,000+</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="budget" className={labelClass}>Budget *</label>
              <select id="budget" required value={form.budget} onChange={(e) => update('budget', e.target.value)} className={selectClass}>
                <option value="">Select range</option>
                <option value="₦500k-₦2M">₦500,000 - ₦2,000,000</option>
                <option value="₦2M-₦5M">₦2,000,000 - ₦5,000,000</option>
                <option value="₦5M-₦10M">₦5,000,000 - ₦10,000,000</option>
                <option value="₦10M+">₦10,000,000+</option>
              </select>
            </div>
            <div>
              <label htmlFor="timeline" className={labelClass}>Timeline *</label>
              <select id="timeline" required value={form.timeline} onChange={(e) => update('timeline', e.target.value)} className={selectClass}>
                <option value="">Select timeline</option>
                <option value="1-3 months">1-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6-12 months">6-12 months</option>
                <option value="12+ months">12+ months</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Services Required</h2>
          <p className="text-sm text-gray-500">Select all services you need.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {SERVICE_OPTIONS.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                  form.services.includes(service)
                    ? 'bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Additional Details</h2>
          <div>
            <label htmlFor="additionalRequirements" className={labelClass}>Additional Requirements</label>
            <textarea
              id="additionalRequirements"
              rows={4}
              value={form.additionalRequirements}
              onChange={(e) => update('additionalRequirements', e.target.value)}
              className={inputClass}
              placeholder="Describe any specific requirements, features, or integrations you need..."
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/dashboard/custom-solutions">Cancel</Link>
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              'Submit Request'
            )}
          </Button>
        </div>

        {mutation.isError && (
          <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 text-sm text-red-700 dark:text-red-400">
            {mutation.error instanceof Error ? mutation.error.message : 'Failed to submit request. Please try again.'}
          </div>
        )}
      </form>
    </div>
  );
}
