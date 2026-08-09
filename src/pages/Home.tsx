import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mountain, Flag, Hammer, Shirt, Disc3, Music, Palette, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import CloudSkyPanel from "../components/CloudSkyPanel";
import { profile, stats, interests, projects, skillGroups, makes } from "../data/content";

const ease = [0.16, 1, 0.3, 1] as const;

const interestIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "Rock climbing": Mountain,
  Mountaineering: Flag,
  Woodworking: Hammer,
  "Stitching & fashion design": Shirt,
  Pottery: Disc3,
  Guitar: Music,
  "Digital graphics": Palette,
  "Creative coding": Code2,
};

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div>
      {/* HERO */}
      <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pb-24">
        <div className="absolute inset-0">
          <CloudSkyPanel
            image="/images/cloud-hero-blue.jpg"
            backgroundPosition="75% 38%"
            overlay="linear-gradient(90deg, rgba(3,3,4,0.4) 0%, rgba(3,3,4,0.1) 42%, rgba(3,3,4,0.02) 65%, rgba(3,3,4,0.18) 100%)"
            dotDensity={190}
            brightnessThreshold={0.62}
            vignetteStops={[
              { stop: 0, alpha: 0.06 },
              { stop: 0.4, alpha: 0.01 },
              { stop: 1, alpha: 0.05 },
            ]}
            interactive={false}
            ambientDrift
            className="h-full w-full"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 sm:h-56"
            style={{ background: "linear-gradient(180deg, transparent 0%, rgba(3,3,4,0.9) 75%, #030304 100%)" }}
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-blue-glow drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]"
          >
            Risk &amp; Fraud Analyst
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
            className="mt-5 max-w-xl font-display text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.4)" }}
          >
            I{" "}
            <span className="relative whitespace-nowrap text-white/45">
              build
              <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-white/60" />
            </span>{" "}
            try to build things.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="mt-5 max-w-md text-sm leading-relaxed text-white/95 sm:text-base"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.45)" }}
          >
            {profile.blurb}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/career"
              className="group inline-flex items-center gap-3 rounded-full bg-cream py-2 pl-5 pr-2 font-mono text-xs uppercase tracking-wider text-void shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-colors hover:bg-blue-glow"
            >
              View my career
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-void text-cream transition-transform group-hover:scale-110">
                <ArrowRight size={14} />
              </span>
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-white/90 backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-black/40 hover:text-white"
            >
              See the work
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-fog/60"
        >
          scroll
        </motion.div>
      </section>

      {/* TWO SIDES */}
      <section className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <FadeUp>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-blue-glow">Two sides, one person</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-[1.1] text-cream sm:text-4xl">
            Rigorous with data. Restless with everything else.
          </h2>
        </FadeUp>

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* data side */}
          <FadeUp delay={0.05} className="lg:col-span-3">
            <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-panel/60 p-6 sm:p-8">
              <div className="bg-grain-soft absolute inset-0 opacity-[0.04] mix-blend-overlay" aria-hidden="true" />
              <div className="relative">
                <p className="font-mono text-[11px] uppercase tracking-widest text-fog">01 · Analyst</p>
                <h3 className="mt-2 font-display text-xl text-cream sm:text-2xl">
                  A year of turning marketplace noise into fraud signal.
                </h3>
                <div className="mt-8 grid grid-cols-2 gap-6">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <p className="font-display text-2xl text-blue-glow sm:text-3xl">{s.value}</p>
                      <p className="mt-1 text-xs text-fog">{s.label}</p>
                    </div>
                  ))}
                </div>
                <Link
                  to="/career"
                  className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cream/80 hover:text-cream transition-colors"
                >
                  Full career history
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </FadeUp>

          {/* interests side */}
          <FadeUp delay={0.15} className="lg:col-span-2">
            <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-panel/60 p-6 sm:p-8">
              <div className="bg-grain-soft absolute inset-0 opacity-[0.04] mix-blend-overlay" aria-hidden="true" />
              <div className="relative">
                <p className="font-mono text-[11px] uppercase tracking-widest text-fog">02 · Maker</p>
                <h3 className="mt-2 font-display text-xl text-cream sm:text-2xl">Things I chase outside a spreadsheet.</h3>
                <ul className="mt-6 space-y-3">
                  {interests.map((it) => {
                    const Icon = interestIcons[it.name] ?? Code2;
                    return (
                      <li key={it.name} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white/5 text-ember">
                          <Icon size={14} />
                        </span>
                        <div>
                          <p className="text-sm text-cream/90">{it.name}</p>
                          <p className="text-xs text-fog">{it.note}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* TOOLKIT */}
      <section className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <FadeUp className="flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-blue-glow">What I reach for</p>
            <h2 className="mt-4 max-w-xl font-display text-3xl leading-[1.1] text-cream sm:text-4xl">
              A toolkit that spans both sides.
            </h2>
          </div>
        </FadeUp>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <FadeUp key={g.label} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-white/10 bg-panel/50 p-5">
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-blue-glow">{g.label}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span key={it} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-cream/80">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      {featuredProjects.length > 0 && (
        <section className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <FadeUp>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-blue-glow">Proudest work</p>
          </FadeUp>
          <div className="mt-6 space-y-6">
            {featuredProjects.map((featured, i) => (
              <FadeUp key={featured.slug} delay={0.08 + i * 0.1}>
                <a
                  href={featured.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block overflow-hidden rounded-3xl border border-white/10"
                >
                  <div className="relative aspect-[3/4] w-full bg-gradient-to-br from-blue-deep via-teal/40 to-void sm:aspect-[21/9]">
                    <div className="bg-grain-soft absolute inset-0 opacity-[0.08] mix-blend-overlay" aria-hidden="true" />
                    <div
                      className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-90"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 30%, rgba(111,227,255,0.35), transparent 55%), radial-gradient(circle at 75% 70%, rgba(14,140,147,0.4), transparent 55%)",
                      }}
                    />
                    <div className="relative flex h-full flex-col justify-end p-6 sm:p-10">
                      <p className="font-mono text-xs uppercase tracking-widest text-cream/70">{featured.year}</p>
                      <h3 className="mt-2 font-display text-2xl text-cream sm:text-5xl">{featured.title}</h3>
                      <p className="mt-2 max-w-lg text-sm text-cream/80 sm:text-base">{featured.tagline}</p>
                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-mono text-xs uppercase tracking-wider text-void transition-transform group-hover:translate-x-0.5">
                          View project
                          <ArrowUpRight size={13} />
                        </span>
                        {featured.tags.map((t) => (
                          <span key={t} className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-cream/70">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>
        </section>
      )}

      {/* FROM THE WORKSHOP */}
      <section className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <FadeUp>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-blue-glow">Off-screen</p>
          <h2 className="mt-4 max-w-xl font-display text-3xl leading-[1.1] text-cream sm:text-4xl">
            From the workshop.
          </h2>
        </FadeUp>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {makes.map((m, i) => (
            <FadeUp key={m.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-white/10 bg-panel/50 p-5">
                <h3 className="font-display text-lg text-cream">{m.title}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ember">{m.material}</p>
                <p className="mt-3 text-sm leading-relaxed text-fog">{m.note}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* OTHER PROJECTS */}
      <section className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        <FadeUp className="flex items-end justify-between">
          <h2 className="font-display text-3xl text-cream sm:text-4xl">More things I've built.</h2>
          <Link
            to="/projects"
            className="hidden items-center gap-2 font-mono text-xs uppercase tracking-wider text-fog hover:text-cream transition-colors sm:flex"
          >
            All projects
            <ArrowUpRight size={13} />
          </Link>
        </FadeUp>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {rest.map((p, i) => (
            <FadeUp key={p.slug} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-panel/50 p-6 transition-colors hover:border-white/25">
                <p className="font-mono text-[11px] uppercase tracking-widest text-fog">{p.year}</p>
                <h3 className="mt-2 font-display text-xl text-cream">{p.title}</h3>
                <p className="mt-2 text-sm text-fog">{p.tagline}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-fog">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-8 flex justify-center sm:hidden">
          <Link to="/projects" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cream/80">
            All projects
            <ArrowUpRight size={13} />
          </Link>
        </FadeUp>
      </section>
    </div>
  );
}
