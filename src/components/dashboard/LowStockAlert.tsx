import React from "react";
import { AlertTriangle, Package } from "lucide-react";

interface LowStockItem {
  id: number;
  name: string;
  currentStock: number;
  minStock: number;
  category: string;
}

interface LowStockAlertProps {
  items?: LowStockItem[];
}

const LowStockAlert: React.FC<LowStockAlertProps> = ({ items = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-fit">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-danger" />
          <h3 className="text-lg font-semibold text-dark">Low Stock Alert</h3>
        </div>
      </div>

      <div className="p-6">
        {items.length === 0 ? (
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">All items are well stocked!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => {
              const stockPercentage = (item.currentStock / item.minStock) * 100;
              const isUrgent = stockPercentage < 50;

              return (
                <div
                  key={item.id}
                  className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-dark text-sm">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        isUrgent
                          ? "bg-red-50 text-danger"
                          : "bg-yellow-50 text-accent"
                      }`}
                    >
                      {isUrgent ? "Urgent" : "Low"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Stock:{" "}
                      <span className="font-medium text-dark">
                        {item.currentStock}
                      </span>
                    </span>
                    <span className="text-gray-600">
                      Min:{" "}
                      <span className="font-medium text-dark">
                        {item.minStock}
                      </span>
                    </span>
                  </div>

                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          isUrgent ? "bg-danger" : "bg-accent"
                        }`}
                        style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}

            <button className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Restock All Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LowStockAlert;
