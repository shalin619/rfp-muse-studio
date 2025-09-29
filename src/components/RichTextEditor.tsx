import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bold, 
  Italic, 
  Underline,
  List, 
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignJustify,
  Undo,
  Redo,
  Save,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  minHeight?: string;
}

const RichTextEditor = ({ 
  value, 
  onChange, 
  className = "", 
  placeholder = "Start typing...",
  minHeight = "600px"
}: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleSave = useCallback(() => {
    setLastSaved(new Date());
    toast({
      title: "Content Saved",
      description: "Your changes have been saved successfully.",
    });
  }, [toast]);

  const handleUndo = useCallback(() => {
    execCommand('undo');
  }, [execCommand]);

  const handleRedo = useCallback(() => {
    execCommand('redo');
  }, [execCommand]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const toolbarButtons = [
    { icon: Bold, command: 'bold', tooltip: 'Bold (Ctrl+B)' },
    { icon: Italic, command: 'italic', tooltip: 'Italic (Ctrl+I)' },
    { icon: Underline, command: 'underline', tooltip: 'Underline (Ctrl+U)' },
    { icon: List, command: 'insertUnorderedList', tooltip: 'Bullet List' },
    { icon: ListOrdered, command: 'insertOrderedList', tooltip: 'Numbered List' },
    { icon: AlignLeft, command: 'justifyLeft', tooltip: 'Align Left' },
    { icon: AlignCenter, command: 'justifyCenter', tooltip: 'Align Center' },
    { icon: AlignJustify, command: 'justifyFull', tooltip: 'Justify' },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Toolbar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Formatting Tools */}
              <div className="flex items-center gap-1 border-r border-border pr-4">
                {toolbarButtons.map(({ icon: Icon, command, tooltip }) => (
                  <Button
                    key={command}
                    variant="ghost"
                    size="sm"
                    onClick={() => execCommand(command)}
                    title={tooltip}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
              
              {/* History Controls */}
              <div className="flex items-center gap-1 border-r border-border pr-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleUndo}
                  title="Undo (Ctrl+Z)"
                >
                  <Undo className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRedo}
                  title="Redo (Ctrl+Y)"
                >
                  <Redo className="h-4 w-4" />
                </Button>
              </div>

              {/* Save Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save
              </Button>
            </div>

            {/* Auto-save indicator */}
            <Badge variant="secondary" className="flex items-center gap-2">
              <FileText className="h-3 w-3" />
              {lastSaved ? `Saved ${lastSaved.toLocaleTimeString()}` : 'Unsaved changes'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Editor */}
      <Card>
        <CardContent className="p-0">
          <div
            ref={editorRef}
            contentEditable
            className={`p-6 min-h-[${minHeight}] border-0 resize-none focus:outline-none text-sm leading-relaxed prose prose-sm max-w-none`}
            style={{ minHeight }}
            onInput={handleInput}
            dangerouslySetInnerHTML={{ __html: value }}
            data-placeholder={placeholder}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RichTextEditor;