'use client';

import { useState } from 'react';
import { LoadingState, EmptyState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { Dialog, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useShippingZones, useCreateZone, useUpdateZone, useDeleteZone, useShippingMethods, useCreateMethod, useUpdateMethod, useDeleteMethod } from '@/features/dashboard/hooks/useShipping';
import type { ShippingZoneDto, ShippingMethodDto, ShippingMethodType, CreateShippingZoneDto, UpdateShippingZoneDto, CreateShippingMethodDto, UpdateShippingMethodDto } from '@/features/dashboard/types/shipping.types';
import { Plus, Trash2, Edit, ChevronDown, ChevronRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const METHOD_TYPE_LABELS: Record<ShippingMethodType, string> = {
  FREE: 'Free Shipping',
  FLAT: 'Flat Rate',
  PER_ITEM: 'Per Item',
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

export default function ShippingPage() {
  const { data: zones, isLoading, error, refetch } = useShippingZones();
  const createZone = useCreateZone();
  const updateZone = useUpdateZone();
  const deleteZone = useDeleteZone();
  const createMethod = useCreateMethod();
  const updateMethod = useUpdateMethod();
  const deleteMethod = useDeleteMethod();

  const [expandedZone, setExpandedZone] = useState<string | null>(null);
  const [zoneModal, setZoneModal] = useState<{ open: boolean; edit?: ShippingZoneDto }>({ open: false });
  const [methodModal, setMethodModal] = useState<{ open: boolean; zoneId?: string; edit?: ShippingMethodDto }>({ open: false });
  const [zoneForm, setZoneForm] = useState<CreateShippingZoneDto>({ name: '', countries: [] });
  const [regionsInput, setRegionsInput] = useState('');
  const [methodForm, setMethodForm] = useState<CreateShippingMethodDto>({ name: '', type: 'FLAT', rate: 0, estimatedDaysMin: 1, estimatedDaysMax: 5 });
  const [countryInput, setCountryInput] = useState('');

  const { data: methods, isLoading: methodsLoading } = useShippingMethods(expandedZone);

  function openCreateZone() {
    setZoneForm({ name: '', countries: [] });
    setRegionsInput('');
    setCountryInput('');
    setZoneModal({ open: true });
  }

  function openEditZone(zone: ShippingZoneDto) {
    setZoneForm({ name: zone.name, countries: [...zone.countries] });
    setRegionsInput(zone.regions?.join(', ') ?? '');
    setCountryInput('');
    setZoneModal({ open: true, edit: zone });
  }

  function openCreateMethod(zoneId: string) {
    setMethodForm({ name: '', type: 'FLAT', rate: 0, estimatedDaysMin: 1, estimatedDaysMax: 5 });
    setMethodModal({ open: true, zoneId });
  }

  function openEditMethod(zoneId: string, method: ShippingMethodDto) {
    setMethodForm({ name: method.name, type: method.type, rate: method.rate, minOrderAmount: method.minOrderAmount, estimatedDaysMin: method.estimatedDaysMin, estimatedDaysMax: method.estimatedDaysMax });
    setMethodModal({ open: true, zoneId, edit: method });
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
        name: zoneForm.name,
        countries: zoneForm.countries,
        regions: regionsInput ? regionsInput.split(',').map(r => r.trim()).filter(Boolean) : undefined,
      };
      if (isEdit) {
        await updateZone.mutateAsync({ id: zoneModal.edit!.id, data: data as UpdateShippingZoneDto });
      } else {
        await createZone.mutateAsync(data);
      }
      setZoneModal({ open: false });
      refetch();
    } catch {}
  }

  async function handleMethodSubmit(e: React.FormEvent) {
    e.preventDefault();
    const isEdit = !!methodModal.edit;
    const zoneId = methodModal.zoneId!;
    try {
      if (isEdit) {
        await updateMethod.mutateAsync({ zoneId, id: methodModal.edit!.id, data: methodForm as UpdateShippingMethodDto });
      } else {
        await createMethod.mutateAsync({ zoneId, data: methodForm });
      }
      setMethodModal({ open: false });
      refetch();
    } catch {}
  }

  async function handleDeleteZone(zone: ShippingZoneDto) {
    if (!window.confirm(`Delete shipping zone "${zone.name}"? This cannot be undone.`)) return;
    try {
      await deleteZone.mutateAsync(zone.id);
      if (expandedZone === zone.id) setExpandedZone(null);
    } catch {}
  }

  async function handleDeleteMethod(zoneId: string, method: ShippingMethodDto) {
    if (!window.confirm(`Delete shipping method "${method.name}"? This cannot be undone.`)) return;
    try {
      await deleteMethod.mutateAsync({ zoneId, id: method.id });
    } catch {}
  }

  if (isLoading) return <LoadingState message="Loading shipping zones..." />;
  if (error) return <ErrorState title="Failed to load shipping zones" onRetry={refetch} />;

  const zoneList = Array.isArray(zones) ? zones : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shipping Zones</h1>
          <p className="text-gray-600 mt-2">Configure shipping zones and rates for your store</p>
        </div>
        <Button onClick={openCreateZone}>
          <Plus className="h-4 w-4 mr-1.5" /> Add Zone
        </Button>
      </div>

      {zoneList.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <EmptyState
            title="No shipping zones yet"
            description="Create your first shipping zone to start configuring delivery options."
            action={{ label: 'Create Zone', onClick: openCreateZone }}
          />
        </div>
      ) : (
        <div className="space-y-3">
          {zoneList.map((zone) => (
            <div key={zone.id} className="rounded-xl border border-gray-200 bg-white">
              <div className="flex items-center justify-between p-4">
                <button
                  onClick={() => setExpandedZone(expandedZone === zone.id ? null : zone.id)}
                  className="flex items-center gap-3 flex-1 text-left"
                >
                  {expandedZone === zone.id ? (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                  <div>
                    <span className="font-medium text-gray-900">{zone.name}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500">{zone.countries.length} countries</span>
                      {zone.regions && zone.regions.length > 0 && (
                        <span className="text-xs text-gray-400">| {zone.regions.length} regions</span>
                      )}
                    </div>
                  </div>
                </button>
                <div className="flex items-center gap-1">
                  <span className={cn(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    zone.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'
                  )}>
                    {zone.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <Button variant="ghost" size="icon-sm" onClick={() => openEditZone(zone)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" onClick={() => handleDeleteZone(zone)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>

              {expandedZone === zone.id && (
                <div className="border-t border-gray-100 px-4 py-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700">Shipping Methods</h3>
                    <Button size="sm" variant="outline" onClick={() => openCreateMethod(zone.id)}>
                      <Plus className="h-3.5 w-3.5 mr-1" /> Add Method
                    </Button>
                  </div>

                  {methodsLoading ? (
                    <p className="text-sm text-gray-400 py-2">Loading methods...</p>
                  ) : !methods || methods.length === 0 ? (
                    <p className="text-sm text-gray-400 py-2">No shipping methods configured for this zone.</p>
                  ) : (
                    <div className="divide-y divide-gray-50">
                      {methods.map((method) => (
                        <div key={method.id} className="flex items-center justify-between py-2">
                          <div>
                            <span className="text-sm font-medium text-gray-900">{method.name}</span>
                            <span className={cn(
                              'ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                              method.type === 'FREE' ? 'bg-blue-50 text-blue-700' :
                              method.type === 'FLAT' ? 'bg-purple-50 text-purple-700' :
                              'bg-orange-50 text-orange-700'
                            )}>
                              {METHOD_TYPE_LABELS[method.type]}
                            </span>
                            <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                              <span>{formatCurrency(method.rate)}</span>
                              {method.minOrderAmount != null && (
                                <span>Min: {formatCurrency(method.minOrderAmount)}</span>
                              )}
                              <span>{method.estimatedDaysMin}-{method.estimatedDaysMax} days</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className={cn(
                              'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                              method.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'
                            )}>
                              {method.isActive ? 'Active' : 'Inactive'}
                            </span>
                            <Button variant="ghost" size="icon-xs" onClick={() => openEditMethod(zone.id, method)}>
                              <Edit className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon-xs" onClick={() => handleDeleteMethod(zone.id, method)}>
                              <Trash2 className="h-3.5 w-3.5 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Dialog open={zoneModal.open} onOpenChange={(o) => setZoneModal(prev => ({ ...prev, open: o }))} title={zoneModal.edit ? 'Edit Shipping Zone' : 'Create Shipping Zone'}>
        <form onSubmit={handleZoneSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zone Name *</label>
            <input
              value={zoneForm.name}
              onChange={(e) => setZoneForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="e.g. Domestic, International"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Countries</label>
            <div className="flex gap-2 mb-2">
              <input
                value={countryInput}
                onChange={(e) => setCountryInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCountry(); } }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Type country name and press Enter"
              />
              <Button type="button" variant="outline" size="sm" onClick={addCountry}>Add</Button>
            </div>
            {zoneForm.countries.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {zoneForm.countries.map((country) => (
                  <span key={country} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-700">
                    <MapPin className="h-3 w-3" />
                    {country}
                    <button type="button" onClick={() => removeCountry(country)} className="text-gray-400 hover:text-red-500 ml-0.5">&times;</button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Regions (comma separated)</label>
            <input
              value={regionsInput}
              onChange={(e) => setRegionsInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="e.g. North America, Europe, Asia"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setZoneModal({ open: false })}>Cancel</Button>
            <Button type="submit" disabled={!zoneForm.name || zoneForm.countries.length === 0 || createZone.isPending || updateZone.isPending}>
              {zoneModal.edit ? 'Save Changes' : 'Create Zone'}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      <Dialog open={methodModal.open} onOpenChange={(o) => setMethodModal(prev => ({ ...prev, open: o }))} title={methodModal.edit ? 'Edit Shipping Method' : 'Add Shipping Method'}>
        <form onSubmit={handleMethodSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Method Name *</label>
            <input
              value={methodForm.name}
              onChange={(e) => setMethodForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="e.g. Standard Delivery, Express"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
            <select
              value={methodForm.type}
              onChange={(e) => setMethodForm(prev => ({ ...prev, type: e.target.value as ShippingMethodType }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="FREE">Free Shipping</option>
              <option value="FLAT">Flat Rate</option>
              <option value="PER_ITEM">Per Item</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rate *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={methodForm.rate}
                onChange={(e) => setMethodForm(prev => ({ ...prev, rate: parseFloat(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Order Amount</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={methodForm.minOrderAmount ?? ''}
                onChange={(e) => setMethodForm(prev => ({ ...prev, minOrderAmount: e.target.value ? parseFloat(e.target.value) : undefined }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Optional"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Est. Days (Min) *</label>
              <input
                type="number"
                min="1"
                value={methodForm.estimatedDaysMin}
                onChange={(e) => setMethodForm(prev => ({ ...prev, estimatedDaysMin: parseInt(e.target.value) || 1 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Est. Days (Max) *</label>
              <input
                type="number"
                min="1"
                value={methodForm.estimatedDaysMax}
                onChange={(e) => setMethodForm(prev => ({ ...prev, estimatedDaysMax: parseInt(e.target.value) || 1 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
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
