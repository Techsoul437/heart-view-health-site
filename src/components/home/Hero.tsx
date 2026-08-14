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
      <div className="max-w-8xl bg-[#f7f7f7] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 p-10 ">

        <div className="flex flex-col items-center justify-center mt-20 text-center">

          {/* LEFT SIDE - CONTENT */}
          <div className="text-black flex flex-col items-center w-full max-w-3xl mx-auto">

            <Headerbadge 
              tag="Health Management" 
              text="Manage Your Health Information in One Place" 
            />

            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed font-light lg:max-w-xl mt-4">
              Store laboratory reports, track health measurements, review health history, and understand your health information through one organized platform. 
            </p>
            {/* <p className="text-base sm:text-lg text-[#64748B] mt-4  leading-relaxed font-light lg:max-w-xl">
              Keep your important health information organized and easier to understand from one secure platform
            </p> */}
            {/* Buttons */}
            <div className="flex flex-wrap gap-4 py-6 items-center justify-center">
              <FillButton text="Explore Features" href="/features" />
              <BorderButton text="Join Early Access" href="/contact" bgColor="bg-[#F7F7F7]"></BorderButton>

              <div onClick={() => setOpen(true)}>
                {/* <BorderButton text="Join Early Access" href="" bgColor="bg-[#F7F7F7]"></BorderButton> */}

              </div>
            </div>
            <ContactModal isOpen={open} onClose={() => setOpen(false)} />
          
          </div>

          {/* RIGHT SIDE - IMAGE */}
          {/* <div className="relative w-full h-80 sm:h-96 lg:h-120 ">


            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover rounded-2xl"
              >
                <source src="/1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

         
            </div>

          </div> */}

        </div>

      </div>
    </section>
  );
}

export default Hero;