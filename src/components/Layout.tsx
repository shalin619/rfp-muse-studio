import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import bankLogo from "@/assets/bank-logo.png";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const showBackButton = location.pathname !== "/";
  
  const getBackPath = () => {
    switch (location.pathname) {
      case "/upload": return "/";
      case "/processing-options": return "/upload";
      case "/draft-response": return "/processing-options";
      case "/review": return "/draft-response";  
      case "/output": return "/review";
      default: return "/";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center gap-4">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate(getBackPath())}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          )}
          <img 
            src={bankLogo} 
            alt="Bank Logo" 
            className="h-8"
          />
          <h1 className="text-2xl font-semibold text-foreground">
            Bank RFP Automation Agent
          </h1>
        </div>
      </header>
      
      <main className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;