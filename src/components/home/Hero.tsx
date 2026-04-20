"use client";

import React from "react";
import Image from "next/image";
import FillButton from "@/Ui/buttons/FillButton";
import BorderButton from "@/Ui/buttons/BorderButton";

function Hero() {
  return (
    <section className="w-full">
      <div className="max-w-8xl bg-[#0B0B0B] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 py-14 ">

        <div className="grid lg:grid-cols-2 gap-12 items-center mt-20">

          {/* LEFT SIDE - CONTENT */}
          <div className="text-white">

            <h1 className="heading-font text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-tight tracking-tight mb-3 max-w-md">
              Smarter Heart Awareness, Built for Everyday Life
            </h1>

            <p className="text-base sm:text-lg text-white leading-relaxed font-light lg:max-w-md">
              A simple way to understand your health and stay consistent with habits that actually matter in daily life.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 py-6 items-center">
              <FillButton text="Join Early Access" href="/contact" />
              <BorderButton text="Learn More" href="#learnmore" />
            </div>

            {/* Trust Line */}
            <p className="flex items-center gap-2 text-white/60 text-sm font-light">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-white/50"
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

          {/* RIGHT SIDE - IMAGE */}
          {/* <div className="relative w-full h-80 sm:h-96 lg:h-120 ">

            <Image
              src="/hero-image.jpg" 
              alt="Heart Health"
              fill
              className="object-cover rounded-2xl"
              priority
            />

            <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>

          </div> */}

        </div>

      </div>
    </section>
  );
}

export default Hero;