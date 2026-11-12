import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Crosshair as Bullseye, Gamepad2, GraduationCap, Heart, HeartPulse, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EVENTIFICA_URL, FAMILY_TIPS, STAGES, type Pillar } from "@/lib/site-data";
import { openSos } from "@/lib/confetti";
import heroImg from "@/assets/camilo-camila-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Colegio Bilingüe CEDAM · Orientación y Desarrollo Estudiantil" },
      { name: "description", content: "Etapas del desarrollo de 3 a 18 años, juegos de convivencia y pautas para familias del Colegio Bilingüe CEDAM." },
      { property: "og:title", content: "Colegio Bilingüe CEDAM · Orientación y Desarrollo Estudiantil" },
      { property: "og:description", content: "Etapas del desarrollo, juegos emocionales y Escuela para Familias CEDAM." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const CRAYONS = ["bg-leaf", "bg-pink", "bg-coral", "bg-grape"];

function PillarCard({ pillar, kind }: { pillar: Pillar; kind: "emo" | "ins" | "att" }) {
  const style = {
    emo: { border: "border-t-pink", text: "text-pink", Icon: Heart },
    ins: { border: "border-t-leaf", text: "text-leaf", Icon: ListChecks },
    att: { border: "border-t-sun", text: "text-coral", Icon: Bullseye },
  }[kind];
  return (
    <div className={`rounded-3xl border-t-8 bg-background p-6 shadow-soft ${style.border}`}>
      <h4 className={`mb-4 flex items-center gap-2 text-xl font-bold ${style.text}`}>
        <style.Icon className="h-5 w-5" /> {pillar.title}
      </h4>
      <ul className="space-y-3">
        {pillar.items.map((it) => (
          <li key={it.label} className="relative pl-6 text-[15px] leading-relaxed">
            <span className="absolute left-0 font-bold text-primary">✔</span>
            <strong>{it.label}:</strong> {it.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Index() {
  const [stage, setStage] = useState(0);
  const s = STAGES[stage]!;

  return (
    <div className="pt-8">
      {/* Portada */}
      <section className="relative overflow-hidden rounded-[40px] border-4 border-card shadow-pop">
        <img src={heroImg} alt="Camilo y Camila volando entre nubes con crayones gigantes" width={1536} height={864} className="h-[420px] w-full object-cover sm:h-[520px]" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center bg-gradient-to-t from-navy/85 via-navy/40 to-transparent px-4 pb-8 pt-24 text-center text-on-brand">
          <h1 className="text-4xl font-bold drop-shadow sm:text-6xl">Colegio Bilingüe CEDAM</h1>
          <p className="mt-2 max-w-xl text-base font-semibold sm:text-xl">Orientación, convivencia y desarrollo estudiantil · <em>"Constructing knowledge with artistic skills."</em></p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button asChild variant="sun" size="xl">
              <Link to="/juegos"><Gamepad2 /> Ir a la Zona de Juegos</Link>
            </Button>
            <Button variant="sos" size="xl" onClick={openSos}>
              <HeartPulse /> Hablar con Orientación
            </Button>
          </div>
        </div>
      </section>
      <div className="-mt-4 flex items-end justify-center gap-4" aria-hidden>
        {CRAYONS.map((c, i) => (
          <div key={c} className={`crayon-tip w-10 rounded-b-md shadow-soft sm:w-12 ${c}`} style={{ height: 70 + (i % 2) * 20 }} />
        ))}
      </div>

      {/* Etapas */}
      <section className="mt-14">
        <h2 className="mb-6 flex items-center justify-center gap-3 text-center text-3xl font-bold text-on-brand drop-shadow sm:text-4xl">
          <GraduationCap className="h-8 w-8" /> Etapas del Desarrollo Estudiantil CEDAM
        </h2>
        <div className="mb-8 flex flex-wrap justify-center gap-3" role="tablist">
          {STAGES.map((st, i) => (
            <Button
              key={st.pill}
              role="tab"
              aria-selected={i === stage}
              variant="pill"
              size="lg"
              onClick={() => setStage(i)}
              className={i === stage ? "-translate-y-1 bg-sun shadow-pop" : ""}
            >
              {st.pill}
            </Button>
          ))}
        </div>
        <div key={stage} className="animate-rise-in rounded-[35px] border-4 border-sun bg-card p-6 shadow-pop sm:p-9">
          <h3 className="text-2xl font-bold sm:text-3xl">{s.title}</h3>
          <p className="mt-2 text-muted-foreground">{s.intro}</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <PillarCard pillar={s.emo} kind="emo" />
            <PillarCard pillar={s.ins} kind="ins" />
            <PillarCard pillar={s.att} kind="att" />
          </div>
        </div>
      </section>

      {/* Juegos CTA */}
      <section className="mt-14 flex flex-col items-center gap-4 rounded-[40px] border-[5px] border-leaf bg-card p-8 text-center shadow-pop sm:p-10">
        <h2 className="text-3xl font-bold sm:text-4xl">🎮 Zona de Juegos y Gimnasio Emocional</h2>
        <p className="max-w-2xl text-muted-foreground">
          Ocho desafíos para colorear emociones, pensar con lógica, practicar el semáforo de convivencia y usar palabras bonitas junto a <b>Camilo y Camila</b>.
        </p>
        <Button asChild variant="sun" size="xl">
          <Link to="/juegos">¡Vamos a jugar!</Link>
        </Button>
      </section>

      {/* Familias */}
      <section className="mt-14 rounded-[40px] border-[5px] border-pink bg-card p-6 shadow-pop sm:p-10">
        <h2 className="mb-3 text-center text-3xl font-bold text-pink sm:text-4xl">👨‍👩‍👧 Escuela para Familias CEDAM</h2>
        <p className="mx-auto mb-6 max-w-3xl text-center italic leading-relaxed text-muted-foreground">
          "Estas pautas potencializan el bienestar integral y la autonomía de nuestros estudiantes. La realización de estas actividades no señala ninguna falla en el niño, sino que enriquece su caja de herramientas para desenvolverse con confianza y plenitud."
        </p>
        <Accordion type="single" collapsible defaultValue="0" className="space-y-3">
          {FAMILY_TIPS.map((t, i) => (
            <AccordionItem key={t.title} value={String(i)} className="overflow-hidden rounded-2xl border-2 border-pink-soft bg-pink-soft px-5">
              <AccordionTrigger className="font-display text-lg font-semibold text-navy hover:no-underline sm:text-xl">{t.title}</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc space-y-1.5 pl-5 text-base leading-relaxed">
                  {t.items.map((it) => <li key={it}>{it}</li>)}
                  {t.link && (
                    <li>
                      Acceso a la plataforma de gestión familiar:{" "}
                      <a href={EVENTIFICA_URL} target="_blank" rel="noreferrer" className="font-bold text-primary underline">Eventifica CEDAM</a>.
                    </li>
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
