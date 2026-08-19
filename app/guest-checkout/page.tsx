'use client';

import React, { Suspense, useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, CreditCard, ExternalLink, Loader2, ShoppingBag, Mail, Phone, MapPin, User, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cartApi } from '@/features/onboarding/services/onboarding.service';

import { useGuestCheckout, useGuestCheckoutPay } from '@/features/dashboard/hooks/useGuestCheckout';
import type { GuestCheckoutRequest } from '@/features/dashboard/types/guest-checkout.types';

const STEPS = ['Contact', 'Shipping', 'Review', 'Confirmation'] as const;

interface LineItem {
  productId: string;
  quantity: number;
  variantId?: string;
}

interface ShippingForm {
  fullName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

function GuestCheckoutPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams.get('storeId') || '';

  const [step, setStep] = useState(0);
  const [items, setItems] = useState<LineItem[]>([{ productId: '', quantity: 1 }]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [shipping, setShipping] = useState<ShippingForm>({
    fullName: '', street: '', city: '', state: '', country: '', zipCode: ''});
  const [result, setResult] = useState<{
    orderNumber: string;
    reference: string;
    total: number;
    paymentUrl: string;
  } | null>(null);

  const { mutate: submitCheckout, isPending: isSubmitting, error: submitError } = useGuestCheckout();
  const { mutate: initiatePay, isPending: isInitiatingPay } = useGuestCheckoutPay();

  useEffect(() => {
    if (!storeId) return;
    let cancelled = false;
    cartApi.get(storeId)
      .then((res) => {
        if (cancelled || !res.data.data?.items?.length) return;
        setItems(res.data.data.items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })));
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [storeId]);

  const addItem = () => {
    setItems(prev => [...prev, { productId: '', quantity: 1 }]);
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof LineItem, value: string | number) => {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const stepValid = useCallback(() => {
    switch (step) {
      case 0:
        return email.trim().length > 0 && phone.trim().length > 0;
      case 1: {
        const s = shipping;
        return s.fullName.trim().length > 0 && s.street.trim().length > 0 &&
          s.city.trim().length > 0 && s.state.trim().length > 0 &&
          s.country.trim().length > 0 && s.zipCode.trim().length > 0;
      }
      case 2:
        return items.some(item => item.productId.trim().length > 0 && item.quantity > 0);
      default:
        return true;
    }
  }, [step, email, phone, shipping, items]);

  const canGoNext = stepValid();

  const nextStep = () => {
    if (step === 2 && canGoNext) {
      const payload: GuestCheckoutRequest = {
        storeId,
        items: items.filter(i => i.productId.trim().length > 0).map(i => ({
          productId: i.productId,
          quantity: i.quantity,
          ...(i.variantId ? { variantId: i.variantId } : {})})),
        email,
        phone,
        shippingAddress: shipping,
        ...(couponCode.trim() ? { couponCode: couponCode.trim() } : {})};

      submitCheckout(payload, {
        onSuccess: (data) => {
          setResult({
            orderNumber: data.orderNumber,
            reference: data.reference,
            total: data.total,
            paymentUrl: data.paymentUrl});
          setStep(3);

          if (data.total > 0 && data.reference) {
            initiatePay(
              { referenceCode: data.reference },
              {
                onSuccess: (payData) => {
                  setResult(prev => prev ? {
                    ...prev,
                    paymentUrl: payData.authorizationUrl || prev.paymentUrl} : prev);
                }});
          }
        }});
      return;
    }
    setStep(prev => Math.min(prev + 1, STEPS.length - 1));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 0));
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2}).format(price);

  if (!storeId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-950">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 max-w-md w-full text-center space-y-4">
          <Package className="h-12 w-12 text-gray-400 mx-auto" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Missing Store</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            A store ID is required to checkout. Please use a valid checkout link.
          </p>
          <Button onClick={() => router.push('/storefront')}>
            Browse Stores
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          {step > 0 && step < 3 ? (
            <button
              onClick={prevStep}
              className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : null}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Guest Checkout
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {STEPS.slice(0, -1).map((label, i) => (
            <React.Fragment key={label}>
              <div className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  i < step
                    ? 'bg-green-500 text-white'
                    : i === step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:inline ${
                  i === step
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 2 && (
                <div className={`flex-1 h-px min-w-[2rem] ${
                  i < step
                    ? 'bg-green-500'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          {step === 0 && (
            <div className="space-y-6">
              <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                Contact Information
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We&apos;ll use these details to send your order confirmation.
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+234 800 000 0000"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Shipping Address
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Where should we deliver your order?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="fullName"
                      value={shipping.fullName}
                      onChange={e => setShipping(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="John Doe"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="street">Street Address *</Label>
                  <Input
                    id="street"
                    value={shipping.street}
                    onChange={e => setShipping(prev => ({ ...prev, street: e.target.value }))}
                    placeholder="123 Main Street, Apt 4B"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={shipping.city}
                    onChange={e => setShipping(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Lagos"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={shipping.state}
                    onChange={e => setShipping(prev => ({ ...prev, state: e.target.value }))}
                    placeholder="Lagos State"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value={shipping.country}
                    onChange={e => setShipping(prev => ({ ...prev, country: e.target.value }))}
                    placeholder="Nigeria"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP / Postal Code *</Label>
                  <Input
                    id="zipCode"
                    value={shipping.zipCode}
                    onChange={e => setShipping(prev => ({ ...prev, zipCode: e.target.value }))}
                    placeholder="100001"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-blue-600" />
                Order Items
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add the products you&apos;d like to purchase.
              </p>

              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="flex items-end gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex-1 space-y-2">
                      <Label className="text-xs">Product ID *</Label>
                      <Input
                        value={item.productId}
                        onChange={e => updateItem(index, 'productId', e.target.value)}
                        placeholder="prod_xxx"
                        required
                      />
                    </div>
                    <div className="w-24 space-y-2">
                      <Label className="text-xs">Qty *</Label>
                      <Input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={e => updateItem(index, 'quantity', Math.max(1, parseInt(e.target.value) || 1))}
                        required
                      />
                    </div>
                    <div className="w-32 space-y-2">
                      <Label className="text-xs">Variant (opt)</Label>
                      <Input
                        value={item.variantId || ''}
                        onChange={e => updateItem(index, 'variantId', e.target.value)}
                        placeholder="var_xxx"
                      />
                    </div>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                + Add Item
              </Button>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-2">
                  <Label htmlFor="couponCode">Coupon Code (optional)</Label>
                  <Input
                    id="couponCode"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="e.g. WELCOME10"
                    className="uppercase max-w-xs"
                  />
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4 space-y-2">
                <h3 className="font-medium text-sm text-gray-900 dark:text-white">Summary</h3>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Items ({items.filter(i => i.productId.trim()).length})</span>
                  <span className="text-gray-900 dark:text-white font-medium">—</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Email</span>
                  <span className="text-gray-900 dark:text-white">{email || '—'}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Shipping to</span>
                  <span className="text-gray-900 dark:text-white text-right max-w-[200px] truncate">
                    {shipping.city || '—'}, {shipping.state || '—'}
                  </span>
                </div>
                {couponCode && (
                  <div className="flex items-center justify-between text-sm text-green-600">
                    <span>Coupon</span>
                    <span>{couponCode}</span>
                  </div>
                )}
              </div>

              {submitError && (
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
                  {submitError.message}
                </div>
              )}
            </div>
          )}

          {step === 3 && result && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Order Placed Successfully!
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your order has been received and is being processed.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-6 space-y-3 text-left">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Order Number</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{result.orderNumber}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Reference</span>
                  <span className="font-mono text-sm text-gray-900 dark:text-white">{result.reference}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Total</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(result.total)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Status</span>
                  <span className="inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-900/30 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:text-yellow-300">
                    Pending Payment
                  </span>
                </div>
              </div>

              {result.total > 0 && (
                <Button
                  size="lg"
                  className="w-full h-14 text-base"
                  asChild
                  disabled={isInitiatingPay || !result.paymentUrl}
                >
                  <a
                    href={result.paymentUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-disabled={!result.paymentUrl}
                    onClick={e => {
                      if (!result.paymentUrl) e.preventDefault();
                    }}
                  >
                    {isInitiatingPay ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Preparing payment...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5 mr-2" />
                        Pay Now
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </a>
                </Button>
              )}

              <Button
                variant="outline"
                size="lg"
                className="w-full h-14 text-base"
                onClick={() => router.push(`/guest-checkout/track?reference=${result.reference}`)}
              >
                Track Order
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500"
                onClick={() => router.push('/storefront')}
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>

        {step < 3 && (
          <div className="flex items-center justify-between gap-4">
            {step > 0 ? (
              <Button variant="outline" onClick={prevStep} size="lg">
                Back
              </Button>
            ) : (
              <div />
            )}
            <Button
              onClick={nextStep}
              size="lg"
              disabled={!canGoNext || isSubmitting}
              className="min-w-[140px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : step === 2 ? (
                <>
                  Place Order
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function GuestCheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <GuestCheckoutPageContent />
    </Suspense>
  );
}
