import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false);

  const minPrice =
    product?.variants && product.variants.length > 0
      ? Math.min(...product.variants.map((v) => Number(v.price)))
      : null;

  const firstVariant = product?.variants?.[0];
  const imageUrl = firstVariant?.imageUrl;

  return (
    <Link to={`/products/${product.slug}`} className="block text-inherit no-underline group">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs hover:shadow-md hover:border-gray-300 transition duration-200 flex flex-col">
        <div className="w-full h-56 flex items-center justify-center mb-4 bg-gray-50 rounded-xl overflow-hidden">
          {!imgError && imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              Image unavailable
            </div>
          )}
        </div>
        <div className="w-full text-left">
          <h2 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h2>
          {minPrice !== null && (
            <p className="text-sm font-medium text-gray-600">
              From ₹{minPrice.toLocaleString('en-IN')}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
