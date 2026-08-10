export type JournalCategory = "Tech" | "Research" | "Craft";

export type JournalPost = {
  slug: string;
  title: string;
  date: string; // ISO, e.g. "2026-08-10"
  category: JournalCategory;
  excerpt: string;
  /** Body paragraphs — one string per paragraph, rendered in order. */
  body: string[];
  /** Optional stylized external link — a video, a repo, a longer writeup, etc. */
  link?: { label: string; url: string };
  tags?: string[];
  /** Pinned posts always sort first on the journal list, regardless of date. */
  pinned?: boolean;
};

export const journalPosts: JournalPost[] = [
  {
    slug: "welcome-to-the-journal",
    title: "Starting a journal",
    date: "2026-08-10",
    category: "Tech",
    excerpt: "Why this page exists, and what's going to end up here.",
    pinned: true,
    body: [
      "This is where the longer-form stuff lives — write-ups that don't fit as a project card: how a model actually got tuned, why a woodworking joint failed twice before it held, notes from reading a paper that changed how I think about something.",
      "Expect a mix: technical breakdowns, research notes, and logs from whatever I'm building with my hands that week. No fixed schedule, no fixed length.",
    ],
    tags: ["Meta"],
  },
  {
    slug: "storage-bureau-build-notes",
    title: "Building the sheesham storage bureau",
    date: "2026-08-10",
    category: "Craft",
    excerpt: "Notes from building the storage bureau from scratch — what I'd do differently next time.",
    body: [
      "Built to hold woodworking, electronics, and stitching supplies in one place — three very different sets of materials, which made the drawer layout the actual hard problem, not the joinery.",
      "Sheesham is dense and forgiving to work with but blunts blades fast; resharpening cadence ended up being the real bottleneck on timeline, not design decisions.",
    ],
    link: { label: "More builds like this", url: "https://github.com/atyhio9087" },
    tags: ["Woodworking"],
  },
];
