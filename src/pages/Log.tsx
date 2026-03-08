import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Plus, Minus, Mic, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";

const moods = ["😞", "😕", "😐", "🙂", "😊"];
const moodCopy = [
  "Noted. Tough days are data too.",
  "Got it. Let's see what else today tells us.",
  "Okay day, that's useful too.",
  "Good to hear, let's capture what's working.",
  "Strong day. Worth noting.",
];

const sleepHours = [4, 5, 6, 7, 8, 9, 10];

const foodMethods = [
  { id: "voice", emoji: "🎤", label: "Voice note" },
  { id: "photo", emoji: "📷", label: "Photo" },
  { id: "type", emoji: "✏️", label: "Type it" },
  { id: "quick", emoji: "⚡", label: "Quick select" },
];

const quickTags = [
  "Balanced day", "High sugar", "Skipped meals", "Lots of processed food",
  "Ate well", "Home cooked", "Late night eating", "Mindful day",
];

const symptomTags = [
  "Bloating", "Brain fog", "Sugar craving", "Fatigue after eating",
  "Headache", "Mood swings", "Cramps", "Anxiety", "Low energy",
];

const movementOptions = ["Rest day", "Walk", "Workout", "Gentle movement", "Yoga"];

const Log = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const startAtLayer2 = searchParams.get("layer") === "2";

  // Layer 1 — pre-fill if coming from quick log
  const [mood, setMood] = useState<number | null>(startAtLayer2 ? 3 : null);
  const [energy, setEnergy] = useState(startAtLayer2 ? 3 : 0);
  const [sleepH, setSleepH] = useState<number | null>(startAtLayer2 ? 7 : null);
  const [sleepQuality, setSleepQuality] = useState<"restful" | "broken" | null>(startAtLayer2 ? "restful" : null);

  // Layer 2
  const [foodMethod, setFoodMethod] = useState<string | null>(null);
  const [quickSelected, setQuickSelected] = useState<Set<string>>(new Set());
  const [typeText, setTypeText] = useState("");

  // Layer 3
  const [expanded, setExpanded] = useState(false);
  const [symptoms, setSymptoms] = useState<Set<string>>(new Set());
  const [movement, setMovement] = useState<string | null>(null);
  const [stress, setStress] = useState(0);
  const [notes, setNotes] = useState("");

  // Save state
  const [saving, setSaving] = useState(false);
  const [ack, setAck] = useState<string | null>(null);

  const layer1Complete = mood !== null && energy > 0 && sleepH !== null;

  const toggleQuickTag = (tag: string) => {
    setQuickSelected((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  };

  const toggleSymptom = (s: string) => {
    setSymptoms((prev) => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });
  };

  const getAckMessage = () => {
    if (mood !== null && mood <= 1 && sleepQuality === "broken")
      return "Rough night, that makes total sense for this phase. You showed up anyway. I've noted this.";
    if (mood !== null && mood >= 3 && sleepH !== null && sleepH >= 7)
      return "Solid. Sleep and mood both strong — this is what working with your cycle looks like.";
    if (quickSelected.has("High sugar"))
      return "Got it. I'll track how your energy compares tomorrow. No action needed now.";
    if (quickSelected.has("Skipped meals"))
      return "Noted — skipped meals can spike cortisol for your pattern. I'll flag if I see a trend.";
    return "Logged. Every day you show up is a day your body thanks you.";
  };

  const handleSave = () => {
    if (!layer1Complete) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setAck(getAckMessage());
    }, 500);
  };

  useEffect(() => {
    if (!ack) return;
    const t = setTimeout(() => {
      setAck(null);
      navigate("/home");
    }, 4000);
    return () => clearTimeout(t);
  }, [ack, navigate]);

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col px-5 pb-[100px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mt-5">
            <button onClick={() => navigate("/home")}>
              <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            </button>
            <h1
              className="font-display"
              style={{ fontSize: 32, fontWeight: 700, color: "var(--text-ink)" }}
            >
              Log Today
            </h1>
          </div>
          <p className="font-body mt-1" style={{ fontSize: 14, color: "var(--text-muted)" }}>
            Sunday, 8 March
          </p>
          <div
            className="mt-2 inline-block font-body"
            style={{
              fontSize: 13, fontWeight: 600,
              color: "hsl(var(--primary))", backgroundColor: "hsl(var(--primary-light))",
              padding: "5px 10px", borderRadius: 100,
            }}
          >
            Day 18 · Luteal Phase
          </div>

          {/* LAYER 1 */}
          <p className="text-label mt-6" style={{ color: "var(--text-muted)" }}>
            HOW ARE YOU TODAY?
          </p>

          {/* Mood */}
          <div className="bg-card mt-3 p-[22px]" style={{ borderRadius: 18, boxShadow: "var(--shadow-card)" }}>
            <p className="font-body" style={{ fontSize: 16, fontWeight: 600, color: "var(--text-ink)", marginBottom: 14 }}>
              How are you feeling?
            </p>
            <div className="flex justify-between">
              {moods.map((emoji, i) => (
                <button
                  key={i}
                  onClick={() => setMood(i)}
                  className="flex items-center justify-center"
                  style={{
                    width: 44, height: 44, fontSize: 28, borderRadius: "50%",
                    backgroundColor: mood === i ? "hsl(var(--primary-light))" : "transparent",
                    transition: "background-color 0.15s",
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {mood !== null && (
                <motion.p
                  key={mood}
                  className="font-body italic mt-3"
                  style={{ fontSize: 13, color: "var(--text-muted)" }}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {moodCopy[mood]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Energy */}
          <div className="bg-card mt-[10px] p-[22px]" style={{ borderRadius: 18, boxShadow: "var(--shadow-card)" }}>
            <p className="font-body" style={{ fontSize: 16, fontWeight: 600, color: "var(--text-ink)" }}>
              Energy level today
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => setEnergy(level)}
                  className="rounded-full transition-colors"
                  style={{
                    width: 14, height: 14,
                    backgroundColor: level <= energy ? "hsl(var(--primary))" : "hsl(var(--border))",
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-body" style={{ fontSize: 12, color: "var(--text-muted)" }}>Very low</span>
              <span className="font-body" style={{ fontSize: 12, color: "var(--text-muted)" }}>High</span>
            </div>
          </div>

          {/* Sleep */}
          <div className="bg-card mt-[10px] p-[22px]" style={{ borderRadius: 18, boxShadow: "var(--shadow-card)" }}>
            <p className="font-body" style={{ fontSize: 16, fontWeight: 600, color: "var(--text-ink)" }}>
              Sleep last night
            </p>
            <div className="flex gap-2 mt-3 justify-center">
              {sleepHours.map((h) => (
                <button
                  key={h}
                  onClick={() => setSleepH(h)}
                  className="font-body transition-colors"
                  style={{
                    width: 40, height: 36, borderRadius: 8, fontSize: 14, fontWeight: 600,
                    backgroundColor: sleepH === h ? "hsl(var(--primary))" : "white",
                    color: sleepH === h ? "white" : "var(--text-muted)",
                    border: sleepH === h ? "none" : "1px solid hsl(var(--border))",
                  }}
                >
                  {h}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-3 justify-center">
              {(["Restful", "Broken"] as const).map((q) => {
                const val = q.toLowerCase() as "restful" | "broken";
                const sel = sleepQuality === val;
                return (
                  <button
                    key={q}
                    onClick={() => setSleepQuality(val)}
                    className="font-body px-5 py-2 rounded-full transition-colors"
                    style={{
                      fontSize: 13, fontWeight: 600,
                      backgroundColor: sel ? "hsl(var(--primary))" : "white",
                      color: sel ? "white" : "var(--text-muted)",
                      border: sel ? "none" : "1px solid hsl(var(--border))",
                    }}
                  >
                    {q}
                  </button>
                );
              })}
            </div>
          </div>

          {/* LAYER 2 — Food */}
          <p className="text-label mt-7" style={{ color: "var(--text-muted)" }}>
            HOW DID YOU EAT TODAY?
          </p>
          <p className="font-body mt-1" style={{ fontSize: 13, color: "var(--text-muted)" }}>
            Any method works — whatever feels easiest right now.
          </p>

          <div className="grid grid-cols-2 gap-[10px] mt-3">
            {foodMethods.map((m) => {
              const sel = foodMethod === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setFoodMethod(sel ? null : m.id)}
                  className="bg-card flex flex-col items-center justify-center p-[18px] transition-all"
                  style={{
                    borderRadius: 14, boxShadow: "var(--shadow-card)",
                    border: sel ? "2px solid hsl(var(--primary))" : "2px solid transparent",
                    backgroundColor: sel ? "hsl(var(--primary-light))" : undefined,
                  }}
                >
                  <span style={{ fontSize: 24 }}>{m.emoji}</span>
                  <span className="font-body mt-[6px]" style={{ fontSize: 13, color: "var(--text-body)" }}>
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick select tags */}
          <AnimatePresence>
            {foodMethod === "quick" && (
              <motion.div
                className="flex flex-wrap gap-2 mt-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                {quickTags.map((tag) => {
                  const sel = quickSelected.has(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleQuickTag(tag)}
                      className="font-body rounded-[10px] transition-colors"
                      style={{
                        fontSize: 13, padding: "8px 12px",
                        backgroundColor: sel ? "hsl(var(--primary))" : "white",
                        color: sel ? "white" : "var(--text-muted)",
                        border: sel ? "none" : "1px solid hsl(var(--border))",
                      }}
                    >
                      {tag}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Type it textarea */}
          <AnimatePresence>
            {foodMethod === "type" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-3"
              >
                <textarea
                  rows={4}
                  placeholder="What did you eat today? Anything you noticed?"
                  value={typeText}
                  onChange={(e) => setTypeText(e.target.value)}
                  className="w-full font-body resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                  style={{
                    fontSize: 15, padding: 16, borderRadius: 14,
                    border: "1px solid hsl(var(--border))", backgroundColor: "white",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* LAYER 3 — Optional depth */}
          <div
            className="bg-card mt-[14px]"
            style={{ borderRadius: 18, boxShadow: "var(--shadow-card)", overflow: "hidden" }}
          >
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-between p-[18px]"
            >
              <span className="font-body" style={{ fontSize: 13, color: "var(--text-muted)" }}>
                ADD MORE DETAIL
              </span>
              {expanded ? (
                <Minus size={18} color="hsl(var(--primary))" />
              ) : (
                <Plus size={18} color="hsl(var(--primary))" />
              )}
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-[18px] pb-[18px]">
                    {/* Symptoms */}
                    <p className="font-body" style={{ fontSize: 14, fontWeight: 600, color: "var(--text-ink)", marginBottom: 10 }}>
                      Any symptoms today?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {symptomTags.map((s) => {
                        const sel = symptoms.has(s);
                        return (
                          <button
                            key={s}
                            onClick={() => toggleSymptom(s)}
                            className="font-body rounded-[10px] transition-colors"
                            style={{
                              fontSize: 13, padding: "8px 12px",
                              backgroundColor: sel ? "hsl(var(--accent))" : "white",
                              color: sel ? "white" : "var(--text-muted)",
                              border: sel ? "none" : "1px solid hsl(var(--border))",
                            }}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>

                    {/* Movement */}
                    <p className="font-body mt-4" style={{ fontSize: 14, fontWeight: 600, color: "var(--text-ink)" }}>
                      Movement today
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {movementOptions.map((m) => {
                        const sel = movement === m;
                        return (
                          <button
                            key={m}
                            onClick={() => setMovement(sel ? null : m)}
                            className="font-body rounded-full px-4 py-2 transition-colors"
                            style={{
                              fontSize: 13, fontWeight: 600,
                              backgroundColor: sel ? "hsl(var(--primary))" : "white",
                              color: sel ? "white" : "var(--text-muted)",
                              border: sel ? "none" : "1px solid hsl(var(--border))",
                            }}
                          >
                            {m}
                          </button>
                        );
                      })}
                    </div>

                    {/* Stress */}
                    <p className="font-body mt-4" style={{ fontSize: 14, fontWeight: 600, color: "var(--text-ink)" }}>
                      Stress today
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-3">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <button
                          key={level}
                          onClick={() => setStress(level)}
                          className="rounded-full transition-colors"
                          style={{
                            width: 14, height: 14,
                            backgroundColor: level <= stress ? "hsl(var(--primary))" : "hsl(var(--border))",
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="font-body" style={{ fontSize: 12, color: "var(--text-muted)" }}>Calm</span>
                      <span className="font-body" style={{ fontSize: 12, color: "var(--text-muted)" }}>Very stressed</span>
                    </div>

                    {/* Notes */}
                    <p className="font-body mt-4" style={{ fontSize: 14, fontWeight: 600, color: "var(--text-ink)" }}>
                      Anything else?
                    </p>
                    <div className="relative mt-2">
                      <textarea
                        rows={3}
                        placeholder="Tell me anything — how you're feeling, what happened, what you noticed..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full font-body resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                        style={{
                          fontSize: 15, padding: 16, borderRadius: 14,
                          border: "1px solid hsl(var(--border))", backgroundColor: "white",
                        }}
                      />
                      <Mic
                        size={18}
                        color="var(--text-muted)"
                        className="absolute top-4 right-4"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Save button */}
        <div className="sticky bottom-[64px] pb-4 pt-3 bg-background mt-auto z-10">
          <button
            disabled={!layer1Complete || saving}
            onClick={handleSave}
            className="w-full h-[58px] rounded-[18px] font-body flex items-center justify-center transition-colors"
            style={{
              fontSize: 16, fontWeight: layer1Complete ? 600 : 400,
              backgroundColor: layer1Complete ? "hsl(var(--primary))" : "var(--disabled)",
              color: layer1Complete ? "white" : "var(--text-muted)",
            }}
          >
            {saving ? (
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="block rounded-full bg-white/70"
                    style={{
                      width: 6, height: 6,
                      animation: "dotPulse 0.6s ease-in-out infinite",
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </span>
            ) : layer1Complete ? (
              "Save Today's Log"
            ) : (
              "Complete check-in to save"
            )}
          </button>
        </div>
      </div>

      {/* Acknowledgement card */}
      <AnimatePresence>
        {ack && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 flex justify-center z-[60]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={() => { setAck(null); navigate("/home"); }}
          >
            <div
              className="w-full max-w-[390px] p-[22px]"
              style={{
                backgroundColor: "hsl(var(--primary))",
                borderRadius: "22px 22px 0 0",
                color: "white",
              }}
            >
              <p className="font-body" style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.55 }}>
                {ack}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav active="log" />
    </div>
  );
};

export default Log;
