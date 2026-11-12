import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CAR_ITEMS, pick } from "@/lib/games-data";
import { carHitScore } from "@/lib/game-rules";
import { sounds } from "@/lib/sound";
import { cssVar } from "@/lib/css-var";
import { GameCard } from "./GameCard";

const W = 500;
const H = 320;
const CAR_W = 50;
const MIN_X = 40;
const MAX_X = 420;

type Item = { x: number; y: number; text: string; good: boolean; color: string };

export function CarRace() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const carX = useRef(225);
  const itemsRef = useRef<Item[]>([]);
  const scoreRef = useRef(0);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);

  const move = (dir: -1 | 1) => {
    carX.current = Math.min(MAX_X, Math.max(MIN_X, carX.current + dir * 45));
  };

  useEffect(() => {
    if (!running) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); move(1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const road = cssVar("--game-road");
    const lane = cssVar("--on-brand", "#fff");
    const car = cssVar("--brand-navy");
    const glass = cssVar("--brand-sky-soft");
    const lights = cssVar("--brand-sun");
    const colors = Object.fromEntries(CAR_ITEMS.map((i) => [i.tone, cssVar(`--brand-${i.tone}`)]));
    let raf = 0;
    let lastSpawn = 0;
    let lastT = performance.now();
    let offset = 0;

    const draw = (t: number) => {
      const dt = Math.min(50, t - lastT) / 16.67;
      lastT = t;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = road;
      ctx.fillRect(30, 0, 440, H);
      if (running) offset = (offset + 2.6 * dt) % 30;
      ctx.strokeStyle = lane;
      ctx.setLineDash([15, 15]);
      ctx.lineDashOffset = -offset;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(250, 0);
      ctx.lineTo(250, H);
      ctx.stroke();
      ctx.setLineDash([]);

      const x = carX.current;
      ctx.fillStyle = car;
      ctx.fillRect(x, 250, CAR_W, 60);
      ctx.fillStyle = glass;
      ctx.fillRect(x + 5, 260, 40, 20);
      ctx.fillStyle = lights;
      ctx.fillRect(x + 8, 252, 10, 6);
      ctx.fillRect(x + 32, 252, 10, 6);

      if (running) {
        if (t - lastSpawn > 1600) {
          lastSpawn = t;
          const type = pick(CAR_ITEMS);
          itemsRef.current.push({ x: Math.random() * 400 + 50, y: -20, text: type.text, good: type.good, color: colors[type.tone] ?? lane });
        }
        const keep: Item[] = [];
        for (const it of itemsRef.current) {
          it.y += 2.6 * dt;
          if (it.y > 240 && it.y < 310 && Math.abs(it.x - (carX.current + CAR_W / 2)) < 35) {
            scoreRef.current = carHitScore(scoreRef.current, it.good);
            setScore(scoreRef.current);
            if (it.good) sounds.pop();
            else sounds.tryAgain();
            continue;
          }
          if (it.y <= 330) keep.push(it);
        }
        itemsRef.current = keep;
      }
      for (const it of itemsRef.current) {
        ctx.fillStyle = it.color;
        ctx.beginPath();
        ctx.arc(it.x, it.y, 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = lane;
        ctx.font = "bold 11px Quicksand, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(it.text, it.x, it.y + 4);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  const onTap = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!running) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) * W) / rect.width;
    move(x < carX.current + CAR_W / 2 ? -1 : 1);
  };

  return (
    <GameCard tag="🚗 Arcade emocional" title="¡El Carro de Camilo: Atrapa la Emoción Correcta!" intro="Usa las flechas ⬅️ ➡️ o toca la pista para atrapar valores positivos (Empatía, Calma, Respeto) y esquivar lo que lastima.">
      <div className="mx-auto max-w-2xl rounded-3xl border-[3px] border-dashed border-primary bg-sky-soft p-4 sm:p-6">
        <div className="mb-3 flex items-center justify-between">
          <Button variant={running ? "soft" : "leaf"} onClick={() => setRunning((r) => !r)}>
            {running ? "⏸ Pausar" : score > 0 ? "▶ Seguir" : "▶ Arrancar"}
          </Button>
          <span className="rounded-full bg-card px-4 py-1.5 font-display text-lg font-bold text-primary">Puntos: {score}</span>
        </div>
        <canvas ref={canvasRef} width={W} height={H} onPointerDown={onTap} className="mx-auto block h-auto w-full max-w-[500px] touch-none rounded-2xl shadow-pop" />
        <div className="mt-4 flex justify-center gap-4">
          <Button variant="pill" size="lg" onClick={() => move(-1)} disabled={!running}><ArrowLeft /> Izquierda</Button>
          <Button variant="pill" size="lg" onClick={() => move(1)} disabled={!running}>Derecha <ArrowRight /></Button>
        </div>
      </div>
    </GameCard>
  );
}
