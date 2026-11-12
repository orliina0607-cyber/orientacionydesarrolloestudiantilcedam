import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Button } from "@/components/ui/button";
import { POSITIVE_WORDS, pick } from "@/lib/games-data";
import { ARCADE_SECONDS, REWARDS } from "@/lib/game-rules";
import { sounds } from "@/lib/sound";
import { triggerConfetti } from "@/lib/confetti";
import { cssVar } from "@/lib/css-var";
import { useStars } from "@/lib/stars";
import { GameCard } from "./GameCard";

type Bubble = { x: number; y: number; r: number; speed: number; word: string; emoji: string; color: string };

export function CatchStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubbles = useRef<Bubble[]>([]);
  const raf = useRef(0);
  const scoreRef = useRef(0);
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(ARCADE_SECONDS);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState<number | null>(null);
  const { addStars } = useStars();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (!running) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const white = cssVar("--on-brand", "#fff");
    const colors = Object.fromEntries(POSITIVE_WORDS.map((w) => [w.tone, cssVar(`--brand-${w.tone}`)]));
    let lastSpawn = 0;
    let lastT = performance.now();

    const loop = (t: number) => {
      const dt = Math.min(50, t - lastT) / 16.67;
      lastT = t;
      if (t - lastSpawn > 750) {
        lastSpawn = t;
        const w = pick(POSITIVE_WORDS);
        const r = 34;
        bubbles.current.push({ x: Math.random() * (canvas.width - r * 2) + r, y: -r, r, speed: Math.random() * 1.5 + 1.2, word: w.text, emoji: w.emoji, color: colors[w.tone] ?? white });
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubbles.current = bubbles.current.filter((b) => b.y - b.r <= canvas.height);
      for (const b of bubbles.current) {
        b.y += b.speed * dt;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = white;
        ctx.stroke();
        ctx.fillStyle = white;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 18px Fredoka, sans-serif";
        ctx.fillText(b.emoji, b.x, b.y - 7);
        ctx.font = "bold 11px Fredoka, sans-serif";
        ctx.fillText(b.word, b.x, b.y + 13);
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    const timer = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => {
      cancelAnimationFrame(raf.current);
      clearInterval(timer);
    };
  }, [running]);

  // Game over when time runs out
  useEffect(() => {
    if (!running && timeLeft === 0 && finished === null) {
      const final = scoreRef.current;
      sounds.success();
      triggerConfetti();
      addStars(final);
      setFinished(final);
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  }, [running, timeLeft, finished, addStars]);

  const start = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    bubbles.current = [];
    scoreRef.current = 0;
    setScore(0);
    setTimeLeft(ARCADE_SECONDS);
    setFinished(null);
    setRunning(true);
  };

  const onPointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!running) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for (let i = bubbles.current.length - 1; i >= 0; i--) {
      const b = bubbles.current[i]!;
      if (Math.hypot(x - b.x, y - b.y) <= b.r + 10) {
        sounds.pop();
        bubbles.current.splice(i, 1);
        scoreRef.current += REWARDS.bubbleCaught;
        setScore(scoreRef.current);
        break;
      }
    }
  };

  return (
    <GameCard tag="⚡ Habilidad y Atención Plena" title="Atrapa las Estrellas de la Calma" intro="Toca las burbujas con palabras de convivencia antes de que toquen el suelo.">
      <div className="mx-auto max-w-3xl rounded-3xl border-4 border-leaf-soft bg-card p-4 shadow-pop sm:p-6">
        <div className="mb-3 flex items-center justify-between px-1 text-sm font-bold">
          <span>Tiempo: <span className="rounded-xl bg-leaf px-2.5 py-0.5 text-on-brand">{timeLeft}s</span></span>
          <span>Puntos: <span className="rounded-xl bg-sun px-3 py-0.5">{score}</span></span>
        </div>
        <div className="relative h-[380px] overflow-hidden rounded-2xl border-2 border-leaf bg-gradient-to-b from-sky-soft to-leaf-soft sm:h-[420px]">
          <canvas ref={canvasRef} onPointerDown={onPointerDown} className="block h-full w-full touch-none" />
          {!running && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy/60 p-4 text-center text-on-brand backdrop-blur-sm">
              <div className="animate-gentle-float mb-2 text-6xl">🎈⭐</div>
              <h4 className="mb-2 text-2xl font-bold">{finished !== null ? "¡Tiempo cumplido!" : "¿Listos para atrapar?"}</h4>
              <p className="mb-5 max-w-sm text-sm opacity-90">
                {finished !== null
                  ? `¡Lograste sumar ${finished} puntos atrapando estrellas de paz y convivencia!`
                  : "Atrapa las palabras de luz: Empatía, Respeto, Abrazo, Sonrisa y Paz."}
              </p>
              <Button variant="leaf" size="xl" onClick={start}>{finished !== null ? "¡Jugar otra vez!" : "¡Comenzar Desafío!"}</Button>
            </div>
          )}
        </div>
      </div>
    </GameCard>
  );
}
