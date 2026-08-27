'use client';

import { useState } from 'react';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { Dialog, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCurrentStoreId } from '@/hooks/useCurrentStore';
import { useShippingZones, useCreateZone, useUpdateZone, useDeleteZone, useShippingMethods, useCreateMethod, useUpdateMethod, useDeleteMethod } from '@/features/dashboard/hooks/useShipping';
import type { ShippingZoneDto, ShippingMethodDto, CreateShippingZoneDto, UpdateShippingZoneDto, CreateShippingMethodDto, UpdateShippingMethodDto } from '@/features/dashboard/types/shipping.types';
import { Plus, Trash2, Edit, MapPin, Truck, Package, Map, MessageSquare, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
}

const emptyZoneForm: CreateShippingZoneDto = {
  storeId: '',
  name: '',
  countries: [],
  baseRate: 0};

const emptyMethodForm: CreateShippingMethodDto = {
  storeId: '',
  name: '',
  price: 0};

export default function ShippingPage() {
  const { storeId } = useCurrentStoreId();
  const { data: zones, isLoading: zonesLoading, error: zonesError, refetch: refetchZones } = useShippingZones(storeId ?? null);
  const { data: methods, isLoading: methodsLoading, error: methodsError, refetch: refetchMethods } = useShippingMethods(storeId ?? null);
  const createZone = useCreateZone();
  const updateZone = useUpdateZone();
  const deleteZone = useDeleteZone();
  const createMethod = useCreateMethod();
  const updateMethod = useUpdateMethod();
  const deleteMethod = useDeleteMethod();

  const [zoneModal, setZoneModal] = useState<{ open: boolean; edit?: ShippingZoneDto }>({ open: false });
  const [methodModal, setMethodModal] = useState<{ open: boolean; edit?: ShippingMethodDto }>({ open: false });
  const [zoneForm, setZoneForm] = useState<CreateShippingZoneDto>(emptyZoneForm);
  const [methodForm, setMethodForm] = useState<CreateShippingMethodDto>(emptyMethodForm);
  const [countryInput, setCountryInput] = useState('');
  const [regionsInput, setRegionsInput] = useState('');

  if (!storeId) {
    return <LoadingState message="Loading store..." />;
  }

  const currentStoreId: string = storeId;

  function openCreateZone() {
    setZoneForm({ ...emptyZoneForm, storeId: currentStoreId });
    setRegionsInput('');
    setCountryInput('');
    setZoneModal({ open: true });
  }

  function openEditZone(zone: ShippingZoneDto) {
    setZoneForm({ storeId: currentStoreId, name: zone.name, countries: [...zone.countries], regions: zone.regions, baseRate: zone.baseRate, perKgRate: zone.perKgRate });
    setRegionsInput(zone.regions.join(', '));
    setCountryInput('');
    setZoneModal({ open: true, edit: zone });
  }

  function openCreateMethod() {
    setMethodForm({ ...emptyMethodForm, storeId: currentStoreId });
    setMethodModal({ open: true });
  }

  function openEditMethod(method: ShippingMethodDto) {
    setMethodForm({ storeId: currentStoreId, name: method.name, description: method.description, price: method.price, estimatedDays: method.estimatedDays });
    setMethodModal({ open: true, edit: method });
  }

  function addCountry() {
    const trimmed = countryInput.trim();
    if (trimmed && !zoneForm.countries.includes(trimmed)) {
      setZoneForm(prev => ({ ...prev, countries: [...prev.countries, trimmed] }));
    }
    setCountryInput('');
  }

  function removeCountry(country: string) {
    setZoneForm(prev => ({ ...prev, countries: prev.countries.filter(c => c !== country) }));
  }

  async function handleZoneSubmit(e: React.FormEvent) {
    e.preventDefault();
    const isEdit = !!zoneModal.edit;
    try {
      const data: CreateShippingZoneDto = {
        storeId: currentStoreId,
        name: zoneForm.name,
        countries: zoneForm.countries,
        regions: regionsInput ? regionsInput.split(',').map(r => r.trim()).filter(Boolean) : undefined,
        baseRate: zoneForm.baseRate,
        perKgRate: zoneForm.perKgRate};
      if (isEdit) {
        await updateZone.mutateAsync({ id: zoneModal.edit!.id, data: data as UpdateShippingZoneDto });
      } else {
        await createZone.mutateAsync(data);
      }
      setZoneModal({ open: false });
      refetchZones();
    } catch {}
  }

  async function handleMethodSubmit(e: React.FormEvent) {
    e.preventDefault();
    const isEdit = !!methodModal.edit;
    try {
      if (isEdit) {
        await updateMethod.mutateAsync({ id: methodModal.edit!.id, data: methodForm as UpdateShippingMethodDto });
      } else {
        await createMethod.mutateAsync(methodForm);
      }
      setMethodModal({ open: false });
      refetchMethods();
    } catch {}
  }

  async function handleDeleteZone(zone: ShippingZoneDto) {
    if (!window.confirm(`Delete shipping zone "${zone.name}"? This cannot be undone.`)) return;
    try {
      await deleteZone.mutateAsync(zone.id);
    } catch {}
  }

  async function handleDeleteMethod(method: ShippingMethodDto) {
    if (!window.confirm(`Delete shipping method "${method.name}"? This cannot be undone.`)) return;
    try {
      await deleteMethod.mutateAsync(method.id);
    } catch {}
  }

  if (zonesLoading || methodsLoading) return <LoadingState message="Loading shipping configuration..." />;
  if (zonesError || methodsError) return <ErrorState onRetry={() => { refetchZones(); refetchMethods(); }} />;

  const zoneList = Array.isArray(zones) ? zones : [];
  const methodList = Array.isArray(methods) ? methods : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shipping</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Configure shipping zones and delivery methods for your store</p>
      </div>

      {/* Delivery & Logistics - Coming Soon */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-xs font-semibold uppercase tracking-wide">Coming Soon</span>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Delivery & Logistics Integration</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
            <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-3">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Automated Carrier Integration</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Direct connections with major logistics providers across Nigeria and Africa. Every order will automatically be assigned to a delivery rider from providers like ShipBubble, Kwik, and Fez. You will see real-time tracking, automated shipping labels, and delivery confirmations — all without leaving your dashboard.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
            <div className="h-10 w-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center mb-3">
              <Map className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Multi-Location Fulfillment</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Manage inventory and fulfillment across multiple warehouse and store locations. Each location will have its own stock levels, shipping rates, and fulfillment queue. Orders will be automatically routed to the nearest location for faster delivery.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
            <div className="h-10 w-10 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-3">
              <MessageSquare className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Customer Delivery Tracking</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Give your customers real-time delivery tracking with SMS and WhatsApp notifications at every stage — from order confirmed to out for delivery to delivered. Your customers will never have to ask "where is my order?" again.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
            <div className="h-10 w-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center mb-3">
              <Calculator className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Smart Shipping Rates</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Automatic shipping rate calculation based on weight, dimensions, distance, and carrier pricing. Offer your customers multiple delivery options — standard, express, same-day — with accurate pricing at checkout.
            </p>
          </div>
        </div>
      </section>

      {/* Shipping Zones */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Shipping Zones</h2>
          <Button onClick={openCreateZone}>
            <Plus className="h-4 w-4 mr-1.5" /> Add Zone
          </Button>
        </div>

        {zoneList.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            <EmptyState
              title="No shipping zones yet"
              description="Create your first shipping zone to start configuring delivery options."
              action={{ label: 'Create Zone', onClick: openCreateZone }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {zoneList.map((zone) => (
              <div key={zone.id} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">{zone.name}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{zone.countries.length} countries</span>
                      {zone.regions.length > 0 && (
                        <span className="text-xs text-gray-400">| {zone.regions.length} regions</span>
                      )}
                    </div>
                  </div>
                  <span className={cn(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    zone.isActive ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                  )}>
                    {zone.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" />
                    {zone.countries.slice(0, 4).join(', ')}{zone.countries.length > 4 ? ` +${zone.countries.length - 4} more` : ''}
                  </div>
                  <p>Base rate: <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(zone.baseRate)}</span></p>
                  {zone.perKgRate != null && (
                    <p>Per kg: <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(zone.perKgRate)}</span></p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => openEditZone(zone)}>
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteZone(zone)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Shipping Methods */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Shipping Methods</h2>
          <Button onClick={openCreateMethod} variant="outline">
            <Plus className="h-4 w-4 mr-1.5" /> Add Method
          </Button>
        </div>

        {methodList.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            <EmptyState
              title="No shipping methods yet"
              description="Add a delivery method (e.g. Standard Delivery, Express) that customers can select at checkout."
              action={{ label: 'Add Method', onClick: openCreateMethod }}
            />
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
            {methodList.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-brand-soft flex items-center justify-center">
                    <Truck className="h-4 w-4 text-brand" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{method.name}</span>
                      {method.description && (
                        <span className="text-xs text-gray-400">{method.description}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                      <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(method.price)}</span>
                      {method.estimatedDays != null && <span>{method.estimatedDays} days</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className={cn(
                    'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mr-1',
                    method.isActive ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-50 text-gray-400 dark:bg-gray-800'
                  )}>
                    {method.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <Button variant="ghost" size="icon-sm" onClick={() => openEditMethod(method)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" onClick={() => handleDeleteMethod(method)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Dialog open={zoneModal.open} onOpenChange={(o) => setZoneModal(prev => ({ ...prev, open: o }))} title={zoneModal.edit ? 'Edit Shipping Zone' : 'Create Shipping Zone'}>
        <form onSubmit={handleZoneSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zone Name *</label>
            <input
              value={zoneForm.name}
              onChange={(e) => setZoneForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900"
              placeholder="e.g. Domestic, International"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Countries</label>
            <div className="flex gap-2 mb-2">
              <input
                value={countryInput}
                onChange={(e) => setCountryInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCountry(); } }}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900"
                placeholder="Type country name and press Enter"
              />
              <Button type="button" variant="outline" size="sm" onClick={addCountry}>Add</Button>
            </div>
            {zoneForm.countries.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {zoneForm.countries.map((country) => (
                  <span key={country} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-gray-700 dark:text-gray-300">
                    <MapPin className="h-3 w-3" />
                    {country}
                    <button type="button" onClick={() => removeCountry(country)} className="text-gray-400 hover:text-red-500 ml-0.5">&times;</button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Regions (comma separated)</label>
            <input
              value={regionsInput}
              onChange={(e) => setRegionsInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900"
              placeholder="e.g. North America, Europe, Asia"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Base Rate (₦) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={zoneForm.baseRate}
                onChange={(e) => setZoneForm(prev => ({ ...prev, baseRate: parseFloat(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Per Kg Rate (₦)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={zoneForm.perKgRate ?? ''}
                onChange={(e) => setZoneForm(prev => ({ ...prev, perKgRate: e.target.value ? parseFloat(e.target.value) : undefined }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900"
                placeholder="Optional"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setZoneModal({ open: false })}>Cancel</Button>
            <Button type="submit" disabled={!zoneForm.name || createZone.isPending || updateZone.isPending}>
              {zoneModal.edit ? 'Save Changes' : 'Create Zone'}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      <Dialog open={methodModal.open} onOpenChange={(o) => setMethodModal(prev => ({ ...prev, open: o }))} title={methodModal.edit ? 'Edit Shipping Method' : 'Add Shipping Method'}>
        <form onSubmit={handleMethodSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Method Name *</label>
            <input
              value={methodForm.name}
              onChange={(e) => setMethodForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900"
              placeholder="e.g. Standard Delivery, Express"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <input
              value={methodForm.description ?? ''}
              onChange={(e) => setMethodForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900"
              placeholder="Optional"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₦) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={methodForm.price}
                onChange={(e) => setMethodForm(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estimated Days</label>
              <input
                type="number"
                min="1"
                value={methodForm.estimatedDays ?? ''}
                onChange={(e) => setMethodForm(prev => ({ ...prev, estimatedDays: e.target.value ? parseInt(e.target.value) : undefined }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900"
                placeholder="Optional"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setMethodModal({ open: false })}>Cancel</Button>
            <Button type="submit" disabled={!methodForm.name || createMethod.isPending || updateMethod.isPending}>
              {methodModal.edit ? 'Save Changes' : 'Add Method'}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}