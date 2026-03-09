import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizShell from "@/components/quiz/QuizShell";
import AnswerCard from "@/components/quiz/AnswerCard";
import ContinueButton from "@/components/quiz/ContinueButton";
import { useQuiz } from "@/context/QuizContext";

const options = [
  { id: "A", text: "Yes, I have a formal diagnosis" },
  { id: "B", text: "I suspect I might, my symptoms point that way" },
  { id: "C", text: "I'm not sure yet" },
  { id: "D", text: "No, I haven't been diagnosed" },
];

const QuizScreen1 = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setFlag, setDiagnosisStatus } = useQuiz();

  const handleContinue = () => {
    if (selected === "A") {
      // Formal diagnosis
      setFlag("diagnosed", true);
      setDiagnosisStatus("diagnosed");
      navigate("/goals/diagnosed");
    } else if (selected === "B") {
      // Suspects PCOS
      setFlag("diagnosed", false);
      setDiagnosisStatus("suspects");
      navigate("/quiz/empathy");
    } else if (selected === "C") {
      // Not sure
      setDiagnosisStatus("unsure");
      navigate("/goals/general");
    } else if (selected === "D") {
      // No diagnosis
      setDiagnosisStatus("no");
      navigate("/goals/general");
    }
  };

  return (
    <QuizShell step={1}>
      <div className="mt-7">
        <h1
          className="font-display"
          style={{ fontSize: "30px", fontWeight: 700, color: "var(--text-ink)", lineHeight: 1.25 }}
        >
          Have you been diagnosed with PCOS?
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
          There are no wrong answers. This helps us understand where you are right now.
        </p>
      </div>

      <div className="mt-auto">
        <ContinueButton enabled={!!selected} onClick={handleContinue} />
      </div>
    </QuizShell>
  );
};

export default QuizScreen1;
