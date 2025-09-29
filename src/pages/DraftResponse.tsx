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
import { AlertTriangle, FileText, Users, Save, ArrowLeft, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import RichTextEditor from "@/components/RichTextEditor";

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
          fullDocument: `<h1>EXECUTIVE SUMMARY</h1>

<p>First National Bank is pleased to submit this comprehensive proposal for your Digital Banking Transformation Initiative. As a federally chartered institution with over 75 years of banking excellence and $2.5 billion in assets under management, we bring proven expertise in delivering secure, scalable financial technology solutions that meet the evolving needs of modern banking customers.</p>

<p>Our proposal outlines a comprehensive digital banking platform that will position your institution at the forefront of financial innovation while maintaining the highest standards of security, compliance, and customer service that define banking excellence.</p>

<h2>COMPANY QUALIFICATIONS</h2>

<p><strong>Institutional Overview:</strong><br>
First National Bank, established in 1948, has evolved from a community-focused institution to a regional banking leader serving over 150,000 customers across multiple states. Our institution maintains:</p>

<ul>
<li>FDIC insurance and strong regulatory standing with OCC and Federal Reserve</li>
<li>$2.5 billion in total assets under management</li>
<li>75+ years of continuous banking operations</li>
<li>Award-winning digital banking platform with 98.5% uptime</li>
<li>ISO 27001 and SOC 2 Type II certified operations</li>
</ul>

<p><strong>Digital Banking Expertise:</strong><br>
Our technology team has successfully implemented digital transformation projects for over 50 financial institutions, including:</p>

<ul>
<li>Mobile-first banking applications with biometric authentication</li>
<li>Real-time payment processing systems</li>
<li>Advanced fraud detection and prevention platforms</li>
<li>Regulatory reporting and compliance management systems</li>
</ul>

<h2>TECHNICAL APPROACH</h2>

<p><strong>Architecture Foundation:</strong><br>
We propose a modern, cloud-native architecture built on microservices principles to ensure scalability, reliability, and future adaptability:</p>

<ul>
<li><strong>Cloud Infrastructure:</strong> Multi-region AWS deployment with automatic failover</li>
<li><strong>Microservices Design:</strong> Independently scalable services for account management, payments, and customer communications</li>
<li><strong>API-First Integration:</strong> RESTful and GraphQL APIs enabling seamless third-party integrations</li>
<li><strong>Real-Time Processing:</strong> Event-driven architecture supporting instant transaction processing</li>
<li><strong>Mobile Optimization:</strong> Progressive Web App (PWA) technology ensuring consistent experience across devices</li>
</ul>

<p><strong>Core Banking Integration:</strong><br>
Our solution seamlessly integrates with existing core banking systems including FIS, Fiserv, and Jack Henry platforms, ensuring minimal disruption to current operations while maximizing new functionality.</p>

<h2>SECURITY AND COMPLIANCE FRAMEWORK</h2>

<p><strong>Multi-Layered Security Architecture:</strong></p>

<ul>
<li><strong>Data Protection:</strong> AES-256 encryption at rest and TLS 1.3 for data in transit</li>
<li><strong>Authentication:</strong> Multi-factor authentication with biometric verification options</li>
<li><strong>Network Security:</strong> Web Application Firewall (WAF) and DDoS protection</li>
<li><strong>Monitoring:</strong> 24/7 Security Operations Center (SOC) with AI-powered threat detection</li>
<li><strong>Access Controls:</strong> Role-based permissions with principle of least privilege</li>
</ul>

<p><strong>Regulatory Compliance:</strong><br>
Our platform ensures full compliance with banking regulations including:</p>

<ul>
<li>FFIEC IT Examination Handbook guidelines</li>
<li>PCI DSS Level 1 certification</li>
<li>GLBA privacy and safeguarding requirements</li>
<li>BSA/AML monitoring and reporting capabilities</li>
<li>WCAG 2.1 AA accessibility standards</li>
</ul>

<h2>IMPLEMENTATION TIMELINE</h2>

<p><strong>Phase 1: Discovery and Planning (Months 1-2)</strong></p>
<ul>
<li>Comprehensive requirements analysis and system assessment</li>
<li>Integration planning with existing core banking systems</li>
<li>Security assessment and compliance gap analysis</li>
<li>Project team establishment and stakeholder alignment</li>
</ul>

<p><strong>Phase 2: Development and Configuration (Months 3-6)</strong></p>
<ul>
<li>Core platform development and customization</li>
<li>API integration with existing banking systems</li>
<li>Security implementation and testing</li>
<li>User interface development and branding customization</li>
</ul>

<p><strong>Phase 3: Testing and Training (Months 7-8)</strong></p>
<ul>
<li>Comprehensive system testing including security penetration testing</li>
<li>User acceptance testing with key stakeholders</li>
<li>Staff training programs for administrators and customer service teams</li>
<li>Regulatory review and approval processes</li>
</ul>

<p><strong>Phase 4: Deployment and Support (Months 9-12)</strong></p>
<ul>
<li>Phased rollout to minimize operational disruption</li>
<li>Customer migration and onboarding support</li>
<li>Post-implementation monitoring and optimization</li>
<li>Ongoing support and maintenance services</li>
</ul>

<p><strong>Investment and Value Proposition:</strong><br>
This comprehensive digital banking solution represents a strategic investment in your institution's future, with projected ROI of 180% within three years through increased customer engagement, operational efficiency, and new revenue opportunities.</p>`
        };
      
      case "section-wise":
        return {
          sections: [
            {
              id: "executive-summary",
              title: "Executive Summary",
              content: "First National Bank is pleased to submit this comprehensive proposal for your Digital Banking Transformation Initiative. As a federally chartered institution with over 75 years of banking excellence and $2.5 billion in assets under management, we bring proven expertise in delivering secure, scalable financial technology solutions. Our proposal outlines a comprehensive digital banking platform that will position your institution at the forefront of financial innovation while maintaining the highest standards of security, compliance, and customer service."
            },
            {
              id: "compliance",
              title: "Security & Compliance Framework", 
              content: "Our multi-layered security architecture includes AES-256 encryption at rest, TLS 1.3 for data in transit, multi-factor authentication with biometric verification, 24/7 SOC monitoring with AI-powered threat detection, and role-based access controls. We ensure full compliance with FFIEC IT Examination Handbook guidelines, PCI DSS Level 1 certification, GLBA privacy requirements, BSA/AML monitoring capabilities, and WCAG 2.1 AA accessibility standards. Our platform is ISO 27001 and SOC 2 Type II certified with continuous compliance monitoring."
            },
            {
              id: "technical-details",
              title: "Technical Approach & Architecture",
              content: "We propose a modern, cloud-native architecture built on microservices principles using multi-region AWS deployment with automatic failover. Our solution features independently scalable services for account management, payments, and customer communications, RESTful and GraphQL APIs for seamless third-party integrations, event-driven architecture supporting instant transaction processing, and Progressive Web App (PWA) technology ensuring consistent cross-device experience. Core banking integration supports FIS, Fiserv, and Jack Henry platforms with minimal operational disruption."
            },
            {
              id: "pricing",
              title: "Investment & Implementation Timeline",
              content: "Our 4-phase implementation approach includes: Phase 1 (Months 1-2) - Discovery and planning with comprehensive requirements analysis; Phase 2 (Months 3-6) - Development and configuration with core platform customization; Phase 3 (Months 7-8) - Testing and training with security penetration testing; Phase 4 (Months 9-12) - Deployment and support with phased rollout. This strategic investment delivers projected ROI of 180% within three years through increased customer engagement, operational efficiency, and new revenue opportunities."
            }
          ]
        };
      
      case "qa-style":
        return {
          qapairs: [
            {
              id: 1,
              question: "Describe your institution's experience and qualifications in providing digital banking solutions, including years of operation, asset size, and relevant certifications.",
              answer: "First National Bank brings 75+ years of continuous banking operations since our establishment in 1948, evolving from a community-focused institution to a regional banking leader with $2.5 billion in total assets under management. We serve over 150,000 customers across multiple states and maintain FDIC insurance with strong regulatory standing with the OCC and Federal Reserve. Our digital expertise includes ISO 27001 and SOC 2 Type II certifications, successful implementation of digital transformation projects for over 50 financial institutions, and an award-winning digital banking platform with 98.5% uptime. Our technology team has delivered mobile-first banking applications with biometric authentication, real-time payment processing systems, advanced fraud detection platforms, and regulatory reporting systems."
            },
            {
              id: 2,
              question: "Detail your security framework and compliance approach, including specific measures for data protection, regulatory adherence, and risk management.",
              answer: "Our comprehensive multi-layered security architecture ensures the highest level of protection with AES-256 encryption at rest and TLS 1.3 for data in transit, multi-factor authentication with biometric verification options, Web Application Firewall (WAF) and DDoS protection, 24/7 Security Operations Center (SOC) with AI-powered threat detection, and role-based permissions following the principle of least privilege. We maintain full regulatory compliance with FFIEC IT Examination Handbook guidelines, PCI DSS Level 1 certification, GLBA privacy and safeguarding requirements, BSA/AML monitoring and reporting capabilities, and WCAG 2.1 AA accessibility standards. Our platform undergoes continuous compliance monitoring, regular penetration testing, and maintains comprehensive incident response procedures."
            },
            {
              id: 3,
              question: "Provide a detailed technical approach including architecture design, integration capabilities, and scalability considerations for the proposed digital banking solution.",
              answer: "We propose a modern, cloud-native architecture built on microservices principles to ensure scalability, reliability, and future adaptability. Our technical foundation includes multi-region AWS deployment with automatic failover capabilities, independently scalable microservices for account management, payments, and customer communications, RESTful and GraphQL APIs enabling seamless third-party integrations, event-driven architecture supporting instant transaction processing, and Progressive Web App (PWA) technology ensuring consistent cross-device experience. Our solution seamlessly integrates with existing core banking systems including FIS, Fiserv, and Jack Henry platforms, minimizing disruption to current operations while maximizing new functionality. The architecture supports real-time processing, advanced analytics, and can scale to accommodate future growth and evolving banking requirements."
            },
            {
              id: 4,
              question: "Outline your implementation methodology, timeline, project phases, and post-implementation support strategy.",
              answer: "Our proven 4-phase implementation methodology minimizes risk and ensures smooth transition: Phase 1 (Months 1-2) includes comprehensive requirements analysis and system assessment, integration planning with existing core banking systems, security assessment and compliance gap analysis, and project team establishment with stakeholder alignment. Phase 2 (Months 3-6) covers core platform development and customization, API integration with existing banking systems, security implementation and testing, and user interface development with branding customization. Phase 3 (Months 7-8) involves comprehensive system testing including security penetration testing, user acceptance testing with key stakeholders, staff training programs for administrators and customer service teams, and regulatory review and approval processes. Phase 4 (Months 9-12) includes phased rollout to minimize operational disruption, customer migration and onboarding support, post-implementation monitoring and optimization, and ongoing support and maintenance services with 24/7 technical assistance."
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
      <RichTextEditor
        value={savedContent[key] || content.fullDocument}
        onChange={(value) => setSavedContent(prev => ({ ...prev, [key]: value }))}
        placeholder="AI-generated full response..."
        minHeight="600px"
      />
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
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RichTextEditor
                  value={savedContent[section.id] || `<h2>${section.title}</h2>\n\n<p>${section.content}</p>`}
                  onChange={(value) => setSavedContent(prev => ({ ...prev, [section.id]: value }))}
                  placeholder={`Edit content for ${section.title}...`}
                  minHeight="400px"
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
              <div className="space-y-6">
                {/* Question */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <h4 className="font-medium text-foreground">RFP Question #{qa.id}</h4>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground font-medium">{qa.question}</p>
                  </div>
                </div>
                
                {/* Answer Editor */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h4 className="font-medium text-foreground">AI-Suggested Answer</h4>
                  </div>
                  <RichTextEditor
                    value={savedContent[`qa-${qa.id}`] || `<p>${qa.answer}</p>`}
                    onChange={(value) => setSavedContent(prev => ({ ...prev, [`qa-${qa.id}`]: value }))}
                    placeholder="Edit your answer here..."
                    minHeight="200px"
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
          <Button onClick={() => navigate("/user/review")} variant="outline">
            Continue to Review
          </Button>
        </div>
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