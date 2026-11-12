import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEMAFORO_SCENARIOS, type Light } from "@/lib/games-data";
import { REWARDS } from "@/lib/game-rules";
import { sounds } from "@/lib/sound";
import { triggerConfetti } from "@/lib/confetti";
import { useStars } from "@/lib/stars";
import { GameCard } from "./GameCard";
import { WinDialog } from "./WinDialog";

const LIGHTS: { id: Light; dot: string; label: string; hint: string; cls: string }[] = [
  { id: "verde", dot: "🟢", label: "¡Luz Verde!", hint: "Fomenta la armonía y amistad", cls: "bg-leaf" },
  { id: "amarillo", dot: "🟡", label: "¡Luz Amarilla!", hint: "Cuidado / Necesito pensar o pedir ayuda", cls: "bg-sun text-navy" },
  { id: "rojo", dot: "🔴", label: "¡Luz Roja!", hint: "¡Alto! Daña o hace sentir mal", cls: "bg-sos" },
];

export function SemaforoConvivencia() {
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<null | "ok" | "no">(null);
  const [locked, setLocked] = useState(false);
  const [win, setWin] = useState(false);
  const { addStars } = useStars();
  const q = SEMAFORO_SCENARIOS[index]!;

  const check = (c: Light) => {
    if (locked) return;
    if (c === q.color) {
      sounds.success();
      addStars(REWARDS.semaforoCorrect);
      setResult("ok");
      setLocked(true);
      setTimeout(() => {
        if (index + 1 >= SEMAFORO_SCENARIOS.length) {
          triggerConfetti();
          setWin(true);
          setIndex(0);
        } else setIndex(index + 1);
        setResult(null);
        setLocked(false);
      }, 1800);
    } else {
      sounds.tryAgain();
      setResult("no");
    }
  };

  const reset = () => {
    setIndex(0);
    setResult(null);
    setLocked(false);
  };

  return (
    <GameCard tag="🚦 Decisiones y Amabilidad" title="Semáforo de Convivencia Escolar" intro="Lee la situación escolar y clasifícala en Verde, Amarillo o Rojo.">
      <div className="mx-auto max-w-3xl">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-sun px-3 py-1 text-sm font-bold shadow-soft">⭐ Progreso: {index + 1} / {SEMAFORO_SCENARIOS.length}</span>
          <Button variant="soft" size="sm" onClick={reset}><RotateCcw /> Reiniciar</Button>
        </div>
        <div key={index} className="animate-rise-in mb-5 rounded-3xl border-4 border-sky-soft bg-card p-6 text-center shadow-pop sm:p-8">
          <span className="inline-block rounded-full bg-sky-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">{q.badge}</span>
          <div className="my-3 text-7xl">{q.emoji}</div>
          <p className="mb-2 font-display text-xl font-bold leading-relaxed sm:text-2xl">{q.text}</p>
          <p className="text-sm text-muted-foreground">¿Cómo clasificarías esta conducta para una sana convivencia?</p>
        </div>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
          {LIGHTS.map((l) => (
            <button key={l.id} type="button" disabled={locked} onClick={() => check(l.id)} className={`group flex flex-col items-center rounded-2xl p-3.5 text-on-brand shadow-soft transition active:scale-95 disabled:opacity-70 ${l.cls}`}>
              <span className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-card/60 text-xl transition-transform group-hover:scale-110">{l.dot}</span>
              <span className="font-display text-lg font-bold">{l.label}</span>
              <span className="text-xs opacity-90">{l.hint}</span>
            </button>
          ))}
        </div>
        {result && (
          <div className={`animate-rise-in mt-4 rounded-2xl border-2 bg-card p-4 text-center font-semibold ${result === "ok" ? "border-leaf" : "border-sun"}`}>
            <span className="font-display text-xl">{result === "ok" ? "🌟 ¡Decisión ejemplar!" : "🤔 ¡Piénsalo de nuevo!"}</span>
            {result === "ok" && <p className="mt-1">{q.feedback}</p>}
            {result === "no" && <p className="mt-1">Lee otra vez la situación: ¿ayuda, preocupa o lastima?</p>}
          </div>
        )}
      </div>
      <WinDialog open={win} onClose={() => setWin(false)} title="¡Guardián del Semáforo CEDAM!" desc="¡Impresionante! Sabes perfectamente cómo construir una convivencia basada en el diálogo, la paz y el respeto." />
    </GameCard>
  );
}
