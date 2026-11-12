import { useState } from "react";
import { LOGIC_LEVELS } from "@/lib/games-data";
import { REWARDS } from "@/lib/game-rules";
import { sounds } from "@/lib/sound";
import { triggerConfetti } from "@/lib/confetti";
import { useStars } from "@/lib/stars";
import { GameCard } from "./GameCard";
import { WinDialog } from "./WinDialog";

export function LogicPatterns() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<null | "ok" | "no">(null);
  const [locked, setLocked] = useState(false);
  const [win, setWin] = useState<number | null>(null);
  const { addStars } = useStars();
  const level = LOGIC_LEVELS[index]!;

  const answer = (opt: string) => {
    if (locked) return;
    if (opt === level.missing) {
      sounds.success();
      const newScore = score + 1;
      setScore(newScore);
      addStars(REWARDS.logicCorrect);
      setFeedback("ok");
      setLocked(true);
      setTimeout(() => {
        if (index + 1 >= LOGIC_LEVELS.length) {
          triggerConfetti();
          setWin(newScore);
          setIndex(0);
          setScore(0);
        } else {
          setIndex(index + 1);
        }
        setFeedback(null);
        setLocked(false);
      }, 1300);
    } else {
      sounds.tryAgain();
      setFeedback("no");
    }
  };

  return (
    <GameCard tag="🧩 Razonamiento y Concentración" title="Desafío de Patrones Emocionales" intro="Observa la serie con atención: ¿cuál es la figura que falta para completarla?">
      <div className="mx-auto flex max-w-3xl flex-col items-center rounded-3xl border-4 border-sky-soft bg-card p-5 shadow-pop sm:p-8">
        <div className="mb-6 flex w-full items-center justify-between border-b border-border pb-2">
          <span className="rounded-xl bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">Nivel {index + 1} de {LOGIC_LEVELS.length}</span>
          <span className="rounded-xl border border-sun bg-sun-soft px-3 py-1 text-sm font-bold">🎯 Aciertos: {score}</span>
        </div>
        <div className="mb-8 flex w-full flex-wrap items-center justify-center gap-2 rounded-3xl border-2 border-sky-soft bg-sky-soft p-4 sm:gap-4">
          {level.sequence.map((item, i) => (
            <div key={i} className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-border bg-card text-3xl shadow-soft sm:h-16 sm:w-16 sm:text-4xl">{item}</div>
          ))}
          <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-2xl border-2 border-dashed border-pink bg-pink-soft text-3xl sm:h-16 sm:w-16 sm:text-4xl">
            {feedback === "ok" ? level.missing : "❓"}
          </div>
        </div>
        <h4 className="mb-4 text-center text-lg font-bold sm:text-xl">¿Cuál completa la secuencia en el signo de interrogación?</h4>
        <div className="mb-4 grid w-full max-w-lg grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {level.options.map((opt) => (
            <button key={opt} type="button" disabled={locked} onClick={() => answer(opt)} className="flex items-center justify-center rounded-2xl border-[3px] border-sky-soft bg-card p-4 text-4xl shadow-soft transition hover:border-primary active:scale-95 disabled:opacity-70 sm:p-5">
              {opt}
            </button>
          ))}
        </div>
        {feedback && (
          <div className={`animate-rise-in w-full rounded-2xl border p-3 text-center font-bold ${feedback === "ok" ? "border-leaf bg-leaf-soft" : "border-pink bg-pink-soft"}`}>
            {feedback === "ok" ? "🎉 ¡Excelente razonamiento! Completaste la serie lógica." : "🤔 ¡Cerca! Observa qué figura o emoción se repite en orden."}
          </div>
        )}
      </div>
      <WinDialog open={win !== null} onClose={() => setWin(null)} title="¡Genio de los Patrones Lógicos!" desc={`¡Fantástico! Completaste todos los desafíos lógicos con ${win ?? 0} respuestas correctas.`} />
    </GameCard>
  );
}
