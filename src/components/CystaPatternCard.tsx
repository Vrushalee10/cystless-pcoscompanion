import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CystaPatternCardProps {
  title: string;
  onDismiss?: () => void;
  children?: React.ReactNode;
}

const actions = [
  "Aim for 7-8hrs tonight. Your plan has a wind-down reminder set for 9:30pm",
  "A magnesium-rich snack before bed reduces overnight cortisol and improves sleep quality",
  "Tomorrow morning: protein breakfast within 30 mins of waking to reset blood sugar",
];

const CystaPatternCard = ({ title, onDismiss, children }: CystaPatternCardProps) => {
  const [dismissed, setDismissed] = useState(false);

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, padding: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            backgroundColor: "#EAF3F3",
            borderRadius: 16,
            padding: 18,
          }}
        >
          <p className="font-body uppercase" style={{ fontSize: 11, color: "hsl(var(--primary))", marginBottom: 12 }}>
            {title}
          </p>

          {/* Section 1 — What I Noticed */}
          <p className="font-body uppercase" style={{ fontSize: 10, color: "#6B7280", marginBottom: 6 }}>
            WHAT I NOTICED
          </p>
          <p className="font-body" style={{ fontSize: 14, color: "hsl(var(--primary))", lineHeight: 1.6 }}>
            Your energy and mood dip consistently on days when sleep drops below 7hrs. Sugar cravings have been higher the last 3 days, a classic luteal pattern for your insulin resistance type.
          </p>

          <div style={{ borderTop: "1px solid #E2DDD7", margin: "12px 0" }} />

          {/* Section 2 — Why This Matters */}
          <p className="font-body uppercase" style={{ fontSize: 10, color: "#6B7280", marginBottom: 6 }}>
            WHY THIS MATTERS
          </p>
          <p className="font-body" style={{ fontSize: 14, color: "hsl(var(--primary))", lineHeight: 1.6 }}>
            For your insulin resistance pattern, poor sleep directly worsens insulin sensitivity the next morning, making cravings stronger and energy harder to recover. This isn't random. It's a cycle that compounds if left unaddressed.
          </p>

          <div style={{ borderTop: "1px solid #E2DDD7", margin: "12px 0" }} />

          {/* Section 3 — What Will Help */}
          <p className="font-body uppercase" style={{ fontSize: 10, color: "hsl(var(--primary))", marginBottom: 8 }}>
            WHAT WILL HELP
          </p>
          <div className="flex flex-col gap-3">
            {actions.map((action, i) => (
              <div key={i} className="flex items-start gap-[10px]">
                <span
                  className="mt-[6px] shrink-0 rounded-full"
                  style={{ width: 6, height: 6, backgroundColor: "hsl(var(--primary))" }}
                />
                <span className="font-body" style={{ fontSize: 14, fontWeight: 500, color: "#111111", lineHeight: 1.5 }}>
                  {action}
                </span>
              </div>
            ))}
          </div>

          <p className="font-body italic" style={{ fontSize: 12, color: "#6B7280", marginTop: 12 }}>
            These suggestions are based on your logged patterns and your PCOS type, not generic advice.
          </p>

          <button
            onClick={handleDismiss}
            className="w-full font-body flex items-center justify-center rounded-[12px] transition-colors"
            style={{
              height: 40,
              marginTop: 14,
              fontSize: 14,
              fontWeight: 600,
              backgroundColor: "hsl(var(--primary))",
              color: "white",
            }}
          >
            Got it, Cysta 💚
          </button>

          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CystaPatternCard;
