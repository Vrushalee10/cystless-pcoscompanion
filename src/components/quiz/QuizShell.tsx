import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface QuizShellProps {
  step: number;
  totalSteps?: number;
  children: ReactNode;
  backTo?: string;
  hideProgress?: boolean;
  hideBack?: boolean;
}

const QuizShell = ({
  step,
  totalSteps = 9,
  children,
  backTo,
  hideProgress = false,
  hideBack = false,
}: QuizShellProps) => {
  const navigate = useNavigate();
  const progress = (step / totalSteps) * 100;

  const handleBack = () => {
    if (backTo) navigate(backTo);
    else if (step === 1) navigate("/");
    else navigate(`/quiz/${step - 1}`);
  };

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col px-5">
        {/* Top bar */}
        {!hideBack && (
          <button
            onClick={handleBack}
            className="pt-6 pb-3 self-start"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" style={{ color: "var(--text-muted)" }} />
          </button>
        )}

        {!hideProgress && (
          <div className="mt-1">
            {/* Progress bar */}
            <div className="w-full h-[5px] rounded-full bg-border overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <p
              className="text-right mt-[6px] font-body"
              style={{ fontSize: "12px", color: "var(--text-muted)" }}
            >
              Step {step} of {totalSteps}
            </p>
          </div>
        )}

        {/* Content */}
        <motion.div
          className="flex-1 flex flex-col"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default QuizShell;
