import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const QuizEmpathy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col px-5">
        {/* Centre content */}
        <motion.div
          className="flex-1 flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="font-display"
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "var(--text-ink)",
              lineHeight: 1.2,
            }}
          >
            You don't need a diagnosis to start.
          </h1>
          <p
            className="font-body mt-4"
            style={{
              fontSize: "16px",
              color: "var(--text-body)",
              lineHeight: 1.65,
            }}
          >
            Many women discover their PCOS pattern through symptoms before any
            test confirms it.
            <br /><br />
            Your body is already giving you signals. We're here to help you read
            them.
          </p>
        </motion.div>

        {/* Bottom button */}
        <div className="pb-9">
          <button
            onClick={() => navigate("/quiz/2")}
            className="w-full h-[58px] rounded-[18px] font-body relative flex items-center justify-center"
            style={{
              fontSize: "16px",
              fontWeight: 600,
              backgroundColor: "hsl(var(--primary))",
              color: "white",
              boxShadow: "var(--shadow-hero)",
            }}
          >
            I'm ready
            <ArrowRight className="absolute right-5 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizEmpathy;
