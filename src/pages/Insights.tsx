import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import CystaPatternCard from "@/components/CystaPatternCard";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, ReferenceLine, ResponsiveContainer,
} from "recharts";

const moodEnergyData = [
  { day: "Mon", mood: 3, energy: 4 },
  { day: "Tue", mood: 2, energy: 3 },
  { day: "Wed", mood: 3, energy: 3 },
  { day: "Thu", mood: 4, energy: 4 },
  { day: "Fri", mood: 3, energy: 3 },
  { day: "Sat", mood: 2, energy: 2 },
  { day: "Sun", mood: 3, energy: 3 },
];

const sleepData = [
  { day: "Mon", hours: 7 },
  { day: "Tue", hours: 6 },
  { day: "Wed", hours: 8 },
  { day: "Thu", hours: 7 },
  { day: "Fri", hours: 6 },
  { day: "Sat", hours: 7 },
  { day: "Sun", hours: 8 },
];

const symptomData = [
  { name: "Sugar cravings", days: 5 },
  { name: "Fatigue", days: 4 },
  { name: "Bloating", days: 3 },
  { name: "Brain fog", days: 2 },
  { name: "Headache", days: 1 },
];

const Insights = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] flex justify-center" style={{ backgroundColor: "#F7F4F0" }}>
      <div className="w-full max-w-[390px] px-5 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="relative flex items-center justify-center mt-5">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-0"
            >
              <ArrowLeft className="h-5 w-5" style={{ color: "#6B7280" }} />
            </button>
            <h1 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "#111111" }}>
              Your Patterns
            </h1>
          </div>
          <p className="font-body text-center" style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>
            Last 7 days · Luteal Phase
          </p>

          {/* CHART 1 — Mood & Energy */}
          <div
            className="bg-card"
            style={{ borderRadius: 18, padding: 20, marginTop: 24, boxShadow: "var(--shadow-card)" }}
          >
            <p className="font-body uppercase" style={{ fontSize: 11, color: "hsl(var(--primary))", marginBottom: 16 }}>
              MOOD & ENERGY THIS WEEK
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={moodEnergyData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 14% 87%)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[1, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 10,
                    border: "1px solid hsl(30 14% 87%)",
                    boxShadow: "var(--shadow-card)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#D4614F"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#D4614F", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="energy"
                  stroke="#0A3D3D"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#0A3D3D", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-5 mt-3">
              <span className="flex items-center gap-[6px] font-body" style={{ fontSize: 12, color: "#6B7280" }}>
                <span className="inline-block rounded-full" style={{ width: 8, height: 8, backgroundColor: "#D4614F" }} />
                Mood
              </span>
              <span className="flex items-center gap-[6px] font-body" style={{ fontSize: 12, color: "#6B7280" }}>
                <span className="inline-block rounded-full" style={{ width: 8, height: 8, backgroundColor: "#0A3D3D" }} />
                Energy
              </span>
            </div>
          </div>

          {/* CHART 2 — Sleep */}
          <div
            className="bg-card"
            style={{ borderRadius: 18, padding: 20, marginTop: 12, boxShadow: "var(--shadow-card)" }}
          >
            <p className="font-body uppercase" style={{ fontSize: 11, color: "hsl(var(--primary))", marginBottom: 16 }}>
              SLEEP THIS WEEK
            </p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={sleepData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(30 14% 87%)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 10]}
                  ticks={[0, 2, 4, 6, 8, 10]}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 10,
                    border: "1px solid hsl(30 14% 87%)",
                    boxShadow: "var(--shadow-card)",
                  }}
                />
                <ReferenceLine
                  y={7}
                  stroke="#6B7280"
                  strokeDasharray="4 4"
                  label={{ value: "Target", position: "right", fontSize: 11, fill: "#6B7280" }}
                />
                <Bar
                  dataKey="hours"
                  fill="#EAF3F3"
                  stroke="#0A3D3D"
                  strokeWidth={1}
                  radius={[4, 4, 0, 0]}
                  barSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* CHART 3 — Symptom Frequency */}
          <div
            className="bg-card"
            style={{ borderRadius: 18, padding: 20, marginTop: 12, boxShadow: "var(--shadow-card)" }}
          >
            <p className="font-body uppercase" style={{ fontSize: 11, color: "hsl(var(--primary))", marginBottom: 16 }}>
              MOST LOGGED SYMPTOMS
            </p>
            <div className="flex flex-col gap-4">
              {symptomData.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between font-body" style={{ fontSize: 13, color: "#111111", marginBottom: 6 }}>
                    <span>{s.name}</span>
                    <span>{s.days} days</span>
                  </div>
                  <div className="rounded-full overflow-hidden" style={{ height: 8, backgroundColor: "#FCECEA" }}>
                    <div
                      className="rounded-full h-full"
                      style={{
                        width: `${(s.days / 7) * 100}%`,
                        backgroundColor: "#D4614F",
                        transition: "width 0.4s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cysta Insight Card */}
          <div style={{ marginTop: 12 }}>
            <CystaPatternCard title="CYSTA'S READ 👀" />
          </div>

          {/* Disclaimer */}
          <p
            className="font-body italic text-center"
            style={{ fontSize: 12, color: "#6B7280", marginTop: 16, marginBottom: 24 }}
          >
            Pattern analysis is based on your logged data. Not a clinical assessment.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Insights;
