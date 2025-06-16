import React from "react";
import KPICards from "../components/dashboard/KPICards";
import SalesChart from "../components/dashboard/SalesChart";
import LowStockAlert from "../components/dashboard/LowStockAlert";
import RestockSuggestions from "../components/dashboard/RestockSuggestions";
import { useQuery } from "@tanstack/react-query";
import RecentActivity from "../../data/RecentActivity.json";

const Dashboard: React.FC = () => {
  // Mock data - replace with actual API calls
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        kpis: {
          totalRevenue: 125000,
          totalOrders: 342,
          totalCustomers: 89,
          lowStockItems: 12,
        },
        salesData: [
          { month: "Jan", sales: 12000, orders: 120 },
          { month: "Feb", sales: 15000, orders: 150 },
          { month: "Mar", sales: 18000, orders: 180 },
          { month: "Apr", sales: 22000, orders: 220 },
          { month: "May", sales: 25000, orders: 250 },
          { month: "Jun", sales: 28000, orders: 280 },
        ],
        lowStockItems: [
          {
            id: 1,
            name: "iPhone 14 Pro",
            currentStock: 5,
            minStock: 10,
            category: "Electronics",
          },
          {
            id: 2,
            name: "Samsung Galaxy S23",
            currentStock: 3,
            minStock: 8,
            category: "Electronics",
          },
          {
            id: 3,
            name: "MacBook Air M2",
            currentStock: 2,
            minStock: 5,
            category: "Laptops",
          },
        ],
        restockSuggestions: [
          {
            id: 1,
            product: "iPhone 14 Pro",
            suggestedQuantity: 20,
            estimatedCost: 15000,
            priority: "high",
          },
          {
            id: 2,
            product: "AirPods Pro",
            suggestedQuantity: 15,
            estimatedCost: 3750,
            priority: "medium",
          },
          {
            id: 3,
            product: "iPad Pro",
            suggestedQuantity: 10,
            estimatedCost: 8000,
            priority: "low",
          },
        ],
      };
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-dark">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <h1 className="text-2xl font-bold text-dark">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>

        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors">
            Quick Action
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <KPICards data={dashboardData?.kpis} />

      {/* Charts and Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <SalesChart />
        </div>

        {/* Low Stock Alert */}
        <div>
          <LowStockAlert items={dashboardData?.lowStockItems} />
        </div>
      </div>

      {/* Restock Suggestions */}
      <RestockSuggestions />

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-dark">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {RecentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === "order"
                      ? "bg-success"
                      : activity.type === "product"
                      ? "bg-accent"
                      : activity.type === "customer"
                      ? "bg-primary"
                      : "bg-danger"
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-dark">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
