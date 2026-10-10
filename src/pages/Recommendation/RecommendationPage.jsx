import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, RotateCcw, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "../../components/common/SectionHeader";
import { sendChatMessage, QUICK_PROMPTS } from "../../services/openaiService";
import { useNavigate } from "react-router-dom";

// ─── Helper to parse basic markdown bold & bullet lines ──────────────────────
const FormattedMessageText = ({ text }) => {
  // Split by newlines
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5">
      {lines.map((line, idx) => {
        if (!line.trim()) return <div key={idx} className="h-1.5" />;

        // Parse bold **text** in the line
        const parts = line.split(/(\*\*.*?\*\*)/g);

        return (
          <p key={idx} className="leading-relaxed">
            {parts.map((part, pIdx) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <strong key={pIdx} className="font-bold text-gray-900">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return <span key={pIdx}>{part}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
};

// ─── Typing animation dots ────────────────────────────────────────────────────
const TypingIndicator = () => (
  <div className="flex items-end gap-2.5 max-w-[90%] sm:max-w-[85%]">
    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center flex-shrink-0 shadow-sm">
      <Bot size={14} className="text-white" />
    </div>
    <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-xs">
      <div className="flex gap-1.5 items-center h-4">
        <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  </div>
);

// ─── Single chat message bubble ───────────────────────────────────────────────
const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex items-end gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"} max-w-full`}>
      {/* Avatar */}
      <div
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-xs ${
          isUser
            ? "bg-gray-900 text-white"
            : "bg-gradient-to-br from-amber-500 to-amber-700 text-white"
        }`}
      >
        {isUser ? <User size={13} /> : <Bot size={13} />}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[88%] sm:max-w-[80%] px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl text-[13px] sm:text-sm leading-relaxed shadow-xs ${
          isUser
            ? "bg-gray-900 text-white rounded-br-sm font-medium whitespace-pre-wrap"
            : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
        }`}
      >
        {isUser ? message.content : <FormattedMessageText text={message.content} />}
      </div>
    </div>
  );
};

// ─── Main Chatbot Page ────────────────────────────────────────────────────────
export const RecommendationPage = () => {
  const navigate = useNavigate();

  const WELCOME_MESSAGE = {
    role: "assistant",
    content:
      "Hello! ✨ I'm **Sugar AI** — your beauty consultant at Sugar Salon, Mumbai.\n\nI can recommend facials, painless sugar/Rica waxing, bridal packages, hair styling, and provide exact prices.\n\nHow can I help you glow today?",
  };

  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll ONLY inside the chat container (prevents the outer page from jumping down!)
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || isLoading) return;

    const userMsg = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "42px";
    }

    try {
      const reply = await sendChatMessage(updatedMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "✨ I'm here to help! Feel free to ask about our facial treatments, hair spa, prices, or how to book your appointment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents newline and accidental page movement
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput("");
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 text-gray-900 pb-6">
      {/* Page Header */}
      <SectionHeader
        badge="Live AI Beauty Consultant"
        title="Chat with Sugar AI"
        subtitle="Get instant personalized treatment recommendations, pricing details, and bridal makeover guidance."
      />

      {/* ── Chat Container (Optimized for both Mobile & Desktop) ────────── */}
      <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden flex flex-col h-[520px] sm:h-[580px] md:h-[620px]">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-3 sm:py-3.5 border-b border-gray-100 bg-gradient-to-r from-amber-50/80 to-white flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-xs flex-shrink-0">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <p className="font-extrabold text-gray-900 text-xs sm:text-sm leading-tight">Sugar AI</p>
                <span className="text-[9px] sm:text-[10px] font-bold bg-amber-100 text-amber-900 px-1.5 sm:px-2 py-0.5 rounded-full">
                  Beauty Expert
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse" />
                Online · Instant Recommendations
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            title="Start new conversation"
            className="p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-all cursor-pointer"
          >
            <RotateCcw size={15} />
          </button>
        </div>

        {/* Messages Scroll Area - ONLY this container scrolls */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-3 sm:px-5 py-4 space-y-3.5 sm:space-y-4 scroll-smooth bg-gray-50/30"
        >
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}
        </div>

        {/* Quick Prompts — only shown before first user message */}
        {messages.length === 1 && !isLoading && (
          <div className="px-3 sm:px-5 py-2.5 bg-white border-t border-gray-100 flex-shrink-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
              Popular Questions
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 max-h-24 sm:max-h-none overflow-y-auto">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="text-[11px] sm:text-xs px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-amber-200 bg-amber-50/70 text-amber-950 hover:bg-amber-100 hover:border-amber-400 transition-all font-medium cursor-pointer shadow-2xs text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar (Touch-friendly & Responsive) */}
        <div className="px-3 sm:px-5 py-2.5 sm:py-3.5 border-t border-gray-100 bg-white flex-shrink-0">
          <div className="flex items-end gap-2 sm:gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Ask about treatments, prices, advice..."
              rows={1}
              className="flex-1 resize-none bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 text-[14px] sm:text-sm text-gray-900 placeholder-gray-400 outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all leading-relaxed"
              style={{ minHeight: "42px", maxHeight: "96px" }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 96) + "px";
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              id="send-chat-btn"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-amber-600 hover:bg-amber-700 disabled:bg-gray-200 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all shadow-xs flex-shrink-0 cursor-pointer active:scale-95"
            >
              {isLoading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Send size={15} />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between mt-2 text-[10px] sm:text-[11px] text-gray-400">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <CheckCircle2 size={11} /> Live Sugar Salon Knowledge
            </span>
            <span className="hidden sm:inline">Press Enter to send</span>
          </div>
        </div>
      </div>

      {/* ── Book Appointment CTA ─────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 rounded-2xl sm:rounded-3xl p-4 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-white shadow-xs">
        <div className="text-center sm:text-left">
          <p className="font-extrabold text-base sm:text-lg leading-tight">Ready for your transformation?</p>
          <p className="text-amber-200 text-xs sm:text-sm mt-1">
            Book your slot online with zero waiting — open 7 days (11:00 AM – 9:00 PM).
          </p>
        </div>
        <button
          onClick={() => navigate("/appointment")}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-amber-950 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm hover:bg-amber-50 transition-all flex-shrink-0 shadow-xs cursor-pointer active:scale-98"
        >
          Book Appointment <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};
