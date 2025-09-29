import React, { useState, useEffect } from "react";
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
import { AlertTriangle, FileText, Users, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DraftResponse = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("full-response");
  const [processingOption, setProcessingOption] = useState("auto-draft");
  const [savedContent, setSavedContent] = useState<{[key: string]: string}>({});

  useEffect(() => {
    const option = sessionStorage.getItem('processingOption') || 'auto-draft';
    setProcessingOption(option);
  }, []);

  // Sample content for different processing options
  const getContentForOption = () => {
    switch (processingOption) {
      case "auto-draft":
        return {
          fullDocument: `EXECUTIVE SUMMARY

Our bank is pleased to submit this comprehensive proposal for the Digital Banking Modernization Initiative. With over 75 years of banking excellence and a proven track record in digital transformation, we are uniquely positioned to deliver the innovative solutions you require.

COMPANY QUALIFICATIONS

Established in 1948, our institution has grown from a community bank to a regional leader with assets exceeding $2.5 billion. We are FDIC-insured and maintain strong regulatory relationships with both state and federal banking authorities.

Key qualifications include:
• 75+ years of banking experience
• $2.5B+ in assets under management
• SOC 2 Type II compliance
• PCI DSS Level 1 certification
• Award-winning digital banking platform

TECHNICAL APPROACH

We propose a cloud-native architecture utilizing microservices and API-first design principles. Our solution leverages AWS infrastructure with multi-region deployment for maximum reliability and performance.

Core technical components:
• Microservices architecture for scalability
• API-first design for seamless integration
• Multi-cloud deployment strategy
• Advanced encryption and security protocols
• Real-time monitoring and analytics

SECURITY & COMPLIANCE FRAMEWORK

Security is paramount in our approach. Our comprehensive framework includes multiple layers of protection and adherence to all applicable regulations.

Security measures include:
• End-to-end encryption
• Multi-factor authentication
• Continuous security monitoring
• Regular penetration testing
• Incident response procedures

IMPLEMENTATION TIMELINE

We propose a phased implementation approach to minimize risk and ensure smooth transition:

Phase 1 (Months 1-3): Requirements gathering and system analysis
Phase 2 (Months 4-8): Core system development and integration
Phase 3 (Months 9-12): Testing, training, and deployment
Phase 4 (Months 13-15): Post-implementation support and optimization`
        };
      
      case "section-wise":
        return {
          sections: [
            {
              id: "executive-summary",
              title: "Executive Summary",
              content: "Our bank is pleased to submit this comprehensive proposal for the Digital Banking Modernization Initiative. With over 75 years of banking excellence and a proven track record in digital transformation, we are uniquely positioned to deliver innovative solutions."
            },
            {
              id: "compliance",
              title: "Compliance & Certifications", 
              content: "We maintain SOC 2 Type II compliance, PCI DSS Level 1 certification, and adhere to all federal banking regulations including BSA/AML requirements. Our institution is FDIC-insured with a strong regulatory track record."
            },
            {
              id: "technical-details",
              title: "Technical Details",
              content: "We propose a cloud-native architecture utilizing microservices and API-first design principles. Our solution leverages AWS infrastructure with multi-region deployment for maximum reliability and performance."
            },
            {
              id: "pricing",
              title: "Pricing Structure",
              content: "Our competitive pricing model includes implementation costs, licensing fees, and ongoing support. We offer flexible payment terms and scalable pricing based on transaction volume and user count."
            }
          ]
        };
      
      case "qa-style":
        return {
          qapairs: [
            {
              id: 1,
              question: "What is your bank's experience with digital banking solutions?",
              answer: "Our bank has over 75 years of banking experience with a proven track record in digital transformation. We have successfully implemented award-winning digital banking platforms and serve customers with assets exceeding $2.5 billion."
            },
            {
              id: 2,
              question: "How do you ensure security and compliance in your solutions?",
              answer: "We maintain comprehensive security frameworks including SOC 2 Type II compliance, PCI DSS Level 1 certification, end-to-end encryption, multi-factor authentication, and continuous security monitoring with regular penetration testing."
            },
            {
              id: 3,
              question: "What is your proposed implementation timeline?",
              answer: "We propose a 4-phase approach: Phase 1 (Months 1-3) - Requirements analysis, Phase 2 (Months 4-8) - Development and integration, Phase 3 (Months 9-12) - Testing and deployment, Phase 4 (Months 13-15) - Support and optimization."
            }
          ]
        };
      
      default:
        return { fullDocument: "Sample content for default processing option." };
    }
  };

  const handleSave = (key: string, content: string) => {
    setSavedContent(prev => ({ ...prev, [key]: content }));
    toast({
      title: "Content Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const renderAutoDraftView = () => {
    const content = getContentForOption();
    const key = "fullDocument";
    
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Generated Full Response</CardTitle>
            <Button 
              onClick={() => handleSave(key, savedContent[key] || content.fullDocument)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={savedContent[key] || content.fullDocument}
            onChange={(e) => setSavedContent(prev => ({ ...prev, [key]: e.target.value }))}
            className="min-h-[600px] text-sm leading-relaxed"
            placeholder="AI-generated full response..."
          />
        </CardContent>
      </Card>
    );
  };

  const renderSectionWiseView = () => {
    const content = getContentForOption();
    
    return (
      <Tabs defaultValue="executive-summary">
        <TabsList className="grid w-full grid-cols-4">
          {content.sections?.map((section) => (
            <TabsTrigger key={section.id} value={section.id} className="text-xs">
              {section.title}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {content.sections?.map((section) => (
          <TabsContent key={section.id} value={section.id} className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{section.title}</CardTitle>
                  <Button 
                    onClick={() => handleSave(section.id, savedContent[section.id] || section.content)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={savedContent[section.id] || section.content}
                  onChange={(e) => setSavedContent(prev => ({ ...prev, [section.id]: e.target.value }))}
                  className="min-h-[300px]"
                  placeholder={`AI-generated content for ${section.title}...`}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    );
  };

  const renderQAStyleView = () => {
    const content = getContentForOption();
    
    return (
      <div className="space-y-6">
        {content.qapairs?.map((qa) => (
          <Card key={qa.id}>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Question */}
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">RFP Question</h4>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">{qa.question}</p>
                  </div>
                </div>
                
                {/* Answer */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">AI-Suggested Answer</h4>
                    <Button 
                      onClick={() => handleSave(`qa-${qa.id}`, savedContent[`qa-${qa.id}`] || qa.answer)}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                  </div>
                  <Textarea
                    value={savedContent[`qa-${qa.id}`] || qa.answer}
                    onChange={(e) => setSavedContent(prev => ({ ...prev, [`qa-${qa.id}`]: e.target.value }))}
                    className="min-h-[120px] text-sm"
                    placeholder="AI-suggested answer..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">
            AI-Generated Draft Response
          </h1>
          <p className="text-muted-foreground mt-1">
            Processing Mode: {processingOption === "auto-draft" ? "Auto Draft Full Response" : 
                            processingOption === "section-wise" ? "Section-wise Drafts" : 
                            "Q&A Style Responses"}
          </p>
        </div>
        <Button onClick={() => navigate("/user/review")} variant="outline">
          Continue to Review
        </Button>
      </div>

      {processingOption === "auto-draft" && renderAutoDraftView()}
      {processingOption === "section-wise" && renderSectionWiseView()}
      {processingOption === "qa-style" && renderQAStyleView()}

      <div className="flex justify-end">
        <Button onClick={() => navigate("/user/review")} size="lg">
          Continue to Review & Edit
        </Button>
      </div>
    </div>
  );
};

export default DraftResponse;