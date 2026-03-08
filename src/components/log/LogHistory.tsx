import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CystaPatternCard from "@/components/CystaPatternCard";

interface LogEntry {
  date: string;
  moodEmoji: string;
  energy: number;
  sleepHours: number;
  sleepQuality: string;
  foodTag?: { emoji: string; label: string };
  symptomTag?: { emoji: string; label: string };
  movementTag?: { emoji: string; label: string };
}

const sampleEntries: LogEntry[] = [
  { date: "TODAY · DAY 18", moodEmoji: "😐", energy: 3, sleepHours: 7, sleepQuality: "restful", foodTag: { emoji: "🥗", label: "Balanced day" } },
  { date: "YESTERDAY · DAY 17", moodEmoji: "😕", energy: 2, sleepHours: 6, sleepQuality: "broken", symptomTag: { emoji: "😮‍💨", label: "Fatigue" }, foodTag: { emoji: "🍫", label: "High sugar" } },
  { date: "2 DAYS AGO · DAY 16", moodEmoji: "🙂", energy: 4, sleepHours: 8, sleepQuality: "restful", movementTag: { emoji: "💪", label: "Workout" } },
  { date: "3 DAYS AGO · DAY 15", moodEmoji: "😐", energy: 3, sleepHours: 7, sleepQuality: "restful", foodTag: { emoji: "🥗", label: "Balanced day" } },
  { date: "4 DAYS AGO · DAY 14", moodEmoji: "😊", energy: 5, sleepHours: 8, sleepQuality: "restful", movementTag: { emoji: "💪", label: "Workout" } },
];

const EnergyDots = ({ level }: { level: number }) => (
  <span className="inline-flex gap-[3px] items-center">
    {[1, 2, 3, 4, 5].map((i) => (
      <span
        key={i}
        className="inline-block rounded-full"
        style={{
          width: 7, height: 7,
          backgroundColor: i <= level ? "hsl(var(--primary))" : "hsl(var(--border))",
        }}
      />
    ))}
  </span>
);

const LogHistory = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2
        className="font-display"
        style={{ fontSize: 20, fontWeight: 800, color: "var(--text-ink)", marginTop: 20 }}
      >
        Your Log History
      </h2>
      <p className="font-body" style={{ fontSize: 14, color: "#94A3B8", marginTop: 4 }}>
        Cysta spots patterns so you don't have to.
      </p>

      <div className="mt-5">
        {sampleEntries.map((entry, idx) => (
          <div
            key={idx}
            className="bg-card"
            style={{
              borderRadius: 16,
              padding: 18,
              marginBottom: 12,
              boxShadow: "var(--shadow-card)",
            }}
          >
            <p className="font-body uppercase" style={{ fontSize: 11, color: "#94A3B8", marginBottom: 10 }}>
              {entry.date}
            </p>
            <div className="flex items-center gap-3 font-body" style={{ fontSize: 14, color: "var(--text-body)" }}>
              <span style={{ fontSize: 18 }}>{entry.moodEmoji}</span>
              <EnergyDots level={entry.energy} />
              <span>{entry.sleepHours}hrs {entry.sleepQuality}</span>
            </div>
            {(entry.foodTag || entry.symptomTag || entry.movementTag) && (
              <div className="flex flex-wrap gap-2 mt-2">
                {entry.foodTag && (
                  <span
                    className="font-body inline-flex items-center gap-1 rounded-full px-[10px] py-[4px]"
                    style={{ fontSize: 12, backgroundColor: "#EAF3F3", color: "hsl(var(--primary))" }}
                  >
                    {entry.foodTag.emoji} {entry.foodTag.label}
                  </span>
                )}
                {entry.symptomTag && (
                  <span
                    className="font-body inline-flex items-center gap-1 rounded-full px-[10px] py-[4px]"
                    style={{ fontSize: 12, backgroundColor: "#FCECEA", color: "hsl(var(--accent))" }}
                  >
                    {entry.symptomTag.emoji} {entry.symptomTag.label}
                  </span>
                )}
                {entry.movementTag && (
                  <span
                    className="font-body inline-flex items-center gap-1 rounded-full px-[10px] py-[4px]"
                    style={{ fontSize: 12, backgroundColor: "#EAF3F3", color: "hsl(var(--primary))" }}
                  >
                    {entry.movementTag.emoji} {entry.movementTag.label}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Cysta Pattern Card */}
      <div style={{ marginTop: 4, marginBottom: 20 }}>
        <CystaPatternCard title="CYSTA NOTICED 👀">
          <button
            onClick={() => navigate("/insights")}
            className="font-body text-left w-full"
            style={{ fontSize: 13, fontWeight: 600, color: "hsl(var(--primary))", marginTop: 10 }}
          >
            See full pattern analysis →
          </button>
        </CystaPatternCard>
      </div>
    </motion.div>
  );
};

export default LogHistory;
