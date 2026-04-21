"use client";

import { motion } from "framer-motion";

type ItemType = {
  num: string;
  title: string;
  desc: string;
};

type CardProps = {
  item: ItemType;
  index: number;
  type: "Problem" | "Solution";
};

const problems: ItemType[] = [
  {
    num: "01",
    title: "You start tracking… but stop after a week",
    desc: "Motivation fades without reminders and easy habits.",
  },
  {
    num: "02",
    title: "Your reports are scattered across apps",
    desc: "Finding your health history feels impossible.",
  },
  {
    num: "03",
    title: "You don't understand what your data means",
    desc: "Complex medical terms leave you confused and worried.",
  },
  {
    num: "04",
    title: "No Clear Direction",
    desc: "Users don’t know what action to take.",
  },
];

const solutions: ItemType[] = [
  {
    num: "01",
    title: "Unified Dashboard",
    desc: "Everything organized in one clean view.",
  },
  {
    num: "02",
    title: "Simple Insights",
    desc: "Reports simplified into readable insights.",
  },
  {
    num: "03",
    title: "Smart Priorities",
    desc: "Focus on what matters most.",
  },
  {
    num: "04",
    title: "Clarity First Design",
    desc: "Designed for simplicity and ease.",
  },
];

function Card({ item, index, type }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group rounded-xl p-6 shadow-sm shadow-[#3D7773] transition-all duration-300 hover:shadow-sm  hover:border hover:border-teal-500/40"
    >
      <div className="mb-3 flex items-center justify-between">
        {/* <span className="text-xs tracking-widest text-[#3D7773] uppercase">
          {type}
        </span> */}
        <span className="text-white/20 text-2xl">{item.num}</span>
      </div>

      <h2 className="text-xl sm:text-xl lg:text-2xl  min-h-0 sm:min-h-[4rem] xl:min-h-[4rem] text-white/80 group-hover:text-white transition">
        {item.title}
      </h2>

      <p className="mt-2 text-base sm:text-lg   font-light text-white/40 leading-relaxed">
        {item.desc}
      </p>
    </motion.div>
  );
}

export default function Problem() {
  return (
    <section className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20">

      {/* ===== PROBLEMS ===== */}
      <div className="pt-10">

        {/* Heading */}

        <div className="w-full py-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border border-white/30 rounded-full px-4 py-1"
          >
            Problems
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-4   text-2xl md:text-3xl text-white lg:text-4xl font-medium leading-tight"
          >
            Challenges People Face While Managing Health


          </motion.h1>
        </div>
        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-5">
          {problems.map((item, i) => (
            <Card key={i} item={item} index={i} type="Problem" />
          ))}
        </div>

      </div>

      {/* ===== SOLUTIONS ===== */}
      <div className="pt-10">

        {/* Heading */}

        <div className="w-full py-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border border-white/30 rounded-full px-4 py-1"
          >
            Solutions
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-4   text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-tight"
          >
            A Smarter & Simpler Way to Take Control of Health

          </motion.h1>
        </div>
        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-5">
          {solutions.map((item, i) => (
            <Card key={i} item={item} index={i} type="Solution" />
          ))}
        </div>

      </div>

    </section>
  );
}