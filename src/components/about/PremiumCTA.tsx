"use client";

import FillButton from "@/Ui/buttons/FillButton";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { HeartPulse, ArrowRight } from "lucide-react";

export default function PremiumCTA() {
    return (
        <section className="w-full py-10 px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 pt-10">
            <div className="relative mx-auto max-w-8xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-16 sm:px-10 lg:px-16">

                {/* Background Dots Top Right */}
                <div className="absolute right-10 top-8 grid grid-cols-5 gap-3 opacity-40">
                    {Array.from({ length: 25 }).map((_, i) => (
                        <span
                            key={i}
                            className="h-1 w-1 rounded-full bg-blue-400"
                        />
                    ))}
                </div>

                {/* Background Dots Bottom Left */}
                <div className="absolute bottom-8 left-6 grid grid-cols-5 gap-3 opacity-40">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <span
                            key={i}
                            className="h-1 w-1 rounded-full bg-blue-400"
                        />
                    ))}
                </div>

                {/* Left Circle Design */}
                <div className="absolute left-8 top-1/2 hidden -translate-y-1/2 lg:flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                        <div className="h-56 w-56 rounded-full border border-blue-100" />
                        <div className="absolute h-44 w-44 rounded-full border border-blue-200" />
                        <div className="absolute h-32 w-32 rounded-full border border-blue-200" />
                        <div className="absolute h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl">
                            <HeartPulse className="h-8 w-8 text-white" />
                        </div>
                    </div>
                </div>

                {/* Decorative Line Left */}
                <div className="absolute bottom-0 left-0 hidden h-40 w-1/3 lg:block">
                    <svg
                        viewBox="0 0 500 200"
                        className="h-full w-full"
                        fill="none"
                    >
                        <path
                            d="M0 80 C120 180, 220 20, 500 180"
                            stroke="rgb(191 219 254)"
                            strokeWidth="2"
                        />
                    </svg>
                </div>

                {/* Decorative Line Right */}
                <div className="absolute bottom-0 right-0 hidden h-40 w-1/3 lg:block">
                    <svg
                        viewBox="0 0 500 200"
                        className="h-full w-full"
                        fill="none"
                    >
                        <path
                            d="M0 180 C200 20, 320 180, 500 40"
                            stroke="rgb(191 219 254)"
                            strokeWidth="2"
                        />
                    </svg>
                </div>

                {/* Content */}
                <div className="relative mx-auto max-w-3xl text-center">

                    <Headerbadge tag="Take The Next Step" text="Take Control of Your Health Journey" />

                    <p className="mx-auto   font-light max-w-2xl text-lg leading-relaxed text-[#64748B] ">
                        Join the next generation of health management designed
                        to help you stay informed, proactive, and connected
                        to what matters most.
                    </p>

                    <div className="mt-6">
                        <FillButton text="Join Early Access " href="/contact"></FillButton>
                    </div>
                </div>
            </div>
        </section>
    );
}