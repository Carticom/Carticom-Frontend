'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { Dialog, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Gift, Loader2 } from 'lucide-react';
import { showToast } from '@/lib/notifications/toast';

interface Store {
  id: string;
  name: string;
  ownerName: string;
  status: string;
}

interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
}

interface GiftSubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GiftSubscriptionModal({
  open,
  onOpenChange}: GiftSubscriptionModalProps) {
  const queryClient = useQueryClient();
  const [selectedStoreId, setSelectedStoreId] = useState('');
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [durationDays, setDurationDays] = useState(30);
  const [search, setSearch] = useState('');

  const { data: storesData } = useQuery({
    queryKey: ['super-admin', 'stores', 'all'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/v1/super-admin/stores?size=200');
      return (res.data.data?.content ?? []) as Store[];
    },
    enabled: open});

  const { data: plans } = useQuery({
    queryKey: ['super-admin', 'plans', 'all'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/v1/super-admin/plans');
      return (res.data.data ?? []) as Plan[];
    },
    enabled: open});

  const giveawayMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.post('/api/v1/super-admin/subscriptions/giveaway', {
        storeId: selectedStoreId,
        planId: selectedPlanId,
        durationDays});
    },
    onSuccess: () => {
      showToast('success', 'Complimentary subscription granted successfully');
      queryClient.invalidateQueries({ queryKey: ['super-admin', 'subscriptions'] });
      handleClose();
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : 'Failed to grant subscription';
      showToast('error', message);
    }});

  const handleClose = () => {
    setSelectedStoreId('');
    setSelectedPlanId('');
    setDurationDays(30);
    setSearch('');
    onOpenChange(false);
  };

  const stores = storesData ?? [];
  const filteredStores = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.ownerName.toLowerCase().includes(search.toLowerCase())
  );

  const selectedStore = stores.find((s) => s.id === selectedStoreId);
  const selectedPlan = (plans ?? []).find((p) => p.id === selectedPlanId);

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
      title="Gift Subscription"
      description="Give a complimentary subscription to a store"
    >
      <div className="space-y-5">
        <div>
          <Label>Select Store</Label>
          <input
            type="text"
            placeholder="Search stores..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm mb-2"
          />
          <div className="max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg">
            {filteredStores.length === 0 ? (
              <p className="p-3 text-sm text-gray-500 text-center">No stores found</p>
            ) : (
              filteredStores.map((store) => (
                <button
                  key={store.id}
                  type="button"
                  onClick={() => setSelectedStoreId(store.id)}
                  className={`w-full text-left px-3 py-2 text-sm border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    selectedStoreId === store.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="font-medium">{store.name}</span>
                  <span className="ml-2 text-gray-500">({store.ownerName})</span>
                </button>
              ))
            )}
          </div>
          {selectedStore && (
            <p className="mt-1 text-xs text-green-600 dark:text-green-400">
              Selected: {selectedStore.name}
            </p>
          )}
        </div>

        <div>
          <Label>Select Plan</Label>
          <div className="mt-1 grid grid-cols-2 gap-2">
            {(plans ?? []).map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlanId(plan.id)}
                className={`p-3 rounded-lg border text-left text-sm transition-colors ${
                  selectedPlanId === plan.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <p className="font-medium">{plan.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  ₦{(plan.monthlyPrice ?? 0).toLocaleString()}/mo
                </p>
              </button>
            ))}
          </div>
          {selectedPlan && (
            <p className="mt-1 text-xs text-green-600 dark:text-green-400">
              Selected: {selectedPlan.name}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="duration">Duration (days)</Label>
          <Input
            id="duration"
            type="number"
            min={1}
            max={3650}
            value={durationDays}
            onChange={(e) => setDurationDays(Math.max(1, parseInt(e.target.value) || 1))}
            className="mt-1"
          />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          onClick={() => giveawayMutation.mutate()}
          disabled={!selectedStoreId || !selectedPlanId || giveawayMutation.isPending}
        >
          {giveawayMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin mr-1" />
          ) : (
            <Gift className="h-4 w-4 mr-1" />
          )}
          Grant Subscription
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
