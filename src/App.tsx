
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

const queryClient = new QueryClient();

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
              <Route path="/" element={<Index />} />
              <Route path="/pos" element={<POSPage />} />
              <Route path="/barcode" element={<BarcodePage />} />
              <Route path="/login" element={<LoginPage />} />
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
