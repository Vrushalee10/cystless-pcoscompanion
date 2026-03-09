import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Scores {
  IR: number;
  AD: number;
  IN: number;
  PP: number;
}

export interface Flags {
  diagnosed: boolean | null;
  postpill: boolean;
  recenttest: boolean;
  oldtest: boolean;
  notested: boolean;
  thyroid: boolean;
}

export type DiagnosisStatus = "diagnosed" | "suspects" | "unsure" | "no" | null;
export type UserGoal = 
  | "symptoms" 
  | "cycle" 
  | "fertility" 
  | "weight" 
  | "understand" 
  | "feel_better" 
  | "new_diagnosis" 
  | null;

interface QuizState {
  scores: Scores;
  flags: Flags;
  diagnosisStatus: DiagnosisStatus;
  userGoal: UserGoal;
  addScores: (deltas: Partial<Scores>) => void;
  setFlag: <K extends keyof Flags>(key: K, value: Flags[K]) => void;
  setDiagnosisStatus: (status: DiagnosisStatus) => void;
  setUserGoal: (goal: UserGoal) => void;
  resetQuiz: () => void;
}

const defaultScores: Scores = { IR: 0, AD: 0, IN: 0, PP: 0 };
const defaultFlags: Flags = {
  diagnosed: null,
  postpill: false,
  recenttest: false,
  oldtest: false,
  notested: false,
  thyroid: false,
};

const QuizContext = createContext<QuizState | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [scores, setScores] = useState<Scores>({ ...defaultScores });
  const [flags, setFlags] = useState<Flags>({ ...defaultFlags });
  const [diagnosisStatus, setDiagnosisStatusState] = useState<DiagnosisStatus>(null);
  const [userGoal, setUserGoalState] = useState<UserGoal>(null);

  const addScores = (deltas: Partial<Scores>) => {
    setScores((prev) => ({
      IR: prev.IR + (deltas.IR ?? 0),
      AD: prev.AD + (deltas.AD ?? 0),
      IN: prev.IN + (deltas.IN ?? 0),
      PP: prev.PP + (deltas.PP ?? 0),
    }));
  };

  const setFlag = <K extends keyof Flags>(key: K, value: Flags[K]) => {
    setFlags((prev) => ({ ...prev, [key]: value }));
  };

  const setDiagnosisStatus = (status: DiagnosisStatus) => {
    setDiagnosisStatusState(status);
  };

  const setUserGoal = (goal: UserGoal) => {
    setUserGoalState(goal);
  };

  const resetQuiz = () => {
    setScores({ ...defaultScores });
    setFlags({ ...defaultFlags });
    setDiagnosisStatusState(null);
    setUserGoalState(null);
  };

  return (
    <QuizContext.Provider value={{ 
      scores, 
      flags, 
      diagnosisStatus, 
      userGoal, 
      addScores, 
      setFlag, 
      setDiagnosisStatus, 
      setUserGoal, 
      resetQuiz 
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
};
