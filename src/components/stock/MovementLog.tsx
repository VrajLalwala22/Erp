import React from "react";
import { Package, Plus, Minus, RotateCcw, Calendar, User } from "lucide-react";

interface Movement {
  id: number;
  productName: string;
  type: string;
  quantity: number;
  date: string;
  reference: string;
  user: string;
}

interface MovementLogProps {
  movements: Movement[];
}

const MovementLog: React.FC<MovementLogProps> = ({ movements }) => {
  const getMovementIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <Minus className="w-4 h-4" />;
      case "restock":
        return <Plus className="w-4 h-4" />;
      case "adjustment":
        return <RotateCcw className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getMovementColor = (type: string, quantity: number) => {
    if (type === "sale" || quantity < 0) {
      return "bg-danger/10 text-danger border-danger/20";
    } else if (type === "restock" || quantity > 0) {
      return "bg-success/10 text-success border-success/20";
    } else {
      return "bg-accent/10 text-accent border-accent/20";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMovementTypeLabel = (type: string) => {
    switch (type) {
      case "sale":
        return "Sale";
      case "restock":
        return "Restock";
      case "adjustment":
        return "Adjustment";
      default:
        return "Movement";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-dark flex items-center space-x-2">
          <Package className="w-5 h-5" />
          <span>Recent Movements</span>
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Latest stock changes and transactions
        </p>
      </div>

      <div className="p-6">
        {movements.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No movements recorded yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {movements.map((movement) => (
              <div key={movement.id} className="relative">
                <div className="flex items-start space-x-3">
                  {/* Movement Icon */}
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${getMovementColor(
                      movement.type,
                      movement.quantity
                    )}`}
                  >
                    {getMovementIcon(movement.type)}
                  </div>

                  {/* Movement Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-dark">
                          {movement.productName}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getMovementColor(
                              movement.type,
                              movement.quantity
                            )}`}
                          >
                            {getMovementTypeLabel(movement.type)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {movement.reference}
                          </span>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="text-right">
                        <p
                          className={`text-sm font-bold ${
                            movement.quantity > 0
                              ? "text-success"
                              : "text-danger"
                          }`}
                        >
                          {movement.quantity > 0 ? "+" : ""}
                          {movement.quantity}
                        </p>
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(movement.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{movement.user}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Line */}
                {movements.indexOf(movement) !== movements.length - 1 && (
                  <div className="absolute left-4 top-8 w-px h-6 bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View All Button */}
      {movements.length > 0 && (
        <div className="p-6 border-t border-gray-200">
          <button className="w-full text-sm text-primary hover:text-blue-700 font-medium transition-colors">
            View All Movements
          </button>
        </div>
      )}
    </div>
  );
};

export default MovementLog;
