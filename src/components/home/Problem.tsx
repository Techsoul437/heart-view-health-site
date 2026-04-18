"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const problems = [
  {
    num: "01",
    title: "Health Tracking is Irregular",
    desc: "Most people start with good intentions but lose consistency. Without a structured system, tracking becomes sporadic and unreliable over time.",
  },
  {
    num: "02",
    title: "Data Scattered Everywhere",
    desc: "Reports, prescriptions, lab results  stored in different apps, folders, and memories. No single source of truth for your health.",
  },
  {
    num: "03",
    title: "Hard to Read, Harder to Understand",
    desc: "Medical data is dense and technical. Most people can't interpret their own reports, leaving them confused about what their numbers mean.",
  },
  {
    num: "04",
    title: "No Clear Direction on What Matters",
    desc: "Even with data available, knowing what to act on is unclear. Users are left without guidance on priorities that truly affect well-being.",
  },
];

const solutions = [
  {
    num: "01",
    title: "All Health Data in One Place",
    desc: "We unify reports, vitals, and history into a single structured dashboard  no more hunting across apps or paper files.",
  },
  {
    num: "02",
    title: "Clean, Readable Insights",
    desc: "Complex medical data is translated into simple visual summaries anyone can understand at a glance  no medical degree required.",
  },
  {
    num: "03",
    title: "Focus on What Matters",
    desc: "Our platform highlights metrics with the highest impact on your health so you always know where to direct your attention.",
  },
  {
    num: "04",
    title: "Designed for Clarity",
    desc: "Every interaction is intentional. From layout to language, HeartView is built to reduce cognitive load and make health manageable.",
  },
];

function ProblemItem({ item, index }: { item: (typeof problems)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -18 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex gap-4 border-b border-white/[0.06] py-5 last:border-0"
    >
      <span className="mt-0.5 w-7 shrink-0 font-mono text-sm font-medium text-white/20 tabular-nums">
        {item.num}
      </span>
      <div>
        <h4 className="mb-1.5 text-xl font-medium text-white/75 transition-colors duration-200 group-hover:text-white sm:text-xl lg:text-2xl">
          {item.title}
        </h4>
        <p className="text-base font-light leading-relaxed text-white/35 sm:text-lg">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

function SolutionCard({ item, index }: { item: (typeof solutions)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-lg border border-white/[0.07] bg-white/[0.03] p-6 transition-all duration-300 hover:border-teal-500/25 hover:bg-teal-500/[0.04]"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3D7773]" />
          <span className="text-xs font-medium uppercase tracking-widest text-[#3D7773]">
            Solution
          </span>
        </div>
        <span className="font-mono text-sm text-white/15">{item.num}</span>
      </div>
      <h4 className="mb-2 text-xl font-medium text-white/80 transition-colors duration-200 group-hover:text-white sm:text-xl lg:text-2xl">
        {item.title}
      </h4>
      <p className="text-base font-light leading-relaxed text-white/35 sm:text-lg">
        {item.desc}
      </p>
    </motion.div>
  );
}

function ProblemImageBlock() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-white/[0.07] bg-[#111111] min-h-72 2xl:min-h-full">
      <Image
        src="/images/problem-person.jpg"
        alt="Person struggling with health data"
        fill
        className="object-cover opacity-55"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#080808] to-transparent" />
      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 py-1.5 pl-3 pr-4 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
        <span className="text-xs font-medium text-white/60">The Problem</span>
      </div>
    </div>
  );
}

function SolutionImageBlock() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-teal-500/[0.12] bg-[#0b1a18] min-h-72 2xl:min-h-full">
      <Image
        src="/images/solution-person.jpg"
        alt="Person confidently using HeartView"
        fill
        className="object-cover opacity-50"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#080808] to-transparent" />
      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-teal-500/20 bg-black/50 py-1.5 pl-3 pr-4 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-[#3D7773]" />
        <span className="text-xs font-medium text-[#3D7773]">The Solution</span>
      </div>
      <div className="absolute -bottom-12 -right-12 h-48 w-48 rounded-full border border-teal-500/10" />
      <div className="absolute -bottom-4 -right-4 h-28 w-28 rounded-full border border-teal-500/[0.07]" />
    </div>
  );
}

export default function Problem() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const problemRef = useRef(null);
  const problemInView = useInView(problemRef, { once: true, margin: "-60px" });
  const solutionRef = useRef(null);
  const solutionInView = useInView(solutionRef, { once: true, margin: "-60px" });

  return (
    <section className="relative w-full overflow-hidden max-w-8xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 pt-10">

      {/* Ambient teal glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-teal-500/[0.05] blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-teal-500/[0.04] blur-3xl" />
      </div>

      <div className="relative">

        {/* ── HEADER ── */}
        <div ref={headerRef} className="w-full py-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block rounded-full border-2 border-white/30 py-1 pl-4 pr-4 text-xs font-semibold uppercase tracking-widest text-[#3D7773]"
          >
            Problems &amp; Solutions
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-2xl font-medium text-white md:text-3xl lg:text-4xl"
          >
            {/* Problems That Sparked Better Experiences */}
            Understanding the Problem. Delivering the Solution.
          </motion.h1>
        </div>

        {/* ── ROW 1: PROBLEM  Left: content | Right: image ── */}
        <motion.div
          ref={problemRef}
          initial={{ opacity: 0, y: 28 }}
          animate={problemInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 mt-5 grid grid-cols-1 gap-5 2xl:grid-cols-2 2xl:items-stretch"
        >
          {/* LEFT  problem content */}
          <div className="flex flex-col justify-center rounded-lg border border-white/[0.07] bg-white/[0.02] p-6 lg:p-10">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] py-1.5 pl-3 pr-4">
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              <span className="text-xs font-semibold uppercase tracking-widest text-white/45">
                Have Problems
              </span>
            </div>

            <h3 className="mb-6 text-2xl font-medium text-white md:text-3xl lg:text-4xl">
              Why Managing Health Still Feels Complicated
            </h3>

            <div>
              {problems.map((p, i) => (
                <ProblemItem key={i} item={p} index={i} />
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-white/[0.07] bg-white/[0.03] py-4 pl-5 pr-5">
              <p className="text-base font-light leading-relaxed text-white/30 sm:text-lg">
                When everything feels complex, staying healthy becomes overwhelming.
              </p>
            </div>
          </div>

          {/* RIGHT  problem image */}
          <ProblemImageBlock />
        </motion.div>

        {/* ── ROW 2: SOLUTION  Left: image | Right: content ── */}
        <motion.div
          ref={solutionRef}
          initial={{ opacity: 0, y: 28 }}
          animate={solutionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 gap-5 2xl:grid-cols-2 2xl:items-stretch"
        >
          {/* LEFT  solution image: only on xl, hidden on everything below */}
          <div className="hidden 2xl:block">
            <SolutionImageBlock />
          </div>

          {/* RIGHT  solution content: always visible */}
          <div className="flex flex-col justify-center gap-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {solutions.map((s, i) => (
                <SolutionCard key={i} item={s} index={i} />
              ))}
            </div>

            <div className="rounded-lg border border-teal-500/15 bg-teal-500/[0.05] py-4 pl-5 pr-5">
              <p className="text-base font-light leading-relaxed text-[#B4B0B0] sm:text-lg">
                Because understanding your health shouldnt feel like a task.
              </p>
            </div>
          </div>

          {/* Solution image on mobile/tablet  shown below content, hidden on xl */}
          <div className="xl:hidden">
            <SolutionImageBlock />
          </div>
        </motion.div>

      </div>
    </section>
  );
}