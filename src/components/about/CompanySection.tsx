"use client";

import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import { motion } from "framer-motion";

export default function CompanySection() {
  return (
    <section className="relative w-full overflow-hidden  px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 ">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 h-[28rem] w-[28rem] rounded-full bg-[#2f5ba5]/70 blur-[10px]" />

        <div className="absolute bottom-0 right-10 h-[18rem] w-[18rem] rounded-full bg-[#7CC4FF]/10 blur-[80px]" />
      </div>
      <div className="relative max-w-8xl mx-auto mt-8">

        {/* Heading */}

        <Headerbadge tag="Our Company" text="Built with Trust & Transparency" />

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-lg border border-black/10 bg-[#EDEDEE] backdrop-blur-xl p-10 mt-10 md:p-14"
        >
          {/* Glow Border Effect */}
          {/* <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-[#2f5ba5]/40 via-transparent to-[#4a7bc9]/30 opacity-40 blur-xl" /> */}

          <div className="relative z-10 flex flex-col gap-4 text-center">

            {/* Company Name */}
            <h2 className="text-black  text-2xl md:text-3xl lg:text-4xl font-medium leading-tight ">
              HeartView Health Technologies Private Limited
            </h2>

            {/* Divider */}
            <div className="w-16 h-[0.15rem]  mx-auto bg-gradient-to-r from-[#2f5ba5] to-[#45657D]/30 rounded-full" />

            {/* Description */}
            <p className="text-[#64748B] mt-3 text-base sm:text-lg  leading-relaxed  font-light max-w-2xl lg:max-w-3xl mx-auto">
              Incorporated in India under the Companies Act, 2013, HeartView Health is built with a vision to create a reliable and transparent platform for everyday health management.
            </p>

            {/* Tag Pills */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {[
                "India Registered Company",
                "Healthcare Technology",
                "Trusted Platform",
              ].map((item, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-65 text-center px-5 py-2 rounded-full border border-black/10 bg-black/5 text-[#64748B] text-base sm:text-lg  leading-relaxed font-light backdrop-blur-md"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trust Signals */}
        {/* <div className="text-center mt-10">
          <p className="text-black/80 text-base sm:text-lg  leading-relaxed   font-medium mb-4">
            Trusted by 5,000+ users across India
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-base sm:text-lg  leading-relaxed  font-light text-[#64748B]  ">
            <span>CIN: U72900GJ2024PTC123456</span>
            <span>GST: 24AAACH1234H1Z5</span>
            <span>Founded by Dr. Rajesh Kumar & Team</span>
          </div>
        </div> */}

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {[
            { quote: "HeartView made managing my health so much easier. Highly recommended!", author: "Priya S., Mumbai" },
            { quote: "Finally, all my health data in one place. Great app!", author: "Amit K., Delhi" },
          ].map((item, i) => (
            <div key={i} className="bg-black/5 border border-black/10 rounded-lg p-6">
              <p className="text-gray-300 italic text-base sm:text-lg  leading-relaxed   mb-4">{item.quote}</p>
              <p className="text-[#2f5ba5]  text-base sm:text-lg  leading-relaxed  font-light font-medium">- {item.author}</p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}