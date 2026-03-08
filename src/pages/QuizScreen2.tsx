import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizShell from "@/components/quiz/QuizShell";
import AnswerCard from "@/components/quiz/AnswerCard";
import ContinueButton from "@/components/quiz/ContinueButton";
import { useQuiz } from "@/context/QuizContext";

const options = [
  { id: "A", text: "Yes, I'm currently taking it", scores: { PP: 2 } },
  { id: "B", text: "I stopped within the last 6 months", scores: { PP: 3 }, flag: "postpill" as const },
  { id: "C", text: "I stopped more than 6 months ago", scores: { PP: 1 } },
  { id: "D", text: "No, I've never taken it", scores: {} },
];

const QuizScreen2 = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addScores, setFlag } = useQuiz();

  const handleContinue = () => {
    const opt = options.find((o) => o.id === selected);
    if (opt) {
      addScores(opt.scores);
      if ("flag" in opt && opt.flag) setFlag(opt.flag, true);
    }
    navigate("/quiz/3");
  };

  return (
    <QuizShell step={2}>
      <div className="mt-7">
        <h1
          className="font-display"
          style={{ fontSize: "30px", fontWeight: 700, color: "var(--text-ink)", lineHeight: 1.25 }}
        >
          Have you taken or recently stopped the contraceptive pill?
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
          The pill can suppress PCOS symptoms. Stopping it sometimes reveals patterns that were always there.
        </p>
      </div>

      <div className="mt-auto">
        <ContinueButton enabled={!!selected} onClick={handleContinue} />
      </div>
    </QuizShell>
  );
};

export default QuizScreen2;
