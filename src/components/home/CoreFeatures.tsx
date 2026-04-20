"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Heart, Activity, Pill, FileText, Smartphone } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Heart Health Monitoring",
    points: ["Blood pressure", "Heart rate", "Blood sugar", "Weight & BMI", "Daily activity"],
    value: "See your health clearly — not scattered across apps.",
  },
  {
    icon: Activity,
    title: "Smart Health Insights",
    points: ["Trend analysis", "Visual charts", "Personalized indicators", "Benchmark comparisons"],
    value: "Know what’s improving and what needs attention.",
  },
  {
    icon: Pill,
    title: "Medications & Reminders",
    points: ["Medication alerts", "Meal timing", "Appointments", "Daily routines"],
    value: "Consistency = better outcomes.",
  },
  {
    icon: FileText,
    title: "Lab Reports, Simplified",
    points: ["Store reports", "Visual charts", "Track changes", "Easy summaries"],
    value: "No more confusing reports.",
  },
  {
    icon: Smartphone,
    title: "Connect Your Devices",
    points: ["Apple Health", "Google Fit", "Wearables"],
    value: "One platform. Complete picture.",
  },
];

export default function CoreFeatures() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const card = container.firstElementChild as HTMLElement;

    const gap = 24;
    const width = card.offsetWidth + gap;

    container.scrollBy({
      left: dir === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  return (
<section className="w-full max-w-8xl mx-auto py-16 px-6 lg:px-16 relative">

  <div className="relative">

    {/* LEFT ARROW */}
    <button
      onClick={() => scroll("left")}
      className="
        absolute top-1/2 -translate-y-1/2
        left-0 lg:-left-8
        bg-white/10 hover:bg-white/20
        rounded-full p-3 z-10
      "
    >
      <ChevronLeft className="text-white" />
    </button>

    {/* RIGHT ARROW */}
    <button
      onClick={() => scroll("right")}
      className="
        absolute top-1/2 -translate-y-1/2
        right-0 lg:-right-8
        bg-white/10 hover:bg-white/20
        rounded-full p-3 z-10
      "
    >
      <ChevronRight className="text-white" />
    </button>

    {/* SAFE SPACE WRAPPER */}
    <div className="px-10 lg:px-0">
      
      <div
        ref={scrollRef}
        className="
          flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory
          no-scrollbar
        "
      >
        {features.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className="
                snap-start flex-shrink-0
                w-full sm:w-1/2 lg:w-1/3
              "
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 h-full flex flex-col">

                <div className="min-h-44 flex flex-col">
                  <Icon className="text-white mb-4" />

                  <h3 className="text-white text-lg font-semibold mb-3">
                    {item.title}
                  </h3>

                  <ul className="text-gray-400 text-sm space-y-1 min-h-28">
                    {item.points.map((point, idx) => (
                      <li key={idx}>• {point}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <p className="text-gray-300 text-sm">
                    {item.value}
                  </p>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  </div>
</section>
  );
}