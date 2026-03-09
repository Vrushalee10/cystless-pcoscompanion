import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const trackingRows = [
  { emoji: "❤️", title: "Heart Rate Variability", desc: "HRV drops before your period. We use this to predict phase shifts and adjust your plan early." },
  { emoji: "😴", title: "Sleep Quality", desc: "Deep sleep and REM data replace manual sleep logging. No more guessing." },
  { emoji: "🏃", title: "Activity & Steps", desc: "Movement data feeds directly into your plan. Rest days are detected automatically." },
  { emoji: "🌡️", title: "Skin Temperature", desc: "Temperature rises at ovulation. The most accurate way to confirm your cycle phase." },
];

const devices = [
  { emoji: "🍎", name: "Apple Watch", sub: "Series 4 and above · HealthKit integration" },
  { emoji: "💪", name: "Fitbit", sub: "All models · Fitbit API integration" },
  { emoji: "🤖", name: "Wear OS", sub: "Google Fit compatible devices" },
];

const ConnectDevice = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const handleConnect = () => {
    setModal(true);
    setTimeout(() => setModal(false), 2000);
  };

  return (
    <div className="min-h-[100dvh] flex justify-center" style={{ backgroundColor: "#F7F4F0" }}>
      <div className="w-full max-w-[390px] px-5 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="relative flex items-center justify-center mt-5">
            <button onClick={() => navigate(-1)} className="absolute left-0">
              <ArrowLeft className="h-5 w-5" style={{ color: "#6B7280" }} />
            </button>
            <h1 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "#111111" }}>
              Connect Your Device
            </h1>
          </div>

          {/* Top Section */}
          <div style={{ marginTop: 24 }}>
            <p className="font-body uppercase" style={{ fontSize: 11, color: "hsl(var(--primary))" }}>
              AUTOMATIC TRACKING
            </p>
            <h2
              className="font-display"
              style={{ fontSize: 28, fontWeight: 800, color: "#111111", lineHeight: 1.2, marginTop: 8 }}
            >
              Let your watch do the logging.
            </h2>
            <div style={{ width: 48, height: 4, backgroundColor: "#D4614F", borderRadius: 2, marginTop: 12 }} />
            <p className="font-body" style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.6, marginTop: 14 }}>
              When your watch is connected, Cystless automatically tracks sleep, heart rate variability and activity — so your plan updates in real time without manual logging.
            </p>
          </div>

          {/* What Gets Tracked */}
          <div
            className="bg-card"
            style={{ borderRadius: 18, padding: 20, marginTop: 24, boxShadow: "var(--shadow-card)" }}
          >
            <p className="font-body uppercase" style={{ fontSize: 11, color: "#94A3B8", marginBottom: 14 }}>
              WHAT CYSTLESS READS FROM YOUR WATCH
            </p>
            {trackingRows.map((row, i) => (
              <div key={i}>
                {i > 0 && <div style={{ borderTop: "1px solid #E2DDD7", margin: "14px 0" }} />}
                <div className="flex gap-3">
                  <span style={{ fontSize: 22, lineHeight: 1 }}>{row.emoji}</span>
                  <div>
                    <p className="font-body" style={{ fontSize: 14, fontWeight: 700, color: "#111111" }}>
                      {row.title}
                    </p>
                    <p className="font-body" style={{ fontSize: 13, color: "#6B7280", marginTop: 3, lineHeight: 1.5 }}>
                      {row.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Device Options */}
          <div style={{ marginTop: 24 }}>
            <p className="font-body uppercase" style={{ fontSize: 11, color: "#6B7280", marginBottom: 14 }}>
              CHOOSE YOUR DEVICE
            </p>
            {devices.map((d, i) => (
              <button
                key={i}
                onClick={handleConnect}
                className="w-full bg-card flex items-center text-left"
                style={{
                  borderRadius: 16, padding: 18, marginBottom: 10,
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <span style={{ fontSize: 28, marginRight: 14 }}>{d.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-body" style={{ fontSize: 15, fontWeight: 700, color: "#111111" }}>
                    {d.name}
                  </p>
                  <p className="font-body" style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>
                    {d.sub}
                  </p>
                </div>
                <span
                  className="font-body shrink-0"
                  style={{
                    fontSize: 12, fontWeight: 600, color: "white",
                    backgroundColor: "hsl(var(--primary))",
                    padding: "6px 12px", borderRadius: 8,
                  }}
                >
                  Connect →
                </span>
              </button>
            ))}
          </div>

          {/* Coming Soon */}
          <div
            style={{
              backgroundColor: "#EAF3F3", borderRadius: 16,
              padding: 16, marginTop: 8,
            }}
          >
            <p className="font-body uppercase" style={{ fontSize: 10, color: "hsl(var(--primary))" }}>
              COMING SOON
            </p>
            <p className="font-body" style={{ fontSize: 14, fontWeight: 600, color: "hsl(var(--primary))", marginTop: 4 }}>
              Garmin · Oura Ring · Whoop
            </p>
            <p className="font-body" style={{ fontSize: 13, color: "hsl(var(--primary))", marginTop: 6, lineHeight: 1.6 }}>
              We're adding more devices. Oura Ring integration is our top priority — its temperature and HRV data is the most accurate for cycle tracking.
            </p>
          </div>

          {/* Bottom Note */}
          <p
            className="font-body italic text-center"
            style={{ fontSize: 12, color: "#6B7280", marginTop: 20, lineHeight: 1.6 }}
          >
            Cystless only reads health data — we never write to your device. Your data stays private and is never shared with third parties.
          </p>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/30" onClick={() => setModal(false)} />
            <motion.div
              className="relative bg-card rounded-[18px] p-6 text-center"
              style={{ boxShadow: "var(--shadow-hero)", maxWidth: 320 }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <p className="font-body" style={{ fontSize: 15, color: "var(--text-body)", lineHeight: 1.6 }}>
                Apple Watch connection would launch HealthKit here in the full app. 💚
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConnectDevice;
