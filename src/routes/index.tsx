import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ErrorBoundary from "../components/shared/ErrorBoundary";
import LoadingSpinner from "../components/shared/LoadingSpinner";

// Lazy load pages for better performance
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Products = React.lazy(() => import("../pages/Products"));
const Invoices = React.lazy(() => import("../pages/Invoices"));
const Customers = React.lazy(() => import("../pages/Customers"));
const Stock = React.lazy(() => import("../pages/Stock"));
const Reports = React.lazy(() => import("../pages/Reports"));
const Settings = React.lazy(() => import("../pages/Settings"));
const NotFound = React.lazy(() => import("../pages/NotFound"));

const LazyLoadWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ErrorBoundary>
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" />
        </div>
      }
    >
      {children}
    </Suspense>
  </ErrorBoundary>
);

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route
        path="/dashboard"
        element={
          <LazyLoadWrapper>
            <Dashboard />
          </LazyLoadWrapper>
        }
      />

      <Route
        path="/products"
        element={
          <LazyLoadWrapper>
            <Products />
          </LazyLoadWrapper>
        }
      />

      <Route
        path="/invoices"
        element={
          <LazyLoadWrapper>
            <Invoices />
          </LazyLoadWrapper>
        }
      />

      <Route
        path="/customers"
        element={
          <LazyLoadWrapper>
            <Customers />
          </LazyLoadWrapper>
        }
      />

      <Route
        path="/stock"
        element={
          <LazyLoadWrapper>
            <Stock />
          </LazyLoadWrapper>
        }
      />

      <Route
        path="/reports"
        element={
          <LazyLoadWrapper>
            <Reports />
          </LazyLoadWrapper>
        }
      />

      <Route
        path="/settings"
        element={
          <LazyLoadWrapper>
            <Settings />
          </LazyLoadWrapper>
        }
      />

      <Route
        path="*"
        element={
          <LazyLoadWrapper>
            <NotFound />
          </LazyLoadWrapper>
        }
      />
    </Routes>
  );
};
