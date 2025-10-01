import { useState, useEffect } from "react";
import { rfpInstructionsApi, RfpInstruction } from "@/api/rfpInstructions";

export const useInstructions = () => {
  const [instructions, setInstructions] = useState<RfpInstruction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadInstructions();
  }, []);

  const loadInstructions = async () => {
    setIsLoading(true);
    try {
      const data = await rfpInstructionsApi.getAll();
      setInstructions(data);
    } catch (error) {
      console.error("Failed to load instructions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addInstruction = async (text: string) => {
    setIsLoading(true);
    try {
      const newInstruction = await rfpInstructionsApi.create({
        text,
        author: "Current User", // In production, this would come from auth context
      });
      setInstructions((prev) => [newInstruction, ...prev]);
    } catch (error) {
      console.error("Failed to add instruction:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateInstruction = async (id: string, text: string) => {
    setIsLoading(true);
    try {
      const updated = await rfpInstructionsApi.update(id, { text });
      setInstructions((prev) =>
        prev.map((inst) => (inst.id === id ? updated : inst))
      );
    } catch (error) {
      console.error("Failed to update instruction:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteInstruction = async (id: string) => {
    setIsLoading(true);
    try {
      await rfpInstructionsApi.delete(id);
      setInstructions((prev) => prev.filter((inst) => inst.id !== id));
    } catch (error) {
      console.error("Failed to delete instruction:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    instructions,
    isLoading,
    addInstruction,
    updateInstruction,
    deleteInstruction,
    refresh: loadInstructions,
  };
};
