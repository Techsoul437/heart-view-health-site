"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(() => {
    if (typeof document === "undefined") return false;

    const hasConsent = document.cookie
      .split("; ")
      .some((row) => row.startsWith("cookieConsent="));

    return !hasConsent;
  });

  // 🔒 Lock scroll
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const acceptCookies = () => {
    document.cookie = "cookieConsent=true; path=/; max-age=31536000";
    setVisible(false);
  };

  const rejectCookies = () => {
    document.cookie = "cookieConsent=false; path=/; max-age=31536000";
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center px-4">
      
      {/* Center Modal */}
      <div className="w-full max-w-3xl bg-black text-white px-6 py-6 rounded-2xl shadow-xl flex flex-col gap-6 pointer-events-auto">
        
        <p className="text-md text-center font-light md:text-left leading-relaxed">
          We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts.
          By clicking Accept, you agree to our use of cookies.
          <br />
          You can manage your preferences or reject non-essential cookies at any time.
        </p>

        <div className="flex flex-col sm:flex-row justify-center md:justify-end gap-3">
          
          <button
            onClick={acceptCookies}
            className="px-9 py-3 rounded-full group relative text-white overflow-hidden bg-gradient-to-r from-[#181E2B] to-[#3D7773] before:absolute before:inset-0 before:rounded-full before:p-[1px] before:bg-gradient-to-r before:from-[#45657D] before:to-[#B4B0B0] before:content-[''] cursor-pointer"
          >
            <span className="absolute inset-[2px] rounded-full bg-gradient-to-r from-[#181E2B] to-[#3D7773]"></span>
            <span className="relative z-10">Accept</span>
            <span className="absolute top-0 left-[-100%] h-full w-[30%] bg-white/30 blur-md rotate-12 group-hover:left-[120%] transition-all duration-700 ease-in-out"></span>
          </button>

          <button
            onClick={rejectCookies}
            className="px-9 py-3 rounded-full border border-white/30 hover:bg-white/10"
          >
            Reject
          </button>

        </div>
      </div>
    </div>
  );
}