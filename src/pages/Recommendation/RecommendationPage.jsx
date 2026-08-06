import React, { useState } from "react";
import { Sparkles, ArrowRight, RefreshCw, CheckCircle2, ShieldCheck, Heart } from "lucide-react";
import { SectionHeader } from "../../components/common/SectionHeader";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { MOCK_SERVICES } from "../../data/mockData";
import { formatCurrency } from "../../utils/formatters";
import { useBooking } from "../../hooks/useBooking";
import { useNavigate } from "react-router-dom";

const QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "What is your main beauty focus today?",
    options: [
      { label: "Zero-pain smooth hair removal", value: "sugar-waxing" },
      { label: "Deep skin glow & glass hydration", value: "facials-skin" },
      { label: "Hair color, balayage & silk styling", value: "hair-styling" },
      { label: "Lashes, brows & nail art makeover", value: "nail-art" }
    ]
  },
  {
    id: 2,
    title: "How would you describe your skin / hair sensitivity?",
    options: [
      { label: "Ultra sensitive, prone to redness", value: "sensitive" },
      { label: "Normal / combination", value: "normal" },
      { label: "Dry or dehydrated needing deep serum", value: "dry" }
    ]
  },
  {
    id: 3,
    title: "What occasion are you preparing for?",
    options: [
      { label: "Everyday confidence & routine glow", value: "routine" },
      { label: "Upcoming Beach Vacation / Pool Party", value: "vacation" },
      { label: "Wedding, Gala, or Special Party Night", value: "gala" }
    ]
  }
];

export const RecommendationPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendedService, setRecommendedService] = useState(null);
  const { startBookingForService } = useBooking();
  const navigate = useNavigate();

  const handleSelectOption = (questionId, value) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate Recommendation
      const targetCategory = updated[1] || "sugar-waxing";
      const matched = MOCK_SERVICES.find((s) => s.category === targetCategory) || MOCK_SERVICES[0];
      setRecommendedService(matched);
      setCurrentStep(QUIZ_QUESTIONS.length); // Results step
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendedService(null);
  };

  const handleBookMatch = () => {
    if (recommendedService) {
      startBookingForService(recommendedService);
      navigate("/appointment");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SectionHeader
        badge="AI Smart Matchmaker"
        title="Bespoke Beauty Recommendation Finder"
        subtitle="Answer 3 quick questions and let our aesthetic algorithm formulate your ideal treatment package."
      />

      {/* Quiz Container */}
      <div className="glass-panel rounded-3xl p-6 md:p-10 border border-pink-500/30 shadow-2xl relative overflow-hidden">
        {currentStep < QUIZ_QUESTIONS.length ? (
          <div>
            {/* Progress */}
            <div className="flex items-center justify-between mb-4 text-xs font-semibold text-slate-400">
              <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
              <span className="text-pink-400">{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Completed</span>
            </div>

            <div className="w-full bg-slate-900 rounded-full h-2 mb-8 border border-slate-800">
              <div
                className="bg-gradient-to-r from-pink-500 to-amber-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            <h3 className="text-2xl font-bold font-serif-heading text-slate-100 mb-6">
              {QUIZ_QUESTIONS[currentStep].title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {QUIZ_QUESTIONS[currentStep].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelectOption(QUIZ_QUESTIONS[currentStep].id, opt.value)}
                  className="p-5 rounded-2xl bg-slate-900/80 hover:bg-pink-500/10 border border-slate-800 hover:border-pink-500/50 text-left transition-all duration-300 group flex items-center justify-between"
                >
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-pink-300">
                    {opt.label}
                  </span>
                  <ArrowRight size={18} className="text-slate-500 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Results Card */
          recommendedService && (
            <div className="text-center py-4 space-y-6">
              <Badge variant="gold">Match Result 98.4% Fit</Badge>
              <h3 className="text-3xl font-bold font-serif-heading text-slate-100">
                Your Ideal Treatment Match
              </h3>

              <div className="max-w-md mx-auto glass-card rounded-3xl overflow-hidden border border-pink-500/40 text-left">
                <img
                  src={recommendedService.image}
                  alt={recommendedService.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-slate-100 mb-2">
                    {recommendedService.title}
                  </h4>
                  <p className="text-slate-300 text-xs leading-relaxed mb-4">
                    {recommendedService.description}
                  </p>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Recommended Package</span>
                      <span className="text-2xl font-bold text-pink-400">
                        {formatCurrency(recommendedService.price)}
                      </span>
                    </div>
                    <Button variant="primary" size="sm" onClick={handleBookMatch}>
                      Book This Match <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button variant="ghost" size="sm" onClick={handleRestart}>
                  <RefreshCw size={14} className="mr-1.5" /> Retake Quiz
                </Button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
