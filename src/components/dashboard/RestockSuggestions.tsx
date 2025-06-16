import React from "react";
import {
  TrendingUp,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

interface RestockSuggestion {
  id: number;
  product: string;
  suggestedQuantity: number;
  estimatedCost: number;
  priority: "high" | "medium" | "low";
}

interface RestockSuggestionsProps {
  suggestions?: RestockSuggestion[];
}

const RestockSuggestions: React.FC<RestockSuggestionsProps> = ({
  suggestions = [],
}) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-danger" />;
      case "medium":
        return <Clock className="h-4 w-4 text-accent" />;
      case "low":
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return <CheckCircle className="h-4 w-4 text-success" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-danger border-red-200";
      case "medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-50 text-success border-green-200";
      default:
        return "bg-green-50 text-success border-green-200";
    }
  };

  const totalCost = suggestions.reduce(
    (sum, item) => sum + item.estimatedCost,
    0
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-dark">
              Restock Suggestions
            </h3>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <DollarSign className="h-4 w-4" />
            <span className="font-medium">
              Total: ${totalCost.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {suggestions.length === 0 ? (
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              No restock suggestions at the moment
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-dark">
                      {suggestion.product}
                    </h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                      <span>
                        Qty:{" "}
                        <span className="font-medium text-dark">
                          {suggestion.suggestedQuantity}
                        </span>
                      </span>
                      <span>
                        Cost:{" "}
                        <span className="font-medium text-dark">
                          ${suggestion.estimatedCost.toLocaleString()}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityBadge(
                        suggestion.priority
                      )}`}
                    >
                      {suggestion.priority.toUpperCase()}
                    </span>
                    {getPriorityIcon(suggestion.priority)}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-1.5 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                    Order Now
                  </button>
                  <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-gray-200">
              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Order All Suggestions
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestockSuggestions;
