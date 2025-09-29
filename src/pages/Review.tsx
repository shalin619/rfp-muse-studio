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
  const [responseContent, setResponseContent] = useState(`EXECUTIVE SUMMARY

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
Phase 4 (Months 13-15): Post-implementation support and optimization`);

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