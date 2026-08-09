/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#030304",
        ink: "#08090B",
        panel: "#0B0C10",
        blue: {
          deep: "#131B4A",
          mid: "#2A3B8F",
          glow: "#6FE3FF",
        },
        violet: {
          DEFAULT: "#6E4CD9",
          soft: "#9C86E8",
        },
        teal: {
          DEFAULT: "#0E8C93",
          soft: "#6FE9DC",
        },
        ember: "#F5C349",
        cream: "#EDE9DC",
        fog: "#9AA0C0",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body: ['"General Sans"', "-apple-system", "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
