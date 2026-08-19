'use client';

import { useState } from 'react';
import { useAddresses, useCreateAddress, useUpdateAddress, useDeleteAddress, useSetDefaultAddress } from '@/features/dashboard/hooks/useAddresses';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { Dialog, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { AddressDto, CreateAddressDto, UpdateAddressDto } from '@/features/dashboard/types/addresses.types';
import { AddressLabel } from '@/features/dashboard/types/addresses.types';
import { cn } from '@/lib/utils';
import { MapPin, Home, Briefcase, Plus, Pencil, Trash2, Star } from 'lucide-react';

const LABEL_CONFIG: Record<AddressLabel, { icon: React.ElementType; color: string }> = {
  [AddressLabel.HOME]: { icon: Home, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400' },
  [AddressLabel.OFFICE]: { icon: Briefcase, color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400' },
  [AddressLabel.BILLING]: { icon: MapPin, color: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400' },
  [AddressLabel.SHIPPING]: { icon: MapPin, color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400' },
  [AddressLabel.OTHER]: { icon: MapPin, color: 'text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400' }};

const LABEL_OPTIONS = [
  { value: AddressLabel.HOME, label: 'Home' },
  { value: AddressLabel.OFFICE, label: 'Office' },
  { value: AddressLabel.BILLING, label: 'Billing' },
  { value: AddressLabel.SHIPPING, label: 'Shipping' },
  { value: AddressLabel.OTHER, label: 'Other' },
];

function emptyForm(): CreateAddressDto {
  return {
    label: AddressLabel.HOME,
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    isDefault: false};
}

export default function AddressesPage() {
  const { data: addresses, isLoading, error, refetch } = useAddresses();
  const createAddress = useCreateAddress();
  const updateAddress = useUpdateAddress();
  const deleteAddress = useDeleteAddress();
  const setDefaultAddress = useSetDefaultAddress();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CreateAddressDto>(emptyForm());
  const [saving, setSaving] = useState(false);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm());
    setDialogOpen(true);
  }

  function openEdit(address: AddressDto) {
    setEditingId(address.id);
    setForm({
      label: address.label,
      fullName: address.fullName,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      country: address.country,
      zipCode: address.zipCode || '',
      isDefault: address.isDefault});
    setDialogOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      if (editingId) {
        await updateAddress.mutateAsync({ id: editingId, data: form as UpdateAddressDto });
      } else {
        await createAddress.mutateAsync(form);
      }
      setDialogOpen(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this address?')) return;
    await deleteAddress.mutateAsync(id);
  }

  async function handleSetDefault(id: string) {
    await setDefaultAddress.mutateAsync(id);
  }

  if (isLoading) return <LoadingState message="Loading addresses..." />;
  if (error) return <ErrorState title="Failed to load addresses" onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Addresses</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your saved addresses</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Address
        </Button>
      </div>

      {!addresses || addresses.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <EmptyState
            title="No addresses yet"
            description="Add an address to make checkout faster and easier."
            action={{ label: 'Add Address', onClick: openCreate }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address: AddressDto) => {
            const config = LABEL_CONFIG[address.label] || LABEL_CONFIG[AddressLabel.OTHER];
            const Icon = config.icon;
            return (
              <div
                key={address.id}
                className={cn(
                  'rounded-2xl border bg-white dark:bg-gray-900 p-5 relative',
                  address.isDefault
                    ? 'border-blue-400 dark:border-blue-600 ring-1 ring-blue-400/30 dark:ring-blue-600/30'
                    : 'border-gray-200 dark:border-gray-800'
                )}
              >
                {address.isDefault && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    Default
                  </div>
                )}

                <div className="flex items-center gap-3 mb-3">
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', config.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white capitalize">
                      {address.label.toLowerCase()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{address.fullName}</p>
                  </div>
                </div>

                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p>{address.country}</p>
                  <p className="text-gray-500 dark:text-gray-500">{address.phone}</p>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <Button variant="outline" size="sm" onClick={() => openEdit(address)}>
                    <Pencil className="h-3.5 w-3.5 mr-1.5" />
                    Edit
                  </Button>
                  {!address.isDefault && (
                    <Button variant="ghost" size="sm" onClick={() => handleSetDefault(address.id)}>
                      <Star className="h-3.5 w-3.5 mr-1.5" />
                      Set Default
                    </Button>
                  )}
                  <Button variant="destructive" size="sm" className="ml-auto" onClick={() => handleDelete(address.id)}>
                    <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen} title={editingId ? 'Edit Address' : 'Add Address'}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="label">Label</Label>
            <select
              id="label"
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value as AddressLabel })}
              className="mt-1 flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {LABEL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="John Doe" />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 (555) 123-4567" />
          </div>

          <div>
            <Label htmlFor="street">Street Address</Label>
            <Input id="street" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} placeholder="123 Main Street" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="New York" />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input id="state" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} placeholder="NY" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="country">Country</Label>
              <Input id="country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="United States" />
            </div>
            <div>
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input id="zipCode" value={form.zipCode} onChange={(e) => setForm({ ...form, zipCode: e.target.value })} placeholder="10001" />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : editingId ? 'Update Address' : 'Save Address'}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
