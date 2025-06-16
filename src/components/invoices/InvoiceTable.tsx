import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  Filter,
  Eye,
  Edit2,
  Download,
  Plus,
  MoreVertical,
} from "lucide-react";

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  items: number;
}

interface InvoiceTableProps {
  onCreateInvoice?: () => void;
  onViewInvoice?: (invoice: Invoice) => void;
  onEditInvoice?: (invoice: Invoice) => void;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  onCreateInvoice,
  onViewInvoice,
  onEditInvoice,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<keyof Invoice>("issueDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { data: invoices, isLoading } = useQuery({
    queryKey: ["invoices", searchTerm, statusFilter, sortBy, sortOrder],
    queryFn: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockInvoices: Invoice[] = [
        {
          id: "1",
          invoiceNumber: "INV-2024-001",
          customerName: "John Doe",
          customerEmail: "john@example.com",
          issueDate: "2024-06-01",
          dueDate: "2024-06-15",
          amount: 2500.0,
          status: "paid",
          items: 5,
        },
        {
          id: "2",
          invoiceNumber: "INV-2024-002",
          customerName: "Jane Smith",
          customerEmail: "jane@example.com",
          issueDate: "2024-06-05",
          dueDate: "2024-06-19",
          amount: 1800.5,
          status: "sent",
          items: 3,
        },
        {
          id: "3",
          invoiceNumber: "INV-2024-003",
          customerName: "Mike Johnson",
          customerEmail: "mike@example.com",
          issueDate: "2024-05-28",
          dueDate: "2024-06-11",
          amount: 3200.75,
          status: "overdue",
          items: 8,
        },
        {
          id: "4",
          invoiceNumber: "INV-2024-004",
          customerName: "Sarah Wilson",
          customerEmail: "sarah@example.com",
          issueDate: "2024-06-10",
          dueDate: "2024-06-24",
          amount: 950.0,
          status: "draft",
          items: 2,
        },
        {
          id: "5",
          invoiceNumber: "INV-2024-005",
          customerName: "David Brown",
          customerEmail: "david@example.com",
          issueDate: "2024-06-12",
          dueDate: "2024-06-26",
          amount: 4100.25,
          status: "sent",
          items: 12,
        },
      ];

      let filtered = mockInvoices;

      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(
          (invoice) =>
            invoice.invoiceNumber
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            invoice.customerName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            invoice.customerEmail
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        );
      }

      // Apply status filter
      if (statusFilter !== "all") {
        filtered = filtered.filter(
          (invoice) => invoice.status === statusFilter
        );
      }

      // Apply sorting
      filtered.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortOrder === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });

      return filtered;
    },
  });

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "bg-success/10 text-success border-success/20";
      case "sent":
        return "bg-primary/10 text-primary border-primary/20";
      case "overdue":
        return "bg-danger/10 text-danger border-danger/20";
      case "draft":
        return "bg-gray-100 text-gray-600 border-gray-200";
      case "cancelled":
        return "bg-gray-100 text-gray-500 border-gray-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSort = (column: keyof Invoice) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded w-full"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-lg font-semibold text-dark">Invoices</h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage and track your invoices
            </p>
          </div>

          <button
            onClick={onCreateInvoice}
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mt-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("invoiceNumber")}
              >
                Invoice Number
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("customerName")}
              >
                Customer
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("issueDate")}
              >
                Issue Date
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("dueDate")}
              >
                Due Date
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("amount")}
              >
                Amount
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("status")}
              >
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices?.map((invoice) => (
              <tr
                key={invoice.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-dark">
                    {invoice.invoiceNumber}
                  </div>
                  <div className="text-sm text-gray-500">
                    {invoice.items} items
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-dark">
                    {invoice.customerName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {invoice.customerEmail}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(invoice.issueDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(invoice.dueDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-semibold text-dark">
                    {formatCurrency(invoice.amount)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                      invoice.status
                    )}`}
                  >
                    {invoice.status.charAt(0).toUpperCase() +
                      invoice.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onViewInvoice?.(invoice)}
                      className="p-1 text-gray-400 hover:text-primary transition-colors"
                      title="View Invoice"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEditInvoice?.(invoice)}
                      className="p-1 text-gray-400 hover:text-accent transition-colors"
                      title="Edit Invoice"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-gray-400 hover:text-success transition-colors"
                      title="Download PDF"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      title="More Actions"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {invoices?.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No invoices found
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Get started by creating your first invoice."}
          </p>
          {!searchTerm && statusFilter === "all" && (
            <button
              onClick={onCreateInvoice}
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </button>
          )}
        </div>
      )}

      {/* Pagination could be added here */}
    </div>
  );
};

export default InvoiceTable;
