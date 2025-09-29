import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Download, 
  Mail, 
  CheckCircle, 
  FileText, 
  Users, 
  Calendar,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Output = () => {
  const navigate = useNavigate();
  const [emailRecipient, setEmailRecipient] = useState("");
  const [emailSubject, setEmailSubject] = useState("RFP Response - [Company Name]");
  const [emailMessage, setEmailMessage] = useState("Please find attached our comprehensive response to your RFP.");
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const { toast } = useToast();

  const handleDownload = (format: 'word' | 'pdf') => {
    // Create a blob with sample content for demo
    const content = "RFP Response - Digital Banking Modernization Initiative\n\nThis is a sample RFP response document...";
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RFP_Response.${format === 'word' ? 'docx' : 'pdf'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: `Your RFP response is being downloaded as ${format.toUpperCase()}.`,
    });
  };

  const handleSendEmail = () => {
    if (!emailRecipient.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter a recipient email address.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send the email
    toast({
      title: "Email Sent",
      description: `RFP response has been sent to ${emailRecipient}`,
    });
    setEmailRecipient("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-foreground">
          Finalize & Submit Response
        </h1>
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
          <Badge variant="secondary" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Ready to Submit
          </Badge>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-16 h-16 bg-success/10 rounded-full">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-foreground">
            Your Response is Ready
          </h1>
          <p className="text-muted-foreground">
            The RFP response has been generated and is ready for submission.
          </p>
        </div>

        {/* Response Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Response Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Document Length</p>
                  <p className="text-xs text-muted-foreground">15 pages, 3,247 words</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Sections Completed</p>
                  <p className="text-xs text-muted-foreground">4 of 4 sections</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Time Saved</p>
                  <p className="text-xs text-muted-foreground">~85% vs manual</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Download Options */}
        <Card>
          <CardHeader>
            <CardTitle>Download Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                size="lg" 
                className="flex items-center gap-2"
                onClick={() => handleDownload('word')}
              >
                <Download className="h-5 w-5" />
                Download as Word
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="flex items-center gap-2"
                onClick={() => handleDownload('pdf')}
              >
                <Download className="h-5 w-5" />
                Download as PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Email Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Send via Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Recipient Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="recipient@organization.com"
                  value={emailRecipient}
                  onChange={(e) => setEmailRecipient(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full flex items-center gap-2"
                onClick={handleSendEmail}
              >
                <Mail className="h-5 w-5" />
                Send via Email
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Success Notice */}
        <Card className="border-success/20 bg-success/5">
          <CardContent className="flex items-center gap-3 p-6">
            <CheckCircle className="h-6 w-6 text-success flex-shrink-0" />
            <div className="space-y-1">
              <p className="font-medium text-foreground">
                Response Added to Knowledge Base
              </p>
              <p className="text-sm text-muted-foreground">
                This response has been automatically added to your knowledge base for future learning and improved RFP responses.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate("/user/review")}
          >
            Back to Review
          </Button>
          <Button 
            onClick={() => navigate("/user")}
          >
            Start New RFP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Output;