import type { ReliabilityGrade } from "./types";

export const DAILY_VOTE_LIMIT = 5;
export const MAX_RELIABILITY_VOTES = 300;

export function computeGrade(totalVotes: number): ReliabilityGrade {
  if (totalVotes >= 300) return "S";
  if (totalVotes >= 150) return "A";
  if (totalVotes >= 50) return "B";
  return "C";
}

export function computeReliabilityScore(totalVotes: number): number {
  return Math.min(100, Math.round((totalVotes / MAX_RELIABILITY_VOTES) * 100));
}

export function getNextGradeThreshold(grade: ReliabilityGrade): number {
  switch (grade) {
    case "C":
      return 50;
    case "B":
      return 150;
    case "A":
      return 300;
    case "S":
      return 999;
  }
}
