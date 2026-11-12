import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { PHRASES } from "@/lib/games-data";
import { sounds } from "@/lib/sound";
import { GameCard } from "./GameCard";

export function DetectivePalabras() {
  const [idx, setIdx] = useState(0);
  const [result, setResult] = useState<null | { ok: boolean; text: string }>(null);
  const [hits, setHits] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const p = PHRASES[idx]!;

  const check = (isKind: boolean) => {
    if (result) return;
    const ok = isKind === p.kind;
    if (ok) { sounds.success(); setHits((h) => h + 1); } else sounds.tryAgain();
    setResult({ ok, text: p.alt });
    timer.current = setTimeout(() => {
      setIdx((i) => (i + 1) % PHRASES.length);
      setResult(null);
    }, 3000);
  };

  return (
    <GameCard tag="🔍 Detective" title="El Detective de las Palabras" intro="Analiza la frase presentada por Camila y decide si es una frase que suma o que lastima.">
      <div className="mx-auto max-w-xl rounded-3xl bg-card p-6 text-center shadow-pop">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Aciertos: {hits}</p>
        <p key={idx} className="animate-rise-in mb-5 flex min-h-16 items-center justify-center font-display text-2xl">{p.text}</p>
        <div className="flex justify-center gap-4">
          <Button size="xl" variant="soft" disabled={!!result} onClick={() => check(false)} className="border-2 border-sos bg-pink-soft">❌ Lastima</Button>
          <Button size="xl" variant="soft" disabled={!!result} onClick={() => check(true)} className="border-2 border-leaf bg-leaf-soft">💚 Es Amable</Button>
        </div>
        <div className="mt-5 min-h-12 font-semibold">
          {result && (
            <p className={`animate-rise-in ${result.ok ? "text-leaf" : "text-sos"}`}>
              {result.ok ? "✅ ¡Correcto, Detective! " : "⚠️ ¡Ojo! Analiza bien: "}
              {result.text}
            </p>
          )}
        </div>
      </div>
    </GameCard>
  );
}
