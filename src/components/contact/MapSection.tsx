"use client";

export default function MapSection() {
  return (
    <div className="pt-14 "> 
      <div className="w-full rounded-lg overflow-hidden aspect-[16/8]  lg:aspect-[16/7] xl:aspect-[16/5]">
        <iframe
          src="https://www.google.com/maps?q=19%20Arth%20Residency%20Near%20VIP%20Circle%20Utran%20Surat%20Gujarat%20394105&output=embed"
          className="w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}