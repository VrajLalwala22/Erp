import React, { useState } from "react";
import Button from "../ui/Button";
import { CalendarIcon, FunnelIcon } from "@heroicons/react/24/outline";

interface ReportFiltersProps {
  onDateRangeChange: (range: { start: string; end: string }) => void;
  reportType: string;
}

const ReportFilters: React.FC<ReportFiltersProps> = ({
  onDateRangeChange,
  reportType,
}) => {
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    status: "",
    store: "",
    customer: "",
    product: "",
  });

  const handleDateChange = (field: "start" | "end", value: string) => {
    const newRange = { ...dateRange, [field]: value };
    setDateRange(newRange);
    onDateRangeChange(newRange);
  };

  const handleFilterChange = (field: string, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setDateRange({ start: "", end: "" });
    setSelectedFilters({
      category: "",
      status: "",
      store: "",
      customer: "",
      product: "",
    });
    onDateRangeChange({ start: "", end: "" });
  };

  const getQuickDateRange = (days: number) => {
    const end = new Date().toISOString().split("T")[0];
    const start = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    setDateRange({ start, end });
    onDateRangeChange({ start, end });
  };

  const renderReportSpecificFilters = () => {
    switch (reportType) {
      case "sales":
        return (
          <>
            <div>
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={selectedFilters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="form-label">Store</label>
              <select
                className="form-select"
                value={selectedFilters.store}
                onChange={(e) => handleFilterChange("store", e.target.value)}
              >
                <option value="">All Stores</option>
                <option value="main">Main Store</option>
                <option value="warehouse">Warehouse</option>
                <option value="online">Online Store</option>
              </select>
            </div>
          </>
        );
      case "products":
        return (
          <>
            <div>
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={selectedFilters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home & Garden</option>
                <option value="books">Books</option>
              </select>
            </div>
            <div>
              <label className="form-label">Stock Status</label>
              <select
                className="form-select"
                value={selectedFilters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="">All Items</option>
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </>
        );
      case "customers":
        return (
          <>
            <div>
              <label className="form-label">Customer Type</label>
              <select
                className="form-select"
                value={selectedFilters.customer}
                onChange={(e) => handleFilterChange("customer", e.target.value)}
              >
                <option value="">All Customers</option>
                <option value="new">New Customers</option>
                <option value="returning">Returning Customers</option>
                <option value="vip">VIP Customers</option>
              </select>
            </div>
            <div>
              <label className="form-label">Region</label>
              <select
                className="form-select"
                value={selectedFilters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="">All Regions</option>
                <option value="north">North</option>
                <option value="south">South</option>
                <option value="east">East</option>
                <option value="west">West</option>
              </select>
            </div>
          </>
        );
      case "inventory":
        return (
          <>
            <div>
              <label className="form-label">Warehouse</label>
              <select
                className="form-select"
                value={selectedFilters.store}
                onChange={(e) => handleFilterChange("store", e.target.value)}
              >
                <option value="">All Warehouses</option>
                <option value="main">Main Warehouse</option>
                <option value="secondary">Secondary Warehouse</option>
                <option value="backup">Backup Storage</option>
              </select>
            </div>
            <div>
              <label className="form-label">Movement Type</label>
              <select
                className="form-select"
                value={selectedFilters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="">All Movements</option>
                <option value="in">Stock In</option>
                <option value="out">Stock Out</option>
                <option value="transfer">Transfer</option>
                <option value="adjustment">Adjustment</option>
              </select>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Date Range Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="form-label flex items-center space-x-2">
            <CalendarIcon className="w-4 h-4" />
            <span>Start Date</span>
          </label>
          <input
            type="date"
            className="form-input"
            value={dateRange.start}
            onChange={(e) => handleDateChange("start", e.target.value)}
          />
        </div>
        <div>
          <label className="form-label flex items-center space-x-2">
            <CalendarIcon className="w-4 h-4" />
            <span>End Date</span>
          </label>
          <input
            type="date"
            className="form-input"
            value={dateRange.end}
            onChange={(e) => handleDateChange("end", e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Quick Select</label>
          <select
            className="form-select"
            onChange={(e) => {
              const days = parseInt(e.target.value);
              if (days) getQuickDateRange(days);
            }}
            value=""
          >
            <option value="">Select Range</option>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>
      </div>

      {/* Report-specific Filters */}
      <div className="border-t pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <FunnelIcon className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">
            Additional Filters
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {renderReportSpecificFilters()}
        </div>
      </div>

      {/* Filter Actions */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center space-x-4">
          <Button variant="secondary" onClick={clearFilters}>
            Clear All Filters
          </Button>
          <span className="text-sm text-gray-500">
            {Object.values(selectedFilters).filter(Boolean).length +
              (dateRange.start ? 1 : 0)}{" "}
            filter(s) applied
          </span>
        </div>
        <Button>Apply Filters</Button>
      </div>
    </div>
  );
};

export default ReportFilters;
