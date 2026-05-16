import { describe, expect, it } from "vitest";
import { computeGrade, computeReliabilityScore } from "../lib/scoring";

describe("response-based scoring", () => {
  it.each([
    [0, "C", 0],
    [5, "C", 2],
    [50, "B", 17],
    [150, "A", 50],
    [300, "S", 100],
  ])("%i votes -> %s grade and %i reliability", (votes, grade, reliability) => {
    expect(computeGrade(votes)).toBe(grade);
    expect(computeReliabilityScore(votes)).toBe(reliability);
  });
});
