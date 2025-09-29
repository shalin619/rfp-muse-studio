import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, 
  Download, 
  Eye, 
  Search,
  Calendar,
  User
} from "lucide-react";

interface RFPReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RFPReferenceModal = ({ isOpen, onClose }: RFPReferenceModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const referenceRFPs = [
    {
      id: 1,
      fileName: "Treasury_Management_RFP_2024.pdf",
      uploader: "Sarah Johnson",
      uploadDate: "2024-01-15",
      category: "Treasury Services",
      size: "2.3 MB",
      status: "active"
    },
    {
      id: 2,
      fileName: "Corporate_Banking_Solutions.docx", 
      uploader: "Mike Chen",
      uploadDate: "2024-01-14",
      category: "Corporate Banking",
      size: "1.8 MB",
      status: "active"
    },
    {
      id: 3,
      fileName: "Digital_Banking_Platform_RFP.pdf",
      uploader: "Lisa Rodriguez",
      uploadDate: "2024-01-13",
      category: "Digital Banking",
      size: "3.1 MB",
      status: "active"
    },
    {
      id: 4,
      fileName: "Trade_Finance_Requirements.pdf",
      uploader: "John Smith",
      uploadDate: "2024-01-12",
      category: "Trade Finance",
      size: "2.7 MB",
      status: "active"
    },
    {
      id: 5,
      fileName: "Cash_Management_Platform.docx",
      uploader: "Emma Wilson",
      uploadDate: "2024-01-11",
      category: "Cash Management",
      size: "1.5 MB",
      status: "archived"
    },
    {
      id: 6,
      fileName: "Compliance_Framework_RFP.pdf",
      uploader: "David Brown",
      uploadDate: "2024-01-10",
      category: "Compliance",
      size: "4.2 MB",
      status: "active"
    }
  ];

  const filteredRFPs = referenceRFPs.filter(rfp =>
    rfp.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rfp.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rfp.uploader.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const handleDownload = (fileName: string) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Reference RFPs Uploaded ({referenceRFPs.length} total)
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by file name, category, or uploader..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* RFP List */}
          <ScrollArea className="h-[400px] w-full border rounded-lg p-4">
            <div className="space-y-3">
              {filteredRFPs.map((rfp) => (
                <div
                  key={rfp.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{rfp.fileName}</span>
                      <Badge className={getStatusColor(rfp.status)}>
                        {rfp.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground ml-7">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {rfp.uploader}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {rfp.uploadDate}
                      </div>
                      <span>•</span>
                      <span>{rfp.category}</span>
                      <span>•</span>
                      <span>{rfp.size}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownload(rfp.fileName)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex justify-end pt-4">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RFPReferenceModal;