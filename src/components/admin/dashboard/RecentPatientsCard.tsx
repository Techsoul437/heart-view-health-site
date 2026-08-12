"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserCircle2 } from "lucide-react";
import { getAllUsers, type Patient } from "@/redux/Api";
import type { RootState, AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

interface PatientItem {
  id: number;
  name: string;
  mobile: string;
  age: string;
  gender: string;
  patientId: string;
  createdAt?: string;
}

export default function RecentPatientsCard() {
    const dispatch = useDispatch<AppDispatch>();


const [patients, setPatients] = useState<Patient[]>([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchPatients = async () => {
    try {
      setLoading(true);

      const response = await dispatch(getAllUsers()).unwrap();

      const latestPatients = [...(response.data || [])]
        .sort(
          (a, b) =>
            new Date(b.createdAt ?? "").getTime() -
            new Date(a.createdAt ?? "").getTime()
        )
        .slice(0, 5);

      setPatients(latestPatients);
    } catch (error) {
      console.error("Failed to fetch patients:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchPatients();
}, [dispatch]);

  return (
    <div className="rounded-2xl border   min-h-125 border-slate-200  bg-[#f7f7f7] shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-black/10 p-6">
        <div className="min-w-0 flex-1">
                          <h4 className="text-md md:text-lg xl:text-xl text-black">

            Recent Patients
          </h4>

          <p className="mt-5 sm:mt-1 whitespace-nowrap  font-light text-[#64748B]">
            Latest added patients
          </p>
        </div>

        <Link href="/lab-admin/patients">
          <button
            className="shrink-0 whitespace-nowrap rounded-xl border border-[#2f5ba5]/20 bg-black px-4 py-2 text-white"

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
                Role
              </th>

              <th className="px-6 py-4 text-left  font-medium uppercase tracking-wide text-black">
                Gender
              </th>
            </tr>
          </thead>

         <tbody>
  {loading ? (
    <tr>
      <td colSpan={4} className="py-10 text-center">
        Loading...
      </td>
    </tr>
  ) : patients.length > 0 ? (
    patients.map((patient) => (
      <tr
        key={patient._id}
        className="border-b border-black/10 transition hover:bg-slate-50"
      >
        <td className="px-6 py-4">
          <span className="font-medium text-sm text-[#64748B]">
            {patient.name}
          </span>
        </td>

        <td className="px-6 py-4 text-sm text-[#64748B]">
          {patient.phone}
        </td>

        <td className="px-6 py-4 text-sm text-[#64748B]">
          {patient.role}
        </td>

        <td className="px-6 py-4 text-sm text-[#64748B]">
          {patient.sex}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={4} className="py-10 text-center text-black">
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