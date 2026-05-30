"use client";

import FillButton from "@/Ui/buttons/FillButton";
import { useEffect, useMemo, useState } from "react";
import {
    FiChevronLeft,
    FiChevronRight,
    FiFileText,
    FiSearch,
    FiTrash2,
} from "react-icons/fi";

interface ReportItem {
    id: number;
    patientId: number;
    patientName: string;
    reportType: string;
    testDate: string;
    notes: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    fileData: string;
    createdAt: string;
}

export default function ReportsListPage() {
    const [reports, setReports] = useState<
        ReportItem[]
    >([]);

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] =
        useState(1);

    const itemsPerPage = 10;

    // LOAD REPORTS
    useEffect(() => {
        const storedReports =
            localStorage.getItem("reports");

        if (storedReports) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setReports(JSON.parse(storedReports));
        }
    }, []);

    // DELETE REPORT
    const handleDelete = (id: number) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this report?",
        );

        if (!confirmDelete) return;

        const updatedReports = reports.filter(
            (report) => report.id !== id,
        );

        setReports(updatedReports);

        localStorage.setItem(
            "reports",
            JSON.stringify(updatedReports),
        );
    };

    // SEARCH FILTER
    const filteredReports = useMemo(() => {
        return reports.filter(
            (report) =>
                report.patientName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                report.reportType
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                report.fileName
                    .toLowerCase()
                    .includes(search.toLowerCase()),
        );
    }, [reports, search]);

    // PAGINATION
    const totalPages = Math.ceil(
        filteredReports.length / itemsPerPage,
    );

    const indexOfLastItem =
        currentPage * itemsPerPage;

    const indexOfFirstItem =
        indexOfLastItem - itemsPerPage;

    const currentReports =
        filteredReports.slice(
            indexOfFirstItem,
            indexOfLastItem,
        );

    return (
        <div className="min-h-screen  p-5 md:p-7 text-black ">
            {/* HEADER */}

            <div className="flex flex-col gap-5 border-b border-white/5 p-5 md:flex-row md:items-start md:justify-between md:p-6">
                <div>
                    <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
                        Uploaded     Reports List

                    </h1>

                    <p className="mt-2 text-[#64748B]">
                        View and manage uploaded reports
                    </p>
                </div>


                <FillButton text=" Upload Report" href="/lab-admin/upload-report/add-report" ></FillButton>

            </div>
            {/* SEARCH */}
            <div className="mt-8">
                <div className="relative max-w-md">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                    <input
                        type="text"
                        placeholder="Search reports..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);

                            setCurrentPage(1);
                        }}
                        className="
              h-14
              w-full
              rounded-2xl
              border
              border-black/10
                bg-[#0e151d]
              pl-12
              pr-4
              text-black
              outline-none
              transition-all
              placeholder:text-slate-500
              focus:border-cyan-400/40
            "
                    />
                </div>
            </div>

            {/* TABLE */}
            <div
                className="
             mt-8
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
                <table className="w-full min-w-280 border-collapse">
                    {/* TABLE HEADER */}
                    <thead className="bg-white/3">
                        <tr className="border-b border-black/10">
                            <th className="px-6 py-5 text-left font-medium tracking-wide text-slate-300">
                                Report
                            </th>

                            <th className="px-6 py-5 text-left font-medium tracking-wide text-slate-300">
                                Patient Name
                            </th>

                            <th className="px-6 py-5 text-left font-medium tracking-wide text-slate-300">
                                Report Type
                            </th>

                            <th className="px-6 py-5 text-left font-medium tracking-wide text-slate-300">
                                Test Date
                            </th>

                            <th className="px-6 py-5 text-left font-medium tracking-wide text-slate-300">
                                File Size
                            </th>

                            <th className="px-6 py-5 text-left font-medium tracking-wide text-slate-300">
                                Uploaded Date
                            </th>

                            <th className="px-6 py-5 text-center font-medium tracking-wide text-slate-300">
                                Action
                            </th>
                        </tr>
                    </thead>

                    {/* TABLE BODY */}
                    <tbody>
                        {currentReports.length > 0 ? (
                            currentReports.map((report) => (
                                <tr
                                    key={report.id}
                                    className="
                    border-b
                    border-white/5
                    transition-all
                    
                    hover:bg-cyan-500/3
                  "
                                >
                                    {/* REPORT */}
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-2xl
                          bg-cyan-500/10
                          text-cyan-300
                        "
                                            >
                                                <FiFileText className="text-xl" />
                                            </div>

                                            <div>
                                                <h3 className=" text-black font-medium">
                                                    {report.fileName}
                                                </h3>

                                                <p className="mt-1 text-slate-500 font-medium">
                                                    {report.fileType}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* PATIENT */}
                                    <td className="px-6 py-5 text-slate-300 font-medium">
                                        {report.patientName}
                                    </td>

                                    {/* TYPE */}
                                    <td className="px-6 py-5">
                                        <span
                                            className="
                        inline-flex
                        rounded-full
                        px-4
                        py-2
                       
                 font-medium
                     
                      "
                                        >
                                            {report.reportType}
                                        </span>
                                    </td>

                                    {/* TEST DATE */}
                                    <td className="px-6 py-5 text-slate-300 font-medium">
                                        {report.testDate}
                                    </td>

                                    {/* FILE SIZE */}
                                    <td className="px-6 py-5 text-slate-300 font-medium">
                                        {(
                                            report.fileSize /
                                            1024 /
                                            1024
                                        ).toFixed(2)}{" "}
                                        MB
                                    </td>

                                    {/* UPLOAD DATE */}
                                    <td className="px-6 py-5 text-slate-300 font-medium">
                                        {new Date(
                                            report.createdAt,
                                        ).toLocaleDateString()}
                                    </td>

                                    {/* ACTION */}
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-center">
                                            <button
                                                onClick={() =>
                                                    handleDelete(report.id)
                                                }
                                                className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
                          px-4
                          py-2.5
                         text-xl
                          
                          text-red-400
                          transition-all
                          hover:bg-red-500/20
                        "
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-6 py-24 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center">
                                        <div
                                            className="
                        flex
                        h-24
                        w-24
                        items-center
                        justify-center
                        rounded-full
                        bg-cyan-500/10
                        text-cyan-300
                      "
                                        >
                                            <FiFileText className="text-5xl" />
                                        </div>

                                        <h2 className="mt-6 text-2xl font-medium text-black">
                                            No Reports Found
                                        </h2>

                                        <p className="mt-3 text-[#64748B]">
                                            Upload reports to show data
                                            here
                                        </p>

                                        <FillButton text=" Upload Report" href="/lab-admin/upload-report/add-report" ></FillButton>

                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            {filteredReports.length > 0 && (
                   <div className="flex items-center justify-between border-t border-white/5 px-5 py-5 md:px-6">
            <p className="text-slate-500">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(
                indexOfLastItem,
                filteredReports.length,
              )}{" "}
              of {filteredReports.length} patients
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
    );
}