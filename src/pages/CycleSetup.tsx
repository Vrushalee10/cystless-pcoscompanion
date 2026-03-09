import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuiz, calculateCycleInfo, CyclePhase } from "@/context/QuizContext";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const cycleLengths = [21, 24, 26, 28, 30, 32, 35];

const CycleSetup = () => {
  const navigate = useNavigate();
  const { setCycleInfo, clearCycleInfo } = useQuiz();
  const [periodDate, setPeriodDate] = useState<Date>(new Date());
  const [cycleLength, setCycleLength] = useState(28);

  const cycleInfo = useMemo(() => {
    return calculateCycleInfo(periodDate, cycleLength);
  }, [periodDate, cycleLength]);

  const handleContinue = () => {
    setCycleInfo(periodDate, cycleLength);
    navigate("/home");
  };

  const handleSkip = () => {
    clearCycleInfo();
    navigate("/home");
  };

  const pillStyle = (active: boolean): React.CSSProperties => ({
    width: 44,
    height: 36,
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "var(--font-body)",
    backgroundColor: active ? "hsl(var(--primary))" : "white",
    color: active ? "white" : "var(--text-muted)",
    border: active ? "none" : "1.5px solid hsl(var(--border))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  });

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col px-5 pb-10 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          {/* Header */}
          <div style={{ marginTop: 32 }}>
            <p className="font-body" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.8, color: "hsl(var(--primary))", fontWeight: 700 }}>
              ONE LAST THING
            </p>
            <h1 className="font-display" style={{ fontSize: 32, fontWeight: 800, color: "var(--text-ink)", lineHeight: 1.2, marginTop: 10 }}>
              When did your last period start?
            </h1>
            <div style={{ width: 48, height: 4, backgroundColor: "hsl(var(--accent))", borderRadius: 2, marginTop: 12 }} />
            <p className="font-body" style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.6, marginTop: 14, marginBottom: 32 }}>
              This is how Cysta knows what phase you're in and personalises everything accordingly.
            </p>
          </div>

          {/* Date picker card */}
          <div className="bg-card" style={{ borderRadius: 18, padding: 20, boxShadow: "var(--shadow-card)" }}>
            <p className="font-body" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "var(--text-muted)", marginBottom: 12 }}>
              FIRST DAY OF YOUR LAST PERIOD
            </p>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="w-full text-left font-body"
                  style={{
                    height: 52,
                    borderRadius: 14,
                    border: "1.5px solid hsl(var(--border))",
                    padding: "0 16px",
                    fontSize: 15,
                    color: "var(--text-ink)",
                    backgroundColor: "white",
                  }}
                >
                  {format(periodDate, "PPP")}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={periodDate}
                  onSelect={(d) => d && setPeriodDate(d)}
                  disabled={(date) => date > new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Cycle length */}
          <div style={{ marginTop: 20 }}>
            <p className="font-body" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "var(--text-muted)", marginBottom: 10 }}>
              AVERAGE CYCLE LENGTH
            </p>
            <div className="flex gap-2 flex-wrap">
              {cycleLengths.map((n) => (
                <button key={n} style={pillStyle(cycleLength === n)} onClick={() => setCycleLength(n)}>{n}</button>
              ))}
            </div>
            <p className="font-body italic" style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>
              Not sure? Keep 28, you can update this anytime in settings.
            </p>
          </div>

          {/* Live calculation */}
          <div style={{ backgroundColor: "#EAF3F3", borderRadius: 16, padding: 16, marginTop: 20 }}>
            <p className="font-body" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "hsl(var(--primary))", fontWeight: 700, marginBottom: 6 }}>
              YOU ARE ON
            </p>
            <p className="font-display" style={{ fontSize: 22, fontWeight: 800, color: "var(--text-ink)" }}>
              Day {cycleInfo.currentCycleDay} · {cycleInfo.currentPhase} Phase
            </p>
            <p className="font-body" style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
              Estimated {cycleInfo.daysRemainingInPhase} day{cycleInfo.daysRemainingInPhase !== 1 ? "s" : ""} remaining in this phase.
            </p>
          </div>

          {/* Cysta note */}
          <div className="bg-card flex items-start" style={{ borderRadius: 16, padding: 16, boxShadow: "var(--shadow-card)", marginTop: 16 }}>
            <div
              className="flex items-center justify-center flex-shrink-0 font-display"
              style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "hsl(var(--primary))", color: "white", fontSize: 14, fontWeight: 700 }}
            >
              C
            </div>
            <p className="font-body" style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.6, marginLeft: 12 }}>
              Got it. I'll track your cycle from here and let you know when phases are shifting, so you're never caught off guard.
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={handleContinue}
            className="w-full font-body"
            style={{ height: 58, borderRadius: 18, backgroundColor: "hsl(var(--primary))", color: "white", fontSize: 16, fontWeight: 600, marginTop: 28 }}
          >
            Take me to my plan →
          </button>

          <button
            onClick={handleSkip}
            className="w-full font-body"
            style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 12, marginBottom: 20, textAlign: "center" }}
          >
            Skip for now →
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CycleSetup;
