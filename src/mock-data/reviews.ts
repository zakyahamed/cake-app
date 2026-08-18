import type { Review } from "@/domain/types";

export const mockReviews: Review[] = [
  // Divini Cakes (biz-01) reviews
  {
    id: "rev-01",
    customerId: "user-01",
    businessId: "biz-01",
    rating: 5,
    comment:
      "Absolutely stunning cake! The 2kg chocolate drip cake was a masterpiece. My daughter was in tears (happy ones!) when she saw it. The taste matched the looks — incredibly moist and rich. Will definitely order again.",
    orderId: "ord-01",
    createdAt: "2024-01-17T09:00:00Z",
  },
  {
    id: "rev-02",
    customerId: "user-02",
    businessId: "biz-01",
    rating: 5,
    comment:
      "Ordered two premium dessert boxes for a corporate event. Every single piece was perfection. Guests kept asking where they were from. The brownies and truffles were especially outstanding.",
    orderId: "ord-04",
    createdAt: "2024-01-24T16:00:00Z",
  },
  {
    id: "rev-03",
    customerId: "user-04",
    businessId: "biz-01",
    rating: 5,
    comment:
      "Best bakery in Colombo without a doubt. The attention to detail on our birthday cake was extraordinary. Prompt delivery, beautiful packaging, and tastes even better than it looks.",
    createdAt: "2023-12-20T11:00:00Z",
  },
  {
    id: "rev-04",
    customerId: "user-05",
    businessId: "biz-01",
    rating: 4,
    comment:
      "Lovely cake — the fondant flowers were hand-crafted beautifully. Slightly late delivery (about 30 mins) but overall a wonderful experience. The vanilla sponge was divine.",
    createdAt: "2023-11-15T14:00:00Z",
  },
  // Lens by Lahiru (biz-03) reviews
  {
    id: "rev-05",
    customerId: "user-01",
    businessId: "biz-03",
    rating: 5,
    comment:
      "Lahiru is genuinely talented. My personal branding shoot produced images I never expected — cinematic, warm, and authentic. He made me completely comfortable in front of the camera. These photos have transformed my LinkedIn and Instagram presence.",
    bookingId: "book-01",
    createdAt: "2024-01-17T12:00:00Z",
  },
  {
    id: "rev-06",
    customerId: "user-02",
    businessId: "biz-03",
    rating: 5,
    comment:
      "Hired Lahiru for our product launch event. The photos were delivered within 48 hours as promised, and every single shot captured the energy of the event. Professional, unobtrusive, and incredibly skilled.",
    bookingId: "book-15",
    createdAt: "2024-02-10T09:00:00Z",
  },
  // Nuha Henna Art (biz-04) reviews
  {
    id: "rev-07",
    customerId: "user-03",
    businessId: "biz-04",
    rating: 5,
    comment:
      "Nuha did the most beautiful bridal mehendi I have ever seen. The detail work on the full package was exceptional — every pattern was crisp and intricate. She was also incredibly patient and professional. My wedding photos looked absolutely stunning.",
    bookingId: "book-03",
    createdAt: "2024-01-30T10:00:00Z",
  },
  {
    id: "rev-08",
    customerId: "user-06",
    businessId: "biz-04",
    rating: 5,
    comment:
      "Beautiful Arabic designs. Nuha is fast, clean, and the designs come out exactly as shown in her portfolio. The henna quality was excellent — the colour developed beautifully. Highly recommend.",
    createdAt: "2024-01-08T15:00:00Z",
  },
  // Amma's Kitchen (biz-06) reviews
  {
    id: "rev-09",
    customerId: "user-01",
    businessId: "biz-06",
    rating: 5,
    comment:
      "This is the closest thing to a home-cooked Sri Lankan meal I have had since leaving home. The dhal curry reminded me of my grandmother's cooking. Always hot, always on time, always delicious. Amma's Kitchen is a treasure.",
    orderId: "ord-02",
    createdAt: "2024-01-19T13:00:00Z",
  },
  {
    id: "rev-10",
    customerId: "user-04",
    businessId: "biz-06",
    rating: 5,
    comment:
      "Best kottu in the area, and the rice and curry set is incredibly generous. The pol sambol is absolutely authentic. Pickup was ready exactly when they said it would be. This is now my weekly go-to.",
    orderId: "ord-06",
    createdAt: "2024-02-03T14:00:00Z",
  },
  // FitLife (biz-07) reviews
  {
    id: "rev-11",
    customerId: "user-01",
    businessId: "biz-07",
    rating: 5,
    comment:
      "My nutrition consultation with the FitLife team completely changed how I approach food. The meal plan was practical, realistic, and tailored to Sri Lankan eating habits. Feeling much more energetic after just two weeks.",
    bookingId: "book-14",
    createdAt: "2024-02-02T10:00:00Z",
  },
  {
    id: "rev-12",
    customerId: "user-04",
    businessId: "biz-07",
    rating: 5,
    comment:
      "The yoga session was exactly what I needed. Calm, well-structured, and the instructor is very attentive to form. Great for beginners. Will book the monthly programme next.",
    bookingId: "book-04",
    createdAt: "2024-02-05T08:00:00Z",
  },
  // Glow Cosmetics (biz-08) reviews
  {
    id: "rev-13",
    customerId: "user-03",
    businessId: "biz-08",
    rating: 5,
    comment:
      "The Vitamin C serum is genuinely incredible. I have tried countless serums and this one actually works. In 3 weeks I noticed a visible improvement in my dark spots and my skin tone is so much more even. Supporting local and loving it.",
    orderId: "ord-05",
    createdAt: "2024-01-28T11:00:00Z",
  },
  {
    id: "rev-14",
    customerId: "user-01",
    businessId: "biz-08",
    rating: 4,
    comment:
      "Love the brightening range. The moisturiser with SPF is my daily staple. Great packaging, prompt delivery, and love that it's cruelty-free. Would give 5 stars if the shipping was a little faster.",
    createdAt: "2023-12-01T09:00:00Z",
  },
  // Crafted with Love (biz-09) reviews
  {
    id: "rev-15",
    customerId: "user-05",
    businessId: "biz-09",
    rating: 5,
    comment:
      "Ordered a medium premium gift box for my mother's birthday — it arrived beautifully wrapped and felt incredibly premium. Every item inside was thoughtfully chosen. My mother was overjoyed. Will absolutely order again.",
    orderId: "ord-08",
    createdAt: "2024-02-14T12:00:00Z",
  },
  {
    id: "rev-16",
    customerId: "user-06",
    businessId: "biz-09",
    rating: 5,
    comment:
      "The photo keychains were perfect — the photos were clear and the resin quality is excellent. They didn't scratch at all even after daily use. Great for gifts and the custom message note was a lovely touch.",
    orderId: "ord-09",
    createdAt: "2024-02-15T10:00:00Z",
  },
  // Visions by Thilini (biz-19) reviews
  {
    id: "rev-17",
    customerId: "user-07",
    businessId: "biz-19",
    rating: 5,
    comment:
      "Thilini has an incredible eye for natural light and genuine emotion. Our family portraits were delivered within the week and every single photo is framed-worthy. She made our kids laugh and feel completely at ease. Truly exceptional.",
    bookingId: "book-08",
    createdAt: "2024-01-25T14:00:00Z",
  },
  // SugarCraft (biz-16) reviews
  {
    id: "rev-18",
    customerId: "user-09",
    businessId: "biz-16",
    rating: 5,
    comment:
      "The Belgian chocolate cake was the best I have ever had in Sri Lanka. The mirror glaze was flawless, and the ganache filling was perfectly balanced — not too sweet. A special occasion cake that truly felt special.",
    createdAt: "2024-01-10T11:00:00Z",
  },
  // BrightMinds (biz-12) reviews
  {
    id: "rev-19",
    customerId: "user-10",
    businessId: "biz-12",
    rating: 5,
    comment:
      "My son struggled with O/L Mathematics for years. After just one month with BrightMinds, his confidence has transformed. The teaching style is patient, clear, and the small class size means he actually gets individual help. Highly recommend.",
    bookingId: "book-12",
    createdAt: "2024-01-30T15:00:00Z",
  },
  // Sweetbite Bakery (biz-02) reviews
  {
    id: "rev-20",
    customerId: "user-07",
    businessId: "biz-02",
    rating: 4,
    comment:
      "Fresh, tasty croissants every morning. The chocolate filling is generously applied and the pastry is perfectly flaky. A genuine Kandy gem. Slightly wish they were open on Sundays too!",
    createdAt: "2024-01-12T08:30:00Z",
  },
  // Spice Route Cafe (biz-13) reviews
  {
    id: "rev-21",
    customerId: "user-01",
    businessId: "biz-13",
    rating: 4,
    comment:
      "The kottu waffle is a genius invention. Crispy, flavourful, and the gravy is spot-on. The smoothie bowl was refreshing and very generous with fruit. A bit busy on weekends but worth the wait.",
    createdAt: "2023-11-20T13:00:00Z",
  },
  // Lanka Herbal (biz-10) reviews
  {
    id: "rev-22",
    customerId: "user-07",
    businessId: "biz-10",
    rating: 5,
    comment:
      "The curry leaf hair oil is a revelation. My hair fall reduced noticeably within 3 weeks of consistent use. The scent is earthy and pleasant — not chemical at all. Love that it comes from a proper Ayurvedic background.",
    createdAt: "2024-02-01T09:00:00Z",
  },
  // Curry Culture (biz-17) reviews
  {
    id: "rev-23",
    customerId: "user-08",
    businessId: "biz-17",
    rating: 5,
    comment:
      "The Sri Lankan tasting box is the best gift I have ever received from a local business. Every dish in the box was a distinct, well-prepared expression of Sri Lankan cuisine. The ambul thiyal was restaurant quality. Will order for every family visit.",
    createdAt: "2024-01-28T18:00:00Z",
  },
  // Threadworks (biz-20) reviews
  {
    id: "rev-24",
    customerId: "user-05",
    businessId: "biz-20",
    rating: 5,
    comment:
      "The Jaffna silk saree I ordered was breathtaking. The royal blue with gold zari border was exactly as pictured. Delivery was carefully packaged and arrived safely in perfect condition. An authentic piece of Northern craftsmanship.",
    createdAt: "2024-02-01T12:00:00Z",
  },
  // Casa Interiors (biz-11) reviews
  {
    id: "rev-25",
    customerId: "user-09",
    businessId: "biz-11",
    rating: 4,
    comment:
      "The rattan wall planters are adorable and the quality is much better than expected for the price. They complement my bohemian living room perfectly. Delivery was prompt and they were wrapped securely. Will order more pieces soon.",
    createdAt: "2024-01-22T16:00:00Z",
  },
  // Pure Beauty (biz-18) reviews
  {
    id: "rev-26",
    customerId: "user-10",
    businessId: "biz-18",
    rating: 5,
    comment:
      "The coconut oil skin butter is the most moisturising product I have used. Zero chemicals, smells wonderful, and my skin has been glowing. Love supporting this small local business. Will try the hair oil range next.",
    createdAt: "2024-02-10T10:00:00Z",
  },
  // Fresh Harvest (biz-15) reviews
  {
    id: "rev-27",
    customerId: "user-08",
    businessId: "biz-15",
    rating: 4,
    comment:
      "Genuinely organic produce — you can taste the freshness. The family basket is excellent value and contains a good variety. My only feedback is more consistency in the leafy greens. Everything else has been stellar.",
    createdAt: "2024-01-18T14:00:00Z",
  },
  // Lace & Thread (biz-05) reviews
  {
    id: "rev-28",
    customerId: "user-06",
    businessId: "biz-05",
    rating: 5,
    comment:
      "The hand-embroidered kurta is absolutely beautiful. The stitching quality is exceptional and the cotton fabric is lightweight and comfortable in the Sri Lankan heat. Very fast delivery and the packaging was gorgeous.",
    createdAt: "2024-02-08T11:00:00Z",
  },
  // Silva & Associates (biz-14) reviews
  {
    id: "rev-29",
    customerId: "user-03",
    businessId: "biz-14",
    rating: 5,
    comment:
      "Very professional and knowledgeable. The consultation gave me complete clarity on a property matter I had been confused about for months. They gave practical, clear advice without unnecessary legal jargon. Highly recommend.",
    createdAt: "2024-01-15T17:00:00Z",
  },
  // FitLife extra review
  {
    id: "rev-30",
    customerId: "user-02",
    businessId: "biz-07",
    rating: 5,
    comment:
      "Started the monthly programme and already seeing real results. The trainer is motivating, the meal plan is practical, and the WhatsApp check-ins are genuinely helpful. This is not just a gym — it is a complete lifestyle transformation service.",
    bookingId: "book-06",
    createdAt: "2024-02-15T09:00:00Z",
  },
];
