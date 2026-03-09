import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizShell from "@/components/quiz/QuizShell";
import AnswerCard from "@/components/quiz/AnswerCard";
import ContinueButton from "@/components/quiz/ContinueButton";
import { useQuiz, Scores } from "@/context/QuizContext";

const options: { id: string; text: string; scores: Partial<Scores> }[] = [
  { id: "A", text: "Regular and fairly predictable", scores: { AD: 1 } },
  { id: "B", text: "Irregular, cycle length varies month to month", scores: { IR: 2, PP: 2 } },
  { id: "C", text: "Very irregular or I frequently miss periods", scores: { IR: 2, PP: 3 } },
  { id: "D", text: "Painful and/or very heavy", scores: { IN: 2 } },
  { id: "E", text: "I rarely get periods or they've stopped", scores: { IR: 3, PP: 1 } },
];

const QuizScreen6 = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addScores, getNextRoute } = useQuiz();

  const handleContinue = () => {
    const opt = options.find((o) => o.id === selected);
    if (opt) addScores(opt.scores);
    navigate(getNextRoute(6));
  };

  return (
    <QuizShell questionId={6}>
      <div className="mt-7">
        <h1
          className="font-display"
          style={{ fontSize: "30px", fontWeight: 700, color: "var(--text-ink)", lineHeight: 1.25 }}
        >
          How are your periods?
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
          Your menstrual pattern is one of the clearest signals of what's happening hormonally.
        </p>
      </div>

      <div className="mt-auto">
        <ContinueButton enabled={!!selected} onClick={handleContinue} />
      </div>
    </QuizShell>
  );
};

export default QuizScreen6;
