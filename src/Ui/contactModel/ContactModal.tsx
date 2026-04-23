"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiPhone, FiMail, FiMapPin, FiX, FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle } from "react-icons/fi";

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
    error:   { bg: "#3d1a1a", border: "#e74c3c", icon: FiAlertCircle,  iconColor: "#e74c3c" },
    info:    { bg: "#1a2a3d", border: "#3498db", icon: FiInfo,          iconColor: "#3498db" },
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
    const [loading, setLoading] = useState(false);
    const [toasts, setToasts] = useState<Toast[]>([]);

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
                setLoading(true);
                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
                const res = await fetch(API_URL + "/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message);
                addToast("success", "Message Sent!", data.message);
                resetForm();
                onClose();
            } catch {
                addToast("error", "Submission Failed", "Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        },
    });

    const inputClass = (field: keyof typeof formik.values) =>
        `w-full border rounded-lg px-4 py-2 text-sm text-white bg-transparent outline-none ${
            formik.touched[field] && formik.errors[field] ? "border-red-400" : "border-[#3D7773]"
        }`;

    const errorVariants = {
        hidden:  { opacity: 0, height: 0, marginTop: 0 },
        visible: { opacity: 1, height: "auto", marginTop: 4 },
        exit:    { opacity: 0, height: 0, marginTop: 0 },
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
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
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
                            className="fixed inset-0 z-50 flex items-center justify-center px-2 mt-30 lg:mt-28 sm:px-4"
                        >
                            <div className="
                                w-full
                                max-w-md sm:max-w-lg md:max-w-xl 2xl:max-w-2xl
                                max-h-[92vh] lg:max-h-[80vh] xl:max-h-[80vh]
                                bg-[#0e1118] rounded-lg border border-[#3D7773]
                                p-4 sm:p-5 md:p-6 lg:p-2 xl:p-8
                                flex flex-col gap-3 sm:gap-4 relative
                            ">
                                <button
                                    onClick={onClose}
                                    className="absolute top-2 right-3 text-zinc-400 hover:text-white text-xl"
                                >
                                    ✕
                                </button>

                                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-zinc-100">
                                    Get In Touch
                                </h2>

                                <p className="text-zinc-500 text-xs sm:text-sm md:text-base leading-relaxed font-light">
                                    We&apos;re here to answer your questions and guide you toward
                                    better health. Reach out anytime we love to hear from you.
                                </p>

                                <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col gap-3 sm:gap-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <div>
                                            <label className="block text-zinc-300 text-sm mb-1">Name</label>
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
                                            <label className="block text-zinc-300 text-sm mb-1">Email</label>
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
                                        <label className="block text-zinc-300 text-sm mb-1">Phone</label>
                                        <input
                                            name="phone"
                                            value={formik.values.phone}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={inputClass("phone")}
                                        />
                                        <ErrorMsg msg={formik.touched.phone ? formik.errors.phone : undefined} />
                                    </div>

                                    <div>
                                        <label className="block text-zinc-300 text-sm mb-1">Message</label>
                                        <textarea
                                            name="message"
                                            rows={4}
                                            value={formik.values.message}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`${inputClass("message")} resize-none`}
                                        />
                                        <ErrorMsg msg={formik.touched.message ? formik.errors.message : undefined} />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={formik.isSubmitting}
                                        whileTap={{ scale: 0.97 }}
                                        whileHover={{ scale: 1.01 }}
                                        className="w-full bg-[#3D7773] hover:bg-[#2f5f5c] text-white text-sm sm:text-base py-2.5 rounded-lg uppercase"
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