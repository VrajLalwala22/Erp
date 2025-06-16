import React from "react";
import {
  X,
  Package,
  Calendar,
  DollarSign,
  TrendingUp,
  ShoppingBag,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface CustomerHistoryProps {
  customer: any;
  onClose: () => void;
}

const CustomerHistory: React.FC<CustomerHistoryProps> = ({
  customer,
  onClose,
}) => {
  const { data: historyData, isLoading } = useQuery({
    queryKey: ["customerHistory", customer.id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        orders: [
          {
            id: "INV-2024-001",
            date: "2024-06-12",
            total: 1299.99,
            items: 3,
            status: "delivered",
            products: ["iPhone 14 Pro", "AirPods Pro", "Lightning Cable"],
          },
          {
            id: "INV-2024-002",
            date: "2024-05-28",
            total: 799.99,
            items: 2,
            status: "delivered",
            products: ["iPad Air", "Apple Pencil"],
          },
          {
            id: "INV-2024-003",
            date: "2024-05-15",
            total: 249.99,
            items: 1,
            status: "delivered",
            products: ["AirPods Pro"],
          },
          {
            id: "INV-2024-004",
            date: "2024-04-20",
            total: 1099.99,
            items: 1,
            status: "delivered",
            products: ["MacBook Air M2"],
          },
        ],
        analytics: {
          avgOrderValue: 612.49,
          totalOrders: 4,
          favoriteCategory: "Electronics",
          lastOrderDays: 1,
        },
      };
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-success/10 text-success";
      case "pending":
        return "bg-accent/10 text-accent";
      case "cancelled":
        return "bg-danger/10 text-danger";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-medium text-lg">
                {customer.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-dark">{customer.name}</h2>
              <p className="text-gray-600">Customer History & Analytics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {isLoading ? (
            <div className="p-8 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {/* Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg Order Value</p>
                      <p className="text-lg font-bold text-dark">
                        ${historyData?.analytics.avgOrderValue}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-success/10 to-success/5 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Orders</p>
                      <p className="text-lg font-bold text-dark">
                        {historyData?.analytics.totalOrders}
                      </p>
                    </div>
                    <ShoppingBag className="w-8 h-8 text-success" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Favorite Category</p>
                      <p className="text-lg font-bold text-dark">
                        {historyData?.analytics.favoriteCategory}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-accent" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Last Order</p>
                      <p className="text-lg font-bold text-dark">
                        {historyData?.analytics.lastOrderDays} day
                        {historyData?.analytics.lastOrderDays !== 1 ? "s" : ""}{" "}
                        ago
                      </p>
                    </div>
                    <Calendar className="w-8 h-8 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Order History */}
              <div>
                <h3 className="text-lg font-semibold text-dark mb-4">
                  Order History
                </h3>
                <div className="space-y-4">
                  {historyData?.orders.map((order: any) => (
                    <div
                      key={order.id}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-dark">{order.id}</p>
                            <p className="text-sm text-gray-600">
                              {formatDate(order.date)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-bold text-dark">
                              ${order.total}
                            </p>
                            <p className="text-sm text-gray-600">
                              {order.items} items
                            </p>
                          </div>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {order.products.map(
                          (product: string, index: number) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-white text-gray-700 border border-gray-200"
                            >
                              {product}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerHistory;
