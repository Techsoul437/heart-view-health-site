"use client";
import FillButton from "@/Ui/buttons/FillButton";
import Link from "next/link";
import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <section className="w-full  box-border">
      <div className="relative w-full  h-180  overflow-hidden ">

        {/* Background Image */}
        <Image
          src="/.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/70 to-transparent"></div>

        {/* Content */}
        <div className="absolute bottom-0 px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 left-0 z-10 pb-12 pl-6 sm:pl-10 lg:pl-16 sm:max-w-5xl max-w-3xl">

          <h1 className="heading-font  text-3xl md:text-4xl lg:text-5xl font-medium  text-white leading-tight tracking-tight mb-3">
            A Smarter Way to
            <br />
            Understand Your Heart
          </h1>

          <p className="text-base sm:text-lg text-white leading-relaxed lg:max-w-md">
            We are a digital health platform designed to help people move beyond just tracking their health to actually understanding it.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 py-5 items-center">
            <FillButton text="Download App" href="#download" />

            <Link
              href="/contact"
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white     text-xs sm:text-xs md:text-xs xl:text-sm font-semibold px-6 py-3 rounded-full border border-white/40 backdrop-blur-sm transition-all duration-200"
            >
              Join Early Access
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;