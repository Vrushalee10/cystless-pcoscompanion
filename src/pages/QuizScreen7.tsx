import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizShell from "@/components/quiz/QuizShell";
import AnswerCard from "@/components/quiz/AnswerCard";
import ContinueButton from "@/components/quiz/ContinueButton";
import { useQuiz, Scores } from "@/context/QuizContext";

const options: { id: string; text: string; scores: Partial<Scores> }[] = [
  { id: "A", text: "Generally manageable, most days feel okay", scores: {} },
  { id: "B", text: "Moderate, some tough periods but okay", scores: { AD: 1 } },
  { id: "C", text: "High, I feel overwhelmed regularly", scores: { AD: 3, IN: 1 } },
  { id: "D", text: "Very high — stress feels relentless", scores: { AD: 3, IN: 2 } },
];

const QuizScreen7 = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addScores } = useQuiz();

  const handleContinue = () => {
    const opt = options.find((o) => o.id === selected);
    if (opt) addScores(opt.scores);
    navigate("/quiz/8");
  };

  return (
    <QuizShell step={7}>
      <div className="mt-7">
        <h1
          className="font-display"
          style={{ fontSize: "30px", fontWeight: 700, color: "var(--text-ink)", lineHeight: 1.25 }}
        >
          How would you describe your stress levels?
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
          Chronic stress raises cortisol and DHEA-S — two hormones that directly worsen PCOS symptoms.
        </p>
      </div>

      <div className="mt-auto">
        <ContinueButton enabled={!!selected} onClick={handleContinue} />
      </div>
    </QuizShell>
  );
};

export default QuizScreen7;
