import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Download, Eraser, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAINT_COLORS } from "@/lib/games-data";
import { REWARDS } from "@/lib/game-rules";
import { playTone, sounds } from "@/lib/sound";
import { triggerConfetti } from "@/lib/confetti";
import { useStars } from "@/lib/stars";
import { GameCard } from "./GameCard";

type Template = "alegria" | "calma" | "asombro" | "blanco";
const TEMPLATES: { id: Template; emoji: string; label: string }[] = [
  { id: "alegria", emoji: "😊", label: "Alegría" },
  { id: "calma", emoji: "😌", label: "Calma" },
  { id: "asombro", emoji: "😮", label: "Asombro" },
  { id: "blanco", emoji: "📄", label: "Blanco" },
];
const SIZES = [4, 10, 20];
const PAPER = "#ffffff";
const INK = "#334155";

function drawTemplate(ctx: CanvasRenderingContext2D, type: Template) {
  const { width: w, height: h } = ctx.canvas;
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, w, h);
  if (type === "blanco") return;
  const cx = w / 2;
  const cy = h / 2;
  ctx.lineWidth = 4;
  ctx.strokeStyle = INK;
  ctx.fillStyle = INK;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(cx, cy, 140, 0, Math.PI * 2);
  ctx.stroke();
  if (type === "alegria") {
    ctx.beginPath();
    ctx.arc(cx - 50, cy - 35, 14, 0, Math.PI * 2);
    ctx.arc(cx + 50, cy - 35, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.arc(cx, cy + 15, 75, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(cx - 80, cy + 30, 20, 0, Math.PI * 2);
    ctx.moveTo(cx + 100, cy + 30);
    ctx.arc(cx + 80, cy + 30, 20, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  } else if (type === "calma") {
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(cx - 50, cy - 25, 25, 1.1 * Math.PI, 1.9 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + 50, cy - 25, 25, 1.1 * Math.PI, 1.9 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy + 20, 45, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.stroke();
  } else if (type === "asombro") {
    ctx.beginPath();
    ctx.arc(cx - 50, cy - 40, 22, 0, Math.PI * 2);
    ctx.moveTo(cx + 72, cy - 40);
    ctx.arc(cx + 50, cy - 40, 22, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx - 50, cy - 40, 9, 0, Math.PI * 2);
    ctx.arc(cx + 50, cy - 40, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx, cy + 45, 26, 40, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
}

export function DrawingBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const dirty = useRef(false);
  const [color, setColor] = useState<string>(PAINT_COLORS[0]!);
  const [size, setSize] = useState(10);
  const [eraser, setEraser] = useState(false);
  const { addStars } = useStars();

  const ctx = () => canvasRef.current?.getContext("2d") ?? null;

  useEffect(() => {
    const c = ctx();
    if (c) drawTemplate(c, "alegria");
  }, []);

  const point = (e: PointerEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) * canvas.width) / rect.width,
      y: ((e.clientY - rect.top) * canvas.height) / rect.height,
    };
  };

  const stroke = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const c = ctx();
    if (!c) return;
    c.lineWidth = size;
    c.lineCap = "round";
    c.lineJoin = "round";
    c.strokeStyle = eraser ? PAPER : color;
    c.beginPath();
    c.moveTo(from.x, from.y);
    c.lineTo(to.x, to.y);
    c.stroke();
    dirty.current = true;
  };

  const onDown = (e: PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    const p = point(e);
    last.current = p;
    stroke(p, p);
  };
  const onMove = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || !last.current) return;
    const p = point(e);
    stroke(last.current, p);
    last.current = p;
  };
  const onUp = () => {
    drawing.current = false;
    last.current = null;
  };

  const loadTemplate = (t: Template) => {
    const c = ctx();
    if (!c) return;
    drawTemplate(c, t);
    dirty.current = false;
    playTone(550, 0.1);
  };

  const save = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (dirty.current) {
      addStars(REWARDS.artworkSaved);
      dirty.current = false;
    }
    sounds.success();
    triggerConfetti(30);
    const link = document.createElement("a");
    link.download = "mi_emocion_cedam.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <GameCard tag="🎨 Creatividad y Expresión Libre" title="Pizarra de Emociones y Colores" intro="Elige una plantilla o crea tu propia emoción con colores vivos y divertidos.">
      <div className="flex flex-col gap-4 rounded-3xl border-4 border-pink-soft bg-card p-3 shadow-pop sm:p-5 lg:flex-row">
        <div className="flex w-full flex-col gap-3 rounded-2xl bg-pink-soft p-3 lg:w-52">
          <div>
            <span className="mb-1 block text-xs font-bold">Plantilla:</span>
            <div className="grid grid-cols-4 gap-1.5 lg:grid-cols-2">
              {TEMPLATES.map((t) => (
                <Button key={t.id} variant="soft" size="sm" onClick={() => loadTemplate(t.id)}>
                  {t.emoji} <span className="hidden sm:inline">{t.label}</span>
                </Button>
              ))}
            </div>
          </div>
          <div>
            <span className="mb-1 block text-xs font-bold">Colores:</span>
            <div className="flex flex-wrap justify-center gap-1.5 lg:grid lg:grid-cols-5">
              {PAINT_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={`Color ${c}`}
                  onClick={() => { setColor(c); setEraser(false); playTone(400, 0.04); }}
                  className={`h-8 w-8 rounded-full border-2 shadow-soft transition-transform hover:scale-110 ${!eraser && color === c ? "scale-110 border-navy ring-2 ring-navy" : "border-card"}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 lg:flex-col lg:items-start">
            <div className="flex items-center gap-1.5">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-label={`Pincel ${s}`}
                  onClick={() => { setSize(s); playTone(500, 0.04); }}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 bg-card ${size === s ? "border-navy" : "border-border"}`}
                >
                  <span className="rounded-full bg-navy" style={{ width: s / 1.5 + 3, height: s / 1.5 + 3 }} />
                </button>
              ))}
            </div>
            <Button variant="soft" size="sm" data-active={eraser} onClick={() => { setEraser(true); playTone(350, 0.05); }} className={eraser ? "border-pink bg-pink-soft" : ""}>
              <Eraser className="text-pink" /> Borrador
            </Button>
          </div>
          <div className="flex gap-1.5">
            <Button variant="soft" size="sm" className="flex-1" onClick={() => loadTemplate("blanco")}>
              <Trash2 className="text-sos" /> Limpiar
            </Button>
            <Button variant="leaf" size="sm" className="flex-1" onClick={save}>
              <Download /> Guardar
            </Button>
          </div>
        </div>
        <div className="flex flex-grow items-center justify-center overflow-hidden rounded-2xl border-4 border-dashed border-pink-soft bg-card">
          <canvas
            ref={canvasRef}
            width={580}
            height={420}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            className="h-auto max-w-full cursor-crosshair touch-none"
          />
        </div>
      </div>
    </GameCard>
  );
}
