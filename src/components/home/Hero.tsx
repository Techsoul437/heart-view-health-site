"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import FillButton from "@/Ui/buttons/FillButton";

function Hero() {
    return (
        <section className="w-full px-2 box-border">
            <div className="relative w-full h-190 overflow-hidden rounded-xl">

                {/* Background Image */}
                <Image
                    src="/Media.png"
                    alt="Hero Background"
                    fill
                    priority
                    className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 pb-8 sm:pb-10 md:pb-14 max-w-4xl">

                    {/* Heading */}
                    <h1 className="heading-font text-white font-medium leading-[1.2] tracking-tight 
                        text-[32px] sm:text-[40px] md:text-[52px] lg:text-[64px] mb-3">
                        Start Your Heart <br />
                        Health Journey Today
                    </h1>

                    {/* Description */}
                    <p className="text-white/90 font-normal leading-relaxed 
                        text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] 
                        max-w-md mb-5">
                        Track your health, understand your trends, and stay in control — all in one simple app.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-3 sm:gap-4 items-center">

                        <FillButton text="Download App" href="#download" />

                        <Link
                            href="/contact"
                            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white 
                            text-[13px] sm:text-[14px] md:text-[15px] 
                            font-semibold px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 rounded-full 
                            border border-white/30 backdrop-blur-md transition"
                        >
                            Join Early Access
                        </Link>

                    </div>

                    {/* Trust Line */}
                    <p className="flex items-center gap-2 text-white/60 mt-3 text-[11px] sm:text-[12px] md:text-[13px]">

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-3.5 h-3.5 text-white/50"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                                clipRule="evenodd"
                            />
                        </svg>

                        Private. Secure. Built for everyday use.
                    </p>

                </div>
            </div>
        </section>
    );
}

export default Hero;