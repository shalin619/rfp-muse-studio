import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, 
  Database, 
  FileText, 
  Settings, 
  TrendingUp, 
  Users, 
  AlertCircle,
  Download,
  Eye,
  Edit,
  Search,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import RFPReferenceModal from "@/components/RFPReferenceModal";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showRFPReference, setShowRFPReference] = useState(false);
  const [selectedTone, setSelectedTone] = useState("formal");
  const [showDisclaimerEditor, setShowDisclaimerEditor] = useState(false);
  const [disclaimerText, setDisclaimerText] = useState("This response is generated using AI assistance and should be reviewed for accuracy and compliance before submission.");
  const [viewingResponse, setViewingResponse] = useState<any>(null);
  const { toast } = useToast();

  const handleBulkUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.doc,.docx,.txt';
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        setIsUploading(true);
        setUploadProgress(0);
        
        // Simulate upload progress
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              setIsUploading(false);
              toast({
                title: "Upload Complete",
                description: `${files.length} files successfully added to knowledge base`,
              });
              return 100;
            }
            return prev + 10;
          });
        }, 200);
      }
    };
    input.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setIsUploading(true);
      setUploadProgress(0);
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            toast({
              title: "Upload Complete",
              description: `${files.length} files successfully added to knowledge base`,
            });
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const generatedResponses = [
    { id: 1, title: "Treasury Management RFP - ABC Corp", uploader: "John Smith", date: "2024-01-15", status: "finalized" },
    { id: 2, title: "Corporate Banking Services - XYZ Ltd", uploader: "Sarah Johnson", date: "2024-01-14", status: "draft" },
    { id: 3, title: "Trade Finance Solutions RFP", uploader: "Mike Wilson", date: "2024-01-13", status: "submitted" },
    { id: 4, title: "Cash Management Platform RFP", uploader: "Lisa Brown", date: "2024-01-12", status: "draft" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'finalized': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleToneSelect = (tone: string) => {
    setSelectedTone(tone);
    toast({
      title: "Tone Updated",
      description: `Default tone set to ${tone}`,
    });
  };

  const handleViewResponse = (response: any) => {
    setViewingResponse(response);
    toast({
      title: "Opening Response",
      description: `Viewing ${response.title}`,
    });
  };

  const handleAuditResponse = (response: any) => {
    toast({
      title: "Audit Initiated",
      description: `Starting audit for ${response.title}`,
    });
  };

  const handleExportResponse = (response: any) => {
    toast({
      title: "Export Started",
      description: `Exporting ${response.title} as PDF`,
    });
    // Simulate download
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '#';
      link.download = `${response.title.replace(/\s+/g, '_')}.pdf`;
      link.click();
    }, 1000);
  };

  const handleSaveDisclaimer = () => {
    setShowDisclaimerEditor(false);
    toast({
      title: "Disclaimer Updated",
      description: "Compliance disclaimer has been saved",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-foreground">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => navigate("/admin/rfp-instructions")}
            variant="default"
            size="sm"
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            RFP Instructions
          </Button>
          <Button 
            onClick={() => navigate("/")}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <Badge variant="secondary">Control & Oversight</Badge>
        </div>
      </div>

      <div className="min-h-screen bg-muted/30">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Knowledge Base Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">
                +23 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">RFP Categories</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">
                Across all departments
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Responses Generated</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">
                Across departments
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bulk Upload Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Historical RFPs & Documents
              </CardTitle>
              <Button 
                variant="outline"
                onClick={() => setShowRFPReference(true)}
                className="flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                See Reference RFPs Uploaded
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleBulkUpload}
            >
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Drag and drop files here</p>
              <p className="text-muted-foreground mb-4">or click to browse and select multiple files</p>
              <Button>Select Files</Button>
            </div>
            
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading documents...</span>
                  <span className="font-medium">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Generated Responses History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generated Responses History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {generatedResponses.map((response) => (
                <div key={response.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-medium">{response.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span>By {response.uploader}</span>
                      <span>•</span>
                      <span>{response.date}</span>
                      <Badge className={getStatusColor(response.status)}>
                        {response.status}
                      </Badge>
                    </div>
                  </div>
                   <div className="flex items-center gap-2">
                     <Button 
                       variant="outline" 
                       size="sm"
                       onClick={() => handleViewResponse(response)}
                     >
                       <Eye className="h-4 w-4 mr-1" />
                       View
                     </Button>
                     <Button 
                       variant="outline" 
                       size="sm"
                       onClick={() => handleAuditResponse(response)}
                     >
                       <Edit className="h-4 w-4 mr-1" />
                       Audit
                     </Button>
                     <Button 
                       variant="outline" 
                       size="sm"
                       onClick={() => handleExportResponse(response)}
                     >
                       <Download className="h-4 w-4 mr-1" />
                       Export
                     </Button>
                   </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings & Compliance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Settings & Compliance Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-4">
                 <h3 className="font-medium">Default Tone Settings</h3>
                 <div className="space-y-2">
                   <Button 
                     variant={selectedTone === "formal" ? "default" : "outline"} 
                     className="w-full justify-start"
                     onClick={() => handleToneSelect("formal")}
                   >
                     Formal {selectedTone === "formal" && "(Selected)"}
                   </Button>
                   <Button 
                     variant={selectedTone === "persuasive" ? "default" : "ghost"} 
                     className="w-full justify-start"
                     onClick={() => handleToneSelect("persuasive")}
                   >
                     Persuasive {selectedTone === "persuasive" && "(Selected)"}
                   </Button>
                   <Button 
                     variant={selectedTone === "technical" ? "default" : "ghost"} 
                     className="w-full justify-start"
                     onClick={() => handleToneSelect("technical")}
                   >
                     Technical {selectedTone === "technical" && "(Selected)"}
                   </Button>
                 </div>
               </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Compliance & Disclaimers</h3>
                <div className="p-3 border rounded-lg bg-muted/50">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Mandatory Disclaimer</p>
                      <p className="text-muted-foreground">
                        Auto-attached to all responses
                      </p>
                    </div>
                  </div>
                </div>
                 <Button 
                   variant="outline" 
                   className="w-full"
                   onClick={() => setShowDisclaimerEditor(true)}
                 >
                   Edit Disclaimers
                 </Button>
              </div>
            </div>
          </CardContent>
        </Card>

          <RFPReferenceModal
            isOpen={showRFPReference}
            onClose={() => setShowRFPReference(false)}
          />

          {/* Disclaimer Editor Modal */}
          <Dialog open={showDisclaimerEditor} onOpenChange={setShowDisclaimerEditor}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Compliance Disclaimer</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  value={disclaimerText}
                  onChange={(e) => setDisclaimerText(e.target.value)}
                  rows={6}
                  placeholder="Enter your compliance disclaimer text..."
                  className="w-full"
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowDisclaimerEditor(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveDisclaimer}>
                    Save Disclaimer
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Response Viewer Modal */}
          {viewingResponse && (
            <Dialog open={!!viewingResponse} onOpenChange={() => setViewingResponse(null)}>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{viewingResponse.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Uploaded by {viewingResponse.uploader}</span>
                    <span>•</span>
                    <span>{viewingResponse.date}</span>
                    <Badge className={getStatusColor(viewingResponse.status)}>
                      {viewingResponse.status}
                    </Badge>
                  </div>
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <p className="text-sm">
                      This is a preview of the generated RFP response. The actual response content would be displayed here with full formatting and all sections included.
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => setViewingResponse(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;