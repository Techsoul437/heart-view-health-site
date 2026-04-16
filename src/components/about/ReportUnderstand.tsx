"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function ReportUnderstand() {
    return (
        <section className="w-full  pt-16 ">
            <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 grid xl:grid-cols-2 gap-10 items-center">

                {/* LEFT CONTENT */}
                <div>
                    <div className="w-full py-4 text-left">

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
                            className="mt-4  text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-white max-w-xl"
                        >
                            Turn Your Health Data
                            Into Clear Insights
                        </motion.h1>
                    </div>

                    {/* Paragraph */}
                    <p className="text-gray-400 text-base sm:text-lg  leading-relaxed lg:max-w-md font-light mb-6 max-w-xl">
                        Most platforms simply store your medical data. HeartView Health goes
                        further transforming complex reports into easy to understand visual
                        insights that actually help you take action.
                    </p>

                    {/* POINTS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                        {[
                            "Trends over time",
                            "Changes in key markers",
                            "Patterns that matter",
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 p-3 rounded-lg border border-[#3D7773]/30 bg-[#0f172a]/40 backdrop-blur-md w-full lg:w-[400px]"
                            >
                                <div className="w-2 h-2 bg-[#3D7773] rounded-full"></div>
                                <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-medium">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="relative w-full ">
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