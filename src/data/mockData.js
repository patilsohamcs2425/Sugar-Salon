export const MOCK_SERVICES = [
  {
    id: "srv-1",
    title: "Signature Full Body Organic Sugar Waxing",
    category: "sugar-waxing",
    price: 1899,
    duration: "75 mins",
    rating: 4.9,
    reviews: 320,
    popular: true,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    description: "Our signature 100% natural, hypoallergenic sugar paste recipe removes hair gently from the root without irritation or ingrowns. Leaves skin velvety smooth for up to 5 weeks.",
    benefits: [
      "100% Organic sugar, lemon & water paste",
      "Less painful than traditional resin wax",
      "Prevents ingrown hair & exfoliates dead skin",
      "Longer lasting silky results"
    ]
  },
  {
    id: "srv-2",
    title: "Brazilian & Underarm Sugar Combo",
    category: "sugar-waxing",
    price: 1199,
    duration: "45 mins",
    rating: 5.0,
    reviews: 245,
    popular: true,
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80",
    description: "Complete smooth coverage for delicate zones using warm soothing sugar gel followed by an organic chamomile cooling mask.",
    benefits: [
      "Targeted gentle extraction",
      "Post-wax soothing botanical mask",
      "Smooth finish up to 4-6 weeks"
    ]
  },
  {
    id: "srv-3",
    title: "Diamond Radiance HydraFacial",
    category: "facials-skin",
    price: 2499,
    duration: "60 mins",
    rating: 4.9,
    reviews: 198,
    popular: true,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    description: "Multi-step dermal infusion treatment that deeply cleanses, painless extractions with vortex suction, and saturates skin with hyaluronic acid and antioxidant peptides.",
    benefits: [
      "Instant glass-skin glow",
      "Reduces fine lines & pore congestion",
      "Deep cellular hydration"
    ]
  },
  {
    id: "srv-4",
    title: "Dimensional Sun-Kissed Balayage & Gloss",
    category: "hair-styling",
    price: 3499,
    duration: "180 mins",
    rating: 4.95,
    reviews: 215,
    popular: true,
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
    description: "Hand-painted custom highlights blended seamlessly with a tailored tone-matching gloss glaze and deep bond builder treatment.",
    benefits: [
      "Custom color formulation",
      "Olaplex bond protection",
      "Includes blowout & luxury styling"
    ]
  },
  {
    id: "srv-5",
    title: "Silk Press & Botanical Scalp Detox",
    category: "hair-styling",
    price: 1499,
    duration: "90 mins",
    rating: 4.8,
    reviews: 162,
    popular: false,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    description: "Clarifying tea tree scalp scrub, steam hydration infusion, thermal shield protection, and ultra-sleek high-shine flat iron styling.",
    benefits: [
      "Scalp circulation revitalization",
      "Weightless natural movement & heat barrier",
      "Zero chemical damage"
    ]
  },
  {
    id: "srv-6",
    title: "Luxe Russian Gel Manicure & BIAB",
    category: "nail-art",
    price: 1299,
    duration: "75 mins",
    rating: 4.9,
    reviews: 180,
    popular: true,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
    description: "Meticulous dry e-file cuticle detail work followed by Builder In A Bottle (BIAB) nail strengthening overlay and hand-painted nail design.",
    benefits: [
      "Chip-free perfection up to 4 weeks",
      "Strengthens natural brittle nails",
      "Includes organic hand scrub massage"
    ]
  },
  {
    id: "srv-7",
    title: "Keratin Lash Lift & Brow Lamination Sculpt",
    category: "lash-brows",
    price: 1799,
    duration: "60 mins",
    rating: 4.85,
    reviews: 140,
    popular: false,
    image: "https://images.unsplash.com/photo-1583001809873-a1284d563177?auto=format&fit=crop&w=800&q=80",
    description: "Lifts and curls natural lashes while restructuring brow hairs for a fuller, fluffy, brushed-up model brow look infused with keratin conditioning.",
    benefits: [
      "Lasts 6 to 8 weeks",
      "Custom tinting included",
      "Zero maintenance required"
    ]
  },
  {
    id: "srv-8",
    title: "Royal Bridal Glam & Hair Trial Package",
    category: "bridal-spa",
    price: 6999,
    duration: "240 mins",
    rating: 5.0,
    reviews: 95,
    popular: true,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    description: "Complete bridal consultation including full hair trial, HD airbrush makeup, glass skin pre-facial, and complimentary welcome beverage.",
    benefits: [
      "Includes pre-wedding preview session",
      "HD camera-ready airbrush makeup",
      "All day waterproof setting finish"
    ]
  }
];

export const MOCK_OFFERS = [
  {
    id: "off-1",
    title: "First-Time Sugar Glow Pass",
    code: "SUGAR20",
    discount: "20% OFF",
    description: "Enjoy 20% off your first Organic Sugar Waxing or HydraFacial booking at Sugar Salon Marol.",
    expiry: "Valid All Month",
    badge: "New Client Offer",
    bgGradient: "from-pink-900/60 via-pink-950 to-slate-900",
    borderAccent: "border-pink-500/40"
  },
  {
    id: "off-2",
    title: "Silk & Glow Midweek Pamper",
    code: "MIDWEEK500",
    discount: "₹500 OFF",
    description: "Book any Hair Styling & Facial combo on Tuesday, Wednesday, or Thursday.",
    expiry: "Limited Weekly Slots",
    badge: "Popular Deal",
    bgGradient: "from-purple-900/60 via-slate-900 to-slate-950",
    borderAccent: "border-purple-500/40"
  },
  {
    id: "off-3",
    title: "Bridal Party Glam Bundle",
    code: "BRIDEGLAM",
    discount: "BUY 3 GET 1 FREE",
    description: "Bring your bridesmaids for gel nails & facial treatments and get the 4th session complimentary.",
    expiry: "Seasonal Offer",
    badge: "Group Package",
    bgGradient: "from-amber-900/50 via-slate-900 to-slate-950",
    borderAccent: "border-amber-500/40"
  }
];

export const MOCK_GALLERY = [
  {
    id: "gal-1",
    title: "Warm Caramel Balayage & Silk Waves",
    category: "hair-styling",
    imageBefore: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80",
    imageAfter: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80",
    stylist: "Marcus Vance",
    description: "Transformed dull dark roots into a vibrant multi-dimensional caramel sweep."
  },
  {
    id: "gal-2",
    title: "HydraFacial Glass Skin Transformation",
    category: "facials-skin",
    imageBefore: "https://images.unsplash.com/photo-1512290900673-7002ffffff?auto=format&fit=crop&w=600&q=80",
    imageAfter: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
    stylist: "Elena Rostova",
    description: "Clearing pore congestion and instilling deep moisture radiance."
  },
  {
    id: "gal-3",
    title: "Cat-Eye Hybrid Lash Lift & Tint",
    category: "lash-brows",
    imageBefore: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    imageAfter: "https://images.unsplash.com/photo-1583001809873-a1284d563177?auto=format&fit=crop&w=600&q=80",
    stylist: "Amara Okonjo",
    description: "Volumized natural lash line with feather-light dark tint."
  },
  {
    id: "gal-4",
    title: "Rose Gold Quartz BIAB Gel Nails",
    category: "nail-art",
    imageBefore: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    imageAfter: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
    stylist: "Sophia Chen",
    description: "Structured overlay with micro-shimmer foil accents."
  }
];

export const MOCK_FEEDBACK = [
  {
    id: "fb-1",
    author: "Shraddha Parab",
    role: "Google Maps Reviewer",
    rating: 5,
    service: "Signature Full Body Organic Sugar Waxing",
    date: "1 week ago",
    isGoogleReview: true,
    comment: "Best experience for sugar waxing in Marol! Staff is very cooperative, polite, and professional. The salon is extremely clean, hygienic, and well maintained near T2 airport. Highly recommended for painless organic sugar waxing!"
  },
  {
    id: "fb-2",
    author: "Kinjal Shah",
    role: "Google Maps Reviewer",
    rating: 5,
    service: "Hair Styling & Organic Sugar Waxing",
    date: "2 weeks ago",
    isGoogleReview: true,
    comment: "Got my hair styling and organic sugar waxing done here at Sugar Salon Zenith CHS. Amazing service and very soft-spoken staff. Sugar waxing is so much gentler than normal resin wax! Will definitely visit again."
  },
  {
    id: "fb-3",
    author: "Priyanka Deshmukh",
    role: "Google Maps Reviewer",
    rating: 4,
    service: "Full Arms & Legs Sugar Waxing",
    date: "2 weeks ago",
    isGoogleReview: true,
    comment: "Very gentle sugar waxing treatment. Skin felt super smooth afterwards without any redness. The salon is clean and aesthetic. Had to wait 10 mins past my appointment time during weekend rush, but service quality made up for it!"
  },
  {
    id: "fb-4",
    author: "Deepika Nair",
    role: "Google Maps Reviewer",
    rating: 5,
    service: "Diamond Radiance HydraFacial",
    date: "3 weeks ago",
    isGoogleReview: true,
    comment: "Superb service by the Sugar Salon team. Very neat and clean place on Marol Maroshi Road. The organic treatment left my skin feeling super smooth without any irritation. Worth every rupee!"
  },
  {
    id: "fb-5",
    author: "Aarti Sharma",
    role: "Google Maps Reviewer",
    rating: 3,
    service: "Brazilian Sugar Wax Combo",
    date: "3 weeks ago",
    isGoogleReview: true,
    comment: "The sugar waxing result was good and painless, but weekend parking near Marol Maroshi road was slightly tricky. Overall good hygienic salon, but recommended to book your slot in advance!"
  },
  {
    id: "fb-6",
    author: "Rashmi Kadam",
    role: "Google Maps Reviewer",
    rating: 5,
    service: "Facial & Gel Nails Spa",
    date: "1 month ago",
    isGoogleReview: true,
    comment: "Loved the facial and nail service here! The ambiance is so calming and the timings (11 AM to 9 PM) are super convenient for working professionals after office hours."
  },
  {
    id: "fb-7",
    author: "Pooja Malhotra",
    role: "Verified Guest",
    rating: 4,
    service: "Diamond Radiance HydraFacial",
    date: "1 month ago",
    isGoogleReview: false,
    comment: "HydraFacial gave an instant glass skin glow before my cousin's wedding. Specialist Elena explained each step nicely. A bit busy on Sundays, so definitely schedule ahead!"
  },
  {
    id: "fb-8",
    author: "Ananya Mehta",
    role: "Sugar VIP Member",
    rating: 5,
    service: "Signature Organic Sugar Waxing",
    date: "1 month ago",
    isGoogleReview: false,
    comment: "I've been a regular member for 6 months now. The organic sugar paste is hypoallergenic and so much better than traditional wax. The staff is consistently polite and welcoming."
  },
  {
    id: "fb-9",
    author: "Meera Joshi",
    role: "Google Maps Reviewer",
    rating: 4,
    service: "Luxe Russian Gel Manicure",
    date: "2 months ago",
    isGoogleReview: true,
    comment: "Clean, cozy salon right near T2 airport. Russian gel nail art lasted 4 full weeks without chipping. Great attention to detail."
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: "APT-8821",
    clientName: "Shraddha Parab",
    clientEmail: "shraddha@example.com",
    clientPhone: "098200 12345",
    serviceTitle: "Signature Full Body Organic Sugar Waxing",
    stylistName: "Elena Rostova",
    date: "2026-08-10",
    timeSlot: "11:30 AM",
    price: 1899,
    status: "Confirmed",
    createdAt: "2026-08-05"
  },
  {
    id: "APT-8822",
    clientName: "Kinjal Shah",
    clientEmail: "kinjal@example.com",
    clientPhone: "098765 43210",
    serviceTitle: "Diamond Radiance HydraFacial",
    stylistName: "Elena Rostova",
    date: "2026-08-11",
    timeSlot: "02:00 PM",
    price: 2499,
    status: "Completed",
    createdAt: "2026-08-04"
  },
  {
    id: "APT-8823",
    clientName: "Deepika Nair",
    clientEmail: "deepika@example.com",
    clientPhone: "097654 32109",
    serviceTitle: "Dimensional Sun-Kissed Balayage & Gloss",
    stylistName: "Marcus Vance",
    date: "2026-08-12",
    timeSlot: "04:00 PM",
    price: 3499,
    status: "Pending",
    createdAt: "2026-08-06"
  }
];
