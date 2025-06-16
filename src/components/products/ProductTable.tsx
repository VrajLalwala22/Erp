import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  Package,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  status: "active" | "inactive" | "discontinued";
  lastUpdated: string;
  image?: string;
}

interface ProductTableProps {
  products?: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (productId: number) => void;
  onView?: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products = [],
  onEdit,
  onDelete,
  onView,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "price" | "stock">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Mock data if no products provided
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "iPhone 14 Pro",
      sku: "IP14P-256-BLK",
      category: "Electronics",
      price: 999,
      stock: 15,
      minStock: 10,
      status: "active",
      lastUpdated: "2024-01-15",
    },
    {
      id: 2,
      name: "Samsung Galaxy S23",
      sku: "SGS23-128-WHT",
      category: "Electronics",
      price: 799,
      stock: 8,
      minStock: 12,
      status: "active",
      lastUpdated: "2024-01-14",
    },
    {
      id: 3,
      name: "MacBook Air M2",
      sku: "MBA-M2-256-SLV",
      category: "Laptops",
      price: 1199,
      stock: 5,
      minStock: 8,
      status: "active",
      lastUpdated: "2024-01-13",
    },
    {
      id: 4,
      name: "AirPods Pro",
      sku: "APP-GEN2-WHT",
      category: "Accessories",
      price: 249,
      stock: 25,
      minStock: 15,
      status: "active",
      lastUpdated: "2024-01-12",
    },
    {
      id: 5,
      name: "Dell XPS 13",
      sku: "DXP13-512-BLK",
      category: "Laptops",
      price: 1099,
      stock: 0,
      minStock: 5,
      status: "inactive",
      lastUpdated: "2024-01-10",
    },
  ];

  const displayProducts = products.length > 0 ? products : mockProducts;

  const categories = [
    "all",
    ...new Set(displayProducts.map((p) => p.category)),
  ];

  const filteredProducts = displayProducts
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (product) =>
        filterCategory === "all" || product.category === filterCategory
    )
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-success border-green-200";
      case "inactive":
        return "bg-gray-50 text-gray-600 border-gray-200";
      case "discontinued":
        return "bg-red-50 text-danger border-red-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getStockStatus = (current: number, min: number) => {
    if (current === 0)
      return {
        color: "text-danger",
        icon: <TrendingDown className="h-4 w-4" />,
      };
    if (current <= min)
      return {
        color: "text-accent",
        icon: <TrendingDown className="h-4 w-4" />,
      };
    return { color: "text-success", icon: <TrendingUp className="h-4 w-4" /> };
  };

  const handleSort = (field: "name" | "price" | "stock") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-dark">
              Product Inventory
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center space-x-1">
                  <span>Name</span>
                  {sortBy === "name" &&
                    (sortOrder === "asc" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    ))}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("price")}
              >
                <div className="flex items-center space-x-1">
                  <span>Price</span>
                  {sortBy === "price" &&
                    (sortOrder === "asc" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    ))}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("stock")}
              >
                <div className="flex items-center space-x-1">
                  <span>Stock</span>
                  {sortBy === "stock" &&
                    (sortOrder === "asc" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    ))}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(
                product.stock,
                product.minStock
              );

              return (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Package className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-dark">
                          {product.sku}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-dark">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark">
                    ${product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`flex items-center space-x-1 ${stockStatus.color}`}
                    >
                      {stockStatus.icon}
                      <span className="text-sm font-medium">
                        {product.stock}
                      </span>
                      <span className="text-xs text-gray-500">
                        / {product.minStock}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium border rounded-full ${getStatusBadge(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onView?.(product)}
                        className="text-primary hover:text-blue-700 transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onEdit?.(product)}
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete?.(product.id)}
                        className="text-danger hover:text-red-700 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            No products found matching your criteria
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredProducts.length} of {displayProducts.length} products
        </p>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
