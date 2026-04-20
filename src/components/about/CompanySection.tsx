"use client";

import { motion } from "framer-motion";

export default function CompanySection() {
  return (
    <section className="relative w-full overflow-hidden pt-10">
      {/* Background Glow */}
      <div className="absolute " />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-[#3D7773]/10 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20">

        {/* Heading */}
        <div className="w-full py-4 text-center">

          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1"
          >
            Our Company
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1], // premium smooth easing
            }}
            className="mt-4  text-2xl md:text-3xl lg:text-4xl font-medium leading-tight text-white "
          >
            Built with Trust & Transparency
          </motion.h1>

        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-lg border border-white/10 bg-white/5 backdrop-blur-xl p-10 mt-10 md:p-14"
        >
          {/* Glow Border Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#3D7773]/20 via-transparent to-[#45657D]/20 opacity-40 blur-xl" />

          <div className="relative z-10 flex flex-col gap-4 text-center">

            {/* Company Name */}
            <h2 className="text-white  text-2xl md:text-3xl lg:text-4xl font-medium leading-tight ">
              HeartView Health Technologies Private Limited
            </h2>

            {/* Divider */}
            <div className="w-16 h-[0.15rem]  mx-auto bg-gradient-to-r from-[#3D7773] to-[#45657D] rounded-full" />

            {/* Description */}
            <p className="text-white/70 mt-3 text-base sm:text-lg  leading-relaxed  font-light max-w-2xl lg:max-w-3xl mx-auto">
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
                  className="w-65 text-center px-5 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-base sm:text-lg  leading-relaxed font-light backdrop-blur-md"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trust Signals */}
        <div className="text-center mt-8">
          <p className="text-white/80 text-lg font-medium mb-4">
            Trusted by 5,000+ users across India
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <span>CIN: U72900GJ2024PTC123456</span>
            <span>GST: 24AAACH1234H1Z5</span>
            <span>Founded by Dr. Rajesh Kumar & Team</span>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {[
            { quote: "HeartView made managing my health so much easier. Highly recommended!", author: "Priya S., Mumbai" },
            { quote: "Finally, all my health data in one place. Great app!", author: "Amit K., Delhi" },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-6">
              <p className="text-gray-300 italic mb-4">{item.quote}</p>
              <p className="text-[#3D7773] font-medium">- {item.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}