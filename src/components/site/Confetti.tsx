import { useEffect, useRef } from "react";
import { CONFETTI_EVENT } from "@/lib/confetti";
import { cssVar } from "@/lib/css-var";

type P = { x: number; y: number; r: number; dx: number; color: string; tilt: number; angle: number; speed: number };

export function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let particles: P[] = [];
    let raf = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of particles) {
        p.angle += p.speed;
        p.y += (Math.cos(p.angle) + 3 + p.r / 2) / 2;
        p.x += Math.sin(p.angle) * 2 + p.dx * 0.2;
        p.dx *= 0.98;
        if (p.y < canvas.height) {
          alive = true;
          ctx.beginPath();
          ctx.lineWidth = p.r;
          ctx.strokeStyle = p.color;
          ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
          ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
          ctx.stroke();
        }
      }
      raf = alive ? requestAnimationFrame(tick) : 0;
      if (!alive) ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const onFire = (e: Event) => {
      const count = (e as CustomEvent<number>).detail ?? 70;
      const colors = ["--brand-pink", "--brand-sky", "--brand-leaf", "--brand-sun", "--brand-grape", "--brand-coral"].map((c) => cssVar(c));
      particles = Array.from({ length: count }, () => ({
        x: canvas.width / 2 + (Math.random() * 200 - 100),
        y: canvas.height / 3 + (Math.random() * 100 - 50),
        r: Math.random() * 6 + 4,
        dx: (Math.random() - 0.5) * 12,
        color: colors[Math.floor(Math.random() * colors.length)] ?? "#f472b6",
        tilt: Math.random() * 10,
        angle: 0,
        speed: Math.random() * 0.08 + 0.04,
      }));
      cancelAnimationFrame(raf);
      tick();
    };

    window.addEventListener("resize", resize);
    window.addEventListener(CONFETTI_EVENT, onFire);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener(CONFETTI_EVENT, onFire);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[100] h-full w-full" />;
}
