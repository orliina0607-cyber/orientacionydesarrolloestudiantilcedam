/** Points and rewards used across the games. */
export const REWARDS = {
  logicCorrect: 5,
  semaforoCorrect: 5,
  artworkSaved: 10,
  bubbleCaught: 10,
  carGood: 10,
  carBad: 10,
} as const;

export const ARCADE_SECONDS = 30;

/** Camilo's car: kind values add points, hurtful ones subtract, never below zero. */
export function carHitScore(score: number, good: boolean) {
  return good ? score + REWARDS.carGood : Math.max(0, score - REWARDS.carBad);
}
