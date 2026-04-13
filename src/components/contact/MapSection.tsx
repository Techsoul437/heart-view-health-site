"use client";

export default function MapSection() {
  return (
    <div className="w-full h-100 mt-20 rounded-2xl overflow-hidden">
      <iframe
        src="https://www.google.com/maps?q=19%20Arth%20Residency%20Near%20VIP%20Circle%20Utran%20Surat%20Gujarat%20394105&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}