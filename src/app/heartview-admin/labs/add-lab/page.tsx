"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import ResetButton from "@/Ui/buttons/ResetButton";
import SubmitButton from "@/Ui/buttons/SubmitButton";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { registerLabAdmin } from "@/redux/Api";
const labschema = Yup.object({
  labName: Yup.string()
    .trim()
    .min(3, "Minimum 3 characters required")
    .max(100, "Maximum 100 characters allowed")
    .required("Lab name is required"),



  email: Yup.string()
    .email("Enter valid email")
    .required("Email is required"),

  mobile: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter valid mobile number")
    .required("Mobile number is required"),



  contactPerson: Yup.string()
    .trim()
    .min(3, "Minimum 3 characters required")
    .required("Contact person is required"),



  address: Yup.string()
    .trim()
    .min(10, "Address is too short")
    .required("Address is required"),

  city: Yup.string().required("City is required"),

  state: Yup.string().required("State is required"),

  pincode: Yup.string()
    .matches(/^[1-9][0-9]{5}$/, "Enter valid pincode")
    .required("Pincode is required"),

});
export default function AddLabPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [labs, setlabs] = useState<any[]>([]);
  useEffect(() => {
    const loadlabs = () => {
      const storedlabs = JSON.parse(
        localStorage.getItem("labs") || "[]"
      );

      setlabs(storedlabs);
    };

    loadlabs();

    window.addEventListener("storage", loadlabs);

    return () =>
      window.removeEventListener("storage", loadlabs);
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
          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl  font-normal tracking-tight text-black">

            Add lab
          </h1>

          <p className=" leading-relaxed  font-light  text-[#64748B]
">
            Enter lab details to create a new lab
          </p>
        </div>
      </div>

      <Formik
        initialValues={{
          labName: "",
          labCode: "",
          email: "",
          mobile: "",
          alternateMobile: "",
          contactPerson: "",
          branchName: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          gstNumber: "",
          panNumber: "",
          labType: "Pathology",
          password: "password123",
        }}
        validationSchema={labschema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const payload = {
                fullName: values.contactPerson,
                email: values.email,
                password: values.password,
                mobile: values.mobile,
                labName: values.labName,
                labType: values.labType,
                city: values.city,
                branchName: values.branchName,
                address: values.address,
                state: values.state,
                pincode: values.pincode,
            };

            const response = await dispatch(registerLabAdmin(payload)).unwrap();
            
            if (response.success) {
                toast.success("Lab added successfully");
                setTimeout(() => {
                  router.push("/heartview-admin/labs");
                }, 1000);
            } else {
                toast.error(response.message || "Failed to add lab");
            }
          } catch (error: unknown) {
            toast.error(typeof error === "string" ? error : ("Something went wrong"));
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          touched,
          errors,
          resetForm,
          isSubmitting,
        }) => (
          <Form>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                {/* Lab Name */}
                <div>
                  <label className="mb-2 block font-medium">
                    Lab Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="labName"
                    placeholder="Enter lab name"
                    className={`h-14 w-full rounded-xl border px-4 ${touched.labName && errors.labName
                        ? "border-red-500"
                        : "border-slate-300"
                      }`}
                  />
                  <ErrorMessage
                    name="labName"
                    component="p"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>



                {/* Email */}
                <div>
                  <label className="mb-2 block font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="lab@example.com"
                    className={`h-14 w-full rounded-xl border px-4 ${touched.email && errors.email
                        ? "border-red-500"
                        : "border-slate-300"
                      }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label className="mb-2 block font-medium">
                    Mobile <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="mobile"
                    placeholder="9876543210"
                    className={`h-14 w-full rounded-xl border px-4 ${touched.mobile && errors.mobile
                        ? "border-red-500"
                        : "border-slate-300"
                      }`}
                  />
                  <ErrorMessage
                    name="mobile"
                    component="p"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>



                {/* Contact Person */}
                <div>
                  <label className="mb-2 block font-medium">
                    Contact Person <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="contactPerson"
                    placeholder="Enter contact person"
                    className={`h-14 w-full rounded-xl border px-4 ${touched.contactPerson && errors.contactPerson
                        ? "border-red-500"
                        : "border-slate-300"
                      }`}
                  />
                  <ErrorMessage
                    name="contactPerson"
                    component="p"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                {/* Branch Name */}
                <div>
                  <label className="mb-2 block font-medium">
                    Branch Name
                  </label>
                  <Field
                    name="branchName"
                    placeholder="Main Branch"
                    className={`h-14 w-full rounded-xl border px-4 ${touched.branchName && errors.branchName
                        ? "border-red-500"
                        : "border-slate-300"
                      }`}
                  />
                  <ErrorMessage
                    name="branchName"
                    component="p"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>





                {/* City */}
                <div>
                  <label className="mb-2 block font-medium">
                    City <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="city"
                    placeholder="Surat"
                    className={`h-14 w-full rounded-xl border px-4 ${touched.city && errors.city
                        ? "border-red-500"
                        : "border-slate-300"
                      }`}
                  />
                </div>

                {/* State */}
                <div>
                  <label className="mb-2 block font-medium">
                    State <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="state"
                    placeholder="Gujarat"
                    className={`h-14 w-full rounded-xl border px-4 ${touched.state && errors.state
                        ? "border-red-500"
                        : "border-slate-300"
                      }`}
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="mb-2 block font-medium">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="pincode"
                    placeholder="395006"
                    className={`h-14 w-full rounded-xl border px-4 ${touched.pincode && errors.pincode
                        ? "border-red-500"
                        : "border-slate-300"
                      }`}
                  />
                </div>

              </div>

              {/* Address */}
              <div className="mt-6">
                <label className="mb-2 block font-medium">
                  Address <span className="text-red-500">*</span>
                </label>
                <Field
                  as="textarea"
                  rows={4}
                  name="address"
                  placeholder="Enter complete address"
                  className="w-full rounded-xl border border-slate-300 p-4"
                />
                <ErrorMessage
                  name="address"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>



              <div className="mt-8 flex justify-end gap-4">
                <ResetButton onReset={resetForm} />
                <SubmitButton
                  text="Save Lab"
                  type="submit"
                />
              </div>

            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setlabs(storedlabs: any) {
  throw new Error("Function not implemented.");
}
