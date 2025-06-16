import React from "react";
import { Eye, Edit, Mail, Phone, MapPin, Calendar } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: string;
  joinDate: string;
}

interface CustomerTableProps {
  customers: Customer[];
  onViewHistory: (customer: Customer) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  onViewHistory,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success/10 text-success";
      case "inactive":
        return "bg-gray-100 text-gray-600";
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-dark">Customer List</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                Customer
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                Contact
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                Orders
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                Total Spent
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                Last Order
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
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-medium">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-dark">{customer.name}</p>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>Joined {formatDate(customer.joinDate)}</span>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="w-3 h-3" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="w-3 h-3" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span
                        className="truncate max-w-32"
                        title={customer.address}
                      >
                        {customer.address}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-6">
                  <span className="text-sm font-medium text-dark">
                    {customer.totalOrders}
                  </span>
                </td>

                <td className="py-4 px-6">
                  <span className="text-sm font-medium text-dark">
                    ${customer.totalSpent.toLocaleString()}
                  </span>
                </td>

                <td className="py-4 px-6">
                  <span className="text-sm text-gray-600">
                    {formatDate(customer.lastOrder)}
                  </span>
                </td>

                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      customer.status
                    )}`}
                  >
                    {customer.status.charAt(0).toUpperCase() +
                      customer.status.slice(1)}
                  </span>
                </td>

                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onViewHistory(customer)}
                      className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="View History"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                      title="Edit Customer"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {customers.length === 0 && (
        <div className="py-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No customers found</p>
        </div>
      )}
    </div>
  );
};

export default CustomerTable;
