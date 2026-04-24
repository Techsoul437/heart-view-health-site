"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    FiPhone,
    FiMail,
    FiMapPin,
    FiX,
    FiCheckCircle,
    FiAlertCircle,
    FiInfo,
    FiAlertTriangle,
} from "react-icons/fi";
import { RiInstagramLine } from "react-icons/ri";
import MapSection from "./MapSection";
import ReCAPTCHA from "react-google-recaptcha";
import type { Variants } from "framer-motion";
import Headerbadge from "@/Ui/Headerbadge/Headerbadge";

// ─── Env ───────────────────────────────────────────────────────────────────────
// NEXT_PUBLIC_ vars are inlined at build time — never guard with && in JSX
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string;
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ─── Validation ───────────────────────────────────────────────────────────────
const validationSchema = Yup.object({
    name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
    email: Yup.string()
        .email("Enter a valid email address")
        .required("Email is required"),
    phone: Yup.string()
        .matches(/^[0-9]+$/, "Only numbers are allowed")
        .min(10, "Phone number must be 10 digits")
        .max(10, "Phone number must be 10 digits")
        .required("Phone is required"),
    message: Yup.string()
        .min(10, "Message must be at least 10 characters")
        .required("Message is required"),
});

// ─── Types ────────────────────────────────────────────────────────────────────
type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
    id: number;
    type: ToastType;
    title: string;
    message: string;
}

// ─── Toast Config ─────────────────────────────────────────────────────────────
const toastStyles: Record<
    ToastType,
    { bg: string; border: string; icon: React.ElementType; iconColor: string }
> = {
    success: {
        bg: "#1a3d2e",
        border: "#2ecc71",
        icon: FiCheckCircle,
        iconColor: "#2ecc71",
    },
    error: {
        bg: "#3d1a1a",
        border: "#e74c3c",
        icon: FiAlertCircle,
        iconColor: "#e74c3c",
    },
    info: {
        bg: "#1a2a3d",
        border: "#3498db",
        icon: FiInfo,
        iconColor: "#3498db",
    },
    warning: {
        bg: "#3d2e1a",
        border: "#f39c12",
        icon: FiAlertTriangle,
        iconColor: "#f39c12",
    },
};

// ─── Toast Component ──────────────────────────────────────────────────────────
function ToastItem({
    toast,
    onClose,
}: {
    toast: Toast;
    onClose: (id: number) => void;
}) {
    const style = toastStyles[toast.type];
    const Icon = style.icon;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 80, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
                background: style.bg,
                borderLeft: `4px solid ${style.border}`,
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                padding: "14px 16px",
                borderRadius: "10px",
                minWidth: "300px",
                maxWidth: "360px",
                boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.06)`,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Progress bar */}
            <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 3.5, ease: "linear" }}
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "2px",
                    width: "100%",
                    background: style.border,
                    transformOrigin: "left",
                    opacity: 0.6,
                }}
            />

            {/* Icon */}
            <div style={{ marginTop: "1px" }}>
                <Icon size={20} color={style.iconColor} />
            </div>

            {/* Text */}
            <div style={{ flex: 1 }}>
                <p
                    style={{
                        margin: 0,
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "#fff",
                        letterSpacing: "0.01em",
                    }}
                >
                    {toast.title}
                </p>
                <p
                    style={{
                        margin: "3px 0 0",
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.65)",
                        lineHeight: 1.5,
                    }}
                >
                    {toast.message}
                </p>
            </div>

            {/* Close */}
            <button
                onClick={() => onClose(toast.id)}
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.4)",
                    padding: 0,
                    marginTop: "1px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <FiX size={16} />
            </button>
        </motion.div>
    );
}

// ─── Toast Container ──────────────────────────────────────────────────────────
function ToastContainer({
    toasts,
    onClose,
}: {
    toasts: Toast[];
    onClose: (id: number) => void;
}) {
    return (
        <div
            style={{
                position: "fixed",
                top: "24px",
                right: "24px",
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                pointerEvents: "none",
            }}
        >
            <AnimatePresence mode="sync">
                {toasts.map((t) => (
                    <div key={t.id} style={{ pointerEvents: "all" }}>
                        <ToastItem toast={t} onClose={onClose} />
                    </div>
                ))}
            </AnimatePresence>
        </div>
    );
}

// ─── Framer Variants ──────────────────────────────────────────────────────────
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
};

const errorVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: { opacity: 1, height: "auto", marginTop: 4 },
    exit: { opacity: 0, height: 0, marginTop: 0 },
};

function ErrorMsg({ msg }: { msg?: string }) {
    return (
        <AnimatePresence>
            {msg && (
                <motion.p
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="text-red-400 text-xs overflow-hidden"
                >
                    {msg}
                </motion.p>
            )}
        </AnimatePresence>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Contact() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    // FIX 1: useRef instead of let — so counter never resets on re-render
    const toastCounter = useRef(0);

    // FIX 2: ref typed correctly (no non-null assertion needed at call site)
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const addToast = (type: ToastType, title: string, message: string) => {
        // FIX 1 (continued): increment ref, not local var
        const id = ++toastCounter.current + Date.now();
        setToasts((prev) => [...prev, { id, type, title, message }]);
        setTimeout(() => removeToast(id), 3500);
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const formik = useFormik({
        initialValues: { name: "", email: "", phone: "", message: "" },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const token = recaptchaRef.current?.getValue() || "";

                if (!token) {
                    addToast("error", "Captcha Required", "Please verify captcha");
                    return;
                }

                const res = await fetch(`${API_URL}/contact`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...values, captcha: token }),
                });

                const data = await res.json();

                if (!res.ok) throw new Error(data.message);

                addToast("success", "Message Sent!", data.message);
                resetForm();

                // FIX 3: reset captcha after successful submission
                recaptchaRef.current?.reset();
            } catch (error) {
                console.error(error);
                addToast(
                    "error",
                    "Submission Failed",
                    "Something went wrong. Please try again."
                );
            }
        },
    });
    const [countryCode, setCountryCode] = useState("+91");

    const inputClass = (field: keyof typeof formik.values) =>
        `w-full border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-400 outline-none transition-colors duration-200 focus:ring-1 bg-transparent ${
            formik.touched[field] && formik.errors[field]
                ? "border-red-400 focus:border-red-400 focus:ring-red-300/30"
                : "border-[#c5d5d3] focus:border-[#3D7773] focus:ring-[#3D7773]/20"
        }`;

    return (
        <>
            {/* ── Toast Portal ─────────────────────────────────────── */}
            <ToastContainer toasts={toasts} onClose={removeToast} />

            {/* ── Page ─────────────────────────────────────────────── */}
            <section className="w-full pt-5 md:pt-8 lg:pt-20 px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-20 mt-0 lg:mt-15">
                <div className="max-w-8xl mx-auto">

                    {/* Header */}
                    <Headerbadge tag="Contact Us" text="Let&apos;s Connect" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:pt-10 overflow-visible rounded-2xl">

                        {/* LEFT — Info */}
                        <div className="flex flex-col gap-6 sm:gap-8 mt-5 lg:mt-0">
                            <div>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-zinc-100">
                                    Get In Touch
                                </h2>
                                <p className="text-zinc-500 mt-3 text-base sm:text-lg xl:max-w-lg leading-relaxed font-light">
                                    We&apos;re here to answer your questions and guide you toward
                                    better health. Reach out anytime — we love to hear from you.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-stretch">

                                {/* Left side — 2 small cards */}
                                <div className="flex flex-col gap-3">

                                    {/* Phone */}
                                    <div className="flex items-start gap-3 p-5 lg:h-25 rounded-xl border border-[#3D7773]">
                                        <div className="w-8 h-8 rounded-lg bg-[#3D7773] flex items-center justify-center">
                                            <FiPhone className="text-white text-sm" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-lg">Phone</p>
                                            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-light mt-0.5">
                                                +91 8238524984
                                            </p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start gap-3 p-5 lg:h-25 rounded-xl border border-[#3D7773]">
                                        <div className="w-8 h-8 rounded-lg bg-[#3D7773] flex items-center justify-center">
                                            <FiMail className="text-white text-sm" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-lg">Email</p>
                                            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-light mt-0.5">
                                                info@heartviewhealth.com
                                            </p>
                                        </div>
                                    </div>

                                </div>

                                {/* Right side — big address card */}
                                <div className="flex items-start gap-3 p-5 lg:h-52 rounded-xl border border-[#3D7773]">
                                    <div className="w-8 h-8 rounded-lg bg-[#3D7773] flex items-center justify-center">
                                        <FiMapPin className="text-white text-sm" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium text-lg">Address</p>
                                        <p className="text-zinc-400 text-base sm:text-lg font-light mt-0.5 leading-relaxed">
                                            19, Arth Residency, Near V.I.P. Circle,
                                            <br />
                                            Beside Indian Oil Petrol Pump, Utran,
                                            <br />
                                            Surat – 394105, Gujarat, India
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* RIGHT — Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 32 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.55, ease: "easeOut" }}
                            className="p-5 md:p-5 lg:p-4 xl:p-12 flex flex-col gap-5 mt-5 lg:mt-0 rounded-lg border border-[#3D7773]"
                        >
                            <form
                                onSubmit={formik.handleSubmit}
                                noValidate
                                className="flex flex-col gap-5 h-full"
                            >
                                {/* Name + Email */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-zinc-300 font-medium text-lg mb-1.5">
                                            Name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={inputClass("name")}
                                        />
                                        <ErrorMsg
                                            msg={
                                                formik.touched.name
                                                    ? formik.errors.name
                                                    : undefined
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-zinc-300 font-medium text-lg mb-1.5">
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={inputClass("email")}
                                        />
                                        <ErrorMsg
                                            msg={
                                                formik.touched.email
                                                    ? formik.errors.email
                                                    : undefined
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                              <div>
                                        <label className="block text-zinc-300 font-medium text-lg mb-1.5">
                                            Phone
                                        </label>

                                        <div className="flex border border-gray-100 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-[#3D7773]/20">

                                            {/* Country Code */}
                                            <div className="relative">
                                                <select
                                                    value={countryCode}
                                                    onChange={(e) => setCountryCode(e.target.value)}
                                                    className="appearance-none bg-transparent text-white pl-3 pr-8 py-2.5 outline-none border-r border-[#3D7773]"
                                                >
                                                    <option className="bg-[#0B1F1E] text-white" value="+91">+91</option>
                                                </select>

                                                {/* Custom Dropdown Icon */}
                                                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white text-xs">
                                                    ▼
                                                </div>
                                            </div>

                                            {/* Phone Input */}
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                placeholder="Your phone number"
                                                value={formik.values.phone}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/\D/g, "");
                                                    formik.setFieldValue("phone", val);
                                                }}
                                                onBlur={formik.handleBlur}
                                                className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-zinc-400 outline-none"
                                                maxLength={10}
                                            />
                                        </div>

                                        <ErrorMsg
                                            msg={
                                                formik.touched.phone
                                                    ? formik.errors.phone
                                                    : undefined
                                            }
                                        />
                                    </div>

                                {/* Message */}
                                <div className="flex-1">
                                    <label className="block text-zinc-300 font-medium text-lg mb-1.5">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={7}
                                        placeholder="Message..."
                                        value={formik.values.message}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={`${inputClass("message")} resize-none`}
                                    />
                                    <ErrorMsg
                                        msg={
                                            formik.touched.message
                                                ? formik.errors.message
                                                : undefined
                                        }
                                    />
                                </div>

                                {/*
                                  FIX 2: Remove the conditional wrapper.
                                  NEXT_PUBLIC_ vars are inlined at build time — if the
                                  conditional ever evaluates to falsy, the widget never
                                  mounts and getValue() always returns "", causing the
                                  "Captcha Required" error on every submit.
                                */}
                                <ReCAPTCHA
                                    sitekey={RECAPTCHA_SITE_KEY}
                                    ref={recaptchaRef}
                                />

                                {/* Submit */}
                                <motion.button
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                    whileTap={{ scale: 0.97 }}
                                    whileHover={{ scale: 1.01 }}
                                    className="w-full bg-[#3D7773] hover:bg-[#2f5f5c] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-lg tracking-widest uppercase transition-colors duration-200"
                                >
                                    {formik.isSubmitting ? "Sending..." : "Submit"}
                                </motion.button>
                            </form>
                        </motion.div>

                    </div>

                    <MapSection />
                </div>
            </section>
        </>
    );
}