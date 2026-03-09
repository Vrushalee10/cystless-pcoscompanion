import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useQuiz, Scores } from "@/context/QuizContext";

const TYPE_DATA: Record<keyof Scores, {
  name: string;
  tag: string;
  description: string;
  focusareas: string[];
  clinicalnote: string;
  secondarySummary: string;
}> = {
  IR: {
    name: "Insulin Resistance",
    tag: "Most Common Pattern",
    description: "Higher insulin levels are likely driving your hormone imbalances. Excess insulin signals the ovaries to produce more androgens, disrupting ovulation and causing many classic PCOS symptoms. This is the most common pattern, affecting around 70% of women with PCOS, and it responds well to targeted nutrition and movement.",
    focusareas: [
      "Blood sugar balance through low-glycaemic eating",
      "Insulin-sensitising movement (strength + walking)",
      "Reducing processed sugar and refined carbohydrates",
    ],
    clinicalnote: "In clinical settings, this pattern most commonly maps to Rotterdam Phenotypes A or B, the most studied and most treatable PCOS presentations.",
    secondarySummary: "Blood sugar and insulin patterns are also contributing to your symptoms.",
  },
  AD: {
    name: "Adrenal",
    tag: "Stress-Driven Pattern",
    description: "Elevated stress hormones, specifically cortisol and DHEA-S, appear to be the primary driver of your symptoms. In adrenal PCOS, the adrenal glands (not just the ovaries) produce excess androgens in response to chronic stress. This pattern affects around 20–30% of women with PCOS.",
    focusareas: [
      "Cortisol reduction through stress management and sleep",
      "Gentle, non-high-intensity exercise (avoid cortisol spikes)",
      "Nervous system regulation and recovery practices",
    ],
    clinicalnote: "Adrenal PCOS is confirmed clinically by elevated DHEA-S with normal or near-normal testosterone, distinguishable only through blood testing.",
    secondarySummary: "Stress hormones are also playing a role alongside your primary pattern.",
  },
  IN: {
    name: "Inflammatory",
    tag: "Often Overlooked Pattern",
    description: "Chronic low-grade inflammation appears to be stimulating excess androgen production in your ovaries. Research shows CRP, an inflammation marker, is significantly elevated in most women with PCOS, independent of weight. Symptoms like joint pain, headaches, skin sensitivity and gut issues are key signals of this pattern.",
    focusareas: [
      "Anti-inflammatory nutrition (Mediterranean-style eating)",
      "Gut health support: fibre, fermented foods, omega-3s",
      "Identifying and reducing personal inflammation triggers",
    ],
    clinicalnote: "Inflammatory PCOS is associated with elevated CRP and IL-6 markers on blood testing. A dietary inflammatory index can help assess the impact of food choices.",
    secondarySummary: "Inflammation is also a factor worth addressing alongside your primary pattern.",
  },
  PP: {
    name: "Post-Pill",
    tag: "Transition Pattern",
    description: "Stopping hormonal contraceptives can unmask PCOS symptoms the pill was suppressing, or trigger a temporary hormonal rebound. Symptoms like acne, hair changes and irregular cycles often appear 1–3 months after stopping. This pattern is often temporary, but needs specific nutritional support to resolve.",
    focusareas: [
      "Hormone rebalancing and cycle restoration",
      "Zinc and B6 repletion (commonly depleted by the pill)",
      "Cycle tracking to monitor recovery over 3–6 months",
    ],
    clinicalnote: "Post-pill PCOS typically resolves within 6–12 months with appropriate nutritional support. Persistent symptoms beyond this suggest an underlying hormonal pattern.",
    secondarySummary: "Post-pill hormonal shifts are also contributing to your current picture.",
  },
};

const getGoalIntroLine = (userGoal: string | null): string => {
  switch (userGoal) {
    case "symptoms":
      return "Based on your goal to manage your symptoms, here's what your pattern tells us.";
    case "cycle":
    case "fertility":
      return "Based on your goal to regulate your cycle, here's what to focus on first.";
    case "weight":
      return "Based on your goal to lose weight sustainably, your insulin resistance pattern is the key.";
    case "understand":
    case "feel_better":
    case "new_diagnosis":
    default:
      return "Here's what your body has been trying to tell you.";
  }
};

const Results = () => {
  const navigate = useNavigate();
  const { scores, flags, userGoal } = useQuiz();

  const { primary, secondary, showSecondary, showPostPillNote } = useMemo(() => {
    const entries = Object.entries(scores) as [keyof Scores, number][];
    const allZero = entries.every(([, v]) => v === 0);

    // Sort descending
    const sorted = [...entries].sort((a, b) => b[1] - a[1]);

    let primaryKey: keyof Scores = "IR";
    let secondaryKey: keyof Scores | null = null;
    let showSec = false;

    if (allZero) {
      primaryKey = "IR";
    } else {
      // Priority override for IR
      const maxScore = Math.max(...entries.map(([, v]) => v));
      if (scores.IR >= 0.6 * maxScore) {
        primaryKey = "IR";
      } else {
        primaryKey = sorted[0][0];
      }

      // Secondary
      const remaining = sorted.filter(([k]) => k !== primaryKey);
      if (remaining.length > 0) {
        secondaryKey = remaining[0][0];
        const primaryScore = scores[primaryKey];
        showSec = remaining[0][1] >= 0.75 * primaryScore && remaining[0][1] > 0;
      }
    }

    const showPostPill =
      flags.postpill &&
      scores.PP > 0 &&
      primaryKey !== "PP" &&
      (!showSec || secondaryKey !== "PP");

    return {
      primary: primaryKey,
      secondary: secondaryKey,
      showSecondary: showSec,
      showPostPillNote: showPostPill,
    };
  }, [scores, flags]);

  const primaryData = TYPE_DATA[primary];
  const secondaryData = secondary ? TYPE_DATA[secondary] : null;

  // Build focus areas
  const focusItems = [
    ...primaryData.focusareas,
    ...(showSecondary && secondaryData ? [secondaryData.focusareas[0]] : []),
  ];

  const goalIntroLine = getGoalIntroLine(userGoal);

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col px-5 pb-[100px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <p className="text-label mt-8" style={{ color: "hsl(var(--primary))" }}>
            YOUR RESULTS
          </p>
          <h1
            className="font-display mt-2"
            style={{ fontSize: "32px", fontWeight: 700, color: "var(--text-ink)", lineHeight: 1.2 }}
          >
            We've mapped your symptom pattern.
          </h1>
          <div
            className="mt-3"
            style={{ width: 56, height: 4, backgroundColor: "hsl(var(--accent))", borderRadius: 2 }}
          />

          {/* Goal-based intro line */}
          <p
            className="font-body mt-[14px]"
            style={{ fontSize: "15px", color: "var(--text-body)", lineHeight: 1.65 }}
          >
            {goalIntroLine}
          </p>

          {/* Primary card */}
          <div
            className="bg-card mt-6 p-6"
            style={{ borderRadius: 20, boxShadow: "var(--shadow-hero)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-label" style={{ color: "var(--text-muted)" }}>
                PRIMARY PATTERN
              </span>
              <span
                className="font-body px-3 py-1 rounded-full"
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  backgroundColor: "hsl(var(--primary))",
                  color: "white",
                }}
              >
                {primaryData.tag}
              </span>
            </div>
            <h2
              className="font-display mt-[10px]"
              style={{ fontSize: "30px", fontWeight: 700, color: "hsl(var(--primary))" }}
            >
              {primaryData.name}
            </h2>
            <p
              className="font-body mt-3"
              style={{ fontSize: "15px", color: "var(--text-body)", lineHeight: 1.65 }}
            >
              {primaryData.description}
            </p>
          </div>

          {/* Secondary card */}
          {showSecondary && secondaryData && (
            <div
              className="bg-card mt-3 p-5"
              style={{ borderRadius: 18, boxShadow: "var(--shadow-card)" }}
            >
              <span className="text-label" style={{ color: "var(--text-muted)" }}>
                ALSO PRESENT
              </span>
              <h3
                className="font-display mt-[6px]"
                style={{ fontSize: "22px", fontWeight: 700, color: "var(--text-ink)" }}
              >
                {secondaryData.name}
              </h3>
              <p
                className="font-body mt-[6px]"
                style={{ fontSize: "14px", color: "var(--text-body)", lineHeight: 1.6 }}
              >
                {secondaryData.secondarySummary}
              </p>
            </div>
          )}

          {/* Post-pill note */}
          {showPostPillNote && (
            <div
              className="mt-3 p-[18px]"
              style={{
                borderRadius: 18,
                backgroundColor: "hsl(var(--amber-bg))",
              }}
            >
              <p
                className="font-body"
                style={{ fontSize: "14px", color: "hsl(var(--amber-text))", lineHeight: 1.6 }}
              >
                You recently stopped the pill. Your body may take 3–6 months to recalibrate, and we'll factor this into your plan throughout.
              </p>
            </div>
          )}

          {/* Focus areas */}
          <div
            className="bg-card mt-3 p-5"
            style={{ borderRadius: 18, boxShadow: "var(--shadow-card)" }}
          >
            <p className="text-label mb-[14px]" style={{ color: "hsl(var(--primary))" }}>
              YOUR FOCUS AREAS
            </p>
            {focusItems.map((item, i) => (
              <div key={i}>
                {i > 0 && (
                  <div className="border-t border-border" />
                )}
                <div className="flex items-start gap-3 py-3">
                  <span
                    className="mt-[7px] flex-shrink-0 rounded-full"
                    style={{
                      width: 6,
                      height: 6,
                      backgroundColor: "hsl(var(--accent))",
                    }}
                  />
                  <span
                    className="font-body"
                    style={{ fontSize: "15px", fontWeight: 500, color: "var(--text-ink)" }}
                  >
                    {item}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Test flag */}
          {(flags.oldtest || flags.notested) && (
            <div
              className="mt-3 p-[18px]"
              style={{ borderRadius: 18, backgroundColor: "hsl(var(--amber-bg))" }}
            >
              <p className="text-label mb-[6px]" style={{ color: "hsl(var(--amber-text))" }}>
                HEADS UP
              </p>
              <p
                className="font-body"
                style={{ fontSize: "14px", color: "hsl(var(--amber-text))", lineHeight: 1.6 }}
              >
                Your last test was a while ago. For the clearest picture, ask your doctor for: fasting insulin, testosterone, DHEA-S, and CRP. We'll remind you what to ask.
              </p>
              <p
                className="font-body italic mt-2"
                style={{ fontSize: "12px", color: "hsl(var(--amber-text))" }}
              >
                You can use Cystless fully without recent test results.
              </p>
            </div>
          )}

          {/* Thyroid flag */}
          {flags.thyroid && (
            <div
              className="mt-3 p-[18px]"
              style={{ borderRadius: 18, backgroundColor: "hsl(var(--primary-light))" }}
            >
              <p
                className="font-body"
                style={{ fontSize: "14px", color: "hsl(var(--primary))", lineHeight: 1.6 }}
              >
                You mentioned thyroid history. Thyroid dysfunction and PCOS often overlap, so we'll flag this where it's relevant in your plan.
              </p>
            </div>
          )}

          {/* Clinical note */}
          <div
            className="bg-card mt-3 p-[18px]"
            style={{ borderRadius: 18, boxShadow: "var(--shadow-card)" }}
          >
            <p className="text-label mb-2" style={{ color: "var(--text-muted)" }}>
              HOW THIS MAPS CLINICALLY
            </p>
            <p
              className="font-body"
              style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}
            >
              {primaryData.clinicalnote}
            </p>
          </div>

          {/* Disclaimer */}
          <p
            className="font-body italic text-center mt-4 px-5"
            style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.6 }}
          >
            This is a symptom-based pattern, not a clinical diagnosis. Cystless is a wellness companion. Always work with your healthcare provider for clinical decisions.
          </p>
        </motion.div>

        {/* Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-center">
          <div className="w-full max-w-[390px] px-5 pb-5 pt-3 bg-background">
            <button
              onClick={() => navigate("/home")}
              className="w-full h-[58px] rounded-[18px] font-body relative flex items-center justify-center"
              style={{
                fontSize: "16px",
                fontWeight: 600,
                backgroundColor: "hsl(var(--primary))",
                color: "white",
              }}
            >
              See My Personalised Plan
              <ArrowRight className="absolute right-5 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
