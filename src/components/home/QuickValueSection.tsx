// components/QuickValueSection.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

const PARAGRAPH =
  "Stay on top of your health effortlessly with all your essential data in one place track vitals, monitor progress, and never miss a routine. Get clear insights, timely reminders, and organized reports to make smarter, stress-free health decisions every day.";

const WORDS = PARAGRAPH.split(" ");
const TOTAL_WORDS = WORDS.length;

function FloatingOrb({
  cx, cy, r, delay, duration,
}: {
  cx: number; cy: number; r: number; delay: number; duration: number;
}) {
  return (
    <motion.circle
      cx={cx} cy={cy} r={r}
      fill="rgba(45,212,191,0.06)"
      animate={{
        cy: [cy - 30, cy + 30, cy - 30],
        r: [r, r * 1.2, r],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function PulseLine({
  x1, y1, x2, y2, delay,
}: {
  x1: number; y1: number; x2: number; y2: number; delay: number;
}) {
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="rgba(61,119,115,0.15)" strokeWidth="1"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function ECGWave() {
  return (
    <motion.path
      d="M0,60 L80,60 L100,60 L115,10 L130,110 L145,30 L160,60 L240,60 L260,60 L275,20 L290,100 L305,40 L320,60 L400,60"
      fill="none"
      stroke="rgba(45,212,191,0.3)"
      strokeWidth="1.5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: [0, 0.6, 0.6, 0] }}
      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
    />
  );
}

function AnimatedWord({
  word, index, scrollProgress,
}: {
  word: string; index: number; scrollProgress: MotionValue<number>;
}) {
  const WORD_START = 0.25;
  const WORD_END = 0.85;
  const range = WORD_END - WORD_START;
  const wordStart = WORD_START + (index / TOTAL_WORDS) * range;
  const wordEnd = WORD_START + ((index + 1) / TOTAL_WORDS) * range;

  const color = useTransform(
    scrollProgress,
    [wordStart, wordEnd],
    ["#374151", "#ffffff"]
  );
  const opacity = useTransform(
    scrollProgress,
    [Math.max(0, wordStart - 0.02), wordStart],
    [0.25, 1]
  );

  return (
    <motion.span
      style={{ color, opacity }}
      className="inline-block mr-1 leading-relaxed"
    >
      {word}
    </motion.span>
  );
}

export default function QuickValueSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
  });

  const headlineColor = useTransform(
    smoothProgress,
    [0, 0.15],
    ["#374151", "#ffffff"]
  );
  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const leftImageOpacity = useTransform(smoothProgress, [0.05, 0.35], [0.25, 1]);
  const leftImageScale = useTransform(smoothProgress, [0.05, 0.4], [0.94, 1]);
  const rightImageOpacity = useTransform(smoothProgress, [0.1, 0.4], [0.25, 1]);
  const rightImageScale = useTransform(smoothProgress, [0.1, 0.45], [0.94, 1]);

  return (
    <div ref={sectionRef} className="relative h-[400vh]">

      {/* ── Sticky wrapper ── */}
      <div className="sticky top-0 h-[80vh] w-full overflow-hidden flex flex-col items-center justify-center">

        {/* ── SVG Background ── */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <radialGradient id="cg" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="rgba(13,148,136,0.08)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
              <radialGradient id="lg" cx="20%" cy="40%" r="40%">
                <stop offset="0%" stopColor="rgba(6,78,59,0.12)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
              <radialGradient id="rg" cx="80%" cy="60%" r="40%">
                <stop offset="0%" stopColor="rgba(15,118,110,0.1)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
            </defs>
            <rect width="1440" height="900" fill="url(#cg)" />
            <rect width="1440" height="900" fill="url(#lg)" />
            <rect width="1440" height="900" fill="url(#rg)" />

            <FloatingOrb cx={200}  cy={200} r={120} delay={0}   duration={8}  />
            <FloatingOrb cx={800}  cy={150} r={80}  delay={1.5} duration={10} />
            <FloatingOrb cx={1300} cy={300} r={150} delay={3}   duration={12} />
            <FloatingOrb cx={400}  cy={700} r={100} delay={2}   duration={9}  />
            <FloatingOrb cx={1100} cy={650} r={90}  delay={0.5} duration={11} />
            <FloatingOrb cx={700}  cy={500} r={60}  delay={4}   duration={7}  />

            <PulseLine x1={200}  y1={200} x2={800}  y2={150} delay={0}   />
            <PulseLine x1={800}  y1={150} x2={1300} y2={300} delay={1}   />
            <PulseLine x1={400}  y1={700} x2={1100} y2={650} delay={2}   />
            <PulseLine x1={200}  y1={200} x2={400}  y2={700} delay={1.5} />
            <PulseLine x1={1300} y1={300} x2={1100} y2={650} delay={0.5} />

            <g transform="translate(100,420)"><ECGWave /></g>
            <g transform="translate(900,250) scale(0.7)"><ECGWave /></g>
            <g transform="translate(500,680) scale(0.5)"><ECGWave /></g>

            {Array.from({ length: 12 }).map((_, col) =>
              Array.from({ length: 8 }).map((_, row) => (
                <motion.circle
                  key={`d-${col}-${row}`}
                  cx={col * 130 + 60}
                  cy={row * 115 + 50}
                  r={1.5}
                  fill="rgba(45,212,191,0.15)"
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{
                    duration: 3 + ((col * row) % 3),
                    delay: (col + row) * 0.1,
                    repeat: Infinity,
                  }}
                />
              ))
            )}

            {[1, 2, 3].map((i) => (
              <motion.circle
                key={`ring-${i}`}
                cx={720} cy={450} r={50}
                fill="none"
                stroke="rgba(45,212,191,0.12)"
                strokeWidth="1"
                animate={{ r: [50, 380], opacity: [0.4, 0] }}
                transition={{
                  duration: 6,
                  delay: i * 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </svg>
        </div>

        {/* ── Badge + Heading ── */}
        <div className="relative z-10 flex flex-col items-center text-center mb-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="text-xs font-semibold font-[InterCustom] tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1">
              Quick Value
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ color: headlineColor }}
            className=" text-2xl md:text-3xl lg:text-4xl font-medium leading-tight font-[InterCustom]"
          >
            Everything You Need,&nbsp;In One Place
          </motion.h2>
        </div>

        {/* ── Bottom Row ── */}
        <div className="relative z-10 w-full max-w-8xl px-20 mx-auto   flex items-center gap-6 md:gap-8">

          {/* Scroll progress line */}
          <div className="flex-shrink-0 w-px h-48 bg-white/10 relative">
            <motion.div
              style={{ height: progressHeight }}
              className="w-full bg-[#3D7773] origin-top"
            />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-teal-400/30 border border-white/60" />
          </div>

          {/* LEFT Image */}
          <motion.div
            style={{ opacity: leftImageOpacity, scale: leftImageScale }}
            className="flex-shrink-0 w-48 md:w-64 lg:w-100 h-68 md:h-64 lg:h-100 rounded-2xl overflow-hidden border border-teal-400/15 shadow-2xl relative"
          >
            <Image
              src="/Trend.jpg"
              alt="Health app screen left"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Centre paragraph */}
          <div className="flex-1 min-w-0">
            <p className="text-lg md:text-base lg:text-2xl font-light  font-[InterCustom]">
              {WORDS.map((word, i) => (
                <AnimatedWord
                  key={i}
                  word={word}
                  index={i}
                  scrollProgress={smoothProgress}
                />
              ))}
            </p>
          </div>

          {/* RIGHT Image */}
          <motion.div
            style={{ opacity: rightImageOpacity, scale: rightImageScale }}
            className="flex-shrink-0 w-48 md:w-64 lg:w-100 h-68 md:h-64 lg:h-100 rounded-2xl overflow-hidden border border-teal-400/15 shadow-2xl relative"
          >
            <Image
              src="/heart-health2.jpg"
              alt="Health app screen right"
              fill
              className="object-cover"
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
}