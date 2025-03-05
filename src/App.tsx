import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { AuthProvider } from "./context/AuthContext";
import { CRMProvider } from "./context/CRMContext"; // Added CRMProvider import
import PrivateRoute from "./components/auth/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Index from "./pages/Index";
import Leads from "./pages/Leads";
import LeadManagement from "./pages/LeadManagement";
import Manufacturers from "./pages/Manufacturers";
import Orders from "./pages/Orders";
import Performance from "./pages/Performance";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Documents from "./pages/Documents"; //Import Documents page


const queryClient = new QueryClient();

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <CRMProvider> {/* Added CRMProvider */}
              <Routes>
                <Route path="/auth/*" element={<Auth />} />

                <Route element={<PrivateRoute />}>
                  <Route
                    path="/*"
                    element={
                      <div className="flex min-h-screen flex-col">
                        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                        <div className="flex flex-1">
                          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                          <main className="flex-1 pt-16">
                            <Routes>
                              <Route path="/" element={<Index />} />
                              <Route path="/leads" element={<Leads />} />
                              <Route path="/lead-management" element={<LeadManagement />} />
                              <Route path="/manufacturers" element={<Manufacturers />} />
                              <Route path="/orders" element={<Orders />} />
                              <Route path="/documents" element={<Documents />} /> {/* Added Documents Route */}
                              <Route path="/performance" element={<Performance />} />
                              <Route path="/settings" element={<Settings />} />
                              <Route path="*" element={<NotFound />} />
                            </Routes>
                          </main>
                        </div>
                      </div>
                    }
                  />
                </Route>
              </Routes>
            </CRMProvider> {/* Added CRMProvider closing tag */}
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;