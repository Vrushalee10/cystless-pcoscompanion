import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import InlineCheckIn from "@/components/InlineCheckIn";
import { useQuiz } from "@/context/QuizContext";

const Home = () => {
  const navigate = useNavigate();
  const { cycleData } = useQuiz();
  const [menuOpen, setMenuOpen] = useState(false);
  const cs = cycleData.cycleStatus;

  const getBadgeProps = () => {
    if (cs === "regular" && cycleData.currentCycleDay) return {
      text: `Day ${cycleData.currentCycleDay} · ${cycleData.currentPhase} Phase`,
      bg: "hsl(var(--primary-light))", color: "hsl(var(--primary))", route: "/cycle",
    };
    if (cs === "irregular_short") return {
      text: "Cycle irregular · Tracking in progress",
      bg: "#FFF8ED", color: "#92400E", route: "/cycle",
    };
    if (cs === "irregular_medium") return {
      text: "Irregular cycle · Building your baseline",
      bg: "#FFF8ED", color: "#92400E", route: "/cycle",
    };
    if (cs === "irregular_long" || cs === "never_regular") return {
      text: "Cycle monitoring · See Cysta",
      bg: "#FCECEA", color: "#D4614F", route: "/chat",
    };
    if (cs === "post_pill") return {
      text: `Post-pill recovery · ${cycleData.postPillStage?.replace("_", " ") || ""}`,
      bg: "hsl(var(--primary-light))", color: "hsl(var(--primary))", route: "/cycle",
    };
    return {
      text: "Set up cycle tracking →",
      bg: "#E2DDD7", color: "var(--text-muted)", route: "/cycle-setup",
    };
  };

  const badge = getBadgeProps();

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
                onClick={() => navigate(badge.route)}
                className="mt-[10px] inline-block font-body"
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: badge.color,
                  backgroundColor: badge.bg,
                  padding: "5px 10px",
                  borderRadius: 100,
                }}
              >
                {badge.text}
              </button>
              <button
                onClick={() => navigate("/cycle")}
                className="font-body mt-1 flex items-center gap-1"
                style={{ fontSize: 13, fontWeight: 600, color: "hsl(var(--primary))" }}
              >
                Know Your Cyst-em →
              </button>
            </div>
            <button
              onClick={() => navigate("/settings")}
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
            </button>
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
              Your cravings right now are hormonal, not weakness.
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
              You're in your luteal phase. As progesterone rises, magnesium gets depleted, and low
              magnesium directly triggers sugar cravings. A small magnesium-rich snack this afternoon
              can interrupt this cycle. Try almonds or two squares of dark chocolate.
            </p>
            <button
              onClick={() => navigate("/decystified")}
              className="font-body mt-[18px] flex items-center gap-1"
              style={{ fontSize: 14, fontWeight: 600, color: "hsl(var(--primary))" }}
            >
              Why does this happen?
            </button>
            <button
              onClick={() => navigate("/decystified")}
              className="font-body"
              style={{ fontSize: 12, fontStyle: "italic", color: "var(--text-muted)", marginTop: 4 }}
            >
              Let's De-Cyst-ify this →
            </button>
          </div>

          <InlineCheckIn />

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
              style={{ color: "hsl(var(--primary))" }}
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

          {/* Wearable Banner */}
          <button
            onClick={() => navigate("/connect-device")}
            className="w-full bg-card mt-4 flex items-center text-left"
            style={{
              borderRadius: 16, padding: 18,
              boxShadow: "var(--shadow-card)",
            }}
          >
            <span style={{ fontSize: 24, marginRight: 12 }}>⌚</span>
            <div className="flex-1 min-w-0">
              <p className="font-body" style={{ fontSize: 14, fontWeight: 700, color: "var(--text-ink)" }}>
                Auto-track with your watch
              </p>
              <p className="font-body" style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                Connect Apple Watch or Fitbit to log sleep, HRV and activity automatically.
              </p>
            </div>
            <span
              className="font-body shrink-0 ml-3"
              style={{ fontSize: 13, fontWeight: 600, color: "hsl(var(--primary))" }}
            >
              Connect →
            </span>
          </button>
        </motion.div>
      </div>

      <BottomNav active="home" />
    </div>
  );
};

export default Home;
