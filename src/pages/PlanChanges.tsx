import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const changeCards = [
  {
    category: "NUTRITION",
    title: "↑ Magnesium-rich foods added to your plan",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    why: "Progesterone rising in your luteal phase accelerates magnesium depletion. Research shows women with PCOS already have lower baseline magnesium than average — making this phase especially impactful. Low magnesium directly worsens insulin resistance and drives carbohydrate cravings. A 2022 clinical trial found magnesium supplementation improved abnormal uterine bleeding and quality of life in women with PCOS.",
    note: "Food-based magnesium alongside low-GI eating has the strongest evidence. Supplements alone are not sufficient.",
  },
  {
    category: "MOVEMENT",
    title: "↓ High-intensity training reduced this week",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    why: "HIIT and high-intensity training spike cortisol. In the luteal phase your body temperature is already elevated and cortisol is more reactive — making intense exercise counterproductive for your insulin resistance pattern. A 2025 systematic review confirmed resistance training and moderate aerobic exercise improve insulin sensitivity in PCOS without the cortisol cost of HIIT. Strength training 2–3x per week plus daily walking is the evidence-backed approach for this phase.",
  },
  {
    category: "MINDSET",
    title: "↑ Nervous system support prioritised",
    image: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=800&q=80",
    why: "Chronic stress elevates cortisol and DHEA-S — hormones that directly worsen insulin resistance and androgen levels in PCOS. The luteal phase is when the nervous system is most reactive. Research shows even 10 minutes of daily breathwork or mindfulness meaningfully reduces cortisol over time. This phase calls for protection, not performance.",
  },
];

const PlanChanges = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <button onClick={() => navigate("/plan")}>
            <ArrowLeft className="h-5 w-5" style={{ color: "var(--text-muted)" }} />
          </button>
          <span className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "#111111" }}>
            What Changed & Why
          </span>
          <div style={{ width: 20 }} />
        </div>

        {/* Content */}
        <motion.div
          className="flex-1 overflow-y-auto px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div style={{ marginTop: 24 }}>
            <p style={{ fontSize: 11, textTransform: "uppercase", color: "#D4614F", fontWeight: 700, letterSpacing: 1 }}>
              PLAN UPDATED
            </p>
            <h1 className="font-display" style={{ fontSize: 28, fontWeight: 800, color: "#111111", lineHeight: 1.2, marginTop: 8 }}>
              Your plan shifted for luteal phase.
            </h1>
            <div style={{ width: 48, height: 4, backgroundColor: "#D4614F", borderRadius: 2, marginTop: 12 }} />
            <p className="font-body" style={{ fontSize: 15, color: "#4A5568", marginTop: 14, marginBottom: 24, lineHeight: 1.6 }}>
              Here's exactly what we adjusted and the science behind each change.
            </p>
          </div>

          {/* Change cards */}
          {changeCards.map((card) => (
            <div
              key={card.category}
              className="bg-card overflow-hidden"
              style={{ borderRadius: 18, boxShadow: "var(--shadow-card)", marginBottom: 12 }}
            >
              <img
                src={card.image}
                alt={card.category}
                style={{ width: "100%", height: 80, objectFit: "cover" }}
              />
              <div style={{ padding: 20 }}>
              <p style={{ fontSize: 11, textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: 1 }}>
                {card.category}
              </p>
              <p className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "#111111", marginTop: 6 }}>
                {card.title}
              </p>
              <p style={{ fontSize: 10, textTransform: "uppercase", color: "#D4614F", fontWeight: 700, letterSpacing: 1, marginTop: 12 }}>
                WHY:
              </p>
              <p className="font-body" style={{ fontSize: 14, color: "#4A5568", lineHeight: 1.65, marginTop: 4 }}>
                {card.why}
              </p>
              {card.note && (
                <div style={{ backgroundColor: "#F7F4F0", borderRadius: 12, padding: 12, marginTop: 10 }}>
                  <p className="font-body" style={{ fontSize: 12, fontStyle: "italic", color: "#94A3B8" }}>
                    {card.note}
                  </p>
                </div>
              )}
              </div>
            </div>
          ))}

          {/* Next update card */}
          <div style={{ backgroundColor: "#EAF3F3", borderRadius: 18, padding: 18, marginTop: 4, marginBottom: 24 }}>
            <p style={{ fontSize: 11, textTransform: "uppercase", color: "#0A3D3D", fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>
              NEXT PLAN UPDATE
            </p>
            <p className="font-body" style={{ fontSize: 14, color: "#0A3D3D", lineHeight: 1.6 }}>
              Your plan will automatically update when you move into your follicular phase — roughly 10 days from now.
              In follicular phase, oestrogen rises and insulin sensitivity improves, so your nutrition and movement
              targets will shift to take advantage of that window.
            </p>
          </div>

          {/* Disclaimer */}
          <p
            className="font-body text-center"
            style={{ fontSize: 12, fontStyle: "italic", color: "#94A3B8", lineHeight: 1.6, marginBottom: 32 }}
          >
            Plan updates are based on your logged data, PCOS pattern and current cycle phase. Not medical advice — work
            with your healthcare provider for clinical decisions.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PlanChanges;
