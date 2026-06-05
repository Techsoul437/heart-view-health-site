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
      className={`
        group
        relative

        w-fit
        min-w-25

        flex items-center justify-center

        px-4 py-3 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3
        rounded-full

        border border-transparent

        text-xs sm:text-sm lg:text-base
        text-black

        overflow-hidden
        isolate
        cursor-pointer

        transition-all duration-300

        before:absolute
        before:inset-0
        before:rounded-full
        before:p-px
        before:bg-linear-to-r
        before:from-[#0f61b3]
        before:to-[#7CC4FF]
        before:content-['']

        ${className}
      `}
    >
      {/* Inner Background */}
      <span className="absolute inset-px rounded-full bg-white z-0" />

      {/* Hover Background */}
      <span
        className="
          absolute inset-px
          rounded-full
          bg-linear-to-r
          from-[#2f5ba5]/90
          to-[#4a7bc9]/70

          scale-x-0
          origin-left
          group-hover:scale-x-100

          transition-transform duration-300
          z-0
        "
      />

      {/* Text */}
      <span className="relative z-10 group-hover:text-white transition-colors duration-300">
        {text}
      </span>
    </button>
  );
}