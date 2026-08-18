import type { Conversation, Message } from "@/domain/types";

export const mockConversations: Conversation[] = [
  { id: "conv-01", customerId: "user-01", businessId: "biz-01", unreadCount: 0, relatedOrderId: "ord-01", createdAt: "2024-01-14T10:00:00Z", updatedAt: "2024-01-16T14:20:00Z" },
  { id: "conv-02", customerId: "user-01", businessId: "biz-07", unreadCount: 1, relatedBookingId: "book-02", createdAt: "2024-01-19T08:00:00Z", updatedAt: "2024-01-24T07:05:00Z" },
  { id: "conv-03", customerId: "user-01", businessId: "biz-16", unreadCount: 0, relatedOrderId: "ord-07", createdAt: "2024-02-04T09:00:00Z", updatedAt: "2024-02-05T10:05:00Z" },
  { id: "conv-04", customerId: "user-01", businessId: "biz-03", unreadCount: 0, relatedBookingId: "book-01", createdAt: "2024-01-09T11:00:00Z", updatedAt: "2024-01-15T12:30:00Z" },
  { id: "conv-05", customerId: "user-02", businessId: "biz-01", unreadCount: 0, relatedOrderId: "ord-04", createdAt: "2024-01-21T14:00:00Z", updatedAt: "2024-01-23T11:35:00Z" },
  { id: "conv-06", customerId: "user-02", businessId: "biz-07", unreadCount: 2, relatedBookingId: "book-06", createdAt: "2024-02-11T10:00:00Z", updatedAt: "2024-02-12T10:10:00Z" },
  { id: "conv-07", customerId: "user-03", businessId: "biz-04", unreadCount: 0, relatedBookingId: "book-03", createdAt: "2024-01-24T09:00:00Z", updatedAt: "2024-01-28T10:10:00Z" },
  { id: "conv-08", customerId: "user-03", businessId: "biz-08", unreadCount: 0, relatedOrderId: "ord-05", createdAt: "2024-01-24T15:00:00Z", updatedAt: "2024-01-26T15:00:00Z" },
  { id: "conv-09", customerId: "user-05", businessId: "biz-09", unreadCount: 0, relatedOrderId: "ord-08", createdAt: "2024-02-09T14:00:00Z", updatedAt: "2024-02-10T15:05:00Z" },
  { id: "conv-10", customerId: "user-07", businessId: "biz-19", unreadCount: 0, relatedBookingId: "book-08", createdAt: "2024-01-14T09:00:00Z", updatedAt: "2024-01-20T08:05:00Z" },
  { id: "conv-11", customerId: "user-09", businessId: "biz-19", unreadCount: 1, relatedBookingId: "book-10", createdAt: "2024-02-19T10:00:00Z", updatedAt: "2024-02-20T10:05:00Z" },
  { id: "conv-12", customerId: "user-01", businessId: "biz-14", unreadCount: 0, relatedBookingId: "book-05", createdAt: "2024-02-07T09:00:00Z", updatedAt: "2024-02-08T09:05:00Z" },
  { id: "conv-13", customerId: "user-04", businessId: "biz-06", unreadCount: 0, relatedOrderId: "ord-06", createdAt: "2024-02-01T10:30:00Z", updatedAt: "2024-02-01T13:00:00Z" },
  { id: "conv-14", customerId: "user-10", businessId: "biz-12", unreadCount: 0, relatedBookingId: "book-12", createdAt: "2024-01-23T11:00:00Z", updatedAt: "2024-01-27T17:00:00Z" },
  { id: "conv-15", customerId: "user-06", businessId: "biz-09", unreadCount: 0, relatedOrderId: "ord-09", createdAt: "2024-02-11T09:00:00Z", updatedAt: "2024-02-13T14:35:00Z" },
];

export const mockMessages: Message[] = [
  // conv-01: user-01 <-> Divini Cakes (order cake)
  { id: "msg-01", conversationId: "conv-01", senderId: "user-01", senderType: "CUSTOMER", content: "Hi! I'd like to order a 2kg chocolate drip cake for my daughter's birthday. Can you please confirm availability for delivery on 16th January around 2pm?", isRead: true, createdAt: "2024-01-14T10:00:00Z" },
  { id: "msg-02", conversationId: "conv-01", senderId: "biz-01", senderType: "BUSINESS", content: "Hello Aisha! Yes, we have availability for January 16th delivery in Colombo 7. Please place your order through the platform and we'll confirm immediately. You can add your personalisation note in the order notes section.", isRead: true, createdAt: "2024-01-14T10:15:00Z" },
  { id: "msg-03", conversationId: "conv-01", senderId: "user-01", senderType: "CUSTOMER", content: "Thank you! Order placed. I added the cake message in the notes. One question — can I request the drip to be in gold colour?", isRead: true, createdAt: "2024-01-14T10:35:00Z" },
  { id: "msg-04", conversationId: "conv-01", senderId: "biz-01", senderType: "BUSINESS", content: "Absolutely! Gold drip is our speciality. We've noted it down. Your cake will be stunning. We'll send you a preview photo before delivery 😊", isRead: true, createdAt: "2024-01-14T10:50:00Z" },
  { id: "msg-05", conversationId: "conv-01", senderId: "biz-01", senderType: "BUSINESS", content: "Good morning! Your cake is ready. Here's a preview — hope you love it! 🎂 Our driver will be with you between 1:30pm and 2:30pm.", isRead: true, createdAt: "2024-01-16T09:00:00Z" },
  { id: "msg-06", conversationId: "conv-01", senderId: "user-01", senderType: "CUSTOMER", content: "Oh my goodness, it's absolutely beautiful! My daughter is going to love it. Thank you so much!", isRead: true, createdAt: "2024-01-16T14:20:00Z" },

  // conv-02: user-01 <-> FitLife (personal training)
  { id: "msg-07", conversationId: "conv-02", senderId: "user-01", senderType: "CUSTOMER", content: "Hi! I've booked a personal training session for 24th January at 6:30am. Should I bring anything specific?", isRead: true, createdAt: "2024-01-19T08:00:00Z" },
  { id: "msg-08", conversationId: "conv-02", senderId: "biz-07", senderType: "BUSINESS", content: "Good morning Aisha! Great to have you. Please bring comfortable workout clothes, a water bottle, and a towel. We have everything else. See you on the 24th! 💪", isRead: true, createdAt: "2024-01-19T08:30:00Z" },
  { id: "msg-09", conversationId: "conv-02", senderId: "user-01", senderType: "CUSTOMER", content: "Perfect, thank you! Looking forward to it.", isRead: true, createdAt: "2024-01-19T08:45:00Z" },
  { id: "msg-10", conversationId: "conv-02", senderId: "biz-07", senderType: "BUSINESS", content: "Good morning! This is a reminder that your training session is tomorrow at 6:30am. Don't forget a light dinner tonight and get good rest. See you bright and early! 🌅", isRead: false, createdAt: "2024-01-23T18:00:00Z" },

  // conv-03: user-01 <-> SugarCraft (anniversary cake)
  { id: "msg-11", conversationId: "conv-03", senderId: "user-01", senderType: "CUSTOMER", content: "Hello! I've placed an order for a 1.5kg Belgian chocolate cake for 20th March. I mentioned minimalist floral decoration in the notes. Could you share some design options?", isRead: true, createdAt: "2024-02-04T09:00:00Z" },
  { id: "msg-12", conversationId: "conv-03", senderId: "biz-16", senderType: "BUSINESS", content: "Hi Aisha! Thank you for your order. We have 3 minimalist floral options — pressed sugar flowers, hand-painted botanicals, or a simple rose cluster. I'll send you photos shortly.", isRead: true, createdAt: "2024-02-04T09:30:00Z" },
  { id: "msg-13", conversationId: "conv-03", senderId: "user-01", senderType: "CUSTOMER", content: "The hand-painted botanicals sound perfect! Please go ahead with that.", isRead: true, createdAt: "2024-02-04T10:00:00Z" },
  { id: "msg-14", conversationId: "conv-03", senderId: "biz-16", senderType: "BUSINESS", content: "Wonderful choice! Order confirmed with hand-painted botanical decoration. Your anniversary cake will be delivered on 20th March at 11am. 🌿🍫", isRead: true, createdAt: "2024-02-05T10:05:00Z" },

  // conv-04: user-01 <-> Lens by Lahiru
  { id: "msg-15", conversationId: "conv-04", senderId: "user-01", senderType: "CUSTOMER", content: "Hi Lahiru! I've booked a 2-hour portrait session for 15th January. It's for personal branding — I'm a lawyer. Should I bring multiple outfits?", isRead: true, createdAt: "2024-01-09T11:00:00Z" },
  { id: "msg-16", conversationId: "conv-04", senderId: "biz-03", senderType: "BUSINESS", content: "Hello Aisha! Yes, please bring 2–3 outfits — one formal, one smart casual, and one that reflects your personality. Also, minimal jewellery works best for professional shots. Looking forward to it!", isRead: true, createdAt: "2024-01-09T11:20:00Z" },
  { id: "msg-17", conversationId: "conv-04", senderId: "biz-03", senderType: "BUSINESS", content: "Your edited images are ready! All 30 photos have been uploaded to your private gallery. Link sent to your email. I'm really happy with how they turned out. 📸", isRead: true, createdAt: "2024-01-15T12:30:00Z" },

  // conv-05: user-02 <-> Divini Cakes
  { id: "msg-18", conversationId: "conv-05", senderId: "user-02", senderType: "CUSTOMER", content: "Hi! I ordered two dessert boxes for a corporate event. Can you confirm the time of delivery?", isRead: true, createdAt: "2024-01-21T14:00:00Z" },
  { id: "msg-19", conversationId: "conv-05", senderId: "biz-01", senderType: "BUSINESS", content: "Hello Kasun! Your order will be delivered on 23rd January between 10am and 12pm. Both boxes are fully packed and ready. Please ensure someone is available to receive them.", isRead: true, createdAt: "2024-01-21T14:30:00Z" },
  { id: "msg-20", conversationId: "conv-05", senderId: "user-02", senderType: "CUSTOMER", content: "Perfect, I'll be in the office. Thank you!", isRead: true, createdAt: "2024-01-21T14:45:00Z" },
  { id: "msg-21", conversationId: "conv-05", senderId: "biz-01", senderType: "BUSINESS", content: "Your boxes have been delivered! Hope your event was a success 🎉", isRead: true, createdAt: "2024-01-23T11:35:00Z" },

  // conv-06: user-02 <-> FitLife (monthly programme)
  { id: "msg-22", conversationId: "conv-06", senderId: "user-02", senderType: "CUSTOMER", content: "Hi! I've booked the monthly fitness programme starting 1st March. I'm aiming to lose 5kg. What should I expect in the first week?", isRead: true, createdAt: "2024-02-11T10:00:00Z" },
  { id: "msg-23", conversationId: "conv-06", senderId: "biz-07", senderType: "BUSINESS", content: "Welcome Kasun! First week is assessment week — we'll measure your baseline fitness, take body measurements, and design your personalised programme. It won't be the hardest week but it will set everything up perfectly.", isRead: true, createdAt: "2024-02-11T10:20:00Z" },
  { id: "msg-24", conversationId: "conv-06", senderId: "biz-07", senderType: "BUSINESS", content: "Just sent your personalised meal plan to your email. Please review before our first session. The first session begins 1st March at 6am sharp. Ready to transform! 💪", isRead: false, createdAt: "2024-02-12T10:10:00Z" },

  // conv-07: user-03 <-> Nuha Henna Art
  { id: "msg-25", conversationId: "conv-07", senderId: "user-03", senderType: "CUSTOMER", content: "Hi Nuha! I have my wedding on 28th Jan. I booked the full bridal mehendi package. I'd love traditional Sri Lankan designs with some Arabic elements. Is that something you do?", isRead: true, createdAt: "2024-01-24T09:00:00Z" },
  { id: "msg-26", conversationId: "conv-07", senderId: "biz-04", senderType: "BUSINESS", content: "Absolutely, Thilini! That fusion style is actually my speciality. I'll share some design inspiration boards tomorrow. Your big day is going to be stunning 🌿✨", isRead: true, createdAt: "2024-01-24T09:30:00Z" },
  { id: "msg-27", conversationId: "conv-07", senderId: "user-03", senderType: "CUSTOMER", content: "Oh these are gorgeous! I especially love the third design with the peacock motif on the palm.", isRead: true, createdAt: "2024-01-24T10:30:00Z" },
  { id: "msg-28", conversationId: "conv-07", senderId: "biz-04", senderType: "BUSINESS", content: "That one is my favourite too! I'll incorporate the peacock motif as the central design on both hands. See you on the 28th at 10am. Remember to wear old clothes that you don't mind getting stained 🌿", isRead: true, createdAt: "2024-01-24T11:00:00Z" },
  { id: "msg-29", conversationId: "conv-07", senderId: "user-03", senderType: "CUSTOMER", content: "It was absolutely perfect. The mehendi was beautiful and everyone was commenting on it. Thank you so much!", isRead: true, createdAt: "2024-01-28T10:10:00Z" },

  // conv-08: user-03 <-> Glow Cosmetics
  { id: "msg-30", conversationId: "conv-08", senderId: "user-03", senderType: "CUSTOMER", content: "Hi! I ordered the Vitamin C serum. I have quite sensitive skin — is it suitable for daily use straight away or should I patch test first?", isRead: true, createdAt: "2024-01-24T15:00:00Z" },
  { id: "msg-31", conversationId: "conv-08", senderId: "biz-08", senderType: "BUSINESS", content: "Great question, Thilini! We always recommend a 24-hour patch test on sensitive skin before daily use. If no reaction, start with every other day for week 1, then move to daily use from week 2. Your serum has been dispatched and will arrive tomorrow.", isRead: true, createdAt: "2024-01-24T15:30:00Z" },
  { id: "msg-32", conversationId: "conv-08", senderId: "biz-08", senderType: "BUSINESS", content: "Your order has been delivered! Hope you love the serum. If you have any questions about your skincare routine, feel free to message us anytime 🌟", isRead: true, createdAt: "2024-01-26T15:00:00Z" },

  // conv-09: user-05 <-> Crafted with Love
  { id: "msg-33", conversationId: "conv-09", senderId: "user-05", senderType: "CUSTOMER", content: "Hi! I placed an order for a medium premium gift box. The note should read 'Happy Birthday Amma! Love, Priya'. Can you confirm this has been added?", isRead: true, createdAt: "2024-02-09T14:00:00Z" },
  { id: "msg-34", conversationId: "conv-09", senderId: "biz-09", senderType: "BUSINESS", content: "Hi Priya! Yes, your personal note has been added in beautiful handwritten calligraphy on a premium card. Your box will be shipped to Jaffna tomorrow and should arrive within 2 days.", isRead: true, createdAt: "2024-02-09T14:30:00Z" },
  { id: "msg-35", conversationId: "conv-09", senderId: "biz-09", senderType: "BUSINESS", content: "Your gift box has been delivered! We hope your mum loves it 🎁", isRead: true, createdAt: "2024-02-12T12:05:00Z" },

  // conv-10: user-07 <-> Visions by Thilini
  { id: "msg-36", conversationId: "conv-10", senderId: "user-07", senderType: "CUSTOMER", content: "Hi Thilini! We've booked a family portrait session for 20th January. We're a family of 4 with kids aged 3 and 6. Any tips for getting the best shots with young children?", isRead: true, createdAt: "2024-01-14T09:00:00Z" },
  { id: "msg-37", conversationId: "conv-10", senderId: "biz-19", senderType: "BUSINESS", content: "How lovely! With young ones, the best tip is to let them play naturally — I'll capture the real moments. Also, matching (not identical) outfits in earth tones work beautifully. Please bring a favourite toy or snack to keep them happy! 📸", isRead: true, createdAt: "2024-01-14T09:30:00Z" },
  { id: "msg-38", conversationId: "conv-10", senderId: "biz-19", senderType: "BUSINESS", content: "Good morning! Your full gallery of 35 images is ready. Link sent to your email. Your children were absolute stars — so full of joy! ☀️", isRead: true, createdAt: "2024-01-20T08:05:00Z" },

  // conv-11: user-09 <-> Visions by Thilini
  { id: "msg-39", conversationId: "conv-11", senderId: "user-09", senderType: "CUSTOMER", content: "Hi! I've booked a maternity session for 8th March. I'm 32 weeks. I'd love golden hour outdoor shots if possible.", isRead: true, createdAt: "2024-02-19T10:00:00Z" },
  { id: "msg-40", conversationId: "conv-11", senderId: "biz-19", senderType: "BUSINESS", content: "Congratulations Sanduni! 32 weeks is perfect for maternity photos. Golden hour in Kandy is magical — I suggest 6am for sunrise or 5pm for sunset. I'll send you a location guide. So excited for this session! 🌸", isRead: false, createdAt: "2024-02-20T10:05:00Z" },

  // conv-12: user-01 <-> Silva Associates
  { id: "msg-41", conversationId: "conv-12", senderId: "user-01", senderType: "CUSTOMER", content: "Hello, I've booked a consultation for 5th March regarding a property transfer. Could you advise on what documents I should bring?", isRead: true, createdAt: "2024-02-07T09:00:00Z" },
  { id: "msg-42", conversationId: "conv-12", senderId: "biz-14", senderType: "BUSINESS", content: "Good morning Aisha. For a property transfer consultation, please bring the current deed, your NIC, any existing agreements, and if available, the survey plan. We look forward to assisting you on 5th March.", isRead: true, createdAt: "2024-02-07T09:30:00Z" },
  { id: "msg-43", conversationId: "conv-12", senderId: "user-01", senderType: "CUSTOMER", content: "Thank you, I have all of those. See you then.", isRead: true, createdAt: "2024-02-08T09:05:00Z" },

  // conv-13: user-04 <-> Amma's Kitchen
  { id: "msg-44", conversationId: "conv-13", senderId: "user-04", senderType: "CUSTOMER", content: "Hi! My order says ready for pickup — what's the best entrance to use?", isRead: true, createdAt: "2024-02-01T12:30:00Z" },
  { id: "msg-45", conversationId: "conv-13", senderId: "biz-06", senderType: "BUSINESS", content: "Come through the main gate on Kandy Road and ring the bell. Your parcel will be handed to you at the counter. Ready and waiting! 🍛", isRead: true, createdAt: "2024-02-01T12:35:00Z" },

  // conv-14: user-10 <-> BrightMinds
  { id: "msg-46", conversationId: "conv-14", senderId: "user-10", senderType: "CUSTOMER", content: "Hello, I've registered my son Hasith for O/L Maths tuition. He's particularly weak in Algebra. Can the classes accommodate his specific needs?", isRead: true, createdAt: "2024-01-23T11:00:00Z" },
  { id: "msg-47", conversationId: "conv-14", senderId: "biz-12", senderType: "BUSINESS", content: "Good morning! Absolutely — we do an initial assessment with every new student to identify weak areas. For Algebra, we have targeted exercises and a special revision pack. Please bring his most recent school report if possible.", isRead: true, createdAt: "2024-01-23T11:30:00Z" },
  { id: "msg-48", conversationId: "conv-14", senderId: "user-10", senderType: "CUSTOMER", content: "Wonderful, thank you. I'll send the report before the session.", isRead: true, createdAt: "2024-01-24T09:00:00Z" },
  { id: "msg-49", conversationId: "conv-14", senderId: "biz-12", senderType: "BUSINESS", content: "Hasith's first session went very well! He was attentive and his Algebra foundations are actually stronger than he thought. We'll focus on quadratic equations next week. 📚", isRead: true, createdAt: "2024-01-27T17:00:00Z" },

  // conv-15: user-06 <-> Crafted with Love
  { id: "msg-50", conversationId: "conv-15", senderId: "user-06", senderType: "CUSTOMER", content: "Hi! I ordered 2 photo keychains. I sent the photos on WhatsApp — did you receive them?", isRead: true, createdAt: "2024-02-11T09:00:00Z" },
  { id: "msg-51", conversationId: "conv-15", senderId: "biz-09", senderType: "BUSINESS", content: "Hello Rashid! Yes, we received both photos. They're beautiful choices! Your keychains will be ready in 2 working days and shipped immediately after.", isRead: true, createdAt: "2024-02-11T09:30:00Z" },
  { id: "msg-52", conversationId: "conv-15", senderId: "biz-09", senderType: "BUSINESS", content: "Your keychains have been shipped! The photos came out crystal clear in the resin. Should arrive by tomorrow 🎁", isRead: true, createdAt: "2024-02-13T14:35:00Z" },
];
