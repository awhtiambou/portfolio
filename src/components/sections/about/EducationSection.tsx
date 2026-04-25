"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { educationData, certificationsData } from "@/data/education";
import { IoLocationOutline } from "react-icons/io5";
import { SectionTitle } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/hooks";

const W = "app-container";

interface Point { x: number; y: number }
interface PathM { type: "M"; x: number; y: number }
interface PathC { type: "C"; cx1: number; cy1: number; cx2: number; cy2: number; x: number; y: number }
type PathNorm = [PathM, ...PathC[]];

const DESKTOP_PATH_NORM: PathNorm = [
  { type: "M", x: 0, y: 0.42 },
  { type: "C", cx1: 0.20, cy1: 0.42, cx2: 0.25, cy2: 0.05, x: 0.38, y: 0.05 },
  { type: "C", cx1: 0.52, cy1: 0.05, cx2: 0.56, cy2: 0.88, x: 0.70, y: 0.88 },
  { type: "C", cx1: 0.82, cy1: 0.88, cx2: 0.86, cy2: 0.30, x: 1.00, y: 0.30 },
];

const MOBILE_PATH_NORM: PathNorm = [
  { type: "M", x: 1.15, y: 0 },
  { type: "C", cx1: 0.75, cy1: 0.12, cx2: 0.25, cy2: 0.22, x: 0.25, y: 0.33 },
  { type: "C", cx1: 0.25, cy1: 0.44, cx2: 0.75, cy2: 0.56, x: 0.75, y: 0.67 },
  { type: "C", cx1: 0.75, cy1: 0.78, cx2: 0.25, cy2: 0.88, x: -0.15, y: 1.00 },
];

// t-positions along the path for each stop
const STOP_T_DESKTOP = [0.12, 0.50, 0.88];
const STOP_T_MOBILE = [0.12, 0.50, 0.88];

function buildPath(norm: PathNorm, W: number, H: number): string {
  const [m, ...curves] = norm;
  const segments = [`M ${m.x * W} ${m.y * H}`];
  for (const c of curves) {
    segments.push(
      `C ${c.cx1 * W} ${c.cy1 * H}, ${c.cx2 * W} ${c.cy2 * H}, ${c.x * W} ${c.y * H}`
    );
  }
  return segments.join(" ");
}

function getPointsOnPath(el: SVGPathElement, ts: number[]): Point[] {
  const total = el.getTotalLength();
  return ts.map(t => { const p = el.getPointAtLength(t * total); return { x: p.x, y: p.y }; });
}

function getGradientColors(isDark: boolean) {
  return isDark
    ? { a: "#ff0f7b", b: "#f84f9a", c: "#f87829", d: "#f89b29" }
    : { a: "#08203e", b: "#1a3a5c", c: "#3a6480", d: "#557c93" };
}

function getStopAccent(isDark: boolean, idx: number) {
  const dark = ["#ff0f7b", "#f87829", "#f89b29"];
  const light = ["#08203e", "#2d5373", "#557c93"];
  return (isDark ? dark : light)[idx] ?? (isDark ? "#ff0f7b" : "#08203e");
}

interface AvatarDotProps {
  point: Point;
  idx: number;
  logo: string;
  accent: string;
  isMobile: boolean;
  visible: boolean;
}
const AVATAR_R = 48;

function AvatarDot({ point, idx, logo, accent, isMobile, visible }: AvatarDotProps) {
  const clipId = `avatar-clip-${idx}`;
  const r = isMobile ? AVATAR_R - 20 : AVATAR_R;
  return (
    <>
      <defs>
        <clipPath id={clipId}>
          <circle cx={point.x} cy={point.y} r={r - 3} />
        </clipPath>
      </defs>
      {/* Glow ring */}
      <motion.circle
        cx={point.x} cy={point.y} r={r + 6}
        fill="none" stroke={accent} strokeWidth={2} opacity={visible ? 0.35 : 0}
        animate={visible ? { scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] } : { scale: 0, opacity: 0 }}
        transition={visible
          ? { delay: 0.1, duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.2 }}
      />
      {/* White border ring */}
      <motion.circle
        cx={point.x} cy={point.y} r={r}
        fill="var(--color-background-primary)"
        stroke={accent} strokeWidth={2.5}
        initial={{ scale: 0 }}
        animate={{ scale: visible ? 1 : 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 18 }}
        style={{ filter: `drop-shadow(0 0 12px ${accent}88)` }}
      />
      {/* Avatar image */}
      <motion.image
        href={logo}
        x={point.x - r + 3} y={point.y - r + 3}
        width={(r - 3) * 2} height={(r - 3) * 2}
        clipPath={`url(#${clipId})`}
        preserveAspectRatio="xMidYMid slice"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, delay: visible ? 0.15 : 0 }}
      />
    </>
  );
}

interface CardProps {
  idx: number;
  point: Point;
  isMobile: boolean;
  edu: typeof educationData[0];
  accent: string;
  t: ReturnType<typeof useTranslations>;
  visible: boolean;
  svgW: number;
}

const CARD_W_DESKTOP = 340;
const CARD_W_MOBILE = 260;
const CARD_H_PEEK = 164;
const CARD_H_FULL = 280;
const CONNECTOR_GAP = AVATAR_R - 24;

function EducationCard({ idx, point, isMobile, edu, accent, t, visible, svgW }: CardProps) {
  const [expanded, setExpanded] = useState(false);

  const above = !isMobile && idx % 2 === 0;
  const cardH = (expanded || isMobile) ? CARD_H_FULL : CARD_H_PEEK;

  const connY1 = above ? point.y - AVATAR_R : point.y + AVATAR_R;
  const connY2 = above
    ? point.y - AVATAR_R - (isMobile ? 0 : CONNECTOR_GAP) - cardH
    : point.y + AVATAR_R + (isMobile ? 0 : CONNECTOR_GAP);

  const PADDING = 12;
  const CARD_W = isMobile ? svgW - PADDING * 2 : CARD_W_DESKTOP;
  const rawFoX = isMobile ? PADDING : point.x - CARD_W / 2;
  const foX = isMobile ? PADDING : Math.max(PADDING, Math.min(rawFoX, svgW - CARD_W - PADDING));

  const foY = above
    ? point.y - AVATAR_R - (isMobile ? 0 : CONNECTOR_GAP) - CARD_H_FULL
    : point.y + AVATAR_R + (isMobile ? 0 : CONNECTOR_GAP);

  const item = t.raw(`items.${edu.key}`) as {
    institution: string;
    degree: string;
    field: string;
    location: string;
    description: string;
    achievements: Record<string, string>;
  };

  return (
    <>
      {/* Animated dashed connector */}
      <motion.line
        x1={point.x} y1={connY1}
        x2={point.x}
        animate={{ y2: connY2 }}
        transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
        stroke={accent} strokeWidth={1.5} strokeDasharray="5 4"
        opacity={visible ? 0.5 : 0}
        style={{ transition: "opacity 0.3s ease" }}
      />

      <foreignObject
        x={foX} y={foY}
        width={CARD_W} height={CARD_H_FULL}
        style={{ overflow: "visible" }}
      >
        <motion.div
          initial={{ opacity: 0, y: above ? -16 : 16, scale: 0.94 }}
          animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: above ? -16 : 16, scale: 0.94 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: visible ? 0.1 : 0 }}
          style={{
            position: "absolute",
            width: CARD_W,
            ...(above ? { bottom: 0, left: 0 } : { top: 0, left: 0 }),
          }}
          onMouseEnter={() => !isMobile && setExpanded(true)}
          onMouseLeave={() => !isMobile && setExpanded(false)}
          onClick={() => isMobile && setExpanded(v => !v)}
        >
          <motion.div
            animate={{ height: (expanded || isMobile) ? CARD_H_FULL : CARD_H_PEEK }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
            className="relative rounded-2xl overflow-hidden cursor-pointer select-none"
            style={{
              background: "var(--color-background-secondary)",
              border: `1.5px solid ${accent}44`,
              backdropFilter: "blur(20px)",
              boxShadow: expanded
                ? `0 20px 60px ${accent}28, 0 0 0 1.5px ${accent}60, inset 0 1px 0 rgba(255,255,255,0.08)`
                : `0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`,
              transition: "box-shadow 0.3s ease",
            }}
          >
            <div className="h-[3px] w-full"
              style={{ background: `linear-gradient(90deg, ${accent}cc, ${accent}44)` }} />

            <div className="px-5 pt-4 pb-4">
              <div className="flex items-start gap-3 mb-1">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                  <Image
                    src={edu.logo}
                    alt={item.institution}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex flex-col justify-center">
                  <p className="text-xs font-mono uppercase tracking-widest leading-none mb-0.5"
                    style={{ color: accent }}>
                    {item.degree}
                  </p>
                  <p className="font-heading font-semibold text-text-primary text-base leading-tight">
                    {item.field}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="text-xs text-text-muted font-accent flex items-center gap-1">
                  <IoLocationOutline className="text-red-500" /> {item.location}
                </span>
                <span className="text-text-muted opacity-30">·</span>
                <span className="text-xs text-text-muted font-accent">
                  {edu.startDate} — {edu.endDate}
                </span>
              </div>

              <AnimatePresence>
                {(expanded || isMobile) && (
                  <motion.div
                    key="body"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.24, delay: 0.08 }}
                    className="mt-2 space-y-3"
                  >
                    <p className="text-sm font-semibold text-text-secondary">
                      {item.institution}
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isMobile && !expanded && (
                <p className="text-xs text-text-muted mt-3 opacity-40 italic">
                  Hover to expand
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      </foreignObject>
    </>
  );
}

// ─── Crawl progress hook ───────────────────────────────────────────────────────
// Returns a 0→1 progress value that animates once the section scrolls into view.
function useCrawlProgress(inView: boolean, totalLength: number, duration = 2.2) {
  const raw = useMotionValue(0);
  const progress = useSpring(raw, { stiffness: 60, damping: 18, mass: 0.8 });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (inView && totalLength > 0) {
      // Animate raw from 0 → 1 using a simple requestAnimationFrame loop
      const start = performance.now();
      let raf: number;
      const tick = (now: number) => {
        const t = Math.min((now - start) / (duration * 1000), 1);
        // ease-in-out cubic
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        raw.set(ease);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }
  }, [inView, totalLength, duration, raw]);

  useEffect(() => {
    const unsub = progress.on("change", v => setDisplayed(v));
    return unsub;
  }, [progress]);

  return displayed;
}

// ─── SnakeSVG ─────────────────────────────────────────────────────────────────
function SnakeSVG({ isMobile, isDark }: { isMobile: boolean; isDark: boolean }) {
  const t = useTranslations("education");
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [dims, setDims] = useState({ w: 1200, h: isMobile ? 1200 : 260 });
  const [stops, setStops] = useState<Point[]>([]);
  const [pathD, setPathD] = useState("");
  const [ready, setReady] = useState(false);
  const [totalLength, setTotalLength] = useState(0);

  // Which stops have been "reached" by the crawling snake
  const grad = getGradientColors(isDark);
  const stopTs = isMobile ? STOP_T_MOBILE : STOP_T_DESKTOP;

  // inView trigger — fires once when 30% of the section is visible
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });

  const recalc = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.clientWidth || 1200;
    const h = isMobile ? 1200 : Math.max(260, Math.round(w * 0.2));
    const norm = isMobile ? MOBILE_PATH_NORM : DESKTOP_PATH_NORM;
    setDims({ w, h });
    setPathD(buildPath(norm, w, h));
  }, [isMobile]);

  // Recalculate stop positions after path renders
  useEffect(() => {
    if (!pathD || !pathRef.current) return;
    requestAnimationFrame(() => {
      if (!pathRef.current) return;
      const pts = getPointsOnPath(pathRef.current, stopTs);
      setStops(pts);
      setTotalLength(pathRef.current.getTotalLength());
      setReady(true);
    });
  }, [pathD, dims, stopTs]);

  useEffect(() => {
    const frameId = requestAnimationFrame(recalc);
    const ro = new ResizeObserver(recalc);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
    };
  }, [recalc]);

  // Crawl progress 0→1
  const progress = useCrawlProgress(inView && ready, totalLength, 2.4);
  const visibleStops = stopTs.map((t) => progress >= t);

  // strokeDasharray / strokeDashoffset for the crawl reveal
  const drawnLength = progress * totalLength;
  const dashArray = totalLength > 0 ? `${drawnLength} ${totalLength}` : "0 9999";

  return (
    // sectionRef is on the outer wrapper so inView fires based on the whole snake area
    <div ref={sectionRef} className="relative w-full">
      <div ref={containerRef} className="relative w-full" style={{ height: dims.h }}>
        <svg
          width={dims.w} height={dims.h}
          viewBox={`0 0 ${dims.w} ${dims.h}`}
          style={{ overflow: "visible", position: "absolute", inset: 0 }}
        >
          <defs>
            <linearGradient
              id="snakeGrad"
              gradientUnits={isMobile ? "userSpaceOnUse" : "objectBoundingBox"}
              x1={isMobile ? "0" : "0%"} y1={isMobile ? "0" : "0%"}
              x2={isMobile ? "0" : "100%"} y2={isMobile ? String(dims.h) : "0%"}
            >
              <stop offset="0%" stopColor={grad.a} />
              <stop offset="33%" stopColor={grad.b} />
              <stop offset="66%" stopColor={grad.c} />
              <stop offset="100%" stopColor={grad.d} />
            </linearGradient>

            <linearGradient id="snakeShadow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(0,0,0,0)" />
              <stop offset="60%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.45)" />
            </linearGradient>

            <linearGradient id="snakeShine" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
              <stop offset="28%" stopColor="rgba(255,255,255,0.0)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
            </linearGradient>

            <filter id="outerGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="18" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Glowing tip filter */}
            <filter id="tipGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── Ghost track (faint full path in background) ── */}
          {pathD && (
            <path d={pathD} fill="none"
              stroke="url(#snakeGrad)" strokeWidth={96} strokeLinecap="round"
              opacity={0.07} />
          )}

          {/* ── Layer 1 — ambient glow (crawl-clipped) ── */}
          {pathD && totalLength > 0 && (
            <path d={pathD} fill="none"
              stroke="url(#snakeGrad)" strokeWidth={120} strokeLinecap="round"
              opacity={0.12} filter="url(#outerGlow)"
              strokeDasharray={dashArray}
              strokeDashoffset={0} />
          )}

          {/* ── Layer 2 — main tube (crawl-clipped) ── */}
          {pathD && totalLength > 0 && (
            <path d={pathD} fill="none"
              stroke="url(#snakeGrad)" strokeWidth={96} strokeLinecap="round"
              strokeDasharray={dashArray}
              strokeDashoffset={0} />
          )}

          {/* ── Layer 3 — 3D shadow (crawl-clipped) ── */}
          {pathD && totalLength > 0 && (
            <path d={pathD} fill="none"
              stroke="url(#snakeShadow)" strokeWidth={96} strokeLinecap="round"
              opacity={0.50}
              strokeDasharray={dashArray}
              strokeDashoffset={0} />
          )}

          {/* ── Layer 4 — 3D shine (crawl-clipped) ── */}
          {pathD && totalLength > 0 && (
            <path d={pathD} fill="none"
              stroke="url(#snakeShine)" strokeWidth={96} strokeLinecap="round"
              opacity={0.75}
              strokeDasharray={dashArray}
              strokeDashoffset={0} />
          )}

          {/* Hidden measurement path */}
          {pathD && (
            <path ref={pathRef} d={pathD} fill="none" stroke="none" strokeWidth={0} />
          )}

          {/* Cards + Avatar dots — revealed one by one */}
          {ready && stops.length === 3 && educationData.map((edu, idx) => {
            const accent = getStopAccent(isDark, idx);
            return (
              <g key={edu.key}>
                <EducationCard
                  idx={idx} point={stops[idx]} isMobile={isMobile}
                  edu={edu} accent={accent} t={t}
                  visible={visibleStops[idx]}
                  svgW={dims.w}
                />
                <AvatarDot
                  idx={idx} point={stops[idx]} logo={edu.logo}
                  accent={accent} isMobile={isMobile}
                  visible={visibleStops[idx]}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function CertificationsStrip({ isDark }: { isDark: boolean }) {
  const t = useTranslations("education.certifications");
  return (
    <div className={`${W} mt-80 md:mt-40`}>
      <p className="text-xs font-mono uppercase tracking-[0.25em] text-text-muted mb-6">
        {t("title")}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {certificationsData.map((cert, i) => (
          <motion.a
            key={cert.key} href={cert.url}
            target="_blank" rel="noopener noreferrer"
            className={cn("group flex flex-col gap-1.5 p-5 rounded-xl border border-white/5 bg-background-secondary transition-all duration-200", isDark ? "hover:border-accent-yellow/30" : "hover:border-accent-blue/30")}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -3 }}
          >
            <p className={cn("text-sm font-medium text-text-primary transition-colors leading-snug", isDark ? "group-hover:text-accent-yellow" : "group-hover:text-accent-blue")}>
              {t(cert.key)}
            </p>
            <p className="text-xs text-text-muted">{cert.issuer}</p>
            <p className="text-xs text-text-muted font-mono">{cert.date}</p>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

export function EducationSection() {
  const t = useTranslations("education");
  const { resolvedTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(max-width: 767px)").matches;
  });
  const hydrated = useHydrated();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const isDark = hydrated ? resolvedTheme === "dark" : true;

  return (
    <div className="py-24 overflow-hidden">
      <SectionTitle className={`${W} !mb-20 md:!mb-40`} subtitle={t("subtitle")} title={t("title")} />

      {hydrated && !isMobile && (
        <div className={`${W} mb-10`}>
          <p className="text-xs text-text-muted italic">{t("hoverHint")}</p>
        </div>
      )}

      <div className="w-full">
        {hydrated && <SnakeSVG isMobile={isMobile} isDark={isDark} />}
      </div>

      <CertificationsStrip isDark={isDark} />
    </div>
  );
}
