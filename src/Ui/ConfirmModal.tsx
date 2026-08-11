"use client";

interface ConfirmModalProps {
    isOpen: boolean;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({
    isOpen,
    title = "Confirm",
    message = "Are you sure?",
    confirmText = "Delete",
    cancelText = "Cancel",
    loading = false,
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="text-xl font-semibold text-gray-900">
                    {title}
                </h2>

                <p className="mt-3 text-sm text-gray-600">
                    {message}
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="
    group relative overflow-hidden rounded-full
    px-6 py-2.5
    text-sm font-semibold
    text-[#0F61B3]
    bg-white
    border border-[#0F61B3]
    transition-all duration-300
    hover:text-white
    disabled:cursor-not-allowed disabled:opacity-50
  "
                    >
                        <span
                            className="
      absolute inset-0
      rounded-full
       bg-linear-to-r from-[#7CC4FF] to-[#85BDF8]
    before:absolute before:inset-0 before:rounded-full
    before:p-px
    before:bg-linear-to-r
    before:from-[#0F61B3] before:to-[#6AA2E5]/10
    before:content-['']
    before:transition-all before:duration-300
      opacity-0
      transition-opacity
      duration-300
      group-hover:opacity-100
    "
                        />

                        <span className="relative z-10">
                            {cancelText}
                        </span>
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="
    group relative overflow-hidden rounded-full
    px-6 py-2.5
    text-sm font-semibold text-white
    cursor-pointer
    transition-all duration-300
    disabled:cursor-not-allowed disabled:opacity-50

    bg-linear-to-r from-[#7CC4FF] to-[#85BDF8]

    before:absolute before:inset-0 before:rounded-full
    before:p-px
    before:bg-linear-to-r
    before:from-[#0F61B3] before:to-[#6AA2E5]/10
    before:content-['']
    before:transition-all before:duration-300

    hover:before:from-black
    hover:before:to-black
  "
                    >
                        {/* Inner Background */}
                        <span
                            className="
      absolute inset-0.5 rounded-full
      bg-linear-to-r from-[#2F5BA5]/70 to-[#4A7BC9]/30
      transition-all duration-300
      group-hover:bg-black
      group-hover:bg-none
    "
                        />

                        <span className="relative z-10">
                            {loading ? "Deleting..." : confirmText}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}