'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShoppingCart, Minus, Plus, ArrowLeft, Package } from 'lucide-react';
import { productApi, cartApi } from '@/features/onboarding/services/onboarding.service';
import type { ProductDto } from '@/features/onboarding/types';
import { Button } from '@/components/ui/button';
import { LoadingState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [product, setProduct] = useState<ProductDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const fetchProduct = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await productApi.getById(id);
      if (!res.data.data) throw new Error('Product not found');
      setProduct(res.data.data);
    } catch {
      setError('Failed to load product. It may have been removed.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    try {
      await cartApi.add({
        storeId: product.storeId,
        productId: product.id,
        quantity,
      });
      toast.success(`${product.name} added to cart!`);
    } catch {
      toast.error('Failed to add item to cart.');
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <LoadingState message="Loading product..." />;

  if (error) return <ErrorState title="Product not found" description={error} onRetry={fetchProduct} />;

  if (!product) return <ErrorState title="Product not found" description="This product could not be found." />;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: product.currency || 'NGN',
      minimumFractionDigits: 2,
    }).format(price);

  const productImages: string[] = [];
  if (product.imageUrl) productImages.push(product.imageUrl);
  if (product.images) {
    try {
      const parsed = JSON.parse(product.images);
      if (Array.isArray(parsed)) productImages.push(...parsed.filter(Boolean));
    } catch {
      // ignore parse errors
    }
  }

  const inStock = product.quantity > 0;

  return (
    <div className="space-y-6 py-4">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="aspect-square bg-gray-100 dark:bg-gray-800 relative">
            {productImages.length > 0 ? (
              <Image
                src={productImages[0]}
                alt={product.name}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Package className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>
          {productImages.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto">
              {productImages.map((img, i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-800 relative"
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h1>
            {product.sku && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                SKU: {product.sku}
              </p>
            )}
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <div>
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                inStock
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              )}
            >
              {inStock ? `In Stock (${product.quantity} available)` : 'Out of Stock'}
            </span>
          </div>

          {product.description && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Description
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {inStock && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Quantity:
              </span>
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-sm font-medium text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                  disabled={quantity >= product.quantity}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          <Button
            size="lg"
            className="w-full sm:w-auto"
            disabled={!inStock || adding}
            onClick={handleAddToCart}
          >
            {adding ? (
              'Adding...'
            ) : (
              <>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart — {formatPrice(product.price * quantity)}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
