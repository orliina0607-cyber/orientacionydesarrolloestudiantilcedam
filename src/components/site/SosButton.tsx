import { useEffect, useState } from "react";
import { HeartPulse, UserRound, GraduationCap, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { COUNSELORS, EVENTIFICA_URL } from "@/lib/site-data";
import { OPEN_SOS_EVENT } from "@/lib/confetti";

export function SosButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_SOS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SOS_EVENT, onOpen);
  }, []);

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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl border-[6px] border-sos sm:rounded-3xl">
          <DialogHeader className="items-center text-center sm:text-center">
            <HeartPulse className="h-11 w-11 text-sos" />
            <DialogTitle className="font-display text-2xl text-navy sm:text-3xl">Orientación Escolar CEDAM</DialogTitle>
            <DialogDescription>Estamos aquí para escucharte, apoyarte y acompañarte en todo momento.</DialogDescription>
          </DialogHeader>

          <div className="rounded-2xl border-2 border-pink-soft bg-pink-soft p-4 text-center">
            <p className="font-display text-lg font-bold text-navy">
              Comunícate con el área de psicología por medio de nuestra app oficial
            </p>
            <Button asChild variant="sos" size="xl" className="mt-3 w-full">
              <a href={EVENTIFICA_URL} target="_blank" rel="noreferrer">
                <ExternalLink /> Abrir app oficial CEDAM
              </a>
            </Button>
            <p className="mt-2 break-all text-xs text-muted-foreground">{EVENTIFICA_URL}</p>
          </div>

          <div className="rounded-2xl border-2 border-leaf bg-leaf-soft p-4">
            <p className="text-center font-display text-lg font-bold text-navy">💚 Recuerda pedir ayuda</p>
            <p className="mt-1 text-center text-sm text-navy">
              Puedes hablar con tus psicólogos y con tus docentes.
            </p>
            <div className="mt-3 space-y-2">
              {COUNSELORS.map((c) => (
                <div key={c.name} className="flex items-center gap-3 rounded-2xl border-2 border-card bg-card p-3">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-on-brand ${c.tone === "pink" ? "bg-pink" : "bg-primary"}`}>
                    <UserRound className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-bold text-navy">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.role}</div>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-3 rounded-2xl border-2 border-card bg-card p-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky text-on-brand">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-bold text-navy">Tus docentes</div>
                  <div className="text-xs text-muted-foreground">Pídele a tu profesor que te acompañe</div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Para padres y acudientes: consultas formales a través de{" "}
            <a href={EVENTIFICA_URL} target="_blank" rel="noreferrer" className="font-bold text-navy underline">Eventifica CEDAM</a>.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
