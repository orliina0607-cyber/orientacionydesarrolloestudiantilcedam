import { useEffect, useState, type FormEvent } from "react";
import { HeartPulse, UserRound, Send } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { COUNSELORS, EVENTIFICA_URL } from "@/lib/site-data";
import { OPEN_SOS_EVENT } from "@/lib/confetti";

const FEELINGS = [
  "Triste o desanimado",
  "Muy enojado o con frustración",
  "Preocupado por el colegio o mis amigos",
  "Asustado o con ansiedad",
  "Solo quiero conversar en privado",
];

export function SosButton() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_SOS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SOS_EVENT, onOpen);
  }, []);

  const onOpenChange = (v: boolean) => {
    setOpen(v);
    if (!v) setSent(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="animate-sos-pulse fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border-[3px] border-card bg-sos px-5 py-3 font-display text-base font-bold text-on-brand transition-transform hover:scale-105 sm:bottom-6 sm:right-6 sm:px-6 sm:py-4 sm:text-xl"
      >
        <HeartPulse className="h-6 w-6" />
        <span>¡Hablar con Orientación!</span>
      </button>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl border-[6px] border-sos sm:rounded-3xl">
          <DialogHeader className="items-center text-center sm:text-center">
            <HeartPulse className="h-11 w-11 text-sos" />
            <DialogTitle className="font-display text-2xl text-navy sm:text-3xl">Orientación Escolar CEDAM</DialogTitle>
            <DialogDescription>Estamos aquí para escucharte, apoyarte y acompañarte en todo momento.</DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {COUNSELORS.map((c) => (
              <div key={c.name} className="flex items-center gap-3 rounded-2xl border-2 border-pink-soft bg-pink-soft p-3">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-on-brand ${c.tone === "pink" ? "bg-pink" : "bg-primary"}`}>
                  <UserRound className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-bold text-navy">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.role}</div>
                </div>
              </div>
            ))}
          </div>

          {sent ? (
            <div className="animate-rise-in rounded-2xl border-2 border-leaf bg-leaf-soft p-4 text-center">
              <p className="font-display text-lg font-bold text-navy">💚 ¡Gracias por contarnos cómo te sientes!</p>
              <p className="mt-1 text-sm text-navy">
                Busca a Diego o a Lina en la oficina de Orientación, o pídele a tu profesor que te acompañe. Hablar siempre ayuda.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block font-bold">¿Cómo te sientes en este momento?</span>
                <select required defaultValue="" className="w-full rounded-2xl border-2 border-input bg-card p-3 focus:border-ring focus:outline-none">
                  <option value="" disabled>Selecciona una emoción...</option>
                  {FEELINGS.map((f) => <option key={f}>{f}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block font-bold">Tu nombre o curso (opcional):</span>
                <input type="text" placeholder="Ej: Camila - Grado 5°" className="w-full rounded-2xl border-2 border-input bg-card p-3 focus:border-ring focus:outline-none" />
              </label>
              <Button type="submit" variant="sos" size="xl" className="w-full">
                <Send /> Quiero hablar con Orientación
              </Button>
            </form>
          )}

          <p className="text-center text-xs text-muted-foreground">
            Para padres y acudientes: consultas formales a través de{" "}
            <a href={EVENTIFICA_URL} target="_blank" rel="noreferrer" className="font-bold text-navy underline">Eventifica CEDAM</a>.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
