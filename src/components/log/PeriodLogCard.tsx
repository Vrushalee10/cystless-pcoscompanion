import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCycleIntelligence } from "@/hooks/useCycleIntelligence";
import { useQuiz } from "@/context/QuizContext";

type PeriodStatus = "arrived_today" | "delayed" | "spotting" | null;
type PeriodFlow = "normal" | "heavier" | "lighter" | null;
type OngoingStatus = "still_going" | "ended_today" | "much_lighter" | null;

const PeriodLogCard = () => {
  const { periodDueWithin2Days, isInPeriod, delayStatus, daysLateOrEarly } = useCycleIntelligence();
  const { confirmPeriodArrived, confirmPeriodEnded } = useQuiz();

  const [periodStatus, setPeriodStatus] = useState<PeriodStatus>(null);
  const [periodFlow, setPeriodFlow] = useState<PeriodFlow>(null);
  const [ongoingStatus, setOngoingStatus] = useState<OngoingStatus>(null);
  const [showManualCard, setShowManualCard] = useState(false);

  const showConditionA = periodDueWithin2Days || delayStatus === "slightly_late" || delayStatus === "late" || delayStatus === "significantly_late" || delayStatus === "very_late";
  const showConditionB = isInPeriod && !showConditionA;
  const showConditionC = !showConditionA && !showConditionB;

  const handlePeriodStatusSelect = (status: PeriodStatus) => {
    setPeriodStatus(status);
    if (status === "arrived_today") {
      confirmPeriodArrived(new Date().toISOString().split("T")[0], null);
    }
  };

  const handleFlowSelect = (flow: PeriodFlow) => {
    setPeriodFlow(flow);
    if (flow) {
      confirmPeriodArrived(new Date().toISOString().split("T")[0], flow);
    }
  };

  const handleOngoingSelect = (status: OngoingStatus) => {
    setOngoingStatus(status);
    if (status === "ended_today") {
      confirmPeriodEnded(new Date().toISOString().split("T")[0]);
    }
  };

  const pillStyle = (selected: boolean) => ({
    width: "100%" as const,
    height: 48,
    borderRadius: 14,
    fontSize: 14,
    fontWeight: 600 as const,
    backgroundColor: selected ? "hsl(var(--primary))" : "white",
    color: selected ? "white" : "var(--text-body)",
    border: selected ? "none" : "1px solid hsl(var(--border))",
    marginBottom: 8,
    transition: "all 0.15s",
  });

  // Condition A: Period expected or late
  if (showConditionA && !showManualCard) {
    return (
      <div
        className="bg-card mt-3 p-[22px]"
        style={{
          borderRadius: 18,
          boxShadow: "var(--shadow-card)",
          borderLeft: "4px solid #D4614F",
        }}
      >
        <p className="font-body" style={{ fontSize: 11, textTransform: "uppercase", color: "#D4614F", fontWeight: 600, letterSpacing: 1.8, marginBottom: 8 }}>
          PERIOD CHECK
        </p>
        <p className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "var(--text-ink)", marginBottom: 14 }}>
          Has your period started?
          {daysLateOrEarly > 0 && (
            <span className="font-body block" style={{ fontSize: 13, fontWeight: 400, color: "var(--text-muted)", marginTop: 4 }}>
              {daysLateOrEarly === 1 ? "It's 1 day past your predicted date" : `It's ${daysLateOrEarly} days past your predicted date`}
            </span>
          )}
        </p>

        <button onClick={() => handlePeriodStatusSelect("arrived_today")} className="font-body w-full flex items-center justify-center" style={pillStyle(periodStatus === "arrived_today")}>
          Yes, it started today
        </button>
        <button onClick={() => handlePeriodStatusSelect("delayed")} className="font-body w-full flex items-center justify-center" style={pillStyle(periodStatus === "delayed")}>
          Not yet
        </button>
        <button onClick={() => handlePeriodStatusSelect("spotting")} className="font-body w-full flex items-center justify-center" style={pillStyle(periodStatus === "spotting")}>
          I had some spotting
        </button>

        <AnimatePresence>
          {periodStatus === "arrived_today" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <p className="font-body" style={{ fontSize: 14, fontWeight: 600, color: "var(--text-ink)", marginTop: 12, marginBottom: 10 }}>
                How does it feel so far?
              </p>
              <button onClick={() => handleFlowSelect("normal")} className="font-body w-full flex items-center justify-center" style={pillStyle(periodFlow === "normal")}>
                Normal for me
              </button>
              <button onClick={() => handleFlowSelect("heavier")} className="font-body w-full flex items-center justify-center" style={pillStyle(periodFlow === "heavier")}>
                Heavier than usual
              </button>
              <button onClick={() => handleFlowSelect("lighter")} className="font-body w-full flex items-center justify-center" style={pillStyle(periodFlow === "lighter")}>
                Lighter than usual
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {periodStatus === "delayed" && (
          <p className="font-body italic mt-2" style={{ fontSize: 13, color: "var(--text-muted)" }}>
            No worries — I'm keeping track. I'll check in again tomorrow.
          </p>
        )}
        {periodStatus === "spotting" && (
          <p className="font-body italic mt-2" style={{ fontSize: 13, color: "var(--text-muted)" }}>
            Noted. Spotting before your period can be normal with PCOS. I'll track this.
          </p>
        )}
      </div>
    );
  }

  // Condition B: Currently in period
  if (showConditionB) {
    return (
      <div
        className="bg-card mt-3 p-[22px]"
        style={{
          borderRadius: 18,
          boxShadow: "var(--shadow-card)",
          borderLeft: "4px solid #D4614F",
        }}
      >
        <p className="font-body" style={{ fontSize: 11, textTransform: "uppercase", color: "#D4614F", fontWeight: 600, letterSpacing: 1.8, marginBottom: 8 }}>
          HOW IS YOUR PERIOD TODAY?
        </p>
        <p className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "var(--text-ink)", marginBottom: 14 }}>
          Still going?
        </p>

        <button onClick={() => handleOngoingSelect("still_going")} className="font-body w-full flex items-center justify-center" style={pillStyle(ongoingStatus === "still_going")}>
          Yes, still going
        </button>
        <button onClick={() => handleOngoingSelect("ended_today")} className="font-body w-full flex items-center justify-center" style={pillStyle(ongoingStatus === "ended_today")}>
          It ended today
        </button>
        <button onClick={() => handleOngoingSelect("much_lighter")} className="font-body w-full flex items-center justify-center" style={pillStyle(ongoingStatus === "much_lighter")}>
          Much lighter now
        </button>

        {ongoingStatus === "ended_today" && (
          <p className="font-body italic mt-2" style={{ fontSize: 13, color: "var(--text-muted)" }}>
            Got it — period logged as complete. Your cycle tracking has been updated. 💚
          </p>
        )}
      </div>
    );
  }

  // Condition C: Normal day — subtle toggle
  if (showConditionC) {
    if (showManualCard) {
      return (
        <div
          className="bg-card mt-3 p-[22px]"
          style={{
            borderRadius: 18,
            boxShadow: "var(--shadow-card)",
            borderLeft: "4px solid #D4614F",
          }}
        >
          <p className="font-body" style={{ fontSize: 11, textTransform: "uppercase", color: "#D4614F", fontWeight: 600, letterSpacing: 1.8, marginBottom: 8 }}>
            PERIOD LOG
          </p>
          <p className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "var(--text-ink)", marginBottom: 14 }}>
            What's happening?
          </p>

          <button onClick={() => handlePeriodStatusSelect("arrived_today")} className="font-body w-full flex items-center justify-center" style={pillStyle(periodStatus === "arrived_today")}>
            My period started today
          </button>
          <button onClick={() => handlePeriodStatusSelect("spotting")} className="font-body w-full flex items-center justify-center" style={pillStyle(periodStatus === "spotting")}>
            I had some spotting
          </button>
          <button onClick={() => { setShowManualCard(false); setPeriodStatus(null); }} className="font-body w-full flex items-center justify-center" style={pillStyle(false)}>
            Cancel
          </button>

          <AnimatePresence>
            {periodStatus === "arrived_today" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                <p className="font-body" style={{ fontSize: 14, fontWeight: 600, color: "var(--text-ink)", marginTop: 12, marginBottom: 10 }}>
                  How does it feel so far?
                </p>
                <button onClick={() => handleFlowSelect("normal")} className="font-body w-full flex items-center justify-center" style={pillStyle(periodFlow === "normal")}>
                  Normal for me
                </button>
                <button onClick={() => handleFlowSelect("heavier")} className="font-body w-full flex items-center justify-center" style={pillStyle(periodFlow === "heavier")}>
                  Heavier than usual
                </button>
                <button onClick={() => handleFlowSelect("lighter")} className="font-body w-full flex items-center justify-center" style={pillStyle(periodFlow === "lighter")}>
                  Lighter than usual
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <button
        onClick={() => setShowManualCard(true)}
        className="font-body mt-3 w-full text-left"
        style={{ fontSize: 13, color: "#6B7280", padding: "10px 0" }}
      >
        + Log period or spotting
      </button>
    );
  }

  return null;
};

export default PeriodLogCard;
