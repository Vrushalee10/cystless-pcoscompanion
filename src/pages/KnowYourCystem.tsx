import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";

const phaseContent: Record<string, {
  headline: string;
  whatsHappening: string;
  whyPcosMatters: string;
  actions: string[];
  planNote: string;
}> = {
  Menstrual: {
    headline: "Your energy is low right now — and that's by design.",
    whatsHappening: "You're in your menstrual phase. Progesterone and oestrogen are at their lowest point. Your body is shedding the uterine lining, which takes real energy. Iron levels drop, inflammation markers can rise, and your metabolism naturally slows. Feeling tired isn't laziness — it's physiology.",
    whyPcosMatters: "Women with PCOS often experience heavier or more painful periods due to higher prostaglandin levels and chronic low-grade inflammation. This can make fatigue and cramping feel more intense. Iron deficiency is also more common, compounding the energy dip.",
    actions: [
      "Iron-rich foods: red meat, lentils, spinach, or fortified cereals",
      "Anti-inflammatory support: turmeric, ginger tea, omega-3 rich fish",
      "Gentle movement only — walks, stretching, or restorative yoga",
      "Extra rest is productive, not lazy. Your body is doing real work",
    ],
    planNote: "Your menstrual phase plan prioritises iron-rich foods and anti-inflammatory support this week.",
  },
  Follicular: {
    headline: "Your body is building energy — this is your rising phase.",
    whatsHappening: "You're in your follicular phase. Oestrogen is climbing, energy is returning, and your body is preparing for ovulation. Insulin sensitivity improves during this phase, meaning your body handles carbs and sugar better right now. This is typically when you feel most motivated and clear-headed.",
    whyPcosMatters: "For women with PCOS, the follicular phase can be shorter or disrupted. Even when oestrogen rises, elevated androgens can blunt the energy boost you'd normally feel. Taking advantage of improved insulin sensitivity now — with balanced meals and movement — sets a stronger foundation for the rest of your cycle.",
    actions: [
      "This is your best phase for strength training and higher-intensity exercise",
      "Complex carbs are better tolerated now — sweet potato, oats, quinoa",
      "Focus on fibre-rich vegetables to support oestrogen metabolism",
      "Batch-cook or meal-prep while motivation is naturally higher",
    ],
    planNote: "Your follicular phase plan is optimised for energy-building nutrition and movement.",
  },
  Ovulatory: {
    headline: "You're at peak energy — but inflammation can spike too.",
    whatsHappening: "You're in your ovulatory phase. Oestrogen and luteinising hormone (LH) peak to trigger egg release. Energy, confidence, and sociability tend to be highest. But this hormonal surge also triggers a mild inflammatory response, and for some women, this is when skin breakouts or bloating appear.",
    whyPcosMatters: "In PCOS, LH is often chronically elevated, which can make ovulation irregular or absent. Even if you do ovulate, the inflammatory spike can feel stronger due to underlying chronic inflammation. Supporting your body with anti-inflammatory foods during this window matters more than you'd think.",
    actions: [
      "Anti-inflammatory foods: berries, leafy greens, fatty fish, turmeric",
      "Stay hydrated — bloating is common around ovulation",
      "Light zinc-rich foods (pumpkin seeds, chickpeas) support egg quality",
      "High-intensity workouts are well-tolerated if you feel up to it",
    ],
    planNote: "Your ovulatory phase plan focuses on anti-inflammatory support and peak-energy nutrition.",
  },
  Luteal: {
    headline: "Your cravings right now are hormonal, not weakness.",
    whatsHappening: "You're in your luteal phase. After ovulation, progesterone rises sharply. This increases your body's demand for magnesium — a mineral that regulates blood sugar, insulin sensitivity and dopamine. As magnesium dips, your brain sends a craving signal for fast-release carbohydrates. It's not willpower. It's chemistry.",
    whyPcosMatters: "Women with PCOS tend to have lower magnesium levels. Research shows insulin resistance temporarily worsens in the luteal phase, meaning your body works harder to manage blood sugar. The result: cravings that feel bigger and harder to ignore. That's not in your head. That's your biology.",
    actions: [
      "Dark chocolate (70%+), the highest food source of magnesium",
      "Pumpkin seeds or almonds, magnesium-rich and blood-sugar stabilising",
      "Spinach or leafy greens, magnesium plus fibre, the best combo",
      "Protein-rich snack, slows glucose absorption and reduces craving intensity",
    ],
    planNote: "Your luteal phase nutrition focus has been updated to prioritise magnesium-rich foods this week.",
  },
};

const noPhaseContent = {
  headline: "We're still learning your cycle patterns.",
  description: "Once we have enough data to identify your current phase, this screen will show you exactly what's happening in your body and why — personalised to your PCOS pattern. Keep logging, and Cysta will connect the dots.",
};

const KnowYourCystem = () => {
  const navigate = useNavigate();
  const { cycleData } = useQuiz();
  const phase = cycleData.currentPhase;
  const content = phase ? phaseContent[phase] : null;

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

          {/* Phase badge */}
          {phase && cycleData.currentCycleDay && (
            <div className="flex justify-center mt-4">
              <span
                className="font-body"
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "hsl(var(--primary))",
                  backgroundColor: "hsl(var(--primary-light))",
                  padding: "5px 14px",
                  borderRadius: 100,
                }}
              >
                Day {cycleData.currentCycleDay} · {phase} Phase
              </span>
            </div>
          )}

          {content ? (
            <>
              {/* Hero */}
              <div className="mt-6">
                <span className="text-label" style={{ color: "hsl(var(--primary))" }}>
                  YOUR BODY, EXPLAINED
                </span>
                <h1
                  className="font-display mt-2"
                  style={{ fontSize: 28, fontWeight: 800, color: "var(--text-ink)", lineHeight: 1.2 }}
                >
                  {content.headline}
                </h1>
                <div
                  className="mt-3"
                  style={{ width: 48, height: 4, borderRadius: 2, backgroundColor: "hsl(var(--accent))" }}
                />
                <p
                  className="font-body mt-[14px] mb-6"
                  style={{ fontSize: 15, color: "var(--text-body)", lineHeight: 1.6 }}
                >
                  Here's exactly what's happening in your body right now, and why it makes complete sense.
                </p>
              </div>

              {/* What's Happening */}
              <div className="bg-card p-5 mb-3" style={{ borderRadius: 18, boxShadow: "var(--shadow-card)" }}>
                <span className="text-label" style={{ color: "var(--text-muted)", marginBottom: 10, display: "block" }}>
                  WHAT'S HAPPENING
                </span>
                <p className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "var(--text-ink)" }}>
                  You're in your {phase?.toLowerCase()} phase, and your body is doing exactly what it's designed to do.
                </p>
                <p className="font-body mt-[10px]" style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.7 }}>
                  {content.whatsHappening}
                </p>
              </div>

              {/* Why PCOS */}
              <div className="bg-card p-5 mb-3" style={{ borderRadius: 18, boxShadow: "var(--shadow-card)" }}>
                <span className="text-label" style={{ color: "var(--text-muted)", marginBottom: 10, display: "block" }}>
                  WHY YOUR PCOS MAKES IT STRONGER
                </span>
                <p className="font-body" style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.7 }}>
                  {content.whyPcosMatters}
                </p>
              </div>

              {/* What The Research Says */}
              <div className="bg-card p-5 mb-3" style={{ borderRadius: 18, boxShadow: "var(--shadow-card)" }}>
                <span className="text-label" style={{ color: "var(--text-muted)", marginBottom: 10, display: "block" }}>
                  WHAT THE RESEARCH SAYS
                </span>
                <p className="font-body" style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.7 }}>
                  Studies consistently show magnesium deficiency is more common in PCOS. Magnesium supports over 300
                  enzyme processes including insulin signalling. Food-based sources alongside a balanced diet show the strongest evidence.
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
                  These insights are based on published research, personalised to your cycle phase. Not a substitute for medical advice.
                </div>
              </div>

              {/* Actions */}
              <div className="bg-card p-5 mb-3" style={{ borderRadius: 18, boxShadow: "var(--shadow-card)" }}>
                <span className="text-label" style={{ color: "hsl(var(--primary))", marginBottom: 12, display: "block" }}>
                  WHAT ACTUALLY HELPS TODAY
                </span>
                {content.actions.map((item, i) => (
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
                    {i < content.actions.length - 1 && <div className="border-t border-border" />}
                  </div>
                ))}
              </div>

              {/* Plan CTA */}
              <div
                className="p-[18px] mb-5"
                style={{ backgroundColor: "hsl(var(--primary-light))", borderRadius: 18 }}
              >
                <span className="text-label" style={{ color: "hsl(var(--primary))", marginBottom: 8, display: "block" }}>
                  YOUR PLAN ALREADY ACCOUNTS FOR THIS
                </span>
                <p className="font-body" style={{ fontSize: 14, color: "hsl(var(--primary))", lineHeight: 1.6 }}>
                  {content.planNote}
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
            </>
          ) : (
            /* No phase — irregular/post-pill/skipped */
            <div className="mt-8">
              <span className="text-label" style={{ color: "hsl(var(--primary))" }}>
                YOUR BODY, EXPLAINED
              </span>
              <h1
                className="font-display mt-2"
                style={{ fontSize: 28, fontWeight: 800, color: "var(--text-ink)", lineHeight: 1.2 }}
              >
                {noPhaseContent.headline}
              </h1>
              <div
                className="mt-3"
                style={{ width: 48, height: 4, borderRadius: 2, backgroundColor: "hsl(var(--accent))" }}
              />
              <p
                className="font-body mt-4"
                style={{ fontSize: 15, color: "var(--text-body)", lineHeight: 1.6 }}
              >
                {noPhaseContent.description}
              </p>
              <button
                onClick={() => navigate("/cycle-setup")}
                className="font-body mt-5 flex items-center gap-1"
                style={{ fontSize: 14, fontWeight: 700, color: "hsl(var(--primary))" }}
              >
                Set up cycle tracking →
              </button>
            </div>
          )}

          {/* Disclaimer */}
          <p
            className="font-body text-center mt-1 mb-6"
            style={{ fontSize: 12, fontStyle: "italic", color: "var(--text-muted)", lineHeight: 1.6 }}
          >
            All Cystless insights are based on published research, personalised to your PCOS pattern. Not medical
            advice, always work with your healthcare provider.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default KnowYourCystem;