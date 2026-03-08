import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizShell from "@/components/quiz/QuizShell";
import AnswerCard from "@/components/quiz/AnswerCard";
import NoneOption from "@/components/quiz/NoneOption";
import ContinueButton from "@/components/quiz/ContinueButton";
import { useQuiz, Scores } from "@/context/QuizContext";

const options: { id: string; text: string; scores: Partial<Scores>; flag?: { key: "thyroid"; value: true } }[] = [
  { id: "A", text: "Family history of type 2 diabetes or insulin resistance", scores: { IR: 2 } },
  { id: "B", text: "Thyroid condition (mine or family's)", scores: { IR: 1 }, flag: { key: "thyroid", value: true } },
  { id: "C", text: "Autoimmune condition in the family", scores: { IN: 2 } },
  { id: "D", text: "I exercise rarely or not at all currently", scores: { IR: 1, AD: 1 } },
  { id: "E", text: "My diet is mostly processed or high-sugar foods", scores: { IR: 2, IN: 1 } },
];

const QuizScreen9 = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [none, setNone] = useState(false);
  const navigate = useNavigate();
  const { addScores, setFlag } = useQuiz();

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
          if (opt.flag) {
            setFlag(opt.flag.key, opt.flag.value);
          }
        }
      });
      addScores(totalScores);
    }
    navigate("/loading");
  };

  const hasSelection = selected.size > 0 || none;

  return (
    <QuizShell step={9}>
      <div className="mt-7">
        <h1
          className="font-display"
          style={{ fontSize: "30px", fontWeight: 700, color: "var(--text-ink)", lineHeight: 1.25 }}
        >
          Last few things, does any of this apply to you?
        </h1>
        <p className="font-body mt-2" style={{ fontSize: "14px", color: "var(--text-body)" }}>
          Select all that apply.
        </p>

        <div className="mt-5 flex flex-col gap-[10px]">
          {options.map((opt) => (
            <AnswerCard
              key={opt.id}
              text={opt.text}
              selected={selected.has(opt.id)}
              onSelect={() => toggleOption(opt.id)}
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
          Genetics and lifestyle both shape which PCOS pattern is most active — and both respond to the right support.
        </p>
      </div>

      <div className="mt-auto">
        <ContinueButton enabled={hasSelection} onClick={handleContinue} />
      </div>
    </QuizShell>
  );
};

export default QuizScreen9;
