import { useState } from "react";
import { Button } from "@/components/ui/button";
import { KIND_CARDS, pick } from "@/lib/games-data";
import { sounds } from "@/lib/sound";
import { GameCard } from "./GameCard";

export function CajaPalabras() {
  const [card, setCard] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  const open = () => {
    let next = pick(KIND_CARDS);
    while (next === card) next = pick(KIND_CARDS);
    setCard(next);
    setCount(0);
    sounds.pop();
  };

  return (
    <GameCard tag="🎁 Cortesía diaria" title="La Caja Mágica de Palabras Bonitas" intro="Abre el cofre de Camila para sacar tu misión de cortesía del día.">
      <div className="text-center">
        <button type="button" onClick={open} className="inline-block transition-transform hover:scale-105 active:scale-95">
          <svg width="140" height="118" viewBox="0 0 100 80" aria-hidden>
            <path d="M 10 35 Q 50 15 90 35 L 90 70 Q 50 85 10 70 Z" className="fill-sun stroke-coral" strokeWidth="4" />
            <path d="M 8 35 Q 50 10 92 35 L 82 20 Q 50 0 18 20 Z" className="fill-sun-soft stroke-coral" strokeWidth="4" />
            <circle cx="50" cy="50" r="7" className="fill-navy" />
          </svg>
          <span className="mt-1 block font-display font-bold text-coral">¡Toca el cofre!</span>
        </button>
        {card && (
          <div key={card} className="animate-rise-in mx-auto mt-5 max-w-md rounded-3xl border-[3px] border-sun bg-card p-5 shadow-pop">
            <div className="text-sm font-bold uppercase text-coral">Tu frase mágica para hoy:</div>
            <div className="my-2 font-display text-2xl">{card}</div>
            <p className="text-sm text-muted-foreground">Reto: úsala con al menos 2 personas hoy en el patio o en casa.</p>
            <div className="mt-3 flex items-center justify-center gap-3">
              <span>Veces usadas hoy: <b className="text-lg text-leaf">{count}</b></span>
              <Button size="sm" variant="leaf" onClick={() => { setCount((c) => c + 1); sounds.click(); }}>+1 Sumar uso</Button>
            </div>
            {count >= 2 && <p className="mt-2 font-bold text-leaf">🌟 ¡Reto cumplido!</p>}
          </div>
        )}
      </div>
    </GameCard>
  );
}
