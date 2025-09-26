import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Mail, 
  CheckCircle, 
  FileText, 
  Users, 
  Calendar
} from "lucide-react";

const Output = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-16 h-16 bg-success-light rounded-full">
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
            <Button variant="outline" size="lg" className="h-16 flex-col gap-2">
              <Download className="h-5 w-5" />
              <div className="text-center">
                <div className="font-medium">Download as Word</div>
                <div className="text-xs text-muted-foreground">Editable DOCX format</div>
              </div>
            </Button>
            
            <Button variant="outline" size="lg" className="h-16 flex-col gap-2">
              <Download className="h-5 w-5" />
              <div className="text-center">
                <div className="font-medium">Download as PDF</div>
                <div className="text-xs text-muted-foreground">Print-ready format</div>
              </div>
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
          <div className="space-y-2">
            <label className="text-sm font-medium">Send to:</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select recipient or enter email" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="procurement@centralcity.gov">
                  procurement@centralcity.gov (Primary Contact)
                </SelectItem>
                <SelectItem value="tech.review@centralcity.gov">
                  tech.review@centralcity.gov (Technical Review)
                </SelectItem>
                <SelectItem value="legal@centralcity.gov">
                  legal@centralcity.gov (Legal Review)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button className="w-full" size="lg">
            <Mail className="h-4 w-4 mr-2" />
            Send Response
          </Button>
        </CardContent>
      </Card>

      {/* Success Notice */}
      <Card className="border-success/20 bg-success-light">
        <CardContent className="flex items-center gap-3 p-6">
          <CheckCircle className="h-6 w-6 text-success flex-shrink-0" />
          <div className="space-y-1">
            <p className="font-medium text-success-foreground">
              Response Added to Knowledge Base
            </p>
            <p className="text-sm text-success-foreground/80">
              This response has been automatically added to your knowledge base for future learning and improved RFP responses.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate("/review")}
        >
          Back to Review
        </Button>
        <Button 
          onClick={() => navigate("/")}
        >
          Start New RFP
        </Button>
      </div>
    </div>
  );
};

export default Output;