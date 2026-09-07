"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserCircle2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAllUsers } from "@/redux/Api";

interface PatientItem {
  id: number | string;
  name: string;
  mobile: string;
  age: string;
  gender: string;
  patientId: string;
  role?: string;
  createdAt?: string;
}

interface ApiUser {
  _id?: string | number;
  name?: string;
  fullName?: string;
  phone?: string | null;
  mobile?: string;
  age?: string;
  role?: string;
  gender?: string;
  patientId?: string;
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
    role: "Patient",
    createdAt: "2026-06-05T10:00:00",
  },
  {
    id: 2,
    name: "Priya Shah",
    mobile: "9876543211",
    age: "35",
    gender: "Female",
    patientId: "PAT002",
    role: "Patient",
    createdAt: "2026-06-05T09:30:00",
  },
  {
    id: 3,
    name: "Amit Mehta",
    mobile: "9876543212",
    age: "51",
    gender: "Male",
    patientId: "PAT003",
    role: "Patient",
    createdAt: "2026-06-05T09:00:00",
  },
  {
    id: 4,
    name: "Neha Joshi",
    mobile: "9876543213",
    age: "28",
    gender: "Female",
    patientId: "PAT004",
    role: "Patient",
    createdAt: "2026-06-05T08:30:00",
  },
  {
    id: 5,
    name: "Karan Desai",
    mobile: "9876543214",
    age: "39",
    gender: "Male",
    patientId: "PAT005",
    role: "Patient",
    createdAt: "2026-06-05T08:00:00",
  },
];
interface LatestPaientProps { year?: number; month?: number; date?: string; }
export default function LatestPaient({ year, month, date }: LatestPaientProps) {
  const [patients, setPatients] = useState<PatientItem[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await dispatch(getAllUsers()).unwrap();
        const users = response.data || [];

        const backendPatients = users.map((u: ApiUser) => {
          return {
            id: u._id || Date.now().toString() + Math.random().toString(),
            name: u.name || u.fullName || "-",
            mobile: u.phone || u.mobile || "N/A",
            age: u.age || "-",
            role: u.role || "-",
            gender: u.gender || "-",
            patientId: u.patientId || "-",
            createdAt: u.createdAt,
          };
        });

        const data = backendPatients.length > 0 ? backendPatients : defaultPatients;

        let filteredPatients = data;
        if (date) {
            filteredPatients = data.filter((p: PatientItem) => {
                if (!p.createdAt) return false;
                const d = new Date(p.createdAt);
                const y = d.getFullYear();
                const m = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                return `${y}-${m}-${day}` === date;
            });
        }

        const latestPatients = [...filteredPatients]
          .sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          })
          .slice(0, 5);

        setPatients(latestPatients);
      } catch (error) {
        console.error("Failed to load patients", error);
        setPatients(defaultPatients); // Fallback
      }
    };
    
    fetchPatients();
  }, [date, dispatch]);
  return (
    <div className="rounded-2xl border   min-h-125 border-slate-200  bg-[#f7f7f7] shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-black/10 p-6">
        <div className="min-w-0 flex-1">
                          <h4 className="text-md md:text-lg xl:text-xl text-black">
            Recent Patients
          </h4>

          <p className="mt-5 sm:mt-1 whitespace-nowrap font-light text-[#64748B]">
            Latest added patients
          </p>
        </div>

        <Link href="/lab-staff/patients">
          <button
            className="shrink-0 whitespace-nowrap rounded-xl bg-black h-10 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
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
                    {patient.role}
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