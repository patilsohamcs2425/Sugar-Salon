import React from "react";
import { SALON_INFO } from "../../constants";

export const FloatingWhatsApp = () => {
  const whatsappUrl = `https://wa.me/${SALON_INFO.whatsapp}?text=Hello%20Sugar%20Salon,%20I%20would%20like%20to%20inquire%20about%20your%20services!`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Sugar Salon on WhatsApp"
      className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 group cursor-pointer"
    >
      {/* Label Badge on Hover */}
      <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-900 text-xs font-bold shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        WhatsApp 77386 13609
      </span>

      {/* Floating Button Container */}
      <div className="relative">
        {/* Animated Ripple / Ping Effect */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping opacity-60 pointer-events-none" />

        {/* Circular Button */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-[0_6px_25px_rgba(16,185,129,0.35)] transition-transform duration-300 group-hover:scale-110 active:scale-95 border-2 border-white">
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.486 1.334 5.004l-1.42 5.187 5.309-1.393c1.464.798 3.115 1.218 4.767 1.219h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.669-1.038-5.178-2.924-7.064s-4.394-2.925-7.069-2.925zm5.727 14.126c-.236.666-1.373 1.272-1.895 1.353-.482.075-1.111.107-1.785-.108-.431-.137-.985-.32-1.696-.628-2.986-1.293-4.927-4.316-5.076-4.515-.149-.199-1.215-1.616-1.215-3.083 0-1.467.768-2.189 1.042-2.483.274-.294.598-.368.797-.368.199 0 .397.002.571.011.184.01.431-.07.674.513.249.597.847 2.069.921 2.219.075.149.124.323.025.522-.099.198-.149.323-.298.497-.149.174-.313.389-.447.523-.149.149-.304.312-.131.61.174.298.772 1.274 1.656 2.06 1.137 1.013 2.094 1.326 2.392 1.474.298.149.472.124.646-.075.174-.199.746-.87.945-1.168.199-.298.398-.248.671-.149.274.099 1.741.821 2.039.97.298.149.497.224.572.348.075.124.075.721-.161 1.387z" />
          </svg>
        </div>
      </div>
    </a>
  );
};
