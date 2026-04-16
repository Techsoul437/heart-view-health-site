"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const data = [
    {
        id: "01",
        title: "Clarity",
        desc: "Health data should be simple, not overwhelming.",
        points: [
            "Understand your heart data without confusion",
            "Visual insights that actually make sense",
            "Know what matters, when it matters",
        ],
    },
    {
        id: "02",
        title: "Consistency",
        desc: "Daily habits  like medication and follow ups  matter just as much as monitoring",
        points: [
            "Stay on track with daily health routines",
            "Smart reminders for medication & checkups",
            "Build habits that support long term health",
        ],
    },
    {
        id: "03",
        title: "Continuity",
        desc: "Your health is a journey, not a single moment.",
        points: [
            "Track your health journey over time",
            "Connect past insights with present care",
            "Always stay one step ahead of risks",
        ],
    },
];

// data ke end mein first card ka clone add kiya — infinite cycle ke liye
const extendedData = [...data, data[0]];
const total = data.length;

export default function ProcessCards() {
    const trackRef = useRef<HTMLDivElement>(null);
    const [current, setCurrent] = useState(0);
    const isResetting = useRef(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (window.innerWidth >= 1024) return;
            if (isResetting.current) return;
            setCurrent((prev) => prev + 1);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        track.style.transition = "transform 0.6s cubic-bezier(0.4,0,0.2,1)";
        track.style.transform = `translateX(-${current * 100}%)`;
    }, [current]);

    const handleTransitionEnd = () => {
        // Jab clone (4th card) pe pohonche, silently wapas 0 pe jump karo
        if (current === total) {
            isResetting.current = true;
            const track = trackRef.current;
            if (!track) return;
            track.style.transition = "none";
            track.style.transform = "translateX(0%)";
            setCurrent(0);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    isResetting.current = false;
                });
            });
        }
    };

    return (
        <section className="pt-16 px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 flex justify-center">
            <div className="w-full max-w-8xl mx-auto">

                {/* Heading */}
                <div className="w-full py-4 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1"
                    >
                        Our Approach
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 80, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9 }}
                        className="mt-4 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-white"
                    >
                        Your Heart Health, Simplified & Connected
                    </motion.h1>
                </div>

                {/* Cards */}
                <div className="mt-10 flex justify-center">

                    {/* MOBILE / TABLET — transform-based infinite scroll */}
                    <div className="w-full lg:hidden h-full pb-10 overflow-hidden ">
                        <div
                            ref={trackRef}
                            onTransitionEnd={handleTransitionEnd}
                            style={{
                                display: "flex",
                                willChange: "transform",
                            }}
                        >
                            {extendedData.map((item, index) => (
                                <div
                                    key={index}
                                    style={{ minWidth: "100%" }}
                                    className="flex flex-col items-center px-4 h-full"
                                >
                                    {/* Number Circle */}
                                    <div className="w-14 h-14  rounded-full border-2 border-[#B4B0B0] bg-gradient-to-r from-[#45657D] to-[#3D7773] hover:scale-[1.03] transition duration-300 text-white flex items-center justify-center font-medium text-xl z-10">
                                        {item.id}
                                    </div>

                                    {/* Arrow */}
                                    <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-400 mt-1" />

                                    {/* Card */}
                                    <div className="mt-4 w-full max-w-sm border-[#3D7773] text-white shadow-sm shadow-[#45657D] h-full min-h-100 flex flex-col h-full">
                                        <h2 className="text-white text-center py-2  text-xl sm:text-xl lg:text-2xl bg-[#3D7773]">
                                            {item.title}
                                        </h2>
                                        <div className="flex flex-col flex-1 px-5 py-4">
                                            <p className="text-base sm:text-lg  leading-relaxed lg:max-w-md font-light text-gray-300 mb-4">
                                                {item.desc}
                                            </p>
                                          <ul className="space-y-2 text-base sm:text-lg leading-relaxed lg:max-w-md font-light text-gray-300 flex-1">
                                                {item.points.map((p, i) => (
                                                    <li key={i} className="flex gap-2">
                                                        <span className="mt-3 w-1 h-1 bg-gray-600 rounded-full flex-shrink-0" />
                                                        <span>{p}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="h-1 w-12 rounded-full mx-auto mb-3 bg-[#3D7773]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* DESKTOP — bilkul same pehle jaisa grid */}
                    <div className="hidden lg:grid lg:grid-cols-3 gap-2 w-full">
                        {data.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center"
                            >
                                {/* Number Circle */}
                                <div className="w-14 h-16 rounded-full border-2 border-[#B4B0B0] bg-gradient-to-r from-[#45657D] to-[#3D7773] hover:scale-[1.03] transition duration-300 text-white flex items-center justify-center font-medium text-xl z-10">
                                    {item.id}
                                </div>

                                {/* Arrow */}
                                <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-400 mt-1" />

                                {/* Card */}
                                <div className="mt-4 w-full max-w-sm border-[#3D7773] text-white shadow-sm shadow-[#45657D] h-full flex flex-col ">
                                    <h2 className="text-white text-center py-2  text-xl sm:text-xl lg:text-2xl bg-[#3D7773]">
                                        {item.title}
                                    </h2>
                                    <div className="flex flex-col flex-1 px-5 py-4">
                                        <p className="text-base sm:text-lg  leading-relaxed lg:max-w-md font-light text-gray-300 mb-4">
                                            {item.desc}
                                        </p>
                                        <ul className="space-y-3 text-base sm:text-lg  leading-relaxed lg:max-w-md font-light text-gray-300 flex-1">
                                            {item.points.map((p, i) => (
                                                <li key={i} className="flex gap-2">
                                                    <span className="mt-3 w-1 h-1 bg-gray-600 rounded-full flex-shrink-0" />
                                                    <span>{p}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="h-1 w-12 rounded-full mx-auto mb-3 bg-[#3D7773]" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}