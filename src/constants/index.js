export const SALON_INFO = {
  name: "Sugar Salon",
  tagline: "Premier Beauty Salon & Sugar Care in Marol, Andheri East, Mumbai",
  phone: "077386 13609",
  phoneFormatted: "+91 77386 13609",
  whatsapp: "917738613609",
  email: "sugarsalon6@gmail.com",
  address: "Shop No C-28, Zenith CHS LTD, Marol Maroshi Rd, near T2 International Airport, Bhavani Nagar, Marol, Andheri East, Mumbai, Maharashtra 400059",
  shortLocation: "Marol, Andheri East, Mumbai (Near T2 Airport)",
  googleMapsUrl: "https://www.google.com/maps/place/Jawed+Habib+Hair+Studio+is+Sugar+Salon/@19.1185153,72.8804929,723m/data=!3m1!1e3!4m8!3m7!1s0x3be7c81748c38841:0x5d6bcd1d4fd43695!8m2!3d19.1185153!4d72.8804929!9m1!1b1!16s%2Fg%2F11j973pvw8?entry=ttu",
  hours: [
    { days: "Monday - Sunday (7 Days)", time: "11:00 AM - 9:00 PM" }
  ],
  socials: {
    instagram: "https://www.instagram.com/sugarsalon.unisex?igsh=MWJzcmllMXlpYjM2dg==",
    googleMaps: "https://www.google.com/maps/place/Jawed+Habib+Hair+Studio+is+Sugar+Salon/@19.1185153,72.8804929,723m/data=!3m1!1e3!4m8!3m7!1s0x3be7c81748c38841:0x5d6bcd1d4fd43695!8m2!3d19.1185153!4d72.8804929!9m1!1b1!16s%2Fg%2F11j973pvw8?entry=ttu"
  }
};

export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "AI Finder", path: "/recommendation", badge: "Smart Quiz" },
  { name: "Appointment", path: "/appointment" },
  { name: "Gallery", path: "/gallery" },
  { name: "Offers", path: "/offers", badge: "Deals" },
  { name: "Feedback", path: "/feedback" },
  { name: "Contact", path: "/contact" }
];

export const SERVICE_CATEGORIES = [
  { id: "all", name: "All Experiences" },
  { id: "facials", name: "Facials" },
  { id: "clean-up", name: "Clean Up" },
  { id: "dtan-bleach", name: "D-Tan & Bleach" },
  { id: "hands-legs", name: "Hands & Legs (Mani-Pedi)" },
  { id: "nail-care", name: "Nail Filling & Paint" },
  { id: "threading-essentials", name: "Body Essentials & Threading" },
  { id: "waxing", name: "Waxing Care" },
  { id: "bridal", name: "Bridal & Make Up" }
];

export const STYLISTS = [
  {
    id: "st-1",
    name: "Elena Rostova",
    role: "Senior Sugar Technologist & Aesthetician",
    experience: "10+ Years Experience",
    rating: 4.9,
    reviewsCount: 210,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    bio: "Specializing in gentle sugar waxing, deep pore skin extractions, and glass-skin radiance treatments.",
    specialties: ["O3+ Clinical Facials", "Rica Waxing", "Pre-Bridal Glam"]
  },
  {
    id: "st-2",
    name: "Marcus Vance",
    role: "Senior Hair Colorist & Stylist",
    experience: "8+ Years Experience",
    rating: 5.0,
    reviewsCount: 184,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    bio: "Renowned balayage specialist creating vibrant natural highlights and precision hair cuts.",
    specialties: ["Balayage & Highlights", "Hair Smoothening", "Precision Cuts"]
  },
  {
    id: "st-3",
    name: "Sophia Chen",
    role: "Luxe Nail Artist & Sculptor",
    experience: "7+ Years Experience",
    rating: 4.9,
    reviewsCount: 156,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    bio: "Creating custom 3D nail art, BIAB gel overlays, and luxury spa manicures.",
    specialties: ["Custom 3D Gel Art", "Russian Manicure", "BIAB Overlay"]
  },
  {
    id: "st-4",
    name: "Amara Okonjo",
    role: "Lash Master & Brow Artist",
    experience: "6+ Years Experience",
    rating: 4.8,
    reviewsCount: 142,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    bio: "Expert in hybrid lash extensions, volume lashes, and brow lamination.",
    specialties: ["Hybrid Lash Extensions", "Brow Lamination", "Microblading"]
  }
];

export const MEMBERSHIP_TIERS = [
  {
    id: "silver",
    name: "Sugar Glow Club",
    price: "₹1,999/mo",
    features: [
      "1 Monthly Organic Sugar Waxing Session",
      "10% off all retail haircare & skincare products",
      "Priority online appointment slot reservations",
      "Complimentary beverage welcome"
    ],
    accent: "border-pink-500/30 text-pink-400"
  },
  {
    id: "gold",
    name: "Sugar VIP Luxe",
    popular: true,
    price: "₹3,499/mo",
    features: [
      "2 Monthly Sugar Waxing or Express Facial treatments",
      "15% off all salon menu services & treatments",
      "Free monthly Custom Hair Conditioning Spa",
      "Bring a friend for 20% off on their first visit",
      "Dedicated WhatsApp concierge booking line"
    ],
    accent: "border-amber-400 bg-gradient-to-b from-amber-500/10 to-transparent text-amber-300"
  },
  {
    id: "diamond",
    name: "Sugar Royal Platinum",
    price: "₹5,999/mo",
    features: [
      "Unlimited Full Body Waxing (Rica)",
      "1 Monthly Deluxe O3+ Whitening Facial",
      "20% off all hair coloring & bridal packages",
      "Free Birthday Beauty Glam Voucher",
      "VIP private salon suite access"
    ],
    accent: "border-purple-500/30 text-purple-300"
  }
];
