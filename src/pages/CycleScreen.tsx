import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const phases = [
  {
    name: "Menstrual",
    days: "Days 1–5",
    emoji: "🩸",
    summary: "Your period. Hormone levels are at their lowest. Energy dips, and your body is shedding the uterine lining.",
    tips: "Rest, gentle movement, iron-rich foods. This is your reset phase, honour the low energy.",
  },
  {
    name: "Follicular",
    days: "Days 6–13",
    emoji: "🌱",
    summary: "Oestrogen rises steadily. Energy increases, mood lifts, and insulin sensitivity improves. This is your high-performance window.",
    tips: "Try new workouts, tackle challenging tasks, eat complex carbs. Your body handles them best now.",
  },
  {
    name: "Ovulatory",
    days: "Days 14–16",
    emoji: "✨",
    summary: "Oestrogen peaks, testosterone surges briefly. You feel confident, social, and energised. Fertility is highest.",
    tips: "High-intensity exercise works well here. Stay hydrated and eat antioxidant-rich foods.",
  },
  {
    name: "Luteal",
    days: "Days 17–28",
    emoji: "🌙",
    summary: "Progesterone rises then falls. Energy drops, cravings increase, mood can shift. Your body is preparing for either pregnancy or your next period.",
    tips: "Magnesium-rich foods, protein at every meal, gentle movement, prioritise sleep. This is not the time to push hard.",
    current: true,
  },
];

const CycleScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col px-5 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mt-5">
            <button onClick={() => navigate("/home")}>
              <ArrowLeft className="h-5 w-5" style={{ color: "var(--text-muted)" }} />
            </button>
            <span className="font-display text-base font-bold" style={{ color: "var(--text-ink)" }}>
              Know Your Cyst-em
            </span>
            <div className="w-5" />
          </div>

          {/* Hero */}
          <div className="mt-6">
            <p style={{ fontSize: 11, textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: 1 }}>
              YOUR CYCLE, DECODED
            </p>
            <h1
              className="font-display mt-2"
              style={{ fontSize: 28, fontWeight: 800, color: "var(--text-ink)", lineHeight: 1.2 }}
            >
              Your cycle isn't the problem. Not knowing it is.
            </h1>
            <div className="mt-3" style={{ width: 48, height: 4, borderRadius: 2, backgroundColor: "hsl(var(--accent))" }} />
            <p
              className="font-body mt-[14px]"
              style={{ fontSize: 15, color: "var(--text-body)", lineHeight: 1.6 }}
            >
              Your hormones shift across four distinct phases each cycle. Knowing where you are helps you eat, move, and rest in sync with your body, not against it.
            </p>
          </div>

          {/* Cycle bar */}
          <div className="mt-6">
            <div className="flex rounded-full overflow-hidden" style={{ height: 32 }}>
              {phases.map((phase) => (
                <div
                  key={phase.name}
                  className="flex-1 flex items-center justify-center font-display"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: phase.current ? "white" : "#4A5568",
                    backgroundColor: phase.current ? "#0A3D3D" : "#E8E4DF",
                    position: "relative",
                  }}
                >
                  {phase.name}
                </div>
              ))}
            </div>
            <div className="flex mt-1">
              {phases.map((phase) => (
                <div key={phase.name} className="flex-1 text-center">
                  {phase.current && (
                    <span className="font-display" style={{ fontSize: 10, color: "hsl(var(--primary))", fontWeight: 700 }}>
                      ▲ YOU ARE HERE
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Phase cards */}
          <div className="mt-6 flex flex-col gap-3">
            {phases.map((phase) => (
              <div
                key={phase.name}
                className="bg-card"
                style={{
                  borderRadius: 18,
                  padding: 20,
                  boxShadow: "var(--shadow-card)",
                  borderLeft: phase.current ? "4px solid #0A3D3D" : "4px solid transparent",
                }}
              >
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 20 }}>{phase.emoji}</span>
                  <div>
                    <p className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "#111111" }}>
                      {phase.name} Phase
                    </p>
                    <p className="font-body" style={{ fontSize: 12, color: "var(--text-muted)" }}>{phase.days}</p>
                  </div>
                  {phase.current && (
                    <span
                      className="ml-auto font-display"
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#0A3D3D",
                        backgroundColor: "#EAF3F3",
                        padding: "3px 8px",
                        borderRadius: 100,
                      }}
                    >
                      CURRENT
                    </span>
                  )}
                </div>
                <p className="font-body mt-3" style={{ fontSize: 14, color: "#4A5568", lineHeight: 1.6 }}>
                  {phase.summary}
                </p>
                <div className="mt-3" style={{ backgroundColor: "#F7F4F0", borderRadius: 12, padding: 12 }}>
                  <p className="font-body" style={{ fontSize: 13, color: "#4A5568", lineHeight: 1.5 }}>
                    💡 {phase.tips}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CycleScreen;
