import { useEffect, useRef } from "react";

type Wisp = {
  offset: number;
  amp: number;
  freq: number;
  speed: number;
  y: number;
  hue: string;
  charSize: number;
  spacing: number;
  driftDir: number;
};

const CHARS = ".:-=~";

/**
 * Near-black ambient backdrop for the content sections between the hero and
 * footer: a couple of near-invisible dark blobs for depth, plus a handful of
 * thin "rivers" of literal monospace characters drifting horizontally along
 * slow sine paths — glowing code-like currents instead of a plain void.
 */
export default function AmbientFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctxOrNull = canvas.getContext("2d");
    if (!ctxOrNull) return;
    const ctx = ctxOrNull;

    const bloomCanvas = document.createElement("canvas");
    const bloomCtx = bloomCanvas.getContext("2d")!;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let wisps: Wisp[] = [];

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      bloomCanvas.width = width * dpr;
      bloomCanvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bloomCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      wisps = Array.from({ length: 6 }, (_, i) => ({
        offset: Math.random() * Math.PI * 2,
        amp: 30 + Math.random() * 46,
        freq: 0.0016 + Math.random() * 0.0014,
        speed: 0.13 + Math.random() * 0.12,
        y: (height / 7) * (i + 0.6) + (Math.random() - 0.5) * 90,
        hue: i % 3 === 0 ? "245,195,73" : i % 2 === 0 ? "111,227,255" : "95,190,200",
        charSize: 10 + Math.random() * 3,
        spacing: 16 + Math.random() * 4,
        driftDir: i % 2 === 0 ? 1 : -1,
      }));
    }

    resize();
    window.addEventListener("resize", resize);

    let t = 0;

    function frame() {
      t += reduceMotion ? 0 : 1;
      ctx.clearRect(0, 0, width, height);
      bloomCtx.clearRect(0, 0, width, height);

      wisps.forEach((w) => {
        ctx.font = `${w.charSize}px "IBM Plex Mono", monospace`;
        bloomCtx.font = ctx.font;
        const scroll = t * w.speed * w.driftDir * 1.1;
        for (let x = -w.spacing; x <= width + w.spacing; x += w.spacing) {
          const y = w.y + Math.sin(x * w.freq + t * w.speed * 0.045 + w.offset) * w.amp;
          const cIdx = Math.floor(((x + scroll) / w.spacing) % CHARS.length + CHARS.length) % CHARS.length;
          const ch = CHARS[cIdx];
          const pulse = 0.5 + Math.sin(x * 0.02 + t * 0.06 + w.offset) * 0.5;
          const alpha = 0.14 + pulse * 0.22;
          ctx.fillStyle = `rgba(${w.hue},${alpha})`;
          ctx.fillText(ch, x, y);
          if (pulse > 0.4) {
            bloomCtx.fillStyle = `rgba(${w.hue},${alpha})`;
            bloomCtx.fillText(ch, x, y);
          }
        }
      });

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.filter = "blur(2px)";
      ctx.globalAlpha = 0.85;
      ctx.drawImage(bloomCanvas, 0, 0, width, height);
      ctx.filter = "blur(7px)";
      ctx.globalAlpha = 0.5;
      ctx.drawImage(bloomCanvas, 0, 0, width, height);
      ctx.restore();

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 -z-10 h-full w-full bg-void" />;
}
