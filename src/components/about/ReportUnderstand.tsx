"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function ReportUnderstand() {
    return (
        <section className="w-full pt-10">
            <div className="
                max-w-8xl mx-auto w-full 
                px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 
                grid xl:grid-cols-2 gap-0 lg:gap-10 xl:pt-4 items-center
            ">

                {/* LEFT CONTENT */}
                <div className="flex flex-col items-center text-center xl:items-start xl:text-left">

                    <div className="w-full py-4">

                        {/* Badge */}
                        <motion.span
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border border-white/30 rounded-full px-4 py-1"
                        >
                            Data to Understanding
                        </motion.span>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="mt-4  text-2xl md:text-3xl lg:text-4xl font-medium leading-tight text-white max-w-8xl  xl:max-w-xl"
                        >
                            Turn Your Health Data
                            Into Clear Insights
                        </motion.h1>
                    </div>

                    {/* Paragraph */}
                    <p className="
                        text-gray-400 text-base sm:text-lg leading-relaxed 
                        font-light mb-6 max-w-xl lg:max-w-3xl xl:max-w-xl
                    ">
                        Most platforms simply store your medical data. HeartView Health goes
                        further transforming complex reports into easy to understand visual
                        insights that actually help you take action.
                    </p>

                    {/* POINTS */}
                    <div className="
                        grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4 
                        w-full 
                        justify-items-center 
                        xl:justify-items-start
                    ">
                        {[
                            "Trends over time",
                            "Changes in key markers",
                            "Patterns that matter",
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="
                                    flex items-center gap-3 p-3 rounded-lg 
                                    border border-[#3D7773]/30 
                                    bg-[#0f172a]/40 backdrop-blur-md 
                                    w-full max-w-md
                                "
                            >
                                <div className="w-2 h-2 bg-[#3D7773] rounded-full"></div>
                                <p className="text-gray-300 text-base sm:text-lg font-medium">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="relative w-full flex pt-10  lg:pt-0 justify-center xl:justify-end">
                    <Image
                        src="/health-metrics.png"
                        alt="Health Metrics"
                        width={980}
                        height={190}
                        className="rounded-lg object-contain"
                    />
                </div>

            </div>
        </section>
    );
}

export default ReportUnderstand;