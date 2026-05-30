"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import BorderButton from "@/Ui/buttons/BorderButton";
import SubmitButton from "@/Ui/buttons/SubmitButton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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

export default function EditPatientPage() {
  const router = useRouter();
  const params = useParams();

  const [initialValues, setInitialValues] =
    useState<PatientFormValues>({
      name: "",
      mobile: "",
      age: "",
      gender: "",
      patientId: "",
    });

  const [loading, setLoading] = useState(true);

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
      .max(120, "Maximum age is 120"),

    gender: Yup.string().required(
      "Gender is required"
    ),

    patientId: Yup.string(),
  });

  // GET PATIENT DATA
  useEffect(() => {
    const patients: PatientItem[] = JSON.parse(
      localStorage.getItem("patients") || "[]"
    );

    const patient = patients.find(
      (item) => item.id === Number(params.id)
    );

    if (patient) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInitialValues({
        name: patient.name,
        mobile: patient.mobile,
        age: patient.age,
        gender: patient.gender,
        patientId: patient.patientId,
      });
    }

    setLoading(false);
  }, [params.id]);

  // UPDATE PATIENT
  const handleSubmit = (
    values: PatientFormValues
  ) => {
    const patients: PatientItem[] = JSON.parse(
      localStorage.getItem("patients") || "[]"
    );

    const updatedPatients = patients.map(
      (patient) =>
        patient.id === Number(params.id)
          ? {
            ...patient,
            ...values,
          }
          : patient
    );

    localStorage.setItem(
      "patients",
      JSON.stringify(updatedPatients)
    );

    alert("Patient updated successfully");

    router.push("/lab-admin/patients");
  };

  if (loading) {
    return (
      <div className="p-10 text-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen text-black">
      <div className="min-h-screen p-5 sm:p-7 lg:p-10">
        {/* HEADER */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Link
              href="/lab-admin/patients"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-black transition hover:bg-black/10"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>

              <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
                Edit Patient
              </h1>

              <p className=" text-[#64748B]">
                Update patient details
              </p>
            </div>
          </div>


        </div>

        {/* FORM */}
        <div className="mt-8 rounded-3xl border border-black/10 bg-white/3 p-5 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="flex flex-col gap-8">
              {/* NAME */}
              <div className="flex flex-col gap-3">
                <label className="font-medium text-slate-200">
                  Name
                  <span className="text-red-400">
                    *
                  </span>
                </label>

                <Field
                  type="text"
                  name="name"
                  placeholder="Enter patient name"
                  className="rounded-2xl border border-black/10 bg-[#0e151d]/70 px-5 py-4 outline-none transition placeholder:text-slate-500"
                />

                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-400"
                />
              </div>

              {/* MOBILE */}
              <div className="flex flex-col gap-3">
                <label className="font-medium text-slate-200">
                  Mobile
                  <span className="text-red-400">
                    *
                  </span>
                </label>

                <Field
                  type="text"
                  name="mobile"
                  placeholder="Enter mobile number"
                  className="rounded-2xl border border-black/10 bg-[#0e151d]/70 px-5 py-4 outline-none transition placeholder:text-slate-500"
                />

                <ErrorMessage
                  name="mobile"
                  component="p"
                  className="text-red-400"
                />
              </div>

              {/* AGE + GENDER */}
              <div className="grid gap-8 lg:grid-cols-2">
                {/* AGE */}
                <div className="flex flex-col gap-3">
                  <label className="font-medium text-slate-200">
                    Age
                    <span className="text-slate-500">
                      (Optional)
                    </span>
                  </label>

                  <Field
                    type="text"
                    name="age"
                    placeholder="Enter age"
                    className="rounded-2xl border border-black/10 bg-[#0e151d]/70 px-5 py-4 outline-none transition placeholder:text-slate-500"
                  />

                  <ErrorMessage
                    name="age"
                    component="p"
                    className="text-red-400"
                  />
                </div>

                {/* GENDER */}
                <div className="flex flex-col gap-3">
                  <label className="font-medium text-slate-200">
                    Gender
                    <span className="text-red-400">
                      *
                    </span>
                  </label>

                  <Field
                    as="select"
                    name="gender"
                    className="rounded-2xl border border-black/10 bg-[#0e151d]/70 px-5 py-4 text-slate-300 outline-none transition"
                  >
                    <option
                      value=""
                      className="bg-slate-900"
                    >
                      Select gender
                    </option>

                    <option
                      value="Male"
                      className="bg-slate-900"
                    >
                      Male
                    </option>

                    <option
                      value="Female"
                      className="bg-slate-900"
                    >
                      Female
                    </option>

                    <option
                      value="Other"
                      className="bg-slate-900"
                    >
                      Other
                    </option>
                  </Field>

                  <ErrorMessage
                    name="gender"
                    component="p"
                    className="text-red-400"
                  />
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col-reverse gap-4 pt-4 sm:flex-row sm:justify-end">
                <BorderButton
                  text="Cancel"
                  href="/lab-admin/patients"
                />

                <SubmitButton
                  text="Update Patient"
                  type="submit"
                />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}