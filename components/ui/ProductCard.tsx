import { Product } from "@/generated/prisma/client";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group rounded-2xl border bg-white p-5 ">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
            {product.product}
          </p>

          <h2 className="truncate text-lg font-semibold text-gray-900">
            {product.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500">{product.company}</p>
        </div>

        {/* Stock */}
        <div
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            product.amount > 0
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {product.amount > 0 ? "In Stock" : "Out of Stock"}
        </div>
      </div>

      {/* Details */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="p-3 border">
          <p className="text-xs text-gray-400">Type</p>
          <p className="mt-1 text-sm font-medium text-gray-800">
            {product.type}
          </p>
        </div>

        <div className="p-3 border">
          <p className="text-xs text-gray-400">Size</p>
          <p className="mt-1 text-sm font-medium text-gray-800">
            {product.size}
          </p>
        </div>

        <div className="p-3 border">
          <p className="text-xs text-gray-400">Amount</p>
          <p className="mt-1 text-sm font-semibold text-gray-900">
            {product.amount}
          </p>
        </div>

        <div className="p-3 border">
          <p className="text-xs text-gray-400">Code</p>
          <p className="mt-1 truncate text-sm font-medium text-gray-800">
            {product.code}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-xs text-gray-400">Product ID: #{product.id}</span>

        <button
          type="button"
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
