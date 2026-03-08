import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";

type Tab = "nutrition" | "movement" | "mindset";

const tabs: { key: Tab; label: string }[] = [
  { key: "nutrition", label: "Nutrition" },
  { key: "movement", label: "Movement" },
  { key: "mindset", label: "Mindset" },
];

const SectionLabel = ({ children }: { children: string }) => (
  <p style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 1, marginTop: 20 }}>
    {children}
  </p>
);

const FocusCard = ({ priority, title, body }: { priority: string; title: string; body: string }) => (
  <div
    className="bg-card"
    style={{ borderRadius: 18, padding: 20, boxShadow: "var(--shadow-card)", marginTop: 10 }}
  >
    <p style={{ fontSize: 11, textTransform: "uppercase", color: "hsl(var(--accent))", fontWeight: 700, letterSpacing: 1 }}>
      {priority}
    </p>
    <p className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text-ink)", marginTop: 6 }}>
      {title}
    </p>
    <p className="font-body" style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.6, marginTop: 8 }}>
      {body}
    </p>
  </div>
);

const NutritionTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
    <img
      src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80"
      alt="Colourful vegetables and healthy food"
      style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 16, marginTop: 16 }}
    />
    <SectionLabel>THIS WEEK'S FOCUS</SectionLabel>
    <FocusCard
      priority="PRIORITY"
      title="Stabilise blood sugar at every meal."
      body="For your insulin resistance pattern, keeping blood sugar stable is the single most impactful thing you can do. Aim for protein + fat + fibre at every meal, especially breakfast."
    />

    <SectionLabel>WHAT TO EAT MORE OF</SectionLabel>
    <div className="grid grid-cols-3 gap-2" style={{ marginTop: 10 }}>
      {[
        { emoji: "🥚", label: "Protein", desc: "Eggs, Greek yogurt, legumes" },
        { emoji: "🥬", label: "Fibre", desc: "Leafy greens, lentils, seeds" },
        { emoji: "🫒", label: "Healthy fats", desc: "Avocado, olive oil, nuts" },
      ].map((c) => (
        <div
          key={c.label}
          className="bg-card flex flex-col items-center text-center"
          style={{ borderRadius: 14, padding: 14, boxShadow: "var(--shadow-card)" }}
        >
          <span style={{ fontSize: 28 }}>{c.emoji}</span>
          <span className="font-display" style={{ fontSize: 13, fontWeight: 600, color: "var(--text-ink)", marginTop: 6 }}>
            {c.label}
          </span>
          <span className="font-body" style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
            {c.desc}
          </span>
        </div>
      ))}
    </div>

    <SectionLabel>WHAT TO REDUCE</SectionLabel>
    {[
      {
        title: "Refined carbohydrates and sugar",
        desc: "White bread, pastries, sugary drinks spike insulin and worsen your pattern.",
      },
      {
        title: "Skipping meals",
        desc: "Skipping meals raises cortisol, which compounds insulin resistance.",
      },
    ].map((item) => (
      <div
        key={item.title}
        className="bg-card flex gap-3"
        style={{ borderRadius: 18, padding: 16, boxShadow: "var(--shadow-card)", marginBottom: 10, marginTop: 10 }}
      >
        <span
          className="flex-shrink-0"
          style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "hsl(var(--accent))", marginTop: 5 }}
        />
        <div>
          <p className="font-display" style={{ fontSize: 15, fontWeight: 600, color: "var(--text-ink)" }}>{item.title}</p>
          <p className="font-body" style={{ fontSize: 13, color: "var(--text-body)", marginTop: 2 }}>{item.desc}</p>
        </div>
      </div>
    ))}

    <SectionLabel>CYCLE PHASE ADJUSTMENT</SectionLabel>
    <div
      style={{
        backgroundColor: "#EAF3F3",
        borderRadius: 18,
        padding: 18,
        marginTop: 10,
        marginBottom: 20,
      }}
    >
      <p style={{ fontSize: 11, textTransform: "uppercase", color: "hsl(var(--primary))", fontWeight: 700, letterSpacing: 1 }}>
        LUTEAL PHASE NOW
      </p>
      <p className="font-body" style={{ fontSize: 14, color: "hsl(var(--primary))", lineHeight: 1.6, marginTop: 6 }}>
        Increase magnesium-rich foods this week. Your body is depleting magnesium faster right now, and this drives
        cravings and mood changes. Pumpkin seeds, spinach, dark chocolate and almonds all help.
      </p>
    </div>
  </motion.div>
);

const MovementTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
    <img
      src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
      alt="Woman doing gentle yoga movement"
      style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 16, marginTop: 16 }}
    />
    <SectionLabel>THIS WEEK'S APPROACH</SectionLabel>
    <FocusCard
      priority="PRIORITY"
      title="Strength + gentle walking this week."
      body="You're in luteal phase. Your body temperature is higher and energy is lower. Heavy HIIT training raises cortisol which worsens insulin resistance. Prioritise strength training and 20-30 min walks instead."
    />

    <div style={{ marginTop: 16 }}>
      {[
        {
          emoji: "💪",
          title: "Strength training",
          freq: "2–3x this week · 30–45 min",
          desc: "Builds insulin-sensitising muscle tissue.",
        },
        {
          emoji: "🚶",
          title: "Walking",
          freq: "Daily · 20–30 min after meals",
          desc: "Post-meal walks significantly lower blood sugar spikes.",
        },
        {
          emoji: "🧘",
          title: "Yoga or stretching",
          freq: "1–2x this week · 20 min",
          desc: "Supports cortisol regulation during luteal phase.",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="bg-card"
          style={{ borderRadius: 18, padding: 16, boxShadow: "var(--shadow-card)", marginBottom: 10 }}
        >
          <p className="font-display" style={{ fontSize: 15, fontWeight: 600, color: "var(--text-ink)" }}>
            {item.emoji} {item.title}
          </p>
          <p className="font-body" style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{item.freq}</p>
          <p className="font-body" style={{ fontSize: 14, color: "var(--text-body)", marginTop: 4 }}>{item.desc}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

const MindsetTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
    <img
      src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80"
      alt="Woman meditating peacefully"
      style={{ width: "100%", height: 160, objectFit: "cover", objectPosition: "center 30%", borderRadius: 16, marginTop: 16 }}
    />
    <SectionLabel>THIS WEEK'S FOCUS</SectionLabel>
    <FocusCard
      priority="PRIORITY"
      title="Protect your nervous system this week."
      body="Chronic stress elevates cortisol which directly worsens insulin resistance. Even 10 minutes of intentional rest daily makes a measurable difference to your hormone levels over time."
    />

    <div style={{ marginTop: 16 }}>
      {[
        {
          emoji: "🌬️",
          title: "Box breathing",
          desc: "4 counts in, hold, out, hold. 5 minutes before bed to lower cortisol.",
        },
        {
          emoji: "📵",
          title: "Phone-free mornings",
          desc: "First 30 minutes without your phone reduces cortisol spike on waking significantly.",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="bg-card"
          style={{ borderRadius: 18, padding: 16, boxShadow: "var(--shadow-card)", marginBottom: 10 }}
        >
          <p className="font-display" style={{ fontSize: 15, fontWeight: 600, color: "var(--text-ink)" }}>
            {item.emoji} {item.title}
          </p>
          <p className="font-body" style={{ fontSize: 14, color: "#4A5568", marginTop: 4 }}>{item.desc}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

const tabContent: Record<Tab, React.ReactNode> = {
  nutrition: <NutritionTab />,
  movement: <MovementTab />,
  mindset: <MindsetTab />,
};

const Plan = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("nutrition");

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col pb-20">
        <div className="px-5">
          {/* Header */}
          <h1 className="font-display" style={{ fontSize: 32, fontWeight: 800, color: "#111111", marginTop: 20 }}>
            Your Plan
          </h1>
          <p className="font-body" style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 4 }}>
            Insulin Resistance · Luteal Phase
          </p>
          <div style={{ width: 48, height: 4, backgroundColor: "#D4614F", borderRadius: 2, marginTop: 10 }} />

          {/* Banner */}
          <div
            className="bg-card"
            style={{
              borderLeft: "4px solid #D4614F",
              borderRadius: 12,
              padding: 16,
              boxShadow: "var(--shadow-card)",
              marginTop: 20,
            }}
          >
            <p style={{ fontSize: 11, textTransform: "uppercase", color: "hsl(var(--accent))", fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>
              PLAN UPDATED
            </p>
            <p className="font-body" style={{ fontSize: 13, color: "#4A5568" }}>
              Based on your last 14 days of logs, we've adjusted your focus areas.
            </p>
            <p
              onClick={() => navigate("/plan-changes")}
              className="font-display"
              style={{ fontSize: 13, fontWeight: 600, color: "#0A3D3D", marginTop: 6, cursor: "pointer" }}
            >
              See what changed →
            </p>
          </div>

          {/* Tabs */}
          <div className="flex w-full" style={{ marginTop: 20, borderBottom: "1px solid #E2DDD7" }}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex-1 pb-3 font-display text-center transition-colors"
                style={{
                  fontSize: 14,
                  fontWeight: activeTab === tab.key ? 700 : 400,
                  color: activeTab === tab.key ? "#0A3D3D" : "var(--text-muted)",
                  borderBottom: activeTab === tab.key ? "2px solid #0A3D3D" : "2px solid transparent",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {tabContent[activeTab]}
        </div>

        <BottomNav active="plan" />
      </div>
    </div>
  );
};

export default Plan;
