/** Reads a design token (e.g. "--brand-pink") so canvas drawings use the same colors as the page. */
export function cssVar(name: string, fallback = "#333") {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}
