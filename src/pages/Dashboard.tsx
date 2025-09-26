import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileStack, CheckCircle } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Status Banner */}
      <Card className="border-success/20 bg-success-light">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-full">
            <FileStack className="h-5 w-5 text-success" />
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <span className="text-sm font-medium text-foreground">
              Knowledge base of 2,500+ past RFPs already available.
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Main Upload Area */}
      <div className="flex justify-center">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-12 text-center">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="flex items-center justify-center w-20 h-20 bg-primary-light rounded-full">
                  <Upload className="h-10 w-10 text-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">
                  Upload New RFP
                </h2>
                <p className="text-muted-foreground">
                  AI will use your existing knowledge base to generate responses instantly.
                </p>
              </div>

              {/* Drag & Drop Area */}
              <div className="border-2 border-dashed border-border bg-muted/30 rounded-lg p-8 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="space-y-3">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      Drag and drop your RFP files here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      or click to browse files
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => navigate("/upload")}
                className="w-full"
                size="lg"
              >
                Upload New RFP
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;