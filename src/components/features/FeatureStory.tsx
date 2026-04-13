"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FeatureStorySection() {
    return (
        <section className="w-full py-24 px-6 md:px-16">

            {/* 🔥 MAIN HEADING */}
            <div className="max-w-6xl mx-auto text-center mb-16">

                <motion.span
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="inline-block text-xs font-medium tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1"
                >
                    Experience
                </motion.span>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mt-3 text-white leading-tight">
                    Smart Health Tracking Made Simple
                </h2>

                <p className="text-white/60 mt-4 text-lg font-light">
                    Monitor your heart rate, blood pressure, and sugar levels in one place — 
                    get guidance, reminders, and insights that help you take better control of your health every day.
                </p>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-8xl px-1 mx-auto">

                {/* LEFT BIG CARD */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative h-128 rounded-3xl overflow-hidden group"
                >
                    <Image
                        src="/Healt-TimeLines.jpeg"
                        alt="Health Dashboard"
                        fill
                        className="object-cover group-hover:scale-105 transition duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6 text-white">
                        <h3 className="text-xl font-medium">
                            Your Complete Health Timeline
                        </h3>
                        <p className="text-white/80 mt-2 text-lg font-light">
                            Track heart rate, blood pressure, and sugar levels in one unified timeline to clearly understand your health trends over time.
                        </p>
                    </div>
                </motion.div>

                {/* MIDDLE COLUMN */}
                <div className="flex flex-col gap-6">

                    {/* TOP CARD */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="relative h-60 rounded-3xl overflow-hidden group"
                    >
                        <Image
                            src="/health-guid.jpeg"
                            alt="Health Guidance"
                            fill
                            className="object-cover group-hover:scale-105 transition duration-700"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent" />

                        <div className="absolute bottom-5 left-5 right-5 text-white">
                            <h3 className="text-lg font-medium">
                                Smart Health Guidance
                            </h3>
                            <p className="text-white/80 text-lg font-light mt-1">
                                Get intelligent suggestions based on your health data to improve your daily lifestyle and heart health.
                            </p>
                        </div>
                    </motion.div>

                    {/* BOTTOM CARD */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="relative h-62 rounded-3xl overflow-hidden group"
                    >
                        <Image
                            src="/medicin.jpg"
                            alt="Medication Reminder"
                            fill
                            className="object-cover group-hover:scale-105 transition duration-700"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent" />

                        <div className="absolute bottom-5 left-5 right-5 text-white">
                            <h3 className="text-lg font-medium">
                                Medication & Routine Reminders
                            </h3>
                            <p className="text-white/80 text-lg font-light mt-1">
                                Stay on track with timely reminders for medicines, checkups, and daily health routines.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT TALL CARD */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="relative h-128 rounded-3xl overflow-hidden group"
                >
                    <Image
                        src="/4.png"
                        alt="Health Reports"
                        fill
                        className="object-cover group-hover:scale-105 transition duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6 text-white">
                        <h3 className="text-xl font-medium">
                            All Your Reports in One Place
                        </h3>
                        <p className="text-white/80 mt-2 text-lg font-light">
                            Store and access lab reports, prescriptions, and medical history anytime — secure, organized, and always available.
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}