"use client";

import Image from "next/image";
import Navbar from "@/Ui/navbar/Navbar";
import Footer from "@/Ui/footer/Footer";
import FillButton from "@/Ui/buttons/FillButton";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-16 sm:px-6 md:px-8">
        {/* Background */}
        <div className="absolute h-64 w-64 rounded-full bg-[#EAF3FF] opacity-80 blur-sm sm:h-80 sm:w-80 md:h-112 md:w-md lg:h-136 lg:w-136" />

        <div className="absolute left-0 top-20 h-32 w-32 rounded-full bg-blue-100/60 blur-3xl sm:left-10 sm:h-44 sm:w-44 md:left-20 md:h-60 md:w-60" />

        <div className="absolute bottom-10 right-0 h-28 w-28 rounded-full bg-cyan-100/60 blur-3xl sm:right-6 sm:h-40 sm:w-40 md:right-16 md:h-52 md:w-52" />

        {/* ECG */}
        <div className="absolute inset-x-0 top-1/2 hidden -translate-y-1/2 md:block">
          <svg
            className="h-14 w-full text-blue-200 lg:h-16"
            viewBox="0 0 1200 80"
            fill="none"
          >
            <path
              d="M0 40 H180 L210 20 L230 60 L260 10 L300 40 H1200"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
          {/* Image */}
          <div className="mb-6 w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl">
            <Image
              src="/error.png"
              alt="404 Illustration"
              width={700}
              height={150}
              priority
              className="h-auto w-full object-contain"
            />
          </div>

          {/* Heading */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mt-10">
            Page Not Found
          </h1>

          {/* Line */}
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] sm:w-20" />

          {/* Description */}
          <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed  text-[#64748B]  md:text-lg">
            The page you&apos;re looking for doesn&apos;t exist
            <br className="hidden sm:block" />
            or may have been moved.
          </p>

          <p className="mt-3 max-w-xl text-base sm:text-lg leading-relaxed text-gray-400 ">
            Don&apos;t worry, we&apos;re here to keep you on track
            <br className="hidden sm:block" />
            towards better heart health.
          </p>

          {/* Button */}
          <div className="mt-8">
            <FillButton text="Go Back Home →" href="/" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}