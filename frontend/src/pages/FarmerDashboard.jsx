import React, { useState, useEffect, useContext } from 'react';
import {
  Sprout,
  Bell,
  User,
  MapPin,
  Calendar,
  Clock,
  TrendingUp,
  CloudRain,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  CreditCard,
  Scale,
  Sparkles,
  Layers,
  AlertTriangle,
  Play,
  Home,
  MessageSquare,
  Camera,
  Globe,
  CheckCircle2,
  X,
  BookOpen,
  Calculator,
  Archive,
  FileText,
  Bot,
  Mic,
  Volume2
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import API from '../services/api';
import { farmerRulebookData } from '../data/farmerRulebookData';

// Farmer UX Blueprint Modals
import BrandIntroModal from '../components/farmer/BrandIntroModal';
import FarmManagementModal from '../components/farmer/FarmManagementModal';
import SlotBookingWizardModal from '../components/farmer/SlotBookingWizardModal';
import LiveQueueModal from '../components/farmer/LiveQueueModal';
import AiQualityModal from '../components/farmer/AiQualityModal';
import WeatherAdvisoryModal from '../components/farmer/WeatherAdvisoryModal';
import ComplaintsFeedbackModal from '../components/farmer/ComplaintsFeedbackModal';
import ProfileModal from '../components/farmer/ProfileModal';
import MarketTrendsModal from '../components/farmer/MarketTrendsModal';
import CentresMapModal from '../components/farmer/CentresMapModal';
import PaymentsModal from '../components/farmer/PaymentsModal';
import FarmerChatbotModal from '../components/farmer/FarmerChatbotModal';

// Rulebook & Blueprint Specific Components
import FarmerRulebookModal from '../components/farmer/FarmerRulebookModal';
import MspCalculatorModal from '../components/farmer/MspCalculatorModal';
import HistoricalArchiveModal from '../components/farmer/HistoricalArchiveModal';
import MySaleCard from '../components/farmer/MySaleCard';

export default function FarmerDashboard() {
  const { user } = useContext(AuthContext);
  const { language, setLanguage, t } = useContext(LanguageContext);

  // Local translations dictionary for Farmer Dashboard
  const farmerDict = {
    en: {
      farmerControlCentre: 'Farmer Control Centre',
      aiVoiceAssistant: 'AI Voice Assistant',
      notificationsAlerts: 'Notifications & Alerts',
      critical: 'Critical',
      important: 'Important',
      information: 'Information',
      notifTurnTitle: 'Immediate Turn Notification',
      notifTurnMsg: 'Token 58, your turn is approaching at ABC Procurement Centre.',
      notifWeatherTitle: 'Procurement Weather Warning',
      notifWeatherMsg: 'Rain expected near centre around your 10:00-11:00 AM window.',
      notifRulebookTitle: 'New Rulebook Release',
      notifRulebookMsg: 'KMS 2025-26 uniform specifications updated by DFPD.',
      yesterday: 'Yesterday',
      justNow: 'Just now',
      farmerLocation: 'Siliguri, Darjeeling (West Bengal)',
      verifiedProducer: 'Verified Producer',
      
      cropEmblemLogo: 'CROP EMBLEM LOGO',
      paddyRice: 'Paddy (Rice)',
      kharifPlots: 'Kharif 2026 • 2 Plots',
      qtlExpectedUnit: 'QTL Expected',
      
      mspWealthLogo: 'MSP WEALTH LOGO',
      currentCceaMsp: 'Current CCEA MSP:',
      gradeAMspGuaranteed: 'Grade A Guaranteed: ₹2,389 / Qtl',
      
      queueLogoEmblem: 'QUEUE LOGO EMBLEM',
      digitalTokenNum: 'Digital Token #58',
      abcCentreServing: 'ABC Centre • Currently Serving #42',
      
      riskLogoEmblem: 'RISK LOGO EMBLEM',
      rainWarningYard: '⚠️ Rain expected near procurement yard',
      
      interactiveLogoHubTitle: 'Interactive Logo Hub & Rulebook Tools',
      interactiveLogoHubSubtitle: 'Click any logo emblem to launch interactive tools & AI guidance',
      kmsCertified: 'KMS 2025-26 Certified',
      speechAndRag: 'Speech & RAG',
      faqNormsSpecs: 'FAQ Norms & Specs',
      simulateDockageCuts: 'Simulate Dockage Cuts',
      reserveYardCapacity: 'Reserve Yard Capacity',
      pastSalesReceipts: 'Past Sales & Receipts',
      centresMap: 'Centres Map',
      nearbyGovtYards: 'Nearby Government Yards',
      
      weatherFeedAdvice: 'OpenWeather Live Feed • Field Advice',
      fileDisputeTrackStatus: 'File dispute • Track grievance status'
    },
    bn: {
      farmerControlCentre: 'কৃষক নিয়ন্ত্রণ কেন্দ্র',
      aiVoiceAssistant: 'এআই ভয়েস সহায়তা',
      notificationsAlerts: 'বিজ্ঞপ্তি ও সতর্কতা',
      critical: 'জরুরি',
      important: 'গুরুত্বপূর্ণ',
      information: 'তথ্যকথা',
      notifTurnTitle: 'অবিলম্বে পালার বিজ্ঞপ্তি',
      notifTurnMsg: 'টোকেন ৫৮, এবিসি সংগ্রহ কেন্দ্রে আপনার সময় আসন্ন।',
      notifWeatherTitle: 'সংগ্রহ কেন্দ্র আবহাওয়া সতর্কবার্তা',
      notifWeatherMsg: 'আপনার ১০:০০-১১:০০ সময়সীমার মধ্যে কেন্দ্রের নিকটে বৃষ্টির সম্ভাবনা।',
      notifRulebookTitle: 'নতুন রুলবুক প্রকাশ',
      notifRulebookMsg: 'ডিএফপিডি দ্বারা কেএমএস ২০২৫-২৬ অভিন্ন মানদণ্ড আপডেট করা হয়েছে।',
      yesterday: 'গতকাল',
      justNow: 'এইমাত্র',
      farmerLocation: 'শিলিগুড়ি, দার্জিলিং (পশ্চিমবঙ্গ)',
      verifiedProducer: 'যাচাইকৃত ধান উৎপাদক',
      
      cropEmblemLogo: 'ফসল এমব্লেম লোগো',
      paddyRice: 'ধান (Paddy)',
      kharifPlots: 'খরিফ ২০২৬ • ২ টি জমি',
      qtlExpectedUnit: 'কুইন্টাল প্রত্যাশিত',
      
      mspWealthLogo: 'এমএসপি লোগো',
      currentCceaMsp: 'বর্তমান সিসিইএ এমএসপি:',
      gradeAMspGuaranteed: 'গ্রেড এ গ্যারান্টিযুক্ত: ₹২,৩৮৯ / কুইন্টাল',
      
      queueLogoEmblem: 'লাইভ কিউ লোগো',
      digitalTokenNum: 'ডিজিটাল টোকেন #৫৮',
      abcCentreServing: 'এবিসি কেন্দ্র • বর্তমানে পরিবেশন #৪২',
      
      riskLogoEmblem: 'ঝুঁকি সতর্কবার্তা লোগো',
      rainWarningYard: '⚠️ সংগ্রহ কেন্দ্রের কাছে বৃষ্টির সম্ভাবনা',
      
      interactiveLogoHubTitle: 'ইন্টারেক্টিভ লোগো হাব ও রুলবুক টুলস',
      interactiveLogoHubSubtitle: 'ইন্টারেক্টিভ সরঞ্জাম ও এআই সহায়তা চালু করতে যেকোনো লোগোতে ক্লিক করুন',
      kmsCertified: 'কেএমএস ২০২৫-২৬ সার্টিফাইড',
      speechAndRag: 'ভয়েস স্পিচ ও আরএজি',
      faqNormsSpecs: 'এফএকিউ মানদণ্ড ও বিবরণী',
      simulateDockageCuts: 'কাটছাঁট সিমুলেট করুন',
      reserveYardCapacity: 'কেন্দ্রের ক্ষমতা বুক করুন',
      pastSalesReceipts: 'পূর্ববর্তী বিক্রয় ও রসিদ',
      centresMap: 'সংগ্রহ কেন্দ্র মানচিত্র',
      nearbyGovtYards: 'নিকটবর্তী সরকারি কেন্দ্র',
      
      weatherFeedAdvice: 'লাইভ আবহাওয়া বার্তা • ক্ষেতের পরামর্শ',
      fileDisputeTrackStatus: 'অভিযোগ দায়ের • ট্র্যাকিং অবস্থা'
    },
    hi: {
      farmerControlCentre: 'किसान नियंत्रण केंद्र',
      aiVoiceAssistant: 'एआई वॉइस असिस्टेंट',
      notificationsAlerts: 'सूचनाएं एवं अलर्ट',
      critical: 'गंभीर',
      important: 'महत्वपूर्ण',
      information: 'जानकारी',
      notifTurnTitle: 'तत्काल बारी की सूचना',
      notifTurnMsg: 'टोकन 58, एबीसी खरीद केंद्र पर आपकी बारी निकट आ रही है।',
      notifWeatherTitle: 'खरीद केंद्र मौसम चेतावनी',
      notifWeatherMsg: 'आपके 10:00-11:00 बजे के स्लॉट के आसपास केंद्र के निकट बारिश की संभावना।',
      notifRulebookTitle: 'नई नियम पुस्तिका जारी',
      notifRulebookMsg: 'डीएफपीडी द्वारा केएमएस 2025-26 के समान विनिर्देशों को अपडेट किया गया।',
      yesterday: 'कल',
      justNow: 'अभी-अभी',
      farmerLocation: 'सिलीगुड़ी, दार्जिलिंग (पश्चिम बंगाल)',
      verifiedProducer: 'सत्यापित उत्पादक',
      
      cropEmblemLogo: 'फसल प्रतीक लोगो',
      paddyRice: 'धान (Paddy)',
      kharifPlots: 'खरीफ 2026 • 2 भूखंड',
      qtlExpectedUnit: 'क्विंटल अपेक्षित',
      
      mspWealthLogo: 'एमएसपी संपत्ति लोगो',
      currentCceaMsp: 'वर्तमान सीसीईए एमएसपी:',
      gradeAMspGuaranteed: 'ग्रेड ए गारंटीकृत: ₹2,389 / क्विंटल',
      
      queueLogoEmblem: 'कतार प्रतीक लोगो',
      digitalTokenNum: 'डिजिटल टोकन #58',
      abcCentreServing: 'एबीसी केंद्र • वर्तमान में सेवारत #42',
      
      riskLogoEmblem: 'जोखिम चेतावनी लोगो',
      rainWarningYard: '⚠️ खरीद यार्ड के पास बारिश की संभावना',
      
      interactiveLogoHubTitle: 'इंटरएक्टिव लोगो हब और नियम पुस्तिका टूल',
      interactiveLogoHubSubtitle: 'इंटरएक्टिव टूल और एआई मार्गदर्शन शुरू करने के लिए किसी भी लोगो पर क्लिक करें',
      kmsCertified: 'केएमएस 2025-26 प्रमाणित',
      speechAndRag: 'वॉइस स्पीच एवं आरएजी',
      faqNormsSpecs: 'एफएक्यू मानदंड व नियम',
      simulateDockageCuts: 'कटौती सिमुलेशन',
      reserveYardCapacity: 'यार्ड क्षमता आरक्षित करें',
      pastSalesReceipts: 'पिछली बिक्री व रसीदें',
      centresMap: 'खरीद केंद्र मानचित्र',
      nearbyGovtYards: 'निकटतम सरकारी खरीद केंद्र',
      
      weatherFeedAdvice: 'लाइव मौसम अपडेट • कृषि सलाह',
      fileDisputeTrackStatus: 'शिकायत दर्ज करें • स्थिति ट्रैक करें'
    }
  };

  const ft = (key) => farmerDict[language]?.[key] || farmerDict.en[key] || key;

  // Active Bottom Navigation Tab: 'home' | 'farm' | 'book' | 'queue' | 'money'
  const [activeNav, setActiveNav] = useState('home');

  // Modal display states
  const [showBrandIntro, setShowBrandIntro] = useState(false);
  const [showFarmModal, setShowFarmModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showQueueModal, setShowQueueModal] = useState(false);
  const [showQualityModal, setShowQualityModal] = useState(false);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [showComplaintsModal, setShowComplaintsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMarketModal, setShowMarketModal] = useState(false);
  const [showCentresModal, setShowCentresModal] = useState(false);
  const [showPaymentsModal, setShowPaymentsModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Blueprint & Rulebook Modals
  const [showRulebookModal, setShowRulebookModal] = useState(false);
  const [rulebookInitialTab, setRulebookInitialTab] = useState('overview');
  const [showMspCalculatorModal, setShowMspCalculatorModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showChatbotModal, setShowChatbotModal] = useState(false);

  // Pre-selected parameters for booking wizard
  const [bookingPrefill, setBookingPrefill] = useState({
    cropType: 'Paddy',
    quantity: 50
  });

  // Farm Fields state
  const [fields, setFields] = useState([
    {
      id: 1,
      fieldName: 'West Plot (Paddy)',
      cropType: 'Paddy',
      area: 2.0,
      expectedYield: 50, // 50 Quintals
      plantingDate: '01 July',
      expectedHarvest: '20 October',
      status: 'Ready for Harvest'
    },
    {
      id: 2,
      fieldName: 'North Plot (Wheat)',
      cropType: 'Wheat',
      area: 1.5,
      expectedYield: 40,
      plantingDate: '15 November',
      expectedHarvest: '10 April',
      status: 'Growing'
    }
  ]);

  // Notifications list with Blueprint priority levels
  const [notificationsList, setNotificationsList] = useState([
    {
      id: 1,
      priorityKey: 'critical',
      priority: 'Critical',
      titleKey: 'notifTurnTitle',
      title: 'Immediate Turn Notification',
      messageKey: 'notifTurnMsg',
      message: 'Token 58, your turn is approaching at ABC Procurement Centre.',
      timeKey: 'justNow',
      time: '10:42 AM',
      unread: true
    },
    {
      id: 2,
      priorityKey: 'important',
      priority: 'Important',
      titleKey: 'notifWeatherTitle',
      title: 'Procurement Weather Warning',
      messageKey: 'notifWeatherMsg',
      message: 'Rain expected near centre around your 10:00-11:00 AM window.',
      timeKey: 'justNow',
      time: '09:30 AM',
      unread: true
    },
    {
      id: 3,
      priorityKey: 'information',
      priority: 'Information',
      titleKey: 'notifRulebookTitle',
      title: 'New Rulebook Release',
      messageKey: 'notifRulebookMsg',
      message: 'KMS 2025-26 uniform specifications updated by DFPD.',
      timeKey: 'yesterday',
      time: 'Yesterday',
      unread: false
    }
  ]);

  // Hydrate with registered profile if available
  useEffect(() => {
    API.get('/farmer/profile')
      .then((res) => {
        if (res.data?.farmerProfile) {
          const fp = res.data.farmerProfile;
          if (fp.savedCrops && fp.savedCrops.length > 0) {
            const mapped = fp.savedCrops.map((c, i) => ({
              id: c._id || i + 1,
              fieldName: c.variety ? `${c.cropType} (${c.variety})` : `${c.cropType} Plot`,
              cropType: c.cropType,
              area: fp.totalFarmArea ? Number((fp.totalFarmArea / fp.savedCrops.length).toFixed(1)) : 1.0,
              expectedYield: c.expectedQuantity || 50,
              plantingDate: '01 July',
              expectedHarvest: '20 October',
              status: 'Ready for Harvest'
            }));
            setFields(mapped);
          }
        }
      })
      .catch(() => {
        // Fallback to defaults
      });
  }, []);

  // Calculate totals
  const totalArea = fields.reduce((acc, f) => acc + (parseFloat(f.area) || 0), 0).toFixed(1);
  const totalCropsCount = fields.length;

  // Dynamic farmer display data
  const farmerName = user?.name ? user.name.split(' ')[0] : 'Ramesh';
  const farmerFullName = user?.name || 'Ramesh Das';
  const farmerId = user?.farmerProfile?.farmerId || user?.farmerId || 'FMR-WB-2026-098';

  const openRulebookToSection = (sectionId = 'overview') => {
    setRulebookInitialTab(sectionId);
    setShowRulebookModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/70 via-slate-50 to-teal-50/50 text-slate-800 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900 pb-28 sm:pb-24 relative overflow-x-hidden">
      {/* Soft Ambient Background Glow Spheres */}
      <div className="fixed -top-40 -left-40 w-96 h-96 rounded-full bg-emerald-200/35 blur-3xl pointer-events-none" />
      <div className="fixed top-1/3 -right-40 w-96 h-96 rounded-full bg-teal-200/30 blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. TOP HEADER BAR                                                         */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/90 px-4 py-3 sm:px-6 shadow-xs transition-all">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 border-2 border-amber-400 p-0.5 shadow-md shadow-emerald-900/30 flex items-center justify-center overflow-hidden">
              <img src="/agriprocure-logo.png" alt="AgriSetu Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 flex items-center gap-1.5">
                Agri<span className="text-emerald-600">Setu</span>
              </h1>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                <img src="/farmer-avatar.png" className="w-3.5 h-3.5 rounded-full inline-block" alt="" />
                {ft('farmerControlCentre')}
              </span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Assistant Quick Pill */}
            <button
              onClick={() => setShowChatbotModal(true)}
              className="px-3 py-1.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 ring-2 ring-emerald-400/40"
            >
              <Bot className="w-4 h-4 text-emerald-200" />
              <span className="hidden sm:inline">{ft('aiVoiceAssistant')}</span>
              <Mic className="w-3.5 h-3.5 text-amber-300 animate-pulse ml-0.5" />
            </button>

            {/* Rulebook Quick Access Pill */}
            <button
              onClick={() => openRulebookToSection('overview')}
              className="px-3 py-1.5 rounded-2xl bg-emerald-100/90 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline">{t('farmerRulebook')}</span>
            </button>

            {/* Language Selector */}
            <div className="flex items-center bg-white/80 backdrop-blur-md p-1 rounded-2xl border border-slate-200 text-xs shadow-xs">
              {['en', 'bn', 'hi'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                    language === l ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 rounded-2xl bg-white/80 hover:bg-white border border-slate-200 text-slate-700 transition-all cursor-pointer relative shadow-xs"
              >
                <Bell className="w-4 h-4 text-slate-700" />
                {notificationsList.some((n) => n.unread) && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                )}
                {notificationsList.some((n) => n.unread) && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full" />
                )}
              </button>

              {/* Notification Drawer */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-2xl border border-white/90 rounded-3xl p-4 shadow-2xl z-50 space-y-3 ring-1 ring-black/5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                      {ft('notificationsAlerts')}
                    </span>
                    <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-700">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {notificationsList.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3 rounded-2xl border text-xs space-y-0.5 shadow-xs ${
                          (n.priorityKey === 'critical' || n.priority === 'Critical')
                            ? 'bg-red-50/90 border-red-200 text-red-950'
                            : (n.priorityKey === 'important' || n.priority === 'Important')
                            ? 'bg-amber-50/90 border-amber-200 text-amber-950'
                            : 'bg-slate-50/90 border-slate-100 text-slate-800'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-extrabold">{n.titleKey ? ft(n.titleKey) : n.title}</span>
                          <span className="text-[10px] opacity-70 font-mono">{n.timeKey ? ft(n.timeKey) : n.time}</span>
                        </div>
                        <p className="text-[11px] opacity-90">{n.messageKey ? ft(n.messageKey) : n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Button */}
            <button
              onClick={() => setShowProfileModal(true)}
              className="p-2 px-3 rounded-2xl bg-emerald-100/80 hover:bg-emerald-200 border border-emerald-300 text-emerald-900 font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <User className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline">{farmerName}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN HUB CONTENT CONTAINER                                             */}
      {/* ========================================================================= */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 sm:pt-7 space-y-5 relative z-10">
        
        {/* Welcome & Farmer ID Header */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 ring-1 ring-emerald-500/10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>{t('goodMorning')}, {farmerName}</span>
              <span className="animate-wiggle">👋</span>
            </h2>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1.5 text-xs font-semibold">
              <span className="font-mono font-bold text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-xl border border-emerald-200 shadow-xs">
                {t('farmerId')}: {farmerId}
              </span>
              <span className="text-slate-600 flex items-center gap-1 bg-white/60 px-2.5 py-1 rounded-xl border border-white/80">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{ft('farmerLocation')}</span>
              </span>
              <span className="text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50/80 px-2.5 py-1 rounded-xl border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {ft('verifiedProducer')}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SINGLE SOURCE OF TRUTH: "MY SALE" CARD (Blueprint Section 52)             */}
        {/* ========================================================================= */}
        <MySaleCard
          saleData={{
            crop: 'Paddy (Grade A)',
            season: 'Kharif 2026',
            tokenNumber: '58',
            centreName: 'ABC Procurement Centre (Siliguri)',
            quantityQtl: 50,
            mspRate: 2389,
            expectedGrossValue: 119450,
            steps: {
              booking: true,
              arrival: true,
              queue: true,
              grading: true,
              weighment: false,
              payment: false
            }
          }}
          onViewDetails={() => setShowQueueModal(true)}
          onOpenRulebook={() => openRulebookToSection('msp')}
        />

        {/* ========================================================================= */}
        {/* THE 4 PRIORITIZED INTERACTIVE LOGO EMBLEMS                                 */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Logo Emblem 1 — Crop */}
          <div
            onClick={() => setShowFarmModal(true)}
            className="p-5 rounded-3xl bg-gradient-to-br from-white via-white to-emerald-50/60 backdrop-blur-xl border border-white/90 hover:border-emerald-400 shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer space-y-3 ring-2 ring-emerald-500/10 hover:ring-4 hover:ring-emerald-400/30 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-400/10 rounded-full blur-xl pointer-events-none group-hover:bg-emerald-400/25 transition-all" />
            <div className="flex items-center justify-between border-b border-emerald-100/60 pb-2">
              <span className="font-extrabold text-[11px] text-emerald-900 uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> {ft('cropEmblemLogo')}
              </span>
              <div className="w-9 h-9 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-xl shadow-xs group-hover:scale-110 transition-transform">
                🌾
              </div>
            </div>
            <div>
              <span className="text-xl font-black text-slate-900 block group-hover:text-emerald-800 transition-colors">{ft('paddyRice')}</span>
              <span className="text-xs text-emerald-700 font-bold block">{ft('kharifPlots')}</span>
              <div className="mt-2 text-2xl font-black font-mono text-emerald-800 flex items-baseline gap-1">
                50 <span className="text-xs font-semibold text-slate-500">{ft('qtlExpectedUnit')}</span>
              </div>
            </div>
          </div>

          {/* Logo Emblem 2 — Money / MSP */}
          <div
            onClick={() => openRulebookToSection('msp')}
            className="p-5 rounded-3xl bg-gradient-to-br from-white via-white to-amber-50/60 backdrop-blur-xl border border-white/90 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer space-y-3 ring-2 ring-amber-500/10 hover:ring-4 hover:ring-amber-400/30 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-amber-400/10 rounded-full blur-xl pointer-events-none group-hover:bg-amber-400/25 transition-all" />
            <div className="flex items-center justify-between border-b border-amber-100/60 pb-2">
              <span className="font-extrabold text-[11px] text-amber-900 uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" /> {ft('mspWealthLogo')}
              </span>
              <div className="w-9 h-9 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-xl shadow-xs group-hover:scale-110 transition-transform">
                💰
              </div>
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold block">{ft('currentCceaMsp')}</span>
              <div className="text-xl font-black font-mono text-emerald-700">
                ₹2,369 <span className="text-xs font-normal text-slate-500">/ Qtl</span>
              </div>
              <span className="text-[11px] text-amber-800 font-bold block mt-1">
                {ft('gradeAMspGuaranteed')}
              </span>
            </div>
          </div>

          {/* Logo Emblem 3 — Live Queue */}
          <div
            onClick={() => setShowQueueModal(true)}
            className="p-5 rounded-3xl bg-gradient-to-br from-white via-white to-teal-50/60 backdrop-blur-xl border border-white/90 hover:border-teal-400 shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer space-y-3 ring-2 ring-teal-500/10 hover:ring-4 hover:ring-teal-400/30 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-teal-400/10 rounded-full blur-xl pointer-events-none group-hover:bg-teal-400/25 transition-all" />
            <div className="flex items-center justify-between border-b border-teal-100/60 pb-2">
              <span className="font-extrabold text-[11px] text-teal-900 uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" /> {ft('queueLogoEmblem')}
              </span>
              <div className="w-9 h-9 rounded-2xl bg-teal-100 border border-teal-200 flex items-center justify-center text-xl shadow-xs group-hover:scale-110 transition-transform">
                🚜
              </div>
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold block">{ft('digitalTokenNum')}</span>
              <div className="text-lg font-black font-mono text-slate-900 mt-0.5">
                10:00–11:00 AM
              </div>
              <span className="text-[11px] text-teal-800 font-bold block mt-1">
                {ft('abcCentreServing')}
              </span>
            </div>
          </div>

          {/* Logo Emblem 4 — Risk / Weather */}
          <div
            onClick={() => setShowWeatherModal(true)}
            className="p-5 rounded-3xl bg-gradient-to-br from-white via-white to-blue-50/60 backdrop-blur-xl border border-white/90 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer space-y-3 ring-2 ring-blue-500/10 hover:ring-4 hover:ring-blue-400/30 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400/10 rounded-full blur-xl pointer-events-none group-hover:bg-blue-400/25 transition-all" />
            <div className="flex items-center justify-between border-b border-blue-100/60 pb-2">
              <span className="font-extrabold text-[11px] text-blue-900 uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" /> {ft('riskLogoEmblem')}
              </span>
              <div className="w-9 h-9 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center text-xl shadow-xs group-hover:scale-110 transition-transform">
                🌦️
              </div>
            </div>
            <div>
              <div className="text-lg font-black font-mono text-slate-900">
                29°C <span className="text-xs font-bold text-blue-600">• Rain 40%</span>
              </div>
              <span className="text-[11px] text-amber-800 font-bold block mt-1 line-clamp-1">
                {ft('rainWarningYard')}
              </span>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE ENGAGING LOGO HUB GRID (Blueprint Section 47 & AI Tools)       */}
        {/* ========================================================================= */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-sm space-y-5 ring-1 ring-emerald-500/10">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black shadow-xs">
                ✨
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 uppercase tracking-wider">
                  {ft('interactiveLogoHubTitle')}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">{ft('interactiveLogoHubSubtitle')}</p>
              </div>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-mono text-emerald-800 font-bold bg-emerald-100/80 px-2.5 py-1 rounded-xl border border-emerald-200">
              {ft('kmsCertified')}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* Logo 1: Farmer AI Assistant & Voice */}
            <button
              type="button"
              onClick={() => setShowChatbotModal(true)}
              className="p-4 rounded-3xl bg-gradient-to-b from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white border border-emerald-500 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2.5 group shadow-lg shadow-emerald-600/25 ring-4 ring-emerald-400/30 transform hover:-translate-y-1 hover:scale-105 active:scale-95 relative overflow-hidden"
            >
              <div className="w-13 h-13 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white text-2xl shadow-inner group-hover:rotate-12 transition-transform">
                🤖
              </div>
              <div className="text-center">
                <span className="font-black text-xs sm:text-sm text-white block leading-tight">
                  {ft('aiVoiceAssistant')}
                </span>
                <span className="text-[10px] text-amber-200 font-bold flex items-center justify-center gap-1 mt-0.5">
                  <Mic className="w-3 h-3 text-amber-300 animate-pulse" /> {ft('speechAndRag')}
                </span>
              </div>
            </button>

            {/* Logo 2: Farmer Rulebook */}
            <button
              type="button"
              onClick={() => openRulebookToSection('overview')}
              className="p-4 rounded-3xl bg-white hover:bg-emerald-50/70 border border-slate-200/80 hover:border-emerald-400 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2.5 group shadow-xs hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 active:scale-95 ring-2 ring-emerald-500/10"
            >
              <div className="w-13 h-13 rounded-2xl bg-emerald-100/80 border border-emerald-200 flex items-center justify-center text-2xl shadow-xs group-hover:scale-110 transition-transform">
                📖
              </div>
              <div className="text-center">
                <span className="font-black text-xs sm:text-sm text-slate-900 block leading-tight">
                  {t('farmerRulebook')}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                  {ft('faqNormsSpecs')}
                </span>
              </div>
            </button>

            {/* Logo 3: MSP Calculator */}
            <button
              type="button"
              onClick={() => setShowMspCalculatorModal(true)}
              className="p-4 rounded-3xl bg-white hover:bg-amber-50/70 border border-slate-200/80 hover:border-amber-400 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2.5 group shadow-xs hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 active:scale-95 ring-2 ring-amber-500/10"
            >
              <div className="w-13 h-13 rounded-2xl bg-amber-100/80 border border-amber-200 flex items-center justify-center text-2xl shadow-xs group-hover:scale-110 transition-transform">
                🧮
              </div>
              <div className="text-center">
                <span className="font-black text-xs sm:text-sm text-slate-900 block leading-tight">
                  {t('mspCalculator')}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                  {ft('simulateDockageCuts')}
                </span>
              </div>
            </button>

            {/* Logo 4: Book Slot */}
            <button
              type="button"
              onClick={() => {
                setBookingPrefill({ cropType: 'Paddy', quantity: 50 });
                setShowBookingModal(true);
              }}
              className="p-4 rounded-3xl bg-white hover:bg-emerald-50/70 border border-slate-200/80 hover:border-emerald-400 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2.5 group shadow-xs hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 active:scale-95 ring-2 ring-emerald-500/10"
            >
              <div className="w-13 h-13 rounded-2xl bg-emerald-100/80 border border-emerald-200 flex items-center justify-center text-2xl shadow-xs group-hover:scale-110 transition-transform">
                📅
              </div>
              <div className="text-center">
                <span className="font-black text-xs sm:text-sm text-slate-900 block leading-tight">
                  {t('bookSlot')}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                  {ft('reserveYardCapacity')}
                </span>
              </div>
            </button>

            {/* Logo 5: Historical Archive */}
            <button
              type="button"
              onClick={() => setShowArchiveModal(true)}
              className="p-4 rounded-3xl bg-white hover:bg-purple-50/70 border border-slate-200/80 hover:border-purple-400 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2.5 group shadow-xs hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 active:scale-95 ring-2 ring-purple-500/10"
            >
              <div className="w-13 h-13 rounded-2xl bg-purple-100/80 border border-purple-200 flex items-center justify-center text-2xl shadow-xs group-hover:scale-110 transition-transform">
                📜
              </div>
              <div className="text-center">
                <span className="font-black text-xs sm:text-sm text-slate-900 block leading-tight">
                  {t('historicalArchive')}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                  {ft('pastSalesReceipts')}
                </span>
              </div>
            </button>

            {/* Logo 6: Procurement Centres Map */}
            <button
              type="button"
              onClick={() => setShowCentresModal(true)}
              className="p-4 rounded-3xl bg-white hover:bg-teal-50/70 border border-slate-200/80 hover:border-teal-400 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2.5 group shadow-xs hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 active:scale-95 ring-2 ring-teal-500/10"
            >
              <div className="w-13 h-13 rounded-2xl bg-teal-100/80 border border-teal-200 flex items-center justify-center text-2xl shadow-xs group-hover:scale-110 transition-transform">
                🗺️
              </div>
              <div className="text-center">
                <span className="font-black text-xs sm:text-sm text-slate-900 block leading-tight">
                  {ft('centresMap')}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                  {ft('nearbyGovtYards')}
                </span>
              </div>
            </button>

          </div>
        </div>

        {/* Auxiliary Interactive Logo Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Weather Advisory Logo Card */}
          <div
            onClick={() => setShowWeatherModal(true)}
            className="p-5 rounded-3xl bg-white hover:bg-emerald-50/60 border border-slate-200/80 hover:border-emerald-300 transition-all cursor-pointer flex items-center justify-between shadow-xs hover:shadow-md group transform hover:scale-[1.02] active:scale-95"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 border border-emerald-200 flex items-center justify-center text-2xl shadow-xs group-hover:scale-110 transition-transform">
                🌦️
              </div>
              <div>
                <h4 className="font-black text-sm text-slate-900">
                  {t('weatherAdvisory')}
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  {ft('weatherFeedAdvice')}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* Complaints & Grievances Logo Card */}
          <div
            onClick={() => setShowComplaintsModal(true)}
            className="p-5 rounded-3xl bg-white hover:bg-red-50/60 border border-slate-200/80 hover:border-red-300 transition-all cursor-pointer flex items-center justify-between shadow-xs hover:shadow-md group transform hover:scale-[1.02] active:scale-95"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-red-100/80 border border-red-200 flex items-center justify-center text-2xl shadow-xs group-hover:scale-110 transition-transform">
                🚨
              </div>
              <div>
                <h4 className="font-black text-sm text-slate-900">
                  {t('complaintsFeedback')}
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  {ft('fileDisputeTrackStatus')}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </main>

      {/* ========================================================================= */}
      {/* 3. STICKY BOTTOM TOUCH NAVIGATION                                         */}
      {/* ========================================================================= */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/85 backdrop-blur-xl border-t border-white/90 py-2.5 px-3 shadow-lg">
        <div className="max-w-md mx-auto grid grid-cols-5 gap-1.5 text-center">
          {/* 1. Home */}
          <button
            onClick={() => {
              setActiveNav('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`py-1.5 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              activeNav === 'home'
                ? 'text-emerald-700 font-black bg-emerald-100/90 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-[10px] sm:text-xs font-bold">{t('home')}</span>
          </button>

          {/* 2. Farm */}
          <button
            onClick={() => {
              setActiveNav('farm');
              setShowFarmModal(true);
            }}
            className={`py-1.5 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              activeNav === 'farm'
                ? 'text-emerald-700 font-black bg-emerald-100/90 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span className="text-[10px] sm:text-xs font-bold">{t('farm')}</span>
          </button>

          {/* 3. Book */}
          <button
            onClick={() => {
              setActiveNav('book');
              setShowBookingModal(true);
            }}
            className={`py-1.5 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              activeNav === 'book'
                ? 'text-emerald-700 font-black bg-emerald-100/90 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span className="text-[10px] sm:text-xs font-bold">{t('book')}</span>
          </button>

          {/* 4. Queue */}
          <button
            onClick={() => {
              setActiveNav('queue');
              setShowQueueModal(true);
            }}
            className={`py-1.5 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              activeNav === 'queue'
                ? 'text-emerald-700 font-black bg-emerald-100/90 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span className="text-[10px] sm:text-xs font-bold">{t('queue')}</span>
          </button>

          {/* 5. Money */}
          <button
            onClick={() => {
              setActiveNav('money');
              setShowPaymentsModal(true);
            }}
            className={`py-1.5 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              activeNav === 'money'
                ? 'text-emerald-700 font-black bg-emerald-100/90 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span className="text-[10px] sm:text-xs font-bold">{t('money')}</span>
          </button>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 4. MODALS                                                                 */}
      {/* ========================================================================= */}

      {/* Rulebook Modal */}
      <FarmerRulebookModal
        isOpen={showRulebookModal}
        onClose={() => setShowRulebookModal(false)}
        initialSection={rulebookInitialTab}
        onOpenComplaint={() => setShowComplaintsModal(true)}
      />

      {/* MSP Calculator Modal */}
      <MspCalculatorModal
        isOpen={showMspCalculatorModal}
        onClose={() => setShowMspCalculatorModal(false)}
      />

      {/* Historical Archive Modal */}
      <HistoricalArchiveModal
        isOpen={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
      />

      {/* Brand Intro Modal */}
      <BrandIntroModal
        isOpen={showBrandIntro}
        onClose={() => setShowBrandIntro(false)}
      />

      {/* Farm Management Modal */}
      <FarmManagementModal
        isOpen={showFarmModal}
        onClose={() => {
          setShowFarmModal(false);
          setActiveNav('home');
        }}
        fields={fields}
        onAddField={(newField) => setFields((prev) => [newField, ...prev])}
        onSelectCropForBooking={({ cropType, quantity }) => {
          setBookingPrefill({ cropType, quantity });
          setShowBookingModal(true);
        }}
      />

      {/* 5-Step Slot Booking Wizard Modal */}
      <SlotBookingWizardModal
        isOpen={showBookingModal}
        onClose={() => {
          setShowBookingModal(false);
          setActiveNav('home');
        }}
        initialCrop={bookingPrefill.cropType}
        initialQuantity={bookingPrefill.quantity}
        onBookingComplete={(booking) => {
          setNotificationsList((prev) => [
            {
              id: Date.now(),
              priority: 'Important',
              title: 'Slot Booked',
              message: `Token #${booking.tokenNumber} reserved at ${booking.centre}.`,
              time: 'Just now',
              unread: true
            },
            ...prev
          ]);
        }}
        onViewLiveQueue={() => {
          setShowBookingModal(false);
          setShowQueueModal(true);
          setActiveNav('queue');
        }}
      />

      {/* Live Queue Modal */}
      <LiveQueueModal
        isOpen={showQueueModal}
        onClose={() => {
          setShowQueueModal(false);
          setActiveNav('home');
        }}
      />

      {/* AI Crop Quality Check Modal */}
      <AiQualityModal
        isOpen={showQualityModal}
        onClose={() => setShowQualityModal(false)}
      />

      {/* Weather Advisory Modal */}
      <WeatherAdvisoryModal
        isOpen={showWeatherModal}
        onClose={() => setShowWeatherModal(false)}
      />

      {/* Complaints & Feedback Modal */}
      <ComplaintsFeedbackModal
        isOpen={showComplaintsModal}
        onClose={() => setShowComplaintsModal(false)}
      />

      {/* Profile & Settings Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        farmerData={{
          name: farmerFullName,
          farmerId: farmerId,
          district: user?.farmerProfile?.district || 'Darjeeling',
          state: user?.farmerProfile?.state || 'West Bengal',
          phone: user?.phone || '9876543210'
        }}
      />

      {/* Real-time Market Trends Modal */}
      <MarketTrendsModal
        isOpen={showMarketModal}
        onClose={() => setShowMarketModal(false)}
      />

      {/* Nearby Centres Map Modal */}
      <CentresMapModal
        isOpen={showCentresModal}
        onClose={() => setShowCentresModal(false)}
        onSelectCentreForBooking={() => {
          setShowCentresModal(false);
          setShowBookingModal(true);
          setActiveNav('book');
        }}
      />

      {/* Payments Modal */}
      <PaymentsModal
        isOpen={showPaymentsModal}
        onClose={() => {
          setShowPaymentsModal(false);
          setActiveNav('home');
        }}
      />

      {/* Farmer Rulebook Modal */}
      <FarmerRulebookModal
        isOpen={showRulebookModal}
        onClose={() => setShowRulebookModal(false)}
        initialSection={rulebookInitialTab}
        onOpenComplaint={() => {
          setShowRulebookModal(false);
          setShowComplaintsModal(true);
        }}
      />

      {/* MSP & Value Cut Calculator Modal */}
      <MspCalculatorModal
        isOpen={showMspCalculatorModal}
        onClose={() => setShowMspCalculatorModal(false)}
      />

      {/* Historical Sales Archive Modal */}
      <HistoricalArchiveModal
        isOpen={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
      />

      {/* Farmer AI Chatbot Assistant Modal */}
      <FarmerChatbotModal
        isOpen={showChatbotModal}
        onClose={() => setShowChatbotModal(false)}
      />
    </div>
  );
}