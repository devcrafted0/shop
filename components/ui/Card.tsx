import { Product } from "@/generated/prisma/client";

const Card = ({ product }: { product: Product }) => {
  const isInStock = product.amount > 0;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            {product.product}
          </p>

          <h2 className="mt-1 truncate text-lg font-semibold text-gray-900">
            {product.name}
          </h2>

          <p className="mt-0.5 text-sm text-gray-500">{product.company}</p>
        </div>

        {/* Stock badge */}
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
            isInStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {isInStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Product details */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-400">Type</p>
          <p className="mt-1 truncate text-sm font-medium text-gray-800">
            {product.type}
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-400">Size</p>
          <p className="mt-1 text-sm font-medium text-gray-800">
            {product.size}
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-xs text-gray-400">Code</p>
          <p className="mt-1 truncate text-sm font-medium text-gray-800">
            {product.code}
          </p>
        </div>

        <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
              Available
            </p>
          </div>

          <p className="mt-1 text-2xl font-bold text-blue-700">
            {product.amount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
