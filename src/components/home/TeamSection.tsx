"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getTeams, getImageUrl } from "@/redux/Api";

export default function TeamSection() {
  const dispatch = useDispatch<AppDispatch>();

  const { teams, loading } = useSelector((state: RootState) => state.team);

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  // Filter to show only active members
  const activeTeams = teams?.filter((member) => member.status === "Active") || [];

  return (
    <section className="w-full bg-slate-50 py-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        
        {/* Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-medium text-black mb-4"
        >
          Our Team
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#64748B] text-lg md:text-xl font-light max-w-2xl mx-auto mb-16"
        >
          We are a group of innovative, experienced, and proficient teams. You will love to collaborate with us.
        </motion.p>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          </div>
        ) : activeTeams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {activeTeams.map((member, i) => (
              <motion.div
                key={member._id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] overflow-hidden transition-all hover:-translate-y-2 hover:shadow-[0px_8px_30px_rgba(0,0,0,0.1)]"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[5/4] bg-slate-900 overflow-hidden">
                  {member.image ? (
                    <img
                      src={getImageUrl(member.image)}
                      alt={member.fullName}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 text-left bg-white relative z-10 border-t-4 border-transparent group-hover:border-blue-500 transition-colors">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {member.fullName}
                  </h3>
                  <p className="text-sm font-medium text-slate-500">
                    {member.designation}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-slate-500 text-lg">
            No active team members found.
          </div>
        )}
      </div>
    </section>
  );
}