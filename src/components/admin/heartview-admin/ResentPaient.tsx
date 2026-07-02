"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserCircle2 } from "lucide-react";

interface PatientItem {
  id: number;
  name: string;
  mobile: string;
  age: string;
  gender: string;
  patientId: string;
  createdAt?: string;
}
const defaultPatients: PatientItem[] = [
  {
    id: 1,
    name: "Rajesh Patel",
    mobile: "9876543210",
    age: "42",
    gender: "Male",
    patientId: "PAT001",
    createdAt: "2026-06-05T10:00:00",
  },
  {
    id: 2,
    name: "Priya Shah",
    mobile: "9876543211",
    age: "35",
    gender: "Female",
    patientId: "PAT002",
    createdAt: "2026-06-05T09:30:00",
  },
  {
    id: 3,
    name: "Amit Mehta",
    mobile: "9876543212",
    age: "51",
    gender: "Male",
    patientId: "PAT003",
    createdAt: "2026-06-05T09:00:00",
  },
  {
    id: 4,
    name: "Neha Joshi",
    mobile: "9876543213",
    age: "28",
    gender: "Female",
    patientId: "PAT004",
    createdAt: "2026-06-05T08:30:00",
  },
  {
    id: 5,
    name: "Karan Desai",
    mobile: "9876543214",
    age: "39",
    gender: "Male",
    patientId: "PAT005",
    createdAt: "2026-06-05T08:00:00",
  },
];
export default function ResentPaient() {
  const [patients, setPatients] = useState<PatientItem[]>([]);

//  useEffect(() => {
//   const storedPatients: PatientItem[] = JSON.parse(
//     localStorage.getItem("patients") || "[]"
//   );

//   const latestPatients = [...storedPatients]
//     .sort((a, b) => {
//       const dateA = a.createdAt
//         ? new Date(a.createdAt).getTime()
//         : 0;

//       const dateB = b.createdAt
//         ? new Date(b.createdAt).getTime()
//         : 0;

//       return dateB - dateA;
//     })
//     .slice(0, 5);

//   // eslint-disable-next-line react-hooks/set-state-in-effect
//   setPatients(latestPatients);
// }, []);
useEffect(() => {
  const storedPatients: PatientItem[] = JSON.parse(
    localStorage.getItem("heartview-admin-patients") || "[]"
  );

  const data =
    storedPatients.length > 0 ? storedPatients : defaultPatients;

  const latestPatients = [...data]
    .sort((a, b) => {
      const dateA = a.createdAt
        ? new Date(a.createdAt).getTime()
        : 0;

      const dateB = b.createdAt
        ? new Date(b.createdAt).getTime()
        : 0;

      return dateB - dateA;
    })
    .slice(0, 5);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  setPatients(latestPatients);
}, []);
  return (
    <div className="rounded-2xl border   min-h-125 border-slate-200  bg-[#f7f7f7] shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/10 p-6">
        <div>
                <h4 className="text-md md:text-lg xl:text-xl text-black">
            Recent Patients
          </h4>

          <p className="mt-1    font-light text-[#64748B]">
            Latest added patients
          </p>
        </div>

        <Link
          href="/heartview-admin/patients"
        >
          <button
          className="
            rounded-xl
            border border-indigo-500/20
             bg-black
            px-3 py-1.5
            text-white
            transition-all
            hover:bg-indigo-500/20
          "
        >
          View All
        </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black/10">
              <th className="px-6 py-4 text-left  font-medium uppercase tracking-wide text-black">
                Patient Name
              </th>

              <th className="px-6 py-4 text-left  font-medium uppercase tracking-wide text-black">
                Mobile
              </th>

              <th className="px-6 py-4 text-left  font-medium uppercase tracking-wide text-black">
                Age
              </th>

              <th className="px-6 py-4 text-left  font-medium uppercase tracking-wide text-black">
                Gender
              </th>
            </tr>
          </thead>

          <tbody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-b border-black/10 transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">

                      <span className="font-medium text-sm text-[#64748B]">
                        {patient.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-[#64748B]">
                    {patient.mobile}
                  </td>

                  <td className="px-6 py-4 text-sm text-[#64748B]">
                    {patient.age}
                  </td>

                  <td className="px-6 py-4 text-sm text-[#64748B]">
                    {patient.gender}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center text-black"
                >
                  No patients available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    
    </div>
  );
}