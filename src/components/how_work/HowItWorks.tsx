"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";

// ✅ Step Type
type Step = {
  number: string;
  label: string;
  title: string;
  description: string;
  image: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    label: "HOME DASHBOARD",
    title: "Your complete health overview at a glance",
    description:
      "See your heart risk status, vital metrics, and daily health insights all in one place. Quickly access key data like blood pressure, sugar levels, and heart rate, with real time updates across your devices.",
    image: "/step-1M.png",
  },
  {
    number: "02",
    label: "HEART RISK ANALYSIS",
    title: "Understand your heart health clearly",
    description:
      "Get a personalized Heart View Score based on your vitals, lifestyle, and medical data. Identify key contributing factors and make informed decisions to improve your cardiovascular health.",
    image: "/step-2M.png",
  },
  {
    number: "03",
    label: "BLOOD SUGAR INSIGHTS",
    title: "Track and manage your glucose levels",
    description:
      "Monitor your blood sugar trends with simple visual graphs. Compare your readings with normal ranges and see how you perform compared to similar users.",
    image: "/step-3M.png",
  },
  {
    number: "04",
    label: "APPOINTMENT MANAGEMENT",
    title: "Stay organized with your doctor visits",
    description:
      "Schedule, view, and manage  appointments. Keep track of upcoming visits, history, and important medical schedules without missing anything.",
    image: "/step-4M.png",
  },
  {
    number: "05",
    label: "MEDICATION TRACKING",
    title: "Never miss a dose again",
    description:
      "Set reminders for your medicines and track your daily intake. Mark doses as taken, snooze them, or skip when needed ensuring better treatment consistency.",
    image: "/step-5M.png",
  },
  {
    number: "06",
    label: "DOCTOR VISIT DETAILS",
    
    title: "All your visit records in one place",
    description:
      "Access detailed information about your doctor visits including notes, prescriptions, and attachments. Stay prepared for every follow up with organized medical records.",
    image: "/step-6M.png",
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

/** Content container staggered children */
const contentContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

/** Each content child fades up */
const contentChild: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/** Phone slides in from a given direction */
const phoneVariant = (fromRight: boolean): Variants => ({
  hidden: { opacity: 0, x: fromRight ? 80 : -80, scale: 0.93 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.1 },
  },
});

// ─── PhoneFrame ───────────────────────────────────────────────────────────────

function PhoneFrame({ image, alt }: { image: string; alt: string }) {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
      <div className="relative h-150 overflow-hidden rounded-3xl">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

// ─── ContentBlock ─────────────────────────────────────────────────────────────

function ContentBlock({ step }: { step: Step }) {
  return (
    <motion.div
      variants={contentContainer}
      className="flex flex-col justify-center  h-full "
    >
      {/* <motion.div
  variants={contentContainer}
  className="
    flex flex-col justify-center h-full
    rounded-2xl
    backdrop-blur-md
    shadow-[#2f5ba5]/70/30
    transition-all duration-300
    p-6 sm:p-8
  "
> */}
      {/* Number + Label */}
      <motion.div variants={contentChild} className="flex items-center justify-center lg:justify-start gap-3 mb-4">
        <span className="text-5xl font-bold text-[#2f5ba5]/70">{step.number}</span>
        <span className="text-sm md:text-md font-medium tracking-widest uppercase text-[#2f5ba5]">
          {step.label}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        variants={contentChild}
        className="text-xl sm:text-xl lg:text-2xl mb-4 text-center lg:text-left leading-snug text-black"
      >
        {step.title}
      </motion.h2>

      {/* Description */}
      <motion.p
        variants={contentChild}
        className="text-[#64748B]    text-base sm:text-lg text-center lg:text-left max-w-md mx-auto lg:mx-0 leading-relaxed font-light"
      >
        {step.description}
      </motion.p>

      {/* Divider */}
      <motion.div
        variants={contentChild}
        className="mt-6 h-px w-16 bg-[#2f5ba5]/70 hidden lg:block"
      />
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function AppStepsSection() {
  return (
    <section className="w-full max-w-7xl  mx-auto pt-5 md:pt-8 lg:pt-20 px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-0 mt-0 lg:mt-15 ">

      {/* ── Header ── */}
      
      <Headerbadge tag="How It Works" text="Everything you need,beautifully simple" />

      {/* ── Steps ── */}
      <div className="flex flex-col gap-25 mt-10">
        {STEPS.map((step, index) => {
          const isEven = index % 2 === 0;

          // On even rows: content is left, phone is right → phone enters from right
          // On odd rows:  content is right, phone is left → phone enters from left
          const phoneSlidesFromRight = isEven;

          return (
            <div
              key={step.number}
              className="grid grid-cols-1 lg:grid-cols-2 items-center  text-center lg:text-left"
            >
              {/* Content */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={contentContainer}
                className={isEven ? "lg:order-1" : "lg:order-2"}
              >
                <ContentBlock step={step} />
              </motion.div>

              {/* Phone */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={phoneVariant(phoneSlidesFromRight)}
                className={isEven ? "lg:order-2" : "lg:order-1"}
              >
                <PhoneFrame image={step.image} alt={step.label} />
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}