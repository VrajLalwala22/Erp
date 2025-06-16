import React from "react";
import { formatCurrency, getStatusColor } from "../../lib/utils";
import Card from "../ui/Card";
import Button from "../ui/Button";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  status: "active" | "inactive" | "discontinued";
  image?: string;
  description?: string;
  lastUpdated: string;
}

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onQuickStock?: (product: Product) => void;
  view?: "grid" | "list";
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  onQuickStock,
  view = "grid",
}) => {
  const isLowStock = product.stock <= product.minStock;
  const isOutOfStock = product.stock === 0;

  if (view === "list") {
    return (
      <Card className="hover:shadow-md transition-shadow" padding="sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <div className="flex-shrink-0">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-medium text-[#0F172A] truncate">
                  {product.name}
                </h3>
                <span
                  className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
                    product.status
                  )}`}
                >
                  {product.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">SKU: {product.sku}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>

            <div className="text-right">
              <p className="text-lg font-semibold text-[#0F172A]">
                {formatCurrency(product.price)}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span
                  className={`text-sm font-medium ${
                    isOutOfStock
                      ? "text-[#F87171]"
                      : isLowStock
                      ? "text-[#FACC15]"
                      : "text-[#34D399]"
                  }`}
                >
                  {product.stock} in stock
                </span>
                {isLowStock && (
                  <svg
                    className="w-4 h-4 text-[#FACC15]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            {onQuickStock && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onQuickStock(product)}
                className="text-[#2563EB] hover:text-blue-700"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </Button>
            )}
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(product)}
                className="text-gray-600 hover:text-gray-800"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(product)}
                className="text-[#F87171] hover:text-red-600"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  }

  // Grid view
  return (
    <Card
      className="hover:shadow-lg transition-all duration-200 group"
      padding="none"
    >
      <div className="relative">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-xl"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 rounded-t-xl flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
        )}

        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
              product.status
            )}`}
          >
            {product.status}
          </span>
        </div>

        {isLowStock && (
          <div className="absolute top-3 left-3">
            <div
              className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isOutOfStock
                  ? "bg-red-100 text-[#F87171]"
                  : "bg-yellow-100 text-[#FACC15]"
              }`}
            >
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {isOutOfStock ? "Out of Stock" : "Low Stock"}
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-[#0F172A] mb-1 line-clamp-2 group-hover:text-[#2563EB] transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-1">SKU: {product.sku}</p>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>

        {product.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xl font-bold text-[#0F172A]">
              {formatCurrency(product.price)}
            </p>
            <p
              className={`text-sm font-medium ${
                isOutOfStock
                  ? "text-[#F87171]"
                  : isLowStock
                  ? "text-[#FACC15]"
                  : "text-[#34D399]"
              }`}
            >
              {product.stock} in stock
            </p>
          </div>

          {onQuickStock && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuickStock(product)}
              className="flex items-center space-x-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Stock</span>
            </Button>
          )}
        </div>

        <div className="flex space-x-2">
          {onEdit && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onEdit(product)}
              className="flex-1"
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(product)}
              className="px-3"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
