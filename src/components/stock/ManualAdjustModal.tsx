import React, { useState } from "react";
import { X, Package, Plus, Minus, Save } from "lucide-react";

interface ManualAdjustModalProps {
  product: any;
  onClose: () => void;
  onSave: (adjustmentData: any) => void;
}

const ManualAdjustModal: React.FC<ManualAdjustModalProps> = ({
  product,
  onClose,
  onSave,
}) => {
  const [adjustmentType, setAdjustmentType] = useState<
    "increase" | "decrease" | "set"
  >("increase");
  const [quantity, setQuantity] = useState<string>("");
  const [reason, setReason] = useState("");
  const [reference, setReference] = useState("");

  const getNewStock = () => {
    const qty = parseInt(quantity) || 0;
    switch (adjustmentType) {
      case "increase":
        return product.currentStock + qty;
      case "decrease":
        return Math.max(0, product.currentStock - qty);
      case "set":
        return qty;
      default:
        return product.currentStock;
    }
  };

  const handleSave = () => {
    if (!quantity || parseInt(quantity) < 0) {
      return;
    }

    const adjustmentData = {
      productId: product.id,
      type: adjustmentType,
      quantity: parseInt(quantity),
      reason,
      reference,
      newStock: getNewStock(),
      oldStock: product.currentStock,
    };

    onSave(adjustmentData);
  };

  const isValid = quantity && parseInt(quantity) > 0 && reason.trim();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-dark">Adjust Stock</h2>
              <p className="text-sm text-gray-600">{product.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Current Stock Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Stock</p>
                <p className="text-lg font-bold text-dark">
                  {product.currentStock} units
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">SKU</p>
                <p className="text-sm font-medium text-dark">{product.sku}</p>
              </div>
            </div>
          </div>

          {/* Adjustment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adjustment Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setAdjustmentType("increase")}
                className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-colors ${
                  adjustmentType === "increase"
                    ? "border-success bg-success/10 text-success"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add</span>
              </button>

              <button
                type="button"
                onClick={() => setAdjustmentType("decrease")}
                className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-colors ${
                  adjustmentType === "decrease"
                    ? "border-danger bg-danger/10 text-danger"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <Minus className="w-4 h-4" />
                <span className="text-sm font-medium">Remove</span>
              </button>

              <button
                type="button"
                onClick={() => setAdjustmentType("set")}
                className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-colors ${
                  adjustmentType === "set"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <Package className="w-4 h-4" />
                <span className="text-sm font-medium">Set To</span>
              </button>
            </div>
          </div>

          {/* Quantity Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {adjustmentType === "set" ? "New Stock Level" : "Quantity"}
            </label>
            <input
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={
                adjustmentType === "set"
                  ? "Enter new stock level"
                  : "Enter quantity"
              }
            />
          </div>

          {/* Preview */}
          {quantity && (
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Preview</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {product.currentStock} → {getNewStock()} units
                </span>
                <span
                  className={`text-sm font-medium ${
                    getNewStock() > product.currentStock
                      ? "text-success"
                      : getNewStock() < product.currentStock
                      ? "text-danger"
                      : "text-gray-600"
                  }`}
                >
                  {getNewStock() > product.currentStock ? "+" : ""}
                  {getNewStock() - product.currentStock} units
                </span>
              </div>
            </div>
          )}

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason <span className="text-danger">*</span>
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select reason...</option>
              <option value="damaged">Damaged goods</option>
              <option value="expired">Expired products</option>
              <option value="theft">Theft/Loss</option>
              <option value="recount">Physical recount</option>
              <option value="correction">Data correction</option>
              <option value="transfer">Store transfer</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Reference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reference (Optional)
            </label>
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Reference number or note"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              isValid
                ? "bg-primary text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Save Adjustment</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualAdjustModal;
