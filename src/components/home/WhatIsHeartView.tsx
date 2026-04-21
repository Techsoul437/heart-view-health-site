"use client";

import { motion } from "framer-motion";

export default function WhatIsHeartView() {
    return (
        <section className="w-full max-w-8xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 pt-14 text-white">

            {/* MAIN BOX */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative border border-white/10 rounded-3xl p-4 sm:p-6 md:p-10 lg:p-14 overflow-hidden"
            >

                {/* 🔥 GLOW (NOW INSIDE BOX) */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-[#3D7773]/20 blur-3xl rounded-full" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#3D7773]/20 blur-3xl rounded-full" />

                {/* CONTENT */}
                <div className="relative z-10">

                    {/* HEADER */}
                    <div className="w-full py-4 text-center">
                        <motion.span
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border border-white/30 rounded-full px-4 py-1"
                        >
                            What is HeartView
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="mt-4 text-2xl md:text-3xl lg:text-4xl font-medium leading-tight"
                        >
                            Your Personal Heart Health Companion
                        </motion.h1>

                      <p className="mt-4 text-gray-400 text-base sm:text-lg  leading-relaxed  font-light max-w-5xl mx-auto">
    HeartView Health is designed to help you understand your body better through everyday health data. From vital tracking to personalized insights, everything is brought together into one seamless and powerful experience. No confusion. No overload. Just meaningful health awareness that helps you stay informed, aware, and in control of your well-being every day.
</p>
                    </div>

                    {/* DIVIDER */}
                    <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    {/* GRID */}
                    <div className="mt-14 grid md:grid-cols-3 gap-10 text-center">

                        <div>
                            <h2 className="text-xl sm:text-xl lg:text-2xl font-medium">Clear Health View</h2>
                            <p className="mt-3 text-base sm:text-lg  leading-relaxed  font-light text-gray-400 max-w-sm mx-auto">
                                Easily track and understand your daily health metrics in one simplified dashboard.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl sm:text-xl lg:text-2xl font-medium">Smart Insights</h2>
                            <p className="mt-3 text-base sm:text-lg  leading-relaxed  font-light text-gray-400 max-w-sm mx-auto">
                                Get meaningful interpretations of your data without unnecessary complexity.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl sm:text-xl lg:text-2xl font-medium">Built for Daily Life</h2>
                            <p className="mt-3 text-base sm:text-lg  leading-relaxed  font-light text-gray-400 max-w-sm mx-auto">
                                Designed to blend into your routine and support consistent health awareness.
                            </p>
                        </div>

                    </div>

                </div>
            </motion.div>

        </section>
    );
}