"use client";

import Link from "next/link";
import {
    FiUserPlus,
    FiUsers,
    FiUploadCloud,
    FiFileText,
    FiSend,
    FiClock,
} from "react-icons/fi";

const quickActions = [
    {
        title: "Add Patient",
        href: "/lab-staff/patients/add-patient",
        icon: FiUserPlus,
        iconColor: "text-blue-600",
    },
    {
        title: "Patient List",
        href: "/lab-staff/patients",
        icon: FiUsers,
        iconColor: "text-indigo-600",
    },
    
    {
        title: "Uploaded Reports",
        href: "/lab-staff/staff_upload_report",
        icon: FiFileText,
        iconColor: "text-violet-600",
    },
 
    {
        title: "Link History",
        href: "/lab-staff/report_link",
        icon: FiClock,
        iconColor: "text-purple-600",
    },
];

export default function QuickActions() {
    return (
        <section className="rounded-3xl border border-slate-200 bg-[#f7f7f7] p-6 shadow-sm">
            <div className="mb-5">
                <h4 className="text-lg md:text-xl xl:text-2xl text-black">
                    Quick Actions
                </h4>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                {quickActions.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="
                group
                flex
                flex-col
                items-center
                justify-center
                gap-3
                rounded-2xl
                border
                border-slate-200
                bg-white
                py-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-200
                hover:bg-[#2f5ba5]/10
                hover:shadow-md
              "
                        >
                            <div
                                className="
                  flex
                  items-center
                  justify-center
                  rounded-xl
                  transition-colors
                  duration-300
                  group-hover:bg-white
                "
                            >
                                <Icon className={`text-4xl ${item.iconColor}`} />
                            </div>

                            <span
                                className="
                  text-center
                  
                  font-medium
                  text-slate-700
                  transition-colors
                  duration-300
                  group-hover:text-slate-900
                "
                            >
                                {item.title}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}