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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div
        className={`relative w-full ${maxWidth} bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-gray-900`}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
          <h3 className="text-xl font-bold font-serif-heading text-gray-900">
            {title}
          </h3>
          <button
            type="button"
            onClick={() => {
              document.body.style.overflow = "auto";
              onClose();
            }}
            aria-label="Close dialog"
            className="p-1.5 text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 rounded-full transition-all active:scale-95 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 pr-1">
          {children}
        </div>
      </div>
    </div>
  );
};
