import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FileText, Layers, MessageSquare } from "lucide-react";

const ProcessingOptions = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("auto-draft");

  const handleProcessRFP = () => {
    // Store selected processing option for the draft response page
    sessionStorage.setItem('processingOption', selectedOption);
    navigate("/user/draft-response");
  };

  const processingOptions = [
    {
      id: "auto-draft",
      title: "Auto Draft Full Response",
      description: "AI generates a complete response based on past RFPs and best practices.",
      icon: FileText,
    },
    {
      id: "section-wise",
      title: "Generate Section-wise Drafts",
      description: "Break down the RFP into sections and generate targeted responses for each.",
      icon: Layers,
    },
    {
      id: "qa-style",
      title: "Suggest Best-fit Responses (Q&A style)",
      description: "AI suggests answers for each question based on similar past responses.",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-semibold text-foreground">
          Choose How You'd Like to Process This RFP
        </h1>
        <p className="text-muted-foreground">
          Select the best approach for generating your response.
        </p>
      </div>

      <RadioGroup
        value={selectedOption}
        onValueChange={setSelectedOption}
        className="space-y-4"
      >
        {processingOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedOption === option.id
                  ? "ring-2 ring-primary bg-primary-light"
                  : "hover:bg-accent/50"
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <RadioGroupItem
                    value={option.id}
                    id={option.id}
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <Label
                        htmlFor={option.id}
                        className="text-lg font-medium cursor-pointer"
                      >
                        {option.title}
                      </Label>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </RadioGroup>

      <div className="flex justify-center pt-4">
        <Button
          onClick={handleProcessRFP}
          size="lg"
          className="px-12"
        >
          Process RFP
        </Button>
      </div>
    </div>
  );
};

export default ProcessingOptions;