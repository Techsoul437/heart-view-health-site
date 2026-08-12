"use client";

import Headerbadge from "@/Ui/Headerbadge/Headerbadge";
import React from "react";
import {
    FaShieldAlt,
    FaLock,
    FaDatabase,
    FaEye,
} from "react-icons/fa";

function SecurityPrivacy() {
  const securityItems = [
    {
        icon: <FaLock />,
        title: "Secure Infrastructure",
        description:
            "Built on a reliable foundation designed to support secure and dependable access.",
    },
    {
        icon: <FaShieldAlt />,
        title: "Data Privacy",
        description:
            "Health information is handled with privacy-focused practices and controlled access.",
    },
    {
        icon: <FaDatabase />,
        title: "Secure Data Storage",
        description:
            "Health information is stored using appropriate security controls designed to help protect sensitive data.",
    },
    {
        icon: <FaEye />,
        title: "Transparency",
        description:
            "Clear information helps users understand how their data is collected, used, stored, and managed.",
    },
];

    return (
        <section className="w-full max-w-8xl mx-auto mt-10 px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 relative">
            <div className="max-w-8xl mx-auto flex flex-col ">

                <Headerbadge
                    tag="Security & Privacy"
                    text="Protecting Your Health Information"
                />


                <p className="max-w-4xl mx-auto text-center text-[#64748B] text-base sm:text-lg font-light  leading-relaxed">
                   HeartView Health is designed with security and privacy in mind to help protect your health information and provide transparency about how your data is managed.
                </p>
                <div className="h-1 w-20  mt-6 mx-auto bg-gradient-to-r from-transparent via-[#2f5ba5]/70 to-transparent"></div>

                <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {securityItems.map((item, index) => (
                        <div
                            key={index}
                            className="group bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex flex-col items-center text-center gap-4 p-8">
                                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 text-[#2f5ba5] text-xl">
                                    {item.icon}
                                </div>

                                <h2 className="text-xl sm:text-xl lg:text-2xl font-medium  text-black flex items-center justify-center">

                                    {item.title}
                                </h2>

                                <p className="text-base sm:text-lg   xl:max-w-xl text-[#64748B]   leading-relaxed font-light text-center ">

                                    {item.description}
                                </p>

                                <div className="w-10 h-1 rounded-full bg-[#2f5ba5]/70"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SecurityPrivacy;