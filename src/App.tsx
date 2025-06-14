import React from "react";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import POSPage from "./pages/POS";
import BarcodePage from "./pages/Barcode";
import LoginPage from "./pages/Login";
import NotFound from "./pages/NotFound";
import { AppNav } from "@/components/AppNav";
import AuthPage from "./pages/Auth";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [hasSession, setHasSession] = React.useState<null | boolean>(null);
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setHasSession(!!data.session);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(!!session);
    });
    return () => data.subscription.unsubscribe();
  }, []);
  if (hasSession === null) return <div className="min-h-screen w-full bg-green-100 flex items-center justify-center text-2xl">Loading...</div>;
  if (!hasSession) {
    window.location.replace("/auth");
    return null;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen w-full flex flex-col bg-background">
          <AppNav />
          <div className="flex-1">
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pos"
                element={
                  <ProtectedRoute>
                    <POSPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/barcode"
                element={
                  <ProtectedRoute>
                    <BarcodePage />
                  </ProtectedRoute>
                }
              />
              {/* <Route path="/login" element={<LoginPage />} /> */}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
