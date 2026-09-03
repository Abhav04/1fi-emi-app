export default function VariantSelector({ variants = [], selectedVariantId, onSelect }) {
  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2.5">
      {variants.map((variant) => {
        const isSelected = variant.id === selectedVariantId;
        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => onSelect(variant.id)}
            className={`px-4 py-2 text-sm rounded-lg font-medium transition cursor-pointer ${
              isSelected
                ? 'bg-black text-white shadow-xs'
                : 'border border-gray-200 bg-white text-gray-800 hover:border-gray-300'
            }`}
          >
            {variant.variantLabel}
          </button>
        );
      })}
    </div>
  );
}
