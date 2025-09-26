import React from "react";
import { Outlet } from "react-router-dom";
import bankLogo from "@/assets/bank-logo.png";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center gap-4">
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