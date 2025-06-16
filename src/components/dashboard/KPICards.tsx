import React from "react";
import {
  DollarSign,
  ShoppingCart,
  Users,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface KPIData {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  lowStockItems: number;
}

interface KPICardsProps {
  data?: KPIData;
}

const KPICards: React.FC<KPICardsProps> = ({ data }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const kpiItems = [
    {
      title: "Total Revenue",
      value: data ? formatCurrency(data.totalRevenue) : "$0",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
      color: "bg-green-50 text-green-600",
      iconBg: "bg-green-100",
    },
    {
      title: "Total Orders",
      value: data?.totalOrders.toLocaleString() || "0",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: ShoppingCart,
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      title: "Customers",
      value: data?.totalCustomers.toLocaleString() || "0",
      change: "+5.1%",
      changeType: "positive" as const,
      icon: Users,
      color: "bg-purple-50 text-purple-600",
      iconBg: "bg-purple-100",
    },
    {
      title: "Low Stock Items",
      value: data?.lowStockItems.toString() || "0",
      change: "-2.3%",
      changeType: "negative" as const,
      icon: AlertTriangle,
      color: "bg-red-50 text-red-600",
      iconBg: "bg-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiItems.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">
                {item.title}
              </p>
              <p className="text-2xl font-bold text-dark mb-2">{item.value}</p>
              <div className="flex items-center space-x-1">
                {item.changeType === "positive" ? (
                  <TrendingUp className="w-4 h-4 text-success" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-danger" />
                )}
                <span
                  className={`text-sm font-medium ${
                    item.changeType === "positive"
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {item.change}
                </span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </div>

            <div
              className={`w-12 h-12 ${item.iconBg} rounded-lg flex items-center justify-center`}
            >
              <item.icon className={`w-6 h-6 ${item.color.split(" ")[1]}`} />
            </div>
          </div>

          {/* Progress bar for visual appeal */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className={`h-1 rounded-full ${
                  item.changeType === "positive" ? "bg-success" : "bg-danger"
                }`}
                style={{
                  width: `${Math.abs(parseFloat(item.change))}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
