import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizShell from "@/components/quiz/QuizShell";
import AnswerCard from "@/components/quiz/AnswerCard";
import ContinueButton from "@/components/quiz/ContinueButton";
import { useQuiz, Scores } from "@/context/QuizContext";

const options: { id: string; text: string; scores: Partial<Scores> }[] = [
  { id: "A", text: "Consistently good, I feel rested most mornings", scores: {} },
  { id: "B", text: "Okay, could be better", scores: { AD: 1, IR: 1 } },
  { id: "C", text: "Often broken or interrupted", scores: { AD: 2, IR: 1, IN: 1 } },
  { id: "D", text: "Very poor, I rarely feel rested", scores: { AD: 2, IR: 2, IN: 1 } },
];

const QuizScreen8 = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addScores, getNextRoute } = useQuiz();

  const handleContinue = () => {
    const opt = options.find((o) => o.id === selected);
    if (opt) addScores(opt.scores);
    navigate(getNextRoute(8));
  };

  return (
    <QuizShell questionId={8}>
      <div className="mt-7">
        <h1
          className="font-display"
          style={{ fontSize: "30px", fontWeight: 700, color: "var(--text-ink)", lineHeight: 1.25 }}
        >
          How is your sleep?
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
          Disrupted sleep worsens insulin sensitivity, raises cortisol, and impairs hormone balance.
        </p>
      </div>

      <div className="mt-auto">
        <ContinueButton enabled={!!selected} onClick={handleContinue} />
      </div>
    </QuizShell>
  );
};

export default QuizScreen8;
