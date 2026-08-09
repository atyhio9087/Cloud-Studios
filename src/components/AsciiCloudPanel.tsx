import { useEffect, useRef } from "react";

const RAMP = " .:-=+*#%@";

type Ripple = { x: number; y: number; born: number };

/**
 * Character-grid ASCII clouds drifting on black. Density comes from layered
 * moving sine fields (cheap value noise) mapped to a brightness ramp of
 * literal characters. Moving the pointer drops a ripple that visibly pushes
 * the density field outward and fades — a real disturbance in the field,
 * not a static hover state.
 */
export default function AsciiCloudPanel({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const ripples = useRef<Ripple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctxOrNull = canvas.getContext("2d");
    if (!ctxOrNull) return;
    const ctx = ctxOrNull;

    const bloomCanvas = document.createElement("canvas");
    const bloomCtx = bloomCanvas.getContext("2d")!;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cell = 13;
    let cols = 0;
    let rows = 0;

    function resize() {
      const rect = wrap!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      bloomCanvas.width = width * dpr;
      bloomCanvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bloomCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = width < 640 ? 10 : 13;
      cols = Math.ceil(width / cell) + 1;
      rows = Math.ceil(height / cell) + 1;
    }

    resize();
    window.addEventListener("resize", resize);

    function onPointerMove(e: PointerEvent) {
      const rect = wrap!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const last = ripples.current[ripples.current.length - 1];
      if (!last || Math.hypot(last.x - x, last.y - y) > 22) {
        ripples.current.push({ x, y, born: performance.now() });
        if (ripples.current.length > 24) ripples.current.shift();
      }
    }
    wrap.addEventListener("pointermove", onPointerMove);

    let t = 0;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    function hash2(x: number, y: number) {
      const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return s - Math.floor(s);
    }

    function noise(x: number, y: number, time: number) {
      let n = 0;
      n += Math.sin(x * 0.025 + time * 0.32) * Math.cos(y * 0.035 - time * 0.13) * 0.55;
      n += Math.sin(x * 0.06 - time * 0.5) * Math.cos(y * 0.08 + time * 0.22) * 0.3;
      n += Math.sin(x * 0.13 + time * 0.8) * Math.cos(y * 0.15 - time * 0.37) * 0.18;
      let flat = (n / 1.03 + 1) / 2;
      // ragged, non-smooth edges instead of one clean blob
      flat *= 0.72 + hash2(x, y) * 0.34;
      flat = Math.max(0, Math.min(1, flat));
      return Math.pow(flat, 1.55);
    }

    function frame() {
      t += reduceMotion ? 0 : 1;
      const now = performance.now();
      ripples.current = ripples.current.filter((r) => now - r.born < 1800);

      ctx.clearRect(0, 0, width, height);
      bloomCtx.clearRect(0, 0, width, height);
      ctx.font = `${cell * 1.05}px "IBM Plex Mono", monospace`;
      bloomCtx.font = ctx.font;
      bloomCtx.textAlign = "center";
      bloomCtx.textBaseline = "middle";

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const px = col * cell;
          const py = row * cell;

          let n = noise(col, row, t * 0.032);

          // slow "growing" breath: the whole cloud mass expands and eases
          // back over a long cycle, like it's blooming
          const growth = 0.72 + 0.28 * (0.5 + 0.5 * Math.sin(t * 0.0009));
          n *= growth;

          // ripple disturbance: push density outward from each recent pointer hit
          for (const r of ripples.current) {
            const age = (now - r.born) / 1800;
            const rippleRadius = age * 220;
            const dist = Math.hypot(px - r.x, py - r.y);
            const band = Math.abs(dist - rippleRadius);
            if (band < 26) {
              n += (1 - band / 26) * (1 - age) * 0.7;
            }
          }

          const normalized = Math.max(0, Math.min(1, n));
          if (normalized < 0.08) continue;

          const charIdx = Math.min(RAMP.length - 1, Math.floor(normalized * RAMP.length));
          const ch = RAMP[charIdx];
          if (ch === " ") continue;

          const bright = normalized > 0.62;
          const color = bright ? "203,230,255" : "58,138,180";
          const alpha = 0.25 + normalized * 0.65;

          ctx.fillStyle = `rgba(${color},${alpha})`;
          ctx.fillText(ch, px, py);

          if (normalized > 0.45) {
            bloomCtx.fillStyle = `rgba(${color},${alpha})`;
            bloomCtx.fillText(ch, px, py);
          }
        }
      }

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.filter = "blur(2px)";
      ctx.globalAlpha = 0.7;
      ctx.drawImage(bloomCanvas, 0, 0, width, height);
      ctx.filter = "blur(9px)";
      ctx.globalAlpha = 0.4;
      ctx.drawImage(bloomCanvas, 0, 0, width, height);
      ctx.restore();

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", resize);
      wrap.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden bg-void ${className ?? ""}`}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
  );
}
