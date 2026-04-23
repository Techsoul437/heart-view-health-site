"use client";

import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const data = [
    {
        num: "01",
        title: "Understand your health easily",
        desc: "Health data should be simple, not overwhelming.",
        points: [
            "Understand your heart data without confusion",
            "Visual insights that actually make sense",
            "Know what matters, when it matters",
        ],
    },
    {
        num: "02",
        title: "Stay on track daily",
        desc: "Daily habits like medication and follow ups matter just as much as monitoring",
        points: [
            "Stay on track with daily health routines",
            "Smart reminders for medication & checkups",
            "Build habits that support long term health",
        ],
    },
    {
        num: "03",
        title: "See long-term progress",
        desc: "Your health is a journey, not a single moment.",
        points: [
            "Track your health journey over time",
            "Connect past insights with present care",
            "Always stay one step ahead of risks",
        ],
    },
];

const extendedData = [...data, data[0], data[1]];
const total = data.length;

export default function ProcessCards() {
    const mobileRef = useRef<HTMLDivElement>(null);
    const tabletRef = useRef<HTMLDivElement>(null);

    const [mobileIndex, setMobileIndex] = useState(0);
    const [tabletIndex, setTabletIndex] = useState(0);

    const [screen, setScreen] = useState<"mobile" | "tablet" | "desktop">("mobile");

    // ✅ detect screen safely
    useEffect(() => {
        const updateScreen = () => {
            const w = window.innerWidth;
            if (w < 768) setScreen("mobile");
            else if (w < 1024) setScreen("tablet");
            else setScreen("desktop");
        };

        updateScreen();
        window.addEventListener("resize", updateScreen);

        return () => window.removeEventListener("resize", updateScreen);
    }, []);

    // MOBILE scroll
    useEffect(() => {
        if (screen !== "mobile") return;

        const interval = setInterval(() => {
            setMobileIndex((prev) => prev + 1);
        }, 2500);

        return () => clearInterval(interval);
    }, [screen]);

    useEffect(() => {
        if (!mobileRef.current) return;
        mobileRef.current.style.transform = `translateX(-${mobileIndex * 100}%)`;
        mobileRef.current.style.transition = "transform 0.6s ease";
    }, [mobileIndex]);

    const handleMobileEnd = () => {
        if (mobileIndex === total) {
            const el = mobileRef.current;
            if (!el) return;
            el.style.transition = "none";
            el.style.transform = "translateX(0)";
            setMobileIndex(0);
        }
    };

    // TABLET scroll
    useEffect(() => {
        if (screen !== "tablet") return;

        const interval = setInterval(() => {
            setTabletIndex((prev) => prev + 1);
        }, 2500);

        return () => clearInterval(interval);
    }, [screen]);

    useEffect(() => {
        if (!tabletRef.current) return;
        tabletRef.current.style.transform = `translateX(-${tabletIndex * 50}%)`;
        tabletRef.current.style.transition = "transform 0.6s ease";
    }, [tabletIndex]);

    const handleTabletEnd = () => {
        if (tabletIndex === total) {
            const el = tabletRef.current;
            if (!el) return;
            el.style.transition = "none";
            el.style.transform = "translateX(0)";
            setTabletIndex(0);
        }
    };

    return (
        <section className=" flex justify-center ">
            <div className="w-full max-w-8xl mx-auto  mt-10 px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 ">

                {/* Heading SAME */}
               
      <Headerbadge tag=" Our Approach" text="Your Heart Health, Simplified & Connected" />

                <div className="mt-5 flex justify-center">

                    {/* MOBILE */}
                    <div className="w-full md:hidden overflow-hidden">
                        <div ref={mobileRef} onTransitionEnd={handleMobileEnd} className="flex">
                            {extendedData.map((item, i) => (
                                <div key={i} className="min-w-full px-1 flex flex-col items-center">

                                    <div className="w-14 h-14 rounded-full border-2 border-[#B4B0B0] bg-gradient-to-r from-[#45657D] to-[#3D7773] text-white flex items-center justify-center">
                                        <span className="text-lg">{item.num}</span>
                                    </div>

                                    <div className="w-0 h-0 border-l-8 border-transparent border-r-8 border-transparent border-t-8 border-t-gray-400 mt-1" />

                                    {/* ✅ SAME HEIGHT CARD */}
                                    <div className="mt-4 w-full max-w-md border-[#3D7773] text-white shadow-sm shadow-[#45657D] h-70  mb-1 flex flex-col">

                                        <h2 className="text-center py-2 text-xl sm:text-xl lg:text-2xl text-white bg-[#3D7773]">
                                            {item.title}
                                        </h2>

                                        <div className="flex flex-col flex-1 px-5 py-4 overflow-hidden">
                                            <p className="text-gray-400 mb-4 text-base sm:text-lg  leading-relaxed  font-light line-clamp-3">{item.desc}</p>

                                            <ul className="space-y-2 text-gray-400 flex-1 overflow-hidden">
                                                {item.points.map((p, i) => (
                                                    <li key={i} className="flex gap-2 text-base sm:text-lg  leading-relaxed  font-light">
                                                        <span className="mt-3 w-1 h-1 bg-gray-600 rounded-full" />
                                                        <span className="line-clamp-2">{p}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="h-1 w-12 mx-auto mb-3 bg-[#3D7773]" />
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>

                    {/* TABLET */}
                    <div className="hidden md:block lg:hidden overflow-hidden">
                        <div ref={tabletRef} onTransitionEnd={handleTabletEnd} className="flex">
                            {extendedData.map((item, i) => (
                                <div key={i} className="min-w-1/2 px-4 flex flex-col items-center">

                                    <div className="w-14 h-14 rounded-full border-2 border-[#B4B0B0] bg-gradient-to-r from-[#45657D] to-[#3D7773] text-white flex items-center justify-center">
                                        <span className="text-lg">{item.num}</span>
                                    </div>
                                    <div className="w-0 h-0 border-l-8  border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-400 mt-1" />

                                    <div className="w-0 h-0 border-t-8 border-t-gray-400 mt-1" />

                                    <div className="mt-4 w-full max-w-sm border-[#3D7773] text-white shadow-sm shadow-[#45657D] h-90  mb-1 flex flex-col">
                                        <h2 className="text-center py-2 text-xl sm:text-xl lg:text-2xl text-white bg-[#3D7773]">{item.title}</h2>

                                        <div className="flex flex-col flex-1 px-5 py-4 overflow-hidden">
                                            <p className="text-gray-400 mb-4 text-base sm:text-lg  leading-relaxed  font-light line-clamp-3">{item.desc}</p>

                                            <ul className="space-y-2 text-gray-400 flex-1 overflow-hidden">
                                                {item.points.map((p, i) => (
                                                    <li key={i} className="flex gap-2 text-base sm:text-lg  leading-relaxed  font-light">
                                                        <span className="mt-3 w-1 h-1 bg-gray-600 rounded-full" />
                                                        <span className="line-clamp-2">{p}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="h-1 w-12 mx-auto mb-3 bg-[#3D7773]" />
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>

                    {/* DESKTOP SAME */}
                    <div className="hidden lg:grid grid-cols-3 gap-2 w-full">
                        {data.map((item) => (
                            <div key={item.num} className="flex flex-col items-center">
                                <div className="w-14 h-14 rounded-full border bg-gradient-to-r from-[#45657D] to-[#3D7773] text-white flex items-center justify-center">
                                    <span className="text-lg">{item.num}</span>
                                </div>
                                <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-400 mt-1" />

                                <div className="mt-4 w-full max-w-md h-88  mb-1 flex flex-col border-[#3D7773] shadow-sm shadow-[#45657D]">
                                    <h2 className="text-center py-2 text-xl sm:text-lg xl:text-2xl text-white bg-[#3D7773]">{item.title}</h2>

                                    <div className="flex flex-col flex-1 px-5 py-4 overflow-hidden">
                                        <p className="text-gray-400  mb-4 text-base sm:text-lg  leading-relaxed  font-light line-clamp-2">{item.desc}</p>

                                        <ul className="space-y-2 text-gray-400  flex-1 overflow-hidden">
                                            {item.points.map((p, i) => (
                                                <li key={i} className="flex gap-2 text-base sm:text-lg  leading-relaxed  font-light">
                                                    <span className="w-1 h-1 bg-gray-600 mt-2 rounded-full" />
                                                    {p}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="h-1 w-12 mx-auto mb-3 bg-[#3D7773]" />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}