import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";

interface Message {
  role: "ai" | "user";
  text: string;
  time: string;
}

const messages: Message[] = [
  {
    role: "ai",
    text: "Good morning Vrushali. You're on Day 18 — deep in your luteal phase. How are you feeling today?",
    time: "9:02 AM",
  },
  {
    role: "user",
    text: "Pretty tired honestly. I had a lot of sugar cravings yesterday.",
    time: "9:04 AM",
  },
  {
    role: "ai",
    text: "That makes total sense for this phase. In luteal, progesterone rises and then drops — this depletes magnesium, which directly drives sugar cravings. It's not a willpower issue. It's chemistry.\n\nTry adding a small magnesium-rich snack today — almonds, pumpkin seeds, or dark chocolate all work. Want me to suggest some meal ideas?",
    time: "9:04 AM",
  },
  {
    role: "user",
    text: "Yes please!",
    time: "9:05 AM",
  },
  {
    role: "ai",
    text: "Here are 3 easy options for today:\n\n🥣 Breakfast — Greek yogurt with a handful of pumpkin seeds and berries\n\n🥗 Lunch — Big salad with chickpeas, avocado and olive oil dressing\n\n🍫 Afternoon snack — 2 squares dark chocolate (70%+) with almonds\n\nAll low-glycaemic, all magnesium-supporting. How does that sound?",
    time: "9:05 AM",
  },
];

const AiAvatar = ({ size = 28 }: { size?: number }) => (
  <div
    className="flex-shrink-0 flex items-center justify-center font-display"
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundColor: "hsl(var(--primary))",
      color: "white",
      fontSize: size * 0.43,
      fontWeight: 700,
    }}
  >
    C
  </div>
);

const TypingIndicator = () => (
  <div className="flex items-end gap-2 mb-4">
    <AiAvatar />
    <div
      className="bg-card flex items-center gap-[6px]"
      style={{
        borderRadius: "18px 18px 18px 4px",
        padding: "14px 18px",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block rounded-full"
          style={{
            width: 7,
            height: 7,
            backgroundColor: "var(--text-muted)",
            animation: `typingPulse 1.4s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  </div>
);

const Chat = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col">
        {/* Header */}
        <div
          className="bg-card flex flex-col items-center px-5 pt-4 pb-3"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)", zIndex: 10 }}
        >
          <div className="w-full flex items-center justify-between">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" style={{ color: "var(--text-muted)" }} />
            </button>
            <span className="font-display text-base font-bold" style={{ color: "var(--text-ink)" }}>
              Your Companion
            </span>
            <AiAvatar size={36} />
          </div>
          <span className="font-body mt-1" style={{ fontSize: 11, color: "var(--text-muted)" }}>
            Insulin Resistance · Day 18
          </span>
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto px-5 py-4" style={{ paddingBottom: 140 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {messages.map((msg, idx) =>
              msg.role === "ai" ? (
                <div key={idx} className="flex items-end gap-2 mb-4">
                  <AiAvatar />
                  <div className="flex flex-col" style={{ maxWidth: "80%" }}>
                    <div
                      className="bg-card font-body"
                      style={{
                        borderRadius: "18px 18px 18px 4px",
                        padding: 16,
                        boxShadow: "var(--shadow-card)",
                        fontSize: 15,
                        color: "var(--text-ink)",
                        lineHeight: 1.6,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {msg.text}
                    </div>
                    <span
                      className="font-body mt-1"
                      style={{ fontSize: 11, color: "var(--text-muted)" }}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ) : (
                <div key={idx} className="flex flex-col items-end mb-4">
                  <div
                    className="font-body"
                    style={{
                      maxWidth: "80%",
                      borderRadius: "18px 18px 4px 18px",
                      padding: 16,
                      backgroundColor: "hsl(var(--primary))",
                      color: "white",
                      fontSize: 15,
                      lineHeight: 1.6,
                    }}
                  >
                    {msg.text}
                  </div>
                  <span
                    className="font-body mt-1"
                    style={{ fontSize: 11, color: "var(--text-muted)" }}
                  >
                    {msg.time}
                  </span>
                </div>
              )
            )}
            <TypingIndicator />
          </motion.div>
        </div>

        {/* Input bar */}
        <div
          className="fixed bottom-16 left-0 right-0 flex justify-center bg-card"
          style={{ borderTop: "1px solid hsl(var(--border))", zIndex: 20 }}
        >
          <div className="w-full max-w-[390px] flex items-center gap-[10px] px-4 py-3">
            <input
              type="text"
              placeholder="Ask anything about your PCOS..."
              className="flex-1 font-body outline-none"
              style={{
                backgroundColor: "hsl(var(--background))",
                borderRadius: 24,
                padding: "12px 16px",
                fontSize: 15,
                color: "var(--text-ink)",
              }}
            />
            <button
              className="flex-shrink-0 flex items-center justify-center"
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                backgroundColor: "hsl(var(--primary))",
              }}
            >
              <Send size={20} color="white" />
            </button>
          </div>
        </div>

        <BottomNav active="chat" />
      </div>
    </div>
  );
};

export default Chat;
