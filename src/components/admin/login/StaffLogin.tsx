"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  Eye,
  EyeOff,
  ShieldCheck,
  FileHeart,
  BadgeCheck,
  Sparkles,
} from "lucide-react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// ─────────────────────────────────────────────────────────────
// VALIDATION
// ─────────────────────────────────────────────────────────────

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// ─────────────────────────────────────────────────────────────
// COMMON CLASSES
// ─────────────────────────────────────────────────────────────

const inputClass =
  "h-13 w-full rounded-2xl border border-[#2f5ba5]/60 bg-white px-5 text-black placeholder:text-[#7F8CA3] outline-none transition-all duration-300 focus:border-[#2f5ba5]  focus:ring-4 focus:ring-[#2f5ba5]/10";

const buttonClass =
  "flex h-13 w-full items-center justify-center rounded-2xl bg-linear-to-r from-[#2f5ba5]/70 to-[#4a7bc9]/60 text-white  transition-all duration-300 hover:scale-[1.01] hover:bg-[#56A29B] active:scale-[0.99]";

// ─────────────────────────────────────────────────────────────
// LEFT SIDE
// ─────────────────────────────────────────────────────────────

const features = [
  { icon: FileHeart, title: "Easy report upload" },
  { icon: ShieldCheck, title: "Secure patient data" },
  { icon: BadgeCheck, title: "Instant report delivery" },
  { icon: Sparkles, title: "Smart health insights" },
];

const LeftSide = () => (
  <div className="relative hidden overflow-hidden border-r border-[#45657D]/20 bg-black lg:flex lg:flex-col">
    <div className="relative z-10 flex h-full flex-col justify-between p-10">
      {/* LOGO */}
      <div className="flex justify-start">
        <div className="relative h-16 w-44">
          <Image
            src="/APP ICONSM.png"
            alt="HeartView Health logo"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col justify-center">
        <div className="max-w-md">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-medium leading-tight text-white  xl:leading-13">
            Staff Portal Access
          </h2>

          <p className="mt-6  leading-8 text-[#64748B] ">
            Securely access patient reports, lab operations, and healthcare
            management tools with HeartView Staff Portal.
          </p>
        </div>

        {/* FEATURES */}
        <div className="mt-10 grid gap-4">
          {features.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white/4 px-5 py-4"
            >


              <h3 className=" font-medium text-white">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// LOGIN PANEL
// ─────────────────────────────────────────────────────────────

const StaffLoginPanel = () => {
  const router = useRouter();

  const [showPass, setShowPass] = useState(false);

  return (
    <>
      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl  font-normal   text-black">
          Welcome Back!
        </h2>

        <p className="mt-3  text-[#94A3B8]">
          Sign in to access your HeartView Staff Portal
        </p>
      </div>

      {/* FORM */}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}

        onSubmit={(values) => {
          const staffUser = {
            id: 1,
            fullName: "Lab Staff User",
            email: values.email,
            phone: "+91 9876543210",
            department: "Laboratory",
            dob: "01 Jan 1995",
            address: "Ahmedabad, Gujarat",
            role: "Lab Staff",
            joinedOn: "10 Mar 2024",
            status: "Active",
          };

          localStorage.setItem(
            "staffUser",
            JSON.stringify(staffUser)
          );

          router.push("/lab-staff/dashboard");
        }}
      >
        <Form className="space-y-6">
          {/* EMAIL */}
          <div>
            <Field
              name="email"
              type="email"
              placeholder="Enter email address"
              className={inputClass}
            />

            <ErrorMessage
              name="email"
              component="div"
              className="mt-2 text-sm text-red-400"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Field
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Enter password"
              className={`${inputClass} pr-14`}
            />

            <button
              type="button"
              onClick={() => setShowPass((p) => !p)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-[#8FA6C1]"
            >
              {showPass ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>

            <ErrorMessage
              name="password"
              component="div"
              className="mt-2 text-sm text-red-400"
            />
          </div>

          {/* LOGIN BTN */}
          <button type="submit" className={buttonClass}>
            Sign In
          </button>

          {/* FORGOT PASSWORD */}
        </Form>
      </Formik>


    </>
  );
};

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────

export default function StaffLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-5">
      {/* BG GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1E3A5F22,transparent_55%)]" />

      {/* CARD */}
      <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[34px]  bg-white shadow-[0_25px_90px_rgba(0,0,0,0.7)] backdrop-blur-xl lg:min-h-190 lg:grid-cols-[0.72fr_1.18fr]">
        {/* LEFT */}
        <LeftSide />

        {/* RIGHT */}
        <div className="flex items-center justify-center bg-white px-6 py-10 sm:px-10 lg:px-14">
          <div className="w-full max-w-xl">
            <StaffLoginPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
