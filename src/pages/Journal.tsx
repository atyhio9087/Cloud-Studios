import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { journalPosts, type JournalCategory } from "../data/journal";

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

const categories: (JournalCategory | "All")[] = ["All", "Tech", "Research", "Craft"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function Journal() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const posts = journalPosts
    .filter((p) => filter === "All" || p.category === filter)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="mx-auto max-w-5xl px-5 pb-32 pt-36 sm:px-8 sm:pt-44">
      <FadeUp>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-blue-glow">Journal</p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] text-cream sm:text-5xl">
          Notes from the data side and the workshop side.
        </h1>
        <p className="mt-5 max-w-xl text-sm text-fog sm:text-base">
          Tech write-ups, research notes, and logs from whatever I'm building, tinkering with, or
          stitching together offline.
        </p>
      </FadeUp>

      <FadeUp delay={0.05} className="mt-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              filter === c
                ? "border-teal bg-teal/15 text-teal-soft"
                : "border-white/10 text-fog hover:border-white/25 hover:text-cream"
            }`}
          >
            {c}
          </button>
        ))}
      </FadeUp>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {posts.map((p, i) => (
          <FadeUp key={p.slug} delay={i * 0.06}>
            <Link
              to={`/journal/${p.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-panel/50 p-6 transition-colors hover:border-white/25 sm:p-7"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="rounded-full bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-teal-soft">
                  {p.category}
                </span>
                <p className="font-mono text-[11px] uppercase tracking-widest text-fog">{formatDate(p.date)}</p>
              </div>
              <h2 className="mt-4 font-display text-xl text-cream sm:text-2xl">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-fog">{p.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-cream/70 transition-colors group-hover:text-cream">
                Read
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </FadeUp>
        ))}

        {posts.length === 0 && (
          <p className="col-span-full text-sm text-fog">Nothing in this category yet.</p>
        )}
      </div>
    </div>
  );
}
