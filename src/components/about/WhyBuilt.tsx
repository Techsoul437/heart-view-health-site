"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function WhyBuilt() {
    return (
        <section className="w-full px-20 sm:px-20 lg:px-20 py-10  overflow-hidden">
            <div className="max-w-8xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                {/* LEFT CONTENT */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <div className="w-full py-4 text-start">

                        {/* Badge */}
                        <motion.span
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1"
                        >
                            Why We Built
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
                            Why We Built <br></br>HeartView Health
                        </motion.h1>

                    </div>
                    <p className="text-lg md:text-base lg:text-2xl max-w-3xl font-light text-white/40  mb-6 ">
                      Most tools focus on just one thing — tracking, reminders, or reports.
We wanted something more connected and meaningful.
<br></br>So we built a platform that brings everything together:
                    </p>

                    <p className="text-white mb-6 text-xl font-medium">
                        A platform that connects everything:
                    </p>

                    {/* POINTS */}
                    <div className="grid grid-cols-2 w-180 gap-3 mb-6">
                        {["Monitoring", "Insights", "Organization", "Action"].map(
                            (item, i) => (
                                <div
                                    key={i}
                                    className="px-4 py-3 rounded-lg border border-[#1F2A33] bg-[#0E1621] text-lg text-gray-300 hover:border-[#3D7773] hover:text-white transition duration-300"
                                >
                                    {item}
                                </div>
                            )
                        )}
                    </div>

                    <p className="text-gray-400">
                        So users don’t just collect data —{" "}
                        <span className="text-white font-medium">
                            they understand and use it.
                        </span>
                    </p>
                </motion.div>

                {/* RIGHT IMAGE */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Glow */}
                    <div className="absolute inset-0 bg-[#3D7773] blur-3xl opacity-20 rounded-full" />

                    {/* Image */}
                    <motion.div
                        transition={{ duration: 0.4 }}
                        className="relative"
                    >
                        <Image
                            src="/why-built1.png"
                            alt="Why HeartView"
                            width={780}
                            height={500}
                            className="rounded-xl border border-[#1F2A33] shadow-xl"
                        />
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}

export default WhyBuilt;