import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users } from "lucide-react";
import AdminDashboard from "./admin/AdminDashboard";
import UserWorkspace from "./user/UserWorkspace";
import AdminLoginModal from "@/components/AdminLoginModal";
import bankLogo from "@/assets/bank-logo.png";

const MainDashboard = () => {
  const [activeTab, setActiveTab] = useState("user");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-full items-center gap-4">
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
      
      <div className="mx-auto max-w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b border-border bg-card/50">
            <div className="mx-auto max-w-full px-6">
              <TabsList className="grid w-fit grid-cols-2 bg-transparent p-0 h-auto">
                <TabsTrigger 
                  value="admin" 
                  className="flex items-center gap-2 px-6 py-3 text-base font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  onClick={(e) => {
                    if (!isAdminAuthenticated) {
                      e.preventDefault();
                      setShowAdminLogin(true);
                    }
                  }}
                >
                  <Shield className="h-5 w-5" />
                  Admin Control
                </TabsTrigger>
                <TabsTrigger 
                  value="user" 
                  className="flex items-center gap-2 px-6 py-3 text-base font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  <Users className="h-5 w-5" />
                  RFP Processing
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <TabsContent value="admin" className="mt-0">
            {isAdminAuthenticated ? <AdminDashboard /> : <div className="p-6 text-center">Please authenticate to access admin controls.</div>}
          </TabsContent>
          
          <TabsContent value="user" className="mt-0">
            <UserWorkspace />
          </TabsContent>
        </Tabs>

        <AdminLoginModal
          isOpen={showAdminLogin}
          onClose={() => setShowAdminLogin(false)}
          onSuccess={() => {
            setIsAdminAuthenticated(true);
            setActiveTab("admin");
          }}
        />
      </div>
    </div>
  );
};

export default MainDashboard;