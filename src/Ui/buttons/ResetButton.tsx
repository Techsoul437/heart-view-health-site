// src/Ui/buttons/ResetButton.tsx

"use client";

interface ResetButtonProps {
  text?: string;
  onReset: () => void;
  className?: string;
}

export default function ResetButton({
  text = "Cancel",
  onReset,
  className = "",
}: ResetButtonProps) {
  return (
    <button
      type="button"
      onClick={onReset}
      className={`inline-flex items-center justify-center rounded-full border border-white/50 px-8 py-3 text-base font-semibold text-black transition-all duration-200 hover:bg-black/10 ${className}`}
    >
      {text}
    </button>
  );
}