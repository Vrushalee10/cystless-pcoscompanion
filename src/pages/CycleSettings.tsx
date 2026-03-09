import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const cycleLengths = [21, 24, 26, 28, 30, 32, 35];
const periodLengths = [3, 4, 5, 6, 7];

const CycleSettings = () => {
  const navigate = useNavigate();
  const [lastPeriod, setLastPeriod] = useState<Date | undefined>();
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [saved, setSaved] = useState(false);

  const pillStyle = (active: boolean): React.CSSProperties => ({
    width: 44,
    height: 44,
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "var(--font-body)",
    backgroundColor: active ? "hsl(var(--primary))" : "white",
    color: active ? "white" : "var(--text-ink)",
    border: active ? "none" : "1.5px solid #E2DDD7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col px-5 pb-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {/* Header */}
          <div className="flex items-center justify-between" style={{ marginTop: 24 }}>
            <button onClick={() => navigate("/settings")}><ArrowLeft className="h-5 w-5" style={{ color: "#6B7280" }} /></button>
            <h1 className="font-display" style={{ fontSize: 28, fontWeight: 800, color: "#111111" }}>Cycle Tracking</h1>
            <div style={{ width: 20 }} />
          </div>

          <div className="bg-card" style={{ borderRadius: 16, padding: 20, boxShadow: "var(--shadow-card)", marginTop: 28 }}>
            {/* Last period date */}
            <p className="font-body" style={{ fontSize: 15, fontWeight: 600, color: "#111111", marginBottom: 8 }}>First day of last period</p>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="w-full text-left font-body"
                  style={{
                    height: 52,
                    borderRadius: 14,
                    border: "1.5px solid #E2DDD7",
                    padding: "0 16px",
                    fontSize: 15,
                    color: lastPeriod ? "#111111" : "#C8C4BE",
                    backgroundColor: "white",
                  }}
                >
                  {lastPeriod ? format(lastPeriod, "PPP") : "Select date"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={lastPeriod}
                  onSelect={setLastPeriod}
                  disabled={(date) => date > new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>

            <div style={{ height: 1, backgroundColor: "#E2DDD7", margin: "16px 0" }} />

            {/* Cycle length */}
            <p className="font-body" style={{ fontSize: 15, fontWeight: 600, color: "#111111", marginBottom: 8 }}>Average cycle length</p>
            <div className="flex gap-2 flex-wrap">
              {cycleLengths.map((n) => (
                <button key={n} style={pillStyle(cycleLength === n)} onClick={() => setCycleLength(n)}>{n}</button>
              ))}
            </div>
            <p className="font-body italic" style={{ fontSize: 12, color: "#6B7280", marginTop: 6 }}>Not sure? 28 days is the average. You can update this as you track.</p>

            <div style={{ height: 1, backgroundColor: "#E2DDD7", margin: "16px 0" }} />

            {/* Period length */}
            <p className="font-body" style={{ fontSize: 15, fontWeight: 600, color: "#111111", marginBottom: 8 }}>Average period length</p>
            <div className="flex gap-2">
              {periodLengths.map((n) => (
                <button key={n} style={pillStyle(periodLength === n)} onClick={() => setPeriodLength(n)}>{n}</button>
              ))}
            </div>

            <button onClick={handleSave} className="w-full font-body" style={{ height: 50, borderRadius: 18, backgroundColor: "hsl(var(--primary))", color: "white", fontSize: 15, fontWeight: 600, marginTop: 24 }}>
              {saved ? "Saved ✓" : "Save cycle settings →"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CycleSettings;
