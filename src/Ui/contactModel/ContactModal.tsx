"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiPhone, FiMail, FiMapPin, FiX, FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiArrowRight } from "react-icons/fi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { createInquiry } from "@/redux/Api";
import ReCAPTCHA from "react-google-recaptcha";

const validationSchema = Yup.object({
    name: Yup.string().min(2, "Min 2 characters").required("Name required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    phone: Yup.string()
        .matches(/^[0-9]+$/, "Only numbers")
        .min(10, "10 digits required")
        .max(10, "10 digits required")
        .required("Phone required"),
    message: Yup.string().min(10, "Min 10 characters").required("Message required"),
});

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message: string;
}

const toastStyles: Record<ToastType, { bg: string; border: string; icon: React.ElementType; iconColor: string }> = {
    success: { bg: "#1a3d2e", border: "#2ecc71", icon: FiCheckCircle, iconColor: "#2ecc71" },
    error: { bg: "#3d1a1a", border: "#e74c3c", icon: FiAlertCircle, iconColor: "#e74c3c" },
    info: { bg: "#1a2a3d", border: "#3498db", icon: FiInfo, iconColor: "#3498db" },
    warning: { bg: "#3d2e1a", border: "#f39c12", icon: FiAlertTriangle, iconColor: "#f39c12" },
};

// ─── ToastItem ────────────────────────────────────────────────────────────────
function ToastItem({ toast, onClose }: { toast: Toast; onClose: (id: string) => void }) {
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
            <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 3.5, ease: "linear" }}
                style={{
                    position: "absolute",
                    bottom: 0, left: 0,
                    height: "2px", width: "100%",
                    background: style.border,
                    transformOrigin: "left",
                    opacity: 0.6,
                }}
            />
            <div style={{ marginTop: "1px" }}>
                <Icon size={20} color={style.iconColor} />
            </div>
            <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: "14px", color: "#fff", letterSpacing: "0.01em" }}>
                    {toast.title}
                </p>
                <p style={{ margin: "3px 0 0", fontSize: "12px", color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
                    {toast.message}
                </p>
            </div>
            <button
                onClick={() => onClose(toast.id)}
                style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "rgba(255,255,255,0.4)", padding: 0, marginTop: "1px",
                    display: "flex", alignItems: "center",
                }}
            >
                <FiX size={16} />
            </button>
        </motion.div>
    );
}

// ─── ToastContainer ───────────────────────────────────────────────────────────
function ToastContainer({ toasts, onClose }: { toasts: Toast[]; onClose: (id: string) => void }) {
    return (
        <div
            style={{
                position: "fixed", top: "24px", right: "24px", zIndex: 9999,
                display: "flex", flexDirection: "column", gap: "10px",
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

// ─── ContactModal ─────────────────────────────────────────────────────────────
export default function ContactModal({ isOpen, onClose }: Props) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const [countryCode, setCountryCode] = useState("+91");
    const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const addToast = (type: ToastType, title: string, message: string) => {
        const id = crypto.randomUUID();
        setToasts((prev) => [...prev, { id, type, title, message }]);
        setTimeout(() => removeToast(id), 3500);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const formik = useFormik({
        initialValues: { name: "", email: "", phone: "", message: "" },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                let token = recaptchaRef.current?.getValue() || "";

                if (!token) {
                    token = await recaptchaRef.current?.executeAsync() || "";
                }

                if (!token) {
                    addToast("error", "Captcha Required", "Please verify captcha");
                    return;
                }

                const resultAction = await dispatch(
                    createInquiry({
                        ...values,
                        phone: `${countryCode} ${values.phone}`, // 🔥 yaha combine kiya
                        captcha: token,
                    } as unknown as Parameters<typeof createInquiry>[0])
                );

                if (createInquiry.fulfilled.match(resultAction)) {
                    addToast(
                        "success",
                        "Message Sent!",
                        resultAction.payload.message || "Your inquiry has been submitted successfully."
                    );
                    resetForm();
                    // FIX 3: reset captcha after successful submission
                    recaptchaRef.current?.reset();
                } else {
                    throw new Error(resultAction.payload || "Failed to submit inquiry.");
                }
            } catch (error: unknown) {
                console.error(error);
                const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again.";
                addToast(
                    "error",
                    "Submission Failed",
                    errorMessage
                );
            }
        },
    });

    const inputClass = (field: keyof typeof formik.values) =>
        `w-full border rounded-lg px-4 py-2 text-base sm:text-lg  leading-relaxed font-light text-black bg-transparent outline-none ${formik.touched[field] && formik.errors[field] ? "border-red-400" : "border-[#2f5ba5]/30"
        }`;

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
                        initial="hidden" animate="visible" exit="exit"
                        transition={{ duration: 0.2 }}
                        className="text-red-400 text-xs overflow-hidden"
                    >
                        {msg}
                    </motion.p>
                )}
            </AnimatePresence>
        );
    }

    return (
        <>
            {/* ✅ ToastContainer is OUTSIDE the modal's AnimatePresence */}
            <ToastContainer toasts={toasts} onClose={removeToast} />

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1090]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                        />

                        <motion.div
                            initial={{ opacity: 0, x: 32 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 32 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="fixed inset-0 z-[1100] flex min-h-dvh items-center justify-center overflow-y-auto px-3 py-3 sm:px-4 sm:py-6"
                        >
                            <div
                                className="
    w-full
    max-w-md
    sm:max-w-lg
    md:max-w-xl
    max-h-[calc(100dvh-24px)]
    sm:max-h-[calc(100dvh-48px)]
    overflow-y-auto
    no-scrollbar
    bg-[#EDEDEE]
    rounded-lg
    border border-[#2f5ba5]/30
    p-4 sm:p-6
    relative
  "
                            >
                                <button
                                    onClick={onClose}
                                    className="sticky top-0 z-10 ml-auto -mb-8 flex h-9 w-9 items-center justify-center rounded-full bg-[#EDEDEE]/90 text-zinc-400 hover:text-black text-xl"
                                    aria-label="Close contact form"
                                >
                                    ✕
                                </button>

                                <h2 className="pr-10 text-xl sm:text-2xl lg:text-3xl font-medium text-black">
                                    Get In Touch
                                </h2>

                                <p className="text-[#64748B] text-base sm:text-lg leading-relaxed lg:max-w-md font-light">
                                    We&apos;re here to answer your questions and guide you toward
                                    better health. Reach out anytime we love to hear from you.
                                </p>

                                <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col gap-3">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div>
                                            <label className="block text-[#64748B] text-base sm:text-lg  leading-relaxed font-light mb-1">Name</label>
                                            <input
                                                name="name"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className={inputClass("name")}
                                            />
                                            <ErrorMsg msg={formik.touched.name ? formik.errors.name : undefined} />
                                        </div>
                                        <div>
                                            <label className="block text-[#64748B] text-base sm:text-lg  leading-relaxed font-light mb-1">Email</label>
                                            <input
                                                name="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className={inputClass("email")}
                                            />
                                            <ErrorMsg msg={formik.touched.email ? formik.errors.email : undefined} />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[#64748B] text-base sm:text-lg  leading-relaxed font-light mb-1">
                                            Phone
                                        </label>

                                        <div className="flex border border-[#2f5ba5]/30 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-[#2f5ba5]/30/20">

                                            <div className="relative">
                                                <select
                                                    value={countryCode}
                                                    onChange={(e) => setCountryCode(e.target.value)}
                                                    className="appearance-none bg-transparent text-[#64748B]  pl-3 pr-8 py-2.5 outline-none border-r border-[#2f5ba5]/30"
                                                >
                                                    <option className="bg-[#0B1F1E] text-[#64748B]" value="+91">+91</option>
                                                </select>
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
                                                className="w-full bg-transparent px-4 py-2.5 text-base sm:text-lg  leading-relaxed font-light text-black  outline-none"
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

                                    {/* Message + reCAPTCHA */}
                                    <div className="flex flex-col gap-3 sm:gap-4">

                                        {/* Message */}
                                        <div className="flex-1">
                                            <label className="block text-[#64748B] text-base sm:text-lg  leading-relaxed font-light mb-1">Message</label>
                                            <textarea
                                                name="message"
                                                rows={4}
                                                value={formik.values.message}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className={`${inputClass("message")} min-h-28 max-h-36 resize-y w-full`}
                                            />
                                            <ErrorMsg msg={formik.touched.message ? formik.errors.message : undefined} />
                                        </div>

                                        {/* reCAPTCHA */}
                                        <div className="w-full min-h-[65px] overflow-hidden">
                                            <div className="
  scale-[0.86]
  min-[380px]:scale-100
  origin-top-left
">
                                                <ReCAPTCHA
                                                    sitekey={RECAPTCHA_SITE_KEY}
                                                    ref={recaptchaRef}
                                                />
                                            </div>
                                        </div>

                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={formik.isSubmitting}
                                        whileTap={{ scale: 0.97 }}
                                        whileHover={{ scale: 1.01 }}
                                        className="w-full bg-[#2f5ba5]/70 hover:bg-[#2f5ba5]/70 text-white text-base sm:text-lg  leading-relaxed font-light sm:text-base py-2.5 rounded-lg uppercase"
                                    >
                                        {formik.isSubmitting ? "Sending..." : "Submit"}
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
