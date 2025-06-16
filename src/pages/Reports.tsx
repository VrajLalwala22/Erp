import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  DollarSign,
  Package,
  Users,
  FileText,
} from "lucide-react";
import ReportFilters from "../components/reports/ReportFilters";
import ExportableReport from "../components/reports/ExportableReport";

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState({
    from: "2024-01-01",
    to: "2024-06-30",
  });
  const [reportType, setReportType] = useState("overview");

  const { data: reportData, isLoading } = useQuery({
    queryKey: ["reports", dateRange, reportType],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        overview: {
          totalRevenue: 285000,
          totalOrders: 1342,
          totalCustomers: 289,
          averageOrderValue: 212.45,
          revenueGrowth: 15.2,
          orderGrowth: 8.7,
          customerGrowth: 12.3,
        },
        salesData: [
          { month: "Jan", revenue: 42000, orders: 180, customers: 45 },
          { month: "Feb", revenue: 38000, orders: 165, customers: 42 },
          { month: "Mar", revenue: 48000, orders: 220, customers: 55 },
          { month: "Apr", revenue: 52000, orders: 240, customers: 58 },
          { month: "May", revenue: 55000, orders: 260, customers: 62 },
          { month: "Jun", revenue: 50000, orders: 277, customers: 67 },
        ],
        productPerformance: [
          { name: "Electronics", value: 35, revenue: 99750 },
          { name: "Clothing", value: 28, revenue: 79800 },
          { name: "Home & Garden", value: 20, revenue: 57000 },
          { name: "Sports", value: 10, revenue: 28500 },
          { name: "Books", value: 7, revenue: 19950 },
        ],
        topProducts: [
          { name: "iPhone 14 Pro", sales: 145, revenue: 144550 },
          { name: 'Samsung TV 55"', sales: 89, revenue: 71200 },
          { name: "MacBook Air M2", sales: 67, revenue: 80400 },
          { name: "Nike Air Max", sales: 234, revenue: 35100 },
          { name: "Wireless Headphones", sales: 156, revenue: 31200 },
        ],
        customerAnalytics: {
          newCustomers: 67,
          returningCustomers: 222,
          averageLifetimeValue: 892.45,
          churnRate: 8.5,
        },
      };
    },
  });

  const COLORS = ["#2563EB", "#FACC15", "#34D399", "#F87171", "#8B5CF6"];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    positive = true,
  }: {
    title: string;
    value: string;
    change?: string;
    icon: React.ElementType;
    positive?: boolean;
  }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-dark mt-2">{value}</p>
          {change && (
            <div
              className={`flex items-center mt-2 ${
                positive ? "text-success" : "text-danger"
              }`}
            >
              {positive ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
        </div>
        <div
          className={`p-3 rounded-lg ${
            positive ? "bg-success/10" : "bg-primary/10"
          }`}
        >
          <Icon
            className={`h-6 w-6 ${positive ? "text-success" : "text-primary"}`}
          />
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-dark">Reports & Analytics</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="animate-pulse h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-dark">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">
            Comprehensive insights into your business performance
          </p>
        </div>

        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <Calendar className="h-4 w-4 mr-2" />
            Custom Range
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <ReportFilters
        dateRange={dateRange}
        onDateRangeChange={(range) =>
          setDateRange({ from: range.start, to: range.end })
        }
        reportType={reportType}
        onReportTypeChange={setReportType}
      />

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(reportData?.overview.totalRevenue || 0)}
          change={`+${reportData?.overview.revenueGrowth}%`}
          icon={DollarSign}
        />
        <StatCard
          title="Total Orders"
          value={reportData?.overview.totalOrders.toLocaleString() || "0"}
          change={`+${reportData?.overview.orderGrowth}%`}
          icon={Package}
        />
        <StatCard
          title="Total Customers"
          value={reportData?.overview.totalCustomers.toString() || "0"}
          change={`+${reportData?.overview.customerGrowth}%`}
          icon={Users}
        />
        <StatCard
          title="Avg Order Value"
          value={formatCurrency(reportData?.overview.averageOrderValue || 0)}
          change="+5.2%"
          icon={FileText}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-dark">Revenue Trend</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span>Revenue</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reportData?.salesData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                formatter={(value: number) => [
                  formatCurrency(value),
                  "Revenue",
                ]}
                labelStyle={{ color: "#374151" }}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563EB"
                strokeWidth={3}
                dot={{ fill: "#2563EB", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#2563EB", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Orders & Customers */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-dark">
              Orders & Customers
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>Orders</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span>Customers</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData?.salesData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar dataKey="orders" fill="#2563EB" radius={[4, 4, 0, 0]} />
              <Bar dataKey="customers" fill="#FACC15" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Performance & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Performance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-dark mb-6">
            Sales by Category
          </h3>
          <div className="flex items-center">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={reportData?.productPerformance || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {reportData?.productPerformance?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string, props: any) => [
                      `${value}%`,
                      formatCurrency(props.payload.revenue),
                    ]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="ml-6 space-y-3">
              {reportData?.productPerformance?.map((item, index) => (
                <div key={item.name} className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-dark">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatCurrency(item.revenue)}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-dark">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-dark mb-6">
            Top Performing Products
          </h3>
          <div className="space-y-4">
            {reportData?.topProducts?.map((product, index) => (
              <div key={product.name} className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    #{index + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-dark truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500">{product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-dark">
                    {formatCurrency(product.revenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Analytics */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-dark mb-6">
          Customer Analytics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-8 w-8 text-success" />
            </div>
            <p className="text-2xl font-bold text-dark">
              {reportData?.customerAnalytics.newCustomers}
            </p>
            <p className="text-sm text-gray-600">New Customers</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <p className="text-2xl font-bold text-dark">
              {reportData?.customerAnalytics.returningCustomers}
            </p>
            <p className="text-sm text-gray-600">Returning Customers</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="h-8 w-8 text-accent" />
            </div>
            <p className="text-2xl font-bold text-dark">
              {formatCurrency(
                reportData?.customerAnalytics.averageLifetimeValue || 0
              )}
            </p>
            <p className="text-sm text-gray-600">Avg Lifetime Value</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-danger/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingDown className="h-8 w-8 text-danger" />
            </div>
            <p className="text-2xl font-bold text-dark">
              {reportData?.customerAnalytics.churnRate}%
            </p>
            <p className="text-sm text-gray-600">Churn Rate</p>
          </div>
        </div>
      </div>

      {/* Exportable Report Section */}
      <ExportableReport
        data={reportData}
        dateRange={dateRange}
        reportType={reportType}
      />
    </div>
  );
};

export default Reports;
