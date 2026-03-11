import { useMemo } from "react";
import { useQuiz, CyclePhase } from "@/context/QuizContext";

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

export type PredictionConfidence = "estimated" | "improving" | "personalised";
export type DelayStatus =
  | "on_time"
  | "slightly_late"
  | "late"
  | "significantly_late"
  | "very_late"
  | "early"
  | null;

export interface CycleIntelligence {
  cycleHistory: CycleHistoryEntry[];
  averageCycleLength: number;
  averagePeriodLength: number | null;
  cycleVariability: number | null;
  nextPeriodPredictedDate: Date | null;
  nextOvulationPredictedDate: Date | null;
  daysUntilNextPeriod: number | null;
  predictionConfidence: PredictionConfidence;
  delayStatus: DelayStatus;
  daysLateOrEarly: number;
  periodDueWithin2Days: boolean;
  isInPeriod: boolean;
  currentPeriodDay: number | null;
  delayMessage: string | null;
  patternInsight: string | null;
  badgeText: string;
  badgeBg: string;
  badgeColor: string;
}

function daysBetween(a: Date, b: Date): number {
  const da = new Date(a); da.setHours(0, 0, 0, 0);
  const db = new Date(b); db.setHours(0, 0, 0, 0);
  return Math.round((db.getTime() - da.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDateShort(d: Date): string {
  return d.toLocaleDateString("en-GB", { month: "short", day: "numeric" });
}

export function useCycleIntelligence(): CycleIntelligence {
  const { cycleData, cycleHistory } = useQuiz();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return useMemo(() => {
    const history = cycleHistory || [];
    const completedCycles = history.filter((c) => c.actualStartDate);
    const numCycles = completedCycles.length;

    // Calculate average cycle length
    let averageCycleLength = cycleData.cycleLength || 28;
    const cycleLengths = completedCycles
      .filter((c) => c.cycleLength !== null)
      .map((c) => c.cycleLength as number);

    if (cycleLengths.length >= 3) {
      // Weighted average: most recent counts more
      const weights = cycleLengths.map((_, i) => i + 1);
      const totalWeight = weights.reduce((a, b) => a + b, 0);
      averageCycleLength = Math.round(
        cycleLengths.reduce((sum, len, i) => sum + len * weights[i], 0) / totalWeight
      );
    } else if (cycleLengths.length === 2) {
      averageCycleLength = Math.round((cycleLengths[0] + cycleLengths[1]) / 2);
    } else if (cycleLengths.length === 1) {
      averageCycleLength = cycleLengths[0];
    }

    // Average period length
    const periodLengths = completedCycles
      .filter((c) => c.periodLength !== null)
      .map((c) => c.periodLength as number);
    const averagePeriodLength =
      periodLengths.length >= 1
        ? Math.round(periodLengths.reduce((a, b) => a + b, 0) / periodLengths.length)
        : null;

    // Cycle variability (last 3)
    const last3Lengths = cycleLengths.slice(-3);
    const cycleVariability =
      last3Lengths.length >= 3
        ? Math.max(...last3Lengths) - Math.min(...last3Lengths)
        : null;

    // Prediction confidence
    const predictionConfidence: PredictionConfidence =
      numCycles >= 3 ? "personalised" : numCycles === 2 ? "improving" : "estimated";

    // Next period prediction
    let nextPeriodPredictedDate: Date | null = null;
    let lastActualStart: Date | null = null;

    if (completedCycles.length > 0) {
      const lastCycle = completedCycles[completedCycles.length - 1];
      lastActualStart = new Date(lastCycle.actualStartDate);
      nextPeriodPredictedDate = new Date(lastActualStart);
      nextPeriodPredictedDate.setDate(nextPeriodPredictedDate.getDate() + averageCycleLength);
    } else if (cycleData.periodStartDate) {
      lastActualStart = new Date(cycleData.periodStartDate);
      nextPeriodPredictedDate = new Date(lastActualStart);
      nextPeriodPredictedDate.setDate(nextPeriodPredictedDate.getDate() + averageCycleLength);
    }

    const nextOvulationPredictedDate = lastActualStart
      ? (() => {
          const d = new Date(lastActualStart);
          d.setDate(d.getDate() + averageCycleLength - 14);
          return d;
        })()
      : null;

    const daysUntilNextPeriod = nextPeriodPredictedDate
      ? daysBetween(today, nextPeriodPredictedDate)
      : null;

    // Period due within 2 days
    const periodDueWithin2Days =
      daysUntilNextPeriod !== null && daysUntilNextPeriod >= -2 && daysUntilNextPeriod <= 2;

    // Is currently in period (days 1-5)
    const currentCycleDay = cycleData.currentCycleDay;
    const isInPeriod = currentCycleDay !== null && currentCycleDay >= 1 && currentCycleDay <= 5;
    const currentPeriodDay = isInPeriod ? currentCycleDay : null;

    // Delay detection
    let delayStatus: DelayStatus = "on_time";
    let daysLateOrEarly = 0;
    let delayMessage: string | null = null;

    if (daysUntilNextPeriod !== null && daysUntilNextPeriod < 0) {
      const daysLate = Math.abs(daysUntilNextPeriod);
      daysLateOrEarly = daysLate;

      if (daysLate >= 1 && daysLate <= 3) {
        delayStatus = "slightly_late";
        delayMessage = "Your period is a day or two late — completely normal with PCOS. I'm tracking this. No action needed today.";
      } else if (daysLate >= 4 && daysLate <= 7) {
        delayStatus = "late";
        delayMessage = `Your period is ${daysLate} days late. This is common with PCOS — stress, sleep and diet can all delay it. I'm logging this. If it continues past 10 days, worth mentioning to your doctor.`;
      } else if (daysLate >= 8 && daysLate <= 14) {
        delayStatus = "significantly_late";
        delayMessage = `Your period is now ${daysLate} days late. I'd gently suggest mentioning this to your doctor at your next appointment — especially if this is a new pattern for you. I'll keep tracking.`;
      } else if (daysLate >= 15) {
        delayStatus = "very_late";
        delayMessage = `Your period is ${daysLate} days late. I want to flag this clearly — while late periods are common with PCOS, this length of delay is worth a conversation with your healthcare provider. I'm not alarmed, but I think you should know.`;
      }
    }

    // Pattern insights (after 3+ cycles)
    let patternInsight: string | null = null;
    if (numCycles >= 3 && cycleVariability !== null) {
      if (cycleVariability > 7) {
        patternInsight = `Your cycles have varied by ${cycleVariability} days over the last 3 months — this level of variability is common with PCOS and often linked to stress and insulin levels. Your plan is already targeting this.`;
      } else if (averageCycleLength > 35) {
        patternInsight = `Your average cycle is ${averageCycleLength} days — longer than typical. For your insulin resistance pattern, bringing blood sugar stability up tends to shorten cycles over time. This is a slow process — 3 to 6 months — but it's trackable.`;
      } else if (averagePeriodLength !== null && averagePeriodLength < 3) {
        patternInsight = `Your periods have been shorter than 3 days on average. Light periods can sometimes indicate low progesterone — worth mentioning to your doctor at your next visit.`;
      } else {
        // Check if getting more regular
        const recentVariability = last3Lengths.length >= 3
          ? Math.max(...last3Lengths) - Math.min(...last3Lengths)
          : null;
        if (recentVariability !== null && recentVariability <= 3) {
          patternInsight = `Your cycles are getting more predictable. This is a real sign your hormones are finding balance. Keep going. 💚`;
        }
      }
    }

    // Badge
    let badgeText = "Set up cycle tracking →";
    let badgeBg = "#E2DDD7";
    let badgeColor = "var(--text-muted)";

    if (cycleData.currentCycleDay && cycleData.currentPhase) {
      const confLabel =
        predictionConfidence === "estimated"
          ? " · Estimated"
          : predictionConfidence === "improving"
          ? " · Improving"
          : " · Personalised";

      if (delayStatus === "slightly_late") {
        badgeText = `Day ${cycleData.currentCycleDay} · Period due · Tracking`;
        badgeBg = "hsl(var(--primary-light))";
        badgeColor = "hsl(var(--primary))";
      } else if (delayStatus === "late" || delayStatus === "significantly_late") {
        badgeText = `Period late · Day ${cycleData.currentCycleDay}`;
        badgeBg = "#FFF8ED";
        badgeColor = "#92400E";
      } else if (delayStatus === "very_late") {
        badgeText = `Period ${daysLateOrEarly} days late`;
        badgeBg = "#FCECEA";
        badgeColor = "#D4614F";
      } else {
        badgeText = `Day ${cycleData.currentCycleDay} · ${cycleData.currentPhase} Phase${confLabel}`;
        badgeBg = "hsl(var(--primary-light))";
        badgeColor = "hsl(var(--primary))";
      }
    }

    return {
      cycleHistory: history,
      averageCycleLength,
      averagePeriodLength,
      cycleVariability,
      nextPeriodPredictedDate,
      nextOvulationPredictedDate,
      daysUntilNextPeriod,
      predictionConfidence,
      delayStatus,
      daysLateOrEarly,
      periodDueWithin2Days,
      isInPeriod,
      currentPeriodDay,
      delayMessage,
      patternInsight,
      badgeText,
      badgeBg,
      badgeColor,
    };
  }, [cycleData, cycleHistory]);
}
