"use client";

import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { motion } from "framer-motion";
import { Users, HeartPulse, Activity, ShieldCheck } from "lucide-react";

const items = [
    {
        icon: Activity,
        title: "Daily Health Trackers",
        desc: "Stay consistent with your everyday vitals and build meaningful awareness over time.",
    },
    {
        icon: Users,
        title: "Families & Caregivers",
        desc: "Easily manage multiple health profiles and keep everyone’s data organized in one place.",
    },
    {
        icon: HeartPulse,
        title: "Lifestyle-Focused Individuals",
        desc: "Perfect for those managing blood pressure, heart rate, and long-term wellness habits.",
    },
    {
        icon: ShieldCheck,
        title: "Proactive Thinkers",
        desc: "For anyone who believes prevention and awareness are better than cure.",
    },
];

export default function WhoItsFor() {
    return (
        <section className="relative w-full max-w-8xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 pt-10">

            {/* Heading */}

           
                    <Headerbadge tag="Who It’s For" text="Designed for Real People, Real Health Needs" />

            {/* Layout */}
            <div className="mt-5 grid lg:grid-cols-2 gap-12 items-center">

                {/* Left Highlight Block */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative rounded-lg border border-black/10 p-8 backdrop-blur-md bg-[#EDEDEE]"
                >

                    <h3 className="text-black text-xl sm:text-xl lg:text-2xl font-medium">
                        Built for Every Stage of Your Health Journey
                    </h3>

                    <p className="mt-4 text-[#475569]   text-base sm:text-lg  max-w-lg leading-relaxed  font-light">
                        From simple daily tracking to deeper health insights, this platform is
                        crafted to support individuals, families, and anyone aiming for
                        consistent well-being without complexity.
                    </p>

                    {/* subtle divider */}
                    <div className="mt-6 h-px bg-linear-to-r from-transparent via-black/20 to-transparent" />

                    <p className="mt-6 text-base sm:text-lg  leading-relaxed  font-light text-gray-500">
                        No matter where you start, the goal remains the same  clarity,
                        consistency, and control over your health.
                    </p>
                </motion.div>

                {/* Right List */}
                <div className="space-y-6">
                    {items.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="group flex gap-4 items-start"
                            >
                                {/* Icon */}
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-black/5 border border-black/10 flex items-center justify-center
                  group-hover:bg-[#4a7bc9]/30 transition">
                                    <Icon className="w-5 h-5 text-[#2f5ba5] " />
                                </div>

                                {/* Content */}
                                <div>
                                    <h2 className="text-black font-medium text-xl sm:text-xl lg:text-2xl">
                                        {item.title}
                                    </h2>
                                    <p className="text-[#64748B]   text-base sm:text-lg  leading-relaxed  font-light mt-1">
                                        {item.desc}
                                    </p>
                                </div>

                                {/* hover line */}
                                <div className="flex-1 h-px bg-black/10 mt-6 ml-4 opacity-0 group-hover:opacity-100 transition" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}