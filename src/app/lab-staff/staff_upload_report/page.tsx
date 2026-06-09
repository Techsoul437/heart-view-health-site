"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    FiChevronDown,
    FiFileText,
    FiPlus,
    FiSearch,
    FiUploadCloud,
    FiUser,
    FiX,
} from "react-icons/fi";
import { ArrowLeft } from "lucide-react";
import ResetButton from "@/Ui/buttons/ResetButton";
import SubmitButton from "@/Ui/buttons/SubmitButton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Patient {
    id: number;
    name: string;
    mobile: string;
    age: string;
    gender: string;
    patientId: string;
}

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

const reportTypes = [
    "Blood Test",
    "ECG Report",
    "X-Ray",
    "MRI Scan",
    "CT Scan",
    "2D Echo",
    "Urine Test",
    "Lipid Profile",
];

const validationSchema = Yup.object({
    patientId: Yup.string().required(
        "Please select patient",
    ),

    reportType: Yup.string().required(
        "Please select report type",
    ),

    testDate: Yup.string().required(
        "Please select test date",
    ),

    reportFile: Yup.mixed().required(
        "Please upload report file",
    ),

    notes: Yup.string().max(
        500,
        "Maximum 500 characters allowed",
    ),
});

export default function UploadReportPage() {
    const router = useRouter();

    const [patients, setPatients] = useState<Patient[]>(
        [],
    );

    const [reports, setReports] = useState<ReportItem[]>(
        [],
    );

    const [search, setSearch] = useState("");

    const [isPatientOpen, setIsPatientOpen] =
        useState(false);

    const [isReportTypeOpen, setIsReportTypeOpen] =
        useState(false);

    const [dragActive, setDragActive] =
        useState(false);

    const patientDropdownRef =
        useRef<HTMLDivElement>(null);

    const reportDropdownRef =
        useRef<HTMLDivElement>(null);

    // LOAD LOCAL STORAGE
    useEffect(() => {
        const savedPatients = localStorage.getItem(
            "lab-staff-patients",
        );

        const savedReports = localStorage.getItem(
            "staff-reports",
        );

        if (savedPatients) {
            setPatients(JSON.parse(savedPatients));
        }

        if (savedReports) {
            setReports(JSON.parse(savedReports));
        }
    }, []);

    // CLOSE DROPDOWN
    useEffect(() => {
        const handleClickOutside = (
            event: MouseEvent,
        ) => {
            if (
                patientDropdownRef.current &&
                !patientDropdownRef.current.contains(
                    event.target as Node,
                )
            ) {
                setIsPatientOpen(false);
            }

            if (
                reportDropdownRef.current &&
                !reportDropdownRef.current.contains(
                    event.target as Node,
                )
            ) {
                setIsReportTypeOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside,
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside,
            );
        };
    }, []);

    const filteredPatients = useMemo(() => {
        return patients.filter(
            (patient) =>
                patient.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                patient.mobile.includes(search),
        );
    }, [patients, search]);

    const saveReportToLocalStorage = (
        report: ReportItem,
    ) => {
        const updatedReports = [report, ...reports];

        setReports(updatedReports);

        localStorage.setItem(
            "staff-reports",
            JSON.stringify(updatedReports),
        );
    };

    const convertFileToBase64 = (
        file: File,
    ): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () =>
                resolve(reader.result as string);

            reader.onerror = (error) =>
                reject(error);
        });
    };

    return (
        <div className="min-h-screen  overflow-hidden  text-black  p-5 md:p-12">
            {/* HEADER */}

            <div className="flex flex-col gap-5 shrink-0">
                <div className="flex items-center gap-3">

                    <div>
                        <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
                            Upload Report
                        </h1>

                        <p className=" text-[#64748B]">
                            Upload and manage patient reports
                        </p>
                    </div>
                </div>
            </div>
            {/* FORM CARD */}
            <div
                className="
          mt-8
            h-[calc(100vh-140px)]
      overflow-y-auto
      no-scrollbar
          rounded-4xl
          border
         border-black/10 bg-white/3
          p-4
          shadow-2xl
          backdrop-blur-xl
          sm:p-6
          xl:p-8
        "
            >
                {/* CARD HEADER */}
                <div className="flex items-start gap-4">
                    <div
                        className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-cyan-500/10
              text-cyan-700
            "
                    >
                        <FiFileText className="text-2xl" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-medium">
                            Patient & Report Details
                        </h2>

                        <p className="mt-2  text-[#64748B]">
                            Fill in the details below to upload
                            a new report
                        </p>
                    </div>
                </div>

                {/* FORMIK */}
                <Formik
                    initialValues={{
                        patientId: "",
                        patientName: "",
                        reportType: "",
                        testDate: "",
                        notes: "",
                        reportFile: null as File | null,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (
                        values,
                        { resetForm, setSubmitting },
                    ) => {
                        try {
                            if (!values.reportFile) return;

                            const base64 =
                                await convertFileToBase64(
                                    values.reportFile,
                                );

                            const reportData: ReportItem = {
                                id: Date.now(),
                                patientId: Number(
                                    values.patientId,
                                ),
                                patientName:
                                    values.patientName,
                                reportType:
                                    values.reportType,
                                testDate: values.testDate,
                                notes: values.notes,
                                fileName:
                                    values.reportFile.name,
                                fileType:
                                    values.reportFile.type,
                                fileSize:
                                    values.reportFile.size,
                                fileData: base64,
                                createdAt:
                                    new Date().toISOString(),
                            };

                            saveReportToLocalStorage(
                                reportData,
                            );

                            toast.success("Report uploaded  successfully");
                            resetForm();


                        } catch (error) {
                            console.log(error);

                            alert(
                                "Something went wrong",
                            );
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        setFieldValue,
                        resetForm,
                    }) => {
                        const selectedPatient =
                            patients.find(
                                (patient) =>
                                    String(patient.id) ===
                                    values.patientId,
                            );

                        return (

                            <Form className="mt-10">
                                {/* TOP GRID */}
                                <div className="grid gap-6 xl:grid-cols-3">
                                    {/* PATIENT DROPDOWN */}
                                    <div
                                        className="relative"
                                        ref={patientDropdownRef}
                                    >
                                        <label className="mb-3 block  font-medium text-black">
                                            Patient{" "}
                                            <span className="text-red-400">
                                                *
                                            </span>
                                        </label>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setIsPatientOpen(
                                                    !isPatientOpen,
                                                )
                                            }
                                            className={`
                        flex
                        h-14
                        w-full
                        items-center
                        justify-between
                        rounded-2xl
                        border
                        border-black/10 bg-[#f7f7f7]/70
                        px-4
                        text-left
                        transition-all
                        ${errors.patientId &&
                                                    touched.patientId
                                                    ? "border-red-500/50"
                                                    : "border-black/10 hover:border-cyan-700/40"
                                                }
                      `}
                                        >
                                            <div className="flex items-center gap-3">
                                                <FiUser className="text-[#64748B]" />

                                                <span
                                                    className={`${selectedPatient
                                                        ? "text-black"
                                                        : "text-[#64748B]"
                                                        }`}
                                                >
                                                    {selectedPatient
                                                        ? selectedPatient.name
                                                        : "Search by name or mobile number"}
                                                </span>
                                            </div>

                                            <FiChevronDown className="text-[#64748B]" />
                                        </button>

                                        <ErrorMessage
                                            name="patientId"
                                            component="p"
                                            className="mt-2  text-red-400"
                                        />

                                        {/* DROPDOWN */}
                                        {isPatientOpen && (
                                            <div
                                                className="
                          absolute
                          z-50
                          mt-3
                          w-full
                          rounded-3xl
                          border
                          border-black/10
                          bg-[#f7f7f7]
                          p-4
                          shadow-2xl
                        "
                                            >
                                                {/* SEARCH */}
                                                <div className="relative">
                                                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />

                                                    <input
                                                        type="text"
                                                        placeholder="Search patient..."
                                                        value={search}
                                                        onChange={(e) =>
                                                            setSearch(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="
                              h-12
                              w-full
                              rounded-2xl
                              border
                              border-black/10
                              bg-[#f7f7f7]
                              pl-11
                              pr-4
                              
                              text-black
                              outline-none
                              placeholder:text-[#64748B]
                              
                            "
                                                    />
                                                </div>

                                                {/* ADD PATIENT */}
                                                <Link
                                                    href="/lab-staff/patients/add-patient"
                                                    className="
                            mt-4
                            flex
                            items-center
                            gap-2
                            rounded-2xl
                            bg-[#2f5ba5]/10
                            px-4
                            py-3
                            
                            font-medium
                            text-[#2f5ba5]
                            transition-all
                            hover:bg-[#2f5ba5]/20
                          "
                                                >
                                                    <FiPlus />
                                                    Add New Patient
                                                </Link>

                                                {/* LIST */}
                                                <div className="mt-5">
                                                    <p className="mb-4   font-medium uppercase  text-[#64748B]">
                                                        Recent Patients
                                                    </p>

                                                    <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                                                        {filteredPatients.length >
                                                            0 ? (
                                                            filteredPatients.map(
                                                                (patient) => (
                                                                    <button
                                                                        key={
                                                                            patient.id
                                                                        }
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setFieldValue(
                                                                                "patientId",
                                                                                String(
                                                                                    patient.id,
                                                                                ),
                                                                            );

                                                                            setFieldValue(
                                                                                "patientName",
                                                                                patient.name,
                                                                            );

                                                                            setIsPatientOpen(
                                                                                false,
                                                                            );
                                                                        }}
                                                                        className="
                                      flex
                                      w-full
                                      items-center
                                      gap-4
                                      rounded-2xl
                                      border
                                      border-transparent
                                      bg-white/3
                                      p-3
                                      text-left
                                      transition-all
                                      hover:border-cyan-700/20
                                      hover:bg-[#2f5ba5]/10
                                    "
                                                                    >
                                                                        <div
                                                                            className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-full
                                       bg-linear-to-r from-[#2f5ba5]/70 to-[#4a7bc9]/50
                                        
                                        font-medium
                                        text-white
                                      "
                                                                        >
                                                                            {patient.name
                                                                                ?.slice(
                                                                                    0,
                                                                                    2,
                                                                                )
                                                                                .toUpperCase()}
                                                                        </div>

                                                                        <div>
                                                                            <h3 className="font-medium text-black">
                                                                                {
                                                                                    patient.name
                                                                                }
                                                                            </h3>

                                                                            <p className="mt-1  text-[#64748B]">
                                                                                {
                                                                                    patient.mobile
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </button>
                                                                ),
                                                            )
                                                        ) : (
                                                            <div className="rounded-2xl border border-dashed border-black/10 py-10 text-center  text-[#64748B]">
                                                                No patient found
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* TEST DATE */}
                                    <div>
                                        <label className="mb-3 block  font-medium text-black">
                                            Test Date{" "}
                                            <span className="text-red-400">
                                                *
                                            </span>
                                        </label>

                                        <div className="relative">
                                            <input
                                                type="date"
                                                value={values.testDate}
                                                onChange={(e) =>
                                                    setFieldValue("testDate", e.target.value)
                                                }
                                                className={`custom-date-input
    h-14
    w-full
    rounded-2xl
    border
    bg-[#f7f7f7]/70
    px-4
    pr-12
    text-[#64748B]
    outline-none
    transition-all
    appearance-none
    ${errors.testDate && touched.testDate
                                                        ? "border-red-500/50"
                                                        : "border-black/10"
                                                    }
  `}
                                            />

                                        </div>

                                        <ErrorMessage
                                            name="testDate"
                                            component="p"
                                            className="mt-2  text-red-400"
                                        />

                                    </div>

                                    {/* REPORT TYPE */}
                                    <div
                                        className="relative"
                                        ref={reportDropdownRef}
                                    >
                                        <label className="mb-3 block  font-medium text-black">
                                            Report Type{" "}
                                            <span className="text-red-400">
                                                *
                                            </span>
                                        </label>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setIsReportTypeOpen(
                                                    !isReportTypeOpen,
                                                )
                                            }
                                            className={`
                        flex
                        h-14
                        w-full
                        items-center
                        justify-between
                        rounded-2xl
                        border
                        bg-[#f7f7f7]/70
                        px-4
                        text-left
                        transition-all
                        ${errors.reportType &&
                                                    touched.reportType
                                                    ? "border-red-500/50"
                                                    : "border-black/10 hover:border-cyan-700/40"
                                                }
                      `}
                                        >
                                            <span
                                                className={`${values.reportType
                                                    ? "text-black"
                                                    : "text-[#64748B]"
                                                    }`}
                                            >
                                                {values.reportType ||
                                                    "Select report type"}
                                            </span>

                                            <FiChevronDown className="text-[#64748B]" />
                                        </button>

                                        <ErrorMessage
                                            name="reportType"
                                            component="p"
                                            className="mt-2  text-red-400"
                                        />


                                        {/* REPORT TYPE LIST */}
                                        {isReportTypeOpen && (
                                            <div
                                                className="
                          absolute
                          z-50
                          mt-3
                          w-full
                          rounded-3xl
                          border
                          border-black/10
                          bg-[#f7f7f7]/70
                          p-3
                          shadow-2xl
                        "
                                            >
                                                <div className="space-y-2">
                                                    {reportTypes.map(
                                                        (type) => (
                                                            <button
                                                                key={type}
                                                                type="button"
                                                                onClick={() => {
                                                                    setFieldValue(
                                                                        "reportType",
                                                                        type,
                                                                    );

                                                                    setIsReportTypeOpen(
                                                                        false,
                                                                    );
                                                                }}
                                                                className="
                                  flex
                                  w-full
                                  items-center
                                  rounded-2xl
                                  px-4
                                  py-3
                                  text-left
                                  
                                  text-black
                                  transition-all
                                  hover:bg-cyan-500/10
                                  hover:text-black
                                "
                                                            >
                                                                {type}
                                                            </button>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* FILE UPLOAD */}
                                <div className="mt-8">
                                    <label className="mb-3 block  font-medium text-black">
                                        Upload Report File{" "}
                                        <span className="text-red-400">
                                            *
                                        </span>
                                    </label>

                                    <div
                                        onDragOver={(e) => {
                                            e.preventDefault();

                                            setDragActive(true);
                                        }}
                                        onDragLeave={() =>
                                            setDragActive(false)
                                        }
                                        onDrop={(e) => {
                                            e.preventDefault();

                                            setDragActive(false);

                                            const file =
                                                e.dataTransfer.files?.[0];

                                            if (file) {
                                                setFieldValue(
                                                    "reportFile",
                                                    file,
                                                );
                                            }
                                        }}
                                        className={`
                      relative
                      rounded-4xl
                      border
                      border-dashed
                      bg-[#f7f7f7]/70
                      p-6
                      transition-all
                      sm:p-10
                      ${dragActive
                                                ? "border-cyan-700 bg-cyan-500/10"
                                                : errors.reportFile &&
                                                    touched.reportFile
                                                    ? "border-red-500/50"
                                                    : "border-black/10 hover:border-cyan-700/30"
                                            }
                    `}
                                    >
                                        <input
                                            type="file"
                                            accept=".pdf,.png,.jpg,.jpeg"
                                            className="hidden"
                                            id="reportFile"
                                            onChange={(e) => {
                                                const file =
                                                    e.currentTarget.files?.[0];

                                                if (file) {
                                                    setFieldValue(
                                                        "reportFile",
                                                        file,
                                                    );
                                                }
                                            }}
                                        />

                                        <label
                                            htmlFor="reportFile"
                                            className="block cursor-pointer"
                                        >
                                            <div className="flex flex-col items-center justify-center text-center">
                                                <div
                                                    className="
                            flex
                            h-20
                            w-20
                            items-center
                            justify-center
                            rounded-full
                            bg-cyan-500/10
                            text-cyan-700
                          "
                                                >
                                                    <FiUploadCloud className="text-4xl" />
                                                </div>

                                                <h3 className="mt-6 text-xl font-medium text-black">
                                                    Drag and drop your file
                                                    here
                                                </h3>

                                                <p className="mt-3 text-[#64748B]">
                                                    Or click to browse report
                                                    file
                                                </p>

                                                <p className="mt-4  text-[#64748B]">
                                                    Supports PDF, JPG, PNG
                                                    files up to 5MB
                                                </p>
                                            </div>
                                        </label>

                                        {/* FILE PREVIEW */}
                                        {values.reportFile && (
                                            <div
                                                className="
      mt-8
      flex
      flex-col
      sm:flex-row
      sm:items-center
      sm:justify-between
      gap-4
      rounded-2xl
      border
      border-cyan-700/20
      bg-cyan-500/10
      p-4
      overflow-hidden
    "
                                            >
                                                <div className="flex min-w-0 items-center gap-4">
                                                    <div
                                                        className="
          flex
          h-14
          w-14
          shrink-0
          items-center
          justify-center
          rounded-2xl
          bg-cyan-500/20
          text-cyan-700
        "
                                                    >
                                                        <FiFileText className="text-2xl" />
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <h4
                                                            className="
            font-medium
            text-black
            break-all
            whitespace-normal
          "
                                                        >
                                                            {values.reportFile.name}
                                                        </h4>
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setFieldValue("reportFile", null)
                                                    }
                                                    className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-xl
        bg-red-500/10
        text-red-500
        transition-all
        hover:bg-red-500/20
      "
                                                >
                                                    <FiX />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <ErrorMessage
                                        name="reportFile"
                                        component="p"
                                        className="mt-2  text-red-400"
                                    />

                                    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-[#64748B]">
                                        <p>
                                            Accepted formats: PDF, JPG,
                                            PNG
                                        </p>

                                        <p>Maximum file size: 5MB</p>
                                    </div>
                                </div>

                                {/* NOTES */}
                                <div className="mt-8">
                                    <label className="mb-3 block  font-medium text-black">
                                        Notes{" "}
                                        <span className="text-[#64748B]">
                                            (Optional)
                                        </span>
                                    </label>

                                    <textarea
                                        rows={5}
                                        value={values.notes}
                                        onChange={(e) =>
                                            setFieldValue(
                                                "notes",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Add any additional notes about this report..."
                                        className="
                      w-full
                      rounded-4xl
                      border
                      border-black/10
                      bg-[#f7f7f7]/70
                      p-5
                      text-black
                      outline-none
                      transition-all
                      placeholder:text-[#64748B]
                      
                    "
                                    />

                                    <div className="mt-3 flex items-center justify-between gap-3">
                                        <ErrorMessage
                                            name="notes"
                                            component="p"
                                            className=" text-red-400"
                                        />

                                        <p className="ml-auto  text-[#64748B]">
                                            {values.notes.length}/500
                                        </p>
                                    </div>

                                </div>

                                {/* BUTTONS */}
                                {/* <div className="mt-10 flex flex-wrap items-center justify-end gap-4">
                                    <button
                                        type="reset"
                                        className="
                      rounded-2xl
                      border
                      border-black/10
                      bg-black/5
                      px-8
                      py-4
                      font-medium
                      text-black
                      transition-all
                      hover:bg-black/10
                    "
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="
                      rounded-2xl
                      bg-linear-to-r
                      from-cyan-500
                      to-emerald-500
                      px-8
                      py-4
                      font-medium
                      text-black
                      transition-all
                      hover:opacity-90
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                                    >
                                        {isSubmitting
                                            ? "Uploading..."
                                            : "Upload Report"}
                                    </button>
                                </div> */}
                                <div className="flex  gap-4 pt-4 sm:flex-row sm:justify-end">

                                    <ResetButton onReset={() => resetForm()} />

                                    {/* SUBMIT */}

                                    <SubmitButton text="Save" type="submit"></SubmitButton>
                                </div>

                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}