import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileStack, CheckCircle } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      // Store file info in sessionStorage for demo purposes
      const file = files[0];
      sessionStorage.setItem('uploadedFile', JSON.stringify({
        name: file.name,
        size: file.size,
        type: file.type
      }));
      navigate("/upload");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

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

        {/* Main Upload Card */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-12">
            <div 
              className="border-2 border-dashed border-border bg-muted/30 rounded-lg p-16 text-center hover:border-primary/30 transition-colors cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleButtonClick}
            >
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full">
                    <Upload className="h-10 w-10 text-primary" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Upload New RFP
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    AI will use your existing knowledge base to generate responses instantly.
                  </p>
                  
                  <Button 
                    onClick={handleButtonClick}
                    size="lg" 
                    className="px-8"
                  >
                    Choose File to Upload
                  </Button>
                  
                  <p className="text-sm text-muted-foreground">
                    or drag and drop your RFP document here
                  </p>
                </div>
              </div>
            </div>
            
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
            />
          </CardContent>
        </Card>
    </div>
  );
};

export default Dashboard;