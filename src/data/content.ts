export const profile = {
  name: "Ayan Mukherjee",
  role: "Risk & Fraud Analyst — LatentView Analytics",
  location: "Chennai, India",
  email: "ayan.muk200267@gmail.com",
  phone: "+91 8017405219",
  linkedin: "https://www.linkedin.com/in/ayan-mukherjee-1a79a1192/",
  github: "https://github.com/atyhio9087",
  // Get a free key at https://web3forms.com (enter your email, they send
  // you a key — no account needed). It's meant to live in client-side code,
  // same as a reCAPTCHA site key: Web3Forms enforces limits server-side,
  // not by keeping this secret. Messages get emailed straight to the
  // address you registered it with.
  web3formsAccessKey: "e43b4b99-bcef-40e6-9386-936aa0c5e434",
  blurb:
    "I spend my days turning marketplace data into fraud signal, and my nights turning light and pattern into things you can watch move.",
};

export const stats = [
  { value: "$246.5K", label: "avg. weekly loss reduction", detail: "predicate-based fraud rules, shipped via Git" },
  { value: "2M", label: "users / week", detail: "friction removed through whitelisting rules" },
  { value: "$125K", label: "weekly revenue unlocked", detail: "from the same whitelisting work" },
  { value: "99.3%", label: "forecast accuracy", detail: "cyclic payment model built at EY GDS" },
];

export const experience = [
  {
    company: "LatentView Analytics",
    role: "Analyst — Risk & Fraud, client: Lyft",
    period: "Jan 2025 — Current",
    location: "Chennai",
    points: [
      "Own fraud-risk analytics for a segment of Lyft's rider/driver marketplace, partnering with Analytics Managers on rule design, ETL/pipeline support, deployment, and post-launch monitoring.",
      "Built an agentic AI system for autonomous fraud-rule optimization and sunsetting — improving precision, expanding loss coverage, and reducing customer friction.",
      "Used SQL and Python to extract, transform, and analyse large datasets, turning them into predicate-based fraud rules deployed via Git workflows — reducing losses by roughly $246.5K per week.",
      "Developed whitelisting rules that cut friction for ~2M users per week and unlocked ~$125K per week in revenue.",
      "Built and shipped fraud detection dashboards in Mode Analytics, Tableau, and Power BI for real-time behaviour monitoring.",
    ],
    tags: ["SQL", "Python", "Mode Analytics", "Tableau", "Power BI", "Git"],
    awards: ["ENCORE Award", "SPOT Award"],
  },
  {
    company: "EY GDS",
    role: "Technology Transformation Intern, Tax Management",
    period: "2023",
    location: "Chennai",
    points: [
      "Worked with the tax department to build a cash forecasting system from scratch.",
      "Designed a model to analyse and predict cyclic payments from receipts and tax filings, reaching 99.3% accuracy.",
      "Automated the process, saving the firm 6 hours of manual work per week.",
    ],
    tags: ["Forecasting", "Automation", "Tax Ops"],
    awards: [],
  },
];

export const education = [
  {
    school: "Vellore Institute of Technology, Chennai",
    program: "B.Tech, CSE — specialization in AI & ML",
    period: "2024",
    detail: "CGPA 8.54",
  },
  {
    school: "The PSBB Millennium, Chennai",
    program: "CSE with Math — AISSCE (12th boards)",
    period: "2020",
    detail: "94.2% · ANCQ 2019 Certificate of High Distinction, Senior Division",
  },
  {
    school: "The PSBB Millennium, Chennai",
    program: "AISSE (10th boards)",
    period: "2018",
    detail: "88.8%",
  },
];

export const certifications = [
  { name: "Leveraging US Airport Performance to Propel India's Aviation Industry", issuer: "Published — 14th ICCCNT, IIT Delhi", year: "2023" },
  { name: "Microsoft Security, Compliance, and Identity Fundamentals", issuer: "Centiport · Microsoft Certification ID 995286104", year: "2023" },
  { name: "Tableau Desktop Certification", issuer: "Tableau", year: "2025" },
  { name: "NCA GEN-AI LLM Certification", issuer: "NVIDIA", year: "2026" },
];

export const leadership = {
  org: "Dreadnought Robotics, VIT Chennai",
  role: "Electrical Head",
  period: "2022",
  points: [
    "Led the electrical and electronics department at Dreadnought Robotics.",
    "Designed PCBs and selected components for upcoming builds against datasheets.",
  ],
};

export const skillGroups = [
  { label: "Languages & Querying", items: ["SQL", "Python", "C/C++", "R", "MATLAB", "Java"] },
  { label: "Data & Analytics", items: ["Risk & Fraud Analytics", "Statistical Modeling", "A/B Testing"] },
  { label: "Data Engineering", items: ["ETL Development", "Pipeline Automation", "Snowflake", "Databricks", "Medallion Architecture"] },
  { label: "AI / ML", items: ["Machine Learning", "Deep Learning", "Reinforcement Learning", "Generative AI", "LLMs", "Vision Models"] },
  { label: "BI & Visualization", items: ["Tableau", "Power BI", "Mode Analytics", "Looker Studio", "Hex", "Streamlit"] },
  { label: "Making things", items: ["Git/GitHub", "PCB Design", "Adobe Suite", "Blender", "Unity"] },
];

export const interests = [
  { name: "Rock climbing", note: "reading a wall like a dataset — one hold at a time" },
  { name: "Mountaineering", note: "slow, deliberate, long feedback loops" },
  { name: "Woodworking", note: "measure twice, ship once" },
  { name: "Stitching & fashion design", note: "pattern-making, on fabric instead of screens" },
  { name: "Pottery", note: "the one thing that won't let you undo (Ctrl+Z)" },
  { name: "Guitar", note: "currently very much in progress" },
  { name: "Digital graphics", note: "shaders, particles, generative textures" },
  { name: "Creative coding", note: "code as a material, not just logic" },
];

export type Project = {
  slug: string;
  title: string;
  year: string;
  tagline: string;
  description: string;
  tags: string[];
  url?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "visualizer",
    title: "Visualizer",
    year: "2026",
    tagline: "Upload a song. Watch it become light.",
    description:
      "A web app that takes an uploaded track and generates responsive audio-reactive visuals in real time — frequency, amplitude and transient data driving color, motion and form. The project that taught me most of what I know about creative coding.",
    tags: ["Creative Coding", "Web Audio API", "WebGL", "Shaders"],
    url: "https://visualizer-ten-drab.vercel.app/",
    featured: true,
  },
  {
    slug: "stock-predictor",
    title: "Explainable Stock Predictor",
    year: "2026",
    tagline: "Horizon-aware price forecasting — with the receipts.",
    description:
      "Full-stack stock forecasting platform for 112 US stocks across 1D–1Y horizons, using cross-sectional LightGBM with SHAP explanations, confidence bands, and time-based validation. Achieves ~51–56% short-term accuracy and 68.6% at 1 year, with transparent diagnostics and a separate sentiment/fundamentals reputation score.",
    tags: ["LightGBM", "SHAP", "Time-Series ML", "React", "Recharts"],
    // TODO: swap for the real deployed URL once it's hosted
    url: "https://stock-predictor.example.com",
    featured: true,
  },
  {
    slug: "self-driving-car-rl",
    title: "Self-Driving Car using Reinforcement Learning",
    year: "2023",
    tagline: "Deep Q-Learning for a car with no fixed lanes.",
    description:
      "Simulation software for self-driving cars that accommodates the absence of rigid road boundaries. Implemented Deep Q-Learning, working with Markovian chaining, a softmax policy over the network's outputs, and the Bellman equation — plus a small UI for real-time RLHF.",
    tags: ["Reinforcement Learning", "PyTorch", "Python", "Kivy"],
    // TODO: replace with the real GitHub repo URL
    url: "https://github.com/ayanmukherjee/self-driving-car-rl",
  },
  {
    slug: "us-airport-performance",
    title: "Leveraging US Airport Performance to Propel India's Aviation Industry",
    year: "2023",
    tagline: "A big, messy dataset turned into a policy argument.",
    description:
      "Segmented a large multi-year airport-performance dataset down to something analyzable, then used Power BI to build the analysis and conclusions. Published at the 14th ICCCNT, hosted by IIT Delhi.",
    tags: ["Big Data", "Power BI", "Business Intelligence"],
    // TODO: replace with the real GitHub repo URL
    url: "https://github.com/ayanmukherjee/us-airport-performance",
  },
];

export type Make = {
  title: string;
  material: string;
  note: string;
};

export const makes: Make[] = [
  {
    title: "Open gear rack",
    material: "Pine · brass hooks",
    note: "Wall-mounted, open-frame rack for hanging bags and climbing gear — brass hardware against raw pine for a bit of shine.",
  },
  {
    title: "Storage bureau",
    material: "Sheesham wood",
    note: "Built from scratch to hold woodworking, electronics, and stitching supplies in one place.",
  },
  {
    title: "Full-sleeve jackets & cargo pants",
    material: "Pattern-drafted, hand & machine sewn",
    note: "A couple of full-sleeve jackets and a pair of cargo pants, drafted and stitched from scratch.",
  },
];
