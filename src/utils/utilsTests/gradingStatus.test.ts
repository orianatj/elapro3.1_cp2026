import { canShowScore } from "../gradingStatus";

describe("canShowScore", () => {
  it("returns true for graded statuses", () => {
    expect(canShowScore("ai_graded")).toBe(true);
    expect(canShowScore("teacher_validated")).toBe(true);
    expect(canShowScore("teacher_reviewed")).toBe(true);
  });

  it("returns false for non-graded statuses", () => {
    expect(canShowScore("pending")).toBe(false);
    expect(canShowScore("processing")).toBe(false);
    expect(canShowScore("failed")).toBe(false);
    expect(canShowScore("unknown")).toBe(false);
  });
});
