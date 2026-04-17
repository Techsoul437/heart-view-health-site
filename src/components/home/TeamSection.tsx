"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import Image from "next/image";
import BorderButton from "@/Ui/buttons/BorderButton";

const team = [

  {
    name: "Dishant Chanchad",
    role: "Advisory Board",
    image: "/Team2.png",
    color: "#45657D",
  },
  {
    name: "Menno Henselmens",
    role: "Advisory Board · Scientist",
    image: "/team/menno.jpg",
    color: "#B4B0B0",
  },
  {
    name: "Dr. Sarah Okonkwo",
    role: "Advisory Board",
    image: "", // 👉 no image → fallback color
    color: "#181E2B",
  },
  {
    name: "Priya Mehta",
    role: "Head of Research",
    image: "/team/priya.jpg",
    color: "#3D7773",
  },

];

const STEP = 288;

export default function TeamSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();

  const isDragging = useRef(false);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartTime = useRef<number | null>(null);
  const [offset, setOffset] = useState(0);

  const maxOffset = () => {
    if (!trackRef.current) return 0;
    const containerWidth = trackRef.current.parentElement?.clientWidth ?? 0;
    const totalWidth = team.length * STEP;
    return Math.max(0, totalWidth - containerWidth);
  };

  const clamp = (val: number) =>
    Math.min(0, Math.max(-maxOffset(), val));

  const handleDragMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const newOffset = clamp(e.clientX - dragStartX.current);
    setOffset(newOffset);
    x.set(newOffset);
  };

  const handleDragStart = (e: React.PointerEvent) => {
    isDragging.current = true;
    setDragging(true);
    dragStartX.current = e.clientX - offset;
    dragStartTime.current = e.timeStamp;
    trackRef.current?.setPointerCapture(e.pointerId);
    controls.stop();
  };

  const handleDragEnd = (e: React.PointerEvent) => {
    if (!isDragging.current) return;

    isDragging.current = false;
    setDragging(false);

    const dt =
      dragStartTime.current != null
        ? (e.timeStamp - dragStartTime.current) / 1000
        : 0.3;

    const dx = e.clientX - (dragStartX.current + offset);
    const velocity = dx / dt;

    const momentum = clamp(offset + velocity * 0.15);

    setOffset(momentum);
    controls.start({
      x: momentum,
      transition: { type: "spring", damping: 30, stiffness: 200 },
    });
  };

  const scrollBy = (dir: 1 | -1) => {
    const newOffset = clamp(offset + dir * -STEP * 2);
    setOffset(newOffset);
    controls.start({
      x: newOffset,
      transition: { type: "spring", damping: 30, stiffness: 180 },
    });
  };

  return (
    <section className="w-full mt-20 py-20 overflow-hidden font-sans ">
      <div className="max-w-8xl mx-auto px-20 md:px-20 grid md:grid-cols-2 gap-10 items-start">

        {/* LEFT */}
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
                <motion.span
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-block text-xs font-semibold tracking-widest text-[#3D7773] uppercase border-2 mt-3 border-white/30 rounded-full px-4 py-1"
        >
          Team
        </motion.span>
          <h2 className=" text-2xl md:text-3xl lg:text-4xl font-medium mt-4  text-white leading-tight mb-6">
           Meet the Experts Behind <br /> Our Vision
          </h2>

          <p className="text-white/60 text-lg md:text-base lg:text-2xl font-light w-2xl mb-8">
    Dedicated professionals combining knowledge, experience, and innovation to make healthcare better for everyone.
          </p>

              <BorderButton text="Learn More" href="/learn-more" />
         
        </motion.div>

        {/* RIGHT */}
        <div className="relative overflow-hidden">

          <motion.div
            ref={trackRef}
            animate={controls}
            style={{ x }}
            className={`flex gap-6 ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
            onPointerDown={handleDragStart}
            onPointerMove={handleDragMove}
            onPointerUp={handleDragEnd}
            onPointerCancel={handleDragEnd}
          >
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="w-64 shrink-0"
              >
                {/* IMAGE + COLOR FALLBACK */}
                <div
                  className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden"
                  style={{ backgroundColor: member.color }}
                >
                  {member.image && (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  )}

                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* INFO */}
                <div className="mt-3 flex ml-3 justify-between items-start">
                  <div>
                    <p className="text-white text-lg font-semibold">
                      {member.name}
                    </p>
                    <p className="text-white/50 text-md mt-1">  
                      {member.role}
                    </p>
                  </div>

                  {/* <div className="w-7 h-7 bg-white/10 rounded-md flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div> */}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* BUTTONS */}
          {team.length > 3 && (
  <div className="flex justify-end gap-3 mt-8">
    <button
      onClick={() => scrollBy(-1)}
      className="w-15 h-15 rounded-full border font-bold border-white/20 bg-white/10 text-white"
    >
      ←
    </button>
    <button
      onClick={() => scrollBy(1)}
      className="w-15 h-15 rounded-full border font-bold border-white/20 bg-white/10 text-white"
    >
      →
    </button>
  </div>
)}
        </div>
      </div>
    </section>
  );
}