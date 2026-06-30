"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMemo, useState, useEffect } from "react";
import ResetButton from "@/Ui/buttons/ResetButton";
import SubmitButton from "@/Ui/buttons/SubmitButton";
import toast from "react-hot-toast";

const patientSchema = Yup.object({
    name: Yup.string().required("Patient name is required"),

    mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter valid 10 digit mobile number")
        .required("Mobile number is required"),

    age: Yup.number()
        .typeError("Age must be a number")
        .required("Age is required"),

    gender: Yup.string().required("Gender is required"),
});

export default function AddPatientPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [patients, setPatients] = useState<any[]>([]);
    const router = useRouter();
    useEffect(() => {
        const loadPatients = () => {
            const storedPatients = JSON.parse(
                localStorage.getItem("lab-staff-patients") || "[]"
            );

            setPatients(storedPatients);
        };

        loadPatients();

        window.addEventListener("storage", loadPatients);

        return () =>
            window.removeEventListener("storage", loadPatients);
    }, []);
    return (
        <div className="min-h-screen bg-[#f7f7f7] p-8">
            <div className="mb-8 flex items-start gap-4">
                <button
                    onClick={() => router.back()}
                    className="mt-2 text-xl"
                >
                    <FiArrowLeft />
                </button>

                <div>
                                      <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl   font-normal tracking-tight text-black">

                        Add Patient
                    </h1>

                    <p className=" leading-relaxed  font-light  text-[#64748B]
">
                        Enter patient details to create a new patient
                    </p>
                </div>
            </div>

            <Formik
                initialValues={{
                    name: "",
                    mobile: "",
                    age: "",
                    gender: "",
                }}
                validationSchema={patientSchema}
                onSubmit={(values) => {
                    const patients = JSON.parse(
                        localStorage.getItem("lab-staff-patients") || "[]"
                    );

                    const newPatient = {
                        id: Date.now(),
                        patientId: `PAT${Date.now().toString().slice(-6)}`,
                        name: values.name,
                        mobile: values.mobile,
                        age: values.age,
                        gender: values.gender,
                        createdAt: new Date().toISOString(),
                    };

                    patients.push(newPatient);

                    localStorage.setItem(
                        "lab-staff-patients",
                        JSON.stringify(patients)
                    );
  toast.success("Patient added successfully");

                  setTimeout(() => {
    router.push("/lab-staff/patients");
  }, 1000);
                }}
            >
                {({ isSubmitting,values, touched, errors ,resetForm}) => (
                    <Form>
                        <div className="rounded-4xl border border-slate-200 bg-white p-5 lg:p-10 shadow-lg">
                            <div className="space-y-8">
                                {/* Name */}
                                <div>
                                    <label className="mb-3 block  font-medium">
                                        Name <span className="text-red-500">*</span>
                                    </label>

                                    <Field
                                        name="name"
                                        placeholder="Enter patient name"
                                        className={`h-16 w-full rounded-2xl border px-5  outline-none
                    ${touched.name && errors.name
                                                ? "border-red-500"
                                                : "border-slate-200"
                                            }`}
                                    />

                                    <ErrorMessage
                                        name="name"
                                        component="p"
                                        className="mt-2 text-sm text-red-500"
                                    />
                                </div>

                                {/* Mobile */}
                                <div>
                                    <label className="mb-3 block  font-medium">
                                        Mobile <span className="text-red-500">*</span>
                                    </label>

                                    <Field
                                        name="mobile"
                                        placeholder="Enter mobile number"
                                        className={`h-16 w-full rounded-2xl border px-5  outline-none
                    ${touched.mobile && errors.mobile
                                                ? "border-red-500"
                                                : "border-slate-200"
                                            }`}
                                    />

                                    <ErrorMessage
                                        name="mobile"
                                        component="p"
                                        className="mt-2 text-sm text-red-500"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                    {/* Age */}
                                    <div>
                                        <label className="mb-3 block  font-medium">
                                            Age <span className="text-red-500">*</span>
                                        </label>

                                        <Field
                                            name="age"
                                            placeholder="Enter age"
                                            className={`h-16 w-full rounded-2xl border px-5  outline-none
                      ${touched.age && errors.age
                                                    ? "border-red-500"
                                                    : "border-slate-200"
                                                }`}
                                        />

                                        <ErrorMessage
                                            name="age"
                                            component="p"
                                            className="mt-2 text-sm text-red-500"
                                        />
                                    </div>

                                    {/* Gender */}
                                    <div>
                                        <label className="mb-3 block  font-medium">
                                            Gender <span className="text-red-500">*</span>
                                        </label>

                                        <Field
                                            as="select"
                                            name="gender"
                                            className={`h-16 w-full rounded-2xl border px-5  outline-none 
                      ${touched.gender && errors.gender
                                                    ? "border-red-500"
                                                    : "border-slate-200"
                                                }`}
                                        >
                                            <option value="">
                                                Select gender
                                            </option>

                                            <option value="Male">
                                                Male
                                            </option>

                                            <option value="Female">
                                                Female
                                            </option>

                                            <option value="Other">
                                                Other
                                            </option>
                                        </Field>

                                        <ErrorMessage
                                            name="gender"
                                            component="p"
                                            className="mt-2 text-sm text-red-500"
                                        />
                                    </div>
                                </div>

                              <div className="flex  gap-4 pt-4 sm:flex-row sm:justify-end">

                  <ResetButton onReset={resetForm} />

                  {/* SUBMIT */}

                  <SubmitButton text="Save" type="submit"></SubmitButton>
                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setPatients(storedPatients: any) {
    throw new Error("Function not implemented.");
}
