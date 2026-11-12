import { useSyncExternalStore } from "react";

let audioCtx: AudioContext | null = null;
let enabled = true;
const listeners = new Set<() => void>();

export function setSoundOn(value: boolean) {
  enabled = value;
  listeners.forEach((l) => l());
  if (value) playTone(587.33, 0.1);
}

export function useSoundOn() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => enabled,
    () => true,
  );
}

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (Ctor) audioCtx = new Ctor();
  }
  if (audioCtx?.state === "suspended") void audioCtx.resume();
  return audioCtx;
}

export function playTone(freq: number, duration = 0.15, type: OscillatorType = "sine") {
  if (!enabled) return;
  try {
    const ctx = getCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // audio is optional
  }
}

export const sounds = {
  click: () => playTone(500, 0.05),
  pop: () => {
    playTone(600, 0.08, "triangle");
    setTimeout(() => playTone(880, 0.1), 60);
  },
  success: () => {
    playTone(523.25, 0.1);
    setTimeout(() => playTone(659.25, 0.1), 100);
    setTimeout(() => playTone(783.99, 0.12), 200);
    setTimeout(() => playTone(1046.5, 0.2), 300);
  },
  tryAgain: () => {
    playTone(329.63, 0.12, "triangle");
    setTimeout(() => playTone(261.63, 0.2, "triangle"), 120);
  },
};
