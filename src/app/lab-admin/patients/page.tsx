"use client";

import FillButton from "@/Ui/buttons/FillButton";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

interface PatientItem {
  id: number;
  name: string;
  mobile: string;
  age: string;
  gender: string;
  patientId: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<PatientItem[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(
        localStorage.getItem("patients") || "[]",
      );
    }

    return [];
  });

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // DELETE PATIENT
  const handleDelete = (id: number) => {
    const updatedPatients = patients.filter(
      (patient) => patient.id !== id,
    );

    setPatients(updatedPatients);

    localStorage.setItem(
      "patients",
      JSON.stringify(updatedPatients),
    );
  };

  const itemsPerPage = 10;

  const filteredPatients = useMemo(() => {
    return patients.filter(
      (patient) =>
        patient.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        patient.mobile.includes(search) ||
        patient.patientId
          .toLowerCase()
          .includes(search.toLowerCase()),
    );
  }, [patients, search]);

  const totalPages = Math.ceil(
    filteredPatients.length / itemsPerPage,
  );

  const indexOfLastPatient =
    currentPage * itemsPerPage;

  const indexOfFirstPatient =
    indexOfLastPatient - itemsPerPage;

  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient,
  );

  return (
    <div className="min-h-screen p-5 text-black md:p-7">
      <div>
        {/* HEADER */}
        <div className="flex flex-col gap-5 border-b border-white/5 p-5 md:flex-row md:items-start md:justify-between md:p-6">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
              Patients
            </h1>

            <p className="mt-2 text-[#64748B]">
              View and manage patients
            </p>
          </div>


          <FillButton text="Add Patient" href="/lab-admin/patients/add-patient" ></FillButton>

        </div>

        {/* SEARCH */}
        <div className="p-5 md:p-6">
          <div className="relative w-full max-w-sm">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              type="text"
              placeholder="Search by name, mobile "
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="
                h-11
                w-full
                rounded-lg
                border
                border-black/10
                bg-[#0e151d]
                pl-11
                pr-4
                text-black
                outline-none
                placeholder:text-slate-500
                focus:border-cyan-400/40
              "
            />
          </div>
        </div>

        {/* TABLE */}
        <div
          className="
            overflow-x-auto
            overflow-y-auto
            max-h-150
            rounded-2xl
            border
            border-white/6
            bg-[#0e151d]/80
            backdrop-blur-md
            shadow-[0_0_0_1px_rgba(255,255,255,0.02)]

            [scrollbar-width:none]
            [-ms-overflow-style:none]

            [&::-webkit-scrollbar]:hidden
          "
        >
          <table className="w-full min-w-225 border-collapse">
            <thead className="sticky top-0 z-10 bg-[#0e151d] backdrop-blur-md">
              <tr className="border-y border-white/5 bg-white/2">
                <th className="px-6 py-4 text-left font-medium tracking-wide text-slate-200">
                  Name
                </th>

                <th className="px-6 py-4 text-left font-medium tracking-wide text-slate-200">
                  Mobile
                </th>

                <th className="px-6 py-4 text-left font-medium tracking-wide text-slate-200">
                  Age
                </th>

                <th className="px-6 py-4 text-left font-medium tracking-wide text-slate-200">
                  Gender
                </th>



                <th className="px-6 py-4 text-left font-medium tracking-wide text-slate-200">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentPatients.length > 0 ? (
                currentPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="
                      border-b
                      border-white/5
                      transition
                      hover:bg-cyan-500/2
                    "
                  >
                    <td className="px-6 py-5 text-[#64748B]">
                      {patient.name}
                    </td>

                    <td className="px-6 py-5 text-[#64748B]">
                      {patient.mobile}
                    </td>

                    <td className="px-6 py-5 text-[#64748B]">
                      {patient.age} 
                    </td>

                    <td className="px-6 py-5 text-[#64748B]">
                      {patient.gender}
                    </td>



                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        {/* EDIT */}
                        <Link
                          href={`/lab-admin/patients/add-patient/${patient.id}`}
                          className="
    flex
    h-8
    items-center
    gap-1.5
    rounded-md
    px-3
    text-lg
    font-medium
    text-[#2f5ba5]
    transition
  "
                        >
                          <FiEdit2 className="text-lg" />
                        </Link>
                        {/* DELETE */}
                        <button
                          onClick={() =>
                            handleDelete(patient.id)
                          }
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-md
                            text-red-400
                            transition
                          "
                        >
                          <FiTrash2 className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-14 text-center text-slate-500"
                  >
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        {filteredPatients.length > 0 && (
          <div className="flex items-center justify-between border-t border-white/5 px-5 py-5 md:px-6">
            <p className="text-slate-500">
              Showing {indexOfFirstPatient + 1} to{" "}
              {Math.min(
                indexOfLastPatient,
                filteredPatients.length,
              )}{" "}
              of {filteredPatients.length} patients
            </p>

            <div className="flex items-center gap-2">
              {/* PREV */}
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((prev) => prev - 1)
                }
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-md
                  border
                  border-black/10
                  bg-white/3
                  text-[#64748B]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <FiChevronLeft />
              </button>

              {/* PAGE BUTTONS */}
              {Array.from(
                { length: totalPages },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setCurrentPage(i + 1)
                    }
                    className={`
                      flex
                      h-8
                      min-w-8
                      items-center
                      justify-center
                      rounded-md
                      px-3
                      
                      font-semibold
                      transition
                      ${currentPage === i + 1
                        ? "bg-[#2f5ba5]/70 text-black"
                        : "border border-black/10 bg-white/3 text-[#64748B]"
                      }
                    `}
                  >
                    {i + 1}
                  </button>
                ),
              )}

              {/* NEXT */}
              <button
                disabled={
                  currentPage === totalPages ||
                  totalPages === 0
                }
                onClick={() =>
                  setCurrentPage((prev) => prev + 1)
                }
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-md
                  border
                  border-black/10
                  bg-white/3
                  text-[#64748B]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}