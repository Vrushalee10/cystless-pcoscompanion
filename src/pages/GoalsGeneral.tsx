import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useQuiz, UserGoal } from "@/context/QuizContext";

interface GoalOption {
  emoji: string;
  title: string;
  description: string;
  goal: UserGoal;
}

const goals: GoalOption[] = [
  {
    emoji: "💙",
    title: "I was just diagnosed and don't know where to start",
    description: "No overwhelm. We'll take it gently, one step at a time.",
    goal: "new_diagnosis",
  },
  {
    emoji: "🔍",
    title: "I have symptoms but no diagnosis yet",
    description: "Let's map your pattern and help you understand what's going on.",
    goal: "understand",
  },
  {
    emoji: "📅",
    title: "I want to understand my hormones better",
    description: "Curiosity is the best starting point. Let's go deep.",
    goal: "understand",
  },
  {
    emoji: "😮‍💨",
    title: "I want to improve how I feel day to day",
    description: "Practical and real. That's what we do.",
    goal: "symptoms",
  },
];

const GoalsGeneral = () => {
  const navigate = useNavigate();
  const { setUserGoal } = useQuiz();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleContinue = () => {
    if (selectedIndex !== null) {
      const goal = goals[selectedIndex].goal;
      setUserGoal(goal);
      const flow = goal === "fertility" ? [1,6,2,3,4,5,7,8,9]
        : goal === "symptoms" ? [1,4,2,3,5,6,7,8,9]
        : goal === "weight" ? [1,4,8,2,3,5,6,7,9]
        : [1,2,3,4,5,6,7,8,9];
      navigate(`/quiz/${flow[1]}`);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col px-5 pb-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <p
            className="font-display"
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: 1.8,
              color: "hsl(var(--primary))",
              fontWeight: 700,
              marginTop: 32,
            }}
          >
            WHY ARE YOU HERE?
          </p>
          <h1
            className="font-display"
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#111111",
              lineHeight: 1.2,
              marginTop: 10,
            }}
          >
            What brought you to Cystless today?
          </h1>
          <div
            style={{
              width: 48,
              height: 4,
              backgroundColor: "hsl(var(--accent))",
              borderRadius: 2,
              marginTop: 12,
            }}
          />
          <p
            className="font-body"
            style={{
              fontSize: 14,
              color: "#6B7280",
              lineHeight: 1.6,
              marginTop: 12,
              marginBottom: 24,
            }}
          >
            This helps us personalise everything from day one.
          </p>

          {/* Goal cards */}
          <div className="flex flex-col gap-3">
            {goals.map((g, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className="bg-card text-left transition-all"
                style={{
                  borderRadius: 18,
                  padding: 20,
                  boxShadow: "var(--shadow-card)",
                  borderLeft: selectedIndex === idx ? "4px solid hsl(var(--primary))" : "4px solid transparent",
                  backgroundColor: selectedIndex === idx ? "#EAF3F3" : "white",
                }}
              >
                <div className="flex items-start gap-3">
                  <span style={{ fontSize: 24 }}>{g.emoji}</span>
                  <div>
                    <p
                      className="font-display"
                      style={{ fontSize: 16, fontWeight: 600, color: "var(--text-ink)" }}
                    >
                      {g.title}
                    </p>
                    <p
                      className="font-body"
                      style={{ fontSize: 14, color: "var(--text-body)", marginTop: 4, lineHeight: 1.5 }}
                    >
                      {g.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Sticky button */}
        <div className="mt-auto pt-6">
          <button
            disabled={selectedIndex === null}
            onClick={handleContinue}
            className="w-full h-[58px] rounded-[18px] font-body relative flex items-center justify-center transition-colors"
            style={{
              fontSize: 16,
              fontWeight: 600,
              backgroundColor: selectedIndex !== null ? "hsl(var(--primary))" : "var(--disabled)",
              color: selectedIndex !== null ? "white" : "var(--text-muted)",
            }}
          >
            {selectedIndex !== null ? "Let's get started →" : "Select a goal"}
            {selectedIndex !== null && <ArrowRight className="absolute right-5 h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalsGeneral;
