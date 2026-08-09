import { Link, useLocation } from "react-router-dom";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { profile } from "../data/content";
import { useReachOut } from "../context/ReachOutContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/career", label: "Career" },
  { to: "/projects", label: "Projects" },
];

export default function Nav() {
  const { pathname } = useLocation();
  const { openFromAnywhere } = useReachOut();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 backdrop-blur-md sm:h-28"
        style={{
          maskImage: "linear-gradient(180deg, black 0%, black 45%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, black 0%, black 45%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-4 sm:px-8 sm:py-5">
        <Link
          to="/"
          className="flex-none font-display text-xs tracking-[0.14em] text-white/95 hover:text-white transition-colors sm:text-sm sm:tracking-[0.18em]"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}
        >
          AYAN<span className="text-ember">.</span>M
          <span className="hidden sm:inline">UKHERJEE</span>
        </Link>

        <nav className="flex flex-none items-center gap-0.5 rounded-full border border-white/10 bg-void/60 px-1 py-1 backdrop-blur-md sm:gap-1 sm:px-1.5 sm:py-1.5">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative rounded-full px-2.5 py-1.5 font-mono text-[9.5px] uppercase tracking-wider transition-colors sm:px-4 sm:text-xs ${
                  active ? "text-void" : "text-white/75 hover:text-white"
                }`}
              >
                {active && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-blue-glow" />
                )}
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 sm:flex" style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.7))" }}>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="text-white/80 transition-colors hover:text-white"
            aria-label="GitHub"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-white/80 transition-colors hover:text-white"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
          <button
            type="button"
            onClick={openFromAnywhere}
            className="text-white/80 transition-colors hover:text-white"
            aria-label="Reach out"
          >
            <Mail size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
