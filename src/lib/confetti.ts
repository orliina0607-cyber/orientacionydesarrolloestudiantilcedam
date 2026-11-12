export const CONFETTI_EVENT = "cedam:confetti";
export const OPEN_SOS_EVENT = "cedam:open-sos";

export function triggerConfetti(count = 70) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONFETTI_EVENT, { detail: count }));
}

export function openSos() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_SOS_EVENT));
}
