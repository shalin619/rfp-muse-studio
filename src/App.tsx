import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainDashboard from "./pages/MainDashboard";
import UserWorkspace from "./pages/user/UserWorkspace";
import Upload from "./pages/Upload";
import ProcessingOptions from "./pages/ProcessingOptions";
import DraftResponse from "./pages/DraftResponse";
import Review from "./pages/Review";
import Output from "./pages/Output";
import NotFound from "./pages/NotFound";
import RfpInstructions from "./pages/admin/RfpInstructions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="/admin/rfp-instructions" element={<RfpInstructions />} />
          <Route path="/user" element={<UserWorkspace />}>
            <Route path="upload" element={<Upload />} />
            <Route path="processing-options" element={<ProcessingOptions />} />
            <Route path="draft-response" element={<DraftResponse />} />
            <Route path="review" element={<Review />} />
            <Route path="output" element={<Output />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
