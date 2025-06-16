import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  Plus,
  Filter,
  Download,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShoppingBag,
} from "lucide-react";
import CustomerTable from "../components/customers/CustomerTable";
import CustomerHistory from "../components/customers/CustomerHistory";

const Customers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showHistory, setShowHistory] = useState(false);

  const { data: customersData, isLoading } = useQuery({
    queryKey: ["customers", searchTerm],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        customers: [
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@email.com",
            phone: "+1 (555) 123-4567",
            address: "123 Main St, New York, NY 10001",
            totalOrders: 15,
            totalSpent: 12500,
            lastOrder: "2024-06-10",
            status: "active",
            joinDate: "2023-01-15",
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane.smith@email.com",
            phone: "+1 (555) 987-6543",
            address: "456 Oak Ave, Los Angeles, CA 90210",
            totalOrders: 8,
            totalSpent: 6800,
            lastOrder: "2024-06-08",
            status: "active",
            joinDate: "2023-03-22",
          },
          {
            id: 3,
            name: "Mike Johnson",
            email: "mike.johnson@email.com",
            phone: "+1 (555) 456-7890",
            address: "789 Pine St, Chicago, IL 60601",
            totalOrders: 23,
            totalSpent: 18900,
            lastOrder: "2024-06-12",
            status: "active",
            joinDate: "2022-11-08",
          },
          {
            id: 4,
            name: "Sarah Wilson",
            email: "sarah.wilson@email.com",
            phone: "+1 (555) 321-0987",
            address: "321 Elm St, Houston, TX 77001",
            totalOrders: 4,
            totalSpent: 2100,
            lastOrder: "2024-05-20",
            status: "inactive",
            joinDate: "2024-01-10",
          },
        ],
        stats: {
          totalCustomers: 156,
          activeCustomers: 134,
          newThisMonth: 12,
          avgOrderValue: 450,
        },
      };
    },
  });

  const handleViewHistory = (customer: any) => {
    setSelectedCustomer(customer);
    setShowHistory(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-dark">Customers</h1>
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
          <h1 className="text-2xl font-bold text-dark">Customers</h1>
          <p className="text-gray-600 mt-1">
            Manage your customer relationships and track their journey
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-dark">
                {customersData?.stats.totalCustomers}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Customers</p>
              <p className="text-2xl font-bold text-dark">
                {customersData?.stats.activeCustomers}
              </p>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-success" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">New This Month</p>
              <p className="text-2xl font-bold text-dark">
                {customersData?.stats.newThisMonth}
              </p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-accent" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-dark">
                ${customersData?.stats.avgOrderValue}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Customer Table */}
      <CustomerTable
        customers={customersData?.customers || []}
        onViewHistory={handleViewHistory}
      />

      {/* Customer History Modal */}
      {showHistory && selectedCustomer && (
        <CustomerHistory
          customer={selectedCustomer}
          onClose={() => setShowHistory(false)}
        />
      )}
    </div>
  );
};

export default Customers;
