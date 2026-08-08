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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getLabById, updateLab } from "@/redux/Api";
import { useParams } from "next/navigation";
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
export default function EditLabPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const id = params.id as string;

  const { lab: labData, loading } = useSelector((state: RootState) => state.getlabbyid);

  useEffect(() => {
    if (id) {
        dispatch(getLabById(id));
    }
  }, [id, dispatch]);
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
            Edit Lab
          </h1>

          <p className=" leading-relaxed  font-light  text-[#64748B]">
            Update the lab details
          </p>
        </div>
      </div>

      <Formik
        enableReinitialize={true}
        initialValues={{
          labName: labData?.labName || "",
          labCode: labData?.labCode || "",
          email: labData?.email || "",
          mobile: labData?.mobile || "",
          alternateMobile: labData?.alternateMobile || "",
          contactPerson: labData?.fullName || "", // API might return fullName for contactPerson
          branchName: labData?.branchName || "",
          address: labData?.address || "",
          city: labData?.city || "",
          state: labData?.state || "",
          pincode: labData?.pincode || "",
          gstNumber: labData?.gstNumber || "",
          panNumber: labData?.panNumber || "",
          labType: labData?.labType || "Pathology",
          password: "", // Leave blank for edit
        }}
        validationSchema={labschema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const formData = new FormData();
            formData.append("fullName", values.contactPerson);
            formData.append("email", values.email);
            if (values.password) {
                formData.append("password", values.password);
            }
            formData.append("mobile", values.mobile);
            formData.append("labName", values.labName);
            formData.append("labType", values.labType);
            formData.append("city", values.city);
            if (values.branchName) formData.append("branchName", values.branchName);
            if (values.address) formData.append("address", values.address);
            if (values.state) formData.append("state", values.state);
            if (values.pincode) formData.append("pincode", values.pincode);

            const response = await dispatch(updateLab({ id, data: formData })).unwrap();
            
            if (response.success) {
                toast.success("Lab updated successfully");
                setTimeout(() => {
                  router.push("/heartview-admin/labs");
                }, 1000);
            } else {
                toast.error(response.message || "Failed to update lab");
            }
          } catch (error: unknown) {
            toast.error(typeof error === "string" ? error : (error instanceof Error ? error.message : "Something went wrong"));
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
                  text="Update Lab"
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
