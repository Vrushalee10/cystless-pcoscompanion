import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import onboarding1 from "@/assets/onboarding-1.jpg";
import onboarding2 from "@/assets/onboarding-2.jpg";
import onboarding3 from "@/assets/onboarding-3.jpg";

const screens = [
  {
    image: onboarding1,
    label: "WELCOME TO CYSTLESS",
    headline: "Your body isn't broken. It's just unread.",
    body: "Cystless helps you understand what your hormones are doing, and what to do about it.",
    button: "Continue",
    next: "/onboarding/2",
  },
  {
    image: onboarding2,
    label: "YOUR CYCLE IS YOUR COMPASS",
    headline: "Every phase of your cycle changes what your body needs.",
    body: "Cystless reads your phase and adjusts your nutrition, movement and mindset plan automatically.",
    button: "Continue",
    next: "/onboarding/3",
  },
  {
    image: onboarding3,
    label: "BUILT AROUND YOUR PATTERN",
    headline: "No generic plans. No guilt. Just you.",
    body: "In 2 minutes, we'll identify your PCOS pattern and build a plan that actually fits your life.",
    button: "Let's Find My Pattern →",
    next: "/quiz/1",
  },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { step } = useParams();
  const index = Math.min(Math.max(Number(step) - 1, 0), 2);
  const screen = screens[index];

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col">
        {/* Back arrow on screen 3 only */}
        {index === 2 && (
          <button
            onClick={() => navigate("/onboarding/2")}
            className="absolute top-4 left-4 z-10"
            style={{ color: "var(--text-muted)" }}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col flex-1"
          >
            {/* Image */}
            <img
              src={screen.image}
              alt={screen.label}
              style={{ width: "100%", height: 260, objectFit: "cover" }}
            />

            {/* Content */}
            <div className="px-5 flex-1 flex flex-col" style={{ marginTop: 32 }}>
              <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.8, color: "hsl(var(--primary))", fontWeight: 700 }}>
                {screen.label}
              </p>
              <h1
                className="font-display"
                style={{ fontSize: 32, fontWeight: 800, color: "var(--text-ink)", lineHeight: 1.2, marginTop: 10 }}
              >
                {screen.headline}
              </h1>
              <p
                className="font-body"
                style={{ fontSize: 16, color: "var(--text-body)", lineHeight: 1.6, marginTop: 14 }}
              >
                {screen.body}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom controls */}
        <div className="px-5 pb-8">
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: i === index ? "#0A3D3D" : "#E2DDD7",
                  transition: "background-color 0.3s",
                }}
              />
            ))}
          </div>

          {/* Continue button */}
          <button
            onClick={() => navigate(screen.next)}
            className="w-full font-display"
            style={{
              height: 58,
              borderRadius: 18,
              backgroundColor: "#0A3D3D",
              color: "white",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            {screen.button}
          </button>

          {/* Skip */}
          <button
            onClick={() => navigate("/quiz/1")}
            className="w-full font-body text-center mt-3"
            style={{ fontSize: 13, color: "var(--text-muted)" }}
          >
            Skip →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
