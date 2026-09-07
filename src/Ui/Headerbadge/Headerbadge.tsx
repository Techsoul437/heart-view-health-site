"use client";

import React from "react";
import { motion } from "framer-motion";

type HeaderbadgeProps = {
  tag?: string;
  text?: string;
  align?: "left" | "center" | "right";
  className?: string;
};

function Headerbadge({
  tag = "",
  text = "",
  align = "center",
  className = "",
}: HeaderbadgeProps) {
  const alignmentClass = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";
  
  return (
    <div className={`py-4 ${alignmentClass} ${className}`}>
      <motion.span
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
        className="inline-block text-xs font-semibold tracking-widest text-[#2f5ba5]/70 uppercase border border-gray rounded-full px-4 py-1"
      >
        {tag}
      </motion.span>

      <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black mt-4">
        {text}
      </h1>
    </div>
  );
}

export default Headerbadge;