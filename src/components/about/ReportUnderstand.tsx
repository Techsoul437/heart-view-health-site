"use client"
import React from 'react'
import { motion } from "framer-motion";
import Image from 'next/image';

function ReportUnderstand() {
    return (
        <div>
            <section className="w-full py-10 px-20 md:px-20">
                <div className="max-w-8xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                    {/* LEFT CONTENT */}
                    <div>
                        <div className="w-full py-4 text-start">

                            {/* Badge */}
                            <motion.span
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.6 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1"
                            >
                                Data to Understanding
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
                       Trun Your Health Data   <br></br>  Into Clear Insights
                            </motion.h1>

                        </div>

                        <p className="text-gray-400  w-170 text-lg md:text-base lg:text-2xl font-light   mb-6">
                            Most platforms simply store your medical data. HeartView Health goes
                            further  transforming complex reports into easy to understand visual
                            insights that actually help you take action.
                        </p>

                        {/* POINTS */}
                        <div className="space-y-4">
                            {[
                                "Trends over time",
                                "Changes in key markers",
                                "Patterns that matter",
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 p-3 w-85 rounded-lg border border-[#3D7773]/30 bg-[#0f172a]/40 backdrop-blur-md"
                                >
                                    <div className="w-2 h-2 bg-[#3D7773] rounded-full"></div>
                                    <p className="text-gray-300 text-xl font-medium">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT VISUAL */}
                    <div className="relative">
                        <Image src="/Untitled design (8).png" alt="Health Metrics" className="rounded-lg"  width={980} height={990} />
                    </div>

                </div>
            </section>
        </div>
    )
}

export default ReportUnderstand
