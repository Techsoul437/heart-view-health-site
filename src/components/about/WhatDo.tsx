"use client";

import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
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
            title: "Understand Your Heart Health in Seconds",
            desc: "Get instant clarity on your cardiovascular health with smart analysis.",
            icon: FaChartLine,
        },
        {
            title: "Never Miss a Dose Again",
            desc: "Automated reminders ensure you stay consistent with your medication.",
            icon: FaBell,
        },
        {
            title: "Stay on Top of Doctor Visits",
            desc: "Never forget appointments with intelligent scheduling and alerts.",
            icon: FaCalendarCheck,
        },
        {
            title: "All Your Health Reports One Secure Place",
            desc: "Access all medical records instantly, anytime, anywhere.",
            icon: FaFolderOpen,
        },
        {
            title: "See Trends at a Glance",
            desc: "Visual charts turn complex data into meaningful insights.",
            icon: FaChartBar,
        },
        {
            title: "Connect All Your Devices Seamlessly",
            desc: "Sync data from wearables, apps, and devices automatically.",
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
        <section className="w-full pt-5 md:pt-8 lg:pt-20  mt-0 lg:mt-15  text-black">
            <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 text-center">

                {/* Heading */}
                <div className="w-full ">

                    <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center text-center"
                    >
                        <Headerbadge tag="What we do" text="Smarter Heart Care, All in One Place" />


                        <div className="mt-2 h-1 w-20 bg-gradient-to-r from-transparent via-[#2f5ba5]/70 to-transparent"></div>
                    </motion.div>

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
                                className="group relative rounded-xl p-1 border border-black/10 hover:scale-[1.03] transition duration-300 hover:shadow-sm   hover:border hover:border-[#4a7bc9]/30"
                            >
                                <div className=" rounded-xl p-5 sm:p-3 h-full flex flex-col text-center">

                                    {/* Icon */}
                                    <div className="mb-4 flex justify-center">
                                        <div
                                            className="
    group relative rounded-xl
    bg-linear-to-r from-[#7CC4FF] to-[#85bdf8]
    text-white overflow-hidden
    before:absolute before:inset-0 before:rounded-xl
    before:p-px
    before:bg-linear-to-r before:from-[#0f61b3] before:to-[#6AA2E5]/10
    before:content-['']
 
  "
                                        >
                                            <div className="relative z-10 flex items-center justify-center rounded-xl bg-linear-to-r from-[#2f5ba5]/80 to-[#4a7bc9]/50 p-3 backdrop-blur-xl transition duration-300 group-hover:scale-105">
                                                <Icon size={22} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* MAIN FIX */}
                                    <div className="flex flex-col text-center flex-grow">

                                        {/* TITLE (fixed height) */}
                                        <h2 className="text-xl sm:text-xl lg:text-2xl font-medium h-16 text-black flex items-center justify-center">
                                            {card.title}
                                        </h2>

                                        {/* DESCRIPTION (aligned same for all) */}
                                        <p className="text-base sm:text-lg   xl:max-w-xl text-[#64748B]   leading-relaxed font-light text-center line-clamp-2">
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