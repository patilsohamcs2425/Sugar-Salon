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
      { label: "Smooth hair removal & body waxing", value: "waxing" },
      { label: "Deep skin glow & O3+ clinical facials", value: "facials" },
      { label: "Hair cut, coloring & treatment spa", value: "hair-care" },
      { label: "Gel nails & luxury nail art makeover", value: "nail-art" }
    ]
  },
  {
    id: 2,
    title: "How would you describe your skin / hair sensitivity?",
    options: [
      { label: "Ultra sensitive, prone to redness", value: "sensitive" },
      { label: "Normal / combination", value: "normal" },
      { label: "Dry or dehydrated needing deep moisture", value: "dry" }
    ]
  },
  {
    id: 3,
    title: "What occasion are you preparing for?",
    options: [
      { label: "Everyday confidence & routine glow", value: "routine" },
      { label: "Upcoming Beach Vacation / Pool Party", value: "vacation" },
      { label: "Wedding, Bridal, or Special Gala Night", value: "gala" }
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
      const targetCategory = updated[1] || "facials";
      const matched = MOCK_SERVICES.find((s) => s.category === targetCategory) || MOCK_SERVICES[0];
      setRecommendedService(matched);
      setCurrentStep(QUIZ_QUESTIONS.length);
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-gray-900 bg-white">
      <SectionHeader
        badge="Smart Matchmaker"
        title="Bespoke Beauty Recommendation Finder"
        subtitle="Answer 3 quick questions to discover your ideal treatment package at Sugar Salon."
      />

      {/* Quiz Container */}
      <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-200 shadow-sm text-gray-900">
        {currentStep < QUIZ_QUESTIONS.length ? (
          <div>
            {/* Progress */}
            <div className="flex items-center justify-between mb-3 text-xs font-bold text-gray-500">
              <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
              <span className="text-amber-900 font-extrabold">{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Completed</span>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-2 mb-8 border border-gray-200">
              <div
                className="bg-amber-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            <h3 className="text-2xl font-extrabold font-serif-heading text-gray-900 mb-6">
              {QUIZ_QUESTIONS[currentStep].title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {QUIZ_QUESTIONS[currentStep].options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelectOption(QUIZ_QUESTIONS[currentStep].id, opt.value)}
                  className="p-5 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200 hover:border-amber-400 text-left transition-all duration-200 group flex items-center justify-between shadow-2xs cursor-pointer"
                >
                  <span className="text-sm font-bold text-gray-800 group-hover:text-amber-900">
                    {opt.label}
                  </span>
                  <ArrowRight size={18} className="text-amber-700 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Results Card */
          recommendedService && (
            <div className="text-center py-4 space-y-6">
              <Badge variant="gold">Match Result 98.4% Fit</Badge>
              <h3 className="text-3xl font-extrabold font-serif-heading text-gray-900">
                Your Ideal Treatment Match
              </h3>

              <div className="max-w-md mx-auto bg-white rounded-3xl overflow-hidden border border-gray-200 text-left shadow-md">
                <img
                  src={recommendedService.image}
                  alt={recommendedService.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-1.5">
                    {recommendedService.title}
                  </h4>
                  <p className="text-gray-600 text-xs leading-relaxed mb-4 font-normal">
                    {recommendedService.description}
                  </p>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-bold">Recommended Package</span>
                      <span className="text-2xl font-extrabold text-amber-900">
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
                <Button variant="secondary" size="sm" onClick={handleRestart}>
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
