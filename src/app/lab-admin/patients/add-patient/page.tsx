"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
  FieldProps,
} from "formik";
import * as Yup from "yup";
import { ArrowLeft } from "lucide-react";
import BorderButton from "@/Ui/buttons/BorderButton";
import FillButton from "@/Ui/buttons/FillButton";
import SubmitButton from "@/Ui/buttons/SubmitButton";
import { useEffect, useRef, useState } from "react";
import ResetButton from "@/Ui/buttons/ResetButton";

interface PatientFormValues {
  name: string;
  mobile: string;
  age: string;
  gender: string;
  patientId: string;
}

interface PatientItem extends PatientFormValues {
  id: number;
}

export default function AddPatientPage() {
  const router = useRouter();

  // VALIDATION
  const validationSchema = Yup.object({
    name: Yup.string().required(
      "Patient name is required"
    ),

    mobile: Yup.string()
      .matches(
        /^[0-9]{10}$/,
        "Enter valid mobile number"
      )
      .required("Mobile number is required"),

    age: Yup.number()
      .typeError("Age must be number")
      .integer("Age must be valid")
      .positive("Age must be valid")
      .min(1, "Minimum age is 1")
      .required("Age is Required")
      .max(120, "Maximum age is 120"),

    gender: Yup.string().required(
      "Gender is required"
    ),

    patientId: Yup.string(),
  });

  // SUBMIT
  const handleSubmit = (
    values: PatientFormValues,
    {
      resetForm,
    }: FormikHelpers<PatientFormValues>
  ) => {
    const oldPatients: PatientItem[] =
      JSON.parse(
        localStorage.getItem("patients") || "[]"
      );

    const newPatient: PatientItem = {
      id: Date.now(),
      ...values,

      patientId:
        values.patientId ||
        `P00${oldPatients.length + 1}`,
    };

    const updatedPatients = [
      ...oldPatients,
      newPatient,
    ];

    localStorage.setItem(
      "patients",
      JSON.stringify(updatedPatients)
    );

    alert("Patient added successfully");

    resetForm();

    router.push("/lab-admin/patients");
  };

  return (
    <div className="min-h-screen text-white">
      <div className="min-h-screen p-5 sm:p-7 lg:p-10">
        {/* HEADER */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Link
              href="/lab-admin/patients"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white transition hover:bg-white/10"
            >
              <ArrowLeft size={20} />
            </Link>

            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-white">
                Add Patient
              </h1>

              <p className=" text-slate-400">
                Enter patient details to create a new patient
              </p>
            </div>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
          <Formik<PatientFormValues>
            initialValues={{
              name: "",
              mobile: "",
              age: "",
              gender: "",
              patientId: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting,resetForm  }) => (
              <Form className="flex flex-col gap-8">
                {/* NAME */}
                <div className="flex flex-col gap-3">
                  <label className=" font-medium text-slate-200">
                    Name{" "}
                    <span className="text-red-400">
                      *
                    </span>
                  </label>

                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter patient name"
                    className="rounded-2xl border border-white/10 bg-[#0e151d]/70 px-5 py-4  outline-none transition placeholder:text-slate-500"
                  />

                  <ErrorMessage
                    name="name"
                    component="p"
                    className=" text-red-400"
                  />
                </div>

                {/* MOBILE */}
                <div className="flex flex-col gap-3">
                  <label className=" font-medium text-slate-200">
                    Mobile{" "}
                    <span className="text-red-400">
                      *
                    </span>
                  </label>

                  <Field
                    type="text"
                    name="mobile"
                    placeholder="Enter mobile number"
                    className="rounded-2xl border border-white/10 bg-[#0e151d]/70 px-5 py-4  outline-none transition placeholder:text-slate-500"
                  />

                  <ErrorMessage
                    name="mobile"
                    component="p"
                    className=" text-red-400"
                  />
                </div>

                {/* AGE + GENDER */}
                <div className="grid gap-8 lg:grid-cols-2">
                  {/* AGE */}
                  <div className="flex flex-col gap-3">
                    <label className=" font-medium text-slate-200">
                      Age{" "}
                       <span className="text-red-400">
                      *
                    </span>
                    </label>

                    <Field
                      type="text"
                      name="age"
                      placeholder="Enter age"
                      className="rounded-2xl border border-white/10 bg-[#0e151d]/70 px-5 py-4  outline-none transition placeholder:text-slate-500"
                    />

                    <ErrorMessage
                      name="age"
                      component="p"
                      className=" text-red-400"
                    />
                  </div>

                  {/* GENDER */}
                  <div className="flex flex-col gap-3">
                    <label className=" font-medium text-slate-200">
                      Gender{" "}
                      <span className="text-red-400">
                        *
                      </span>
                    </label>

                    <Field name="gender">
                      {({ field, form }: FieldProps) => {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const [open, setOpen] = useState(false);
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const ref = useRef<HTMLDivElement>(null);

                        const options = ["Male", "Female", "Other"];

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        useEffect(() => {
                          const handler = (e: MouseEvent) => {
                            if (ref.current && !ref.current.contains(e.target as Node)) {
                              setOpen(false);
                            }
                          };
                          document.addEventListener("mousedown", handler);
                          return () => document.removeEventListener("mousedown", handler);
                        }, []);

                        return (
                          <div ref={ref} className="relative">
                            {/* Trigger button */}
                            <button
                              type="button"
                              onClick={() => setOpen((prev) => !prev)}
                              className="
            w-full
            rounded-2xl
            border
            border-white/10
            bg-[#0e151d]/70
            px-5
            py-4
            outline-none
            transition
            text-left
            appearance-none
            flex items-center justify-between
          "
                            >
                              <span
                                className={
                                  form.values.gender === ""
                                    ? "text-[#7F8CA3]"
                                    : "text-white"
                                }
                              >
                                {form.values.gender === ""
                                  ? "Select gender"
                                  : form.values.gender}
                              </span>
                              <svg
                                className={`h-4 w-4 text-[#7F8CA3] transition-transform ${open ? "rotate-180" : ""}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>

                            {/* Dropdown list */}
                            {open && (
                              <div className="
            absolute
            z-50
            mt-2
            w-full
            rounded-2xl
            border
            border-white/10
            bg-[#0e151d]
            py-2
            shadow-xl
          ">
                                {options.map((option) => (
                                  <div
                                    key={option}
                                    onClick={() => {
                                      form.setFieldValue(field.name, option);
                                      setOpen(false);
                                    }}
                                    className="
                  cursor-pointer
                  px-5
                  py-3
                  text-white
                  hover:bg-white/5
                  transition
                "
                                  >
                                    {option}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Hidden input to keep Formik in sync */}
                            <input type="hidden" {...field} />
                          </div>
                        );
                      }}
                    </Field>

                    <ErrorMessage
                      name="gender"
                      component="p"
                      className=" text-red-400"
                    />
                  </div>
                </div>




                {/* BUTTONS */}
                <div className="flex flex-col-reverse gap-4 pt-4 sm:flex-row sm:justify-end">

    <ResetButton onReset={resetForm} />

                  {/* SUBMIT */}

                  <SubmitButton text="Save" type="submit"></SubmitButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}