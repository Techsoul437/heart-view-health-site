"use client";

import { motion } from "framer-motion";
import {
    FaHeartbeat,
    FaChartLine,
    FaBell,
    FaCalendarCheck,
    FaFolderOpen,
    FaChartBar,
    FaWatchmanMonitoring,
} from "react-icons/fa";

export default function WhatWeDo() {
    const cards = [
        // {
        //     title: "Heart Monitoring",
        //     desc: "Continuous ECG tracking to monitor heart activity and detect irregularities.",
        //     icon: FaHeartbeat,
        //     color: "from-red-500 to-pink-500",
        // },
        {
            title: "Smart Insights",
            desc: "Analyze trends and patterns to understand your heart health over time.",
            icon: FaChartLine,
            color: "from-blue-500 to-cyan-400",
        },
        {
            title: "Medication Reminders",
            desc: "Never miss your medicines with timely alerts and daily reminders.",
            icon: FaBell,
            color: "from-teal-400 to-green-400",
        },
        {
            title: "Appointment Tracking",
            desc: "Manage doctor visits with reminders and organized scheduling.",
            icon: FaCalendarCheck,
            color: "from-purple-500 to-indigo-400",
        },
        {
            title: "Medical Records",
            desc: "Store reports securely and access them anytime from one place.",
            icon: FaFolderOpen,
            color: "from-green-500 to-emerald-400",
        },
        {
            title: "Visual Reports",
            desc: "Convert lab reports into easy charts and understandable trends.",
            icon: FaChartBar,
            color: "from-orange-500 to-yellow-400",
        },
        {
            title: "Wearable Integration",
            desc: "Seamlessly connect with Apple Health, Google Fit, and smart devices.",
            icon: FaWatchmanMonitoring,
            color: "from-cyan-400 to-blue-500",
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
        <section className="w-full py-20 text-white">
            <div className="max-w-8xl mx-auto px-20 text-center">

                {/* Heading */}
                <div className="w-full py-4 text-center">

                    {/* Badge */}
                    <motion.span
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1"
                    >
                        What we do
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
                        Smarter Heart Care, All in One Place
                    </motion.h1>

                </div>

                {/* Grid */}
                <div className="mt-8 space-y-8">

                    {/* FIRST ROW → 4 CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {cards.slice(0, 4).map((card, i) => {
                            const Icon = card.icon;
                            return (
                                <motion.div
                                    key={i}
                                    custom={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="visible"
                                    className="group relative rounded-xl p-0.5 bg-gradient-to-r from-[#45657D] to-[#3D7773] hover:scale-[1.03] transition duration-300"
                                >
                                    <div className="bg-[#0B1220] rounded-xl p-6 h-full border border-white/5">

                                        {/* Icon */}
                                        <div className="mb-4 flex justify-center">
                                            <div className="p-3 rounded-lg bg-gradient-to-r from-[#3D7773] to-[#45657D]">
                                                <Icon size={22} />
                                            </div>
                                        </div>

                                        <h3 className="text-xl md:text-xl lg:text-2xl font-medium leading-tight text-white">{card.title}</h3>
                                        <p className="text-lg text-gray-400 font-light mt-2">
                                            {card.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* SECOND ROW → 3 CENTERED CARDS */}
                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-8xl px-45 w-full">
                            {cards.slice(4, 7).map((card, i) => {
                                const Icon = card.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        custom={i}
                                        variants={fadeUp}
                                        initial="hidden"
                                        animate="visible"
                                        className="group relative rounded-xl p-0.5 bg-gradient-to-r from-[#45657D] to-[#3D7773] hover:scale-[1.03] transition duration-300"
                                    >
                                        <div className="bg-[#0B1220] rounded-xl p-6 h-full border border-white/5">

                                            {/* Icon */}
                                            <div className="mb-4 flex justify-center">
                                                <div className="p-3 rounded-lg bg-gradient-to-r from-[#3D7773] to-[#45657D]">
                                                    <Icon size={22} />
                                                </div>
                                            </div>

                                            <h3 className="text-xl md:text-xl lg:text-2xl font-medium leading-tight text-white">{card.title}</h3>
                                            <p className="text-lg text-gray-400 font-light mt-2">
                                                {card.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}