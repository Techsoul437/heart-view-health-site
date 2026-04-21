"use client";
import React from "react";
import { motion } from "framer-motion";
// import Image from "next/image";

function ReportUnderstand() {
    return (
        <section className="w-full max-w-8xl mx-auto mt-10  px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20  relative">

            {/* Background Glow */}
            <div className="absolute inset-0 -z-10 flex justify-center">
                <div className="w-80 h-80  bg-[#3D7773]/20 blur-3xl rounded-full"></div>
            </div>

            <div className="
                max-w-5xl mx-auto 
                px-4 sm:px-6 md:px-10 
                flex flex-col items-center text-center
            ">

                {/* Badge */}
                <div className="py-4">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border border-white/20 rounded-full px-4 py-1"
                    >
                        Data to Understanding
                    </motion.span>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mt-6 text-2xl md:text-3xl lg:text-4xl font-medium leading-tight text-white max-w-3xl"
                    >
                        Turn Your Health Data
                        Into Clear Insights
                    </motion.h1>
                </div>
                {/* Paragraph */}
                <p className="
                    mt-5 text-gray-400 text-base sm:text-lg leading-relaxed 
                    font-light max-w-2xl
                ">
                    Most platforms simply store your medical data. HeartView Health goes
                    further transforming complex reports into easy to understand visual
                    insights that actually help you take action.
                </p>

                {/* POINTS */}
                {/* <div className="
                    mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 
                    w-full max-w-4xl
                ">
                    {[
                        "Trends over time",
                        "Changes in key markers",
                        "Patterns that matter",
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="
                                flex items-center gap-3 p-4 rounded-xl 
                                border border-[#3D7773]/30 
                                bg-[#0f172a]/50 backdrop-blur-md 
                                w-full justify-center sm:justify-start
                                transition-all duration-300 hover:bg-[#3D7773]/10
                            "
                        >
                            <div className="w-2 h-2 bg-[#3D7773] rounded-full"></div>
                            <p className="text-gray-300 text-base sm:text-lg font-medium">
                                {item}
                            </p>
                        </div>
                    ))}
                </div> */}
 <div className="flex flex-wrap justify-center gap-4 mt-4">
            {[
            "Trends over time",
                        "Changes in key markers",
                        "Patterns that matter",
            ].map((item, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-65 text-center px-5 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-base sm:text-lg  leading-relaxed font-light backdrop-blur-md"
              >
                {item}
              </motion.span>
            ))}
          </div>
            </div>

            {/* RIGHT IMAGE (COMMENTED) */}
            {/*
            <div className="relative w-full flex pt-10 lg:pt-0 justify-center xl:justify-end">
                <Image
                    src="/health-metrics.png"
                    alt="Health Metrics"
                    width={980}
                    height={190}
                    className="rounded-lg object-contain"
                />
            </div>
            */}

        </section>
    );
}

export default ReportUnderstand;