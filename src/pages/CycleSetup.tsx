import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuiz, calculateCycleInfo, CycleStatus, PostPillStage } from "@/context/QuizContext";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, subDays } from "date-fns";
import { cn } from "@/lib/utils";
import { useUserProfile } from "@/hooks/useUserProfile";

const cycleLengths = [21, 24, 26, 28, 30, 32, 35];

type Step = "period_check" | "recent_period" | "irregular" | "post_pill" | "health" | "summary";

const Dot = ({ active }: { active: boolean }) => (
  <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: active ? "hsl(var(--primary))" : "hsl(var(--border))", display: "inline-block" }} />
);

const ProgressDots = ({ stepNum }: { stepNum: number }) => (
  <div className="flex justify-center gap-2" style={{ marginTop: 20 }}>
    <Dot active={stepNum >= 1} /><Dot active={stepNum >= 2} /><Dot active={stepNum >= 3} />
  </div>
);

const CystaNote = ({ text }: { text: string }) => (
  <div className="bg-card flex items-start" style={{ borderRadius: 16, padding: 16, boxShadow: "var(--shadow-card)", marginTop: 16 }}>
    <div className="flex items-center justify-center flex-shrink-0 font-display" style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "hsl(var(--primary))", color: "white", fontSize: 14, fontWeight: 700 }}>C</div>
    <p className="font-body" style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.6, marginLeft: 12 }}>{text}</p>
  </div>
);

const OptionCard = ({ selected, children, onClick }: { selected: boolean; children: React.ReactNode; onClick: () => void }) => (
  <button onClick={onClick} className="w-full bg-card text-left" style={{
    borderRadius: 18, padding: 20, boxShadow: "var(--shadow-card)", marginBottom: 12,
    borderLeft: selected ? "4px solid hsl(var(--primary))" : "4px solid transparent",
    backgroundColor: selected ? "#EAF3F3" : "white",
  }}>
    {children}
  </button>
);

const pillStyle = (active: boolean): React.CSSProperties => ({
  width: 44, height: 36, borderRadius: 8, fontSize: 14, fontWeight: 600,
  fontFamily: "var(--font-body)",
  backgroundColor: active ? "hsl(var(--primary))" : "white",
  color: active ? "white" : "var(--text-muted)",
  border: active ? "none" : "1.5px solid hsl(var(--border))",
  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
});

const unitPillStyle = (active: boolean): React.CSSProperties => ({
  padding: "8px 18px", borderRadius: 100, fontSize: 13, fontWeight: 600,
  fontFamily: "var(--font-body)",
  backgroundColor: active ? "hsl(var(--primary))" : "white",
  color: active ? "white" : "var(--text-ink)",
  border: active ? "none" : "1.5px solid hsl(var(--border))",
  cursor: "pointer",
});

const inputStyle: React.CSSProperties = {
  width: "100%", height: 52, borderRadius: 14, border: "1.5px solid hsl(var(--border))",
  padding: "0 16px", fontSize: 15, fontFamily: "var(--font-body)", color: "var(--text-ink)",
  backgroundColor: "white", outline: "none",
};

const goalLabels: Record<string, string> = {
  symptoms: "Manage my symptoms", cycle: "Regulate my cycle", fertility: "Improve my fertility",
  weight: "Lose weight sustainably", understand: "Understand my body", feel_better: "Feel better",
  new_diagnosis: "Navigate new diagnosis",
};

const CycleSetup = () => {
  const navigate = useNavigate();
  const { setCycleInfo, setCycleStatus, setPostPillInfo, clearCycleInfo, setBiometrics, userGoal, scores } = useQuiz();

  const [step, setStep] = useState<Step>("period_check");
  const [periodAnswer, setPeriodAnswer] = useState<string | null>(null);

  // Step 1B
  const [periodDate, setPeriodDate] = useState<Date>(subDays(new Date(), 14));
  const [cycleLength, setCycleLength] = useState(28);

  // Step 1C
  const [irregularAnswer, setIrregularAnswer] = useState<string | null>(null);

  // Step 1D
  const [postPillAnswer, setPostPillAnswer] = useState<string | null>(null);

  // Step 2
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");

  const cycleInfo = useMemo(() => calculateCycleInfo(periodDate, cycleLength), [periodDate, cycleLength]);

  const stepNum = step === "period_check" || step === "recent_period" || step === "irregular" || step === "post_pill" ? 1 : step === "health" ? 2 : 3;

  const handlePeriodNext = () => {
    if (periodAnswer === "yes") setStep("recent_period");
    else if (periodAnswer === "no" || periodAnswer === "unsure") setStep("irregular");
    else if (periodAnswer === "post_pill") setStep("post_pill");
  };

  const handleStep1Complete = () => {
    if (step === "recent_period") {
      setCycleInfo(periodDate, cycleLength);
    }
    setStep("health");
  };

  const handleIrregularNext = () => {
    if (!irregularAnswer) return;
    const statusMap: Record<string, CycleStatus> = {
      "1-3": "irregular_short", "3-6": "irregular_medium",
      "6+": "irregular_long", "never": "never_regular",
    };
    setCycleStatus(statusMap[irregularAnswer]!, irregularAnswer);
    setStep("health");
  };

  const handlePostPillNext = () => {
    if (!postPillAnswer) return;
    const stageMap: Record<string, PostPillStage> = {
      "<1": "very_recent", "1-3": "recent", "3-6": "recovering", "6+": "late_recovery",
    };
    setPostPillInfo(stageMap[postPillAnswer]!);
    setStep("health");
  };

  const handleHealthNext = () => {
    if (age || height || weight) {
      setBiometrics({ userAge: age, userHeight: height, userWeight: weight, userHeightUnit: heightUnit, userWeightUnit: weightUnit });
    }
    setStep("summary");
  };

  const handleFinish = () => navigate("/home");

  const getCycleStatusLabel = () => {
    if (step === "recent_period" || periodAnswer === "yes") {
      return `Day ${cycleInfo.currentCycleDay} · ${cycleInfo.currentPhase} Phase`;
    }
    if (irregularAnswer === "1-3") return "Irregular · Tracking in progress";
    if (irregularAnswer === "3-6") return "Irregular · 3-6 months";
    if (irregularAnswer === "6+" || irregularAnswer === "never") return "Cycle monitoring needed";
    if (postPillAnswer) return "Post-pill recovery";
    return "Not set";
  };

  // Determine primary pattern name from scores
  const entries = Object.entries(scores) as [string, number][];
  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  const primaryPattern = sorted[0]?.[1] > 0 ? {
    IR: "Insulin Resistance", AD: "Adrenal", IN: "Inflammatory", PP: "Post-Pill"
  }[sorted[0][0]] || "Insulin Resistance" : "Insulin Resistance";

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col px-5 pb-10 overflow-y-auto">
        <button onClick={() => {
          if (step === "period_check") navigate(-1);
          else if (step === "recent_period" || step === "irregular" || step === "post_pill") setStep("period_check");
          else if (step === "health") {
            if (periodAnswer === "yes") setStep("recent_period");
            else if (periodAnswer === "no" || periodAnswer === "unsure") setStep("irregular");
            else if (periodAnswer === "post_pill") setStep("post_pill");
            else setStep("period_check");
          }
          else if (step === "summary") setStep("health");
        }} className="pt-6 pb-3 self-start">
          <ArrowLeft className="h-5 w-5" style={{ color: "var(--text-muted)" }} />
        </button>
        <ProgressDots stepNum={stepNum} />

        <AnimatePresence mode="wait">
          {/* ═══ STEP 1: PERIOD CHECK ═══ */}
          {step === "period_check" && (
            <motion.div key="check" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <p className="font-body" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.8, color: "hsl(var(--primary))", fontWeight: 700, marginTop: 24 }}>YOUR CYCLE</p>
              <h1 className="font-display" style={{ fontSize: 28, fontWeight: 800, color: "var(--text-ink)", lineHeight: 1.2, marginTop: 10 }}>Did you have a period in the last 60 days?</h1>
              <div style={{ width: 48, height: 4, backgroundColor: "hsl(var(--accent))", borderRadius: 2, marginTop: 12 }} />
              <p className="font-body" style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6, marginTop: 12, marginBottom: 28 }}>No judgment, this helps Cysta understand where your cycle is right now.</p>

              <OptionCard selected={periodAnswer === "yes"} onClick={() => setPeriodAnswer("yes")}>
                <p className="font-body" style={{ fontSize: 15, fontWeight: 600, color: "var(--text-ink)" }}>Yes, I had a period in the last 60 days</p>
              </OptionCard>
              <OptionCard selected={periodAnswer === "no"} onClick={() => setPeriodAnswer("no")}>
                <p className="font-body" style={{ fontSize: 15, fontWeight: 600, color: "var(--text-ink)" }}>No, it's been longer than 60 days</p>
              </OptionCard>
              <OptionCard selected={periodAnswer === "post_pill"} onClick={() => setPeriodAnswer("post_pill")}>
                <p className="font-body" style={{ fontSize: 15, fontWeight: 600, color: "var(--text-ink)" }}>I'm post-pill, my period hasn't returned yet</p>
              </OptionCard>
              <OptionCard selected={periodAnswer === "unsure"} onClick={() => setPeriodAnswer("unsure")}>
                <p className="font-body" style={{ fontSize: 15, fontWeight: 600, color: "var(--text-ink)" }}>I'm not sure</p>
              </OptionCard>

              <button disabled={!periodAnswer} onClick={handlePeriodNext} className="w-full font-body" style={{
                height: 58, borderRadius: 18, backgroundColor: periodAnswer ? "hsl(var(--primary))" : "var(--disabled)", color: periodAnswer ? "white" : "var(--text-muted)", fontSize: 16, fontWeight: 600, marginTop: 16,
              }}>Continue →</button>
            </motion.div>
          )}

          {/* ═══ STEP 1B: RECENT PERIOD ═══ */}
          {step === "recent_period" && (
            <motion.div key="recent" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h1 className="font-display" style={{ fontSize: 28, fontWeight: 800, color: "var(--text-ink)", lineHeight: 1.2, marginTop: 24 }}>When did your last period start?</h1>
              <p className="font-body" style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 8, marginBottom: 24 }}>Pick the first day of your most recent period.</p>

              <div className="bg-card" style={{ borderRadius: 18, padding: 20, boxShadow: "var(--shadow-card)" }}>
                <p className="font-body" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "var(--text-muted)", marginBottom: 12 }}>FIRST DAY OF LAST PERIOD</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-full text-left font-body" style={{ height: 52, borderRadius: 14, border: "1.5px solid hsl(var(--border))", padding: "0 16px", fontSize: 15, color: "var(--text-ink)", backgroundColor: "white" }}>
                      {format(periodDate, "PPP")}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={periodDate} onSelect={(d) => d && setPeriodDate(d)} disabled={(date) => date > new Date()} initialFocus className={cn("p-3 pointer-events-auto")} />
                  </PopoverContent>
                </Popover>
              </div>

              <div style={{ marginTop: 20 }}>
                <p className="font-body" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "var(--text-muted)", marginBottom: 10 }}>AVERAGE CYCLE LENGTH</p>
                <div className="flex gap-2 flex-wrap">
                  {cycleLengths.map((n) => (<button key={n} style={pillStyle(cycleLength === n)} onClick={() => setCycleLength(n)}>{n}</button>))}
                </div>
                <p className="font-body italic" style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>Not sure? Keep 28, you can update as you track.</p>
              </div>

              <div style={{ backgroundColor: "#EAF3F3", borderRadius: 16, padding: 16, marginTop: 20 }}>
                <p className="font-body" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "hsl(var(--primary))", fontWeight: 700, marginBottom: 6 }}>YOU ARE ON</p>
                <p className="font-display" style={{ fontSize: 22, fontWeight: 800, color: "var(--text-ink)" }}>Day {cycleInfo.currentCycleDay} · {cycleInfo.currentPhase} Phase</p>
                <p className="font-body" style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{cycleInfo.daysRemainingInPhase} day{cycleInfo.daysRemainingInPhase !== 1 ? "s" : ""} remaining in this phase.</p>
              </div>

              <button onClick={handleStep1Complete} className="w-full font-body" style={{ height: 58, borderRadius: 18, backgroundColor: "hsl(var(--primary))", color: "white", fontSize: 16, fontWeight: 600, marginTop: 20 }}>Continue →</button>
            </motion.div>
          )}

          {/* ═══ STEP 1C: IRREGULAR ═══ */}
          {step === "irregular" && (
            <motion.div key="irreg" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h1 className="font-display" style={{ fontSize: 28, fontWeight: 800, color: "var(--text-ink)", lineHeight: 1.2, marginTop: 24 }}>How long has it been since your last period?</h1>
              <p className="font-body" style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 8, marginBottom: 24 }}>Approximate is fine, we just need a rough idea.</p>

              {[
                { id: "1-3", label: "1-3 months ago" },
                { id: "3-6", label: "3-6 months ago" },
                { id: "6+", label: "6+ months ago" },
                { id: "never", label: "I've never had a regular period" },
              ].map((o) => (
                <OptionCard key={o.id} selected={irregularAnswer === o.id} onClick={() => setIrregularAnswer(o.id)}>
                  <p className="font-body" style={{ fontSize: 15, fontWeight: 600, color: "var(--text-ink)" }}>{o.label}</p>
                </OptionCard>
              ))}

              {irregularAnswer === "1-3" && (
                <CystaNote text="Irregular cycles are one of the most common PCOS symptoms. You're not alone in this. I'll track your cycle as data comes in and won't show you a phase until we have enough to be accurate." />
              )}
              {irregularAnswer === "3-6" && (
                <CystaNote text="That's worth noting. Cycles missing for 3-6 months can sometimes signal something your doctor should know about. I'll flag this gently in your plan, but let's keep going for now." />
              )}
              {(irregularAnswer === "6+" || irregularAnswer === "never") && (
                <>
                  <CystaNote text="Thank you for telling me. I know that's not easy to share. This is important information. I'd gently encourage you to mention this to your doctor if you haven't already. I won't show a fake phase. Instead I'll track patterns from your daily logs over time." />
                  <div style={{ backgroundColor: "#FFF8ED", borderRadius: 14, padding: 16, marginTop: 12 }}>
                    <p className="font-body" style={{ fontSize: 14, color: "#92400E", lineHeight: 1.6 }}>⚠ Cycles missing for 6+ months may need clinical attention. This is not a diagnosis, just a gentle nudge to check in with your healthcare provider.</p>
                  </div>
                </>
              )}

              <button disabled={!irregularAnswer} onClick={handleIrregularNext} className="w-full font-body" style={{
                height: 58, borderRadius: 18, backgroundColor: irregularAnswer ? "hsl(var(--primary))" : "var(--disabled)", color: irregularAnswer ? "white" : "var(--text-muted)", fontSize: 16, fontWeight: 600, marginTop: 20,
              }}>Continue →</button>
            </motion.div>
          )}

          {/* ═══ STEP 1D: POST-PILL ═══ */}
          {step === "post_pill" && (
            <motion.div key="pill" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h1 className="font-display" style={{ fontSize: 28, fontWeight: 800, color: "var(--text-ink)", lineHeight: 1.2, marginTop: 24 }}>Post-pill recovery</h1>
              <div style={{ width: 48, height: 4, backgroundColor: "hsl(var(--accent))", borderRadius: 2, marginTop: 12 }} />
              <div className="bg-card" style={{ borderRadius: 18, padding: 20, boxShadow: "var(--shadow-card)", marginTop: 20 }}>
                <p className="font-body" style={{ fontSize: 15, fontWeight: 600, color: "var(--text-ink)", marginBottom: 12 }}>When did you stop taking the pill?</p>
                {[
                  { id: "<1", label: "Less than 1 month ago" },
                  { id: "1-3", label: "1-3 months ago" },
                  { id: "3-6", label: "3-6 months ago" },
                  { id: "6+", label: "Over 6 months ago" },
                ].map((o) => (
                  <OptionCard key={o.id} selected={postPillAnswer === o.id} onClick={() => setPostPillAnswer(o.id)}>
                    <p className="font-body" style={{ fontSize: 15, fontWeight: 600, color: "var(--text-ink)" }}>{o.label}</p>
                  </OptionCard>
                ))}
              </div>

              {postPillAnswer && (
                <CystaNote text="Post-pill recovery is real. Your body is recalibrating its own hormone production after relying on synthetic hormones. This can take 3-12 months. I won't show a cycle phase until your period returns. Instead your plan will focus on supporting natural hormone recovery." />
              )}

              <button disabled={!postPillAnswer} onClick={handlePostPillNext} className="w-full font-body" style={{
                height: 58, borderRadius: 18, backgroundColor: postPillAnswer ? "hsl(var(--primary))" : "var(--disabled)", color: postPillAnswer ? "white" : "var(--text-muted)", fontSize: 16, fontWeight: 600, marginTop: 20,
              }}>Continue →</button>
            </motion.div>
          )}

          {/* ═══ STEP 2: HEALTH CONTEXT ═══ */}
          {step === "health" && (
            <motion.div key="health" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <p className="font-body" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.8, color: "hsl(var(--primary))", fontWeight: 700, marginTop: 24 }}>ABOUT YOU</p>
              <h1 className="font-display" style={{ fontSize: 28, fontWeight: 800, color: "var(--text-ink)", lineHeight: 1.2, marginTop: 10 }}>A little context helps Cysta personalise your plan.</h1>
              <div style={{ width: 48, height: 4, backgroundColor: "hsl(var(--accent))", borderRadius: 2, marginTop: 12 }} />
              <p className="font-body" style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 12, marginBottom: 24 }}>All optional. Used only as health signals, never for appearance, never shared.</p>

              <div className="bg-card" style={{ borderRadius: 18, padding: 20, boxShadow: "var(--shadow-card)" }}>
                <label className="font-body block" style={{ fontSize: 11, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6, letterSpacing: 1 }}>YOUR AGE</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 28" style={inputStyle} />
                <p className="font-body italic" style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>PCOS management changes significantly across your 20s, 30s and beyond.</p>

                <div style={{ height: 1, backgroundColor: "hsl(var(--border))", margin: "16px 0" }} />

                <label className="font-body block" style={{ fontSize: 11, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6, letterSpacing: 1 }}>YOUR HEIGHT (OPTIONAL)</label>
                <div className="flex gap-2 mb-2">
                  <button style={unitPillStyle(heightUnit === "cm")} onClick={() => setHeightUnit("cm")}>cm</button>
                  <button style={unitPillStyle(heightUnit === "ft")} onClick={() => setHeightUnit("ft")}>ft·in</button>
                </div>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder={heightUnit === "cm" ? "e.g. 163 cm" : "e.g. 5.4 ft"} style={inputStyle} />
                <p className="font-body italic" style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>Helps contextualise your metabolic health signals.</p>

                <div style={{ height: 1, backgroundColor: "hsl(var(--border))", margin: "16px 0" }} />

                <label className="font-body block" style={{ fontSize: 11, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6, letterSpacing: 1 }}>YOUR WEIGHT (OPTIONAL)</label>
                <div className="flex gap-2 mb-2">
                  <button style={unitPillStyle(weightUnit === "kg")} onClick={() => setWeightUnit("kg")}>kg</button>
                  <button style={unitPillStyle(weightUnit === "lbs")} onClick={() => setWeightUnit("lbs")}>lbs</button>
                </div>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder={weightUnit === "kg" ? "e.g. 68 kg" : "e.g. 150 lbs"} style={inputStyle} />
                <div style={{ backgroundColor: "#FCECEA", borderRadius: 14, padding: 14, marginTop: 8 }}>
                  <p className="font-body" style={{ fontSize: 13, color: "hsl(var(--accent))", lineHeight: 1.5 }}>This is never about appearance. Weight affects insulin resistance and inflammation signals, that's the only reason we ask.</p>
                </div>
              </div>

              <button onClick={handleHealthNext} className="w-full font-body" style={{ height: 58, borderRadius: 18, backgroundColor: "hsl(var(--primary))", color: "white", fontSize: 16, fontWeight: 600, marginTop: 28 }}>
                {age ? "Almost there →" : "Skip for now →"}
              </button>
              {age && (
                <button onClick={() => { setStep("summary"); }} className="w-full font-body" style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 12, textAlign: "center" }}>Skip for now →</button>
              )}
            </motion.div>
          )}

          {/* ═══ STEP 3: SUMMARY ═══ */}
          {step === "summary" && (
            <motion.div key="summary" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <p className="font-body" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.8, color: "hsl(var(--primary))", fontWeight: 700, marginTop: 24 }}>YOU'RE ALL SET</p>
              <h1 className="font-display" style={{ fontSize: 28, fontWeight: 800, color: "var(--text-ink)", lineHeight: 1.2, marginTop: 10 }}>Cysta knows enough to get started.</h1>
              <div style={{ width: 48, height: 4, backgroundColor: "hsl(var(--accent))", borderRadius: 2, marginTop: 12 }} />

              <div className="bg-card" style={{ borderRadius: 18, padding: 20, boxShadow: "var(--shadow-hero)", marginTop: 24 }}>
                <p className="font-body" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "hsl(var(--primary))", fontWeight: 700, marginBottom: 16 }}>YOUR PROFILE</p>
                {[
                  { label: "PCOS Pattern", value: primaryPattern },
                  { label: "Your Goal", value: goalLabels[userGoal || ""] || "Not set" },
                  { label: "Cycle Status", value: getCycleStatusLabel() },
                  { label: "Age", value: age || "Not set" },
                ].map((row, i, arr) => (
                  <div key={row.label}>
                    <div className="flex justify-between py-3">
                      <span className="font-body" style={{ fontSize: 13, color: "var(--text-muted)" }}>{row.label}</span>
                      <span className="font-body" style={{ fontSize: 13, fontWeight: 600, color: "var(--text-ink)" }}>{row.value}</span>
                    </div>
                    {i < arr.length - 1 && <div style={{ height: 1, backgroundColor: "hsl(var(--border))" }} />}
                  </div>
                ))}
              </div>

              <div style={{ backgroundColor: "#EAF3F3", borderRadius: 18, padding: 18, marginTop: 16 }} className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 font-display" style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "hsl(var(--primary))", color: "white", fontSize: 16, fontWeight: 700 }}>C</div>
                <p className="font-body" style={{ fontSize: 14, color: "hsl(var(--primary))", lineHeight: 1.6, marginLeft: 12 }}>
                  Hey Vrushali 💚 I've got everything I need to get started. Your plan is ready and I'll get smarter the more you log. Let's go.
                </p>
              </div>

              <button onClick={handleFinish} className="w-full font-body" style={{ height: 58, borderRadius: 18, backgroundColor: "hsl(var(--primary))", color: "white", fontSize: 16, fontWeight: 600, marginTop: 28 }}>Take me to my plan →</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CycleSetup;
