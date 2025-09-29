import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  ToggleLeft
} from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";

const Review = () => {
  const navigate = useNavigate();
  const [trackChanges, setTrackChanges] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [responseContent, setResponseContent] = useState(`<h1>EXECUTIVE SUMMARY</h1>

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
This comprehensive digital banking solution represents a strategic investment in your institution's future, with projected ROI of 180% within three years through increased customer engagement, operational efficiency, and new revenue opportunities.</p>`);

  const comments = [
    {
      id: 1,
      author: "Sarah Johnson",
      role: "SME - Compliance",
      text: "Need to update the SOC compliance details to include our latest certification.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      author: "Mike Chen", 
      role: "SME - Technical",
      text: "The cloud architecture section looks good, but we should mention our disaster recovery capabilities.",
      timestamp: "1 hour ago",
    },
    {
      id: 3,
      author: "Lisa Rodriguez",
      role: "Legal Review",
      text: "Please review the liability clauses in section 4.2.",
      timestamp: "30 minutes ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-foreground">
          Review & Edit Response
        </h1>
        <Button onClick={() => navigate("/user/output")} variant="outline">
          Finalize Response
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Editor */}
        <div className={`space-y-4 ${showComments ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
          {/* Track Changes Control */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="track-changes"
                    checked={trackChanges}
                    onCheckedChange={setTrackChanges}
                  />
                  <Label htmlFor="track-changes" className="flex items-center gap-2">
                    <ToggleLeft className="h-4 w-4" />
                    Track Changes
                  </Label>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowComments(!showComments)}
                >
                  {showComments ? 'Hide Comments' : 'Show Comments'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Rich Text Editor */}
          <RichTextEditor
            value={responseContent}
            onChange={setResponseContent}
            placeholder="Start editing your RFP response..."
            minHeight="600px"
          />
        </div>

        {/* Comments Sidebar */}
        {showComments && (
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Comments & Feedback
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowComments(false)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-l-2 border-primary/20 pl-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {comment.role}
                    </Badge>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                ))}
                
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Add Comment
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button onClick={() => navigate("/user/output")} size="lg">
          Finalize Response
        </Button>
      </div>
    </div>
  );
};

export default Review;