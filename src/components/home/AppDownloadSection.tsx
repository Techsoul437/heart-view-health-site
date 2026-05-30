"use client";

import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AppDownloadSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <section
            ref={ref}
            className="relative overflow-hidden pt-10 pb-10 px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20"
        >
            <div className="mx-auto max-w-4xl flex justify-center items-center text-center">

                {/* CONTENT */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="w-full "
                >

                    <Headerbadge tag="Mobile Experience" text=" Prefer Mobile? Get the App" />

                    {/* Paragraph */}
                    <p className="text-[#475569] max-w-2xl mx-auto text-base sm:text-lg mt-5 leading-relaxed font-light mb-8">
                        Stay in control of your health anytime, anywhere.
                        Monitor vitals, track progress, and access everything
                        you need right from your phone.
                    </p>
                    {/* Launching Soon Card */}
                    {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mx-auto mb-8 flex w-full max-w-xl items-center justify-center gap-4 rounded-2xl border border-[#2f5ba5]/10 bg-gradient-to-r from-[#f8fbff] to-[#f3f7ff] py-5 shadow-sm"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2f5ba5]/10">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="h-6 w-6 text-[#2f5ba5]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0018 9.75v-.7V9A6 6 0 006 9v.05c0 .238 0 .476-.002.714A8.967 8.967 0 003.69 15.77a23.847 23.847 0 005.454 1.311m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                />
                            </svg>
                        </div>

                        <div className="text-left">
                            <h3 className="text-base sm:text-lg  leading-relaxed  font-light text-black">
                                Launching Soon
                            </h3>

                            <p className="text-sm text-[#64748b]">
                                Be the first to access HeartView when we launch.
                            </p>
                        </div>
                    </motion.div> */}
                    {/* Buttons */}
                    <div className="flex flex-wrap justify-center gap-4">

                        {/* App Store */}

                        {/* Google Play */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 rounded-xl border border-black/10 bg-black/5 px-4 py-2 backdrop-blur-sm hover:border-[#4a7bc9]/30 hover:bg-black/10 transition"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black/80">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                            <span className="flex flex-col text-left">
                                <span className="text-xs text-[#2f5ba5]/70">Coming Soon</span>
                                <span className="text-sm font-semibold text-black">App Store</span>
                            </span>
                        </motion.button>

                        {/* Google Play */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 rounded-xl border border-black/10 bg-black/5 px-4 py-2 backdrop-blur-sm hover:border-[#4a7bc9]/30 hover:bg-black/10 transition"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black/80">
                                <path d="M3.18 23.76c.3.17.64.22.99.14l12.5-7.22-2.8-2.8-10.69 9.88zM.5 1.4C.19 1.72 0 2.24 0 2.93v18.14c0 .69.19 1.21.51 1.53l.08.07 10.16-10.16v-.24L.58 1.33.5 1.4zM20.12 10.1l-2.74-1.58-3.1 3.1 3.1 3.1 2.76-1.59c.79-.45.79-1.18-.02-1.63zM3.18.24l10.69 9.88 2.8-2.8L4.17.1C3.82.02 3.48.07 3.18.24z" />
                            </svg>
                            <span className="flex flex-col text-left">
                                <span className="text-xs text-[#2f5ba5]/70">Coming Soon</span>

                                <span className="text-sm font-semibold text-black">Google Play</span>
                            </span>
                        </motion.button>

                    </div>
                    {/* Bottom Note */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-6 text-base sm:text-lg flex items-center font-light justify-center gap-2  text-[#64748b]"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.8}
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-1.5 0h12a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5h-12A1.5 1.5 0 014.5 19.5v-7.5A1.5 1.5 0 016 10.5z"
                            />
                        </svg>

                        <p >We’ll notify you as soon as the app is available.</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}