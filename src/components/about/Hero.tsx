"use client";
import FillButton from "@/Ui/buttons/FillButton";
import Link from "next/link";
import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <section className="w-full box-border">
      <div className="w-full bg-[#0B0B0B] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 py-14 ">

        {/* LEFT - Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-20">
        <div className="flex items-end sm:items-center ">

          <div className="sm:max-w-5xl max-w-4xl">

            <h1 className="heading-font text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-tight tracking-tight mb-3">
              A Smarter Way to
              <br />
              Understand Your Heart
            </h1>

            <p className="text-base sm:text-lg text-white leading-relaxed font-light lg:max-w-md">
              Understand Your Heart Health Before Problems Start
              Track, analyze, and improve your health with simple insights.
            </p>

            <div className="flex flex-wrap gap-4 py-5 items-center">
              <Link
                href="/contact"
                className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white text-xs sm:text-xs md:text-xs xl:text-sm font-semibold px-6 py-3 rounded-full border border-white/40 backdrop-blur-sm transition-all duration-200"
              >
                Join Early Access
              </Link>
            </div>

          </div>
        </div>

        {/* RIGHT - Image */}
        {/* <div className="relative w-full h-full min-h-[20rem]">

          <Image
            src="/.png"
            alt="Hero Background"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/50 to-transparent"></div>

        </div> */}
</div>
      </div>
    </section>
  );
}

export default Hero;