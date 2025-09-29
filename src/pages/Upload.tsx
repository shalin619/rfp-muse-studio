import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload as UploadIcon, FileText, Calendar, Building, FileType, ArrowLeft } from "lucide-react";

const Upload = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-foreground">Upload New RFP</h1>
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => navigate("/")}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Button>
          <Button onClick={() => navigate("/user/processing-options")}>
            Continue to Processing Options
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Side - Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UploadIcon className="h-5 w-5" />
            Upload RFP Document
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Drag & Drop Box */}
          <div className="border-2 border-dashed border-border bg-muted/30 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="flex items-center justify-center w-16 h-16 bg-primary-light rounded-full">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-foreground">
                  Drop your RFP document here
                </p>
                <p className="text-sm text-muted-foreground">
                  PDF, DOC, DOCX up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Upload Complete</span>
              <span className="text-primary font-medium">100%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '100%' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Right Side - Metadata Panel */}
      <Card>
        <CardHeader>
          <CardTitle>RFP Details</CardTitle>
          <p className="text-sm text-muted-foreground">
            AI will analyze and match this RFP with past responses.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="rfp-name" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              RFP Name
            </Label>
            <Input 
              id="rfp-name" 
              placeholder="Auto-extracted from document..."
              value="Digital Banking Modernization Initiative"
              readOnly
              className="bg-muted/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Issuing Organization
            </Label>
            <Input 
              id="organization" 
              placeholder="Auto-extracted from document..."
              value="Central City Municipality"
              readOnly
              className="bg-muted/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Submission Deadline
            </Label>
            <Input 
              id="deadline" 
              type="date" 
              value="2024-02-15"
              readOnly
              className="bg-muted/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file-type" className="flex items-center gap-2">
              <FileType className="h-4 w-4" />
              File Type
            </Label>
            <Input 
              id="file-type" 
              value="PDF Document (2.3 MB)"
              readOnly
              className="bg-muted/50"
            />
          </div>

          <Button 
            onClick={() => navigate("/user/processing-options")}
            className="w-full"
            size="lg"
          >
            Proceed to Processing Options
          </Button>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default Upload;