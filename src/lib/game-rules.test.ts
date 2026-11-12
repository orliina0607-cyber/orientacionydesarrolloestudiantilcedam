import { describe, expect, it } from "vitest";
import { carHitScore } from "./game-rules";

describe("Carro de Camilo scoring", () => {
  it("adds 10 points when catching a kind value", () => {
    expect(carHitScore(20, true)).toBe(30);
  });
  it("subtracts 10 points when catching a hurtful word", () => {
    expect(carHitScore(20, false)).toBe(10);
  });
  it("never goes below zero", () => {
    expect(carHitScore(0, false)).toBe(0);
  });
});
