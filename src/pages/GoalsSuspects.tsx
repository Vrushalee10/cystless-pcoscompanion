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
    emoji: "🔍",
    title: "Understand what's happening in my body",
    description: "You have symptoms but no answers yet. Let's decode them together.",
    goal: "understand",
  },
  {
    emoji: "📅",
    title: "Get my cycle back on track",
    description: "Irregular periods and unpredictable cycles. Let's map what's going on.",
    goal: "cycle",
  },
  {
    emoji: "😮‍💨",
    title: "Reduce my daily symptoms",
    description: "Fatigue, cravings, brain fog. Let's start making these lighter.",
    goal: "symptoms",
  },
  {
    emoji: "🌱",
    title: "Support my fertility journey",
    description: "You're thinking ahead. Let's build the right foundation.",
    goal: "fertility",
  },
  {
    emoji: "💙",
    title: "I just want to feel better",
    description: "That's enough. We'll figure out the rest together.",
    goal: "feel_better",
  },
];

const GoalsSuspects = () => {
  const navigate = useNavigate();
  const { setUserGoal } = useQuiz();
  const [selected, setSelected] = useState<UserGoal>(null);

  const handleContinue = () => {
    if (selected) {
      setUserGoal(selected);
      const flow = selected === "fertility" ? [1,5,2,3,4,6,7,8,9]
        : selected === "symptoms" ? [1,4,2,3,5,6,7,8,9]
        : selected === "weight" ? [1,4,7,2,3,5,6,8,9]
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
            WHAT WOULD HELP?
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
            What would help you most right now?
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
            There are no wrong answers — this shapes everything we build for you.
          </p>

          {/* Goal cards */}
          <div className="flex flex-col gap-3">
            {goals.map((g) => (
              <button
                key={g.goal}
                onClick={() => setSelected(g.goal)}
                className="bg-card text-left transition-all"
                style={{
                  borderRadius: 18,
                  padding: 20,
                  boxShadow: "var(--shadow-card)",
                  borderLeft: selected === g.goal ? "4px solid hsl(var(--primary))" : "4px solid transparent",
                  backgroundColor: selected === g.goal ? "#EAF3F3" : "white",
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
            disabled={!selected}
            onClick={handleContinue}
            className="w-full h-[58px] rounded-[18px] font-body relative flex items-center justify-center transition-colors"
            style={{
              fontSize: 16,
              fontWeight: 600,
              backgroundColor: selected ? "hsl(var(--primary))" : "var(--disabled)",
              color: selected ? "white" : "var(--text-muted)",
            }}
          >
            {selected ? "Let's find my pattern →" : "Select a goal"}
            {selected && <ArrowRight className="absolute right-5 h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalsSuspects;
