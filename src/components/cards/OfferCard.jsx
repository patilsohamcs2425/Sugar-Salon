import React, { useState } from "react";
import { Tag, Copy, Check } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

export const OfferCard = ({ offer }) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="relative bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-2xs hover:shadow-lg hover:border-amber-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
    >
      <div className="flex items-center justify-between mb-4">
        <Badge variant="gold">{offer.badge || "Special Offer"}</Badge>
        <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
          <Tag size={13} className="text-amber-600" />
          {offer.expiry}
        </span>
      </div>

      <div className="mb-6">
        <span className="text-3xl sm:text-4xl font-extrabold font-serif-heading text-amber-800 block mb-1">
          {offer.discount}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          {offer.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {offer.description}
        </p>
      </div>

      <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center justify-between sm:justify-start gap-2 bg-gray-50 px-3.5 py-2 rounded-xl border border-gray-200">
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Code:</span>
          <span className="font-mono font-extrabold text-amber-900 text-sm tracking-wider">
            {offer.code}
          </span>
          <button
            onClick={handleCopyCode}
            className="ml-2 text-gray-500 hover:text-amber-800 transition-colors cursor-pointer"
            title="Copy Code"
          >
            {copied ? <Check size={16} className="text-emerald-600 font-bold" /> : <Copy size={16} />}
          </button>
        </div>

        <Button variant="primary" size="sm" onClick={() => navigate("/appointment")}>
          Claim Deal
        </Button>
      </div>
    </div>
  );
};
