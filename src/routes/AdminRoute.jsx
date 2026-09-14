import React from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ShieldAlert, RefreshCw, ArrowLeft, LogOut, Lock } from "lucide-react";
import { Button } from "../components/ui/Button";

export const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin, logout } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-md text-center max-w-sm w-full space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center mx-auto animate-pulse">
            <Lock size={24} className="text-amber-700" />
          </div>
          <div>
            <h3 className="text-base font-bold font-serif-heading text-gray-900">Sugar Executive Gateway</h3>
            <p className="text-xs text-gray-500 mt-1">Verifying encrypted security credentials...</p>
          </div>
          <div className="flex justify-center pt-2">
            <RefreshCw className="animate-spin text-amber-700" size={20} />
          </div>
        </div>
      </div>
    );
  }

  // Not signed in at all -> redirect to storefront and open sign-in modal
  if (!user) {
    return <Navigate to="/" state={{ openLogin: true }} replace />;
  }

  // Signed in, but not an admin -> Access Denied Screen (Clean & Professional)
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-lg text-center max-w-md w-full space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center mx-auto">
            <ShieldAlert size={28} />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold font-serif-heading text-gray-900">
              Access Restricted
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              This area is restricted to authorized salon management. You are currently signed in as <span className="font-semibold text-gray-900">{user.email}</span>.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={async () => {
                await logout();
              }}
            >
              <LogOut size={15} className="mr-1.5" /> Sign In with Authorized Account
            </Button>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={15} /> Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // User is signed in and is an authorized admin
  return children;
};
