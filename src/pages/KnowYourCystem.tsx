import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const actionItems = [
  "Dark chocolate (70%+), the highest food source of magnesium",
  "Pumpkin seeds or almonds, magnesium-rich and blood-sugar stabilising",
  "Spinach or leafy greens, magnesium plus fibre, the best combo",
  "Protein-rich snack, slows glucose absorption and reduces craving intensity",
];

const KnowYourCystem = () => {
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
            <button onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            </button>
            <span className="font-display text-base font-bold" style={{ color: "var(--text-ink)" }}>
              De-Cyst-ified · Today's Insight
            </span>
            <div className="w-5" />
          </div>

          {/* Hero */}
          <div className="mt-6">
            <span className="text-label" style={{ color: "hsl(var(--primary))" }}>
              YOUR BODY, EXPLAINED
            </span>
            <h1
              className="font-display mt-2"
              style={{ fontSize: 28, fontWeight: 800, color: "var(--text-ink)", lineHeight: 1.2 }}
            >
              Your cravings right now are hormonal — not weakness.
            </h1>
            <div
              className="mt-3"
              style={{ width: 48, height: 4, borderRadius: 2, backgroundColor: "hsl(var(--accent))" }}
            />
            <img
              src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80"
              alt="Soft body wellness"
              style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 16, marginTop: 14 }}
            />
            <p
              className="font-body mt-[14px] mb-6"
              style={{ fontSize: 15, color: "var(--text-body)", lineHeight: 1.6 }}
            >
              Here's exactly what's happening in your body right now — and why it makes complete sense.
            </p>
          </div>

          {/* Card: What's Happening */}
          <div className="bg-card p-5 mb-3" style={{ borderRadius: 18, boxShadow: "var(--shadow-card)" }}>
            <span className="text-label" style={{ color: "var(--text-muted)", marginBottom: 10, display: "block" }}>
              WHAT'S HAPPENING
            </span>
            <p className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "var(--text-ink)" }}>
              You're in your luteal phase — and your body is doing exactly what it's designed to do.
            </p>
            <p className="font-body mt-[10px]" style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.7 }}>
              After ovulation, progesterone rises sharply. This increases your body's demand for magnesium — a mineral
              that regulates blood sugar, insulin sensitivity and dopamine. As magnesium dips, your brain sends a
              craving signal for fast-release carbohydrates to restore energy quickly. It's not a lack of willpower.
              It's chemistry.
            </p>
          </div>

          {/* Card: Why PCOS Makes It Stronger */}
          <div className="bg-card p-5 mb-3" style={{ borderRadius: 18, boxShadow: "var(--shadow-card)" }}>
            <span className="text-label" style={{ color: "var(--text-muted)", marginBottom: 10, display: "block" }}>
              WHY YOUR PCOS MAKES IT STRONGER
            </span>
            <p className="font-body" style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.7 }}>
              Women with PCOS tend to have lower magnesium levels than women without it. Research also shows insulin
              resistance temporarily worsens in the luteal phase — meaning your body is already working harder to
              manage blood sugar. The result: cravings that feel bigger and harder to ignore than they would for
              someone without PCOS. That's not in your head. That's your biology.
            </p>
          </div>

          {/* Card: What The Research Says */}
          <div className="bg-card p-5 mb-3" style={{ borderRadius: 18, boxShadow: "var(--shadow-card)" }}>
            <span className="text-label" style={{ color: "var(--text-muted)", marginBottom: 10, display: "block" }}>
              WHAT THE RESEARCH SAYS
            </span>
            <p className="font-body" style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.7 }}>
              Studies consistently show magnesium deficiency is more common in PCOS. Magnesium supports over 300
              enzyme processes including insulin signalling. Mayo Clinic dietitians specifically name it as a priority
              nutrient in the luteal phase. Food-based magnesium alongside a low-glycaemic diet shows the strongest
              evidence.
            </p>
            <div
              className="mt-[10px] font-body"
              style={{
                backgroundColor: "hsl(var(--background))",
                borderRadius: 12,
                padding: 12,
                fontSize: 12,
                fontStyle: "italic",
                color: "var(--text-muted)",
                lineHeight: 1.6,
              }}
            >
              Magnesium supplements alone haven't been proven to resolve PCOS symptoms in clinical trials. Food
              sources + balanced eating is what the evidence supports.
            </div>
          </div>

          {/* Card: What Actually Helps */}
          <div className="bg-card p-5 mb-3" style={{ borderRadius: 18, boxShadow: "var(--shadow-card)" }}>
            <span className="text-label" style={{ color: "hsl(var(--primary))", marginBottom: 12, display: "block" }}>
              WHAT ACTUALLY HELPS TODAY
            </span>
            {actionItems.map((item, i) => (
              <div key={i}>
                <div className="flex items-start gap-3 py-[14px]">
                  <div
                    className="mt-[7px] flex-shrink-0 rounded-full"
                    style={{ width: 6, height: 6, backgroundColor: "hsl(var(--accent))" }}
                  />
                  <span className="font-body" style={{ fontSize: 15, fontWeight: 500, color: "var(--text-ink)" }}>
                    {item}
                  </span>
                </div>
                {i < actionItems.length - 1 && <div className="border-t border-border" />}
              </div>
            ))}
          </div>

          {/* CTA Card */}
          <div
            className="p-[18px] mb-5"
            style={{ backgroundColor: "hsl(var(--primary-light))", borderRadius: 18 }}
          >
            <span className="text-label" style={{ color: "hsl(var(--primary))", marginBottom: 8, display: "block" }}>
              YOUR PLAN ALREADY ACCOUNTS FOR THIS
            </span>
            <p className="font-body" style={{ fontSize: 14, color: "hsl(var(--primary))", lineHeight: 1.6 }}>
              Your luteal phase nutrition focus has been updated to prioritise magnesium-rich foods this week. Check
              your plan to see today's full recommendations.
            </p>
            <button
              onClick={() => navigate("/plan")}
              className="font-body mt-[10px] flex items-center gap-1"
              style={{ fontSize: 14, fontWeight: 700, color: "hsl(var(--primary))" }}
            >
              See My Plan
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Disclaimer */}
          <p
            className="font-body text-center mt-1 mb-6"
            style={{ fontSize: 12, fontStyle: "italic", color: "var(--text-muted)", lineHeight: 1.6 }}
          >
            All Cystless insights are based on published research, personalised to your PCOS pattern. Not medical
            advice — always work with your healthcare provider.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default KnowYourCystem;
