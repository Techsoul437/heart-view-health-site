"use client";

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeams, getImageUrl, TeamMember } from "@/redux/Api";
import type { AppDispatch, RootState } from "@/redux/store";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";

const TeamCard = ({ member }: { member: TeamMember }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="group flex flex-col w-full max-w-125 bg-white rounded-3xl border border-black/10 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* IMAGE */}
      <div className="relative w-full aspect-[5/4] bg-slate-900 border-b border-black/5 overflow-hidden">
        {member.image ? (
          <img
            src={getImageUrl(member.image)}
            alt={member.fullName}
            className="absolute inset-0 w-full h-full object-cover object-top transform group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl text-slate-300 font-medium">
              {member.fullName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col p-6 sm:p-8 pt-6">
        <div className="flex flex-col mb-4 border-b border-slate-100 pb-4 gap-1">
          <h3 className="text-2xl font-bold text-slate-900 leading-tight">
            {member.fullName}
          </h3>
          <p className="text-base font-medium text-[#2f5ba5] uppercase tracking-wide">
            {member.designation}
          </p>
        </div>
        
        {member.description && (
          <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className="cursor-pointer group/desc relative"
          >
            <p className={`text-[18px] font-light text-[#64748B] leading-[29px] whitespace-pre-wrap transition-all duration-300 ${!isExpanded ? 'line-clamp-3' : ''}`}>
              {member.description}
            </p>
            <span className="text-sm font-medium text-[#2f5ba5] mt-2 inline-block group-hover/desc:underline">
              {isExpanded ? "Show less" : "Read more"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const TeamSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { teams, loading } = useSelector((state: RootState) => state.team);

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const activeTeams = useMemo(() => {
    return [...teams].filter((member) => member.status === "Active").reverse();
  }, [teams]);

  return (
    <section className="w-full max-w-8xl mx-auto mt-10 px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mb-20">
      <div className="max-w-8xl mx-auto w-full text-center">
        
        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-10">
          <Headerbadge tag="OUR TEAM" text="The Team Behind HeartView Health" />
          <div className="mt-2 h-1 w-20 bg-gradient-to-r from-transparent via-[#2f5ba5]/70 to-transparent"></div>
          <p className="text-base sm:text-lg font-light leading-relaxed text-[#64748B] text-center max-w-3xl mx-auto mt-4">
           HeartView Health is built by a small team with a background in healthcare and health data,
driven by a shared frustration with how disconnected and confusing everyday health
tracking has become. Our content is researched and written by the HeartView Health team,
drawing on established clinical guidelines from organizations including the American Heart
Association, the American College of Cardiology, and the American Diabetes Association
          </p>
           <p className="text-base sm:text-lg font-light leading-relaxed text-[#64748B] text-center max-w-3xl mx-auto mt-4">
       We’re actively growing our team, including plans to bring on medical advisors to review
clinical content as HeartView Health expands. If you’re a healthcare professional interested
in contributing to or reviewing our content, we’d love to hear from you at
info@heartviewhealth.com
          </p>
        </div>

        {/* TEAM GRID */}
        {loading && activeTeams.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#2f5ba5]" />
          </div>
        ) : activeTeams.length === 0 ? (
          <div className="text-center text-slate-500 py-10 text-lg">
            No team members available at the moment.
          </div>
        ) : (
          <div className="mt-8 flex flex-wrap justify-center gap-10 md:gap-16 w-full text-left">
            {activeTeams.map((member, index) => (
              <TeamCard key={member._id || index} member={member} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
