"use client";

import {
    motion,
    useInView,
    useMotionValue,
    useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function AppDownloadSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });


    const playStoreLink =
        "https://play.google.com/store/apps/details?id=com";

    return (
        <section ref={ref} className="relative overflow-hidden py-28 px-6">
            <div className="mx-auto max-w-8xl px-20">
                <div className="flex flex-col lg:flex-row items-center ">

                    {/* LEFT IMAGE */}
                    <div className="relative w-full max-w-4xl mx-auto flex justify-center">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-82 w-82 rounded-full bg-cyan-400/20 blur-[120px] animate-pulse" />
                        </div>

                        <Image
                            src="/Smartphone.png"
                            alt="phone"
                            width={550}
                            height={640}
                            priority
                            className="drop-shadow-[0_0_40px_rgba(0,255,200,0.25)]"
                        />

                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-24 w-56 rounded-full bg-cyan-300/20 blur-[80px]" />
                    </div>

                    {/* RIGHT CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2  text-center lg:text-left"
                    >
                        <span className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1 mb-6">
                            Mobile Experience
                        </span>

                        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6">
                            Prefer Mobile?  Get the App
                        </h1>

                        {/* 🔷 UPDATED TEXT */}
                        <p className="text-white/60 text-lg md:text-base lg:text-2xl font-light w-3xl mb-10">
                            Stay in control of your health anytime, anywhere.
                            Monitor vitals, track progress, and access everything
                            you need  right from your phone.
                        </p>

                        {/* BUTTONS */}
                        <div className="flex flex-col sm:flex-row items-center lg:items-start gap-8">

                            {/* BUTTON GROUP */}
                            <motion.div
                                custom={2}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.04, y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-2 text-left backdrop-blur-sm transition-colors hover:border-teal-500/40 hover:bg-white/10"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white/80">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                    </svg>
                                    <span className="flex flex-col">
                                        <span className="text-xs text-white/40">Download on the</span>
                                        <span className="text-sm font-semibold text-white">App Store</span>
                                    </span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.04, y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-2 text-left backdrop-blur-sm transition-colors hover:border-teal-500/40 hover:bg-white/10"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white/80">
                                        <path d="M3.18 23.76c.3.17.64.22.99.14l12.5-7.22-2.8-2.8-10.69 9.88zM.5 1.4C.19 1.72 0 2.24 0 2.93v18.14c0 .69.19 1.21.51 1.53l.08.07 10.16-10.16v-.24L.58 1.33.5 1.4zM20.12 10.1l-2.74-1.58-3.1 3.1 3.1 3.1 2.76-1.59c.79-.45.79-1.18-.02-1.63zM3.18.24l10.69 9.88 2.8-2.8L4.17.1C3.82.02 3.48.07 3.18.24z" />
                                    </svg>
                                    <span className="flex flex-col">
                                        <span className="text-xs text-white/40">Get it on</span>
                                        <span className="text-sm font-semibold text-white">Google Play</span>
                                    </span>
                                </motion.button>
                            </motion.div>

                            {/* QR */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.3 }}
                                className="flex flex-col items-center"
                            >
                                <div className="relative p-3 rounded-2xl ml-10 border border-white/10 bg-white/5 backdrop-blur-xl">

                                    <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 blur-xl" />

                                    <Image
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${playStoreLink}`}
                                        alt="qr"
                                        width={120}
                                        height={120}
                                        className="relative z-10 rounded-md"
                                    />
                                </div>

                                <span className="text-white/40 ml-10  text-sm mt-3">
                                    Scan to install instantly
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}