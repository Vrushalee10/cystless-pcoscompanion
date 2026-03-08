import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";

const moods = ["😞", "😕", "😐", "🙂", "😊"];

const Home = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [energy, setEnergy] = useState<number>(0);

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col px-5 pb-[80px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="flex justify-between items-start mt-5">
            <div>
              <p className="font-body" style={{ fontSize: 14, color: "var(--text-muted)" }}>
                Good morning,
              </p>
              <h1
                className="font-display mt-[2px]"
                style={{ fontSize: 30, fontWeight: 700, color: "var(--text-ink)" }}
              >
                Vrushali
              </h1>
              <button
                onClick={() => navigate("/cycle")}
                className="mt-[10px] inline-block font-body"
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "hsl(var(--primary))",
                  backgroundColor: "hsl(var(--primary-light))",
                  padding: "5px 10px",
                  borderRadius: 100,
                }}
              >
                Day 18 · Luteal Phase
              </button>
              <button
                onClick={() => navigate("/cycle")}
                className="font-body mt-1 flex items-center gap-1"
                style={{ fontSize: 13, fontWeight: 600, color: "hsl(var(--primary))" }}
              >
                Know Your Cyst-em →
              </button>
            </div>
            <div
              className="flex items-center justify-center flex-shrink-0 font-display"
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                backgroundColor: "hsl(var(--primary))",
                color: "white",
                fontSize: 18,
                fontWeight: 700,
                marginTop: 4,
              }}
            >
              V
            </div>
          </div>

          <div className="mt-5 border-t border-border" />

          {/* Today's Insight */}
          <div
            className="bg-card mt-6 p-6"
            style={{ borderRadius: 22, boxShadow: "var(--shadow-hero)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-label" style={{ color: "hsl(var(--primary))" }}>
                TODAY'S INSIGHT
              </span>
              <span
                className="block rounded-full"
                style={{
                  width: 9,
                  height: 9,
                  backgroundColor: "hsl(var(--accent))",
                  animation: "insightPulse 2s ease-in-out infinite",
                }}
              />
            </div>
            <h2
              className="font-display mt-4"
              style={{ fontSize: 26, fontWeight: 700, color: "var(--text-ink)", lineHeight: 1.25 }}
            >
              Your cravings right now are hormonal — not weakness.
            </h2>
            <div
              className="mt-[14px] mb-[14px]"
              style={{
                height: 3,
                borderRadius: 2,
                backgroundColor: "hsl(var(--accent) / 0.1)",
              }}
            />
            <p
              className="font-body"
              style={{ fontSize: 15, color: "var(--text-body)", lineHeight: 1.65 }}
            >
              You're in your luteal phase. As progesterone rises, magnesium gets depleted — and low
              magnesium directly triggers sugar cravings. A small magnesium-rich snack this afternoon
              can interrupt this cycle. Try almonds or two squares of dark chocolate.
            </p>
            <button
              onClick={() => navigate("/decystified")}
              className="font-body mt-[18px] flex items-center gap-1"
              style={{ fontSize: 14, fontWeight: 600, color: "hsl(var(--primary))" }}
            >
              Why does this happen?
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Daily Check-in */}
          <div className="flex items-center justify-between mt-7">
            <span className="text-label" style={{ color: "var(--text-muted)" }}>
              TODAY'S CHECK-IN
            </span>
            <button
              onClick={() => navigate("/log")}
              className="font-body flex items-center gap-0.5"
              style={{ fontSize: 13, fontWeight: 600, color: "hsl(var(--primary))" }}
            >
              Quick log
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex gap-[10px] mt-3">
            {/* Mood */}
            <div
              className="flex-1 bg-card flex flex-col items-center p-[14px_10px]"
              style={{ borderRadius: 14, boxShadow: "var(--shadow-card)", minHeight: 80 }}
            >
              <span className="text-label" style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 8 }}>
                MOOD
              </span>
              <div className="flex gap-1">
                {moods.map((emoji, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedMood(i)}
                    className="flex items-center justify-center"
                    style={{
                      width: 32,
                      height: 32,
                      fontSize: 20,
                      borderRadius: "50%",
                      backgroundColor: selectedMood === i ? "hsl(var(--primary-light))" : "transparent",
                      transition: "background-color 0.15s",
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Energy */}
            <div
              className="flex-1 bg-card flex flex-col items-center p-[14px_10px]"
              style={{ borderRadius: 14, boxShadow: "var(--shadow-card)", minHeight: 80 }}
            >
              <span className="text-label" style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 8 }}>
                ENERGY
              </span>
              <div className="flex gap-[6px] mt-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => setEnergy(level)}
                    className="rounded-full transition-colors"
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor:
                        level <= energy ? "hsl(var(--primary))" : "hsl(var(--border))",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Today's Focus */}
          <p className="text-label mt-7" style={{ color: "var(--text-muted)" }}>
            TODAY'S FOCUS
          </p>
          <div
            className="bg-card mt-3 p-5"
            style={{
              borderRadius: 18,
              boxShadow: "var(--shadow-card)",
              borderLeft: "5px solid hsl(var(--primary))",
            }}
          >
            <span
              className="text-label"
              style={{ fontSize: 10, color: "hsl(var(--primary))" }}
            >
              NUTRITION
            </span>
            <p
              className="font-body mt-2"
              style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.6 }}
            >
              Prioritise protein at breakfast to stabilise blood sugar before 10am. Eggs, Greek
              yogurt, or a protein smoothie all work for your insulin resistance pattern.
            </p>
          </div>
        </motion.div>
      </div>

      <BottomNav active="home" />
    </div>
  );
};

export default Home;
