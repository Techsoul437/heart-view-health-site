"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, ShieldCheck, ClipboardList, ScrollText, Settings2 } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

interface LoginValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

// ─────────────────────────────────────────────────────────────
// VALIDATION
// ─────────────────────────────────────────────────────────────

const loginSchema = Yup.object({
  email: Yup.string().email("Enter a valid email address").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  rememberMe: Yup.boolean(),
});

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const features: Feature[] = [
  {
    icon: ShieldCheck,
    title: "Lab Onboarding & Verification",
    description: "Review and approve new diagnostic labs onto the HeartView platform.",
  },
  {
    icon: ClipboardList,
    title: "Report Monitoring & Review",
    description: "Oversee patient reports, flag anomalies, and ensure delivery accuracy.",
  },
  {
    icon: ScrollText,
    title: "Audit Logs & Compliance",
    description: "Access tamper-proof logs for regulatory and internal compliance needs.",
  },
  {
    icon: Settings2,
    title: "System Administration Tools",
    description: "Manage roles, permissions, integrations, and platform configurations.",
  },
];

// ─────────────────────────────────────────────────────────────
// SHARED STYLES
// ─────────────────────────────────────────────────────────────

const inputBase =
  "h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-[#2f5ba5] focus:bg-white focus:ring-4 focus:ring-[#2f5ba5]/10";

// ─────────────────────────────────────────────────────────────
// LEFT SIDE
// ─────────────────────────────────────────────────────────────

const LeftSide = () => (
  <div className="relative hidden overflow-hidden bg-[#050d1a] lg:flex lg:flex-col">
    {/* Subtle grid texture */}
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(47,91,165,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(47,91,165,0.07)_1px,transparent_1px)] bg-[size:32px_32px]" />

    {/* Radial glow */}
    <div className="pointer-events-none absolute left-0 top-0 h-[480px] w-[480px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-[#2f5ba5] opacity-[0.08] blur-[100px]" />

    <div className="relative z-10 flex h-full flex-col p-10">
      {/* LOGO */}
      <div className="relative h-12 w-40">
        <Image
          src="/APP ICONSM.png"
          alt="HeartView Health"
          fill
          priority
          className="object-contain object-left"
        />
      </div>

      {/* HEADLINE */}
      <div className="mt-16 max-w-sm">
        <span className="inline-block rounded-full border border-[#2f5ba5]/40 bg-[#2f5ba5]/10 px-3 py-1 text-xs font-medium tracking-widest text-[#7aaeff] uppercase">
          Admin Portal
        </span>
        <h1 className="mt-5 text-3xl font-semibold leading-tight text-white xl:text-4xl xl:leading-snug">
          HeartView <br />
          Admin Portal
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-400">
          Secure access for HeartView administrators to manage labs, monitor reports, review
          system activity, and support platform operations.
        </p>
      </div>

      {/* FEATURES */}
      <div className="mt-10 flex flex-1 flex-col justify-end gap-3">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.04] px-5 py-4 backdrop-blur-sm"
          >
            <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#2f5ba5]/20">
              <Icon className="h-4 w-4 text-[#7aaeff]" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{title}</p>
              <p className="mt-0.5 text-xs leading-5 text-slate-500">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// LOGIN PANEL
// ─────────────────────────────────────────────────────────────

const AdminLoginPanel = () => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  const initialValues: LoginValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const handleSubmit = (values: LoginValues, { setSubmitting }: { setSubmitting: (v: boolean) => void }) => {
    const adminUser = {
      id: 1,
      fullName: "HeartView Administrator",
      role: "HeartView Admin",
      status: "Active",
      permissions: [
        "lab_management",
        "report_monitoring",
        "audit_logs",
        "user_management",
        "system_settings",
      ],
    };

    if (values.rememberMe) {
      localStorage.setItem("heartViewAdmin", JSON.stringify(adminUser));
    } else {
      sessionStorage.setItem("heartViewAdmin", JSON.stringify(adminUser));
    }

    router.push("/heartview-admin/dashboard");
    setSubmitting(false);
  };

  return (
    <>
      {/* HEADER */}
      <div className="mb-8">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#2f5ba5]/10 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2f5ba5]" />
          <span className="text-xs font-medium text-[#2f5ba5]">Secure Admin Access</span>
        </div>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900 xl:text-3xl">
          Welcome Back, Admin
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Sign in to access the HeartView Administration Portal
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-5" noValidate>
            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-medium text-slate-700"
              >
                Email Address
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="admin@heartview.health"
                className={`${inputBase} ${
                  errors.email && touched.email
                    ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400/10"
                    : ""
                }`}
              />
              <ErrorMessage
                name="email"
                component="p"
                className="mt-1.5 text-xs text-red-500"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-medium text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <Field
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={`${inputBase} pr-12 ${
                    errors.password && touched.password
                      ? "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400/10"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="p"
                className="mt-1.5 text-xs text-red-500"
              />
            </div>

            {/* REMEMBER ME + FORGOT PASSWORD */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2.5">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-[#2f5ba5]"
                />
                <span className="text-xs text-slate-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-xs font-medium text-[#2f5ba5] transition-colors hover:text-[#1e3f7a] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative flex h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-[#2f5ba5] text-sm font-semibold text-white shadow-lg shadow-[#2f5ba5]/30 transition-all duration-200 hover:bg-[#274e91] hover:shadow-[#2f5ba5]/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 20v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    />
                  </svg>
                  Signing in…
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </Form>
        )}
      </Formik>

      {/* FOOTER NOTE */}
      <p className="mt-8 text-center text-xs text-slate-400">
        Admin accounts are by invitation only.{" "}
        <span className="text-slate-500">Contact your system administrator for access.</span>
      </p>
    </>
  );
};

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4 py-8">
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#dbeafe,transparent_60%),radial-gradient(ellipse_at_bottom_right,#e0e7ff,transparent_60%)]" />

      {/* CARD */}
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[32px] shadow-[0_32px_80px_rgba(0,0,0,0.18)] lg:min-h-[680px] lg:grid-cols-[1fr_1.2fr]">
        {/* LEFT */}
        <LeftSide />

        {/* RIGHT */}
        <div className="flex items-center justify-center bg-white px-6 py-12 sm:px-10 lg:px-14">
          <div className="w-full max-w-sm">
            <AdminLoginPanel />
          </div>
        </div>
      </div>
    </div>
  );
}