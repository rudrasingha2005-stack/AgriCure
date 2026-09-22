// AgriSetu AI Chatbot Service with Score-Based Multilingual RAG Engine & Gemini API Integration

const CODEBASE_KNOWLEDGE = [
  {
    topic: 'app_info',
    intentKeywords: ['app', 'agriprocure', 'agrisetu', 'about', 'purpose', 'this app', 'app for', 'what is this app', 'what is agriprocure', 'what is agrisetu', 'কী অ্যাপ', 'অ্যাপ কিসের জন্য', 'কৃষিসেতু কি', 'यह ऐप किसलिए है', 'ऐप के बारे में', 'कृषिसेतु क्या है'],
    bonusKeywords: ['portal', 'system', 'help'],
    response: {
      en: '🌱 AgriSetu is a Decentralized Agricultural Procurement & Farmer Empowerment Portal:\n• 📅 Direct Yard Booking: Reserve procurement slots at nearby government yards.\n• 🌾 Guaranteed MSP: Direct sale at official CCEA Minimum Support Prices without middleman cuts.\n• 🚜 Live Queue Tracking: Track your digital token status in real-time.\n• 💰 48-Hour DBT Payouts: Direct Bank Transfers straight to your Aadhaar-linked account.\n• 🚨 Grievance Redressal: File photo-backed dispute dockets with 72-hour overseer resolution.',
      bn: '🌱 কৃষিসেতু (AgriSetu) হলো একটি বিকেন্দ্রীকৃত শস্য সংগ্রহ ও কৃষক সুবিধা পোর্টাল:\n• 📅 সরাসরি স্লট বুকিং: নিকটস্থ সরকারি কেন্দ্রে শস্য বিক্রির স্লট বুক করুন।\n• 🌾 সরকারি সিচিইএ (CCEA) সহায়ক মূল্য: মধ্যস্বত্বভোগী ছাড়াই শতভাগ সরকারি দাম।\n• 🚜 রিয়েল-টাইম লাইভ কিউ: আপনার ডিজিটাল টোকেন নম্বর ও পালার আপডেট দেখুন।\n• 💰 ৪৮ ঘণ্টার মধ্যে ডিবিটি: সরাসরি ব্যাংক অ্যাকাউন্টে টাকা স্থানান্তর।\n• 🚨 অভিযোগ প্রতিকার: অন্যায্য কাটার বিরুদ্ধে ছবি ও প্রমাণসহ অভিযোগ দায়ের করুন।',
      hi: '🌱 कृषिसेतु (AgriSetu) एक विकेंद्रीकृत कृषि खरीद और किसान पोर्टल है:\n• 📅 सीधे खरीद स्लॉट बुक करें: निकटतम सरकारी केंद्रों पर समय आरक्षित करें।\n• 🌾 न्यूनतम समर्थन मूल्य (MSP): बिना बिचौलियों के सरकारी दरों पर सीधी बिक्री।\n• 🚜 लाइव कतार ट्रैकिंग: रियल-टाइम में टोकन स्थिति देखें।\n• 💰 48 घंटे में बैंक हस्तांतरण: सीधे आधार से जुड़े बैंक खाते में राशि जमा।\n• 🚨 शिकायत निवारण: 72 घंटे में समाधान की गारंटी।'
    }
  },
  {
    topic: 'moisture_and_quality',
    intentKeywords: ['moisture', 'limit', 'dryness', 'wet', 'rotten', 'water', 'dockage', 'deduction', 'faq', 'grade', 'আর্দ্রতা', 'সীমা', 'মান', 'গুণমান', 'কাটা', 'জল', 'শুকানো', 'গ্রেড', 'ভিজে', 'পচা', 'নমি', 'गुणवत्ता', 'कटौती', 'सुखाना'],
    bonusKeywords: ['paddy', 'wheat', 'crop', 'ধান', 'গেঁহু'],
    response: {
      en: 'KMS 2025-26 Official Moisture & Quality FAQ Standards:\n• Paddy Max Moisture Limit: 17.0% (Ideal: 14.0%)\n• Wheat Max Moisture Limit: 12.0%\n• Moisture 17.1%–19.0%: Value cut of 0.5% per 1% excess moisture.\n• Moisture > 19.0%: Produce REJECTED at yard gate. Crop drying required.\n• Foreign Material Limit: Max 1.0%\n• Damaged / Discolored Grains: Max 3.0%',
      bn: 'গুণমান ও আর্দ্রতার সরকারি মানদণ্ড (KMS 2025-26):\n• ধানের সর্বোচ্চ আর্দ্রতা সীমা: ১৭.০% (আদর্শ: ১৪.০%)\n• গমের সর্বোচ্চ আর্দ্রতা সীমা: ১২.০%\n• ১৭%–১৯% আর্দ্রতা: প্রতি ১% অতিরিক্তের জন্য ০.৫% মূল্য কর্তন।\n• ১৯%-এর বেশি আর্দ্রতা: ফসল গেটে প্রত্যাখ্যাত হবে এবং শুকানোর জন্য বলা হবে।\n• বাহ্যিক অপদ্রব্য: সর্বোচ্চ ১.০%',
      hi: 'गुणवत्ता एवं नमी मानक (KMS 2025-26):\n• धान की अधिकतम नमी सीमा: 17.0% (आदर्श: 14.0%)\n• गेहूं की अधिकतम नमी सीमा: 12.0%\n• 17% से 19% नमी: प्रति 1% अतिरिक्त पर 0.5% कटौती।\n• 19% से अधिक नमी: फसल अस्वीकृत होगी और सुखाने की सलाह दी जाएगी।'
    }
  },
  {
    topic: 'msp_rates',
    intentKeywords: ['msp', 'rate', 'price', 'cost', 'ccea', 'value', 'worth', 'support price', 'এমএসপি', 'দাম', 'মূল্য', 'কত', 'হার', 'সহায়ক', 'एमएसपी', 'दाम', 'मूल्य', 'दर', 'रेट', 'समर्थन'],
    bonusKeywords: ['paddy', 'wheat', 'maize', 'potato', 'tomato', 'onion', 'quintal', 'qtl', 'ধান', 'গম', 'ভুট্টা', 'আলু', 'কুंतल', 'कविंटल'],
    response: {
      en: 'Official CCEA Minimum Support Prices (MSP) for KMS 2025-26:\n• Paddy (Common): ₹2,369 / Qtl\n• Paddy (Grade A): ₹2,389 / Qtl\n• Wheat: ₹2,425 / Qtl\n• Maize: ₹2,225 / Qtl\n• Potato Base: ₹1,450 / Qtl\n• Tomato Base: ₹1,800 / Qtl\n• Onion Base: ₹2,400 / Qtl\nAll prices are guaranteed minimum government procurement rates without middleman deductions.',
      bn: 'সরকারি CCEA ন্যূনতম সহায়ক মূল্য (MSP) KMS 2025-26:\n• ধান (সাধারণ): ₹২,৩৬৯ / কুইন্টাল\n• ধান (গ্রেড এ): ₹২,৩৮৯ / কুইন্টাল\n• গম: ₹২,৪২৫ / কুইন্টাল\n• ভুট্টা: ₹২,২২৫ / কুইন্টাল\n• আলু: ₹১,৪৫০ / কুইন্টাল\nমধ্যস্বত্বভোগী ছাড়াই সরাসরি সরকারি মূল্যে বিক্রি করুন।',
      hi: 'आधिकारिक CCEA न्यूनतम समर्थन मूल्य (MSP) KMS 2025-26:\n• धान (सामान्य): ₹2,369 / कुंतल\n• धान (ग्रेड ए): ₹2,389 / कुंतल\n• गेहूं: ₹2,425 / कुंतल\n• मक्का: ₹2,225 / कुंतल\n• आलू: ₹1,450 / कुंतल\nबिना किसी बिचौलिए के सीधे सरकारी खरीद केंद्र पर बेचें।'
    }
  },
  {
    topic: 'payments_and_dbt',
    intentKeywords: ['payment', 'paid', 'pay', 'money', 'dbt', 'bank', 'account', 'disbursement', 'receipt', 'credit', 'payout', 'credited', 'when money', 'টাকা', 'পেমেন্ট', 'ব্যাংক', 'অ্যাকাউন্ট', 'রসিদ', 'ডিবিটি', 'জমা', 'কখন পাব', 'অর্থ', 'भुगतान', 'पैसा', 'रुपया', 'बैंक', 'खाता', 'रसीद', 'डीबीटी', 'कब मिलेगा', 'धन'],
    bonusKeywords: ['j-form', 'weighment', 'receipt', 'কুইন্টাল', 'रसीद'],
    response: {
      en: 'Payment & Bank Transfer Disbursement Rules:\n• Direct Bank Transfer (DBT) is initiated within 48 hours of Official Weight & Quality Approval.\n• Funds are credited directly to your Aadhaar-linked bank account.\n• Download digital J-Form / Purchase Receipt from [💰 Payments] modal anytime.',
      bn: 'পেমেন্ট ও ব্যাংক অ্যাকাউন্ট স্থানান্তর নিয়ম:\n• ওজন ও গুণমান পরীক্ষার ৪৮ ঘণ্টার মধ্যে সরাসরি ব্যাংক অ্যাকাউন্টে (DBT) টাকা জমা হয়।\n• টাকা সরাসরি আপনার আধার-সংযুক্ত ব্যাংক অ্যাকাউন্টে পাঠায় সরকার।\n• [💰 পেমেন্ট] বিভাগে ক্লিক করে ডিজিটাল জে-ফর্ম রসিদ ডাউনলোড করতে পারেন।',
      hi: 'भुगतान और डीबीटी नियम:\n• आधिकारिक तौल और गुणवत्ता जांच के 48 घंटों के भीतर राशि सीधे आपके बैंक खाते (DBT) में भेजी जाती है।\n• [💰 भुगतान] अनुभाग से रसीद डाउनलोड करें।'
    }
  },
  {
    topic: 'slot_booking',
    intentKeywords: ['book', 'booking', 'slot', 'token', 'appointment', 'reserve', 'schedule', 'how to book', 'স্লট', 'বুকিং', 'বুক', 'টোকেন', 'অ্যাপয়েন্টমেন্ট', 'কীভাবে', 'কিভাবে', 'स्लॉट', 'बुकिंग', 'बुक', 'टोकन', 'अपॉइंटमेंट', 'कैसे'],
    bonusKeywords: ['centre', 'yard', 'date', 'time', 'কেন্দ্র', 'সময়'],
    response: {
      en: 'How to Book a Procurement Slot on AgriSetu:\n1. Open AgriSetu Farmer Dashboard.\n2. Click the [📅 Book Slot] interactive logo.\n3. Select your Crop (e.g. Paddy) & Quantity (e.g. 50 Quintals).\n4. Choose nearby Procurement Centre & preferred Date/Time.\n5. Click Confirm Booking to generate your Official Digital Token & QR Code.',
      bn: 'স্লট বুকিং করার নিয়ম:\n১. কৃষিসেতু ড্যাশবোর্ডে যান।\n২. [📅 স্লট বুক করুন] লোগোতে ক্লিক করুন।\n৩. আপনার ফসল ও পরিমাণ (কুইন্টাল) বেছে নিন।\n৪. নিকটস্থ সংগ্রহ কেন্দ্র এবং সুবিধাজনক সময় নির্বাচন করুন।\n৫. বুকিং নিশ্চিত করে আপনার ডিজিটাল টোকেন ও QR কোড পান।',
      hi: 'स्लॉट बुक करने का तरीका:\n1. कृषिसेतु डैशबोर्ड पर जाएं।\n2. [📅 स्लॉट बुक करें] लोगो पर क्लिक करें।\n3. अपनी फसल और मात्रा (कुंतल में) चुनें।\n4. निकटतम खरीद केंद्र और समय स्लॉट चुनें।\n5. पुष्टि करें और अपना डिजिटल टोकन व क्यूआर कोड प्राप्त करें।'
    }
  },
  {
    topic: 'live_queue',
    intentKeywords: ['queue', 'turn', 'serving', 'wait', 'token number', 'live status', 'counter', 'when is my turn', 'কিউ', 'পালা', 'কখন', 'লাইন', 'অপেক্ষা', 'কাউন্টার', 'লাইভ', 'টোকেন নম্বর', 'कतार', 'लाइन', 'बारी', 'कब', 'इंतजार', 'काउंटर', 'लाइव'],
    bonusKeywords: ['status', 'tracking'],
    response: {
      en: 'Live Queue Tracking & Token Rules:\n• Check token progress under [🚜 Live Queue] logo badge.\n• When your token is within 5 slots of being served, you will receive an automated SMS & rain advisory notification.\n• When your token arrives, proceed to Counter 2 with your produce truck.',
      bn: 'লাইভ কিউ ট্র্যাকিং নিয়ম:\n• [🚜 লাইভ কিউ] লোগোতে ক্লিক করে বর্তমান টোকেন নম্বর দেখুন।\n• আপনার পালার ৫টি টোকেন আগে এসএমএস অ্যালার্ট পাঠানো হবে।\n• আপনার পালা এলে ট্রাক নিয়ে কাউন্টার ২-এ যান।',
      hi: 'लाइव कतार नियम:\n• [🚜 लाइव कतार] लोगो पर क्लिक करके वर्तमान स्थिति देखें।\n• आपकी बारी आने से 5 टोकन पहले एसएमएस अलर्ट प्राप्त होगा।\n• बारी आने पर अपना वाहन काउंटर 2 पर ले जाएं।'
    }
  },
  {
    topic: 'grievance_and_complaint',
    intentKeywords: ['complaint', 'grievance', 'cheating', 'dispute', 'problem', 'illegal', 'bribe', 'report', 'issue', 'harassment', 'অভিযোগ', 'সমস্যা', 'ধোঁকা', 'ঘুষ', 'দালাল', 'অন্যায়', 'রিপোর্ট', 'शिकायत', 'समस्या', 'धोखा', 'रिश्वत', 'दलाल', 'अन्याय'],
    bonusKeywords: ['proof', 'docket', 'cut', 'কাটা'],
    response: {
      en: 'Grievance & Redressal Mechanism:\n• If facing unjustified weight deduction, illegal cuts, or harassment, click [🚨 Complaints & Feedback].\n• You can attach photos/proof to lodge an official docket.\n• Resolution guaranteed within 72 working hours under FCI Overseer Protocol.',
      bn: 'অভিযোগ দায়ের পদ্ধতি:\n• অনুচিত ওজন বা টাকা কাটার ক্ষেত্রে [🚨 অভিযোগ ও মতামত] লোগোতে ক্লিক করুন।\n• ছবি ও প্রমাণসহ অভিযোগ দায়ের করুন। ৭২ ঘণ্টার মধ্যে সমাধান করা হবে।',
      hi: 'शिकायत निवारण प्रक्रिया:\n• गलत तौल या अनुचित कटौती पर [🚨 शिकायत दर्ज करें] पर क्लिक करें।\n• 72 घंटे के भीतर आधिकारिक जांच व निवारण की गारंटी।'
    }
  },
  {
    topic: 'general_crop_guidance',
    intentKeywords: ['guidance', 'advice', 'general crop guidance', 'crop guidance', 'farming advice', 'pest', 'fertilizer', 'disease', 'soil', 'irrigation', 'চাষ', 'পরামর্শ', 'বীজ', 'সার', 'পোকামাকড়', 'মাটি', 'सलाह', 'खेती', 'उर्वरक', 'कीटनाशक', 'मिट्टी'],
    bonusKeywords: ['crop', 'farming', 'yield', 'harvest', 'ফসল', 'फसल'],
    response: {
      en: '🌾 AgriSetu General Crop & Field Guidance:\n• High-Yield Seeds: Use certified Swarna/MTU-7029 for Paddy, HD-2967 for Wheat, and HQPM-1 for Maize.\n• Balanced Fertilization: Apply NPK in 120:60:60 kg/ha ratio based on soil card testing.\n• Moisture & Harvest: Harvest Paddy when grain moisture reaches 20-22%, then sun-dry to ≤17.0% before bringing to procurement centres.\n• Pest Management: Apply Neem-based organic spray for early leaf folder protection.',
      bn: '🌾 কৃষিসেতু সাধারণ ফসল চাষ সহায়িকা:\n• উন্নত বীজ: ধানের জন্য স্বর্ণা/MTU-7029, গমের জন্য HD-2967 এবং ভুট্টার জন্য HQPM-1 ব্যবহার করুন।\n• সুষম সার প্রয়োগ: মাটি পরীক্ষার ওপর ভিত্তি করে ১২০:৬০:৬০ কেজি/হেক্টর NPK সার ব্যবহার করুন।\n• আর্দ্রতা ও ফসল কাটা: ধানের আর্দ্রতা ২০-২২% হলে কাটুন, এবং সরকারি কেন্দ্রে আনার আগে রোদে শুকিয়ে ১৭.০%-এর নিচে নামিয়ে আনুন।\n• পোকা দমন: পাতা মোড়ানো পোকা দমনে নিম তেল স্প্রে করুন।',
      hi: '🌾 कृषिसेतु सामान्य फसल सलाह:\n• उन्नत किस्म के बीज: धान के लिए स्वर्णा/MTU-7029 और गेहूं के लिए HD-2967 चुनें।\n• संतुलित उर्वरक: मृदा कार्ड परीक्षण के आधार पर NPK 120:60:60 किग्रा/हेक्टेयर का प्रयोग करें।\n• नमी व कटाई: धान की नमी 20-22% होने पर कटाई करें और सरकारी केंद्र पर लाने से पहले सुखाकर 17.0% से कम करें।'
    }
  }
];

const callGeminiApi = async (userPrompt, language = 'en') => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const systemInstruction = `You are AgriSetu AI Assistant, an expert agricultural and portal advisor serving Indian farmers.
Language requested: ${language} (en = English, bn = Bengali, hi = Hindi).
Keep responses clear, practical, bulleted where appropriate, empathetic, and encouraging.
If asked about AgriSetu, slot booking, procurement, crops, pest control, weather, soil health, fertilizer, or general questions, provide helpful, accurate guidance in the requested language.`;

  try {
    const fetch = (await import('node-fetch')).default || globalThis.fetch;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    // Try API Key query param first, fallback to Authorization Bearer header
    let response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nFarmer Query: ${userPrompt}` }] }
        ]
      })
    });

    if (!response.ok) {
      // Retry with Bearer header if key query param returned 401
      response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: `${systemInstruction}\n\nFarmer Query: ${userPrompt}` }] }
          ]
        })
      });
    }

    if (!response.ok) return null;

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (err) {
    console.error('Gemini API Error:', err.message);
    return null;
  }
};

// Dynamic Agronomic Generator for unlisted general queries when Gemini API is unauthenticated
const generateGeneralAgronomicReply = (query, lang) => {
  const q = query.toLowerCase();

  if (q.includes('weather') || q.includes('rain') || q.includes('বৃষ্টি') || q.includes('मौसम') || q.includes('बारिश')) {
    const res = {
      en: '🌧️ AgriSetu Weather & Moisture Guidance:\n• Check live yard weather warnings in the [🌦️ Weather Advisory] modal.\n• Cover harvested produce with tarpaulins if rain is forecasted during transport.\n• Ensure paddy moisture is dried below 17.0% before bringing to procurement yard.',
      bn: '🌧️ কৃষিসেতু আবহাওয়া ও আর্দ্রতা নির্দেশিকা:\n• ড্যাশবোর্ডের [🌦️ আবহাওয়া পূর্বাভাস] লোগোতে ক্লিক করে সরাসরি আবহাওয়ার পূর্বাভাস দেখুন।\n• বৃষ্টির পূর্বাভাস থাকলে ফসল ত্রিপল দিয়ে ঢেকে কেন্দ্রে আনুন।\n• সরকারি কেন্দ্রে আনার আগে ধানের আর্দ্রতা ১৭.০%-এর নিচে শুকিয়ে নিন।',
      hi: '🌧️ कृषिसेतु मौसम व नमी सलाह:\n• [🌦️ मौसम सलाह] पर क्लिक करके लाइव मौसम अलर्ट देखें।\n• बारिश की संभावना होने पर फसल तिरपाल से ढककर लाएं।'
    };
    return res[lang] || res.en;
  }

  if (q.includes('soil') || q.includes('fertilizer') || q.includes('সার') || q.includes('মাটি') || q.includes('खाद') || q.includes('मिट्टी')) {
    const res = {
      en: '🌱 AgriSetu Soil & Fertilizer Advice:\n• Soil Health Card: Test your soil NPK levels before sowing season.\n• Fertilizer Ratio: Recommended NPK ratio is 120:60:60 kg/ha for Paddy/Wheat.\n• Organic Matter: Incorporate green manure (Daincha) 20 days prior to transplanting.',
      bn: '🌱 কৃষিসেতু মাটি ও সার নির্দেশিকা:\n• মাটি পরীক্ষা: বপনের আগে মাটির এনপিকে (NPK) পরীক্ষা করিয়ে নিন।\n• সার প্রয়োগ: ধান ও গমের জন্য ১২০:৬০:৬০ কেজি/হেক্টর অনুপাত মানুন।\n• সবুজ সার: চারা রোপণের ২০ দিন আগে ধৈঞ্চা চাষ করে মাটিতে মেশান।',
      hi: '🌱 कृषिसेतु मृदा व उर्वरक सलाह:\n• मृदा कार्ड परीक्षण के आधार पर NPK 120:60:60 किग्रा/हेक्टेयर का प्रयोग करें।'
    };
    return res[lang] || res.en;
  }

  // General Portal & Assistance Reply
  const res = {
    en: `🌱 AgriSetu Assistant Answer for "${query}":\nAgriSetu connects farmers directly to government procurement yards. You can:\n• Book procurement slots under [📅 Book Slot].\n• Check official MSP rates under [📖 Farmer Rulebook].\n• Track your produce queue under [🚜 Live Queue].\n• View DBT payment status under [💰 Payments].`,
    bn: `🌱 "${query}" সম্পর্কে কৃষিসেতু সহকারীর উত্তর:\nকৃষিসেতু কৃষকদের সরাসরি সরকারি সংগ্রহ কেন্দ্রের সাথে যুক্ত করে। আপনি পারবেন:\n• [📅 স্লট বুক করুন] বিভাগে সরকারি স্লট রিজার্ভ করতে।\n• [📖 রুলবুক] বিভাগে সরকারি সিচিইএ এমএসপি দাম দেখতে।\n• [🚜 লাইভ কিউ] বিভাগে আপনার টোকেন নম্বর ট্র্যাক করতে।\n• [💰 পেমেন্ট] বিভাগে সরাসরি ব্যাংকে টাকা জমা দেখতে।`,
    hi: `🌱 "${query}" के लिए कृषिसेतु उत्तर:\nकृषिसेतु किसानों को सीधे सरकारी खरीद केंद्रों से जोड़ता है:\n• [📅 स्लॉट बुक करें] में स्लॉट आरक्षित करें।\n• [📖 नियम पुस्तिका] में एमएसपी दरें देखें।\n• [🚜 लाइव कतार] में टोकन ट्रैक करें।\n• [💰 भुगतान] में डीबीटी स्थिति देखें।`
  };
  return res[lang] || res.en;
};

const handleFarmerQuery = async (query, lang = 'en') => {
  const lower = query.toLowerCase();

  // 1. Score-Based RAG Matching Engine
  let bestTopic = null;
  let highestScore = 0;

  for (const item of CODEBASE_KNOWLEDGE) {
    let score = 0;

    for (const intent of item.intentKeywords) {
      if (lower.includes(intent.toLowerCase())) {
        score += 10;
      }
    }

    if (score > 0 && item.bonusKeywords) {
      for (const bonus of item.bonusKeywords) {
        if (lower.includes(bonus.toLowerCase())) {
          score += 1;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestTopic = item;
    }
  }

  if (bestTopic && highestScore >= 10) {
    return {
      source: 'codebase',
      topic: bestTopic.topic,
      text: bestTopic.response[lang] || bestTopic.response.en || bestTopic.response.bn
    };
  }

  // 2. Gemini API Call for custom general questions
  const geminiReply = await callGeminiApi(query, lang);
  if (geminiReply) {
    return {
      source: 'gemini',
      topic: 'general_farming',
      text: geminiReply
    };
  }

  // 3. Dynamic Intent-Aware Agronomic & Portal Fallback
  return {
    source: 'codebase',
    topic: 'general_dynamic',
    text: generateGeneralAgronomicReply(query, lang)
  };
};

module.exports = { handleFarmerQuery };
