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
      className={`relative glass-panel rounded-3xl p-6 md:p-8 border ${offer.borderAccent} bg-gradient-to-br ${offer.bgGradient} shadow-xl flex flex-col justify-between overflow-hidden group`}
    >
      <div className="flex items-center justify-between mb-4">
        <Badge variant="gold">{offer.badge}</Badge>
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
          <Tag size={14} className="text-pink-400" />
          {offer.expiry}
        </span>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-extrabold font-serif-heading text-pink-400 block mb-1">
          {offer.discount}
        </span>
        <h3 className="text-2xl font-bold text-slate-100 mb-2">
          {offer.title}
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          {offer.description}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-700">
          <span className="text-xs text-slate-400 uppercase tracking-widest">Code:</span>
          <span className="font-mono font-bold text-amber-300 text-sm tracking-wider">
            {offer.code}
          </span>
          <button
            onClick={handleCopyCode}
            className="ml-2 text-slate-400 hover:text-pink-400 transition-colors cursor-pointer"
            title="Copy Code"
          >
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
          </button>
        </div>

        <Button variant="gold" size="sm" onClick={() => navigate("/appointment")}>
          Claim Deal
        </Button>
      </div>
    </div>
  );
};
