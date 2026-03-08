import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";

interface Message {
  role: "ai" | "user";
  text: string;
  time: string;
}

const initialMessages: Message[] = [
  {
    role: "ai",
    text: "Hey Vrushali 💚 No sugar-coating, no judgement, just us. You're on Day 18, deep in luteal phase. Your body is doing a lot right now. What's on your mind?",
    time: "9:02 AM",
  },
];

const getAiResponse = (userText: string): string => {
  const lower = userText.toLowerCase();
  if (lower.includes("tired") || lower.includes("fatigue") || lower.includes("exhausted") || lower.includes("no energy") || lower.includes("drained")) {
    return "Honestly? That's your luteal phase doing its thing, not you being lazy. Progesterone drops, magnesium goes with it, energy tanks. It's textbook. A protein snack and a short walk actually help more than coffee right now. Trust.";
  }
  if (lower.includes("craving") || lower.includes("sugar") || lower.includes("chocolate") || lower.includes("junk food") || lower.includes("hungry")) {
    return "Not. Your. Fault. Low magnesium in luteal phase literally makes your brain demand sugar. It's chemistry, not weakness. Grab some dark chocolate (70%+) or pumpkin seeds, that's not giving in, that's giving your body what it actually needs.";
  }
  if (lower.includes("bloat") || lower.includes("bloating") || lower.includes("puffy") || lower.includes("swollen")) {
    return "Ugh, luteal bloating is SO real. Progesterone makes your body hold onto water, it's not fat, it's fluid. What actually helps? Potassium-rich foods (banana, sweet potato), cutting back on salt today, and gentle movement. You'll feel lighter in a couple days, promise 💚";
  }
  if (lower.includes("anxious") || lower.includes("anxiety") || lower.includes("worried") || lower.includes("stress") || lower.includes("overwhelm")) {
    return "Okay first, deep breath. You're not spiralling, your hormones are. Progesterone dropping in luteal phase directly affects GABA (your calm-down neurotransmitter). What I'd try: magnesium glycinate before bed, a 10-min walk outside, and honestly? Give yourself permission to do less today. You're not falling behind 💚";
  }
  if (lower.includes("sleep") || lower.includes("insomnia") || lower.includes("can't sleep") || lower.includes("waking up")) {
    return "Luteal phase + poor sleep = classic combo. Progesterone is supposed to be calming but when it drops, your sleep quality tanks. What might help tonight: no screens 30 min before bed, magnesium glycinate, and keep your room cool. Also, tart cherry juice is genuinely a game-changer for melatonin. Try it 💚";
  }
  if (lower.includes("mood") || lower.includes("sad") || lower.includes("crying") || lower.includes("emotional") || lower.includes("irritable") || lower.includes("angry")) {
    return "You're not being dramatic. Estrogen and progesterone both drop before your period and they take serotonin with them. Literally, your happy chemical dips. What I'd try: omega-3s (salmon, walnuts), sunlight in the morning, and B6-rich foods. Also, crying is regulation, not weakness. Let it out 💚";
  }
  if (lower.includes("exercise") || lower.includes("workout") || lower.includes("gym") || lower.includes("run")) {
    return "Okay hot take, this isn't the phase for PRs or intense HIIT. Your body is already under hormonal stress. What actually works in luteal: yoga, pilates, walking, light strength training. Save the beast mode for follicular phase when estrogen is high and you'll genuinely feel unstoppable 💚";
  }
  if (lower.includes("weight") || lower.includes("gained") || lower.includes("scale") || lower.includes("fat")) {
    return "Step away from the scale, bestie. Luteal phase water retention can add 2-5 lbs that literally disappear after your period. It's not real weight gain. If you're dealing with PCOS-related weight stuff long-term, that's a bigger convo, but today? Your body is just doing its thing. Be kind to it 💚";
  }
  if (lower.includes("skin") || lower.includes("acne") || lower.includes("breakout") || lower.includes("pimple")) {
    return "Pre-period breakouts? Androgens spike right before your period, which means more oil, more clogged pores. What actually helps: don't over-wash (it makes it worse), use a gentle salicylic acid, and zinc-rich foods (pumpkin seeds again, they're basically a PCOS superfood). This will calm down in a few days 💚";
  }
  if (lower.includes("period") || lower.includes("late") || lower.includes("irregular") || lower.includes("missed")) {
    return "Irregular periods with PCOS are super common, it doesn't mean something is wrong with YOU. It means your hormones need some support. Blood sugar balance, stress management, and sleep are the big three. Want me to look at your recent logs and see if anything stands out? 💚";
  }
  if (lower.includes("pain") || lower.includes("cramp") || lower.includes("headache") || lower.includes("migraine")) {
    return "Oof, I'm sorry. Prostaglandins (the chemicals that cause cramps) go up when progesterone drops. Anti-inflammatory foods help, think ginger tea, turmeric, fatty fish. Magnesium too (seeing a pattern? 😄). A heating pad on your lower belly genuinely works as well as ibuprofen for some people. Take it easy today 💚";
  }
  if (lower.includes("help") || lower.includes("what should") || lower.includes("advice") || lower.includes("suggest")) {
    return "I got you. Based on where you are in your cycle right now, here's what I'd focus on today:\n\n🥑 Eat: protein + healthy fats at every meal, magnesium-rich snacks\n🚶‍♀️ Move: gentle, walk, yoga, stretching\n😴 Rest: prioritise sleep, no guilt about low energy\n💧 Hydrate: extra water, maybe some electrolytes\n\nSmall moves, big impact. You don't need to overhaul anything 💚";
  }
  if (lower.includes("thank") || lower.includes("thanks") || lower.includes("love")) {
    return "Always here for you 💚 Seriously, no question is too small, no feeling is too much. We're in this together.";
  }
  return "I'm here, I'm listening, and honestly, nothing you say is going to surprise me. Tell me more 💚";
};

const formatTime = (): string => {
  const now = new Date();
  return now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
};

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
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { role: "user", text, time: formatTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => setIsTyping(true), 1500);

    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = { role: "ai", text: getAiResponse(text), time: formatTime() };
      setMessages((prev) => [...prev, aiMsg]);
    }, 4000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col">
        {/* Header */}
        <div
          className="bg-card flex flex-col items-center px-5 pt-4 pb-3"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)", zIndex: 10 }}
        >
          <div className="w-full flex items-center justify-between">
            <button onClick={() => navigate("/home")}>
              <ArrowLeft className="h-5 w-5" style={{ color: "var(--text-muted)" }} />
            </button>
            <span className="font-display text-base font-bold" style={{ color: "var(--text-ink)" }}>
              Cysta
            </span>
            <AiAvatar size={36} />
          </div>
          <span className="font-body mt-1" style={{ fontSize: 11, color: "var(--text-muted)" }}>
            Let's have the Cysta talk 💚
          </span>
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto px-5 py-4" style={{ paddingBottom: 140 }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
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
                    <span className="font-body mt-1" style={{ fontSize: 11, color: "var(--text-muted)" }}>
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
                  <span className="font-body mt-1" style={{ fontSize: 11, color: "var(--text-muted)" }}>
                    {msg.time}
                  </span>
                </div>
              )
            )}
            {isTyping && <TypingIndicator />}
            <div ref={chatEndRef} />
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
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
              onClick={handleSend}
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
