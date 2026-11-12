import { createFileRoute } from "@tanstack/react-router";
import { useState, type ComponentType } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarsProvider, useStars } from "@/lib/stars";
import { setSoundOn, sounds, useSoundOn } from "@/lib/sound";
import { DrawingBoard } from "@/components/games/DrawingBoard";
import { LogicPatterns } from "@/components/games/LogicPatterns";
import { CatchStars } from "@/components/games/CatchStars";
import { SemaforoConvivencia } from "@/components/games/SemaforoConvivencia";
import { CarRace } from "@/components/games/CarRace";
import { SemaforoPensamientos } from "@/components/games/SemaforoPensamientos";
import { DetectivePalabras } from "@/components/games/DetectivePalabras";
import { CajaPalabras } from "@/components/games/CajaPalabras";

export const Route = createFileRoute("/juegos")({
  head: () => ({
    meta: [
      { title: "Zona de Juegos CEDAM · Aprende Jugando" },
      { name: "description", content: "Ocho juegos para colorear emociones, pensar con lógica, practicar el semáforo de convivencia y usar palabras amables." },
      { property: "og:title", content: "Zona de Juegos CEDAM · Aprende Jugando" },
      { property: "og:description", content: "Juegos educativos de emociones y convivencia para estudiantes del Colegio CEDAM." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JuegosPage,
});

const GAMES: { id: string; label: string; Comp: ComponentType }[] = [
  { id: "colorear", label: "🎨 Colorear Emociones", Comp: DrawingBoard },
  { id: "logica", label: "🧩 Lógica y Patrones", Comp: LogicPatterns },
  { id: "reflejos", label: "⚡ Reflejos de Calma", Comp: CatchStars },
  { id: "semaforo", label: "🚦 Semáforo Convivencia", Comp: SemaforoConvivencia },
  { id: "carro", label: "🚗 Carro de Camilo", Comp: CarRace },
  { id: "pensamientos", label: "🛑 Semáforo de Pensamientos", Comp: SemaforoPensamientos },
  { id: "detective", label: "🔍 Detective de Palabras", Comp: DetectivePalabras },
  { id: "caja", label: "🎁 Caja de Palabras Bonitas", Comp: CajaPalabras },
];

function JuegosPage() {
  return (
    <StarsProvider>
      <GamesHub />
    </StarsProvider>
  );
}

function GamesHub() {
  const [active, setActive] = useState(GAMES[0]!.id);
  const { stars } = useStars();
  const soundOn = useSoundOn();
  const game = GAMES.find((g) => g.id === active)!;

  return (
    <div className="pt-8">
      <div className="mb-6 text-center text-on-brand">
        <h1 className="text-3xl font-bold drop-shadow sm:text-5xl">🎮 Zona de Juegos y Gimnasio Emocional</h1>
        <p className="mt-2 text-base opacity-90 sm:text-lg">
          Acompaña a <b>Camilo y Camila</b> a entrenar la mente y el corazón.
        </p>
      </div>

      <div className="rounded-[40px] border-[5px] border-leaf bg-card/95 p-4 shadow-pop sm:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
          <span className="flex items-center gap-1.5 rounded-2xl border-2 border-sun bg-sun-soft px-4 py-1.5 font-display font-bold">
            ⭐ {stars} <span className="text-sm font-normal">puntos</span>
          </span>
          <Button variant="soft" onClick={() => setSoundOn(!soundOn)} aria-pressed={soundOn}>
            {soundOn ? <Volume2 className="text-primary" /> : <VolumeX className="text-muted-foreground" />}
            Sonido: {soundOn ? "ON" : "OFF"}
          </Button>
        </div>

        <nav className="mb-8 flex flex-wrap justify-center gap-2" aria-label="Juegos">
          {GAMES.map((g) => (
            <Button
              key={g.id}
              variant="chip"
              data-active={g.id === active}
              aria-pressed={g.id === active}
              onClick={() => { setActive(g.id); sounds.click(); }}
            >
              {g.label}
            </Button>
          ))}
        </nav>

        <game.Comp key={game.id} />
      </div>
    </div>
  );
}
