import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "@/context/QuizContext";
import Index from "./pages/Index";
import QuizScreen1 from "./pages/QuizScreen1";
import QuizScreen2 from "./pages/QuizScreen2";
import QuizScreen3 from "./pages/QuizScreen3";
import QuizScreen4 from "./pages/QuizScreen4";
import QuizScreen5 from "./pages/QuizScreen5";
import QuizScreen6 from "./pages/QuizScreen6";
import QuizScreen7 from "./pages/QuizScreen7";
import QuizScreen8 from "./pages/QuizScreen8";
import QuizScreen9 from "./pages/QuizScreen9";
import QuizEmpathy from "./pages/QuizEmpathy";
import Loading from "./pages/Loading";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <QuizProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quiz/1" element={<QuizScreen1 />} />
            <Route path="/quiz/2" element={<QuizScreen2 />} />
            <Route path="/quiz/3" element={<QuizScreen3 />} />
            <Route path="/quiz/4" element={<QuizScreen4 />} />
            <Route path="/quiz/5" element={<QuizScreen5 />} />
            <Route path="/quiz/empathy" element={<QuizEmpathy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QuizProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
