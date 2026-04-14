"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import BorderButton from "@/Ui/buttons/BorderButton";

const STEPS = [
  {
    number: "01",
    label: "HOME DASHBOARD",
    title: "Your complete health overview at a glance",
    description:
      "See your heart risk status, vital metrics, and daily health insights  all in one place. Quickly access key data like blood pressure, sugar levels, and heart rate, with real-time updates across your devices.",
    image: "/step-1.jpeg",
  },
  {
    number: "02",
    label: "HEART RISK ANALYSIS",
    title: "Understand your heart health clearly",
    description:
      "Get a personalized Heart View Score based on your vitals, lifestyle, and medical data. Identify key contributing factors and make informed decisions to improve your cardiovascular health.",
    image: "/step-2.jpeg",
  },
  {
    number: "03",
    label: "BLOOD SUGAR INSIGHTS",
    title: "Track and manage your glucose levels",
    description:
      "Monitor your blood sugar trends with simple visual graphs. Compare your readings with normal ranges and see how you perform compared to similar users.",
    image: "/step-3.jpeg",
  },
  {
    number: "04",
    label: "APPOINTMENT MANAGEMENT",
    title: "Stay organized with your doctor visits",
    description:
      "Schedule, view, and manage appointments. Keep track of upcoming visits, history, and important medical schedules without missing anything.",
    image: "/step-4.jpeg",
  }, {
    number: "05",
    label: "MEDICATION TRACKING",
    title: "Never miss a dose again",
    description:
      "Set reminders for your medicines and track your daily intake. Mark doses as taken, snooze them, or skip when needed  ensuring better treatment consistency.",
    image: "/step-5.jpeg",
  }, {
    number: "06",
    label: "DOCTOR VISIT DETAILS",
    title: "All your visit records in one place",
    description:
      "Access detailed information about your doctor visits including notes, prescriptions, and attachments. Stay prepared for every follow-up with organized medical records.",
    image: "/step-6.jpeg",
  },
];

const STEP_COUNT = STEPS.length;

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.6,
  });

  const [activeStep, setActiveStep] = useState(0);
  const [imageStep, setImageStep] = useState(0);

  const textY = useTransform(
    smoothProgress,
    [0, 1],
    ["0vh", "-500vh"] // 3 steps → (3-1)*100
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(scrolled / total, 1));

      rawProgress.set(progress);

      const idx = Math.min(Math.floor(progress * STEP_COUNT), STEP_COUNT - 1);
      setActiveStep(idx);
      setImageStep(idx);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [rawProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[500vh]" // 3 steps = 300vh
    >
      {/* Heading */}

      <div className="w-full py-20 text-center">

        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1"
        >
          How It Works
        </motion.span>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: 0.9,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1], // premium smooth easing
          }}
          className="mt-4 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-white"
        >
          Your Health Journey, Simplified
        </motion.h1>

      </div>

      {/* Sticky Section */}
      <div className="sticky top-0 flex h-screen max-w-8xl mx-auto px-20 overflow-hidden">

        {/* LEFT TEXT */}
        <div className="w-1/2 h-full p-5  pr-49 overflow-hidden">
          <motion.div style={{ y: textY }} className="flex flex-col">

            {STEPS.map((step) => (

              <div key={step.number} className="h-screen flex flex-col justify-center">

                <span className="mb-4 text-sm font-medium tracking-widest text-[#3D7773] uppercase">
                  {step.label}
                </span>

                <h2 className="text-4xl lg:text-5xl font-med text-white mb-4">
                  {step.title}
                </h2>

                <p className="text-lg md:text-base lg:text-2xl font-light text-white/40 mb-6">
                  {step.description}
                </p>
                <div className="mt-6">
                  <BorderButton text="Download Now" href="#download"></BorderButton>

                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CENTER LINE */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-white/10 -translate-x-1/2" />

        {/* STEP NUMBER */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="h-24 w-24 flex items-center justify-center rotate-45 border border-white/20 bg-neutral-900 rounded-lg"
            style={{
              boxShadow: `
    inset 0 0 18px 4px rgba(255,255,255,0.12),
    inset 0 0 6px 1px rgba(255,255,255,0.18)
  `
            }}
          >
            <span className="-rotate-45 text-white text-2xl font-bold">
              {STEPS[activeStep].number}
            </span>
          </div>
        </div>
        {/* RIGHT IMAGE */}
        <div className="w-1/2 flex  mt-20 items-center justify-center">

          {/* Wrapper */}
          <div className="relative w-[22vw] max-w-sm aspect-[9/19]">

            {/* Phone Body */}
            <div className="relative w-full h-full rounded-[3rem] bg-black p-1.5 shadow-2xl">

              {/* Subtle Metal Edge */}
              <div className="absolute inset-0 rounded-[3rem] ring-1 ring-white/10 pointer-events-none" />

              {/* Screen */}
              <div className="relative w-full h-full rounded-[2.7rem] overflow-hidden bg-black">

                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2   w-1/4 h-5 bg-black rounded-full z-20" />

                {/* Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent z-10 pointer-events-none" />

                {/* Content */}
                {STEPS.map((step, index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                      opacity: imageStep === index ? 1 : 0,
                      scale: imageStep === index ? 1 : 1.01,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                  >
                    <Image
                      src={step.image}
                      alt=""
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </motion.div>
                ))}

              </div>

              {/* Side Buttons */}
              <div className="absolute left-0 top-1/4 -translate-x-full w-1 h-10 bg-neutral-700 rounded" />
              <div className="absolute left-0 top-[32%] -translate-x-full w-1 h-7 bg-neutral-700 rounded" />
              <div className="absolute right-0 top-[28%] translate-x-full w-1 h-12 bg-neutral-700 rounded" />

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}