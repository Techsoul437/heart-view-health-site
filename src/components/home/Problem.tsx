import React from 'react'
import { FiAlertCircle, FiDatabase, FiHelpCircle } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
function Problem() {
  return (
    <div>
<section className="w-full max-w-8xl mx-auto px-6 py-24">

      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-white">
          From Confusion to Clarity
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {/* PROBLEM */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-red-500/10 to-transparent  hover:scale-[1.02] transition duration-500">

          {/* IMAGE */}
          <div className="absolute inset-0 opacity-20">
            <img
              src="/problem-health.jpg"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative p-10">
         

            <h3 className="text-2xl font-semibold text-white mt-4 mb-4">
              The Problem
            </h3>

            <p className="text-gray-400 mb-6">
              Managing your health shouldn’t feel this hard.
            </p>

            <div className="space-y-5 text-gray-300">

              <div className="flex gap-4 items-start">
                <FiAlertCircle className="text-red-400 text-xl mt-1" />
                <p>Most people don’t track health regularly</p>
              </div>

              <div className="flex gap-4 items-start">
                <FiDatabase className="text-red-400 text-xl mt-1" />
                <p>Data is confusing and scattered</p>
              </div>

              <div className="flex gap-4 items-start">
                <FiHelpCircle className="text-red-400 text-xl mt-1" />
                <p>Hard to understand what matters</p>
              </div>

            </div>
          </div>
        </div>

        {/* SOLUTION */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-emerald-500/10 to-transparent  hover:scale-[1.02] transition duration-500">

          {/* IMAGE */}
          <div className="absolute inset-0 opacity-20">
            <img
              src="/solution-health.jpg"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative p-10">
        

            <h3 className="text-2xl font-semibold text-white mt-4 mb-4">
              The Solution
            </h3>

            <p className="text-gray-400 mb-6">
              We simplify your health so you can focus on your life.
            </p>

            <div className="space-y-5 text-gray-300">

              <div className="flex gap-4 items-start">
                <FiCheckCircle className="text-emerald-400 text-xl mt-1" />
                <p>Everything in one place</p>
              </div>

              <div className="flex gap-4 items-start">
                <FiCheckCircle className="text-emerald-400 text-xl mt-1" />
                <p>Easy to understand</p>
              </div>

              <div className="flex gap-4 items-start">
                <FiCheckCircle className="text-emerald-400 text-xl mt-1" />
                <p>Clear and simple insights</p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
    </div>
  )
}

export default Problem
