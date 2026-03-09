import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useQuiz, UserGoal } from "@/context/QuizContext";

interface GoalOption {
  emoji: string;
  title: string;
  description: string;
  goal: UserGoal;
}

const goals: GoalOption[] = [
  { emoji: "🩺", title: "Manage my symptoms day to day", description: "Cravings, fatigue, acne, bloating. Let's reduce what's getting in the way.", goal: "symptoms" },
  { emoji: "🔄", title: "Regulate my cycle", description: "Irregular or missing periods. Let's work on restoring your rhythm.", goal: "cycle" },
  { emoji: "🌱", title: "Improve my fertility", description: "Supporting ovulation and hormonal balance when you're ready.", goal: "fertility" },
  { emoji: "⚡", title: "Lose weight sustainably", description: "Not calorie counting. Fixing the insulin resistance that makes it hard.", goal: "weight" },
  { emoji: "🧠", title: "Understand my body better", description: "You want the science. Know Your Cyst-em was built for you.", goal: "understand" },
];

const GoalsUpdate = () => {
  const navigate = useNavigate();
  const { userGoal, setUserGoal } = useQuiz();
  const [selected, setSelected] = useState<UserGoal>(userGoal);

  const handleSave = () => {
    if (selected) {
      setUserGoal(selected);
      navigate("/settings");
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col px-5 pb-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between" style={{ marginTop: 24 }}>
          <button onClick={() => navigate("/settings")}><ArrowLeft className="h-5 w-5" style={{ color: "#6B7280" }} /></button>
          <div style={{ width: 20 }} />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="font-display" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.8, color: "hsl(var(--primary))", fontWeight: 700, marginTop: 16 }}>
            UPDATE GOAL
          </p>
          <h1 className="font-display" style={{ fontSize: 28, fontWeight: 800, color: "#111111", lineHeight: 1.2, marginTop: 10 }}>
            Update your goal
          </h1>
          <div style={{ width: 48, height: 4, backgroundColor: "hsl(var(--accent))", borderRadius: 2, marginTop: 12 }} />
          <p className="font-body" style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6, marginTop: 12, marginBottom: 24 }}>
            Your plan, insights, and how Cysta talks to you will adjust to match.
          </p>

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
                    <p className="font-display" style={{ fontSize: 16, fontWeight: 600, color: "var(--text-ink)" }}>{g.title}</p>
                    <p className="font-body" style={{ fontSize: 14, color: "var(--text-body)", marginTop: 4, lineHeight: 1.5 }}>{g.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mt-auto pt-6">
          <button
            disabled={!selected}
            onClick={handleSave}
            className="w-full h-[58px] rounded-[18px] font-body relative flex items-center justify-center"
            style={{
              fontSize: 16,
              fontWeight: 600,
              backgroundColor: selected ? "hsl(var(--primary))" : "var(--disabled)",
              color: selected ? "white" : "var(--text-muted)",
            }}
          >
            {selected ? "Save new goal →" : "Select a goal"}
            {selected && <ArrowRight className="absolute right-5 h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalsUpdate;
