import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug } from '../api/products';
import VariantSelector from '../components/VariantSelector';
import EmiPlanList from '../components/EmiPlanList';

export default function ProductDetailPage() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductBySlug(slug);
        if (isMounted) {
          setProduct(data);
          const firstVariant = data?.variants?.[0] ?? null;
          setSelectedVariantId(firstVariant?.id ?? null);
          setSelectedPlanId(firstVariant?.emiPlans?.[0]?.id ?? null);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || 'Failed to load product details');
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  useEffect(() => {
    setImgError(false);
  }, [selectedVariantId]);

  const selectedVariant =
    product?.variants?.find((v) => v.id === selectedVariantId) || null;

  const handleVariantSelect = (variantId) => {
    setSelectedVariantId(variantId);
    const variant = product?.variants?.find((v) => v.id === variantId);
    setSelectedPlanId(variant?.emiPlans?.[0]?.id ?? null);
  };

  const handlePlanSelect = (planId) => {
    setSelectedPlanId(planId);
  };

  const handleProceed = () => {
    const selectedPlan = selectedVariant?.emiPlans?.find(
      (p) => p.id === selectedPlanId
    );
    if (selectedPlan) {
      const formattedAmount = Number(selectedPlan.monthlyAmount).toLocaleString('en-IN');
      alert(
        `Selected Plan: ₹${formattedAmount}/month for ${selectedPlan.tenureMonths} months (${Number(selectedPlan.interestRate)}% interest)`
      );
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600">
        Loading product details...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center">
        <p className="text-red-600 text-lg font-medium mb-4">
          {error || 'Product not found'}
        </p>
        <Link
          to="/"
          className="inline-block bg-black text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/"
          className="text-sm font-medium text-gray-500 hover:text-gray-900 transition inline-flex items-center gap-1.5"
        >
          ← Back to products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left Column: Visual & Variant Card */}
        <div className="rounded-3xl bg-gray-50 p-6 sm:p-8 flex flex-col">
          <span className="text-xs font-bold text-red-600 tracking-wider uppercase mb-1">
            NEW
          </span>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          {selectedVariant && (
            <p className="text-gray-500 text-sm mt-1 mb-6 font-medium">
              {selectedVariant.variantLabel}
            </p>
          )}

          {/* Clean white image display area */}
          <div className="w-full h-80 sm:h-96 flex items-center justify-center my-2 overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-xs">
            {!imgError && selectedVariant?.imageUrl ? (
              <img
                src={selectedVariant.imageUrl}
                alt={`${product.name} - ${selectedVariant.variantLabel}`}
                onError={() => setImgError(true)}
                className="w-full h-full object-contain p-8 transition-all duration-200"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                Image unavailable
              </div>
            )}
          </div>

          <div className="mt-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Available in {product.variants.length} variants
            </p>
            <VariantSelector
              variants={product.variants}
              selectedVariantId={selectedVariantId}
              onSelect={handleVariantSelect}
            />
          </div>
        </div>

        {/* Right Column: Pricing, EMI Plans, and Proceed */}
        <div className="flex flex-col pt-1">
          {selectedVariant && (
            <div className="mb-6">
              {selectedVariant.mrp &&
                Number(selectedVariant.mrp) > Number(selectedVariant.price) && (
                  <div className="text-gray-400 line-through text-base font-medium mb-1">
                    ₹{Number(selectedVariant.mrp).toLocaleString('en-IN')}
                  </div>
                )}
              <div className="text-4xl font-extrabold text-gray-900 tracking-tight">
                ₹{Number(selectedVariant.price).toLocaleString('en-IN')}
              </div>
            </div>
          )}

          <h2 className="font-bold text-gray-900 text-xl mb-4">
            EMI plans backed by mutual funds
          </h2>

          <EmiPlanList
            emiPlans={selectedVariant?.emiPlans}
            selectedPlanId={selectedPlanId}
            onSelect={handlePlanSelect}
          />

          <button
            type="button"
            disabled={selectedPlanId === null}
            onClick={handleProceed}
            className="w-full bg-black text-white rounded-xl py-4 font-semibold text-base mt-6 transition hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
