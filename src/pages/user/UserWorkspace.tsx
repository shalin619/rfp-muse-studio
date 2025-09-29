import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  Settings, 
  FileText, 
  MessageSquare,
  Palette,
  AlignLeft,
  Shield,
  ArrowLeft
} from "lucide-react";
import UserDashboard from "./UserDashboard";

const UserWorkspace = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTone, setSelectedTone] = useState("formal");
  const [selectedLength, setSelectedLength] = useState("balanced");
  const [selectedStyle, setSelectedStyle] = useState("narrative");
  const [complianceEnabled, setComplianceEnabled] = useState(true);

  const isHomePage = location.pathname === "/" || location.pathname === "/user";
  const showSidebar = !isHomePage;

  const handleBackNavigation = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length <= 1) {
      navigate('/');
    } else {
      const parentPath = '/' + pathSegments.slice(0, -1).join('/');
      navigate(parentPath);
    }
  };

  const toneOptions = [
    { id: "formal", label: "Formal", desc: "Professional and structured" },
    { id: "persuasive", label: "Persuasive", desc: "Compelling and engaging" },
    { id: "neutral", label: "Neutral", desc: "Balanced and objective" },
    { id: "client-friendly", label: "Client-friendly", desc: "Warm and approachable" }
  ];

  const lengthOptions = [
    { id: "concise", label: "Concise", desc: "Brief and to the point" },
    { id: "balanced", label: "Balanced", desc: "Moderate detail level" },
    { id: "detailed", label: "Detailed", desc: "Comprehensive coverage" }
  ];

  const styleOptions = [
    { id: "bullets", label: "Bullet Points", desc: "Structured lists" },
    { id: "narrative", label: "Narrative", desc: "Flowing prose" },
    { id: "technical", label: "Technical", desc: "Data-driven format" }
  ];

  if (isHomePage) {
    return <UserDashboard />;
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Left Sidebar - Customization Controls */}
      {showSidebar && (
        <div className="w-80 bg-card border-r border-border p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleBackNavigation}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="font-semibold text-lg">Customization</h2>
            </div>
            
            {/* Tone Selector */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Tone Selector
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {toneOptions.map((tone) => (
                  <Button
                    key={tone.id}
                    variant={selectedTone === tone.id ? "default" : "ghost"}
                    className="w-full justify-start h-auto p-3"
                    onClick={() => setSelectedTone(tone.id)}
                  >
                    <div className="text-left">
                      <div className="font-medium">{tone.label}</div>
                      <div className="text-xs text-muted-foreground">{tone.desc}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Response Length */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlignLeft className="h-4 w-4" />
                  Response Length
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {lengthOptions.map((length) => (
                  <Button
                    key={length.id}
                    variant={selectedLength === length.id ? "default" : "ghost"}
                    className="w-full justify-start h-auto p-3"
                    onClick={() => setSelectedLength(length.id)}
                  >
                    <div className="text-left">
                      <div className="font-medium">{length.label}</div>
                      <div className="text-xs text-muted-foreground">{length.desc}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Style Preferences */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Style Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {styleOptions.map((style) => (
                  <Button
                    key={style.id}
                    variant={selectedStyle === style.id ? "default" : "ghost"}
                    className="w-full justify-start h-auto p-3"
                    onClick={() => setSelectedStyle(style.id)}
                  >
                    <div className="text-left">
                      <div className="font-medium">{style.label}</div>
                      <div className="text-xs text-muted-foreground">{style.desc}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Compliance Toggle */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant={complianceEnabled ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setComplianceEnabled(!complianceEnabled)}
                >
                  {complianceEnabled ? "Compliance Enabled" : "Enable Compliance"}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Include mandatory compliance notes
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Current Settings Summary */}
          <div className="pt-4 border-t">
            <h3 className="font-medium text-sm mb-3">Current Settings</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Tone</span>
                <Badge variant="secondary" className="text-xs">
                  {toneOptions.find(t => t.id === selectedTone)?.label}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Length</span>
                <Badge variant="secondary" className="text-xs">
                  {lengthOptions.find(l => l.id === selectedLength)?.label}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Style</span>
                <Badge variant="secondary" className="text-xs">
                  {styleOptions.find(s => s.id === selectedStyle)?.label}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Compliance</span>
                <Badge variant={complianceEnabled ? "default" : "outline"} className="text-xs">
                  {complianceEnabled ? "On" : "Off"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1">
        <Outlet context={{ selectedTone, selectedLength, selectedStyle, complianceEnabled }} />
      </div>
    </div>
  );
};

export default UserWorkspace;