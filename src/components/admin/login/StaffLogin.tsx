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
  "h-14 w-full rounded-2xl border border-[#45657D]/60 bg-[#07111F] px-5 text-white placeholder:text-[#7F8CA3] outline-none transition-all duration-300 focus:border-[#4E9B95] focus:ring-4 focus:ring-[#3D7773]/10";

const buttonClass =
  "flex h-14 w-full items-center justify-center rounded-2xl bg-[#5C9E98] text-lg font-medium text-white shadow-lg shadow-[#3D7773]/20 transition-all duration-300 hover:bg-[#67ABA5] active:scale-[0.99]";

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
  <div className="relative hidden overflow-hidden border-r border-[#45657D]/20 bg-linear-to-b from-[#181E2B] via-[#243B4A] to-[#3D7773] lg:flex lg:flex-col">
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

          <p className="mt-6  leading-8 text-white/75">
            Securely access patient reports, lab operations, and healthcare
            management tools with HeartView Staff Portal.
          </p>
        </div>

        {/* FEATURES */}
        <div className="mt-10 grid gap-4">
          {features.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/4 px-5 py-4"
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
        <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal   text-white">
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
          console.log(values);

          // staff dashboard redirect
          router.push("/staff-dashboard");
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#060B14] px-4 py-5">
      {/* BG GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1E3A5F22,transparent_55%)]" />

      {/* CARD */}
      <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[34px] border border-[#45657D]/40 bg-[#0B1320]/95 shadow-[0_25px_90px_rgba(0,0,0,0.7)] backdrop-blur-xl lg:min-h-190 lg:grid-cols-[0.72fr_1.18fr]">
        {/* LEFT */}
        <LeftSide />

        {/* RIGHT */}
        <div className="flex items-center justify-center bg-[#07111B] px-6 py-10 sm:px-10 lg:px-14">
          <div className="w-full max-w-xl">
            <StaffLoginPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
