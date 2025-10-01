export interface RfpInstruction {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

interface CreateInstructionDto {
  text: string;
  author: string;
}

interface UpdateInstructionDto {
  text: string;
}

// Mock storage for instructions
let mockInstructions: RfpInstruction[] = [
  {
    id: "1",
    text: "Emphasize data security and compliance with BFSI regulations. All vendors must have at least 5 years of experience in the banking sector.",
    author: "John Doe",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    text: "Timeline for implementation should not exceed 6 months. Include detailed project milestones.",
    author: "Jane Smith",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const rfpInstructionsApi = {
  async getAll(): Promise<RfpInstruction[]> {
    await delay(300); // Simulate network delay
    return [...mockInstructions];
  },

  async create(dto: CreateInstructionDto): Promise<RfpInstruction> {
    await delay(400);
    const newInstruction: RfpInstruction = {
      id: Date.now().toString(),
      text: dto.text,
      author: dto.author,
      createdAt: new Date().toISOString(),
    };
    mockInstructions.unshift(newInstruction);
    return newInstruction;
  },

  async update(id: string, dto: UpdateInstructionDto): Promise<RfpInstruction> {
    await delay(400);
    const index = mockInstructions.findIndex((inst) => inst.id === id);
    if (index === -1) {
      throw new Error("Instruction not found");
    }
    mockInstructions[index] = {
      ...mockInstructions[index],
      text: dto.text,
    };
    return mockInstructions[index];
  },

  async delete(id: string): Promise<void> {
    await delay(300);
    mockInstructions = mockInstructions.filter((inst) => inst.id !== id);
  },

  async transcribe(audioBlob: Blob): Promise<{ text: string }> {
    await delay(1500); // Simulate processing time
    // Mock transcription response
    return {
      text: "Emphasize data security and vendor must have BFSI experience with at least 5 years track record.",
    };
  },
};

// Function to get all instructions for use in RFP generation
export const getInstructionsForRfpGeneration = async (): Promise<string> => {
  const instructions = await rfpInstructionsApi.getAll();
  if (instructions.length === 0) return "";
  
  return "\n\nAdditional Instructions:\n" + 
    instructions.map((inst, idx) => `${idx + 1}. ${inst.text}`).join("\n");
};
