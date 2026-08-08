"use client";

import Link from "next/link";
import { useRouter, usePathname, useParams } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { ArrowLeft } from "lucide-react";
import SubmitButton from "@/Ui/buttons/SubmitButton";
import ResetButton from "@/Ui/buttons/ResetButton";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  getCountries,
  getCountryByCode,
  updateUser,
  addOrUpdateHealth,
  getUserById,
  getHealthById
} from "@/redux/Api";
interface PatientFormValues {
  // STEP 1
  name: string;
  mobile: string;
  email: string;
  dob: string;
  gender: string;
  county: string;
  state: string;

  // STEP 2
  height: string;
  weight: string;
  bloodPressure: string;
  bloodSugar: string;
  heartHistory: string;
  smoking: string;

  patientId: string;
}

interface PatientItem extends PatientFormValues {
  id: number;
  createdAt: string;
}

export default function EditPatientPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const dispatch = useDispatch<AppDispatch>();

  const { countries } = useSelector(
    (state: RootState) => state.getCountries
  );

  const pathname = usePathname();
  const params = useParams();
  const id = params?.id as string;
  const role = pathname.split("/")[1];
const baseUrl = `/${role}`;
  console.log("Role:", role);
  const { user, loading } = useSelector(
    (state: RootState) => state.GetUserById
  );
  const { data: health } = useSelector(
    (state: RootState) => state.getHealthById
  );
  const { country } = useSelector(
    (state: RootState) => state.getCountryByCode
  ); useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
      dispatch(getHealthById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (user?.country) {
      dispatch(getCountryByCode(user.country));
    }
  }, [dispatch, user?.country]);
  useEffect(() => {
  dispatch(getCountries());
}, [dispatch]);
  // STEP 1 VALIDATION
  const step1Schema = Yup.object({
    name: Yup.string().required("Patient name is required"),

    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter valid mobile number")
      .required("Mobile number is required"),

    email: Yup.string().email("Enter valid email"), // not required

    dob: Yup.string().required("Date of birth is required"),

    gender: Yup.string().required("Gender is required"),

    county: Yup.string().required("County is required"),

    state: Yup.string().required("State is required"),
  });

  // STEP 2 VALIDATION
  const step2Schema = Yup.object({
    height: Yup.string().required("Height is required"),
    weight: Yup.string().required("Weight is required"),
    bloodPressure: Yup.string().required("Blood pressure info is required"),
    bloodSugar: Yup.string().required("Blood sugar info is required"),
    heartHistory: Yup.string().required("Heart history is required"),
    smoking: Yup.string().required("Smoking info is required"),
  });

  const validationSchema = step === 1 ? step1Schema : step2Schema;

  const initialValues: PatientFormValues = {
    name: user?.name || "",
    mobile: user?.phone || "",
    email: user?.email || "",
    dob: user?.DOB ? user.DOB.split("T")[0] : "",
    gender: user?.sex || "",
    county: user?.country || "",
    state: user?.state || "",

    height: health?.height_cm?.toString() || "",
    weight: health?.weight_kg?.toString() || "",
    bloodPressure:
      health?.blood_pressure_issue === "none"
        ? "No"
        : "Yes",

    bloodSugar:
      health?.sugar_issue === "none"
        ? "No"
        : "Yes",

    heartHistory:
      health?.heart_problem_history === "none"
        ? "None"
        : health?.heart_problem_history === "family"
          ? "Family"
          : "Self",

    smoking:
      health?.smoking_use === "yes"
        ? "Yes"
        : health?.smoking_use === "past"
          ? "Past"
          : "No",

    patientId: user?._id || "",
  };

  // FINAL SUBMIT (step 2 -> save)
  const handleSubmit = async (
    values: PatientFormValues,
    { resetForm }: FormikHelpers<PatientFormValues>
  ) => {
    try {
      const result = await dispatch(
        addOrUpdateHealth({
          user_id: userId,

          height_cm: Number(values.height),
          weight_kg: Number(values.weight),

          blood_pressure: values.bloodPressure,
          blood_sugar: values.bloodSugar,
          heart_history: values.heartHistory,
          smoking: values.smoking,
        })
      ).unwrap();

      toast.success(result.message);

      resetForm();

      setStep(1);

      setUserId("");

      router.push(`${baseUrl}/patients`);
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="min-h-screen text-black">
      <div className="min-h-screen p-6 md:p-12">
        {/* HEADER */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Link
              href={`${baseUrl}/patients`}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-black transition hover:bg-black/10"
            >
              <ArrowLeft size={20} />
            </Link>

            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
                Edit Patient
              </h1>

              <p className="leading-relaxed font-light text-[#64748B]">
                {step === 1
                  ? "Enter patient details to create a new patient"
                  : "Enter health details of the patient"}
              </p>
            </div>
          </div>

          {/* STEP INDICATOR */}
          <div className="flex items-center gap-3">
            <div
              className={`h-2 w-16 rounded-full ${step === 1 ? "bg-black" : "bg-black/20"
                }`}
            />
            <div
              className={`h-2 w-16 rounded-full ${step === 2 ? "bg-black" : "bg-black/20"
                }`}
            />
          </div>
        </div>

        {/* FORM CARD */}
        <div className="mt-8 rounded-3xl border border-black/10 bg-white/3 p-5 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
          <Formik<PatientFormValues>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ resetForm, validateForm, setTouched, setFieldValue, values }) => (
              <Form className="flex flex-col gap-8">
                {step === 1 && (
                  <>
                    {/* NAME */}
                    <div className="flex flex-col gap-3">
                      <label className="font-medium text-black">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Enter patient name"
                        className="rounded-2xl border border-black/10 bg-[#f7f7f7]/70 px-5 py-4 outline-none transition"
                      />
                      <ErrorMessage name="name" component="p" className="text-red-400" />
                    </div>

                    {/* MOBILE + EMAIL */}
                    <div className="grid gap-8 lg:grid-cols-2">
                      <div className="flex flex-col gap-3">
                        <label className="font-medium text-black">
                          Mobile <span className="text-red-400">*</span>
                        </label>
                        <Field
                          type="text"
                          name="mobile"
                          placeholder="Enter mobile number"
                          className="rounded-2xl border border-black/10 bg-[#f7f7f7]/70 px-5 py-4 outline-none transition"
                        />
                        <ErrorMessage name="mobile" component="p" className="text-red-400" />
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="font-medium text-black">Email</label>
                        <Field
                          type="text"
                          name="email"
                          placeholder="Enter email (optional)"
                          className="rounded-2xl border border-black/10 bg-[#f7f7f7]/70 px-5 py-4 outline-none transition"
                        />
                        <ErrorMessage name="email" component="p" className="text-red-400" />
                      </div>
                    </div>

                    {/* DOB + GENDER */}
                    <div className="grid gap-8 lg:grid-cols-2">
                      <div className="flex flex-col gap-3">
                        <label className="font-medium text-black">
                          Date of Birth <span className="text-red-400">*</span>
                        </label>
                        <Field
                          type="date"
                          name="dob"
                          className="rounded-2xl border border-black/10 bg-[#f7f7f7]/70 px-5 py-4 outline-none transition"
                        />
                        <ErrorMessage name="dob" component="p" className="text-red-400" />
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="font-medium text-black">
                          Gender <span className="text-red-400">*</span>
                        </label>
                        <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-black/10 bg-[#f7f7f7]/70 px-5 py-4">
                          {["male", "female", "other"].map((option) => (
                            <label
                              key={option}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Field
                                type="radio"
                                name="gender"
                                value={option}
                                className="h-4 w-4 accent-black"
                              />
                              <span className="text-black">{option}</span>
                            </label>
                          ))}
                        </div>
                        <ErrorMessage name="gender" component="p" className="text-red-400" />
                      </div>
                    </div>

                    {/* COUNTY + STATE */}
                    <div className="grid gap-8 lg:grid-cols-2">
                      <div className="flex flex-col gap-3">
                        <label className="font-medium text-black">
                          County <span className="text-red-400">*</span>
                        </label>
                        <Field
  as="select"
  name="county"
  value={values.county}
  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;

    setFieldValue("county", code);
    setFieldValue("state", "");

    dispatch(getCountryByCode(code));
  }}
  className="rounded-2xl border border-black/10 bg-[#f7f7f7]/70 px-5 py-4 outline-none"
>
  <option value="">Select Country</option>

  {countries?.map((item) => (
    <option key={item.code} value={item.code}>
      {item.name}
    </option>
  ))}
</Field>
                        <ErrorMessage name="county" component="p" className="text-red-400" />
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="font-medium text-black">
                          State <span className="text-red-400">*</span>
                        </label>
                        <Field
                          as="select"
                          name="state"
                          className="rounded-2xl border border-black/10 bg-[#f7f7f7]/70 px-5 py-4 outline-none"
                        >
                          <option value="">Select State</option>

                          {country?.states?.map((state) => (
                            <option key={state.code} value={state.name}>
                              {state.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="state" component="p" className="text-red-400" />
                      </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex flex-col-reverse gap-4 pt-4 sm:flex-row sm:justify-end">
                      <ResetButton onReset={resetForm} />

                      <SubmitButton
                        text="Continue"
                        type="button"
                        onClick={async () => {
                          setTouched({
                            name: true,
                            mobile: true,
                            email: true,
                            dob: true,
                            gender: true,
                            county: true,
                            state: true,
                          });

                          const errors = await validateForm();

                          const step1Fields: (keyof PatientFormValues)[] = [
                            "name",
                            "mobile",
                            "email",
                            "dob",
                            "gender",
                            "county",
                            "state",
                          ];

                          const hasError = step1Fields.some((field) => errors[field]);

                          if (!hasError) {
                            try {
                              // ✅ NEW: lab-admin/lab-staff ka apna login-time ka token
                              const isLabRole = role === "lab-admin" || role === "lab-staff";

                              const loggedInAccessToken = isLabRole
                                ? localStorage.getItem("accessToken")
                                : undefined;

                              const loggedInRefreshToken = isLabRole
                                ? localStorage.getItem("refreshToken")
                                : undefined;

                              const loggedInFcmToken = isLabRole
                                ? localStorage.getItem("fcmToken")
                                : undefined;

                              const result = await dispatch(
                                updateUser({
                                  name: values.name,
                                  phone: values.mobile,
                                  email: values.email,
                                  DOB: values.dob,
                                  sex: values.gender,
                                  country: values.county,
                                  state: values.state,
                                  role,
                                  // ✅ NEW: sirf lab-admin/lab-staff ke case me bhejo
                                  ...(isLabRole && {
                                    accessToken: loggedInAccessToken || undefined,
                                    refreshToken: loggedInRefreshToken || undefined,
                                    fcmToken: loggedInFcmToken || undefined,
                                  }),
                                })
                              ).unwrap();
                              setUserId(result.userId);

                              toast.success(result.message);

                              setStep(2);
                            } catch (error) {
                              toast.error(error as string);
                            }
                          }
                        }}
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    {/* HEIGHT + WEIGHT */}
                    <div className="grid gap-8 lg:grid-cols-2">
                      <div className="flex flex-col gap-3">
                        <label className="font-medium text-black">
                          Height (cm) <span className="text-red-400">*</span>
                        </label>
                        <Field
                          type="text"
                          name="height"
                          placeholder="Enter height"
                          className="rounded-2xl border border-black/10 bg-[#f7f7f7]/70 px-5 py-4 outline-none transition"
                        />
                        <ErrorMessage name="height" component="p" className="text-red-400" />
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="font-medium text-black">
                          Weight (kg) <span className="text-red-400">*</span>
                        </label>
                        <Field
                          type="text"
                          name="weight"
                          placeholder="Enter weight"
                          className="rounded-2xl border border-black/10 bg-[#f7f7f7]/70 px-5 py-4 outline-none transition"
                        />
                        <ErrorMessage name="weight" component="p" className="text-red-400" />
                      </div>
                    </div>

                    {/* BLOOD PRESSURE + BLOOD SUGAR */}
                    <div className="grid gap-8 lg:grid-cols-2">
                      <div className="flex flex-col gap-3">
                        <label className="font-medium text-black">
                          Blood Pressure <span className="text-red-400">*</span>
                        </label>
                        <div className="flex items-center gap-6 rounded-2xl border border-black/10 bg-[#f7f7f7]/70 px-5 py-4">
                          {["Yes", "No"].map((option) => (
                            <label key={option} className="flex items-center gap-2 cursor-pointer">
                              <Field
                                type="radio"
                                name="bloodPressure"
                                value={option}
                                className="h-4 w-4 accent-black"
                              />
                              <span className="text-black">{option}</span>
                            </label>
                          ))}
                        </div>
                        <ErrorMessage name="bloodPressure" component="p" className="text-red-400" />
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="font-medium text-black">
                          Blood Sugar <span className="text-red-400">*</span>
                        </label>
                        <div className="flex items-center gap-6 rounded-2xl border border-black/10 bg-[#f7f7f7]/70 px-5 py-4">
                          {["Yes", "No"].map((option) => (
                            <label key={option} className="flex items-center gap-2 cursor-pointer">
                              <Field
                                type="radio"
                                name="bloodSugar"
                                value={option}
                                className="h-4 w-4 accent-black"
                              />
                              <span className="text-black">{option}</span>
                            </label>
                          ))}
                        </div>
                        <ErrorMessage name="bloodSugar" component="p" className="text-red-400" />
                      </div>
                    </div>

                    {/* HEART HISTORY + SMOKING */}
                    <div className="grid gap-8 lg:grid-cols-2">
                      <div className="flex flex-col gap-3">
                        <label className="font-medium text-black">
                          Heart History <span className="text-red-400">*</span>
                        </label>
                        <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-black/10 bg-[#f7f7f7]/70 px-5 py-4">
                          {["Self", "Family", "None"].map((option) => (
                            <label key={option} className="flex items-center gap-2 cursor-pointer">
                              <Field
                                type="radio"
                                name="heartHistory"
                                value={option}
                                className="h-4 w-4 accent-black"
                              />
                              <span className="text-black">{option}</span>
                            </label>
                          ))}
                        </div>
                        <ErrorMessage name="heartHistory" component="p" className="text-red-400" />
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="font-medium text-black">
                          Smoking <span className="text-red-400">*</span>
                        </label>
                        <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-black/10 bg-[#f7f7f7]/70 px-5 py-4">
                          {["Yes", "No", "Past"].map((option) => (
                            <label key={option} className="flex items-center gap-2 cursor-pointer">
                              <Field
                                type="radio"
                                name="smoking"
                                value={option}
                                className="h-4 w-4 accent-black"
                              />
                              <span className="text-black">{option}</span>
                            </label>
                          ))}
                        </div>
                        <ErrorMessage name="smoking" component="p" className="text-red-400" />
                      </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex flex-col-reverse gap-4 pt-4 sm:flex-row sm:justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="rounded-2xl border border-black/10 px-8 py-4 font-medium text-black transition hover:bg-black/5"
                      >
                        Back
                      </button>

                      <div className="flex flex-col-reverse gap-4 sm:flex-row">
                        <ResetButton
                          onReset={() => {
                            resetForm();
                            setStep(1);
                          }}
                        />
                        <SubmitButton text="Save" type="submit"></SubmitButton>
                      </div>
                    </div>
                  </>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}