import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const moods = ["😞", "😕", "😐", "🙂", "😊"];
const sleepHours = [4, 5, 6, 7, 8, 9, 10];

type CheckInStep = "idle" | "mood" | "energy" | "sleep" | "nudge";

const InlineCheckIn = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<CheckInStep>("idle");
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [energy, setEnergy] = useState<number>(0);
  const [sleepHour, setSleepHour] = useState<number | null>(null);
  const [sleepQuality, setSleepQuality] = useState<"restful" | "broken" | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [logged, setLogged] = useState(false);
  const [showCysta, setShowCysta] = useState(false);

  const handleMoodSelect = (i: number) => {
    setSelectedMood(i);
    setTimeout(() => setStep("energy"), 500);
  };

  const handleEnergySelect = (level: number) => {
    setEnergy(level);
    setTimeout(() => setStep("sleep"), 500);
  };

  const canSave = sleepHour !== null && sleepQuality !== null;

  const handleSave = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setStep("nudge");
    }, 1500);
  };

  const handleDone = () => {
    setLogged(true);
    setStep("idle");
    setShowCysta(true);
    setTimeout(() => setShowCysta(false), 3000);
  };

  const handleTellMore = () => {
    setLogged(true);
    navigate("/log?layer=2");
  };

  const stepVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mt-7">
        <span className="text-label" style={{ color: "var(--text-muted)" }}>
          TODAY'S CHECK-IN
        </span>
        {step === "idle" && (
          <button
            onClick={() => !logged && setStep("mood")}
            className="font-body flex items-center gap-0.5"
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "hsl(var(--primary))",
              cursor: logged ? "default" : "pointer",
            }}
            disabled={logged}
          >
            {logged ? "Logged today ✓" : <>Quick log <ArrowRight className="h-3.5 w-3.5" /></>}
          </button>
        )}
      </div>

      {/* Single AnimatePresence — only one child visible at a time */}
      <AnimatePresence mode="wait">
        {step === "idle" && (
          <motion.div
            key="idle-cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="mt-3"
          >
            <div
              className="bg-card p-4"
              style={{ borderRadius: 14, boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center flex-1">
                  <span className="text-label" style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 8 }}>
                    MOOD
                  </span>
                  <div className="flex gap-1">
                    {moods.map((emoji, i) => (
                      <span
                        key={i}
                        className="flex items-center justify-center"
                        style={{
                          width: 32,
                          height: 32,
                          fontSize: 20,
                          borderRadius: "50%",
                          backgroundColor: logged && selectedMood === i ? "hsl(var(--primary-light))" : "transparent",
                        }}
                      >
                        {emoji}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  style={{ width: 1, height: 40, backgroundColor: "hsl(var(--border))" }}
                />
                <div className="flex flex-col items-center flex-1">
                  <span className="text-label" style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 8 }}>
                    ENERGY
                  </span>
                  <div className="flex gap-[6px] mt-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <span
                        key={level}
                        className="rounded-full"
                        style={{
                          width: 10,
                          height: 10,
                          backgroundColor: level <= energy ? "hsl(var(--primary))" : "hsl(var(--border))",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === "mood" && (
          <motion.div
            key="mood"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="bg-card mt-3 p-4"
            style={{ borderRadius: 14, boxShadow: "var(--shadow-card)" }}
          >
            <p className="font-body" style={{ fontSize: 14, color: "var(--foreground)", marginBottom: 12 }}>
              How are you feeling?
            </p>
            <div className="flex gap-2 justify-center">
              {moods.map((emoji, i) => (
                <button
                  key={i}
                  onClick={() => handleMoodSelect(i)}
                  className="flex items-center justify-center transition-colors"
                  style={{
                    width: 40,
                    height: 40,
                    fontSize: 22,
                    borderRadius: "50%",
                    backgroundColor: selectedMood === i ? "hsl(var(--primary-light))" : "transparent",
                    border: selectedMood === i ? "2px solid hsl(var(--primary))" : "2px solid transparent",
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === "energy" && (
          <motion.div
            key="energy"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="bg-card mt-3 p-4"
            style={{ borderRadius: 14, boxShadow: "var(--shadow-card)" }}
          >
            <p className="font-body" style={{ fontSize: 14, color: "var(--foreground)", marginBottom: 12 }}>
              Energy today?
            </p>
            <div className="flex gap-3 justify-center">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => handleEnergySelect(level)}
                  className="rounded-full transition-colors"
                  style={{
                    width: 14,
                    height: 14,
                    backgroundColor: level <= energy ? "hsl(var(--primary))" : "hsl(var(--border))",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {step === "sleep" && (
          <motion.div
            key="sleep"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="bg-card mt-3 p-4"
            style={{ borderRadius: 14, boxShadow: "var(--shadow-card)" }}
          >
            <p className="font-body" style={{ fontSize: 14, color: "var(--foreground)", marginBottom: 12 }}>
              Sleep last night?
            </p>
            <div className="flex gap-2 justify-center mb-3">
              {sleepHours.map((h) => (
                <button
                  key={h}
                  onClick={() => setSleepHour(h)}
                  className="font-body flex items-center justify-center transition-colors"
                  style={{
                    width: 36,
                    height: 36,
                    fontSize: 14,
                    fontWeight: 600,
                    borderRadius: 10,
                    backgroundColor: sleepHour === h ? "hsl(var(--primary))" : "hsl(var(--muted))",
                    color: sleepHour === h ? "hsl(var(--primary-foreground))" : "var(--text-body)",
                  }}
                >
                  {h}
                </button>
              ))}
            </div>
            <div className="flex gap-2 justify-center mb-4">
              {(["restful", "broken"] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => setSleepQuality(q)}
                  className="font-body transition-colors"
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    padding: "6px 16px",
                    borderRadius: 100,
                    backgroundColor: sleepQuality === q ? "hsl(var(--primary))" : "hsl(var(--muted))",
                    color: sleepQuality === q ? "hsl(var(--primary-foreground))" : "var(--text-body)",
                  }}
                >
                  {q === "restful" ? "Restful" : "Broken"}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {showConfirmation ? (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-2 py-3"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Check className="h-5 w-5" style={{ color: "#16a34a" }} />
                  </motion.div>
                  <span className="font-body" style={{ fontSize: 13, color: "hsl(var(--primary))" }}>
                    Logged ✓ — I've noted today.
                  </span>
                </motion.div>
              ) : (
                <button
                  onClick={handleSave}
                  disabled={!canSave}
                  className="w-full font-body transition-opacity"
                  style={{
                    height: 40,
                    borderRadius: 18,
                    backgroundColor: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    fontSize: 15,
                    fontWeight: 600,
                    opacity: canSave ? 1 : 0.4,
                  }}
                >
                  Save Check-in
                </button>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {step === "nudge" && (
          <motion.div
            key="nudge"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="bg-card mt-3 p-5 text-center"
            style={{ borderRadius: 14, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
          >
            <p className="font-body" style={{ fontSize: 16, fontWeight: 700, color: "hsl(var(--primary))" }}>
              💚 Logged! Want to tell me more?
            </p>
            <p className="font-body mt-2" style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.5 }}>
              The more I know, the smarter your plan gets — takes 60 seconds.
            </p>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleDone}
                className="flex-1 font-body transition-colors"
                style={{
                  height: 40,
                  borderRadius: 18,
                  backgroundColor: "hsl(var(--background))",
                  color: "hsl(var(--primary))",
                  border: "1.5px solid hsl(var(--primary))",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                I'm done
              </button>
              <button
                onClick={handleTellMore}
                className="flex-1 font-body transition-colors"
                style={{
                  height: 40,
                  borderRadius: 18,
                  backgroundColor: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Tell me more →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cysta toast */}
      <AnimatePresence>
        {showCysta && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 left-0 right-0 flex justify-center z-50 px-5"
          >
            <div
              className="bg-card font-body w-full max-w-[370px] text-center"
              style={{
                fontSize: 14,
                color: "hsl(var(--primary))",
                padding: "14px 20px",
                borderRadius: 16,
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              }}
            >
              Got it. Keep going — you're building a pattern worth reading. 💚
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InlineCheckIn;
