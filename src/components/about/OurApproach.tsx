"use client";

import { motion } from "framer-motion";

const data = [
    {
        id: "01",
        title: "Clarity",
        desc:"Health data should be simple, not overwhelming.",
        points: [
            "Understand your heart data without confusion",
            "Visual insights that actually make sense",
            "Know what matters, when it matters",
        ],
    },
    {
        id: "02",
        title: "Consistency",
        desc:"Daily habits  like medication and follow-ups  matter just as much as monitoring",

        points: [
            "Stay on track with daily health routines",
            "Smart reminders for medication & checkups",
            "Build habits that support long-term health",
        ],
    },
    {
        id: "03",
        title: "Continuity",
        desc:"Your health is a journey, not a single moment.",

        points: [
            "Track your health journey over time",
            "Connect past insights with present care",
            "Always stay one step ahead of risks",
        ],
    },
];

export default function ProcessCards() {
    return (
        <section className="py-20 px-20  justify-center">
            <div className="w-full py-4 text-center">

                {/* Badge */}
                <motion.span
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1"
                >
                   Our Approach
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
                    Your Heart Health, Simplified & Connected
                </motion.h1>

            </div>
            <div className="py-20 max-w-8xl mx-auto px-20 flex justify-center">

                <div className="grid md:grid-cols-3 gap-12">

                    {data.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center"
                        >

                            {/* Number Circle */}
                            <div className="w-16 h-19 rounded-full border-2 border-[#B4B0B0] bg-gradient-to-r from-[#45657D] to-[#3D7773] hover:scale-[1.03] transition duration-300 text-white flex items-center justify-center font-medium text-xl z-10">
                                {item.id}
                            </div>

                            {/* Arrow */}
                            <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-400 mt-1" />

                            {/* Card */}
                            <div
                                className="mt-4 w-94 h-full   border-[#3D7773] text-white shadow-sm shadow-fade shadow-[#45657D]"
                              
                            >

                                {/* Header */}
                                <div
                                    className="text-white text-center py-2 text-xl font-medium bg-[#3D7773]"
                                 
                                >
                                    {item.title}
                                </div>
<p className="p-5 text-lg font-light text-gray-300">{item.desc}</p>
                                {/* Content */}
                                <ul className="p-5 h-53 space-y-3 text-lg font-light text-gray-300">
                                    {item.points.map((p, i) => (
                                        <li key={i} className="flex gap-2">
                                            <span className="mt-3 w-1 h-1 bg-gray-600 rounded-full flex-shrink-0" />
                                            <span>{p}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Bottom line */}
                                <div
                                    className="h-1 w-12 rounded-full mx-auto mb-3"
                                    style={{ backgroundColor: "#3D7773" }}
                                />

                            </div>
                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    );
}