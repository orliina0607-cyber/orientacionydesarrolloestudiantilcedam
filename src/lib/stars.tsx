import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type StarsCtx = { stars: number; addStars: (n: number) => void };
const Ctx = createContext<StarsCtx>({ stars: 0, addStars: () => {} });

export function StarsProvider({ children }: { children: ReactNode }) {
  const [stars, setStars] = useState(0);
  const addStars = useCallback((n: number) => setStars((s) => s + n), []);
  return <Ctx.Provider value={{ stars, addStars }}>{children}</Ctx.Provider>;
}

export const useStars = () => useContext(Ctx);
