import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "Looking at your symptom patterns...",
  "Mapping your hormonal signals...",
  "Identifying your PCOS pattern...",
  "Checking for inflammation signals...",
  "Building your personalised profile...",
  "Almost there...",
];

const Loading = () => {
  const navigate = useNavigate();
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => navigate("/results", { replace: true }), 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col items-center justify-center px-5">
        <span
          className="font-display"
          style={{ fontSize: "26px", fontWeight: 700, color: "hsl(var(--primary))" }}
        >
          Cystless
        </span>

        <div className="flex gap-2 mt-7">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block rounded-full bg-primary"
              style={{
                width: 10,
                height: 10,
                animation: `dotPulse 0.6s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        <div className="mt-5 h-5 relative w-full flex justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIndex}
              className="font-body absolute"
              style={{ fontSize: "13px", color: "var(--text-muted)" }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {messages[msgIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Loading;
