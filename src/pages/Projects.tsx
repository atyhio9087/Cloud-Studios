import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/content";

const ease = [0.16, 1, 0.3, 1] as const;

function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="mx-auto max-w-5xl px-5 pb-32 pt-36 sm:px-8 sm:pt-44">
      <FadeUp>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-blue-glow">Projects</p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] text-cream sm:text-5xl">
          Data work, and the things I build for no reason but curiosity.
        </h1>
      </FadeUp>

      {featuredProjects.length > 0 && (
        <div className="mt-16 space-y-6">
          {featuredProjects.map((featured, i) => (
            <FadeUp key={featured.slug} delay={0.1 + i * 0.1}>
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
                        "radial-gradient(circle at 25% 30%, rgba(111,227,255,0.35), transparent 55%), radial-gradient(circle at 78% 72%, rgba(14,140,147,0.42), transparent 55%)",
                    }}
                  />
                  <div className="relative flex h-full flex-col justify-end p-6 sm:p-10">
                    <span className="w-fit rounded-full bg-ember/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ember">
                      Featured · Proudest work
                    </span>
                    <h2 className="mt-4 font-display text-2xl text-cream sm:text-5xl">{featured.title}</h2>
                    <p className="mt-3 max-w-xl text-sm text-cream/80 sm:text-base">{featured.description}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-mono text-xs uppercase tracking-wider text-void">
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
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {rest.map((p, i) => (
          <FadeUp key={p.slug} delay={i * 0.08}>
            <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-panel/50 p-6 transition-colors hover:border-white/25 sm:p-7">
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[11px] uppercase tracking-widest text-fog">{p.year}</p>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer" className="text-fog hover:text-cream transition-colors" aria-label={`Open ${p.title}`}>
                    <ArrowUpRight size={15} />
                  </a>
                )}
              </div>
              <h3 className="mt-2 font-display text-xl text-cream sm:text-2xl">{p.title}</h3>
              <p className="mt-1 text-sm text-blue-glow">{p.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-fog">{p.description}</p>
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
    </div>
  );
}
