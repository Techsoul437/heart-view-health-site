"use client";

import { motion } from "framer-motion";
import {
    FaChartLine,
    FaBell,
    FaCalendarCheck,
    FaFolderOpen,
    FaChartBar,
    FaWatchmanMonitoring,
} from "react-icons/fa";

export default function WhatWeDo() {
    const cards = [
        {
            title: "Smart Insights",
            desc: "Analyze trends and patterns to understand your heart health over time.",
            icon: FaChartLine,
        },
        {
            title: "Medication Reminders",
            desc: "Never miss your medicines with timely alerts and daily reminders.",
            icon: FaBell,
        },
        {
            title: "Appointment Tracking",
            desc: "Manage doctor visits with reminders and organized scheduling.",
            icon: FaCalendarCheck,
        },
        {
            title: "Medical Records",
            desc: "Store reports securely and access them anytime from one place.",
            icon: FaFolderOpen,
        },
        {
            title: "Visual Reports",
            desc: "Convert lab reports into easy charts and understandable trends.",
            icon: FaChartBar,
        },
        {
            title: "Wearable Integration",
            desc: "Seamlessly connect with Apple Health, Google Fit, and smart devices.",
            icon: FaWatchmanMonitoring,
        },
    ];

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut" as const,
            },
        }),
    };

    return (
        <section className="w-full pt-10  text-white">
            <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 text-center">

                {/* Heading */}
                <div className="w-full py-4">
                    <motion.span
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border border-white/30 rounded-full px-4 py-1"
                    >
                        What we do
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mt-4   text-2xl md:text-3xl lg:text-4xl font-medium leading-tight"
                    >
                        Smarter Heart Care, All in One Place
                    </motion.h1>
                </div>

                {/* GRID → 3 + 3 */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
                    {cards.map((card, i) => {
                        const Icon = card.icon;
                        return (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="group relative rounded-xl p-1 bg-gradient-to-r from-[#45657D] to-[#3D7773] hover:scale-[1.03] transition duration-300"
                            >
                                <div className="bg-[#0B1220] rounded-xl p-5 sm:p-3 h-full border border-white/5 flex flex-col text-center">

                                    {/* Icon */}
                                    <div className="mb-4 flex justify-center">
                                        <div className="p-3 rounded-lg bg-gradient-to-r from-[#3D7773] to-[#45657D]">
                                            <Icon size={22} />
                                        </div>
                                    </div>

                                    {/* MAIN FIX */}
                                    <div className="flex flex-col text-center flex-grow">

                                        {/* TITLE (fixed height) */}
                                        <h2 className="text-xl sm:text-xl lg:text-2xl font-medium h-16 flex items-center justify-center">
                                            {card.title}
                                        </h2>

                                        {/* DESCRIPTION (aligned same for all) */}
                                        <p className="text-base sm:text-lg   xl:max-w-xl text-gray-400 leading-relaxed font-light text-center line-clamp-2">
                                            {card.desc}
                                        </p>

                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}