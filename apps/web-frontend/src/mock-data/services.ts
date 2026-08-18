import { DayOfWeek } from "@/domain/enums";
import type { Service } from "@/domain/types";

export const mockServices: Service[] = [
  // ---- Lens by Lahiru (biz-03) ----
  {
    id: "svc-01",
    businessId: "biz-03",
    categoryId: "cat-12",
    name: "Wedding Photography Package",
    description:
      "Full-day wedding coverage (up to 10 hours) with two photographers. Includes engagement session, 400+ edited digital images, and a premium photo book. Available island-wide.",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
    ],
    startingPrice: 125000,
    durationMinutes: 600,
    availability: {
      days: [DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY],
      startTime: "06:00",
      endTime: "20:00",
    },
    isAvailable: true,
    rating: 5.0,
    reviewCount: 34,
    featured: true,
    createdAt: "2021-10-01T08:00:00Z",
  },
  {
    id: "svc-02",
    businessId: "biz-03",
    categoryId: "cat-12",
    name: "Portrait Photography Session",
    description:
      "2-hour professional portrait session at our Colombo studio or an outdoor location of your choice. Includes 30 edited high-resolution images. Perfect for personal branding, family portraits, or milestone occasions.",
    images: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
    ],
    startingPrice: 18000,
    durationMinutes: 120,
    availability: {
      days: [DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY],
      startTime: "09:00",
      endTime: "17:00",
    },
    isAvailable: true,
    rating: 4.9,
    reviewCount: 47,
    featured: false,
    createdAt: "2022-01-15T08:00:00Z",
  },
  // ---- Nuha Henna Art (biz-04) ----
  {
    id: "svc-03",
    businessId: "biz-04",
    categoryId: "cat-09",
    name: "Bridal Mehendi — Full Package",
    description:
      "Comprehensive bridal mehendi service covering both hands to elbows and feet to knees with intricate traditional and Arabic fusion designs. Includes bride and 4 bridesmaids. Home visit available within Colombo.",
    images: [
      "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&h=600&fit=crop",
    ],
    startingPrice: 28000,
    durationMinutes: 300,
    availability: {
      days: [DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY],
      startTime: "09:00",
      endTime: "20:00",
    },
    location: "Home visit available (Colombo) or studio",
    isAvailable: true,
    rating: 4.9,
    reviewCount: 62,
    featured: true,
    createdAt: "2022-04-01T08:00:00Z",
  },
  {
    id: "svc-04",
    businessId: "biz-04",
    categoryId: "cat-09",
    name: "Simple Henna Design — 30 Min",
    description:
      "Quick and beautiful henna session — one hand with a simple to medium Arabic or floral design. Perfect for events, parties, and casual occasions.",
    images: [
      "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&h=600&fit=crop",
    ],
    startingPrice: 1500,
    durationMinutes: 30,
    availability: {
      days: [DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY],
      startTime: "10:00",
      endTime: "19:00",
    },
    isAvailable: true,
    rating: 4.7,
    reviewCount: 81,
    featured: false,
    createdAt: "2022-05-10T08:00:00Z",
  },
  // ---- FitLife (biz-07) ----
  {
    id: "svc-05",
    businessId: "biz-07",
    categoryId: "cat-08",
    name: "Personal Training Session",
    description:
      "One-on-one personal training tailored to your specific goals. Includes a full fitness assessment, customised workout plan, and nutrition guidance. Available at our Nugegoda gym or outdoor locations.",
    images: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop",
    ],
    startingPrice: 3500,
    durationMinutes: 60,
    availability: {
      days: [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY],
      startTime: "05:30",
      endTime: "21:00",
    },
    isAvailable: true,
    rating: 4.9,
    reviewCount: 95,
    featured: true,
    createdAt: "2022-02-01T08:00:00Z",
  },
  {
    id: "svc-06",
    businessId: "biz-07",
    categoryId: "cat-08",
    name: "Monthly Fitness Programme",
    description:
      "Full month personal training programme — 12 sessions, weekly check-ins, personalised meal plan, and WhatsApp support between sessions. Transformation guaranteed.",
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    ],
    startingPrice: 32000,
    durationMinutes: 60,
    availability: {
      days: [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY],
      startTime: "06:00",
      endTime: "20:00",
    },
    isAvailable: true,
    rating: 5.0,
    reviewCount: 33,
    featured: false,
    createdAt: "2022-03-15T08:00:00Z",
  },
  // ---- BrightMinds Academy (biz-12) ----
  {
    id: "svc-07",
    businessId: "biz-12",
    categoryId: "cat-01",
    name: "O/L Mathematics Tuition",
    description:
      "Comprehensive O/L Mathematics tuition following the Sri Lanka national curriculum. Small class sizes (max 8 students) for personalised attention. Mock papers and revision sessions included.",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
    ],
    startingPrice: 3500,
    durationMinutes: 90,
    availability: {
      days: [DayOfWeek.MONDAY, DayOfWeek.WEDNESDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY],
      startTime: "14:00",
      endTime: "20:00",
    },
    isAvailable: true,
    rating: 4.8,
    reviewCount: 38,
    featured: false,
    createdAt: "2019-04-01T08:00:00Z",
  },
  {
    id: "svc-08",
    businessId: "biz-12",
    categoryId: "cat-01",
    name: "A/L Combined Mathematics",
    description:
      "A/L Combined Maths classes covering Pure Mathematics, Statistics, and Mechanics. Cambridge and Sri Lankan syllabus both catered for. Online options available.",
    images: [
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop",
    ],
    startingPrice: 4500,
    durationMinutes: 120,
    availability: {
      days: [DayOfWeek.TUESDAY, DayOfWeek.THURSDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY],
      startTime: "14:00",
      endTime: "20:00",
    },
    isAvailable: true,
    rating: 4.9,
    reviewCount: 29,
    featured: false,
    createdAt: "2020-01-15T08:00:00Z",
  },
  // ---- Silva & Associates (biz-14) ----
  {
    id: "svc-09",
    businessId: "biz-14",
    categoryId: "cat-13",
    name: "Legal Consultation — 1 Hour",
    description:
      "Professional legal consultation with a qualified attorney covering property law, business registration, or civil matters. Confidential, structured, and solution-focused.",
    images: [
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
    ],
    startingPrice: 5000,
    durationMinutes: 60,
    availability: {
      days: [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY],
      startTime: "09:00",
      endTime: "17:00",
    },
    location: "34 Chatham Street, Colombo 1 or online",
    isAvailable: true,
    rating: 4.7,
    reviewCount: 18,
    featured: false,
    createdAt: "2017-03-01T08:00:00Z",
  },
  // ---- Visions by Thilini (biz-19) ----
  {
    id: "svc-10",
    businessId: "biz-19",
    categoryId: "cat-12",
    name: "Maternity Photography Session",
    description:
      "Intimate and beautiful maternity photography session (2 hours) capturing this precious milestone. Includes styling guidance, props, and 40 edited digital images. Available in studio or outdoor in Kandy.",
    images: [
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&h=600&fit=crop",
    ],
    startingPrice: 22000,
    durationMinutes: 120,
    availability: {
      days: [DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY],
      startTime: "08:00",
      endTime: "17:00",
    },
    location: "Kandy (studio or outdoor) — travel fee applies outside Kandy",
    isAvailable: true,
    rating: 4.9,
    reviewCount: 22,
    featured: true,
    createdAt: "2023-05-01T08:00:00Z",
  },
  {
    id: "svc-11",
    businessId: "biz-19",
    categoryId: "cat-12",
    name: "Family Portrait Session",
    description:
      "2-hour family portrait session at a beautiful outdoor location in Kandy. Includes 35 edited images delivered via online gallery within 7 days.",
    images: [
      "https://images.unsplash.com/photo-1540539234-c14a20fb7c7b?w=800&h=600&fit=crop",
    ],
    startingPrice: 15000,
    durationMinutes: 120,
    availability: {
      days: [DayOfWeek.SATURDAY, DayOfWeek.SUNDAY],
      startTime: "06:00",
      endTime: "18:00",
    },
    location: "Kandy outdoor locations",
    isAvailable: true,
    rating: 5.0,
    reviewCount: 15,
    featured: false,
    createdAt: "2023-06-10T08:00:00Z",
  },
  // ---- Nuha extra ----
  {
    id: "svc-12",
    businessId: "biz-04",
    categoryId: "cat-09",
    name: "Event Henna — Group Booking (5 People)",
    description:
      "Group henna booking for events, parties, bridal showers, or corporate functions. Each guest receives a simple to medium design on one hand. Minimum 5 people.",
    images: [
      "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&h=600&fit=crop",
    ],
    startingPrice: 6000,
    durationMinutes: 180,
    availability: {
      days: [DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY],
      startTime: "10:00",
      endTime: "20:00",
    },
    location: "Event location (within Colombo district)",
    isAvailable: true,
    rating: 4.8,
    reviewCount: 19,
    featured: false,
    createdAt: "2022-06-01T08:00:00Z",
  },
  // ---- FitLife extra ----
  {
    id: "svc-13",
    businessId: "biz-07",
    categoryId: "cat-08",
    name: "Yoga & Flexibility Session",
    description:
      "60-minute guided yoga and flexibility session for all levels. Includes breathing exercises, posture correction, and mindfulness techniques. Morning or evening slots available.",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    ],
    startingPrice: 2500,
    durationMinutes: 60,
    availability: {
      days: [DayOfWeek.MONDAY, DayOfWeek.WEDNESDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY],
      startTime: "06:00",
      endTime: "20:00",
    },
    isAvailable: true,
    rating: 4.8,
    reviewCount: 44,
    featured: false,
    createdAt: "2022-07-01T08:00:00Z",
  },
  // ---- Lens by Lahiru extra ----
  {
    id: "svc-14",
    businessId: "biz-03",
    categoryId: "cat-12",
    name: "Corporate Event Photography",
    description:
      "Professional coverage for corporate events, conferences, product launches, and team activities. Includes same-day preview delivery and full gallery within 48 hours.",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    ],
    startingPrice: 35000,
    durationMinutes: 480,
    availability: {
      days: [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY],
      startTime: "08:00",
      endTime: "20:00",
    },
    isAvailable: true,
    rating: 4.9,
    reviewCount: 13,
    featured: false,
    createdAt: "2022-09-01T08:00:00Z",
  },
  // ---- BrightMinds extra ----
  {
    id: "svc-15",
    businessId: "biz-12",
    categoryId: "cat-01",
    name: "English Language Coaching",
    description:
      "Spoken and written English coaching for O/L students, professionals, and adults. Focus on conversation, grammar, business writing, and exam preparation (IELTS/TOEFL).",
    images: [
      "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=800&h=600&fit=crop",
    ],
    startingPrice: 3000,
    durationMinutes: 60,
    availability: {
      days: [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY],
      startTime: "09:00",
      endTime: "20:00",
    },
    isAvailable: true,
    rating: 4.7,
    reviewCount: 31,
    featured: false,
    createdAt: "2020-06-01T08:00:00Z",
  },
  // ---- Silva extra ----
  {
    id: "svc-16",
    businessId: "biz-14",
    categoryId: "cat-13",
    name: "Business Registration & Documentation",
    description:
      "End-to-end company registration service — sole proprietorships, partnerships, and private limited companies. Includes Registrar of Companies filing, BOI queries, and all documentation.",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop",
    ],
    startingPrice: 15000,
    durationMinutes: 90,
    availability: {
      days: [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY],
      startTime: "08:30",
      endTime: "17:00",
    },
    location: "34 Chatham Street, Colombo 1",
    isAvailable: true,
    rating: 4.6,
    reviewCount: 9,
    featured: false,
    createdAt: "2018-01-15T08:00:00Z",
  },
  // ---- Lens by Lahiru extra ----
  {
    id: "svc-17",
    businessId: "biz-03",
    categoryId: "cat-12",
    name: "Social Media Content Shoot",
    description:
      "Half-day content creation session (4 hours) for influencers, brands, and entrepreneurs. Includes product/lifestyle photography and short-form video reels. Delivered within 3 days.",
    images: [
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop",
    ],
    startingPrice: 28000,
    durationMinutes: 240,
    availability: {
      days: [DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY],
      startTime: "09:00",
      endTime: "17:00",
    },
    isAvailable: true,
    rating: 4.9,
    reviewCount: 26,
    featured: false,
    createdAt: "2023-01-10T08:00:00Z",
  },
  // ---- FitLife extra ----
  {
    id: "svc-18",
    businessId: "biz-07",
    categoryId: "cat-08",
    name: "Nutrition Consultation",
    description:
      "1-hour personalised nutrition consultation with a certified nutritionist. Includes dietary assessment, personalised meal plan, and supplement recommendations.",
    images: [
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop",
    ],
    startingPrice: 4500,
    durationMinutes: 60,
    availability: {
      days: [DayOfWeek.TUESDAY, DayOfWeek.THURSDAY, DayOfWeek.SATURDAY],
      startTime: "09:00",
      endTime: "17:00",
    },
    isAvailable: true,
    rating: 4.8,
    reviewCount: 37,
    featured: false,
    createdAt: "2022-10-01T08:00:00Z",
  },
  // ---- Nuha extra ----
  {
    id: "svc-19",
    businessId: "biz-04",
    categoryId: "cat-09",
    name: "Arabic Henna — Both Hands",
    description:
      "Beautiful Arabic-style henna design on both hands up to the wrist. Elegant floral and paisley patterns. Suitable for weddings, Eid, and special occasions. 45–60 minute session.",
    images: [
      "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&h=600&fit=crop",
    ],
    startingPrice: 2800,
    durationMinutes: 60,
    availability: {
      days: [DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY],
      startTime: "10:00",
      endTime: "19:00",
    },
    isAvailable: true,
    rating: 4.8,
    reviewCount: 53,
    featured: false,
    createdAt: "2022-07-15T08:00:00Z",
  },
  // ---- BrightMinds extra ----
  {
    id: "svc-20",
    businessId: "biz-12",
    categoryId: "cat-01",
    name: "Science Tuition — Biology & Chemistry",
    description:
      "O/L Biology and Chemistry tuition with practical guidance. Theory, past paper analysis, and lab experiment explanations. Small batch: max 6 students per session.",
    images: [
      "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&h=600&fit=crop",
    ],
    startingPrice: 3500,
    durationMinutes: 90,
    availability: {
      days: [DayOfWeek.TUESDAY, DayOfWeek.THURSDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY],
      startTime: "14:00",
      endTime: "20:00",
    },
    isAvailable: true,
    rating: 4.7,
    reviewCount: 27,
    featured: false,
    createdAt: "2021-09-01T08:00:00Z",
  },
];
