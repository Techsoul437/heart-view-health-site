"use client";

import React, { useState } from "react";
import Image from "next/image";
import FillButton from "@/Ui/buttons/FillButton";
import BorderButton from "@/Ui/buttons/BorderButton";
import ContactModal from "@/Ui/contactModel/ContactModal";

function Hero() {
    const [open, setOpen] = useState(false);
  return (
    <section className="w-full">
      <div className="max-w-8xl bg-[#0B0B0B] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 p-10 ">

        <div className="grid lg:grid-cols-2 gap-12 items-center mt-20">

          {/* LEFT SIDE - CONTENT */}
          <div className="text-white">

            <h1 className="heading-font text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-tight tracking-tight mb-3 max-w-md">
              Track, Understand & Improve Your Heart Health Daily
            </h1>

            <p className="text-base sm:text-lg text-white leading-relaxed font-light lg:max-w-md">
              All your health data, insights, and habits in one simple dashboard.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 py-6 items-center">
              <FillButton text="Explore Features" href="/features" />
             <div onClick={() => setOpen(true)}>
                <BorderButton text="Join Early Access"  />
              </div>
            </div>
  <ContactModal isOpen={open} onClose={() => setOpen(false)} />
            {/* Social Proof */}
            {/* <p className="flex items-center gap-2 text-white/80 text-sm font-medium mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-yellow-400"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
              Trusted by 5,000+ users
            </p>

            <p className="flex items-center gap-2 text-white/60 text-sm font-light mt-6">

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
            </p> */}
          </div>

          {/* RIGHT SIDE - IMAGE */}
          <div className="relative w-full h-80 sm:h-96 lg:h-120 ">


            <div className="absolute inset-0 bg-black/20 rounded-2xl">
            <Image alt="hero-image" src="/Media2.png" fill className="object-cover rounded-2xl" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;