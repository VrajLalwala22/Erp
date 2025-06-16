import React, { useState } from "react";
import { cn } from "../../lib/utils";

interface Store {
  id: string;
  name: string;
  location: string;
  isActive: boolean;
}

interface StoreSwitcherProps {
  stores: Store[];
  currentStore: Store;
  onStoreChange: (store: Store) => void;
}

const StoreSwitcher: React.FC<StoreSwitcherProps> = ({
  stores,
  currentStore,
  onStoreChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleStoreSelect = (store: Store) => {
    onStoreChange(store);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-colors"
      >
        <div className="flex items-center min-w-0">
          <div className="flex-shrink-0 w-8 h-8 bg-[#2563EB] text-white rounded-lg flex items-center justify-center text-sm font-medium">
            {currentStore.name.charAt(0)}
          </div>
          <div className="ml-3 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {currentStore.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {currentStore.location}
            </p>
          </div>
        </div>
        <svg
          className={cn(
            "w-4 h-4 text-gray-400 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 left-0 z-20 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Select Store
              </div>
              {stores.map((store) => (
                <button
                  key={store.id}
                  onClick={() => handleStoreSelect(store)}
                  className={cn(
                    "flex items-center w-full px-3 py-2 text-left rounded-lg transition-colors",
                    store.id === currentStore.id
                      ? "bg-[#2563EB] text-white"
                      : "hover:bg-gray-100 text-gray-900"
                  )}
                >
                  <div
                    className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium",
                      store.id === currentStore.id
                        ? "bg-white text-[#2563EB]"
                        : "bg-[#2563EB] text-white"
                    )}
                  >
                    {store.name.charAt(0)}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center">
                      <p className="text-sm font-medium truncate">
                        {store.name}
                      </p>
                      {store.id === currentStore.id && (
                        <svg
                          className="w-4 h-4 ml-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <p
                      className={cn(
                        "text-xs truncate",
                        store.id === currentStore.id
                          ? "text-blue-100"
                          : "text-gray-500"
                      )}
                    >
                      {store.location}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        store.isActive ? "bg-[#34D399]" : "bg-gray-300"
                      )}
                    />
                  </div>
                </button>
              ))}
            </div>

            <div className="border-t border-gray-200 p-2">
              <button className="flex items-center w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <svg
                  className="w-4 h-4 mr-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add New Store
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StoreSwitcher;
