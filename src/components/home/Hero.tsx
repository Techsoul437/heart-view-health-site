"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import FillButton from "@/Ui/buttons/FillButton";
import BorderButton from "@/Ui/buttons/BorderButton";

function Hero() {
    return (
        <section className="w-full  box-border">
            <div className="relative w-full h-190 overflow-hidden ">

                {/* Background Image */}
                <Image
                    src="/"
                    alt="Hero Background"
                    fill
                    priority
                    className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent"></div>

                {/* Content */}
                <div className="absolute bottom-0 px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 left-0 z-10 pb-12 pl-6 sm:pl-10 lg:pl-16 sm:max-w-5xl max-w-3xl">

                    {/* Heading */}
                    <h1 className="heading-font   text-2xl md:text-3xl lg:text-4xl font-medium md:max-w-md text-white leading-tight tracking-tight mb-3">
                        Smarter Heart Awareness, Built for Everyday Life
                    </h1>

                    {/* Description */}
                    <p className="text-base sm:text-lg text-white leading-relaxed md:max-w-md lg:max-w-md">
                 A simple way to understand your health and stay consistent
                    </p>

                    {/* Buttons */}
                   <div className="flex flex-wrap gap-4 py-5 items-center">
            <FillButton text="Join Early Access" href="/contact" />

            {/* <Link
              href="#learnmore"
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white     text-xs sm:text-xs md:text-xs xl:text-sm font-semibold px-6 py-3 rounded-full border border-white/40 backdrop-blur-sm transition-all duration-200"
            >
             Learn More
            </Link> */}
            <BorderButton text="Learn More" href="#learnmore"></BorderButton>
          </div>

                    {/* Trust Line */}
                    <p className="flex items-center gap-2 text-white/60 mt-3 text-[11px] sm:text-md text-md lg:text-lg font-light">

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