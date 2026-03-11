import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import { useCycleIntelligence } from "@/hooks/useCycleIntelligence";

const phases = [
  { name: "Menstrual", days: "Days 1–5", emoji: "🩸", summary: "Your period. Hormone levels are at their lowest. Energy dips, and your body is shedding the uterine lining.", tips: "Rest, gentle movement, iron-rich foods. This is your reset phase, honour the low energy." },
  { name: "Follicular", days: "Days 6–13", emoji: "🌱", summary: "Oestrogen rises steadily. Energy increases, mood lifts, and insulin sensitivity improves. This is your high-performance window.", tips: "Try new workouts, tackle challenging tasks, eat complex carbs. Your body handles them best now." },
  { name: "Ovulatory", days: "Days 14–16", emoji: "✨", summary: "Oestrogen peaks, testosterone surges briefly. You feel confident, social, and energised. Fertility is highest.", tips: "High-intensity exercise works well here. Stay hydrated and eat antioxidant-rich foods." },
  { name: "Luteal", days: "Days 17–28", emoji: "🌙", summary: "Progesterone rises then falls. Energy drops, cravings increase, mood can shift. Your body is preparing for either pregnancy or your next period.", tips: "Magnesium-rich foods, protein at every meal, gentle movement, prioritise sleep. This is not the time to push hard." },
];

function formatDateRange(start: string, cycleLen: number | null): string {
  const s = new Date(start);
  const e = new Date(s);
  e.setDate(e.getDate() + (cycleLen || 28) - 1);
  const fmt = (d: Date) => d.toLocaleDateString("en-GB", { month: "short", day: "numeric" });
  return `${fmt(s)} → ${fmt(e)}`;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" });
}

const CycleScreen = () => {
  const navigate = useNavigate();
  const { cycleData } = useQuiz();
  const ci = useCycleIntelligence();
  const currentPhase = cycleData.currentPhase;

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col px-5 pb-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {/* Header */}
          <div className="flex items-center justify-between mt-5">
            <button onClick={() => navigate("/home")}>
              <ArrowLeft className="h-5 w-5" style={{ color: "var(--text-muted)" }} />
            </button>
            <span className="font-display text-base font-bold" style={{ color: "var(--text-ink)" }}>Know Your Cyst-em</span>
            <div className="w-5" />
          </div>

          {/* Hero */}
          <div className="mt-6">
            <p style={{ fontSize: 11, textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: 1 }}>YOUR CYCLE, DECODED</p>
            <h1 className="font-display mt-2" style={{ fontSize: 28, fontWeight: 800, color: "var(--text-ink)", lineHeight: 1.2 }}>
              Your cycle isn't the problem. Not knowing it is.
            </h1>
            <div className="mt-3" style={{ width: 48, height: 4, borderRadius: 2, backgroundColor: "hsl(var(--accent))" }} />
            <p className="font-body mt-[14px]" style={{ fontSize: 15, color: "var(--text-body)", lineHeight: 1.6 }}>
              Your hormones shift across four distinct phases each cycle. Knowing where you are helps you eat, move, and rest in sync with your body, not against it.
            </p>
          </div>

          {/* Cycle bar */}
          <div className="mt-6">
            <div className="flex rounded-full overflow-hidden" style={{ height: 32 }}>
              {phases.map((phase) => {
                const isCurrent = phase.name === currentPhase;
                return (
                  <div key={phase.name} className="flex-1 flex items-center justify-center font-display"
                    style={{ fontSize: 11, fontWeight: 600, color: isCurrent ? "white" : "var(--text-body)", backgroundColor: isCurrent ? "hsl(var(--primary))" : "hsl(var(--border))" }}>
                    {phase.name}
                  </div>
                );
              })}
            </div>
            <div className="flex mt-1">
              {phases.map((phase) => (
                <div key={phase.name} className="flex-1 text-center">
                  {phase.name === currentPhase && (
                    <span className="font-display" style={{ fontSize: 10, color: "hsl(var(--primary))", fontWeight: 700 }}>▲ YOU ARE HERE</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Phase cards */}
          <div className="mt-6 flex flex-col gap-3">
            {phases.map((phase) => {
              const isCurrent = phase.name === currentPhase;
              return (
                <div key={phase.name} className="bg-card" style={{ borderRadius: 18, padding: 20, boxShadow: "var(--shadow-card)", borderLeft: isCurrent ? "4px solid hsl(var(--primary))" : "4px solid transparent" }}>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 20 }}>{phase.emoji}</span>
                    <div>
                      <p className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "var(--text-ink)" }}>{phase.name} Phase</p>
                      <p className="font-body" style={{ fontSize: 12, color: "var(--text-muted)" }}>{phase.days}</p>
                    </div>
                    {isCurrent && (
                      <span className="ml-auto font-display" style={{ fontSize: 11, fontWeight: 700, color: "hsl(var(--primary))", backgroundColor: "hsl(var(--primary-light))", padding: "3px 8px", borderRadius: 100 }}>
                        CURRENT
                      </span>
                    )}
                  </div>
                  <p className="font-body mt-3" style={{ fontSize: 14, color: "var(--text-body)", lineHeight: 1.6 }}>{phase.summary}</p>
                  <div className="mt-3" style={{ backgroundColor: "hsl(var(--background))", borderRadius: 12, padding: 12 }}>
                    <p className="font-body" style={{ fontSize: 13, color: "var(--text-body)", lineHeight: 1.5 }}>💡 {phase.tips}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CYCLE HISTORY */}
          {ci.cycleHistory.length > 0 && (
            <>
              <p className="text-label mt-7" style={{ color: "hsl(var(--primary))" }}>YOUR CYCLE HISTORY</p>
              <div className="mt-3 flex flex-col gap-[10px]">
                {ci.cycleHistory.slice(-3).reverse().map((entry) => {
                  const statusLabel = entry.daysLate === 0 ? "On time" : entry.daysLate > 0 ? `${entry.daysLate} days late` : `${Math.abs(entry.daysLate)} days early`;
                  const isLate = entry.daysLate > 0;
                  return (
                    <div key={entry.cycleNumber} className="bg-card flex items-center justify-between" style={{ borderRadius: 16, padding: 16, boxShadow: "var(--shadow-card)" }}>
                      <div>
                        <p className="font-body" style={{ fontSize: 13, textTransform: "uppercase", color: "#6B7280" }}>Cycle {entry.cycleNumber}</p>
                        <p className="font-display" style={{ fontSize: 15, fontWeight: 700, color: "var(--text-ink)", marginTop: 2 }}>
                          {formatDateRange(entry.actualStartDate, entry.cycleLength)}
                        </p>
                        <p className="font-body" style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>
                          {entry.cycleLength ? `${entry.cycleLength} days` : "—"} · Period {entry.periodLength ? `${entry.periodLength} days` : "in progress"} · {statusLabel}
                        </p>
                      </div>
                      <span className="font-body shrink-0 ml-3" style={{
                        fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 100,
                        backgroundColor: isLate ? "#FFF8ED" : "#EAF3F3",
                        color: isLate ? "#92400E" : "hsl(var(--primary))",
                      }}>
                        {statusLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Next Period Prediction */}
          {ci.nextPeriodPredictedDate && (
            <div className="mt-4" style={{ backgroundColor: "#EAF3F3", borderRadius: 16, padding: 16 }}>
              <p className="font-body" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.8, fontWeight: 600, color: "hsl(var(--primary))" }}>
                NEXT PERIOD PREDICTED
              </p>
              <p className="font-display" style={{ fontSize: 22, fontWeight: 800, color: "var(--text-ink)", marginTop: 6 }}>
                {formatDate(ci.nextPeriodPredictedDate)}
              </p>
              <p className="font-body" style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>
                {ci.daysUntilNextPeriod !== null && ci.daysUntilNextPeriod > 0
                  ? `${ci.daysUntilNextPeriod} days from now · ${ci.predictionConfidence} prediction`
                  : ci.daysUntilNextPeriod === 0
                  ? `Today · ${ci.predictionConfidence} prediction`
                  : `${Math.abs(ci.daysUntilNextPeriod!)} days overdue · ${ci.predictionConfidence} prediction`}
              </p>
              <p className="font-body italic" style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>
                Based on {ci.cycleHistory.length} cycle{ci.cycleHistory.length !== 1 ? "s" : ""} logged
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CycleScreen;
