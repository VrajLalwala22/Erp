import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <span className="text-primary text-4xl font-bold">404</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. The page might
            have been moved, deleted, or the URL might be incorrect.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => window.history.back()}
              variant="secondary"
              className="flex items-center justify-center space-x-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Go Back</span>
            </Button>
            <Link to="/dashboard">
              <Button className="flex items-center justify-center space-x-2 w-full sm:w-auto">
                <HomeIcon className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Button>
            </Link>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>
              Need help?{" "}
              <Link to="/settings" className="text-primary hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
