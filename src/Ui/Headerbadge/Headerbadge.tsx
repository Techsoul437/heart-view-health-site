"use client";

import React from "react";
import { motion } from "framer-motion";

type HeaderbadgeProps = {
  tag?: string;
  text?: string;

};

function Headerbadge({
  tag = "",
  text = "",
}: HeaderbadgeProps) {
  return (
    <div className="text-center py-4">
      <motion.span
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
        className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 border-white/30 rounded-full px-4 py-1"
      >
        {tag}
      </motion.span>

      <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white mt-4">
        {text}
      </h1>
    </div>
  );
}

export default Headerbadge;