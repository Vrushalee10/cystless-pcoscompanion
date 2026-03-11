import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

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

export type CyclePhase = "Menstrual" | "Follicular" | "Ovulatory" | "Luteal" | null;
export type CycleStatus =
  | "regular"
  | "irregular_short"
  | "irregular_medium"
  | "irregular_long"
  | "never_regular"
  | "post_pill"
  | null;
export type PostPillStage = "very_recent" | "recent" | "recovering" | "late_recovery" | null;

export interface CycleHistoryEntry {
  cycleNumber: number;
  predictedStartDate: string;
  actualStartDate: string;
  daysLate: number;
  periodLength: number | null;
  flow: string | null;
  cycleLength: number | null;
  symptoms: string[];
  notes: string;
}

export interface CycleData {
  periodStartDate: Date | null;
  cycleLength: number;
  currentCycleDay: number | null;
  currentPhase: CyclePhase;
  daysRemainingInPhase: number | null;
  cycleStatus: CycleStatus;
  postPillStage: PostPillStage;
  lastPeriodApprox: string | null;
}

export interface BiometricData {
  userAge: string;
  userHeight: string;
  userWeight: string;
  userHeightUnit: "cm" | "ft";
  userWeightUnit: "kg" | "lbs";
  bmiCategory: string | null;
}

const DEFAULT_FLOW = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function getFlowForGoal(goal: UserGoal): number[] {
  switch (goal) {
    case "fertility":
      return [1, 6, 2, 3, 4, 5, 7, 8, 9];
    case "symptoms":
      return [1, 4, 2, 3, 5, 6, 7, 8, 9];
    case "weight":
      return [1, 4, 8, 2, 3, 5, 6, 7, 9];
    default:
      return [...DEFAULT_FLOW];
  }
}

export function calculateCycleInfo(periodStartDate: Date, cycleLength: number): { currentCycleDay: number; currentPhase: CyclePhase; daysRemainingInPhase: number } {
  const now = new Date();
  const start = new Date(periodStartDate);
  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffMs = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const currentCycleDay = ((diffDays % cycleLength) + cycleLength) % cycleLength + 1;

  let currentPhase: CyclePhase;
  let daysRemainingInPhase: number;

  if (currentCycleDay <= 5) {
    currentPhase = "Menstrual";
    daysRemainingInPhase = 5 - currentCycleDay;
  } else if (currentCycleDay <= 13) {
    currentPhase = "Follicular";
    daysRemainingInPhase = 13 - currentCycleDay;
  } else if (currentCycleDay <= 16) {
    currentPhase = "Ovulatory";
    daysRemainingInPhase = 16 - currentCycleDay;
  } else {
    currentPhase = "Luteal";
    daysRemainingInPhase = cycleLength - currentCycleDay;
  }

  return { currentCycleDay, currentPhase, daysRemainingInPhase };
}

export function calculateBmiCategory(weightKg: number, heightCm: number): string | null {
  if (!weightKg || !heightCm) return null;
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
}

interface QuizState {
  scores: Scores;
  flags: Flags;
  diagnosisStatus: DiagnosisStatus;
  userGoal: UserGoal;
  quizFlow: number[];
  cycleData: CycleData;
  cycleHistory: CycleHistoryEntry[];
  biometrics: BiometricData;
  addScores: (deltas: Partial<Scores>) => void;
  setFlag: <K extends keyof Flags>(key: K, value: Flags[K]) => void;
  setDiagnosisStatus: (status: DiagnosisStatus) => void;
  setUserGoal: (goal: UserGoal) => void;
  setCycleInfo: (periodStartDate: Date, cycleLength: number) => void;
  setCycleStatus: (status: CycleStatus, approx?: string) => void;
  setPostPillInfo: (stage: PostPillStage) => void;
  clearCycleInfo: () => void;
  setBiometrics: (data: Partial<BiometricData>) => void;
  confirmPeriodArrived: (date: string, flow: string | null) => void;
  confirmPeriodEnded: (date: string) => void;
  resetQuiz: () => void;
  getNextRoute: (questionId: number) => string;
  getPrevRoute: (questionId: number) => string;
  getFlowPosition: (questionId: number) => number;
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
const defaultCycleData: CycleData = {
  periodStartDate: null,
  cycleLength: 28,
  currentCycleDay: null,
  currentPhase: null,
  daysRemainingInPhase: null,
  cycleStatus: null,
  postPillStage: null,
  lastPeriodApprox: null,
};
const defaultBiometrics: BiometricData = {
  userAge: "",
  userHeight: "",
  userWeight: "",
  userHeightUnit: "cm",
  userWeightUnit: "kg",
  bmiCategory: null,
};

const QuizContext = createContext<QuizState | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [scores, setScores] = useState<Scores>({ ...defaultScores });
  const [flags, setFlags] = useState<Flags>({ ...defaultFlags });
  const [diagnosisStatus, setDiagnosisStatusState] = useState<DiagnosisStatus>(null);
  const [userGoal, setUserGoalState] = useState<UserGoal>(null);
  const [quizFlow, setQuizFlow] = useState<number[]>([...DEFAULT_FLOW]);
  const [cycleData, setCycleDataState] = useState<CycleData>({ ...defaultCycleData });
  const [biometrics, setBiometricsState] = useState<BiometricData>({ ...defaultBiometrics });

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

  const setDiagnosisStatus = (status: DiagnosisStatus) => setDiagnosisStatusState(status);

  const setUserGoal = (goal: UserGoal) => {
    setUserGoalState(goal);
    setQuizFlow(getFlowForGoal(goal));
  };

  const setCycleInfo = (periodStartDate: Date, cycleLength: number) => {
    const info = calculateCycleInfo(periodStartDate, cycleLength);
    setCycleDataState((prev) => ({
      ...prev,
      periodStartDate,
      cycleLength,
      ...info,
      cycleStatus: "regular",
      postPillStage: null,
      lastPeriodApprox: null,
    }));
  };

  const setCycleStatusFn = (status: CycleStatus, approx?: string) => {
    setCycleDataState((prev) => ({
      ...prev,
      cycleStatus: status,
      currentCycleDay: null,
      currentPhase: null,
      daysRemainingInPhase: null,
      periodStartDate: null,
      lastPeriodApprox: approx || null,
    }));
  };

  const setPostPillInfo = (stage: PostPillStage) => {
    setCycleDataState((prev) => ({
      ...prev,
      cycleStatus: "post_pill",
      postPillStage: stage,
      currentCycleDay: null,
      currentPhase: null,
      daysRemainingInPhase: null,
      periodStartDate: null,
    }));
  };

  const clearCycleInfo = () => setCycleDataState({ ...defaultCycleData });

  const setBiometrics = (data: Partial<BiometricData>) => {
    setBiometricsState((prev) => {
      const updated = { ...prev, ...data };
      // Calculate BMI if both height and weight exist
      if (updated.userHeight && updated.userWeight) {
        let weightKg = parseFloat(updated.userWeight);
        let heightCm = parseFloat(updated.userHeight);
        if (updated.userWeightUnit === "lbs") weightKg = weightKg * 0.453592;
        if (updated.userHeightUnit === "ft") heightCm = heightCm * 30.48;
        updated.bmiCategory = calculateBmiCategory(weightKg, heightCm);
      }
      return updated;
    });
  };

  const resetQuiz = () => {
    setScores({ ...defaultScores });
    setFlags({ ...defaultFlags });
    setDiagnosisStatusState(null);
    setUserGoalState(null);
    setQuizFlow([...DEFAULT_FLOW]);
  };

  const getNextRoute = useCallback((questionId: number): string => {
    const idx = quizFlow.indexOf(questionId);
    if (idx === -1 || idx === quizFlow.length - 1) return "/loading";
    return `/quiz/${quizFlow[idx + 1]}`;
  }, [quizFlow]);

  const getPrevRoute = useCallback((questionId: number): string => {
    const idx = quizFlow.indexOf(questionId);
    if (idx <= 1) return "/quiz/1";
    return `/quiz/${quizFlow[idx - 1]}`;
  }, [quizFlow]);

  const getFlowPosition = useCallback((questionId: number): number => {
    const idx = quizFlow.indexOf(questionId);
    return idx === -1 ? 1 : idx + 1;
  }, [quizFlow]);

  return (
    <QuizContext.Provider value={{
      scores, flags, diagnosisStatus, userGoal, quizFlow, cycleData, biometrics,
      addScores, setFlag, setDiagnosisStatus, setUserGoal,
      setCycleInfo, setCycleStatus: setCycleStatusFn, setPostPillInfo, clearCycleInfo,
      setBiometrics,
      resetQuiz, getNextRoute, getPrevRoute, getFlowPosition,
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
