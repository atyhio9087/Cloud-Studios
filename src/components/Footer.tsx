import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { profile } from "../data/content";
import AsciiCloudPanel from "./AsciiCloudPanel";
import ReachOutTab from "./ReachOutTab";
import { useReachOut } from "../context/ReachOutContext";

export default function Footer() {
  const { footerRef } = useReachOut();

  return (
    <footer ref={footerRef} className="relative mt-32">
      <div
        className="relative"
        style={{
          maskImage: "linear-gradient(180deg, transparent 0%, black 14%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 14%)",
        }}
      >
        <AsciiCloudPanel className="h-[62vh] min-h-[420px] w-full" />
        <ReachOutTab />
      </div>

      <div className="relative bg-void">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 font-mono text-[11px] uppercase tracking-wider text-fog/70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© {new Date().getFullYear()} Ayan Mukherjee · Chennai, India</span>
          <div className="flex items-center gap-5">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-fog hover:text-cream transition-colors">
              <GithubIcon size={15} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-fog hover:text-cream transition-colors">
              <LinkedinIcon size={15} />
            </a>
            <span className="normal-case tracking-normal text-fog/50">Built with React, Tailwind &amp; too many canvas particles</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
