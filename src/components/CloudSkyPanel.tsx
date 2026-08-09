import { useEffect, useRef } from "react";

type Dot = {
  baseX: number;
  baseY: number;
  size: number;
  maxAlpha: number;
  color: string;
  phase: number;
  speed: number;
};

/**
 * Real photo, with a glowing dot-matrix layer sampled from the image's own
 * color sitting on top (the "ascii-ish" look from the reference clip). Dots
 * sit on a fixed grid — brightness (not position) is what moves: a slow
 * spatial-noise shimmer drifts across the grid when ambientDrift is on, and
 * dots can also brighten near the cursor when interactive is on.
 */
export default function CloudSkyPanel({
  className,
  image,
  backgroundPosition = "center 65%",
  overlay = "linear-gradient(180deg, rgba(3,3,5,0.25) 0%, rgba(5,5,8,0.1) 40%, rgba(3,3,4,0.97) 100%)",
  dotDensity = 130,
  vignetteStops = [
    { stop: 0, alpha: 0 },
    { stop: 0.55, alpha: 0 },
    { stop: 1, alpha: 0.55 },
  ],
  brightnessThreshold = 0.5,
  kenBurns = false,
  interactive = true,
  ambientDrift = false,
}: {
  className?: string;
  image: string;
  backgroundPosition?: string;
  overlay?: string;
  /** lower = denser dot grid */
  dotDensity?: number;
  /** darkens the dot layer itself (not just the photo underneath), top to bottom */
  vignetteStops?: { stop: number; alpha: number }[];
  /** luminance (0-1) below which pixels never get a dot — keeps dots locked to the bright subject */
  brightnessThreshold?: number;
  /** slow cheap CSS pan/zoom on the photo, in place of a real video loop */
  kenBurns?: boolean;
  /** if false, dots don't scatter away from the cursor */
  interactive?: boolean;
  /** smooth spatial-noise shimmer across the grid — light drifting over the cloud, not the dots themselves moving */
  ambientDrift?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouse = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctxOrNull = canvas.getContext("2d");
    if (!ctxOrNull) return;
    const ctx = ctxOrNull;

    const bloomCanvas = document.createElement("canvas");
    const bloomCtx = bloomCanvas.getContext("2d")!;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let dots: Dot[] = [];
    let ready = false;

    const img = new Image();
    img.src = image;

    function hash2(x: number, y: number) {
      const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      return s - Math.floor(s);
    }

    function buildDots() {
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

      if (!img.complete || img.naturalWidth === 0) return;

      const sample = document.createElement("canvas");
      sample.width = Math.round(width);
      sample.height = Math.round(height);
      const sctx = sample.getContext("2d")!;
      const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      sctx.drawImage(img, (width - dw) / 2, (height - dh) / 2, dw, dh);
      const data = sctx.getImageData(0, 0, sample.width, sample.height).data;

      const step = Math.max(6, Math.floor(width / dotDensity));
      const spillThreshold = Math.max(0, brightnessThreshold - 0.06);
      const pts: Dot[] = [];
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const idx = (Math.floor(y) * sample.width + Math.floor(x)) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          // full grid, no stochastic skip: a hard-empty band for true sky,
          // a thin, dim "spillover" halo right at the cloud's edge, then
          // the normal bright falloff inside it
          if (lum < spillThreshold) continue;
          let maxAlpha: number;
          if (lum < brightnessThreshold) {
            maxAlpha = 0.14 * Math.pow((lum - spillThreshold) / (brightnessThreshold - spillThreshold || 1), 1.4);
          } else {
            maxAlpha = Math.min(1, Math.pow((lum - brightnessThreshold) / (1 - brightnessThreshold), 1.3) * 1.5 + 0.1);
            // thin the grid at a roughly consistent rate everywhere inside
            // the cloud so real negative space shows even at peak brightness
            // — distinct glowing points, not a filled-in screen. Deterministic
            // per-coordinate (not Math.random()) so the pattern doesn't
            // reshuffle every time this component remounts.
            if (hash2(x, y) > 0.48) continue;
          }
          if (maxAlpha < 0.02) continue;
          // boost the sampled color so dots read as glowing rather than muddy
          const boost = 1 + (1 - lum) * 0.4;
          const cr = Math.min(255, Math.round(r * boost + 40));
          const cg = Math.min(255, Math.round(g * boost + 25));
          const cb = Math.min(255, Math.round(b * boost + 35));
          pts.push({
            baseX: x,
            baseY: y,
            size: 0.85 + lum * 2.1,
            maxAlpha,
            color: "255,255,255", //`${cr},${cg},${cb}`,
            phase: hash2(x + 1000, y + 1000) * Math.PI * 2,
            speed: 1.6 + hash2(x + 2000, y + 2000) * 1.7,
          });
        }
      }
      dots = pts;
      ready = true;
    }

    img.onload = buildDots;
    if (img.complete) buildDots();

    const onResize = () => buildDots();
    window.addEventListener("resize", onResize);

    function onPointerMove(e: PointerEvent) {
      const rect = wrap!.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.active = true;
    }
    function onPointerLeave() {
      mouse.current.active = false;
    }
    if (interactive) {
      wrap.addEventListener("pointermove", onPointerMove);
      wrap.addEventListener("pointerleave", onPointerLeave);
    }

    let t = 0;

    // broad, slow-moving current across the whole cloud (a wave of light
    // passing through) layered underneath each dot's own independent
    // twinkle — the combination is what actually reads as "alive" rather
    // than a uniform breathing effect
    function currentWave(gx: number, gy: number, time: number) {
      const n =
        Math.sin(gx * 0.012 + time * 0.7) * 0.5 +
        Math.sin(gy * 0.016 - time * 0.5) * 0.3 +
        Math.sin((gx + gy) * 0.009 + time * 0.55) * 0.35;
      return Math.max(0, Math.min(1, (n + 1.15) / 2.3));
    }

    function frame() {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);
      bloomCtx.clearRect(0, 0, width, height);

      if (ready) {
        const mx = mouse.current.x;
        const my = mouse.current.y;
        const radius = 90;

        dots.forEach((d) => {
          const dx = d.baseX;
          const dy = d.baseY;

          let glow = 1;
          if (ambientDrift) {
            const twinkle = 0.5 + 0.5 * Math.sin(t * d.speed + d.phase);
            const wave = currentWave(d.baseX, d.baseY, t);
            glow = 0.06 + Math.pow(twinkle, 1.4) * 0.74 + wave * 0.2;
          }
          let alpha = d.maxAlpha * glow;

          if (interactive && mouse.current.active) {
            const ddx = d.baseX - mx;
            const ddy = d.baseY - my;
            const dist = Math.sqrt(ddx * ddx + ddy * ddy);
            if (dist < radius) {
              alpha = Math.min(1, alpha + (1 - dist / radius) * 0.5);
            }
          }

          const color = d.color;

          ctx.beginPath();
          ctx.fillStyle = `rgba(${color},${alpha})`;
          ctx.arc(dx, dy, d.size, 0, Math.PI * 2);
          ctx.fill();

          if (d.maxAlpha > 0.4) {
            bloomCtx.beginPath();
            bloomCtx.fillStyle = `rgba(${color},${alpha})`;
            bloomCtx.arc(dx, dy, d.size, 0, Math.PI * 2);
            bloomCtx.fill();
          }
        });
      }

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.filter = "blur(2px)";
      ctx.globalAlpha = 0.8;
      ctx.drawImage(bloomCanvas, 0, 0, width, height);
      ctx.filter = "blur(10px)";
      ctx.globalAlpha = 0.45;
      ctx.drawImage(bloomCanvas, 0, 0, width, height);
      ctx.restore();

      // vignette drawn last, in normal blend mode, so it dims the glowing
      // dots themselves (not just the photo sitting underneath them)
      if (vignetteStops.some((v) => v.alpha > 0)) {
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        vignetteStops.forEach((v) => grad.addColorStop(v.stop, `rgba(3,3,4,${v.alpha})`));
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", onResize);
      if (interactive) {
        wrap.removeEventListener("pointermove", onPointerMove);
        wrap.removeEventListener("pointerleave", onPointerLeave);
      }
      cancelAnimationFrame(rafRef.current);
    };
  }, [image, dotDensity, brightnessThreshold, interactive, ambientDrift]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className ?? ""}`}>
      <div
        className={`absolute inset-0 bg-cover ${kenBurns ? "animate-kenburns" : ""}`}
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition,
          filter: "saturate(1.08) brightness(0.92) contrast(1.05)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0" style={{ background: overlay }} aria-hidden="true" />
      <div className="bg-grain-soft absolute inset-0 opacity-[0.05] mix-blend-overlay" aria-hidden="true" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
  );
}
