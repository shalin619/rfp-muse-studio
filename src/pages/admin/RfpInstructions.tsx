import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Plus, Pencil, Trash2, Check, X, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useInstructions } from "@/hooks/useInstructions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const RfpInstructions = () => {
  const navigate = useNavigate();
  const [newInstruction, setNewInstruction] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();
  const { instructions, addInstruction, updateInstruction, deleteInstruction, isLoading } = useInstructions();

  const handleVoiceInput = async () => {
    setIsRecording(true);
    // Mock voice transcription - in production, this would use actual speech-to-text
    setTimeout(() => {
      const mockTranscription = "Emphasize data security and vendor must have BFSI experience with at least 5 years track record.";
      setNewInstruction((prev) => prev + (prev ? " " : "") + mockTranscription);
      setIsRecording(false);
      toast({
        title: "Voice captured",
        description: "Your speech has been transcribed.",
      });
    }, 2000);
  };

  const handleSaveInstruction = async () => {
    if (!newInstruction.trim()) {
      toast({
        title: "Empty instruction",
        description: "Please enter some instruction text.",
        variant: "destructive",
      });
      return;
    }

    await addInstruction(newInstruction);
    setNewInstruction("");
    toast({
      title: "Instruction saved",
      description: "It will be used in the next RFP generation.",
    });
  };

  const handleEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSaveEdit = async (id: string) => {
    if (!editText.trim()) return;
    await updateInstruction(id, editText);
    setEditingId(null);
    toast({
      title: "Instruction updated",
      description: "Changes have been saved.",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteInstruction(deleteId);
    setDeleteId(null);
    toast({
      title: "Instruction deleted",
      description: "The instruction has been removed.",
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">RFP Instructions</h1>
          <Button 
            onClick={() => navigate("/admin")}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
        <p className="text-muted-foreground">
          Provide guidance that the AI will use when generating RFP responses.
        </p>
      </div>

      {/* Input Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Instruction</CardTitle>
          <CardDescription>
            Type or use voice to dictate high-level guidance for RFP responses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Textarea
              placeholder="E.g., Emphasize data security, vendor must have BFSI experience, 6-month timeline…"
              value={newInstruction}
              onChange={(e) => setNewInstruction(e.target.value)}
              className="min-h-[120px] flex-1"
              aria-label="New instruction text"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleVoiceInput}
              disabled={isRecording}
              className="shrink-0"
              aria-label="Start voice input"
            >
              <Mic className={`h-4 w-4 ${isRecording ? 'text-destructive animate-pulse' : ''}`} />
            </Button>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => setNewInstruction("")}
              variant="outline"
              disabled={!newInstruction.trim()}
            >
              Clear
            </Button>
            <Button
              onClick={handleSaveInstruction}
              disabled={!newInstruction.trim() || isLoading}
            >
              <Plus className="h-4 w-4 mr-2" />
              Save Instruction
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Instructions List */}
      <Card>
        <CardHeader>
          <CardTitle>Saved Instructions</CardTitle>
          <CardDescription>
            {instructions.length} instruction{instructions.length !== 1 ? 's' : ''} will be used in RFP generation
          </CardDescription>
        </CardHeader>
        <CardContent>
          {instructions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg mb-2">No instructions yet.</p>
              <p>Add your first one above.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {instructions.map((instruction) => (
                <Card key={instruction.id} className="border-l-4 border-l-primary">
                  <CardContent className="pt-6">
                    {editingId === instruction.id ? (
                      <div className="space-y-3">
                        <Textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="min-h-[80px]"
                          autoFocus
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancelEdit}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleSaveEdit(instruction.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Update
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm mb-3 whitespace-pre-wrap">{instruction.text}</p>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <div>
                            <span className="font-medium">Author:</span> {instruction.author} • 
                            <span className="ml-1">{new Date(instruction.createdAt).toLocaleString()}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(instruction.id, instruction.text)}
                            >
                              <Pencil className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setDeleteId(instruction.id)}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this instruction?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The instruction will no longer be used in RFP generation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RfpInstructions;
