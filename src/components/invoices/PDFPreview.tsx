import React from "react";
import { Download, Send, Eye, Printer } from "lucide-react";

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  company: {
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
}

interface PDFPreviewProps {
  invoiceData: InvoiceData;
  onClose: () => void;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ invoiceData, onClose }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Invoice Preview
            </h2>
            <p className="text-sm text-gray-500">
              Preview your invoice before sending
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Eye className="w-4 h-4 mr-2" />
              View Full
            </button>
            <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </button>
            <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Send className="w-4 h-4 mr-2" />
              Send Invoice
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="p-8 bg-white">
          {/* Company Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {invoiceData.company.name}
                </h1>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{invoiceData.company.address}</p>
                  <p>{invoiceData.company.phone}</p>
                  <p>{invoiceData.company.email}</p>
                  <p>{invoiceData.company.website}</p>
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-3xl font-bold text-blue-600 mb-2">
                  INVOICE
                </h2>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Invoice #:</span>{" "}
                    {invoiceData.invoiceNumber}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {formatDate(invoiceData.date)}
                  </p>
                  <p>
                    <span className="font-medium">Due Date:</span>{" "}
                    {formatDate(invoiceData.dueDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Bill To:
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium text-gray-900">
                {invoiceData.customer.name}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {invoiceData.customer.address}
              </p>
              <p className="text-sm text-gray-600">
                {invoiceData.customer.phone}
              </p>
              <p className="text-sm text-gray-600">
                {invoiceData.customer.email}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Description
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                    Qty
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoiceData.items.map((item, index) => (
                  <tr key={index} className="bg-white">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-900">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-gray-900">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                      {formatCurrency(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-80">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(invoiceData.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (10%):</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(invoiceData.tax)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">
                        Total:
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        {formatCurrency(invoiceData.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Payment Terms
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                Payment is due within 30 days of the invoice date. Late payments
                may be subject to a 1.5% monthly service charge. Please include
                the invoice number with your payment.
              </p>
            </div>
          </div>

          {/* Notes */}
          {invoiceData.notes && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Notes
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{invoiceData.notes}</p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 text-center">
            <p className="text-sm text-gray-500">
              Thank you for your business! If you have any questions about this
              invoice, please contact us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sample usage component
const PDFPreviewExample: React.FC = () => {
  const [showPreview, setShowPreview] = React.useState(false);

  const sampleInvoiceData: InvoiceData = {
    invoiceNumber: "INV-2025-001",
    date: "2025-01-15",
    dueDate: "2025-02-15",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street, Suite 100, New York, NY 10001",
    },
    company: {
      name: "Your Company Name",
      address: "456 Business Ave, Suite 200, New York, NY 10002",
      phone: "+1 (555) 987-6543",
      email: "info@yourcompany.com",
      website: "www.yourcompany.com",
    },
    items: [
      {
        name: "Web Development Services",
        quantity: 40,
        price: 75.0,
        total: 3000.0,
      },
      { name: "UI/UX Design", quantity: 20, price: 85.0, total: 1700.0 },
      { name: "Project Management", quantity: 10, price: 95.0, total: 950.0 },
    ],
    subtotal: 5650.0,
    tax: 565.0,
    total: 6215.0,
    notes:
      "Thank you for choosing our services. We appreciate your business and look forward to working with you again.",
  };

  return (
    <div className="p-8">
      <button
        onClick={() => setShowPreview(true)}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        Preview Invoice
      </button>

      {showPreview && (
        <PDFPreview
          invoiceData={sampleInvoiceData}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default PDFPreview;
export { PDFPreviewExample };
