import type { ReactNode } from "react";

export function GameCard({ tag, title, intro, children }: { tag: string; title: string; intro: string; children: ReactNode }) {
  return (
    <section className="animate-rise-in w-full">
      <div className="mb-5 text-center">
        <span className="inline-block rounded-full bg-sun-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy">{tag}</span>
        <h3 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">{intro}</p>
      </div>
      {children}
    </section>
  );
}
