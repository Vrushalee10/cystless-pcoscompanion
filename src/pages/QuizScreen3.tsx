import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizShell from "@/components/quiz/QuizShell";
import AnswerCard from "@/components/quiz/AnswerCard";
import ContinueButton from "@/components/quiz/ContinueButton";
import { useQuiz } from "@/context/QuizContext";

type FlagKey = "recenttest" | "oldtest" | "notested";

const options: { id: string; text: string; flag?: FlagKey }[] = [
  { id: "A", text: "Within the last 3 months", flag: "recenttest" },
  { id: "B", text: "3 to 6 months ago", flag: "recenttest" },
  { id: "C", text: "Over a year ago", flag: "oldtest" },
  { id: "D", text: "I've never been tested", flag: "notested" },
];

const QuizScreen3 = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setFlag, getNextRoute } = useQuiz();

  const handleContinue = () => {
    const opt = options.find((o) => o.id === selected);
    if (opt?.flag) setFlag(opt.flag, true);
    navigate(getNextRoute(3));
  };

  return (
    <QuizShell questionId={3}>
      <div className="mt-7">
        <h1
          className="font-display"
          style={{ fontSize: "30px", fontWeight: 700, color: "var(--text-ink)", lineHeight: 1.25 }}
        >
          When did you last get a hormone or PCOS blood test?
        </h1>

        <div className="mt-5 flex flex-col gap-[10px]">
          {options.map((opt) => (
            <AnswerCard
              key={opt.id}
              text={opt.text}
              selected={selected === opt.id}
              onSelect={() => setSelected(opt.id)}
            />
          ))}
        </div>

        <p
          className="font-body italic text-center mt-5"
          style={{ fontSize: "13px", color: "var(--text-muted)" }}
        >
          You'll get your full plan today regardless. We'll flag if updated tests would add clarity.
        </p>
      </div>

      <div className="mt-auto">
        <ContinueButton enabled={!!selected} onClick={handleContinue} />
      </div>
    </QuizShell>
  );
};

export default QuizScreen3;
