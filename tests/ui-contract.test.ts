import { describe, expect, it } from "vitest";
import { coinSummary, testFeed } from "../lib/fixtures";

describe("UI fixture contracts", () => {
  it("keeps the initial withdraw CTA disabled under 5,000 coins", () => {
    expect(coinSummary.balance).toBeLessThan(coinSummary.withdrawMin);
  });

  it("provides a finite card-slide test feed with 2 to 4 thumbnails", () => {
    expect(testFeed.length).toBeGreaterThan(0);
    expect(testFeed.every((test) => test.thumbnails.length >= 2)).toBe(true);
    expect(testFeed.every((test) => test.thumbnails.length <= 4)).toBe(true);
  });

  it("keeps thumbnail options visually neutral with the same dummy title", () => {
    expect(
      testFeed.every((test) =>
        test.thumbnails.every((thumbnail) => thumbnail.title === "새 영상")
      )
    ).toBe(true);
  });
});
