export const farmerRulebookData = {
  version: "KMS 2025-26 / RMS 2025-26",
  lastUpdated: {
    en: "29 May 2025",
    bn: "২৯ মে ২০২৫",
    hi: "29 मई 2025"
  },

  // Navigation Tabs Translations
  tabs: {
    en: [
      { id: 'overview', label: '1. Crop & Season' },
      { id: 'msp', label: '2. MSP Rules' },
      { id: 'quality', label: '3. Quality Standards' },
      { id: 'discounts', label: '4. Discount Slabs' },
      { id: 'process', label: '5. Selling Journey' },
      { id: 'rights', label: '6. Rights & Duties' },
      { id: 'citations', label: '7. Government Orders' }
    ],
    bn: [
      { id: 'overview', label: '১. ফসল ও মরশুম' },
      { id: 'msp', label: '২. এমএসপি নিয়মাবলী' },
      { id: 'quality', label: '৩. গুণমান মানদণ্ড' },
      { id: 'discounts', label: '৪. ছাড়ের নিয়ম' },
      { id: 'process', label: '৫. বিক্রয় যাত্রা' },
      { id: 'rights', label: '৬. অধিকার ও দায়িত্ব' },
      { id: 'citations', label: '৭. সরকারি আদেশ' }
    ],
    hi: [
      { id: 'overview', label: '1. फसल और मौसम' },
      { id: 'msp', label: '2. एमएसपी नियम' },
      { id: 'quality', label: '3. गुणवत्ता मानक' },
      { id: 'discounts', label: '4. कटौती स्लैब' },
      { id: 'process', label: '5. बिक्री यात्रा' },
      { id: 'rights', label: '6. अधिकार व कर्तव्य' },
      { id: 'citations', label: '7. सरकारी आदेश' }
    ]
  },

  // 1. Crop Selection Rules (Paddy and Wheat)
  cropSelection: {
    title: {
      en: "1. Official Crop Selection Rules",
      bn: "১. সরকারি ফসল নির্বাচন নিয়মাবলী",
      hi: "1. आधिकारिक फसल चयन नियम"
    },
    description: {
      en: "Official MSP procurement applies exclusively to Paddy (Kharif Season) and Wheat (Rabi Season).",
      bn: "সরকারি ন্যূনতম সহায়ক মূল্য (MSP) সংগ্রহ শুধুমাত্র ধান (খরিফ মরশুম) এবং গম (রবি মরশুম)-এর জন্য প্রযোজ্য।",
      hi: "आधिकारिक न्यूनतम समर्थन मूल्य (MSP) खरीद केवल धान (खरीफ सीजन) और गेहूं (रबी सीजन) पर लागू होती है।"
    },
    seasons: {
      Kharif: {
        label: {
          en: "🌧️ Kharif Crops (Monsoon)",
          bn: "🌧️ খরিফ ফসল (বর্ষাকাল)",
          hi: "🌧️ खरीफ फसलें (मानसून)"
        },
        period: {
          en: "June - Nov",
          bn: "জুন - নভেম্বর",
          hi: "जून - नवंबर"
        },
        crops: [
          {
            name: { en: "Paddy (Rice)", bn: "ধান (Paddy)", hi: "धान (Paddy)" },
            category: { en: "Cereal", bn: "খাদ্যশস্য", hi: "अनाज" },
            notifiedYears: ["2024", "2025", "2026"],
            icon: "🌾"
          }
        ]
      },
      Rabi: {
        label: {
          en: "❄️ Rabi Crops (Winter)",
          bn: "❄️ রবি ফসল (শীতকাল)",
          hi: "❄️ रबी फसलें (शीतकालीन)"
        },
        period: {
          en: "Nov - April",
          bn: "নভেম্বর - এপ্রিল",
          hi: "नवंबर - अप्रैल"
        },
        crops: [
          {
            name: { en: "Wheat", bn: "গম (Wheat)", hi: "गेहूं (Wheat)" },
            category: { en: "Cereal", bn: "খাদ্যশস্য", hi: "अनाज" },
            notifiedYears: ["2025-26"],
            icon: "🌾"
          }
        ]
      }
    }
  },

  // 2. MSP (Minimum Support Price) Rules & Values
  mspRules: {
    title: {
      en: "2. Minimum Support Price (MSP) Rules",
      bn: "২. ন্যূনতম সহায়ক মূল্য (MSP) নিয়মাবলী",
      hi: "2. न्यूनतम समर्थन मूल्य (MSP) नियम"
    },
    description: {
      en: "Official CCEA Minimum Support Price for Paddy and Wheat as approved by Government of India.",
      bn: "ভারত সরকার অনুমোদিত ধান ও গমের জন্য সরকারি CCEA ন্যূনতম সহায়ক মূল্য।",
      hi: "भारत सरकार द्वारा स्वीकृत धान और गेहूं के लिए आधिकारिक CCEA न्यूनतम समर्थन मूल्य।"
    },
    crops: [
      {
        id: "paddy-kharif-2025",
        cropName: { en: "Paddy (Rice)", bn: "ধান (Rice)", hi: "धान (Rice)" },
        season: { en: "Kharif Marketing Season 2025-26", bn: "খরিফ বিপণন মরশুম ২০২৫-২৬", hi: "खरीफ विपणन सीजन 2025-26" },
        mspCommon: 2369,
        mspGradeA: 2389,
        unit: { en: "Quintal", bn: "কুইন্টাল", hi: "क्विंटल" },
        procurementPeriod: { en: "Oct/Nov 2025 – ongoing", bn: "অক্টোবর/নভেম্বর ২০২৫ – চলমান", hi: "अक्टूबर/नवंबर 2025 – जारी" },
        issuingAuthority: { en: "Cabinet Committee on Economic Affairs (CCEA), Govt. of India", bn: "অর্থনৈতিক বিষয়ক ক্যাবিনেট কমিটি (CCEA), ভারত সরকার", hi: "आर्थिक मामलों की मंत्रिमंडलीय समिति (CCEA), भारत सरकार" },
        reference: { en: "CCEA approval, announced 29 May 2025", bn: "CCEA অনুমোদন, ঘোষিত ২৯ মে ২০২৫", hi: "CCEA स्वीकृति, 29 मई 2025 को घोषित" },
        documentId: "Notification No. 1-4/2025-Py.III"
      },
      {
        id: "wheat-rabi-2025",
        cropName: { en: "Wheat", bn: "গম (Wheat)", hi: "गेहूं (Wheat)" },
        season: { en: "Rabi Marketing Season 2025-26", bn: "রবি বিপণন মরশুম ২০২৫-২৬", hi: "रबी विपणन सीजन 2025-26" },
        mspCommon: 2425,
        mspGradeA: null,
        unit: { en: "Quintal", bn: "কুইন্টাল", hi: "क्विंटल" },
        procurementPeriod: { en: "April 2025 – onwards", bn: "এপ্রিল ২০২৫ – চলমান", hi: "अप्रैल 2025 – आगे" },
        issuingAuthority: { en: "Cabinet Committee on Economic Affairs (CCEA), Govt. of India", bn: "অর্থনৈতিক বিষয়ক ক্যাবিনেট কমিটি (CCEA), ভারত সরকার", hi: "आर्थिक मामलों की मंत्रिमंडलीय समिति (CCEA), भारत सरकार" },
        reference: { en: "CCEA approval, announced Oct 2024", bn: "CCEA অনুমোদন, ঘোষিত অক্টোবর ২০২৪", hi: "CCEA स्वीकृति, अक्टूबर 2024 घोषित" },
        documentId: "Notification No. 2-1/2024-RMS"
      }
    ]
  },

  // 3. Quality Standards & Official Limits (DFPD / FCI FAQ Norms)
  qualityStandards: {
    title: {
      en: "3. Official Quality Standards (FAQ Norms)",
      bn: "৩. সরকারি গুণমান মানদণ্ড (FAQ নিয়মাবলী)",
      hi: "3. आधिकारिक गुणवत्ता मानक (FAQ मानदंड)"
    },
    description: {
      en: "Uniform Specifications issued by Department of Food & Public Distribution (DFPD) and FCI.",
      bn: "খাদ্য ও গণবণ্টন বিভাগ (DFPD) এবং FCI দ্বারা জারি করা অভিন্ন মানদণ্ড।",
      hi: "खाद्य एवं सार्वजनिक वितरण विभाग (DFPD) और FCI द्वारा जारी समान विनिर्देश।"
    },
    paddySpecs: {
      crop: { en: "PADDY (Common & Grade 'A')", bn: "ধান (সাধারণ ও গ্রেড 'এ')", hi: "धान (सामान्य व ग्रेड 'ए')" },
      source: { en: "DFPD/FCI Uniform Specifications for Paddy, KMS 2025-26", bn: "ধানের জন্য DFPD/FCI অভিন্ন মানদণ্ড, KMS ২০২৫-২৬", hi: "धान के लिए DFPD/FCI समान विनिर्देश, KMS 2025-26" },
      parameters: [
        {
          key: "foreignMatterInorganic",
          name: { en: "Foreign Matter — Inorganic", bn: "বহিরাগত পদার্থ — অজৈব (Foreign Matter)", hi: "बाहरी पदार्थ — अकार्बनिक" },
          limitPct: 1.0,
          simpleExplanation: {
            en: "Inorganic foreign matter includes sand, dust, and earth particles.",
            bn: "অজৈব বহিরাগত পদার্থ বলতে বালু, ধূলিকণা ও পাথর বোঝায়।",
            hi: "अकार्बनिक बाहरी पदार्थों में रेत, धूल और पत्थर शामिल हैं।"
          }
        },
        {
          key: "damagedDiscolouredSproutedWeevilled",
          name: { en: "Damaged, Discoloured & Sprouted Grains", bn: "ক্ষতিগ্রস্ত, ফিকে ও অঙ্কুরিত দানা", hi: "क्षतिग्रस्त, बदरंग और अंकुरित अनाज" },
          limitPct: 5.0,
          simpleExplanation: {
            en: "Grains affected by fungi, discoloration, or germination.",
            bn: "ছত্রাক বা বৃষ্টির কারণে ক্ষতিগ্রস্ত ধান।",
            hi: "फफूंद या बारिश से प्रभावित अनाज।"
          }
        },
        {
          key: "moistureContent",
          name: { en: "Moisture Content", bn: "আর্দ্রতার পরিমাণ (Moisture)", hi: "नमी की मात्रा (Moisture)" },
          limitPct: 17.0,
          simpleExplanation: {
            en: "Percentage of water in grain. Up to 17.0% accepted at full MSP.",
            bn: "ধানে জলের পরিমাণ। ১৭.০% পর্যন্ত পূর্ণ এমএসপিতে গৃহীত।",
            hi: "अनाज में नमी। 17.0% तक पूर्ण एमएसपी पर स्वीकार्य।"
          }
        }
      ]
    },
    wheatSpecs: {
      crop: { en: "WHEAT (Rabi Marketing Season)", bn: "গম (রবি বিপণন মরশুম)", hi: "गेहूं (रबी विपणन सीजन)" },
      source: { en: "DFPD/FCI Uniform Specifications for Wheat, RMS 2025-26", bn: "গমের জন্য DFPD/FCI অভিন্ন মানদণ্ড, RMS ২০২৫-২৬", hi: "गेहूं के लिए DFPD/FCI समान विनिर्देश, RMS 2025-26" },
      parameters: [
        {
          key: "foreignMatter",
          name: { en: "Foreign Matter", bn: "বহিরাগত ময়লা (Foreign Matter)", hi: "बाहरी पदार्थ (Foreign Matter)" },
          limitPct: 0.75,
          simpleExplanation: {
            en: "Dust and weed seeds in wheat sample must not exceed 0.75%.",
            bn: "গমে ধূলিকণা ০.৭৫% এর বেশি হওয়া যাবে না।",
            hi: "गेहूं में धूल 0.75% से अधिक नहीं होनी चाहिए।"
          }
        },
        {
          key: "damagedGrains",
          name: { en: "Damaged Grains", bn: "ক্ষতিগ্রস্ত গমের দানা", hi: "क्षतिग्रस्त गेहूं के दाने" },
          limitPct: 2.0,
          simpleExplanation: {
            en: "Physically broken or fungal-damaged wheat kernels.",
            bn: "ছত্রাকাক্রান্ত বা ক্ষতিগ্রস্ত গমের দানা।",
            hi: "क्षतिग्रस्त या फफूंदयुक्त गेहूं के दाने।"
          }
        },
        {
          key: "moistureContent",
          name: { en: "Moisture Content", bn: "আর্দ্রতার পরিমাণ (Moisture)", hi: "नमी की मात्रा (Moisture)" },
          limitPct: 12.0,
          simpleExplanation: {
            en: "Up to 12.0% moisture accepted at full MSP value.",
            bn: "১২.০% আর্দ্রতা পর্যন্ত পূর্ণ মূল্যে গৃহীত।",
            hi: "12.0% तक नमी पूर्ण मूल्य पर स्वीकार्य।"
          }
        }
      ]
    }
  },

  // 4. Discount Slabs & Moisture Cut Schedule
  discountRules: {
    title: {
      en: "4. Value Cut Slabs & Deductions Schedule",
      bn: "৪. মূল্য কাটছাঁট ও ছাড়ে সারণী",
      hi: "4. मूल्य कटौती स्लैब एवं कटौती नियम"
    },
    description: {
      en: "Official price deduction guidelines based on moisture percentage above standard limit.",
      bn: "মানক সীমার উপরে আর্দ্রতার পরিমাণের ওপর ভিত্তি করে সরকারি দাম কাটার নির্দেশিকা।",
      hi: "मानक सीमा से अधिक नमी होने पर आधिकारिक मूल्य कटौती दिशानिर्देश।"
    },
    paddyMoistureSlabs: [
      {
        range: "17.0% - 18.0%",
        cut: {
          en: "Value cut of 1% on MSP rate per quintal",
          bn: "প্রতি কুইন্টালে MSP-এর ১% মূল্য কর্তন",
          hi: "प्रति क्विंटल MSP दर पर 1% कटौती"
        }
      },
      {
        range: "18.0% - 19.0%",
        cut: {
          en: "Value cut of 2% on MSP rate per quintal",
          bn: "প্রতি কুইন্টালে MSP-এর ২% মূল্য কর্তন",
          hi: "प्रति क्विंटल MSP दर पर 2% कटौती"
        }
      },
      {
        range: "> 19.0%",
        cut: {
          en: "Rejected for immediate procurement; must be solar dried in yard",
          bn: "সরাসরি সংগ্রহের জন্য প্রত্যাখ্যাত; কেন্দ্রে রোদ শুকিয়ে পুনরায় পরীক্ষা করাতে হবে",
          hi: "तत्काल खरीद के लिए अस्वीकृत; सुखाने की आवश्यकता"
        }
      }
    ],
    exampleCalculation: {
      crop: { en: "Paddy (Grade A)", bn: "ধান (গ্রেড এ)", hi: "धान (ग्रेड ए)" },
      moistureMeasured: 18.0,
      baseLimit: 17.0,
      excessPct: 1.0,
      baseMsp: 2389,
      valueCutPct: 1.0,
      deductionPerQtl: 23.89,
      netPayablePerQtl: 2365.11
    }
  },

  // 5. Procurement Journey Rules
  procurementRules: {
    title: {
      en: "5. Procurement Journey & Sequence Rules",
      bn: "৫. শস্য বিক্রয় যাত্রার ধাপসমূহ",
      hi: "5. खरीद प्रक्रिया एवं चरण नियम"
    },
    description: {
      en: "Mandatory sequential steps enforced by the government procurement portal.",
      bn: "সরকারি সংগ্রহ পোর্টালে অনুসৃত বাধ্যতামূলক পর্যায়ক্রমিক ধাপ।",
      hi: "सरकारी खरीद पोर्टल द्वारा लागू अनिवार्य चरणबद्ध प्रक्रिया।"
    },
    steps: [
      {
        step: 1,
        title: { en: "Slot Booking", bn: "স্লট বুকিং", hi: "स्लॉट बुकिंग" },
        desc: {
          en: "Farmer selects Paddy or Wheat and books slot based on Parcha land quota.",
          bn: "কৃষক জমি পর্চার কোটা অনুযায়ী ধান বা গম নির্বাচনের মাধ্যমে সময় বুক করবেন।",
          hi: "किसान पर्चा भूमि कोटा के आधार पर धान या गेहूं चुनकर स्लॉट बुक करता है।"
        }
      },
      {
        step: 2,
        title: { en: "Arrival & QR Check-in", bn: "আগমন ও QR চেক-ইন", hi: "आगमन एवं QR चेक-इन" },
        desc: {
          en: "Farmer arrives at designated centre and scans digital QR token.",
          bn: "কৃষক নির্ধারিত কেন্দ্রে পৌঁছে ডিজিটাল QR টোকেন স্ক্যান করবেন।",
          hi: "किसान निर्दिष्ट केंद्र पर पहुंचकर डिजिटल QR टोकन स्कैन करता है।"
        }
      },
      {
        step: 3,
        title: { en: "Quality Sample Grading", bn: "গুণমান পরীক্ষা (Grading)", hi: "गुणवत्ता नमूना जांच (Grading)" },
        desc: {
          en: "Authorized assayer tests moisture and FAQ quality parameters.",
          bn: "অনুমোদিত পরীক্ষক আর্দ্রতা ও FAQ গুণমান মানদণ্ড পরীক্ষা করবেন।",
          hi: "अधिकृत परीक्षक नमी और FAQ गुणवत्ता मानकों की जांच करता है।"
        }
      },
      {
        step: 4,
        title: { en: "Digital Weighment", bn: "ডিজিটাল ওজন (Weighment)", hi: "डिजिटल तौल (Weighment)" },
        desc: {
          en: "Gross and tare weight recorded on integrated digital weighbridge.",
          bn: "ডিজিটাল ওজন স্কেলে মোট ও খাঁটি ওজন নথিভুক্ত হবে।",
          hi: "डिजिटल वेब्रिज पर कुल और शुद्ध वजन दर्ज किया जाता है।"
        }
      },
      {
        step: 5,
        title: { en: "MSP Calculation & Receipt", bn: "এমএসপি হিসাব ও রসিদ", hi: "एमएसपी गणना एवं रसीद" },
        desc: {
          en: "Official CCEA MSP rate applied and digital receipt issued.",
          bn: "সরকারি CCEA হার প্রয়োগ করে ডিজিটাল পেমেন্ট রসিদ প্রদান করা হয়।",
          hi: "सरकारी CCEA दर लागू कर डिजिटल रसीद जारी की जाती है।"
        }
      },
      {
        step: 6,
        title: { en: "DBT Payment Settlement", bn: "ডিবিটি পেমেন্ট স্থানান্তর", hi: "डीबीटी भुगतान बैंक ट्रांसफर" },
        desc: {
          en: "Direct Bank Transfer initiated straight to Aadhaar-linked bank account.",
          bn: "সরাসরি আধার-লিঙ্কড ব্যাংক অ্যাকাউন্টে টাকা স্থানান্তর শুরু হয়।",
          hi: "सीधे आधार से जुड़े बैंक खाते में बैंक ट्रांसफर शुरू किया जाता है।"
        }
      }
    ]
  },

  // 6. Farmer Rights & Responsibilities
  rightsAndResponsibilities: {
    title: {
      en: "6. Farmer Rights & Responsibilities",
      bn: "৬. কৃষকের আইনি अधिकार ও দায়িত্ব",
      hi: "6. किसान अधिकार एवं कर्तव्य"
    },
    rightsTitle: {
      en: "Statutory Farmer Rights",
      bn: "আইনসম্মত কৃষক অধিকার",
      hi: "कानूनी किसान अधिकार"
    },
    responsibilitiesTitle: {
      en: "Farmer Responsibilities",
      bn: "কৃষকের দায়িত্বসমূহ",
      hi: "किसान की जिम्मेदारियां"
    },
    rights: {
      en: [
        "Right to inspect official CCEA-notified MSP for Paddy and Wheat.",
        "Right to receive a transparent digital quality report and signed receipt.",
        "Right to view real-time digital weighbridge reading."
      ],
      bn: [
        "ধান ও গমের সরকারি নোটিফায়েড MSP মূল্য যাচাইয়ের পূর্ণ অধিকার।",
        "স্বচ্ছ গুণমান রিপোর্ট ও ডিজিটাল রসিদ পাওয়ার অধিকার।",
        "ডিজিটাল ওজন স্কেলের মান দেখার অধিকার।"
      ],
      hi: [
        "धान और गेहूं के लिए सरकारी अधिसूचित एमएसपी जांचने का अधिकार।",
        "पारदर्शी गुणवत्ता रिपोर्ट और डिजिटल रसीद प्राप्त करने का अधिकार।",
        "डिजिटल वेब्रिज रीडिंग देखने का अधिकार।"
      ]
    },
    responsibilities: {
      en: [
        "Provide authentic Parcha land record during registration.",
        "Arrive at designated procurement centre within allocated time slot.",
        "Clean and dry produce to conform to FAQ moisture standards."
      ],
      bn: [
        "নিবন্ধনের সময় আসল জমি পর্চা জমা দেওয়া।",
        "বুক করা নির্ধারিত সময়সূচী মেনে কেন্দ্রে উপস্থিত হওয়া।",
        "FAQ আর্দ্রতা মান মেনে শস্য শুকিয়ে পরিষ্কার করে আনা।"
      ],
      hi: [
        "पंजीकरण के समय प्रामाणिक पर्चा भूमि रिकॉर्ड प्रदान करना।",
        "आवंटित समय सीमा के भीतर खरीद केंद्र पर पहुंचना।",
        "FAQ नमी मानकों के अनुसार उपज को सुखाकर साफ लाना।"
      ]
    }
  },

  // 7. Government Guidelines & Citation Block
  governmentGuidelines: {
    title: {
      en: "7. Government Guidelines & Official Citations",
      bn: "৭. সরকারি নির্দেশিকা ও রেফারেন্স",
      hi: "7. सरकारी दिशानिर्देश एवं आधिकारिक संदर्भ"
    },
    description: {
      en: "Every MSP rate and specification is derived directly from CCEA & DFPD notifications.",
      bn: "প্রতিটি MSP মূল্য এবং মানদণ্ড সরাসরি CCEA ও DFPD বিজ্ঞপ্তি থেকে গৃহীত।",
      hi: "प्रत्येक एमएसपी दर और विनिर्देश सीधे CCEA और DFPD अधिसूचनाओं से लिया गया है।"
    },
    pdfButtonText: {
      en: "Open Official Govt Order PDF",
      bn: "সরকারি নির্দেশিকা PDF খুলুন",
      hi: "आधिकारिक सरकारी आदेश PDF खोलें"
    },
    citations: [
      {
        issuingAuthority: {
          en: "Department of Food & Public Distribution (DFPD), Govt. of India",
          bn: "খাদ্য ও গণবণ্টন বিভাগ (DFPD), ভারত সরকার",
          hi: "खाद्य एवं सार्वजनिक वितरण विभाग (DFPD), भारत सरकार"
        },
        documentRef: "Notification No. 1-4/2025-Py.III",
        effectiveDate: {
          en: "01 October 2025",
          bn: "০১ অক্টোবর ২০২৫",
          hi: "01 अक्टूबर 2025"
        },
        summary: {
          en: "Uniform specifications for Paddy and Wheat procurement, KMS/RMS 2025-26.",
          bn: "ধান ও গম সংগ্রহের জন্য অভিন্ন গুণমান মানদণ্ড, KMS/RMS ২০২৫-২৬।",
          hi: "धान और गेहूं खरीद के लिए समान गुणवत्ता विनिर्देश, KMS/RMS 2025-26।"
        }
      }
    ]
  }
};
