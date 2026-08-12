"use client";

import React from "react";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";

function Hero() {
  return (
    <section className="w-full mt-10">

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">

        <div className="flex justify-center">
          <Headerbadge
            tag="OUR PURPOSE"
            text="Making Heart Health Clear, Connected & Actionable"
          />
        </div>

        <div className="mt-6 h-1 w-20 mx-auto bg-gradient-to-r from-transparent via-[#2f5ba5]/70 to-transparent"></div>

        <p className=" text-[#64748B]  mt-6 max-w-3xl sm:max-w-3xl text-base sm:text-lg  mx-auto leading-relaxed   lg:max-w-3xl font-light ">

          Most people have access to health data but lack the clarity
          needed to understand it. HeartView Health brings health
          information, insights, reminders, and progress tracking into
          one intelligent platform designed to support everyday
          wellness.
        </p>
      </div>
    </section>
  );
}

export default Hero;