import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Sidebar from "../src/components/shared/Sidebar";
import Navbar from "../src/components/shared/Navbar";
import Dashboard from "../src/pages/Dashboard";
import Products from "../src/pages/Products";
import Invoices from "../src/pages/Invoices";
import Customers from "../src/pages/Customers";
import Stock from "../src/pages/Stock";
import Reports from "../src/pages/Reports";
import Settings from "../src/pages/Settings";
import NotFound from "../src/pages/NotFound";
import ErrorBoundary from "../src/components/shared/ErrorBoundary";
import { useUserStore } from "../src/store/user";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  const { user, isLoading, sidebarCollapsed } = useUserStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Router>
          <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />

            <div
              className={`flex-1 flex flex-col transition-all duration-300 ${
                sidebarCollapsed ? "ml-16" : "ml-64"
              }`}
            >
              <Navbar />

              <main className="flex-1 overflow-auto p-6 bg-background">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/stock" element={<Stock />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#ffffff",
                color: "#0F172A",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              },
            }}
          />
        </Router>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
