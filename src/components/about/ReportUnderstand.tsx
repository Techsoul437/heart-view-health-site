"use client";
import React from "react";
import { motion } from "framer-motion";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
// import Image from "next/image";

function ReportUnderstand() {
    return (
        <section className="w-full max-w-8xl mx-auto mt-10  px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20  relative">

            {/* Background Glow */}
            <div className="absolute inset-0 -z-10 flex justify-center">
                <div className="w-80 h-80  bg-[#2f5ba5]/70/20 blur-3xl rounded-full"></div>
            </div>

            <div className="
                max-w-5xl mx-auto 
                px-4 sm:px-6 md:px-10 
                flex flex-col items-center text-center
            ">

                {/* Badge */}
                <div className="">
                      <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center text-center"
                    >
                        <Headerbadge tag="Data to Understanding" text="Turn Your Health Data Into Clear Insights" />


                        <div className="mt-2 h-1 w-20 bg-gradient-to-r from-transparent via-[#2f5ba5]/70 to-transparent"></div>
                    </motion.div>
                </div>
                {/* Paragraph */}
                <p className="
                    mt-5 text-[#64748B]   text-base sm:text-lg leading-relaxed 
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
                                transition-all duration-300 hover:bg-[#2f5ba5]/70
                            "
                        >
                            <div className="w-2 h-2 bg-[#2f5ba5]/70 rounded-full"></div>
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
                className="w-65 text-center px-5 py-2 rounded-full border border-black/10 bg-black/5 text-[#64748B] text-base sm:text-lg  leading-relaxed font-light backdrop-blur-md"
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