import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

const navClass =
  "font-display font-semibold rounded-full px-4 py-2 text-sm sm:text-base text-navy transition-colors hover:bg-sun-soft";
const navActive = { className: "bg-sun hover:bg-sun shadow-soft" };

export function SiteHeader() {
  return (
    <header className="header-cloud sticky top-0 z-40 bg-card px-4 pb-5 pt-3 shadow-pop sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
            <GraduationCap className="h-7 w-7" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-2xl font-bold tracking-wide text-navy sm:text-3xl">
              CEDAM
            </span>
            <span className="block text-xs font-bold text-muted-foreground sm:text-sm">
              Orientación y Desarrollo Estudiantil
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Principal">
          <Link to="/" className={navClass} activeProps={navActive} activeOptions={{ exact: true }}>
            Inicio
          </Link>
          <Link to="/juegos" className={navClass} activeProps={navActive}>
            🎮 Juegos
          </Link>
        </nav>
      </div>
    </header>
  );
}
