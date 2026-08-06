import React from "react";
import { SectionHeader } from "../../components/common/SectionHeader";
import { OfferCard } from "../../components/cards/OfferCard";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { MOCK_OFFERS } from "../../data/mockData";
import { MEMBERSHIP_TIERS } from "../../constants";
import { Check, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const OffersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <SectionHeader
        badge="Promotions & Memberships"
        title="Exclusive Deals & VIP Beauty Clubs"
        subtitle="Claim voucher codes or join our monthly membership club for unlimited sugar smooth perks."
      />

      {/* Voucher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_OFFERS.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>

      {/* VIP Membership Tiers */}
      <section>
        <SectionHeader
          badge="VIP Beauty Lounge"
          title="Sugar Salon Memberships"
          subtitle="Enjoy monthly complimentary treatments, permanent menu discounts, and priority concierge access."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MEMBERSHIP_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`glass-card rounded-3xl p-8 border flex flex-col justify-between relative ${
                tier.popular ? "border-amber-400/60 shadow-2xl shadow-amber-500/10 scale-105" : "border-slate-800"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="gold">
                    <Sparkles size={12} className="mr-1 inline" /> Most Popular VIP
                  </Badge>
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold font-serif-heading text-slate-100 mb-2">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold font-serif-heading text-pink-400">{tier.price}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={tier.popular ? "gold" : "primary"}
                size="md"
                className="w-full"
                onClick={() => navigate("/appointment")}
              >
                Join {tier.name}
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
