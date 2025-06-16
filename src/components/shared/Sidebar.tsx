import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FileText,
  Users,
  Warehouse,
  BarChart3,
  Settings,
  ChevronLeft,
  Store,
} from "lucide-react";
import { useUserStore } from "../../store/user";
import StoreSwitcher from "./StoreSwitcher";

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Package, label: "Products", path: "/products" },
  { icon: FileText, label: "Invoices", path: "/invoices" },
  { icon: Users, label: "Customers", path: "/customers" },
  { icon: Warehouse, label: "Stock", path: "/stock" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar, currentStore } = useUserStore();

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-dark border-r border-gray-800 transition-all duration-300 z-30 ${
        sidebarCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!sidebarCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-white font-bold text-lg">ERP System</h1>
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft
            className={`w-5 h-5 transition-transform ${
              sidebarCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Store Switcher */}
      {!sidebarCollapsed && currentStore && (
        <div className="p-4 border-b border-gray-800">
          <StoreSwitcher
            stores={[
              {
                id: currentStore.id,
                name: currentStore.name,
                location: "",
                isActive: true,
              },
            ]}
            currentStore={{
              id: currentStore.id,
              name: currentStore.name,
              location: "",
              isActive: true,
            }}
            onStoreChange={() => {}}
          />
        </div>
      )}

      {/* Navigation */}
      <nav className="mt-4 px-3">
        {navigationItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;

          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center px-3 py-2.5 mb-1 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-primary text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${sidebarCollapsed ? "mx-auto" : "mr-3"}`}
              />

              {!sidebarCollapsed && (
                <span className="font-medium">{label}</span>
              )}

              {/* Tooltip for collapsed state */}
              {sidebarCollapsed && (
                <div className="absolute left-16 bg-dark border border-gray-700 px-2 py-1 rounded-md text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!sidebarCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className="text-xs text-gray-500 text-center">
            Store: {currentStore?.name || "Main Store"}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
