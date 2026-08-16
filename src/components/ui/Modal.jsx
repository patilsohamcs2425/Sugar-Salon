import React, { useEffect } from "react";
import { X } from "lucide-react";

export const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-2xl" }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full ${maxWidth} bg-[#FFFDF9] rounded-3xl p-6 md:p-8 border border-[#D4AF37]/35 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-[#221A20]`}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#D4AF37]/25">
          <h3 className="text-xl font-bold font-serif-heading text-[#221A20]">
            {title}
          </h3>
          <button
            type="button"
            onClick={() => {
              document.body.style.overflow = "auto";
              onClose();
            }}
            aria-label="Close dialog"
            className="p-2 text-[#221A20] bg-[#FAF6F0] hover:bg-amber-100 hover:text-amber-900 border border-[#D4AF37]/40 rounded-full transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 pr-1 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};
