import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { AlertTriangle, FileText, Users } from "lucide-react";

const DraftResponse = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("full-response");

  const rfpSections = [
    {
      id: "company-info",
      title: "Company Information & Qualifications",
      status: "complete",
      content: "Our bank has been serving the community for over 75 years with a proven track record in digital banking solutions. We are a FDIC-insured institution with assets exceeding $2.5 billion...",
    },
    {
      id: "technical-approach",
      title: "Technical Approach & Architecture",
      status: "needs-review",
      content: "We propose a cloud-native architecture utilizing microservices and API-first design principles. Our solution leverages AWS infrastructure with multi-region deployment...",
    },
    {
      id: "security-compliance",
      title: "Security & Compliance Framework",
      status: "sme-input",
      content: "Our comprehensive security framework includes SOC 2 Type II compliance, PCI DSS Level 1 certification, and adheres to all federal banking regulations...",
    },
    {
      id: "implementation",
      title: "Implementation Timeline & Methodology",
      status: "complete",
      content: "Phase 1 (Months 1-3): Requirements gathering and system analysis. Phase 2 (Months 4-8): Core system development and integration...",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
        return <Badge className="bg-success/10 text-success border-success/20">Complete</Badge>;
      case "needs-review":
        return <Badge variant="secondary">Needs Review</Badge>;
      case "sme-input":
        return (
          <Badge className="bg-warning-light text-warning border-warning/20">
            <AlertTriangle className="w-3 h-3 mr-1" />
            SME Input Required
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-foreground">
          AI-Generated Draft Response
        </h1>
        <Button onClick={() => navigate("/review")} variant="outline">
          Save & Continue to Review
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="full-response" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Full Response
          </TabsTrigger>
          <TabsTrigger value="sectional" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Sectional View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="full-response" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel - RFP Questions */}
            <Card>
              <CardHeader>
                <CardTitle>RFP Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {rfpSections.map((section, index) => (
                    <AccordionItem key={section.id} value={section.id}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center justify-between w-full pr-4">
                          <span>{section.title}</span>
                          {getStatusBadge(section.status)}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">
                          Section {index + 1} requirements and specifications...
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Right Panel - AI Responses */}
            <Card>
              <CardHeader>
                <CardTitle>Generated Responses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {rfpSections.map((section) => (
                  <div key={section.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{section.title}</h4>
                      {getStatusBadge(section.status)}
                    </div>
                    <Textarea
                      value={section.content}
                      className="min-h-[120px] text-sm"
                      placeholder="AI-generated response..."
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sectional" className="space-y-6">
          <div className="space-y-6">
            {rfpSections.map((section) => (
              <Card key={section.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    {getStatusBadge(section.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={section.content}
                    className="min-h-[200px]"
                    placeholder="AI-generated response for this section..."
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={() => navigate("/review")} size="lg">
          Save & Continue to Review
        </Button>
      </div>
    </div>
  );
};

export default DraftResponse;