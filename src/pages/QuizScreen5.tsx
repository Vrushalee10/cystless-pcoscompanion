import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizShell from "@/components/quiz/QuizShell";
import AnswerCard from "@/components/quiz/AnswerCard";
import NoneOption from "@/components/quiz/NoneOption";
import ContinueButton from "@/components/quiz/ContinueButton";
import { useQuiz, Scores } from "@/context/QuizContext";

const options: { id: string; text: string; scores: Partial<Scores> }[] = [
  { id: "A", text: "Joint or muscle pain", scores: { IN: 3 } },
  { id: "B", text: "Frequent headaches or migraines", scores: { IN: 3, AD: 1 } },
  { id: "C", text: "Bloating or digestive issues", scores: { IN: 2, IR: 1 } },
  { id: "D", text: "Skin rashes or sensitivities", scores: { IN: 3 } },
  { id: "E", text: "Unexplained fatigue (not meal-related)", scores: { IN: 2, AD: 1 } },
  { id: "F", text: "Food intolerances", scores: { IN: 2 } },
];

const QuizScreen5 = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [none, setNone] = useState(false);
  const navigate = useNavigate();
  const { addScores, getNextRoute } = useQuiz();

  const toggleOption = (id: string) => {
    setNone(false);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleNone = () => {
    if (none) {
      setNone(false);
    } else {
      setNone(true);
      setSelected(new Set());
    }
  };

  const handleContinue = () => {
    if (!none) {
      const totalScores: Partial<Scores> = {};
      options.forEach((opt) => {
        if (selected.has(opt.id)) {
          (Object.keys(opt.scores) as (keyof Scores)[]).forEach((k) => {
            totalScores[k] = (totalScores[k] ?? 0) + (opt.scores[k] ?? 0);
          });
        }
      });
      addScores(totalScores);
    }
    navigate(getNextRoute(5));
  };

  const hasSelection = selected.size > 0 || none;

  return (
    <QuizShell questionId={5}>
      <div className="mt-7">
        <h1
          className="font-display"
          style={{ fontSize: "30px", fontWeight: 700, color: "var(--text-ink)", lineHeight: 1.25 }}
        >
          Do you experience any of these?
        </h1>
        <p className="font-body mt-2" style={{ fontSize: "14px", color: "var(--text-body)" }}>
          Select all that apply.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-[10px]">
          {options.map((opt) => (
            <AnswerCard
              key={opt.id}
              text={opt.text}
              selected={selected.has(opt.id)}
              onSelect={() => toggleOption(opt.id)}
              compact
            />
          ))}
        </div>

        <div className="mt-3">
          <NoneOption selected={none} onSelect={toggleNone} />
        </div>

        <p
          className="font-body italic text-center mt-5"
          style={{ fontSize: "13px", color: "var(--text-muted)" }}
        >
          Chronic low-grade inflammation is found in most women with PCOS, and is often the missing piece.
        </p>
      </div>

      <div className="mt-auto">
        <ContinueButton enabled={hasSelection} onClick={handleContinue} />
      </div>
    </QuizShell>
  );
};

export default QuizScreen5;
