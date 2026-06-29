"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, ShieldCheck, FileHeart, BadgeCheck, Sparkles } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const inputClass =
  "h-12 w-full rounded-2xl border border-[#2f5ba5]/60 bg-white px-5 text-black placeholder:text-[#7F8CA3] outline-none transition-all duration-300 focus:border-[#2f5ba5] focus:ring-4 focus:ring-[#2f5ba5]/10";

const buttonClass =
  "flex h-12 w-full items-center justify-center rounded-2xl bg-linear-to-r from-[#2f5ba5]/70 to-[#4a7bc9]/60 text-white transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]";

const features = [
  { icon: FileHeart, title: "Easy report upload" },
  { icon: ShieldCheck, title: "Secure patient data" },
  { icon: BadgeCheck, title: "Instant report delivery" },
  { icon: Sparkles, title: "Smart health insights" },
];

const LeftSide = () => (
  <div className="relative flex flex-col bg-black lg:border-r lg:border-[#45657D]/20">
    <div className="relative z-10 flex h-full flex-col p-7 xl:p-9 gap-6">
      {/* LOGO */}
      <div className="relative h-12 w-36 shrink-0">
        <Image
          src="/APP ICONSM.png"
          alt="HeartView Health logo"
          fill
          priority
          className="object-contain object-left"
        />
      </div>

      {/* TITLE + DESC */}
      <div className="shrink-0">
        <h2 className="text-xl lg:text-2xl xl:text-3xl font-medium leading-tight text-white">
          Staff Portal Access
        </h2>
        <p className="mt-3 hidden lg:block leading-6 text-[#64748B] text-sm">
          Securely access patient reports, lab operations, and healthcare
          management tools with HeartView Staff Portal.
        </p>
      </div>

      {/* FEATURES — only on lg+ */}
      <div className="hidden lg:flex flex-col gap-3 shrink-0">
        {features.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3"
          >
            <h3 className="font-medium text-white text-sm">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const StaffLoginPanel = () => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  return (
    <>
      <div className="mb-7">
        <h2 className="text-2xl lg:text-3xl xl:text-4xl font-normal text-black">
          Welcome Back!
        </h2>
        <p className="mt-2 text-[#94A3B8] text-sm">
          Sign in to access your HeartView Staff Portal
        </p>
      </div>

      <Formik
        initialValues={{ email: "", password: "" }}
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
          localStorage.setItem("staffUser", JSON.stringify(staffUser));
          router.push("/lab-staff/dashboard");
        }}
      >
        <Form className="space-y-4">
          <div>
            <Field
              name="email"
              type="email"
              placeholder="Enter email address"
              className={inputClass}
            />
            <ErrorMessage name="email" component="div" className="mt-1.5 text-sm text-red-400" />
          </div>

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
              {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            <ErrorMessage name="password" component="div" className="mt-1.5 text-sm text-red-400" />
          </div>

          <button type="submit" className={buttonClass}>
            Sign In
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default function StaffLoginPage() {
  return (
    // KEY FIX: h-dvh for dynamic viewport height (handles mobile browser chrome)
    // overflow-hidden prevents any outer scroll
    <div className="relative flex h-dvh w-screen items-center justify-center overflow-hidden bg-white p-4">
      {/* BG GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1E3A5F22,transparent_55%)]" />

      {/* CARD
          KEY FIX:
          - w-full max-w-5xl keeps it contained horizontally
          - NO fixed height — let content define it
          - max-h ensures it never exceeds viewport
          - The card itself does NOT scroll (overflow-hidden)
      */}
    <div
  className="
    relative z-10
    w-full max-w-sm sm:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl
    overflow-hidden
    rounded-[28px]
    bg-white
    shadow-[0_25px_90px_rgba(0,0,0,0.45)]
    grid
    grid-cols-1
    lg:grid-cols-[0.75fr_1.25fr]
  "
  style={{ maxHeight: "calc(100dvh - 2rem)" }}
>
        {/* LEFT */}
        <LeftSide />

        {/* RIGHT */}
        <div className="flex items-center justify-center bg-white px-7 py-8 sm:px-10 lg:px-12 xl:px-14">
          <div className="w-full max-w-md">
            <StaffLoginPanel />
          </div>
        </div>
      </div>
    </div>
  );
}