"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };
type Ripple = { x: number; y: number; start: number };
type Rgb = { r: number; g: number; b: number };

type KineticGridProps = {
  children?: React.ReactNode;
  className?: string;
  /** Grid cell size in CSS pixels */
  spacing?: number;
  /** Background painted behind the grid */
  backgroundColor?: string;
  /** Resting line/node/texture color (hex) */
  baseColor?: string;
  /** Active color near the pointer, ripples, and glow (hex, brand accent) */
  accentColor?: string;
};

const INFLUENCE_RADIUS = 260;
const MAX_WARP = 24;
const DOT_SPACING = 28;
const LERP_SPEED = 0.08;
const RIPPLE_LIFETIME = 1400;
const RIPPLE_SPEED = 0.4;
const RIPPLE_WAVE_WIDTH = 55;

function hexToRgb(hex: string): Rgb {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function lerpN(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function rgba({ r, g, b }: Rgb, a: number) {
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

function lerpColor(base: Rgb, baseAlpha: number, active: Rgb, activeAlpha: number, t: number) {
  const r = Math.round(lerpN(base.r, active.r, t));
  const g = Math.round(lerpN(base.g, active.g, t));
  const b = Math.round(lerpN(base.b, active.b, t));
  const a = lerpN(baseAlpha, activeAlpha, t);
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

export default function KineticGrid({
  children,
  className = "",
  spacing = 56,
  backgroundColor = "#1a3d06",
  baseColor = "#e8f4e0",
  accentColor = "#54b51b",
}: KineticGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<Point>({ x: -9999, y: -9999 });
  const targetMouseRef = useRef<Point>({ x: -9999, y: -9999 });
  const ripplesRef = useRef<Ripple[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const base = hexToRgb(baseColor);
    const accent = hexToRgb(accentColor);

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId = 0;

    function resize() {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    function onPointerMove(event: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      targetMouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }

    function onPointerLeave() {
      targetMouseRef.current = { x: -9999, y: -9999 };
    }

    function onPointerDown(event: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      ripplesRef.current.push({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        start: performance.now(),
      });
      if (ripplesRef.current.length > 6) ripplesRef.current.shift();
    }

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);
    container.addEventListener("pointerdown", onPointerDown);

    function getWarpedPoint(
      gx: number,
      gy: number,
      col: number,
      row: number,
      cols: number,
      rows: number,
      mouse: Point,
      ripples: Ripple[],
      now: number
    ): { pt: Point; proximity: number } {
      const edgeMargin = 1.5;
      const colPin = Math.min(col / edgeMargin, (cols - 1 - col) / edgeMargin, 1);
      const rowPin = Math.min(row / edgeMargin, (rows - 1 - row) / edgeMargin, 1);
      const pinFactor = colPin * colPin * rowPin * rowPin;

      const dx = gx - mouse.x;
      const dy = gy - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const proximity = Math.max(0, 1 - dist / INFLUENCE_RADIUS) * pinFactor;

      let rx = 0;
      let ry = 0;
      for (const r of ripples) {
        const elapsed = now - r.start;
        const rippleRadius = elapsed * RIPPLE_SPEED;
        const opacity = Math.max(0, 1 - elapsed / RIPPLE_LIFETIME);
        const rdx = gx - r.x;
        const rdy = gy - r.y;
        const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
        const diff = rdist - rippleRadius;
        if (Math.abs(diff) < RIPPLE_WAVE_WIDTH) {
          const strength =
            (1 - Math.abs(diff) / RIPPLE_WAVE_WIDTH) * opacity * 18 * pinFactor;
          const angle = Math.atan2(rdy, rdx);
          const sign = diff < 0 ? -1 : 1;
          rx += Math.cos(angle) * strength * sign * -1;
          ry += Math.sin(angle) * strength * sign * -1;
        }
      }

      if (dist < INFLUENCE_RADIUS && dist > 0 && pinFactor > 0) {
        const t = dist / INFLUENCE_RADIUS;
        const eased = t < 0.01 ? 0 : (1 - t) * (1 - t) * Math.min(1, dist / 60);
        const warpAmt = eased * MAX_WARP * pinFactor;
        const angle = Math.atan2(dy, dx);
        return {
          pt: {
            x: gx - Math.cos(angle) * warpAmt + rx,
            y: gy - Math.sin(angle) * warpAmt + ry,
          },
          proximity,
        };
      }

      return { pt: { x: gx + rx, y: gy + ry }, proximity };
    }

    function draw(now: number) {
      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = backgroundColor;
      ctx!.fillRect(0, 0, width, height);

      ctx!.fillStyle = rgba(base, 0.05);
      for (let x = DOT_SPACING / 2; x < width; x += DOT_SPACING) {
        for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
          ctx!.beginPath();
          ctx!.arc(x, y, 0.7, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      ripplesRef.current = ripplesRef.current.filter(
        (r) => now - r.start < RIPPLE_LIFETIME
      );

      const mouse = mouseRef.current;
      const ripples = ripplesRef.current;

      const cols = Math.max(2, Math.ceil(width / spacing)) + 1;
      const rows = Math.max(2, Math.ceil(height / spacing)) + 1;
      const cellW = width / (cols - 1);
      const cellH = height / (rows - 1);

      const pts: Point[][] = [];
      const prox: number[][] = [];

      for (let row = 0; row < rows; row++) {
        pts[row] = [];
        prox[row] = [];
        for (let col = 0; col < cols; col++) {
          const { pt, proximity } = getWarpedPoint(
            col * cellW,
            row * cellH,
            col,
            row,
            cols,
            rows,
            mouse,
            ripples,
            now
          );
          pts[row][col] = pt;
          prox[row][col] = proximity;
        }
      }

      const drawSeg = (p1: Point, p2: Point, pr1: number, pr2: number) => {
        const avg = (pr1 + pr2) / 2;
        const t = avg * avg * (3 - 2 * avg);
        ctx!.beginPath();
        ctx!.moveTo(p1.x, p1.y);
        ctx!.lineTo(p2.x, p2.y);
        ctx!.strokeStyle = lerpColor(base, 0.13, accent, 0.9, t);
        ctx!.lineWidth = lerpN(0.8, 1.5, t);
        ctx!.stroke();
      };

      ctx!.lineCap = "butt";

      for (let row = 0; row < rows; row++)
        for (let col = 0; col < cols - 1; col++)
          drawSeg(pts[row][col], pts[row][col + 1], prox[row][col], prox[row][col + 1]);

      for (let col = 0; col < cols; col++)
        for (let row = 0; row < rows - 1; row++)
          drawSeg(pts[row][col], pts[row + 1][col], prox[row][col], prox[row + 1][col]);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const p = pts[row][col];
          const pr = prox[row][col];
          const t = pr * pr * (3 - 2 * pr);
          const r = lerpN(1.8, 3.2, t);

          if (t > 0.3) {
            const glowR = r + lerpN(0, 6, (t - 0.3) / 0.7);
            const grd = ctx!.createRadialGradient(p.x, p.y, r * 0.5, p.x, p.y, glowR);
            grd.addColorStop(0, rgba(accent, t * 0.3));
            grd.addColorStop(1, rgba(accent, 0));
            ctx!.beginPath();
            ctx!.arc(p.x, p.y, glowR, 0, Math.PI * 2);
            ctx!.fillStyle = grd;
            ctx!.fill();
          }

          ctx!.beginPath();
          ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx!.fillStyle = lerpColor(base, 0.2, accent, 1.0, t);
          ctx!.fill();
        }
      }

      for (const r of ripples) {
        const elapsed = now - r.start;
        const opacity = Math.max(0, 1 - elapsed / RIPPLE_LIFETIME);
        const radius = Math.max(0, elapsed * RIPPLE_SPEED);
        ctx!.beginPath();
        ctx!.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx!.strokeStyle = rgba(accent, opacity * 0.28);
        ctx!.lineWidth = 1.5;
        ctx!.stroke();
      }
    }

    function animate(now: number) {
      const m = mouseRef.current;
      const t = targetMouseRef.current;
      m.x = lerpN(m.x, t.x, LERP_SPEED);
      m.y = lerpN(m.y, t.y, LERP_SPEED);
      draw(now);
      rafId = requestAnimationFrame(animate);
    }

    if (prefersReducedMotion) {
      draw(performance.now());
    } else {
      rafId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("pointerdown", onPointerDown);
    };
  }, [spacing, backgroundColor, baseColor, accentColor]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
