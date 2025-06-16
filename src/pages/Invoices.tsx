import React, { useState } from "react";
import {
  Plus,
  Filter,
  Download,
  Eye,
  Edit2,
  Trash2,
  FileText,
} from "lucide-react";
import InvoiceTable from "../components/invoices/InvoiceTable";
import InvoiceForm from "../components/invoices/InvoiceForm";
import PDFPreview from "../components/invoices/PDFPreview";

interface Invoice {
  id: number;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: "draft" | "sent" | "paid" | "overdue";
  notes?: string;
}

interface InvoiceItem {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  // Mock data
  React.useEffect(() => {
    const mockInvoices: Invoice[] = [
      {
        id: 1,
        invoiceNumber: "INV-2024-001",
        customerName: "John Doe",
        customerEmail: "john@example.com",
        date: "2024-01-15",
        dueDate: "2024-02-15",
        items: [
          {
            id: 1,
            productName: "iPhone 14 Pro",
            quantity: 2,
            price: 999,
            total: 1998,
          },
          {
            id: 2,
            productName: "AirPods Pro",
            quantity: 1,
            price: 249,
            total: 249,
          },
        ],
        subtotal: 2247,
        tax: 224.7,
        total: 2471.7,
        status: "sent",
        notes: "Thank you for your business!",
      },
      {
        id: 2,
        invoiceNumber: "INV-2024-002",
        customerName: "Jane Smith",
        customerEmail: "jane@example.com",
        date: "2024-01-14",
        dueDate: "2024-02-14",
        items: [
          {
            id: 1,
            productName: "MacBook Air M2",
            quantity: 1,
            price: 1199,
            total: 1199,
          },
        ],
        subtotal: 1199,
        tax: 119.9,
        total: 1318.9,
        status: "paid",
        notes: "",
      },
      {
        id: 3,
        invoiceNumber: "INV-2024-003",
        customerName: "Bob Johnson",
        customerEmail: "bob@example.com",
        date: "2024-01-10",
        dueDate: "2024-01-25",
        items: [
          {
            id: 1,
            productName: "Samsung Galaxy S23",
            quantity: 1,
            price: 799,
            total: 799,
          },
          {
            id: 2,
            productName: "Galaxy Buds Pro",
            quantity: 1,
            price: 199,
            total: 199,
          },
        ],
        subtotal: 998,
        tax: 99.8,
        total: 1097.8,
        status: "overdue",
        notes: "Payment overdue - please remit immediately",
      },
    ];
    setInvoices(mockInvoices);
  }, []);

  const handleCreateInvoice = () => {
    setEditingInvoice(null);
    setShowForm(true);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setShowForm(true);
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowPDF(true);
  };

  const handleDeleteInvoice = (invoiceId: number) => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      setInvoices((prev) => prev.filter((inv) => inv.id !== invoiceId));
    }
  };

  const handleSubmitInvoice = (invoiceData: Omit<Invoice, "id">) => {
    if (editingInvoice) {
      // Update existing invoice
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id === editingInvoice.id
            ? { ...invoiceData, id: editingInvoice.id }
            : inv
        )
      );
    } else {
      // Create new invoice
      const newInvoice: Invoice = {
        ...invoiceData,
        id: Math.max(...invoices.map((i) => i.id), 0) + 1,
      };
      setInvoices((prev) => [newInvoice, ...prev]);
    }
    setShowForm(false);
    setEditingInvoice(null);
  };

  const getStatusStats = () => {
    const stats = invoices.reduce((acc, invoice) => {
      acc[invoice.status] = (acc[invoice.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: invoices.length,
      draft: stats.draft || 0,
      sent: stats.sent || 0,
      paid: stats.paid || 0,
      overdue: stats.overdue || 0,
    };
  };

  const stats = getStatusStats();
  const totalRevenue = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">Invoices</h1>
          <p className="text-gray-600 mt-1">Manage your invoices and billing</p>
        </div>

        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button
            onClick={handleCreateInvoice}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Invoice</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">
              Total Invoices
            </span>
          </div>
          <p className="text-2xl font-bold text-dark mt-2">{stats.total}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span className="text-sm font-medium text-gray-600">Draft</span>
          </div>
          <p className="text-2xl font-bold text-dark mt-2">{stats.draft}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm font-medium text-gray-600">Sent</span>
          </div>
          <p className="text-2xl font-bold text-dark mt-2">{stats.sent}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-sm font-medium text-gray-600">Paid</span>
          </div>
          <p className="text-2xl font-bold text-dark mt-2">{stats.paid}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-danger rounded-full"></div>
            <span className="text-sm font-medium text-gray-600">Overdue</span>
          </div>
          <p className="text-2xl font-bold text-dark mt-2">{stats.overdue}</p>
        </div>
      </div>

      {/* Revenue Card */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-3xl font-bold mt-2">
              ${totalRevenue.toLocaleString()}
            </p>
            <p className="text-blue-100 mt-1">From paid invoices</p>
          </div>
          <div className="h-16 w-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <FileText className="h-8 w-8" />
          </div>
        </div>
      </div>

      {/* Invoice Table */}
      <InvoiceTable
        invoices={invoices}
        onEdit={handleEditInvoice}
        onView={handleViewInvoice}
        onDelete={handleDeleteInvoice}
      />

      {/* Invoice Form Modal */}
      {showForm && (
        <InvoiceForm
          invoice={editingInvoice}
          isOpen={showForm}
          onSubmit={handleSubmitInvoice}
          onCancel={() => {
            setShowForm(false);
            setEditingInvoice(null);
          }}
        />
      )}

      {/* PDF Preview Modal */}
      {showPDF && selectedInvoice && (
        <PDFPreview
          invoice={selectedInvoice}
          isOpen={showPDF}
          onClose={() => {
            setShowPDF(false);
            setSelectedInvoice(null);
          }}
        />
      )}
    </div>
  );
};

export default Invoices;
