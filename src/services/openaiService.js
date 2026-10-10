import { MOCK_SERVICES } from "../data/mockData";
import { SALON_INFO, SERVICE_CATEGORIES, MEMBERSHIP_TIERS } from "../constants";

// ─── Build rich system prompt with live salon data ──────────────────────────
const buildSystemPrompt = () => {
  const serviceList = MOCK_SERVICES.slice(0, 60)
    .map(
      (s) =>
        `• ${s.title} [Category: ${s.category}] — ₹${s.price}, ${s.duration}${s.popular ? " (⭐ Popular)" : ""}: ${s.description}`
    )
    .join("\n");

  return `You are "Sugar AI" — the intelligent, friendly, and bespoke beauty assistant for Sugar Salon, a premier unisex salon located at Marol Maroshi Rd, Andheri East, Mumbai.

Your role:
- Provide rich, detailed, customized answers to any beauty or salon inquiries.
- When asked "what are services" or for service lists, break down the offerings clearly by category with pricing.
- Recommend specific treatments with reasons based on user's skin/hair type, occasion, or budget.
- Guide users on how to book an appointment directly.

Salon Quick Info:
- Salon Name: ${SALON_INFO.name}
- Phone/WhatsApp: ${SALON_INFO.phoneFormatted}
- Address: ${SALON_INFO.address}
- Timings: Open 7 Days, 11:00 AM – 9:00 PM

Full Service Menu Highlights:
${serviceList}

Guidelines:
- If asked "what are services" or similar, present a well-structured list across all main categories (Facials, Waxing, Clean-up, Hair Care, Nails, D-Tan, Bridal).
- Keep formatting clean with bullet points and bold text for easy reading.
- Always include prices in ₹.`;
};

// ─── Custom Salon Intelligence Engine (Rich, Custom & Fast Offline/Fallback) ─
const generateSmartLocalResponse = (userText) => {
  const q = userText.toLowerCase().trim();

  // 1. "What are services", "show services", "services list", "menu", "what do you offer"
  if (
    q.includes("service") ||
    q.includes("menu") ||
    q.includes("what do you offer") ||
    q.includes("treatments") ||
    q.includes("options") ||
    q.includes("what you have") ||
    q.includes("all list") ||
    q === "services" ||
    q === "what are services"
  ) {
    return `✨ **Welcome to Sugar Salon! Here is our comprehensive menu of premium treatments:**

🌸 **1. Facials & Skin Radiance (from ₹800)**
• **Herbal Facial** (₹800) — Cooling neem & aloe care for fresh skin
• **VLCC Whitening Facial** (₹1,000) — Sun spot reduction & brightness
• **Kumkumadi RK Ayurvedic** (₹1,200) — Saffron & pure oil golden glow
• **Cheryls Oxy Blast / Glow White** (₹1,500) — Instant glass-skin glow
• **O3+ Whitening / Bridal Radiance** (₹2,000 - ₹2,500) — Clinical derm-grade glow

✨ **2. Clean-Up Treatments (from ₹500)**
• **Herbal Clean Up** (₹500) — Pore clearing & blackhead extraction
• **VLCC Whitening Clean Up** (₹600) — Quick de-tan & pore recharge
• **Sara Gold / Diamond Radiance** (₹1,000 - ₹1,100) — Anti-aging glass shine
• **O3+ Whitening Clean Up** (₹1,500) — Deep clinical express detox

🍯 **3. Gentle Sugar & Rica Waxing (from ₹400)**
• **Full Body Waxing** (Organic Sugar / Italian Rica)
• **Underarms, Full Arms, Full Legs & Bikini Waxing** — Smooth, redness-free

💇 **4. Hair Styling & Treatments**
• **Precision Haircuts & Styling**
• **Balayage, Global Color & Highlights**
• **Keratin Smoothening & Deep Conditioning Hair Spa**

💅 **5. Hands, Legs & Luxe Nail Art (from ₹300)**
• **Regular / Spa Manicure & Pedicure** (₹400 - ₹700)
• **BIAB Gel Nails & Custom 3D Nail Art**

☀️ **6. D-Tan & Bleach Essentials (from ₹300)**
• **Face & Neck D-Tan** (₹300) | **Face, Neck & Back** (₹800)

👰 **7. Bridal & Makeover Packages**
• Customized pre-bridal glow and wedding day glam suites.

👉 *Ready to book or want a personalized recommendation? Just tell me what you're looking for or click **Book Appointment** below!*`;
  }

  // 2. Facials / Glowing skin / Acne / Tan removal / Anti-aging
  if (
    q.includes("facial") ||
    q.includes("glow") ||
    q.includes("skin") ||
    q.includes("tan") ||
    q.includes("acne") ||
    q.includes("pimple") ||
    q.includes("dark spot") ||
    q.includes("o3+") ||
    q.includes("cheryl")
  ) {
    if (q.includes("sensitive") || q.includes("redness") || q.includes("allergy")) {
      return `🌸 **Best Treatments for Sensitive Skin:**
1. **Herbal Facial (₹800 / 45 mins)** — Calms redness using cooling neem, tulsi, and pure aloe vera.
2. **Cheryls Sensi Glow (₹1,800 / 60 mins)** — Hypo-allergenic clinical formula designed specifically for reactive and delicate skin.
3. **Kumkumadi RK Ayurvedic (₹1,200 / 60 mins)** — Gentle herbal oils that restore balance without irritation.

Would you like to book a slot for a sensitive skin consultation?`;
    }

    if (q.includes("tan") || q.includes("sun") || q.includes("dark")) {
      return `☀️ **Top De-Tanning & Brightening Solutions:**
1. **Cheryls Tan Clear Facial (₹1,500 / 60 mins)** — Rapidly strips deep sun tan and hyperpigmentation.
2. **VLCC Whitening Facial (₹1,000 / 60 mins)** — Licorice & mulberry extracts to lighten stubborn sun spots.
3. **Face, Neck & Back D-Tan (₹800 / 40 mins)** — Fast total upper-body brightening.

These treatments restore your natural complexion immediately after just 1 session!`;
    }

    if (q.includes("acne") || q.includes("oil") || q.includes("pimple") || q.includes("pore")) {
      return `🌿 **Best Treatments for Oily / Acne-Prone Skin:**
1. **O3+ Sea Weed Facial (₹2,000 / 75 mins)** — Oceanic minerals that soothe active breakouts and balance excess oil production.
2. **Cheryls Clari Glow (₹1,500 / 60 mins)** — Clarifying sebum-regulating treatment that clears pores.
3. **Serenite Purify Clean Up (₹900 / 40 mins)** — Deep pore extraction and antibacterial cooling mask.`;
    }

    // Default glow recommendation
    return `✨ **Our Top Radiance & Glow Facials:**
1. **Cheryls Oxy Blast (₹1,500 / 60 mins)** — Infuses oxygen into skin cells for immediate glass-skin luminosity.
2. **O3+ Whitening Radiance Facial (₹2,000 / 75 mins)** — Multi-step dermatologist formula for intense brightening.
3. **Richfeel 24K Gold Facial (₹1,500 / 60 mins)** — 24K gold foil infusion for a sparkling golden glow.
4. **Kumkumadi Ayurvedic Facial (₹1,200 / 60 mins)** — Classic saffron elixir treatment.

Which one matches your beauty goals best?`;
  }

  // 3. Waxing / Hair Removal / Sugar / Rica
  if (
    q.includes("wax") ||
    q.includes("hair removal") ||
    q.includes("sugar") ||
    q.includes("rica") ||
    q.includes("bikini") ||
    q.includes("underarm")
  ) {
    return `🍯 **Sugar Salon Waxing Menu:**
We specialize in ultra-gentle **Organic Sugar Waxing** & **Premium Italian Rica Waxing**:
• **Full Body Waxing** (Smooth, 100% colophony-free Rica)
• **Arms & Underarms Waxing** (Gentle & painless technique)
• **Full Legs & Bikini Waxing** (Hygienic single-use disposable protocol)

💡 *Why our waxing is different:*
✓ Less pain and zero sticky residue
✓ Prevents ingrown hairs and skin peeling
✓ 100% disposable sheets, gloves & spatulas for total hygiene!`;
  }

  // 4. Hair Care / Haircut / Color / Balayage / Spa / Keratin
  if (
    q.includes("hair") ||
    q.includes("color") ||
    q.includes("balayage") ||
    q.includes("cut") ||
    q.includes("spa") ||
    q.includes("keratin") ||
    q.includes("smoothening") ||
    q.includes("highlights")
  ) {
    return `💇 **Hair Care & Styling Suite:**
Our Senior Hair Specialists offer complete hair transformation services:
• **Precision Haircuts & Blow-dry Styling** (Customized to your face shape)
• **Balayage, Ombre & Global Hair Color** (Using premium ammonia-free L'Oréal / Schwarzkopf)
• **Keratin & Nanoplastia Smoothening** (Frizz-free, silky-straight hair for up to 6 months)
• **Deep Conditioning Hair Spa** (Repairs damaged strands & deeply hydrates scalp)

Would you like to consult with our Senior Hair Stylist Marcus Vance?`;
  }

  // 5. Nails / Manicure / Pedicure / Gel Art
  if (
    q.includes("nail") ||
    q.includes("gel") ||
    q.includes("mani") ||
    q.includes("pedi") ||
    q.includes("feet") ||
    q.includes("hand") ||
    q.includes("biab")
  ) {
    return `💅 **Nail Art, Manicure & Pedicure Studio:**
• **Regular Pedicure (₹500)** / **Regular Manicure (₹400)** — Classic soak, shaping, cuticle care & scrub.
• **Luxury Spa Pedicure (₹700)** / **Spa Manicure (₹500)** — Aromatherapy soak, mud mask & deep massage.
• **Custom 3D Gel Nail Art & BIAB Overlays** — Long-lasting chip-resistant nail sculpting.

Treat your hands and feet to complete luxury!`;
  }

  // 6. Bridal / Wedding / Groom / Party Makeup
  if (
    q.includes("wed") ||
    q.includes("bride") ||
    q.includes("bridal") ||
    q.includes("groom") ||
    q.includes("marriage") ||
    q.includes("party makeup")
  ) {
    return `👰 **Pre-Bridal & Wedding Glam Suites:**
We offer tailor-made wedding packages designed 2-4 weeks before the big day:
1. **O3+ Bridal Oxygenation Facial (₹2,500)** — Camera-ready, photo-perfect glow.
2. **Complete Full Body Rica Waxing & Polish** — Flawless, silky skin.
3. **Luxury Hair Spa & Balayage Glow** — Shiny, voluminous wedding hair.
4. **Bridal Gel Nail Art & Luxury Pedicure** — Intricate nail aesthetics.

Contact our concierge at **+91 77386 13609** to customize your bespoke bridal package!`;
  }

  // 7. Pricing / Rates / Cost / Membership
  if (
    q.includes("price") ||
    q.includes("cost") ||
    q.includes("rate") ||
    q.includes("cheap") ||
    q.includes("membership") ||
    q.includes("plan")
  ) {
    return `💳 **Sugar Salon Pricing Summary:**
• **D-Tan & Essentials:** Starting from ₹300
• **Clean-Ups:** ₹500 – ₹1,500
• **Facials & Skin Glow:** ₹800 – ₹2,500
• **Manicure & Pedicure:** ₹400 – ₹700
• **Sugar / Rica Waxing:** Packages available

💎 **VIP Memberships:**
• **Sugar Glow Club (₹1,999/mo):** Monthly waxing + 10% off all retail
• **Sugar VIP Luxe (₹3,499/mo):** 2 Waxing/Facials + 15% off + Free Hair Spa
• **Sugar Royal Platinum (₹5,999/mo):** Unlimited Waxing + O3+ Facial + 20% off

You can view the full menu on our **Services** tab!`;
  }

  // 8. Timings / Location / Address / Contact / Booking
  if (
    q.includes("time") ||
    q.includes("timing") ||
    q.includes("hour") ||
    q.includes("open") ||
    q.includes("close") ||
    q.includes("sunday")
  ) {
    return `⏰ **Operating Hours:**
We are open **7 Days a Week** from **11:00 AM to 9:00 PM** (Monday through Sunday). Walk-ins and pre-booked appointments are both welcome!`;
  }

  if (
    q.includes("where") ||
    q.includes("location") ||
    q.includes("address") ||
    q.includes("map") ||
    q.includes("reach") ||
    q.includes("near")
  ) {
    return `📍 **Our Location:**
**Shop No C-28, Zenith CHS LTD**, Marol Maroshi Rd, Bhavani Nagar, Marol, Andheri East, Mumbai — 400059 (Right near T2 International Airport).

📞 Phone: **+91 77386 13609**`;
  }

  if (
    q.includes("book") ||
    q.includes("appointment") ||
    q.includes("slot") ||
    q.includes("how to book")
  ) {
    return `📅 **How to Book Your Appointment:**
1. Click the **Book Appointment** button below or tap the **Appointment** tab in the navigation bar.
2. Select your desired service, date, time slot, and preferred stylist.
3. Or WhatsApp/Call us directly at **+91 77386 13609** for instant booking!`;
  }

  // Default intelligent greeting & suggestions
  return `✨ Hello! I'm **Sugar AI**, your beauty consultant at Sugar Salon.

I can provide complete details on:
• **Full Service Menu & Pricing** (Facials, Waxing, Hair Care, Nails, Clean-Ups, D-Tan)
• **Personalized Recommendations** for your skin type (sensitive, oily, dry, or sun-tanned)
• **Pre-Bridal & Wedding Glam Packages**
• **Salon Timings (11 AM - 9 PM) & Appointment Booking**

What treatment or beauty advice can I help you with today?`;
};

// ─── Unified AI Caller (Supports Gemini FREE, Groq FREE, OpenAI, or Smart Engine) ───
export const sendChatMessage = async (messages) => {
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GOOGLE_API_KEY;
  const groqKey = import.meta.env.VITE_GROQ_API_KEY;
  const openAIKey = import.meta.env.VITE_OPENAI_API_KEY;

  const systemPrompt = buildSystemPrompt();
  const latestUserMessage = messages[messages.length - 1]?.content || "";

  // 1. Try Google Gemini API (100% Free from aistudio.google.com)
  if (geminiKey && geminiKey.trim() !== "") {
    try {
      const contents = messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey.trim()}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents,
            generationConfig: {
              maxOutputTokens: 600,
              temperature: 0.7,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch (e) {
      console.warn("Gemini API call failed, using smart custom engine:", e);
    }
  }

  // 2. Try Groq API (100% Free fast Llama-3 from console.groq.com)
  if (groqKey && groqKey.trim() !== "") {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqKey.trim()}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          max_tokens: 600,
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.choices?.[0]?.message?.content;
        if (text) return text;
      }
    } catch (e) {
      console.warn("Groq API call failed, using smart custom engine:", e);
    }
  }

  // 3. Try OpenAI API (if key with quota exists)
  if (openAIKey && openAIKey.trim() !== "") {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAIKey.trim()}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          max_tokens: 600,
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.choices?.[0]?.message?.content;
        if (text) return text;
      }
    } catch (e) {
      console.warn("OpenAI API call failed, using smart custom engine:", e);
    }
  }

  // 4. Instant Rich Custom Response Engine (Guaranteed 100% customized answer for every query!)
  return generateSmartLocalResponse(latestUserMessage);
};

// ─── Quick-start suggestion chips ───────────────────────────────────────────
export const QUICK_PROMPTS = [
  "What are all the services you offer?",
  "What facial is best for glowing skin?",
  "I'm preparing for a wedding, what packages do you have?",
  "What are your prices for waxing and hair care?",
  "What facial do you recommend for sensitive skin?",
  "What are your opening hours and address?",
];
