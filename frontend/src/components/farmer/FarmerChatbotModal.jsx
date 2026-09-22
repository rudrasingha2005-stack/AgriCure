import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  Bot,
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  RefreshCw,
  BookOpen,
  Globe,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import API from '../../services/api';

const QUICK_PROMPTS = {
  en: [
    'What is AgriSetu app for?',
    'What is Paddy MSP rate?',
    'What is Paddy moisture limit?',
    'How do I book a slot?',
    'When will I get paid?'
  ],
  bn: [
    'কৃষিসেতু অ্যাপ কিসের জন্য?',
    'ধানের সরকারি দাম (MSP) কত?',
    'ধানের আর্দ্রতার মানদণ্ড কী?',
    'স্লট বুকিং কীভাবে করব?',
    'ব্যাংকে টাকা কখন জমা হবে?'
  ],
  hi: [
    'कृषिसेतु ऐप किसलिए है?',
    'धान की सरकारी MSP दर क्या है?',
    'धान में नमी की सीमा क्या है?',
    'खरीद स्लॉट कैसे बुक करें?',
    'भुगतान खाते में कब आएगा?'
  ]
};

// Score-Based Client-side Codebase Knowledge Index
const LOCAL_CODEBASE_KB = [
  {
    topic: 'app_info',
    intentKeywords: ['app', 'agriprocure', 'agrisetu', 'about', 'purpose', 'this app', 'app for', 'what is this app', 'what is agriprocure', 'what is agrisetu', 'কী অ্যাপ', 'অ্যাপ কিসের জন্য', 'কৃষিসেতু কি', 'यह ऐप किसलिए है', 'ऐप के बारे में', 'कृषिसेतु क्या है'],
    bonusKeywords: ['portal', 'system', 'help'],
    res: {
      en: '🌱 AgriSetu is a Decentralized Agricultural Procurement & Farmer Empowerment Portal:\n• 📅 Direct Yard Booking: Reserve procurement slots at nearby government yards.\n• 🌾 Guaranteed MSP: Direct sale at official CCEA Minimum Support Prices without middleman cuts.\n• 🚜 Live Queue Tracking: Track your digital token status in real-time.\n• 💰 48-Hour DBT Payouts: Direct Bank Transfers straight to your Aadhaar-linked account.\n• 🚨 Grievance Redressal: File photo-backed dispute dockets with 72-hour overseer resolution.',
      bn: '🌱 কৃষিসেতু (AgriSetu) হলো একটি বিকেন্দ্রীকৃত শস্য সংগ্রহ ও কৃষক সুবিধা পোর্টাল:\n• 📅 সরাসরি স্লট বুকিং: নিকটস্থ সরকারি কেন্দ্রে শস্য বিক্রির স্লট বুক করুন।\n• 🌾 সরকারি সিচিইএ (CCEA) সহায়ক মূল্য: মধ্যস্বত্বভোগী ছাড়াই শতভাগ সরকারি দাম।\n• 🚜 রিয়েল-টাইম লাইভ কিউ: আপনার ডিজিটাল টোকেন নম্বর ও পালার আপডেট দেখুন।\n• 💰 ৪৮ ঘণ্টার মধ্যে ডিবিটি: সরাসরি ব্যাংক অ্যাকাউন্টে টাকা স্থানান্তর।\n• 🚨 অভিযোগ প্রতিকার: অন্যায্য কাটার বিরুদ্ধে ছবি ও প্রমাণসহ অভিযোগ দায়ের করুন।',
      hi: '🌱 कृषिसेतु (AgriSetu) एक विकेंद्रीकृत कृषि खरीद और किसान पोर्टल है:\n• 📅 सीधे खरीद स्लॉट बुक करें: निकटतम सरकारी केंद्रों पर समय आरक्षित करें।\n• 🌾 न्यूनतम समर्थन मूल्य (MSP): बिना बिचौलियों के सरकारी दरों पर सीधी बिक्री।\n• 🚜 लाइव कतार ट्रैकिंग: रियल-टाइम में टोकन स्थिति देखें।\n• 💰 48 घंटे में बैंक हस्तांतरण: सीधे आधार से जुड़े बैंक खाते में राशि जमा।\n• 🚨 शिकायत निवारण: 72 घंटे में समाधान की गारंटी।'
    }
  },
  {
    topic: 'moisture_and_quality',
    intentKeywords: ['moisture', 'limit', 'dryness', 'wet', 'rotten', 'water', 'dockage', 'deduction', 'faq', 'grade', 'আর্দ্রতা', 'সীমা', 'মান', 'গুণমান', 'কাটা', 'জল', 'শুকানো', 'গ্রেড', 'ভিজে', 'পচা', 'নমি', 'गुणवत्ता', 'कटौती', 'सुखाना'],
    bonusKeywords: ['paddy', 'wheat', 'crop', 'ধান', 'গেঁহু'],
    res: {
      en: 'KMS 2025-26 Official Moisture & Quality FAQ Standards:\n• Paddy Max Moisture Limit: 17.0% (Ideal: 14.0%)\n• Wheat Max Moisture Limit: 12.0%\n• Moisture 17.1%–19.0%: Value cut of 0.5% per 1% excess moisture.\n• Moisture > 19.0%: Produce REJECTED at yard gate. Crop drying required.\n• Foreign Material Limit: Max 1.0%\n• Damaged / Discolored Grains: Max 3.0%',
      bn: 'গুণমান ও আর্দ্রতার সরকারি মানদণ্ড (KMS 2025-26):\n• ধানের সর্বোচ্চ আর্দ্রতা সীমা: ১৭.০% (আদর্শ: ১৪.০%)\n• গমের সর্বোচ্চ আর্দ্রতা সীমা: ১২.০%\n• ১৭%–১৯% আর্দ্রতা: প্রতি ১% অতিরিক্তের জন্য ০.৫% মূল্য কর্তন।\n• ১৯%-এর বেশি আর্দ্রতা: ফসল গেটে প্রত্যাখ্যাত হবে এবং শুকানোর জন্য বলা হবে।\n• বাহ্যিক অপদ্রব্য: সর্বোচ্চ ১.০%',
      hi: 'गुणवत्ता एवं नमी मानक (KMS 2025-26):\n• धान की अधिकतम नमी सीमा: 17.0% (आदर्श: 14.0%)\n• गेहूं की अधिकतम नमी सीमा: 12.0%\n• 17% से 19% नमी: प्रति 1% अतिरिक्त पर 0.5% कटौती।\n• 19% से अधिक नमी: फसल अस्वीकृत होगी और सुखाने की सलाह दी जाएगी।'
    }
  },
  {
    topic: 'msp_rates',
    intentKeywords: ['msp', 'rate', 'price', 'cost', 'ccea', 'value', 'worth', 'support price', 'এমএসপি', 'দাম', 'মূল্য', 'কত', 'হার', 'সহায়ক', 'एमएसपी', 'दाम', 'मूल्य', 'दर', 'रेट', 'समर्थन'],
    bonusKeywords: ['paddy', 'wheat', 'quintal', 'qtl', 'ধান', 'গম', 'কুंतल', 'कविंटल'],
    res: {
      en: 'Official CCEA Minimum Support Prices (MSP) for KMS 2025-26:\n• Paddy (Common): ₹2,369 / Qtl\n• Paddy (Grade A): ₹2,389 / Qtl\n• Wheat: ₹2,425 / Qtl\nAll prices are guaranteed minimum government procurement rates without middleman deductions.',
      bn: 'সরকারি CCEA ন্যূনতম সহায়ক মূল্য (MSP) KMS 2025-26:\n• ধান (সাধারণ): ₹২,৩৬৯ / কুইন্টাল\n• ধান (গ্রেড এ): ₹২,৩৮৯ / কুইন্টাল\n• গম: ₹২,৪২৫ / কুইন্টাল\nমধ্যস্বত্বভোগী ছাড়াই সরাসরি সরকারি মূল্যে বিক্রি করুন।',
      hi: 'आधिकारिक CCEA न्यूनतम समर्थन मूल्य (MSP) KMS 2025-26:\n• धान (सामान्य): ₹2,369 / कुंतल\n• धान (ग्रेड ए): ₹2,389 / कुंतल\n• गेहूं: ₹2,425 / कुंतल\nबिना किसी बिचौलिए के सीधे सरकारी खरीद केंद्र पर बेचें।'
    }
  },
  {
    topic: 'payments_and_dbt',
    intentKeywords: ['payment', 'paid', 'pay', 'money', 'dbt', 'bank', 'account', 'disbursement', 'receipt', 'credit', 'payout', 'credited', 'when money', 'টাকা', 'পেমেন্ট', 'ব্যাংক', 'অ্যাকাউন্ট', 'রসিদ', 'ডিবিটি', 'জমা', 'কখন পাব', 'অর্থ', 'भुगतान', 'पैसा', 'रुपया', 'बैंक', 'खाता', 'रसीद', 'डीबीटी', 'कब मिलेगा', 'धन'],
    bonusKeywords: ['j-form', 'weighment', 'receipt', 'কুইন্টাল', 'रसीद'],
    res: {
      en: 'Payment & Bank Transfer Disbursement Rules:\n• Direct Bank Transfer (DBT) is initiated within 48 hours of Official Weight & Quality Approval.\n• Funds are credited directly to your Aadhaar-linked bank account.\n• Download digital J-Form / Purchase Receipt from [💰 Payments] modal anytime.',
      bn: 'পেমেন্ট ও ব্যাংক অ্যাকাউন্ট স্থানান্তর নিয়ম:\n• ওজন ও গুণমান পরীক্ষার ৪৮ ঘণ্টার মধ্যে সরাসরি ব্যাংক অ্যাকাউন্টে (DBT) টাকা জমা হয়।\n• টাকা সরাসরি আপনার আধার-সংযুক্ত ব্যাংক অ্যাকাউন্টে পাঠায় সরকার।\n• [💰 পেমেন্ট] বিভাগে ক্লিক করে ডিজিটাল জে-ফর্ম রসিদ ডাউনলোড করতে পারেন।',
      hi: 'भुगतान और डीबीटी नियम:\n• आधिकारिक तौल और गुणवत्ता जांच के 48 घंटों के भीतर राशि सीधे आपके बैंक खाते (DBT) में भेजी जाती है।\n• [💰 भुगतान] अनुभाग से रसीद डाउनलोड करें।'
    }
  },
  {
    topic: 'slot_booking',
    intentKeywords: ['book', 'booking', 'slot', 'token', 'appointment', 'reserve', 'schedule', 'how to book', 'স্লট', 'বুকিং', 'বুক', 'টোকেন', 'অ্যাপয়েন্টমেন্ট', 'কীভাবে', 'কিভাবে', 'स्लॉट', 'बुकिंग', 'बुक', 'टोकन', 'अपॉइंटमेंट', 'कैसे'],
    bonusKeywords: ['centre', 'yard', 'date', 'time', 'কেন্দ্র', 'সময়'],
    res: {
      en: 'How to Book a Procurement Slot on AgriSetu:\n1. Open AgriSetu Farmer Dashboard.\n2. Click the [📅 Book Slot] interactive logo.\n3. Select your Crop (e.g. Paddy) & Quantity (e.g. 50 Quintals).\n4. Choose nearby Procurement Centre & preferred Date/Time.\n5. Click Confirm Booking to generate your Official Digital Token & QR Code.',
      bn: 'স্লট বুকিং করার নিয়ম:\n১. কৃষিসেতু ড্যাশবোর্ডে যান।\n২. [📅 স্লট বুক করুন] লোগোতে ক্লিক করুন।\n৩. আপনার ফসল ও পরিমাণ (কুইন্টাল) বেছে নিন।\n৪. নিকটস্থ সংগ্রহ কেন্দ্র এবং সুবিধাজনক সময় নির্বাচন করুন।\n৫. বুকিং নিশ্চিত করে আপনার ডিজিটাল টোকেন ও QR কোড পান।',
      hi: 'स्लॉट बुक करने का तरीका:\n1. कृषिसेतु डैशबोर्ड पर जाएं।\n2. [📅 स्लॉट बुक करें] लोगो पर क्लिक करें।\n3. अपनी फसल और मात्रा (कुंतल में) चुनें।\n4. निकटतम खरीद केंद्र और समय स्लॉट चुनें।\n5. पुष्टि करें और अपना डिजिटल टोकन व क्यूआर कोड प्राप्त करें।'
    }
  },
  {
    topic: 'live_queue',
    intentKeywords: ['queue', 'turn', 'serving', 'wait', 'token number', 'live status', 'counter', 'when is my turn', 'কিউ', 'পালা', 'কখন', 'লাইন', 'অপেক্ষা', 'কাউন্টার', 'লাইভ', 'টোকেন নম্বর', 'कतार', 'लाइन', 'बारी', 'कब', 'इंतजार', 'काउंटर', 'लाइव'],
    bonusKeywords: ['status', 'tracking'],
    res: {
      en: 'Live Queue Tracking & Token Rules:\n• Check token progress under [🚜 Live Queue] logo badge.\n• When your token is within 5 slots of being served, you will receive an automated SMS & rain advisory notification.\n• When your token arrives, proceed to Counter 2 with your produce truck.',
      bn: 'লাইভ কিউ ট্র্যাকিং নিয়ম:\n• [🚜 লাইভ কিউ] লোগোতে ক্লিক করে বর্তমান টোকেন নম্বর দেখুন।\n• আপনার পালার ৫টি টোকেন আগে এসএমএস অ্যালার্ট পাঠানো হবে।\n• আপনার পালা এলে ট্রাক নিয়ে কাউন্টার ২-এ যান।',
      hi: 'लाइव कतार नियम:\n• [🚜 लाइव कतार] लोगो पर क्लिक करके वर्तमान स्थिति देखें।\n• आपकी बारी आने से 5 टोकन पहले एसएमएस अलर्ट प्राप्त होगा।\n• बारी आने पर अपना वाहन काउंटर 2 पर ले जाएं।'
    }
  },
  {
    topic: 'grievance_and_complaint',
    intentKeywords: ['complaint', 'grievance', 'cheating', 'dispute', 'problem', 'illegal', 'bribe', 'report', 'issue', 'harassment', 'অভিযোগ', 'সমস্যা', 'ধোঁকা', 'ঘুষ', 'দালাল', 'অন্যায়', 'রিপোর্ট', 'शिकायत', 'समस्या', 'धोखा', 'रिश्वत', 'दलाल', 'अन्याय'],
    bonusKeywords: ['proof', 'docket', 'cut', 'কাটা'],
    res: {
      en: 'Grievance & Redressal Mechanism:\n• If facing unjustified weight deduction, illegal cuts, or harassment, click [🚨 Complaints & Feedback].\n• You can attach photos/proof to lodge an official docket.\n• Resolution guaranteed within 72 working hours under FCI Overseer Protocol.',
      bn: 'অভিযোগ দায়ের পদ্ধতি:\n• অনুচিত ওজন বা টাকা কাটার ক্ষেত্রে [🚨 অভিযোগ ও মতামত] লোগোতে ক্লিক করুন।\n• ছবি ও প্রমাণসহ অভিযোগ দায়ের করুন। ৭২ ঘণ্টার মধ্যে সমাধান করা হবে।',
      hi: 'शिकायत निवारण प्रक्रिया:\n• गलत तौल या अनुचित कटौती पर [🚨 शिकायत दर्ज करें] पर क्लिक करें।\n• 72 घंटे के भीतर आधिकारिक जांच व निवारण की गारंटी।'
    }
  }
];

const generateClientFallback = (query, lang) => {
  const q = query.toLowerCase();

  if (q.includes('weather') || q.includes('rain') || q.includes('বৃষ্টি') || q.includes('मौसम') || q.includes('बारिश')) {
    const res = {
      en: '🌧️ AgriSetu Weather & Moisture Guidance:\n• Check live yard weather warnings in the [🌦️ Weather Advisory] modal.\n• Cover harvested produce with tarpaulins if rain is forecasted during transport.\n• Ensure paddy moisture is dried below 17.0% before bringing to procurement yard.',
      bn: '🌧️ কৃষিসেতু আবহাওয়া ও আর্দ্রতা নির্দেশিকা:\n• ড্যাশবোর্ডের [🌦️ আবহাওয়া পূর্বাভাস] লোগোতে ক্লিক করে সরাসরি আবহাওয়ার পূর্বাভাস দেখুন।\n• বৃষ্টির পূর্বাভাস থাকলে ফসল ত্রিপল দিয়ে ঢেকে কেন্দ্রে আনুন।\n• সরকারি কেন্দ্রে আনার আগে ধানের আর্দ্রতা ১৭.০%-এর নিচে শুকিয়ে নিন।',
      hi: '🌧️ कृषिसेतु मौसम व नमी सलाह:\n• [🌦️ मौसम सलाह] पर क्लिक करके लाइव मौसम अलर्ट देखें।\n• बारिश की संभावना होने पर फसल तिरपाल से ढककर लाएं।'
    };
    return res[lang] || res.en;
  }

  const res = {
    en: `🌱 AgriSetu Assistant Guidance for "${query}":\nAgriSetu connects farmers directly to government procurement yards without middlemen.\n• Book slots under [📅 Book Slot].\n• View MSP prices under [📖 Farmer Rulebook].\n• Track queue under [🚜 Live Queue].\n• View DBT payment receipts under [💰 Payments].`,
    bn: `🌱 "${query}" সম্পর্কে কৃষিসেতু সহকারীর নির্দেশিকা:\nকৃষিসেতু কৃষকদের সরাসরি সরকারি সংগ্রহ কেন্দ্রের সাথে যুক্ত করে:\n• [📅 স্লট বুক করুন] লোগোতে স্লট রিজার্ভ করতে পারেন।\n• [📖 রুলবুক] লোগোতে সরকারি সিচিইএ এমএসপি দাম দেখুন।\n• [🚜 লাইভ কিউ] লোগোতে টোকেন নম্বর ট্র্যাক করুন।\n• [💰 পেমেন্ট] লোগোতে ব্যাংকের রসিদ দেখুন।`,
    hi: `🌱 "${query}" के लिए कृषिसेतु मार्गदर्शन:\nकृषिसेतु किसानों को सीधे सरकारी खरीद केंद्रों से जोड़ता है:\n• [📅 स्लॉट बुक करें] में स्लॉट आरक्षित करें।\n• [📖 नियम पुस्तिका] में एमएसपी दरें देखें।\n• [🚜 लाइव कतार] में टोकन ट्रैक करें।\n• [💰 भुगतान] में डीबीटी स्थिति देखें।`
  };
  return res[lang] || res.en;
};

export default function FarmerChatbotModal({ isOpen, onClose }) {
  const { language, t } = useContext(LanguageContext);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text:
        language === 'bn'
          ? 'নমস্কার! আমি কৃষিসেতু এআই সহকারী। 🌾\nএমএসপি দাম, ধানের আর্দ্রতা, স্লট বুকিং, পেমেন্ট বা কৃষি বিষয়ক যে কোনো প্রশ্ন করতে পারেন (লিখে অথবা ভয়েস ব্যবহার করে)।'
          : language === 'hi'
          ? 'नमस्ते! मैं कृषिसेतु एआई सहायक हूँ। 🌾\nआप एमएसपी दर, धान नमी, स्लॉट बुकिंग या कृषि संबंधी कोई भी सवाल पूछ सकते हैं (टाइप करके या बोलकर)।'
          : 'Hi! I am AgriSetu AI Assistant. 🌾\nAsk me anything about MSP rates, crop moisture limits, slot booking, live queue, payments, or general farming advice using Text or Voice Assistant!',
      source: 'codebase'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      const langMap = { en: 'en-IN', bn: 'bn-IN', hi: 'hi-IN' };
      recognition.lang = langMap[language] || 'en-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = (e) => {
        console.error('Speech recognition error:', e.error);
        setIsListening(false);
      };
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputQuery(transcript);
          handleSendMessage(transcript);
        }
      };

      recognitionRef.current = recognition;
    }
  }, [language]);

  const speakText = (text) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/[*_#•\[\]]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(clean);
    const langMap = { en: 'en-IN', bn: 'bn-IN', hi: 'hi-IN' };
    utterance.lang = langMap[language] || 'en-IN';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const toggleVoiceListening = () => {
    if (!recognitionRef.current) {
      alert('Voice assistant is not supported on this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        const langMap = { en: 'en-IN', bn: 'bn-IN', hi: 'hi-IN' };
        recognitionRef.current.lang = langMap[language] || 'en-IN';
        recognitionRef.current.start();
      } catch (err) {
        console.error('Speech recognition start error:', err);
      }
    }
  };

  const handleSendMessage = async (customText = null) => {
    const query = (customText || inputQuery).trim();
    if (!query || loading) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const res = await API.post('/farmer/chat', { query, language });
      if (res.data && res.data.text) {
        const botMsg = {
          id: Date.now() + 1,
          sender: 'bot',
          text: res.data.text,
          source: res.data.source || 'codebase'
        };
        setMessages((prev) => [...prev, botMsg]);
        speakText(res.data.text);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn('Backend Chatbot route unreachable, using score-based client RAG:', err.message);
    }

    // Client-side Score-Based RAG Engine
    const lower = query.toLowerCase();
    let bestTopic = null;
    let highestScore = 0;

    for (const item of LOCAL_CODEBASE_KB) {
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

    let botMsg;
    if (bestTopic && highestScore >= 10) {
      botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: bestTopic.res[language] || bestTopic.res.en || bestTopic.res.bn,
        source: 'codebase'
      };
    } else {
      // Direct Gemini REST API attempt
      try {
        const apiKey = 'AQ.Ab8RN6KIPmZBeiEqJKd-dczAlhvqb890SLaGODA-BHzYYuwUA';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const geminiRes = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `You are AgriSetu AI Assistant helping Indian farmers. Answer in language: ${language}. Farmer Question: ${query}`
                  }
                ]
              }
            ]
          })
        });

        const geminiData = await geminiRes.json();
        const geminiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

        if (geminiText) {
          botMsg = {
            id: Date.now() + 1,
            sender: 'bot',
            text: geminiText,
            source: 'gemini'
          };
        }
      } catch (e) {
        console.error('Gemini API fetch error:', e);
      }

      if (!botMsg) {
        botMsg = {
          id: Date.now() + 1,
          sender: 'bot',
          text: generateClientFallback(query, language),
          source: 'codebase'
        };
      }
    }

    setMessages((prev) => [...prev, botMsg]);
    speakText(botMsg.text);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white/95 backdrop-blur-2xl border border-white/90 rounded-3xl w-full max-w-lg h-[620px] max-h-[90vh] shadow-2xl flex flex-col overflow-hidden ring-1 ring-emerald-500/20">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-800 to-teal-700 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-xl shadow-inner">
              🤖
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base flex items-center gap-1.5 leading-tight">
                AgriSetu AI Assistant
                <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                  Voice Enabled 🎙️
                </span>
              </h3>
              <p className="text-[11px] text-emerald-100 font-medium">
                Codebase RAG & Gemini AI • Voice & Text
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                if (speechEnabled && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                }
                setSpeechEnabled(!speechEnabled);
              }}
              title={speechEnabled ? 'Mute Voice Assistant' : 'Unmute Voice Assistant'}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                speechEnabled ? 'bg-emerald-600/80 text-white' : 'bg-slate-700/80 text-slate-300'
              }`}
            >
              {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Voice Recording Banner Indicator */}
        {isListening && (
          <div className="bg-red-500 text-white px-4 py-2 text-xs font-bold flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              <span>Listening to your voice in {language.toUpperCase()}... Speak now!</span>
            </div>
            <button
              onClick={() => recognitionRef.current?.stop()}
              className="text-[10px] underline font-extrabold cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-emerald-50/70 border-b border-emerald-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          {QUICK_PROMPTS[language]?.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1 rounded-full bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-950 font-bold text-[11px] whitespace-nowrap transition-all shadow-2xs hover:scale-105 cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-gradient-to-b from-slate-50/50 to-emerald-50/20">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-3xl text-xs sm:text-sm font-medium shadow-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none'
                    : 'bg-white border border-slate-200/90 text-slate-800 rounded-bl-none'
                }`}
              >
                {/* Source Badge */}
                {msg.sender === 'bot' && (
                  <div className="flex items-center gap-1 mb-1.5 pb-1 border-b border-slate-100 text-[10px] font-bold">
                    {msg.source === 'codebase' ? (
                      <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-emerald-600" /> AgriSetu Rulebook Knowledge
                      </span>
                    ) : (
                      <span className="text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-purple-600" /> Gemini AI Agricultural Knowledge
                      </span>
                    )}
                  </div>
                )}
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-100/70 p-3 rounded-2xl max-w-xs animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
              <span>Searching codebase knowledge & Gemini AI...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Controls */}
        <div className="p-3 bg-white border-t border-slate-200/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleVoiceListening}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-center ${
                isListening
                  ? 'bg-red-500 text-white border-red-600 shadow-md animate-bounce'
                  : 'bg-emerald-100/80 hover:bg-emerald-200 text-emerald-800 border-emerald-300'
              }`}
              title="Click to speak (Voice Recognition)"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={
                language === 'bn'
                  ? 'এখানে প্রশ্ন লিখুন বা মাইকে বলুন...'
                  : language === 'hi'
                  ? 'यहाँ प्रश्न लिखें या माइक दबाएं...'
                  : 'Type or click mic to ask AI Assistant...'
              }
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-medium"
            />

            <button
              type="submit"
              disabled={!inputQuery.trim() || loading}
              className="p-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white shadow-md transition-all cursor-pointer flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
