"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import BorderButton from "@/Ui/buttons/BorderButton";

const STEPS = [
  {
    number: "01",
    label: "HOME DASHBOARD",
    title: "Your complete health overview at a glance",
    description:
      "See your heart risk status, vital metrics, and daily health insights all in one place. Quickly access key data like blood pressure, sugar levels, and heart rate, with real time updates across your devices.",
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
  },
  {
    number: "05",
    label: "MEDICATION TRACKING",
    title: "Never miss a dose again",
    description:
      "Set reminders for your medicines and track your daily intake. Mark doses as taken, snooze them, or skip when needed ensuring better treatment consistency.",
    image: "/step-5.jpeg",
  },
  {
    number: "06",
    label: "DOCTOR VISIT DETAILS",
    title: "All your visit records in one place",
    description:
      "Access detailed information about your doctor visits including notes, prescriptions, and attachments. Stay prepared for every follow up with organized medical records.",
    image: "/step-6.jpeg",
  },
];

const STEP_COUNT = STEPS.length;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 80,
    damping: 70,
    mass: 0.6,
  });

  const [activeStep, setActiveStep] = useState(0);
  const [imageStep, setImageStep] = useState(0);

  const [mobileTranslateMax, setMobileTranslateMax] = useState(0);
  const [sectionHeightPx, setSectionHeightPx] = useState(0);

  const measureMobile = useCallback(() => {
    const container = contentContainerRef.current;
    if (!container || !isMobile) return;

    const children = Array.from(container.children) as HTMLElement[];
    if (children.length < 2) return;

    let translateNeeded = 0;
    for (let i = 0; i < children.length - 1; i++) {
      translateNeeded += children[i].offsetHeight;
    }

    setMobileTranslateMax(translateNeeded);
    setSectionHeightPx(window.innerHeight + translateNeeded + 80);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;
    const t = setTimeout(measureMobile, 150);
    window.addEventListener("resize", measureMobile);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measureMobile);
    };
  }, [isMobile, measureMobile]);

  const mobileTextYPx = useTransform(
    smoothProgress,
    [0, 1],
    [0, -mobileTranslateMax]
  );

  const desktopTextY = useTransform(smoothProgress, [0, 1], ["0vh", "-500vh"]);

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

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [rawProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-16"
      style={{
        height: isMobile
          ? sectionHeightPx > 0
            ? `${sectionHeightPx}px`
            : `${STEP_COUNT * 80 + 20}vh`
          : "600vh",
      }}
    >
      {/* Heading */}
      <div className="w-full text-center px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20">
        <span className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1">
          How It Works
        </span>
        <h1 className="mt-4 text-2xl md:text-4xl lg:text-5xl font-medium text-white">
          Your Health Journey, Simplified
        </h1>
      </div>

      {/* Sticky wrapper */}
      <div className="sticky mt-10 lg:mt-15 top-0 h-screen max-w-8xl mx-auto z-30">

        {/* ── MOBILE LAYOUT ── */}
        <div className="flex flex-col lg:hidden h-full pt-1 md:pt-[14vh] [@media(min-width:480px)_and_(max-width:580px)]:pt-[6vh]">

          {/* Phone mockup */}
          <div className="flex-shrink-0 flex justify-center items-center h-[60%] md:h-[70%] [@media(min-width:480px)_and_(max-width:580px)]:h-[60%] [@media(min-width:480px)_and_(max-width:580px)]:mt-6 relative z-10">
            <div className="relative w-[50vw] md:w-[40vw] [@media(min-width:480px)_and_(max-width:580px)]:w-[36vw] max-w-[205px] md:max-w-[280px] [@media(min-width:480px)_and_(max-width:580px)]:max-w-[195px] aspect-[9/19]">
              <div className="relative w-full h-full rounded-3xl bg-black p-3 shadow-2xl">
                <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-black">
                  {STEPS.map((step, index) => (
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      animate={{ opacity: imageStep === index ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={step.image}
                        alt={step.label}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling content */}
          <div
            className="flex-1 overflow-hidden px-5 sm:px-8 [@media(min-width:480px)_and_(max-width:580px)]:px-6 z-0"
            style={{ minHeight: 0 }}
          >
            <motion.div
              ref={contentContainerRef}
              style={{ y: mobileTextYPx }}
              className="flex flex-col"
            >
              {STEPS.map((step, index) => {
                const isLast = index === STEPS.length - 1;
                return (
                  <div
                    key={step.number}
                    className="flex flex-col justify-start"
                    style={{
                      paddingTop: "1.25rem",
                      paddingBottom: isLast ? "1rem" : "1.25rem",
                    }}
                  >
                    <span className="mb-1 text-[10px] xs:text-xs [@media(min-width:480px)_and_(max-width:580px)]:text-[10px] text-[#3D7773] uppercase tracking-widest font-semibold">
                      {step.label}
                    </span>
                    <h2 className="text-base xs:text-lg sm:text-xl [@media(min-width:480px)_and_(max-width:580px)]:text-sm font-medium text-white mb-2 leading-snug">
                      {step.title}
                    </h2>
                    <p className="text-sm sm:text-base [@media(min-width:480px)_and_(max-width:580px)]:text-xs leading-relaxed font-light text-white/60 mb-4">
                      {step.description}
                    </p>
                    <BorderButton text="Download Now" href="#download" />
                  </div>
                );
              })}
            </motion.div>
          </div>

        </div>

        {/* ── DESKTOP LAYOUT  unchanged ── */}
        <div className="hidden lg:flex h-screen px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 relative">

          {/* Left Text */}
          <div className="w-1/2 h-full p-5 pr-20 overflow-hidden">
            <motion.div style={{ y: desktopTextY }} className="flex flex-col">
              {STEPS.map((step) => (
                <div key={step.number} className="h-screen flex flex-col justify-center">
                  <span className="mb-4 text-sm text-[#3D7773] uppercase">
                    {step.label}
                  </span>
                  <h2 className="text-4xl text-white mb-4">{step.title}</h2>
                  <p className="text-base sm:text-lg leading-relaxed font-light lg:max-w-md text-white/40 mb-6">
                    {step.description}
                  </p>
                  <BorderButton text="Download Now" href="#download" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Center Line */}
          <div className="absolute left-1/2 top-0 h-full w-px bg-white/10 -translate-x-1/2" />

          {/* Step Number Diamond */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className="h-24 w-24 flex items-center justify-center rotate-45 border border-white/20 bg-neutral-900 rounded-lg"
              style={{
                boxShadow: `inset 0 0 18px 4px rgba(255,255,255,0.12), inset 0 0 6px 1px rgba(255,255,255,0.18)`,
              }}
            >
              <span className="-rotate-45 text-white text-2xl font-bold">
                {STEPS[activeStep].number}
              </span>
            </div>
          </div>

          {/* Right Phone */}
          <div className="w-1/2 flex items-center justify-center">
            <div className="relative w-[22vw] max-w-sm lg:mt-15 aspect-[9/19]">
              <div className="relative w-full h-full rounded-[3rem] bg-black p-1.5 shadow-2xl">
                <div className="relative w-full h-full rounded-[2.7rem] overflow-hidden bg-black">
                  {STEPS.map((step, index) => (
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      animate={{ opacity: imageStep === index ? 1 : 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={step.image}
                        alt={step.label}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}