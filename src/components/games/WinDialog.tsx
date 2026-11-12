import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function WinDialog({ open, title, desc, onClose }: { open: boolean; title: string; desc: string; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="rounded-3xl border-4 border-sun text-center sm:rounded-3xl">
        <DialogHeader className="items-center sm:text-center">
          <div className="text-6xl">🏆🎉</div>
          <DialogTitle className="font-display text-2xl text-navy">{title}</DialogTitle>
          <DialogDescription className="text-base">{desc}</DialogDescription>
        </DialogHeader>
        <Button variant="sun" size="lg" onClick={onClose} className="mx-auto">¡Continuar Jugando!</Button>
      </DialogContent>
    </Dialog>
  );
}
