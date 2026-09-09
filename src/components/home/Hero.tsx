"use client";

import React, { useState } from "react";
import Image from "next/image";
import FillButton from "@/Ui/buttons/FillButton";
import BorderButton from "@/Ui/buttons/BorderButton";
import ContactModal from "@/Ui/contactModel/ContactModal";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";

function Hero() {
  const [open, setOpen] = useState(false);
  return (
    <section className="w-full">
      <div className="max-w-8xl bg-[#f7f7f7] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 ">

        <div className="flex flex-col lg:flex-row items-center justify-between md:mt-20 text-center lg:text-left gap-12 lg:gap-16">

          {/* LEFT SIDE - CONTENT */}
          <div className="text-black flex flex-col items-start lg:items-start w-full lg:w-1/2 max-w-3xl mx-auto">

            <Headerbadge
              tag="Health Management"
              text="Manage Your Health Information with Clarity and Confidence"
              className="lg:text-left"
            />

            <p className="text-base sm:text-lg  text-[#64748B] leading-relaxed font-light lg:max-w-xl mt-4">
             Keep supported laboratory reports and health measurements organized in one place. Review your health information over time and learn what common measurements and laboratory tests mean through clear, easy-to-understand educational resources. 
            </p>
            {/* <p className="text-base sm:text-lg text-[#64748B] mt-4  leading-relaxed font-light lg:max-w-xl">
              Keep your important health information organized and easier to understand from one secure platform
            </p> */}
            {/* Buttons */}
            <div className="flex flex-wrap gap-4 py-6 items-center justify-center lg:justify-start">
              <FillButton text="Explore Features" href="/features" />
              <BorderButton text="Join Early Access" href="/contact" bgColor="bg-[#F7F7F7]"></BorderButton>

              <div onClick={() => setOpen(true)}>
                {/* <BorderButton text="Join Early Access" href="" bgColor="bg-[#F7F7F7]"></BorderButton> */}

              </div>
            </div>

            {/* Trust Strip */}
            {/* <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-base sm:text-lg text-[#64748B] font-light w-full">
              <span className="flex items-center gap-2">
                <span className="font-bold text-black">✓</span> Organize health records
              </span>
              <span className="flex items-center gap-2">
                <span className="font-bold text-black">✓</span> Review your history
              </span>
              <span className="flex items-center gap-2">
                <span className="font-bold text-black">✓</span> Learn about common health information
              </span>
            </div> */}

            <ContactModal isOpen={open} onClose={() => setOpen(false)} />

          </div>

          {/* RIGHT SIDE - IMAGE */}
          <div className="relative w-full lg:w-1/2 h-80 sm:h-96 md:h-130 mt-2 lg:h-110 2xl:h-180">


            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <Image
                src="/banner.png"
                alt="Healthcare"
                fill
                priority
                className=" rounded-2xl"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;