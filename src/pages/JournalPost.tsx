import { motion } from "framer-motion";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { journalPosts } from "../data/journal";

const ease = [0.16, 1, 0.3, 1] as const;

function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function JournalPost() {
  const { slug } = useParams();
  const post = journalPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/journal" replace />;

  return (
    <div className="mx-auto max-w-3xl px-5 pb-32 pt-36 sm:px-8 sm:pt-44">
      <FadeUp>
        <Link
          to="/journal"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-fog transition-colors hover:text-cream"
        >
          <ArrowLeft size={13} />
          Journal
        </Link>
      </FadeUp>

      <FadeUp delay={0.05}>
        <div className="mt-6 flex items-center gap-3">
          <span className="rounded-full bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-teal-soft">
            {post.category}
          </span>
          <p className="font-mono text-[11px] uppercase tracking-widest text-fog">{formatDate(post.date)}</p>
        </div>
        <h1 className="mt-4 font-display text-3xl leading-[1.15] text-cream sm:text-5xl">{post.title}</h1>
      </FadeUp>

      <FadeUp delay={0.1} className="mt-10 space-y-5">
        {post.body.map((para, i) => (
          <p key={i} className="text-sm leading-relaxed text-cream/80 sm:text-base">
            {para}
          </p>
        ))}
      </FadeUp>

      {post.link && (
        <FadeUp delay={0.15}>
          <a
            href={post.link.url}
            target="_blank"
            rel="noreferrer"
            className="group mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-wider text-cream/80 transition-colors hover:border-teal hover:text-teal-soft"
          >
            {post.link.label}
            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </FadeUp>
      )}

      {post.tags && post.tags.length > 0 && (
        <FadeUp delay={0.18} className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-6">
          {post.tags.map((t) => (
            <span key={t} className="rounded-full bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-fog">
              {t}
            </span>
          ))}
        </FadeUp>
      )}
    </div>
  );
}
