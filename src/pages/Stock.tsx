import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  Filter,
  Plus,
  AlertTriangle,
  Package,
  TrendingUp,
  TrendingDown,
  BarChart3,
} from "lucide-react";
import MovementLog from "../components/stock/MovementLog";
import ManualAdjustModal from "../components/stock/ManualAdjustModal";

const Stock: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const { data: stockData, isLoading } = useQuery({
    queryKey: ["stock", searchTerm, selectedCategory],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        summary: {
          totalProducts: 156,
          lowStockItems: 12,
          outOfStock: 3,
          totalValue: 245000,
        },
        categories: ["all", "Electronics", "Laptops", "Accessories", "Mobile"],
        products: [
          {
            id: 1,
            name: "iPhone 14 Pro",
            sku: "IPH14PRO256",
            category: "Mobile",
            currentStock: 5,
            minStock: 10,
            maxStock: 50,
            unitCost: 750,
            unitPrice: 999,
            status: "low",
            lastRestocked: "2024-06-01",
            location: "A1-B2",
          },
          {
            id: 2,
            name: "MacBook Air M2",
            sku: "MBA13M2256",
            category: "Laptops",
            currentStock: 8,
            minStock: 5,
            maxStock: 25,
            unitCost: 950,
            unitPrice: 1299,
            status: "good",
            lastRestocked: "2024-06-05",
            location: "B2-C1",
          },
          {
            id: 3,
            name: "AirPods Pro",
            sku: "APP2GEN",
            category: "Accessories",
            currentStock: 0,
            minStock: 15,
            maxStock: 100,
            unitCost: 180,
            unitPrice: 249,
            status: "out_of_stock",
            lastRestocked: "2024-05-20",
            location: "C1-D3",
          },
          {
            id: 4,
            name: "Samsung Galaxy S23",
            sku: "SGS23256",
            category: "Mobile",
            currentStock: 15,
            minStock: 8,
            maxStock: 40,
            unitCost: 650,
            unitPrice: 899,
            status: "good",
            lastRestocked: "2024-06-08",
            location: "A2-B1",
          },
        ],
        movements: [
          {
            id: 1,
            productName: "iPhone 14 Pro",
            type: "sale",
            quantity: -2,
            date: "2024-06-12",
            reference: "INV-2024-001",
            user: "John Doe",
          },
          {
            id: 2,
            productName: "MacBook Air M2",
            type: "restock",
            quantity: +10,
            date: "2024-06-11",
            reference: "PO-2024-045",
            user: "Admin",
          },
          {
            id: 3,
            productName: "AirPods Pro",
            type: "adjustment",
            quantity: -5,
            date: "2024-06-10",
            reference: "ADJ-2024-012",
            user: "Jane Smith",
          },
        ],
      };
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-success/10 text-success";
      case "low":
        return "bg-accent/10 text-accent";
      case "out_of_stock":
        return "bg-danger/10 text-danger";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <TrendingUp className="w-4 h-4" />;
      case "low":
        return <AlertTriangle className="w-4 h-4" />;
      case "out_of_stock":
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const handleAdjustStock = (product: any) => {
    setSelectedProduct(product);
    setShowAdjustModal(true);
  };

  const filteredProducts =
    stockData?.products.filter((product: any) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }) || [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-dark">Stock Management</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">Stock Management</h1>
          <p className="text-gray-600 mt-1">
            Monitor inventory levels and track stock movements
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Reports</span>
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-dark">
                {stockData?.summary.totalProducts}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-bold text-accent">
                {stockData?.summary.lowStockItems}
              </p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-accent" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-danger">
                {stockData?.summary.outOfStock}
              </p>
            </div>
            <div className="w-12 h-12 bg-danger/10 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-danger" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-dark">
                ${stockData?.summary.totalValue.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {stockData?.categories.map((category: string) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stock Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-dark">
                Product Inventory
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                      Product
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                      Stock Level
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                      Value
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                      Status
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product: any) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-dark">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            SKU: {product.sku}
                          </p>
                          <p className="text-xs text-gray-500">
                            Location: {product.location}
                          </p>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-dark">
                            {product.currentStock} units
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className={`h-2 rounded-full ${
                                product.status === "good"
                                  ? "bg-success"
                                  : product.status === "low"
                                  ? "bg-accent"
                                  : "bg-danger"
                              }`}
                              style={{
                                width: `${Math.max(
                                  5,
                                  (product.currentStock / product.maxStock) *
                                    100
                                )}%`,
                              }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Min: {product.minStock} | Max: {product.maxStock}
                          </p>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <p className="font-medium text-dark">
                          $
                          {(
                            product.currentStock * product.unitCost
                          ).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          @${product.unitCost}/unit
                        </p>
                      </td>

                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            product.status
                          )}`}
                        >
                          {getStatusIcon(product.status)}
                          <span>
                            {product.status === "out_of_stock"
                              ? "Out of Stock"
                              : product.status === "low"
                              ? "Low Stock"
                              : "Good"}
                          </span>
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleAdjustStock(product)}
                          className="px-3 py-1 bg-primary text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                        >
                          Adjust
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Movement Log */}
        <div>
          <MovementLog movements={stockData?.movements || []} />
        </div>
      </div>

      {/* Manual Adjust Modal */}
      {showAdjustModal && selectedProduct && (
        <ManualAdjustModal
          product={selectedProduct}
          onClose={() => setShowAdjustModal(false)}
          onSave={() => {
            setShowAdjustModal(false);
            // Refresh data here
          }}
        />
      )}
    </div>
  );
};

export default Stock;
