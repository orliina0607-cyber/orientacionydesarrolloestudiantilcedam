import { Link } from "@tanstack/react-router";
import logoImg from "@/assets/logo.png";

const navClass =
  "font-display font-semibold rounded-full px-4 py-2 text-sm sm:text-base text-navy transition-colors hover:bg-sun-soft";
const navActive = { className: "bg-sun hover:bg-sun shadow-soft" };

export function SiteHeader() {
  return (
    <header className="header-cloud sticky top-0 z-40 bg-card px-4 pb-5 pt-3 shadow-pop sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logoImg}
            alt="Logo del Colegio Bilingüe CEDAM"
            className="h-14 w-14 rounded-2xl border-2 border-sun-soft bg-card object-contain shadow-soft"
          />
          <span className="leading-tight">
            <span className="block font-display text-xl font-bold tracking-wide text-navy sm:text-2xl">
              Colegio Bilingüe CEDAM
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
