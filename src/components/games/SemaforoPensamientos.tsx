import { useState } from "react";
import { TRAFFIC_STEPS } from "@/lib/games-data";
import { playTone } from "@/lib/sound";
import { GameCard } from "./GameCard";

type C = keyof typeof TRAFFIC_STEPS;
const ORDER: { id: C; bg: string; border: string; text: string; label: string }[] = [
  { id: "red", bg: "bg-sos", border: "border-sos", text: "text-sos", label: "Rojo" },
  { id: "yellow", bg: "bg-sun", border: "border-sun", text: "text-coral", label: "Amarillo" },
  { id: "green", bg: "bg-leaf", border: "border-leaf", text: "text-leaf", label: "Verde" },
];

export function SemaforoPensamientos() {
  const [color, setColor] = useState<C>("red");
  const step = TRAFFIC_STEPS[color];
  const current = ORDER.find((o) => o.id === color)!;

  return (
    <GameCard tag="🚦 Pausa antes de hablar" title="El Semáforo de mis Pensamientos y Palabras" intro="Toca cada luz para practicar la estrategia antes de responder a tus compañeros.">
      <div className="flex flex-wrap items-center justify-center gap-8">
        <div className="flex flex-col gap-4 rounded-[35px] bg-light-off p-5 shadow-pop">
          {ORDER.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-label={o.label}
              aria-pressed={color === o.id}
              onClick={() => { setColor(o.id); playTone(o.id === "red" ? 330 : o.id === "yellow" ? 440 : 550, 0.1); }}
              className={`h-20 w-20 rounded-full transition ${o.bg} ${color === o.id ? "scale-110 opacity-100 shadow-pop" : "opacity-30 hover:opacity-60"}`}
            />
          ))}
        </div>
        <div key={color} className={`animate-rise-in max-w-md rounded-3xl border-l-[10px] bg-card p-6 shadow-pop ${current.border}`}>
          <h4 className={`font-display text-2xl font-bold ${current.text}`}>{step.head}</h4>
          <p className="mt-2 text-base leading-relaxed">{step.desc}</p>
          <div className="mt-4 rounded-xl bg-sun-soft p-3 font-bold">{step.example}</div>
        </div>
      </div>
    </GameCard>
  );
}
