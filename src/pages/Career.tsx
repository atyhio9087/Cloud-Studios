import { motion } from "framer-motion";
import { Award, GraduationCap, Sparkles } from "lucide-react";
import { experience, education, certifications, leadership, skillGroups } from "../data/content";

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

export default function Career() {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-32 pt-36 sm:px-8 sm:pt-44">
      <FadeUp>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-blue-glow">Career</p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] text-cream sm:text-5xl">
          A short log so far, moving fast.
        </h1>
        <p className="mt-5 max-w-xl text-sm text-fog sm:text-base">
          I'm early — one full-time year in — but every entry here is real shipped work: rules in
          production, dashboards people actually check, a forecast model that's still running.
        </p>
      </FadeUp>

      {/* EXPERIENCE TIMELINE */}
      <section className="mt-20">
        <FadeUp>
          <h2 className="font-mono text-xs uppercase tracking-widest text-fog">Experience</h2>
        </FadeUp>

        <div className="relative mt-8 space-y-10 border-l border-white/10 pl-7 sm:pl-10">
          {experience.map((e, i) => (
            <FadeUp key={e.company} delay={i * 0.1} className="relative">
              <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-blue-glow shadow-[0_0_16px_4px_rgba(111,227,255,0.35)] sm:-left-[43px]" />
              <div className="rounded-2xl border border-white/10 bg-panel/50 p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl text-cream sm:text-2xl">{e.company}</h3>
                  <span className="font-mono text-xs text-fog">{e.period}</span>
                </div>
                <p className="mt-1 text-sm text-blue-glow">{e.role}</p>

                <ul className="mt-5 space-y-2.5">
                  {e.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm text-cream/80">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-fog" />
                      {pt}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {e.tags.map((t) => (
                    <span key={t} className="rounded-full bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-fog">
                      {t}
                    </span>
                  ))}
                </div>

                {e.awards.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-4 border-t border-white/10 pt-4">
                    {e.awards.map((a) => (
                      <span key={a} className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ember">
                        <Award size={12} />
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="mt-16">
        <FadeUp>
          <h2 className="font-mono text-xs uppercase tracking-widest text-fog">Leadership</h2>
          <div className="mt-6 rounded-2xl border border-white/10 bg-panel/50 p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-xl text-cream">{leadership.org}</h3>
              <span className="font-mono text-xs text-fog">{leadership.period}</span>
            </div>
            <p className="mt-1 text-sm text-blue-glow">{leadership.role}</p>
            <ul className="mt-4 space-y-2">
              {leadership.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-sm text-cream/80">
                  <span className="mt-2 h-1 w-1 flex-none rounded-full bg-fog" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </section>

      {/* EDUCATION + CERTS */}
      <section className="mt-16 grid gap-6 lg:grid-cols-2">
        <FadeUp>
          <h2 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-fog">
            <GraduationCap size={14} /> Education
          </h2>
          <div className="mt-6 space-y-4">
            {education.map((ed) => (
              <div key={ed.school + ed.period} className="rounded-2xl border border-white/10 bg-panel/50 p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-base text-cream">{ed.school}</h3>
                  <span className="font-mono text-xs text-fog">{ed.period}</span>
                </div>
                <p className="mt-1 text-sm text-cream/80">{ed.program}</p>
                <p className="mt-1 text-xs text-fog">{ed.detail}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.08}>
          <h2 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-fog">
            <Sparkles size={14} /> Certifications &amp; publications
          </h2>
          <div className="mt-6 space-y-4">
            {certifications.map((c) => (
              <div key={c.name} className="rounded-2xl border border-white/10 bg-panel/50 p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-base text-cream leading-snug">{c.name}</h3>
                  <span className="font-mono text-xs text-fog">{c.year}</span>
                </div>
                <p className="mt-1 text-xs text-fog">{c.issuer}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* SKILLS */}
      <section className="mt-16">
        <FadeUp>
          <h2 className="font-mono text-xs uppercase tracking-widest text-fog">Skills</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((g) => (
              <div key={g.label} className="rounded-2xl border border-white/10 bg-panel/50 p-5">
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-blue-glow">{g.label}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span key={it} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-cream/80">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
