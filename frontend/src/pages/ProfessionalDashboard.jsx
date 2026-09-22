import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { farmerRulebookData } from '../data/farmerRulebookData';
import {
  LayoutDashboard,
  Calendar,
  Users,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Sparkles,
  Camera,
  ShoppingBag,
  CreditCard,
  Star,
  FileText,
  Clock,
  ShieldCheck,
  Check,
  X,
  RefreshCw,
  Phone,
  Settings,
  ArrowRight,
  Eye,
  Building,
  ChevronRight,
  AlertCircle,
  Printer,
  Download,
  Layers,
  Search,
  ExternalLink,
  MessageSquare,
  LogOut,
  Bell,
  Cpu,
  Globe,
  UserCheck
} from 'lucide-react';

// =========================================================================
// COMPLETE MULTI-LANGUAGE TRANSLATION DICTIONARY FOR AGENT DASHBOARD
// =========================================================================
const agentDict = {
  // Header Bar
  portalTitle: {
    en: 'FCI / GOV PROCUREMENT PORTAL',
    bn: 'এফসিআই / সরকারি সংগ্রহ পোর্টাল',
    hi: 'एफसीआई / सरकारी खरीद पोर्टल'
  },
  portalSub: {
    en: 'Official Agent Terminal • ',
    bn: 'অফিসিয়াল এজেন্ট টার্মিনাল • ',
    hi: 'आधिकारिक एजेंट टर्मिनल • '
  },
  agentIdBadge: {
    en: 'Agent ID: ',
    bn: 'এজেন্ট আইডি: ',
    hi: 'एजेंट आईडी: '
  },
  logout: {
    en: 'Logout',
    bn: 'লগ আউট',
    hi: 'लॉग आउट'
  },

  // Sidebar Menu & Groups
  agentDashboard: {
    en: 'Agent Dashboard',
    bn: 'এজেন্ট ড্যাশবোর্ড',
    hi: 'एजेंट डैशबोर्ड'
  },
  catTodaysWork: {
    en: "📋 TODAY'S WORK",
    bn: '📋 আজকের কাজ',
    hi: '📋 आज का कार्य'
  },
  todaysSchedule: {
    en: "Today's Schedule",
    bn: 'আজকের সময়সূচী',
    hi: 'आज की समय सारणी'
  },
  pendingTasks: {
    en: 'Pending Tasks',
    bn: 'অপেক্ষারত কাজসমূহ',
    hi: 'लंबित कार्य'
  },
  catWorkflow: {
    en: '🌾 PROCUREMENT WORKFLOW',
    bn: '🌾 সংগ্রহ প্রক্রিয়া (ওয়ার্কফ্লো)',
    hi: '🌾 खरीद प्रक्रिया (वर्कफ़्लो)'
  },
  step1Verify: {
    en: '1. Verify Farmer (QR)',
    bn: '১. কৃষক যাচাইকরণ (QR)',
    hi: '1. किसान सत्यापन (QR)'
  },
  step2Crop: {
    en: '2. Crop Verification',
    bn: '২. ফসল যাচাইকরণ',
    hi: '2. फसल सत्यापन'
  },
  step3Quality: {
    en: '3. Quality Testing',
    bn: '৩. গুণমান পরীক্ষা',
    hi: '3. गुणवत्ता परीक्षण'
  },
  step4Weighment: {
    en: '4. Digital Weighment',
    bn: '৪. ডিজিটাল ওজন নির্ধারণ',
    hi: '4. डिजिटल तौल'
  },
  step5Decision: {
    en: '5. Procurement Decision',
    bn: '৫. সংগ্রহ সিদ্ধান্ত',
    hi: '5. खरीद निर्णय'
  },
  catTransactions: {
    en: '💳 TRANSACTIONS',
    bn: '💳 লেনদেনসমূহ',
    hi: '💳 लेनदेन'
  },
  todaysTxns: {
    en: "Today's Transactions",
    bn: 'আজকের লেনদেনসমূহ',
    hi: 'आज के लेनदेन'
  },
  digitalReceipts: {
    en: 'Digital Receipts',
    bn: 'ডিজিটাল রসিদ',
    hi: 'डिजिटल रसीदें'
  },
  catRules: {
    en: '📜 RULES & EXCEPTIONS',
    bn: '📜 নিয়ম ও ব্যতিক্রম',
    hi: '📜 नियम एवं अपवाद'
  },
  officialRulebook: {
    en: 'Official Rulebook',
    bn: 'সরকারি রুলবুক',
    hi: 'आधिकारिक नियम पुस्तिका'
  },
  exceptionsDisputes: {
    en: 'Exceptions & Disputes',
    bn: 'ব্যতিক্রম ও বিরোধ',
    hi: 'अपवाद एवं विवाद'
  },

  // Home Dashboard View
  goodMorning: {
    en: 'GOOD MORNING, AGENT ',
    bn: 'শুভ সকাল, এজেন্ট ',
    hi: 'शुभ प्रभात, एजेंट '
  },
  callNextFarmerBtn: {
    en: '📢 CALL NEXT FARMER',
    bn: '📢 পরবর্তী কৃষককে ডাকুন',
    hi: '📢 अगले किसान को बुलाएं'
  },
  kpiTodaysFarmers: {
    en: "TODAY'S FARMERS",
    bn: 'আজকের মোট কৃষক',
    hi: 'आज के किसान'
  },
  subTotalBooked: {
    en: 'Total Booked',
    bn: 'মোট বুকিংকৃত',
    hi: 'कुल बुक किए गए'
  },
  kpiCheckedIn: {
    en: 'CHECKED IN',
    bn: 'উপস্থিত হয়েছেন',
    hi: 'चेक इन'
  },
  subAtYard: {
    en: 'At Centre Yard',
    bn: 'সংগ্রহ কেন্দ্রে উপস্থিত',
    hi: 'खरीद केंद्र पर'
  },
  kpiCompleted: {
    en: 'COMPLETED',
    bn: 'সম্পন্ন হয়েছে',
    hi: 'पूर्ण'
  },
  subProcuredReceipted: {
    en: 'Procured & Receipted',
    bn: 'সংগৃহীত ও রসিদপ্রদত্ত',
    hi: 'खरीदा गया व रसीद दी गई'
  },
  kpiPending: {
    en: 'PENDING',
    bn: 'অপেক্ষারত',
    hi: 'लंबित'
  },
  subRemainingQueue: {
    en: 'Remaining Queue',
    bn: 'অবশিষ্ট কাতার',
    hi: 'शेष कतार'
  },
  liveQueueTitle: {
    en: '🚜 LIVE QUEUE MONITOR',
    bn: '🚜 সরাসরি কাতার পর্যবেক্ষণ',
    hi: '🚜 लाइव कतार मॉनिटर'
  },
  counterActive: {
    en: 'Counter 04 Active',
    bn: 'কাউন্টার ০৪ সক্রিয়',
    hi: 'काउंटर 04 सक्रिय'
  },
  nowServingLabel: {
    en: 'Now Serving:',
    bn: 'বর্তমান গ্রাহক:',
    hi: 'वर्तमान ग्राहक:'
  },
  nextLabel: {
    en: 'Next:',
    bn: 'পরবর্তী:',
    hi: 'अगला:'
  },
  yourNextLabel: {
    en: 'Your Next:',
    bn: 'আপনার পরবর্তী:',
    hi: 'आपका अगला:'
  },
  btnOpenFullQueue: {
    en: '[ Open Full Queue ]',
    bn: '[ সম্পূর্ণ কাতার দেখুন ]',
    hi: '[ पूरी कतार खोलें ]'
  },
  capacityTitle: {
    en: '⚖️ CENTRE CAPACITY UTILISATION',
    bn: '⚖️ কেন্দ্রের মোট ক্ষমতার ব্যবহার',
    hi: '⚖️ केंद्र क्षमता का उपयोग'
  },
  dailyMax500: {
    en: 'Daily Max 500 Qtl',
    bn: 'দৈনিক সর্বোচ্চ ৫০০ কুইন্টাল',
    hi: 'दैनिक अधिकतम 500 क्विंटल'
  },
  procuredTodayLabel: {
    en: 'Procured Today:',
    bn: 'আজকে সংগৃহীত:',
    hi: 'आज की खरीद:'
  },
  utilisationRateLabel: {
    en: 'Utilisation Rate:',
    bn: 'ব্যবহারের হার:',
    hi: 'उपयोग दर:'
  },
  remainingLabel: {
    en: 'Remaining:',
    bn: 'অবশিষ্ট:',
    hi: 'शेष:'
  },
  nextFarmerTitle: {
    en: '👉 NEXT FARMER IN QUEUE',
    bn: '👉 কাতারে পরবর্তী কৃষক',
    hi: '👉 कतार में अगला किसान'
  },
  checkedInReady: {
    en: 'Checked In & Ready',
    bn: 'উপস্থিত ও প্রস্তুত',
    hi: 'चेक इन व तैयार'
  },
  lblTokenNo: { en: 'Token Number:', bn: 'টোকেন নম্বর:', hi: 'टोकन नंबर:' },
  lblFarmerId: { en: 'Farmer ID:', bn: 'কৃষক আইডি:', hi: 'किसान आईडी:' },
  lblFarmerName: { en: 'Farmer Name:', bn: 'কৃষকের নাম:', hi: 'किसान का नाम:' },
  lblDeclaredCrop: { en: 'Declared Crop:', bn: 'ঘোষিত ফসল:', hi: 'घोषित फसल:' },
  lblQuantity: { en: 'Quantity:', bn: 'পরিমাণ:', hi: 'मात्रा:' },
  lblSlotWindow: { en: 'Slot Window:', bn: 'স্লটের সময়সীমা:', hi: 'स्लॉट समय सीमा:' },
  btnStartJourney: {
    en: '[ START PROCUREMENT JOURNEY ]',
    bn: '[ ফসল সংগ্রহ প্রক্রিয়া শুরু করুন ]',
    hi: '[ खरीद प्रक्रिया शुरू करें ]'
  },

  // Schedule Table
  scheduleTitle: {
    en: "📋 TODAY'S PROCUREMENT SCHEDULE",
    bn: '📋 আজকের ফসল সংগ্রহের সময়সূচী',
    hi: '📋 आज की खरीद समय सारणी'
  },
  searchSchedulePlaceholder: {
    en: 'Search Token / Farmer ID / Name...',
    bn: 'টোকেন / কৃষক আইডি / নাম খুঁজুন...',
    hi: 'टोकन / किसान आईडी / नाम खोजें...'
  },
  thToken: { en: 'Token', bn: 'টোকেন', hi: 'टोकन' },
  thFarmerDetails: { en: 'Farmer Details', bn: 'কৃষকের বিবরণ', hi: 'किसान विवरण' },
  thCrop: { en: 'Crop', bn: 'ফসল', hi: 'फसल' },
  thDeclaredQty: { en: 'Declared Qty', bn: 'ঘোষিত পরিমাণ', hi: 'घोषित मात्रा' },
  thSlotTime: { en: 'Slot Time', bn: 'স্লটের সময়', hi: 'स्लॉट समय' },
  thStatus: { en: 'Status', bn: 'অবস্থা', hi: 'स्थिति' },
  thAction: { en: 'Action', bn: 'পদক্ষেপ', hi: 'कार्रवाई' },
  btnStartProcurement: { en: 'Start Procurement', bn: 'সংগ্রহ শুরু করুন', hi: 'खरीद शुरू करें' },

  // Workflow Steps
  verifyStepTitle: {
    en: 'STEP 1: FARMER IDENTITY & BOOKING VERIFICATION (QR SCAN)',
    bn: 'ধাপ ১: কৃষকের পরিচয় ও বুকিং যাচাইকরণ (QR স্ক্যান)',
    hi: 'चरण 1: किसान पहचान एवं बुकिंग सत्यापन (QR स्कैन)'
  },
  scanBoxTitle: { en: 'SCAN FARMER TOKEN / QR CODE', bn: 'কৃষকের টোকেন / QR কোড স্ক্যান করুন', hi: 'किसान टोकन / QR कोड स्कैन करें' },
  scanCameraActive: { en: 'Scan Camera Active', bn: 'ক্যামেরা সক্রিয়', hi: 'स्कैन कैमरा सक्रिय' },
  btnSimulateScan: { en: 'Simulate QR Scan (Token #4)', bn: 'QR স্ক্যান সিমুলেট করুন (টোকেন #৪)', hi: 'QR स्कैन सिमुलेट करें (टोकन #4)' },
  verifiedDetailsTitle: { en: 'VERIFIED FARMER & BOOKING DETAILS', bn: 'যাচাইকৃত কৃষক ও বুকিং বিবরণ', hi: 'सत्यापित किसान व बुकिंग विवरण' },
  lblParchaRef: { en: 'Land Parcha Ref:', bn: 'জমির খতিয়ান পর্চা নং:', hi: 'भूमि पर्चा संदर्भ:' },
  lblMaxQuota: { en: 'Max Quota Allowed:', bn: 'সর্বোচ্চ অনুমোদিত কোটা:', hi: 'अधिकतम अनुमत कोटा:' },
  btnNextStep2: { en: 'Proceed to Step 2: Crop Verification →', bn: 'ধাপ ২-এ এগিয়ে যান: ফসল যাচাইকরণ →', hi: 'चरण 2 पर आगे बढ़ें: फसल सत्यापन →' },

  cropVerifyTitle: {
    en: 'STEP 2: CROP IDENTITY & PACKAGING PHYSICAL INSPECTION',
    bn: 'ধাপ ২: ফসল ও প্যাকেজিং ভৌত পরিদর্শন',
    hi: 'चरण 2: फसल पहचान एवं पैकेजिंग भौतिक निरीक्षण'
  },
  checkCropMatch: {
    en: 'Declared Crop Matches Physical Grain (Paddy / Wheat)',
    bn: 'ঘোষিত ফসল ও বাস্তব শস্যের মিল রয়েছে (ধান / গম)',
    hi: 'घोषित फसल और वास्तविक अनाज का मिलान (धान / गेहूं)'
  },
  checkPackaging: {
    en: 'Gunny Bag Packaging Acceptable (Standard 50kg Bags)',
    bn: 'চটের বস্তার প্যাকেজিং গ্রহণযোগ্য (মানক ৫০ কেজি বস্তা)',
    hi: 'बोरी पैकेजिंग स्वीकार्य (मानक 50 किग्रा बोरियां)'
  },
  checkSampling: {
    en: 'Grain Sample Presented for Moisture & Impurity Testing',
    bn: 'আর্দ্রতা ও অপদ্রব্য পরীক্ষার জন্য নমুনা জমা প্রদানকৃত',
    hi: 'नमी और अशुद्धता परीक्षण के लिए नमूना प्रस्तुत किया गया'
  },
  btnNextStep3: { en: 'Proceed to Step 3: Quality Testing →', bn: 'ধাপ ৩-এ এগিয়ে যান: গুণমান পরীক্ষা →', hi: 'चरण 3 पर आगे बढ़ें: गुणवत्ता परीक्षण →' },

  qualityStepTitle: {
    en: 'STEP 3: GRAIN QUALITY ASSESSMENT & MOISTURE TESTING',
    bn: 'ধাপ ৩: শস্যের গুণমান মূল্যায়ন ও আর্দ্রতা পরীক্ষা',
    hi: 'चरण 3: अनाज गुणवत्ता मूल्यांकन एवं नमी परीक्षण'
  },
  moistureMeterTitle: { en: 'CONNECTED MOISTURE METER #MM-1024', bn: 'সংযুক্ত আর্দ্রতা মিটার #MM-1024', hi: 'कनेक्टेड नमी मीटर #MM-1024' },
  liveReadingLabel: { en: 'Live Reading: 13.5%', bn: 'সরাসরি পাঠ: ১৩.৫%', hi: 'लाइव रीडिंग: 13.5%' },
  lblMoistureActual: { en: 'Moisture Content (%):', bn: 'আর্দ্রতার পরিমাণ (%):', hi: 'नमी की मात्रा (%):' },
  lblForeignActual: { en: 'Foreign Matter (%):', bn: 'অপদ্রব্য / খড়কুটো (%):', hi: 'बाह्य पदार्थ (%):' },
  lblDamagedActual: { en: 'Damaged Grains (%):', bn: 'ক্ষতিগ্রস্ত দানা (%):', hi: 'क्षतिग्रस्त दाने (%):' },
  lblDiscolouredActual: { en: 'Discoloured Grains (%):', bn: 'বিবর্ণ দানা (%):', hi: 'रंगहीन दाने (%):' },
  evalResultTitle: { en: 'EVALUATED QUALITY GRADE & DEDUCTION', bn: 'মূল্যায়নকৃত মান ও মূল্য হ্রাস', hi: 'मूल्यांकित गुणवत्ता ग्रेड व कटौती' },
  lblAssessedGrade: { en: 'Assessed Quality Grade:', bn: 'মূল্যায়নকৃত গ্রেড:', hi: 'मूल्यांकित गुणवत्ता ग्रेड:' },
  lblQualityDiscount: { en: 'Quality Penalty / Discount:', bn: 'গুণমান জরিমানা / ছাড়:', hi: 'गुणवत्ता जुर्माना / छूट:' },
  lblResultStatus: { en: 'Quality Result Status:', bn: 'গুণমান ফলাফলের অবস্থা:', hi: 'गुणवत्ता परिणाम स्थिति:' },
  btnNextStep4: { en: 'Proceed to Step 4: Digital Weighment →', bn: 'ধাপ ৪-এ এগিয়ে যান: ডিজিটাল ওজন নির্ধারণ →', hi: 'चरण 4 पर आगे बढ़ें: डिजिटल तौल →' },

  weighmentStepTitle: {
    en: 'STEP 4: DIGITAL WEIGHBRIDGE & TARE BALANCE CALCULATION',
    bn: 'ধাপ ৪: ডিজিটাল ওয়েব্রিজ ও খালি বস্তার ওজন হিসাব',
    hi: 'चरण 4: डिजिटल वेब्रिज एवं खाली बोरी वजन गणना'
  },
  scaleOnlineBadge: { en: 'WEIGHBRIDGE SCALE #WS-00452 ONLINE', bn: 'ওয়েব্রিজ স্কেল #WS-00452 সক্রিয়', hi: 'वेब्रिज स्केल #WS-00452 ऑनलाइन' },
  lblGrossWeight: { en: 'GROSS WEIGHT (QTL)', bn: 'মোট ওজন (কুইন্টাল)', hi: 'कुल वजन (क्विंटल)' },
  lblTareWeight: { en: 'TARE WEIGHT (QTL)', bn: 'বস্তার ওজন (কুইন্টাল)', hi: 'खाली बोरी वजन (क्विंटल)' },
  lblNetGrainWeight: { en: 'NET GRAIN WEIGHT (QTL)', bn: 'নিট শস্যের ওজন (কুইন্টাল)', hi: 'शुद्ध अनाज का वजन (क्विंटल)' },
  btnNextStep5: { en: 'Proceed to Step 5: Procurement Decision →', bn: 'ধাপ ৫-এ এগিয়ে যান: সংগ্রহ সিদ্ধান্ত →', hi: 'चरण 5 पर आगे बढ़ें: खरीद निर्णय →' },

  decisionStepTitle: {
    en: 'STEP 5: FINAL PROCUREMENT DECISION & DIGITAL RECEIPT GENERATION',
    bn: 'ধাপ ৫: চূড়ান্ত সংগ্রহ সিদ্ধান্ত ও ডিজিটাল রসিদ প্রদান',
    hi: 'चरण 5: अंतिम खरीद निर्णय एवं डिजिटल रसीद निर्माण'
  },
  purchaseSummaryTitle: { en: 'OFFICIAL PURCHASE VALUATION SUMMARY', bn: 'সরকারি ক্রয় মূল্যয়ন সারসংক্ষেপ', hi: 'आधिकारिक खरीद मूल्यांकन सारांश' },
  lblNetWeightVal: { en: 'Net Grain Weight:', bn: 'নিট শস্যের ওজন:', hi: 'शुद्ध अनाज का वजन:' },
  lblMspRateVal: { en: 'Official MSP Rate:', bn: 'সরকারি এমএসপি দর:', hi: 'आधिकारिक एमएसपी दर:' },
  lblGrossValuation: { en: 'Gross Value:', bn: 'মোট মূল্য:', hi: 'कुल मूल्य:' },
  lblQualityPenalty: { en: 'Quality Penalty Deduction:', bn: 'গুণমান জরিমানা কাটছাঁট:', hi: 'गुणवत्ता जुर्माना कटौती:' },
  lblFinalPayable: { en: 'TOTAL NET PAYABLE:', bn: 'মোট নিট প্রদেয় অর্থ:', hi: 'कुल शुद्ध देय राशि:' },
  btnConfirmPrint: {
    en: '[ CONFIRM & PRINT OFFICIAL RECEIPT ]',
    bn: '[ নিশ্চিত করুন ও সরকারি রসিদ প্রিন্ট করুন ]',
    hi: '[ पुष्टि करें और आधिकारिक रसीद प्रिंट करें ]'
  },
  btnRejectProduce: {
    en: '[ REJECT PRODUCE ]',
    bn: '[ ফসল প্রত্যাখ্যান করুন ]',
    hi: '[ फसल अस्वीकार करें ]'
  },

  // Transactions & Receipts
  txnsTitle: {
    en: "💳 TODAY'S COMPLETED PROCUREMENT TRANSACTIONS",
    bn: '💳 আজকের সম্পন্নকৃত ফসল সংগ্রহের লেনদেনসমূহ',
    hi: '💳 आज के पूर्ण खरीद लेनदेन'
  },
  thReceiptNo: { en: 'Receipt No.', bn: 'রসিদ নং', hi: 'रसीद सं.' },
  thNetWeight: { en: 'Net Weight', bn: 'নিট ওজন', hi: 'शुद्ध वजन' },
  thTotalPayable: { en: 'Total Payable', bn: 'মোট প্রদেয় অর্থ', hi: 'कुल देय' },
  btnViewReceipt: { en: 'View Receipt', bn: 'রসিদ দেখুন', hi: 'रसीद देखें' },

  // Rulebook & Exceptions
  rulebookTitle: {
    en: '📜 OFFICIAL FCI PROCUREMENT RULEBOOK & FAQ NORMS',
    bn: '📜 সরকারি এফসিআই সংগ্রহ রুলবুক ও মানদণ্ড',
    hi: '📜 आधिकारिक एफसीआई खरीद नियम पुस्तिका व मानक'
  },
  exceptionsTitle: {
    en: '🚨 EXCEPTIONS, DISPUTES & APPEAL LOG',
    bn: '🚨 ব্যতিক্রম, বিরোধ ও আপিল রেকর্ড',
    hi: '🚨 अपवाद, विवाद एवं अपील लॉग'
  },
  thExceptionId: { en: 'Exception ID', bn: 'ব্যতিক্রম আইডি', hi: 'अपवाद आईडी' },
  thDisputeType: { en: 'Dispute Type', bn: 'বিরোধের ধরন', hi: 'विवाद का प्रकार' },
  thParameter: { en: 'Parameter', bn: 'প্যারামিটার', hi: 'मापदंड' },
  btnInspectDispute: { en: 'Inspect Dispute', bn: 'বিরোধ পরীক্ষা করুন', hi: 'विवाद का निरीक्षण करें' },

  // Printable Receipt Modal
  receiptHeaderTitle: { en: 'OFFICIAL GOVERNMENT PROCUREMENT RECEIPT', bn: 'সরকারি ফসল সংগ্রহ রসিদ', hi: 'आधिकारिक सरकारी खरीद रसीद' },
  btnPrintReceipt: { en: 'Print Receipt', bn: 'রসিদ প্রিন্ট করুন', hi: 'रसीद प्रिंट करें' },
  btnDownloadPdf: { en: 'Download PDF', bn: 'পিডিএফ ডাউনলোড', hi: 'पीडीएफ डाउनलोड' },
  btnCloseReceipt: { en: 'Close Receipt', bn: 'রসিদ বন্ধ করুন', hi: 'रसीद बंद करें' }
};

export default function ProfessionalDashboard() {
  const { user, logout } = useContext(AuthContext);
  const { language, setLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();

  // Translation helper function
  const at = (key) => {
    if (agentDict[key]) {
      return agentDict[key][language] || agentDict[key].en || key;
    }
    return key;
  };

  // Status Badge Translation Helper
  const trStatus = (status) => {
    const map = {
      Done: { en: 'Done', bn: 'সম্পন্ন', hi: 'पूर्ण' },
      Serving: { en: 'Serving', bn: 'প্রদানরত', hi: 'सेवा में' },
      Waiting: { en: 'Waiting', bn: 'অপেক্ষারত', hi: 'प्रतीक्षा में' },
      Active: { en: 'Active', bn: 'সক্রিয়', hi: 'सक्रिय' },
      ACCEPTED: { en: 'ACCEPTED', bn: 'গৃহীত', hi: 'स्वीकृत' },
      ACCEPTED_WITH_DISCOUNT: { en: 'ACCEPTED WITH DISCOUNT', bn: 'মূল্য হ্রাস সহ গৃহীত', hi: 'छूट के साथ स्वीकृत' },
      REJECTED: { en: 'REJECTED', bn: 'প্রত্যাখ্যাত', hi: 'अस्वीकृत' },
      'Under Appeal': { en: 'Under Appeal', bn: 'আপিলাধীন', hi: 'अपील के तहत' },
      'Pending Supervisor Approval': { en: 'Pending Supervisor Approval', bn: 'সুপারভাইজার অনুমোদনের অপেক্ষায়', hi: 'पर्यवेक्षक स्वीकृति लंबित' },
      Open: { en: 'Open', bn: 'অমীমাংসিত', hi: 'खुला' }
    };
    return map[status]?.[language] || map[status]?.en || status;
  };

  // Crop Translation Helper
  const trCrop = (c) => {
    if (!c) return c;
    if (language === 'bn') {
      return c.replace(/Paddy \(Common\)/g, 'ধান (সাধারণ)')
              .replace(/Paddy \(Grade A\)/g, 'ধান (গ্রেড এ)')
              .replace(/Paddy & Wheat/g, 'ধান ও গম')
              .replace(/Paddy/g, 'ধান')
              .replace(/Wheat \(FAQ Standard\)/g, 'গম (এফএকিউ মানদণ্ড)')
              .replace(/Wheat/g, 'গম');
    }
    if (language === 'hi') {
      return c.replace(/Paddy \(Common\)/g, 'धान (सामान्य)')
              .replace(/Paddy \(Grade A\)/g, 'धान (ग्रेड ए)')
              .replace(/Paddy & Wheat/g, 'धान और गेहूं')
              .replace(/Paddy/g, 'धान')
              .replace(/Wheat \(FAQ Standard\)/g, 'गेहूं (एफएक्यू मानक)')
              .replace(/Wheat/g, 'गेहूं');
    }
    return c;
  };

  // Agent Active Sidebar Navigation Menu Item
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // Agent Profile info
  const agentInfo = {
    id: user?.professionalProfile?.licenseId || 'A1024',
    name: user?.name || 'Rahul Sharma',
    centre: 'ABC Procurement Centre (Siliguri)',
    date: '17 Sept 2026'
  };

  // Agent Daily Schedule Summary Cards State
  const [scheduleStats, setScheduleStats] = useState({
    todaysFarmers: 84,
    checkedIn: 52,
    completed: 4,
    pending: 21,
    nowServing: 4,
    next: 5,
    yourNext: 6,
    capacityUsed: 100,
    capacityTotal: 500
  });

  // Next Farmer Action Card State
  const [nextFarmerCard, setNextFarmerCard] = useState({
    tokenNumber: 43,
    farmerId: 'FMR-WB-09214',
    farmerName: 'Ramesh Patel',
    crop: 'Paddy',
    quantityQtl: 25,
    bookingId: 'BK202609170045',
    slot: '10:00–11:00 AM'
  });

  // Today's Procurement Schedule Table List (Tokens #1 to #10)
  const [scheduleList, setScheduleList] = useState([
    { token: '#1', farmer: 'FMR-WB-08102 (Suresh Kumar)', crop: 'Paddy', qty: 20, time: '10:00 AM', status: 'Done', bookingId: 'BK202609170001' },
    { token: '#2', farmer: 'FMR-WB-08920 (Anil Roy)', crop: 'Paddy', qty: 25, time: '10:10 AM', status: 'Done', bookingId: 'BK202609170002' },
    { token: '#3', farmer: 'FMR-WB-09551 (Gurpreet Singh)', crop: 'Wheat', qty: 30, time: '10:20 AM', status: 'Done', bookingId: 'BK202609170003' },
    { token: '#4', farmer: 'FMR-WB-09214 (Ramesh Patel)', crop: 'Paddy', qty: 25, time: '10:30 AM', status: 'Serving', bookingId: 'BK202609170004' },
    { token: '#5', farmer: 'FMR-WB-09812 (Sunil Mondal)', crop: 'Wheat', qty: 30, time: '10:40 AM', status: 'Waiting', bookingId: 'BK202609170005' },
    { token: '#6', farmer: 'FMR-WB-10029 (Harish Verma)', crop: 'Paddy', qty: 40, time: '10:50 AM', status: 'Waiting', bookingId: 'BK202609170006' },
    { token: '#7', farmer: 'FMR-WB-10245 (Debjyoti Sinha)', crop: 'Paddy', qty: 35, time: '11:00 AM', status: 'Waiting', bookingId: 'BK202609170007' },
    { token: '#8', farmer: 'FMR-WB-10490 (Bikash Das)', crop: 'Paddy', qty: 22, time: '11:10 AM', status: 'Waiting', bookingId: 'BK202609170008' },
    { token: '#9', farmer: 'FMR-WB-10612 (Pradip Biswas)', crop: 'Wheat', qty: 28, time: '11:20 AM', status: 'Waiting', bookingId: 'BK202609170009' },
    { token: '#10', farmer: 'FMR-WB-10899 (Subhash Barman)', crop: 'Paddy', qty: 32, time: '11:30 AM', status: 'Waiting', bookingId: 'BK202609170010' }
  ]);

  // Today's Completed Procurement Transactions List (4-5 transactions connected across tabs)
  const [transactionsList, setTransactionsList] = useState([
    {
      receiptId: 'RCPT-2026-009421',
      txnId: 'PR-2026-008721',
      farmerName: 'Ramesh Patel',
      farmerId: 'FMR-WB-09214',
      bookingId: 'BK202609170004',
      centre: 'PC-BNK-001 (Siliguri)',
      crop: 'Paddy (Grade A)',
      season: 'Kharif 2026',
      grossWeightQtl: 26.20,
      tareWeightQtl: 1.20,
      netWeightQtl: 25.00,
      mspRate: 2389,
      grossValue: 59725,
      deduction: 0,
      finalPayable: 59725,
      status: 'Done',
      receiptStatus: 'GENERATED',
      paymentStatus: 'PROCESSING',
      date: '18-09-2026',
      time: '10:30 AM'
    },
    {
      receiptId: 'RCPT-2026-009420',
      txnId: 'PR-2026-008720',
      farmerName: 'Gurpreet Singh',
      farmerId: 'FMR-WB-09551',
      bookingId: 'BK202609170003',
      centre: 'PC-BNK-001 (Siliguri)',
      crop: 'Wheat (FAQ Standard)',
      season: 'RMS 2025-26',
      grossWeightQtl: 31.50,
      tareWeightQtl: 1.50,
      netWeightQtl: 30.00,
      mspRate: 2425,
      grossValue: 72750,
      deduction: 0,
      finalPayable: 72750,
      status: 'Done',
      receiptStatus: 'VERIFIED',
      paymentStatus: 'CREDITED',
      date: '18-09-2026',
      time: '10:20 AM'
    },
    {
      receiptId: 'RCPT-2026-009419',
      txnId: 'PR-2026-008719',
      farmerName: 'Anil Roy',
      farmerId: 'FMR-WB-08920',
      bookingId: 'BK202609170002',
      centre: 'PC-BNK-001 (Siliguri)',
      crop: 'Paddy (Common)',
      season: 'Kharif 2026',
      grossWeightQtl: 26.10,
      tareWeightQtl: 1.10,
      netWeightQtl: 25.00,
      mspRate: 2369,
      grossValue: 59225,
      deduction: 0,
      finalPayable: 59225,
      status: 'Done',
      receiptStatus: 'VERIFIED',
      paymentStatus: 'CREDITED',
      date: '18-09-2026',
      time: '10:10 AM'
    },
    {
      receiptId: 'RCPT-2026-009418',
      txnId: 'PR-2026-008718',
      farmerName: 'Suresh Kumar',
      farmerId: 'FMR-WB-08102',
      bookingId: 'BK202609170001',
      centre: 'PC-BNK-001 (Siliguri)',
      crop: 'Paddy (Common)',
      season: 'Kharif 2026',
      grossWeightQtl: 21.00,
      tareWeightQtl: 1.00,
      netWeightQtl: 20.00,
      mspRate: 2369,
      grossValue: 47380,
      deduction: 0,
      finalPayable: 47380,
      status: 'Done',
      receiptStatus: 'VERIFIED',
      paymentStatus: 'CREDITED',
      date: '18-09-2026',
      time: '10:00 AM'
    }
  ]);

  const [selectedTxnForReceipt, setSelectedTxnForReceipt] = useState(null);

  // Filters for Schedule Table
  const [scheduleFilterCrop, setScheduleFilterCrop] = useState('All');
  const [scheduleSearchQuery, setScheduleSearchQuery] = useState('');

  // Active Procurement Workflow Session State
  const [activeSession, setActiveSession] = useState({
    bookingId: 'BK202609170004',
    tokenNumber: '#4',
    farmerId: 'FMR-WB-09214',
    farmerName: 'Ramesh Patel',
    declaredCrop: 'Paddy',
    declaredQtyQtl: 25,
    actualCrop: 'Paddy',
    cropMatched: true,
    packagingAcceptable: true,
    presentedForSampling: true,

    // Sample
    sampleId: 'SMP-2026-000452',
    sampleTime: '10:27 AM',
    sampleWeightKg: 2.5,
    samplingMethod: 'Standard Multi-Point Probe',

    // Quality Assessment Values
    moistureActual: 13.5,
    foreignMatterActual: 1.2,
    damagedGrainActual: 0.8,
    discolouredGrainActual: 0.3,
    shrivelledGrainActual: 0.5,
    weevilledGrainActual: 0.1,
    qualityResult: 'ACCEPTED',
    qualityAdjustmentPerQtl: 0,
    qualityRejectReason: '',

    // IoT Connected Devices State
    moistureMeterConnected: true,
    moistureDeviceId: 'MM-1024',
    moistureLastCalibrated: '15/09/2026',
    scaleConnected: true,
    scaleDeviceId: 'WS-00452',

    // Weighment
    grossWeightQtl: 26.20,
    tareWeightQtl: 1.20,
    netWeightQtl: 25.00,
    weighmentConfirmed: true,

    // Valuation
    mspRatePerQtl: 2369,
    grossMspValue: 59225,
    qualityAdjustmentTotal: 0,
    finalPayable: 59225,

    // Status Steps
    checkInDone: true,
    cropVerifyDone: true,
    sampleDone: true,
    qualityDone: true,
    weighmentDone: true,
    procurementConfirmed: true,
    receiptGenerated: true,
    paymentInitiated: true,
    receiptId: 'RCPT-2026-009421'
  });

  // Exceptions / Disputes State
  const [exceptionsList, setExceptionsList] = useState([
    { id: 'EX-101', type: 'Quality Rejection', farmer: 'FMR-WB-1044 (Rajesh Ghosh)', bookingId: 'BK202609170088', parameter: 'Moisture', measured: '18.4%', limit: '17.0%', status: 'Under Appeal' },
    { id: 'EX-102', type: 'Weight Variance', farmer: 'FMR-WB-0991 (Amit Das)', bookingId: 'BK202609170092', declared: '25.5 Qtl', scale: '24.8 Qtl', diff: '0.7 Qtl', status: 'Pending Supervisor Approval' },
    { id: 'EX-103', type: 'Crop Quality Variance', farmer: 'FMR-WB-1082 (Tapan Roy)', bookingId: 'BK202609170099', parameter: 'Foreign Matter', measured: '3.2%', limit: '2.0%', status: 'Open' }
  ]);

  const [selectedException, setSelectedException] = useState(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // Toast Notification
  const [toastMsg, setToastMsg] = useState(null);
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCallNextFarmer = (specificTokenStr = null) => {
    let nextIndex = -1;
    if (specificTokenStr) {
      nextIndex = scheduleList.findIndex((x) => x.token === specificTokenStr);
    } else {
      nextIndex = scheduleList.findIndex((x) => x.status === 'Waiting');
    }

    if (nextIndex === -1) {
      showToast('All farmers in queue for today have been called and processed!');
      return;
    }

    const nextFarmerObj = scheduleList[nextIndex];
    const tokenNum = parseInt(nextFarmerObj.token.replace(/\D/g, '')) || 43;

    const updatedList = scheduleList.map((item, idx) => {
      if (idx < nextIndex) return { ...item, status: 'Done' };
      if (idx === nextIndex) return { ...item, status: 'Serving' };
      return item;
    });

    setScheduleList(updatedList);

    const completedCount = nextIndex;
    const pendingCount = scheduleList.length - (nextIndex + 1);
    const nextTokenNum = tokenNum + 1;
    const yourNextTokenNum = tokenNum + 2;

    setScheduleStats((prev) => ({
      ...prev,
      nowServing: tokenNum,
      next: nextTokenNum,
      yourNext: yourNextTokenNum,
      completed: completedCount,
      pending: pendingCount
    }));

    const upcomingObj = scheduleList[nextIndex + 1] || nextFarmerObj;
    const cleanFarmerName = upcomingObj.farmer.replace(/FMR-WB-\d+\s\((.*)\)/, '$1');
    const cleanFarmerId = upcomingObj.farmer.split(' ')[0];

    setNextFarmerCard({
      tokenNumber: parseInt(upcomingObj.token.replace(/\D/g, '')) || nextTokenNum,
      farmerId: cleanFarmerId,
      farmerName: cleanFarmerName,
      crop: upcomingObj.crop,
      quantityQtl: upcomingObj.qty,
      bookingId: upcomingObj.bookingId,
      slot: `${upcomingObj.time}`
    });

    const currentCleanName = nextFarmerObj.farmer.replace(/FMR-WB-\d+\s\((.*)\)/, '$1');
    const currentCleanId = nextFarmerObj.farmer.split(' ')[0];

    setActiveSession((prev) => ({
      ...prev,
      tokenNumber: nextFarmerObj.token,
      bookingId: nextFarmerObj.bookingId,
      farmerId: currentCleanId,
      farmerName: currentCleanName,
      declaredCrop: nextFarmerObj.crop,
      declaredQtyQtl: nextFarmerObj.qty,
      actualCrop: nextFarmerObj.crop,
      grossWeightQtl: Number((nextFarmerObj.qty + 1.2).toFixed(2)),
      netWeightQtl: nextFarmerObj.qty,
      grossMspValue: nextFarmerObj.qty * (nextFarmerObj.crop === 'Wheat' ? 2425 : 2369),
      finalPayable: nextFarmerObj.qty * (nextFarmerObj.crop === 'Wheat' ? 2425 : 2369),
      checkInDone: true
    }));

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const speech = new SpeechSynthesisUtterance(
          `Token number ${tokenNum}, ${currentCleanName}, please proceed to Counter 04.`
        );
        speech.rate = 0.95;
        speech.lang = 'en-IN';
        window.speechSynthesis.speak(speech);
      } catch (err) {}
    }

    showToast(`📢 Called Token ${nextFarmerObj.token} (${currentCleanName}) to Counter 04!`);
  };

  const handleStartFarmerProcurement = (farmerItem) => {
    handleCallNextFarmer(farmerItem.token);
    setActiveMenu('verify');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans antialiased flex flex-col">
      
      {/* Toast Floating Banner */}
      {toastMsg && (
        <div className="fixed top-16 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl text-xs font-mono font-bold flex items-center gap-2 border border-emerald-500/50 animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. GOV / FCI PROCUREMENT AGENT HEADER BAR                                */}
      {/* ========================================================================= */}
      <header className="bg-[#004d35] text-white px-4 py-3 sm:px-6 shadow-md border-b border-emerald-600/40 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 border-2 border-amber-400 p-0.5 shadow-md flex items-center justify-center overflow-hidden">
              <img src="/agriprocure-logo.png" alt="AgriSetu Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black tracking-wider text-emerald-300 uppercase">
                {at('portalTitle')}
              </h1>
              <span className="text-[10px] text-emerald-200/90 font-mono flex items-center gap-1">
                <img src="/agent-avatar.png" className="w-3.5 h-3.5 rounded-full inline-block" alt="Agent" />
                {at('portalSub')}{agentInfo.centre}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* Language Capsule Pill */}
            <div className="flex items-center bg-[#003827] p-1 rounded-xl border border-emerald-600/50 shadow-xs">
              <Globe className="w-3.5 h-3.5 text-emerald-300 ml-1.5 mr-1" />
              {['en', 'bn', 'hi'].map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLanguage(l)}
                  className={`px-2 py-0.5 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                    language === l ? 'bg-[#008b5e] text-white' : 'text-emerald-200 hover:text-white'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <span className="hidden sm:inline font-mono text-emerald-100 font-bold bg-[#003827] px-3 py-1 rounded-xl border border-emerald-600/50">
              {at('agentIdBadge')}{agentInfo.id} ({agentInfo.name})
            </span>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 flex items-center gap-1 font-bold cursor-pointer transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{at('logout')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row">
        
        {/* ========================================================================= */}
        {/* 2. AGENT OPERATIONAL SIDEBAR                                              */}
        {/* ========================================================================= */}
        <aside className="w-full md:w-64 bg-[#004d35] text-emerald-100 p-4 space-y-6 flex-shrink-0 border-r border-emerald-600/40 shadow-xl">
          
          <nav className="space-y-4 text-xs font-semibold">
            
            {/* Group 1: Dashboard */}
            <button
              onClick={() => setActiveMenu('dashboard')}
              className={`w-full text-left p-2.5 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer ${
                activeMenu === 'dashboard' ? 'bg-emerald-600 text-white font-black shadow-md' : 'hover:bg-emerald-900/80 text-emerald-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-400" />
              <span>{at('agentDashboard')}</span>
            </button>

            {/* Group 2: Today's Work */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/80 px-2 font-bold block">
                {at('catTodaysWork')}
              </span>
              {[
                { id: 'schedule', label: at('todaysSchedule'), icon: Calendar },
                { id: 'pending', label: at('pendingTasks'), icon: Clock }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full text-left p-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                    activeMenu === item.id ? 'bg-emerald-600 text-white font-black' : 'hover:bg-emerald-900/60 text-emerald-200'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Group 3: Procurement Guided Workflow */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/80 px-2 font-bold block">
                {at('catWorkflow')}
              </span>
              {[
                { id: 'verify', label: at('step1Verify'), icon: QrCode },
                { id: 'crop_verify', label: at('step2Crop'), icon: CheckCircle2 },
                { id: 'quality', label: at('step3Quality'), icon: Sparkles },
                { id: 'weighment', label: at('step4Weighment'), icon: Scale },
                { id: 'decision', label: at('step5Decision'), icon: ShieldCheck }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full text-left p-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                    activeMenu === item.id ? 'bg-emerald-600 text-white font-black' : 'hover:bg-emerald-900/60 text-emerald-200'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Group 4: Transactions */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/80 px-2 font-bold block">
                {at('catTransactions')}
              </span>
              <button
                onClick={() => setActiveMenu('transactions')}
                className={`w-full text-left p-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                  activeMenu === 'transactions' ? 'bg-emerald-600 text-white font-black' : 'hover:bg-emerald-900/60 text-emerald-200'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                <span>{at('todaysTxns')}</span>
              </button>
            </div>

            {/* Group 5: Rulebook & Exceptions */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/80 px-2 font-bold block">
                {at('catRules')}
              </span>
              {[
                { id: 'rulebook', label: at('officialRulebook'), icon: FileText },
                { id: 'exceptions', label: at('exceptionsDisputes'), icon: AlertTriangle }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full text-left p-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                    activeMenu === item.id ? 'bg-emerald-600 text-white font-black' : 'hover:bg-emerald-900/60 text-emerald-200'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5 text-amber-400" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

          </nav>
        </aside>

        {/* ========================================================================= */}
        {/* 3. MAIN WORKBENCH / DASHBOARD CONTENT                                     */}
        {/* ========================================================================= */}
        <main className="flex-1 p-4 sm:p-6 space-y-5 overflow-y-auto">
          
          {/* HOME DASHBOARD VIEW */}
          {activeMenu === 'dashboard' && (
            <div className="space-y-5">
              
              {/* Top Operational Status Banner */}
              <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <span>{at('goodMorning')}{agentInfo.id}</span>
                    <span>👋</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {agentInfo.centre} • {agentInfo.date}
                  </p>
                </div>
                <button
                  onClick={() => handleCallNextFarmer('#43')}
                  className="py-2.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  <span>{at('callNextFarmerBtn')} (#{scheduleStats.next})</span>
                </button>
              </div>

              {/* 4 Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{at('kpiTodaysFarmers')}</span>
                  <div className="text-2xl font-black font-mono text-slate-900">{scheduleStats.todaysFarmers}</div>
                  <span className="text-[10px] text-slate-500">{at('subTotalBooked')}</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">{at('kpiCheckedIn')}</span>
                  <div className="text-2xl font-black font-mono text-blue-600">{scheduleStats.checkedIn}</div>
                  <span className="text-[10px] text-slate-500">{at('subAtYard')}</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">{at('kpiCompleted')}</span>
                  <div className="text-2xl font-black font-mono text-emerald-600">{scheduleStats.completed}</div>
                  <span className="text-[10px] text-slate-500">{at('subProcuredReceipted')}</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">{at('kpiPending')}</span>
                  <div className="text-2xl font-black font-mono text-amber-600">{scheduleStats.pending}</div>
                  <span className="text-[10px] text-slate-500">{at('subRemainingQueue')}</span>
                </div>
              </div>

              {/* Live Queue & Capacity Dual Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-black text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      {at('liveQueueTitle')}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                      {at('counterActive')}
                    </span>
                  </div>

                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex justify-between font-bold text-emerald-900">
                      <span>{at('nowServingLabel')}</span>
                      <span className="text-sm font-black">Token #{scheduleStats.nowServing}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex justify-between text-slate-700">
                      <span>{at('nextLabel')}</span>
                      <span className="font-bold">Token #{scheduleStats.next}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex justify-between text-slate-700">
                      <span>{at('yourNextLabel')}</span>
                      <span className="font-bold">Token #{scheduleStats.yourNext}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveMenu('schedule')}
                    className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    {at('btnOpenFullQueue')}
                  </button>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-black text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      {at('capacityTitle')}
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-md">
                      {at('dailyMax500')}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-600 font-bold">{at('procuredTodayLabel')}</span>
                      <span className="font-black text-slate-900">{scheduleStats.capacityUsed} / {scheduleStats.capacityTotal} Qtl</span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden border border-slate-200 p-0.5">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all"
                        style={{ width: `${(scheduleStats.capacityUsed / scheduleStats.capacityTotal) * 100}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] font-mono text-slate-500 pt-1">
                      <span>{at('utilisationRateLabel')} 72.4%</span>
                      <span className="font-bold text-emerald-700">{at('remainingLabel')} 138 Qtl</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Farmer Action Card */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white shadow-lg border border-emerald-800 space-y-3">
                <div className="flex justify-between items-center border-b border-emerald-800 pb-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    {at('nextFarmerTitle')}
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    {at('checkedInReady')}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div>
                    <span className="text-emerald-300/80 block text-[10px]">{at('lblTokenNo')}</span>
                    <span className="text-lg font-black text-white">#{nextFarmerCard.tokenNumber}</span>
                  </div>
                  <div>
                    <span className="text-emerald-300/80 block text-[10px]">{at('lblFarmerName')}</span>
                    <span className="font-bold text-white">{nextFarmerCard.farmerName} ({nextFarmerCard.farmerId})</span>
                  </div>
                  <div>
                    <span className="text-emerald-300/80 block text-[10px]">{at('lblDeclaredCrop')}</span>
                    <span className="font-bold text-emerald-400">{trCrop(nextFarmerCard.crop)} ({nextFarmerCard.quantityQtl} Qtl)</span>
                  </div>
                  <div>
                    <span className="text-emerald-300/80 block text-[10px]">{at('lblSlotWindow')}</span>
                    <span className="font-bold text-white">{nextFarmerCard.slot}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleStartFarmerProcurement({ token: `#${nextFarmerCard.tokenNumber}` })}
                    className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
                  >
                    {at('btnStartJourney')}
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* VIEW: TODAY'S SCHEDULE & QUEUE */}
          {(activeMenu === 'schedule' || activeMenu === 'queue') && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-black text-slate-900 text-base">
                      {at('scheduleTitle')}
                    </h3>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={at('searchSchedulePlaceholder')}
                      value={scheduleSearchQuery}
                      onChange={(e) => setScheduleSearchQuery(e.target.value)}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold w-64"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-slate-50 text-slate-700 font-extrabold border-b border-slate-200">
                      <tr>
                        <th className="p-3">{at('thToken')}</th>
                        <th className="p-3">{at('thFarmerDetails')}</th>
                        <th className="p-3">{at('thCrop')}</th>
                        <th className="p-3">{at('thDeclaredQty')}</th>
                        <th className="p-3">{at('thSlotTime')}</th>
                        <th className="p-3">{at('thStatus')}</th>
                        <th className="p-3 text-right">{at('thAction')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[...scheduleList]
                        .sort((a, b) => {
                          const order = { 'Done': 1, 'Serving': 2, 'Waiting': 3 };
                          return (order[a.status] || 99) - (order[b.status] || 99);
                        })
                        .filter(item => item.farmer.toLowerCase().includes(scheduleSearchQuery.toLowerCase()) || item.token.includes(scheduleSearchQuery))
                        .map((item) => (
                        <tr key={item.token} className="hover:bg-slate-50">
                          <td className="p-3 font-black text-base text-emerald-800">{item.token}</td>
                          <td className="p-3 font-bold text-slate-900">{item.farmer}</td>
                          <td className="p-3 font-semibold">{trCrop(item.crop)}</td>
                          <td className="p-3 font-black text-slate-800">{item.qty} Qtl</td>
                          <td className="p-3 text-slate-600">{item.time}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-1 rounded-lg font-black text-[10px] ${
                              item.status === 'Serving' ? 'bg-blue-600 text-white animate-pulse' :
                              item.status === 'Done' ? 'bg-slate-200 text-slate-700' : 'bg-amber-500 text-white'
                            }`}>
                              {item.status === 'Serving' ? 'In Process' : trStatus(item.status)}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            {item.status === 'Done' && (
                              <span className="px-3 py-1 bg-slate-100 text-slate-600 font-bold rounded-xl text-[11px] border border-slate-200 inline-block">
                                Completed
                              </span>
                            )}
                            {item.status === 'Serving' && (
                              <span className="px-3 py-1 bg-blue-600 text-white font-bold rounded-xl text-[11px] inline-block shadow-sm animate-pulse">
                                In Process
                              </span>
                            )}
                            {item.status === 'Waiting' && (
                              <button
                                onClick={() => handleStartFarmerProcurement(item)}
                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-[11px] cursor-pointer shadow-xs"
                              >
                                Start Procurement
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: PENDING TASKS (WAITING QUEUE NUMBERED FROM 1) */}
          {activeMenu === 'pending' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-black text-slate-900 text-base">
                      📋 PENDING TASKS (WAITING QUEUE)
                    </h3>
                    <p className="text-[11px] text-slate-500">Showing all waiting farmers numbered from 1</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-slate-50 text-slate-700 font-extrabold border-b border-slate-200">
                      <tr>
                        <th className="p-3">S.No</th>
                        <th className="p-3">{at('thToken')}</th>
                        <th className="p-3">{at('thFarmerDetails')}</th>
                        <th className="p-3">{at('thCrop')}</th>
                        <th className="p-3">{at('thDeclaredQty')}</th>
                        <th className="p-3">{at('thSlotTime')}</th>
                        <th className="p-3">{at('thStatus')}</th>
                        <th className="p-3 text-right">{at('thAction')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {scheduleList
                        .filter(item => item.status === 'Waiting')
                        .map((item, idx) => (
                        <tr key={item.token} className="hover:bg-slate-50">
                          <td className="p-3 font-black text-slate-900">#{idx + 1}</td>
                          <td className="p-3 font-black text-base text-emerald-800">{item.token}</td>
                          <td className="p-3 font-bold text-slate-900">{item.farmer}</td>
                          <td className="p-3 font-semibold">{trCrop(item.crop)}</td>
                          <td className="p-3 font-black text-slate-800">{item.qty} Qtl</td>
                          <td className="p-3 text-slate-600">{item.time}</td>
                          <td className="p-3">
                            <span className="px-2.5 py-1 rounded-lg font-black text-[10px] bg-amber-500 text-white">
                              Waiting
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleStartFarmerProcurement(item)}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-[11px] cursor-pointer shadow-xs"
                            >
                              Start Procurement
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: WORKFLOW STEP 1 - VERIFY FARMER */}
          {activeMenu === 'verify' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-black text-slate-900 text-base border-b border-slate-100 pb-2">
                  {at('verifyStepTitle')}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* QR Scan Simulation Box */}
                  <div className="p-6 rounded-2xl bg-slate-950 text-white text-center space-y-4 flex flex-col items-center justify-center">
                    <QrCode className="w-20 h-20 text-emerald-400 animate-pulse" />
                    <span className="font-bold text-sm block">{at('scanBoxTitle')}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                      {at('scanCameraActive')}
                    </span>
                    <button
                      onClick={() => showToast('Simulated QR Code Scan: Token #4 Token Verification Passed.')}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs cursor-pointer"
                    >
                      {at('btnSimulateScan')}
                    </button>
                  </div>

                  {/* Verified Details Card */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-black text-slate-900 block border-b border-slate-200 pb-1 text-xs">
                      {at('verifiedDetailsTitle')}
                    </span>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">{at('lblFarmerName')}</span>
                      <span className="font-bold text-slate-900">{activeSession.farmerName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">{at('lblFarmerId')}</span>
                      <span className="font-bold text-emerald-800">{activeSession.farmerId}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">{at('lblParchaRef')}</span>
                      <span className="font-bold text-slate-900">P-SLG-2024-88</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-slate-500">{at('lblMaxQuota')}</span>
                      <span className="font-black text-emerald-700">50 Quintals</span>
                    </div>

                    <button
                      onClick={() => setActiveMenu('crop_verify')}
                      className="w-full py-2.5 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl cursor-pointer"
                    >
                      {at('btnNextStep2')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: WORKFLOW STEP 2 - CROP VERIFICATION */}
          {activeMenu === 'crop_verify' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-black text-slate-900 text-base border-b border-slate-100 pb-2">
                  {at('cropVerifyTitle')}
                </h3>

                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeSession.cropMatched}
                      onChange={(e) => setActiveSession({...activeSession, cropMatched: e.target.checked})}
                      className="w-4 h-4 accent-emerald-600"
                    />
                    <span>{at('checkCropMatch')}</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeSession.packagingAcceptable}
                      onChange={(e) => setActiveSession({...activeSession, packagingAcceptable: e.target.checked})}
                      className="w-4 h-4 accent-emerald-600"
                    />
                    <span>{at('checkPackaging')}</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeSession.presentedForSampling}
                      onChange={(e) => setActiveSession({...activeSession, presentedForSampling: e.target.checked})}
                      className="w-4 h-4 accent-emerald-600"
                    />
                    <span>{at('checkSampling')}</span>
                  </label>

                  <button
                    onClick={() => setActiveMenu('quality')}
                    className="w-full py-2.5 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl cursor-pointer"
                  >
                    {at('btnNextStep3')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: WORKFLOW STEP 3 - QUALITY TESTING */}
          {activeMenu === 'quality' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-black text-slate-900 text-base border-b border-slate-100 pb-2">
                  {at('qualityStepTitle')}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* IoT Moisture Meter */}
                  <div className="p-5 rounded-2xl bg-slate-950 text-white space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <span className="text-xs font-bold text-emerald-400">{at('moistureMeterTitle')}</span>
                      <span className="text-[10px] bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded font-bold">ONLINE</span>
                    </div>

                    <div className="text-center py-4">
                      <span className="text-3xl font-black text-emerald-400">13.5%</span>
                      <span className="text-[10px] text-slate-400 block mt-1">{at('liveReadingLabel')}</span>
                    </div>
                  </div>

                  {/* Quality Inputs */}
                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">{at('lblMoistureActual')}</label>
                      <input
                        type="number"
                        step="0.1"
                        value={activeSession.moistureActual}
                        onChange={(e) => setActiveSession({...activeSession, moistureActual: Number(e.target.value)})}
                        className="w-full p-2 rounded-xl border bg-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">{at('lblForeignActual')}</label>
                      <input
                        type="number"
                        step="0.1"
                        value={activeSession.foreignMatterActual}
                        onChange={(e) => setActiveSession({...activeSession, foreignMatterActual: Number(e.target.value)})}
                        className="w-full p-2 rounded-xl border bg-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">{at('lblDamagedActual')}</label>
                      <input
                        type="number"
                        step="0.1"
                        value={activeSession.damagedGrainActual}
                        onChange={(e) => setActiveSession({...activeSession, damagedGrainActual: Number(e.target.value)})}
                        className="w-full p-2 rounded-xl border bg-white font-bold"
                      />
                    </div>

                    <button
                      onClick={() => setActiveMenu('weighment')}
                      className="w-full py-2.5 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl cursor-pointer"
                    >
                      {at('btnNextStep4')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: WORKFLOW STEP 4 - DIGITAL WEIGHMENT */}
          {activeMenu === 'weighment' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-black text-slate-900 text-base border-b border-slate-100 pb-2">
                  {at('weighmentStepTitle')}
                </h3>

                <div className="p-5 rounded-2xl bg-slate-950 text-white space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <Scale className="w-4 h-4" />
                      {at('scaleOnlineBadge')}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-bold">{at('lblGrossWeight')}</span>
                      <span className="text-xl font-black text-white">{activeSession.grossWeightQtl} Qtl</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-bold">{at('lblTareWeight')}</span>
                      <span className="text-xl font-black text-amber-400">{activeSession.tareWeightQtl} Qtl</span>
                    </div>
                    <div className="p-3 bg-emerald-950 rounded-xl border border-emerald-700">
                      <span className="text-[10px] text-emerald-300 block font-bold">{at('lblNetGrainWeight')}</span>
                      <span className="text-xl font-black text-emerald-400">{activeSession.netWeightQtl} Qtl</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveMenu('decision')}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl cursor-pointer"
                  >
                    {at('btnNextStep5')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: WORKFLOW STEP 5 - PROCUREMENT DECISION */}
          {activeMenu === 'decision' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-black text-slate-900 text-base border-b border-slate-100 pb-2">
                  {at('decisionStepTitle')}
                </h3>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="font-black text-slate-900 block border-b border-slate-200 pb-1 text-xs">
                    {at('purchaseSummaryTitle')}
                  </span>

                  <div className="flex justify-between py-1 border-b">
                    <span className="text-slate-500">{at('lblNetWeightVal')}</span>
                    <span className="font-black text-slate-900">{activeSession.netWeightQtl} Quintals</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-slate-500">{at('lblMspRateVal')}</span>
                    <span className="font-black text-emerald-800">₹{activeSession.mspRatePerQtl} / Qtl</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-slate-500">{at('lblGrossValuation')}</span>
                    <span className="font-bold text-slate-900">₹{activeSession.grossMspValue.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b text-red-600">
                    <span>{at('lblQualityPenalty')}</span>
                    <span>- ₹{activeSession.qualityAdjustmentTotal}</span>
                  </div>
                  <div className="flex justify-between py-2 border-t-2 border-slate-900 text-base font-black text-emerald-800">
                    <span>{at('lblFinalPayable')}</span>
                    <span>₹{activeSession.finalPayable.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="pt-3 flex gap-3">
                    <button
                      onClick={() => {
                        setShowReceiptModal(true);
                        showToast(`Official Receipt ${activeSession.receiptId} generated!`);
                      }}
                      className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl cursor-pointer shadow-md"
                    >
                      {at('btnConfirmPrint')}
                    </button>
                    <button
                      onClick={() => showToast('Produce rejected and logged to exceptions list.')}
                      className="py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl cursor-pointer"
                    >
                      {at('btnRejectProduce')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: TRANSACTIONS */}
          {activeMenu === 'transactions' && (
            <div className="space-y-4 font-mono text-xs">
              
              {/* Summary Stats Header Bar from PDF Blueprint Page 1 (Updated Correct Operational Data) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 text-sm uppercase tracking-wider">TODAY'S TRANSACTIONS</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">18 September 2026</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold">Live Operational Sync</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">TOTAL</span>
                    <span className="text-base font-black text-slate-900">1,284</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[9px] font-bold text-blue-600 block uppercase">CHECKED-IN</span>
                    <span className="text-base font-black text-blue-600">1,146</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[9px] font-bold text-amber-600 block uppercase">IN PROCESS</span>
                    <span className="text-base font-black text-amber-600">72</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[9px] font-bold text-emerald-600 block uppercase">COMPLETED</span>
                    <span className="text-base font-black text-emerald-600">842</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[9px] font-bold text-teal-700 block uppercase">ACCEPTED</span>
                    <span className="text-base font-black text-teal-700">721</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[9px] font-bold text-purple-700 block uppercase">ADJUSTED</span>
                    <span className="text-base font-black text-purple-700">84</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[9px] font-bold text-red-600 block uppercase">REJECTED</span>
                    <span className="text-base font-black text-red-600">37</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[9px] font-bold text-orange-600 block uppercase">EXCEPTIONS</span>
                    <span className="text-base font-black text-orange-600">18</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-black text-slate-900 text-base border-b border-slate-100 pb-2 flex justify-between items-center">
                  <span>{at('txnsTitle')}</span>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                    Total Records: {transactionsList.length}
                  </span>
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-slate-50 text-slate-700 font-extrabold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Trans ID</th>
                        <th className="p-3">{at('thFarmerDetails')}</th>
                        <th className="p-3">{at('thCrop')}</th>
                        <th className="p-3">{at('thNetWeight')}</th>
                        <th className="p-3">{at('thTotalPayable')}</th>
                        <th className="p-3">{at('thStatus')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {transactionsList.map((txn) => (
                        <tr key={txn.receiptId} className="hover:bg-slate-50">
                          <td className="p-3 font-black text-emerald-800">{txn.txnId || txn.receiptId}</td>
                          <td className="p-3 font-bold text-slate-900">{txn.farmerName} ({txn.farmerId})</td>
                          <td className="p-3 font-semibold">{trCrop(txn.crop)}</td>
                          <td className="p-3 font-black text-slate-800">{txn.netWeightQtl} Qtl</td>
                          <td className="p-3 font-black text-emerald-700">₹{txn.finalPayable.toLocaleString('en-IN')}</td>
                          <td className="p-3">
                            <span className="px-2.5 py-1 rounded-lg font-black text-[10px] bg-emerald-600 text-white">
                              {txn.status || 'COMPLETED'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: OFFICIAL RULEBOOK (COMPLETE 11 OPERATIONAL SECTIONS FROM BLUEPRINT PAGES 23-32) */}
          {activeMenu === 'rulebook' && (
            <div className="space-y-6 font-mono text-xs">
              
              {/* Header Banner */}
              <div className="p-5 rounded-3xl bg-emerald-950 text-white shadow-lg border border-emerald-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    📋 Procurement Officer Rulebook • Standard Operating Procedure (SOP)
                  </span>
                  <span className="text-[10px] bg-emerald-900 text-emerald-300 font-bold px-2.5 py-1 rounded-md border border-emerald-700">
                    KMS 2025-26 & RMS 2025-26
                  </span>
                </div>
                <h3 className="text-lg font-black text-white">Farmer MSP Procurement Platform SOP</h3>
                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  <strong>Audience:</strong> Procurement Centre Officers, Grading Assistants, Weighment Operators, and Designated Purchasing Authority at government-notified procurement centres.
                </p>
              </div>

              {/* Section 1: Role & Authority Matrix */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <h4 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-2">
                  1. Role & Authority Matrix
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-slate-50 text-slate-700 font-extrabold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5 w-1/3">ROLE</th>
                        <th className="p-2.5">AUTHORITY & RESPONSIBILITIES</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-2.5 font-bold text-slate-900">Grading Assistant</td>
                        <td className="p-2.5 text-slate-700">Draw sample, record raw measurements (moisture, FM, damage %). Cannot finalize Accept/Reject decision alone.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-slate-900">Quality Control Officer</td>
                        <td className="p-2.5 text-slate-700">Reviews measurements against the active Uniform Specification, applies value-cut slab, issues the graded verdict (Accept / Discount / Reject).</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-slate-900">Weighment Operator</td>
                        <td className="p-2.5 text-slate-700">Records gross/tare/net weight on the calibrated digital scale. Cannot override a reading without QC sign-off.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-slate-900">Procurement Officer / Centre In-Charge</td>
                        <td className="p-2.5 text-slate-700">Final purchasing authority. Approves the transaction, authorizes payment initiation, and is the first point of escalation for farmer disputes.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-slate-900">District Marketing / Procurement Officer</td>
                        <td className="p-2.5 text-slate-700">Second-level escalation. Reviews disputed rejections, relaxation-order applicability, and complaint appeals.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-[11px] font-bold text-amber-900">
                  📌 Rule: No single role can complete a transaction end-to-end alone — grading, weighment, and final approval are deliberately separated so every purchase has more than one recorded sign-off.
                </div>
              </div>

              {/* Section 2: Pre-Session Checklist (Before Gate Opens) */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <h4 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-2">
                  2. Pre-Session Checklist (Before Gate Opens)
                </h4>
                <div className="space-y-1.5 font-mono text-xs">
                  {[
                    "Confirm today's active MSP rate matches the current CCEA notification",
                    "Confirm active Uniform Specification version (check for any season/district relaxation order in force)",
                    "Verify weighment scale calibration certificate is current",
                    "Confirm moisture meter is calibrated and battery-checked",
                    "Confirm centre capacity (remaining quintals) is correctly loaded in the system before slots are honoured",
                    "Confirm token/queue display is functioning",
                    "Review any pending complaints assigned to this centre"
                  ].map((chk, i) => (
                    <label key={i} className="flex items-center gap-2.5 p-2 bg-slate-50 rounded-xl border border-slate-100 text-slate-800 font-bold cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-emerald-600 w-4 h-4" />
                      <span>{chk}</span>
                    </label>
                  ))}
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-[11px] font-bold text-red-900">
                  ⚠️ Warning: An officer should not begin grading if any of the first three items cannot be confirmed — these directly affect every transaction's legal validity for the day.
                </div>
              </div>

              {/* Section 3: On Farmer Arrival — Verification Sequence */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <h4 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-2">
                  3. On Farmer Arrival — Verification Sequence
                </h4>
                <div className="space-y-2 font-mono text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between font-bold text-slate-900">
                    <span>1. Scan QR / verify Booking ID</span>
                    <span>✓</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between font-bold text-slate-900">
                    <span>2. Confirm farmer identity matches booking record</span>
                    <span>✓</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between font-bold text-slate-900">
                    <span>3. Confirm booked crop matches produce brought</span>
                    <span>✓</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between font-bold text-slate-900">
                    <span>4. Confirm booked slot window is current</span>
                    <span>✓</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between font-bold text-slate-900">
                    <span>5. Assign/verify queue token → Proceed to sampling</span>
                    <span>✓</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-100 border border-slate-200 rounded-2xl text-[11px] font-bold text-slate-800">
                  📌 Rejection at this stage (before grading even begins) applies only for: mismatched identity, mismatched crop, or arrival outside the valid slot/grace window — never for produce quality, which is assessed only at the grading stage.
                </div>
              </div>

              {/* Section 4: Sampling Procedure */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <h4 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-2">
                  4. Sampling Procedure
                </h4>
                <div className="space-y-2 text-xs text-slate-700 font-mono">
                  <p>• Draw sample per notified sampling method (spear/probe sampling across multiple points in the lot — never from a single scoop).</p>
                  <p>• Combine into one representative composite sample.</p>
                  <p>• Split: one portion for testing, one retained (sealed) for dispute reference.</p>
                  <p>• Log sample ID against Booking ID.</p>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-[11px] font-bold text-emerald-950">
                  📌 Rule: A retained, sealed counter-sample is mandatory. If a farmer disputes a grading result later, this sample — not memory or re-testing fresh produce — is the reference used for re-verification.
                </div>
              </div>

              {/* Section 5: Grading Decision Procedure & Value-Cut Slabs */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h4 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-2">
                  5. Grading Decision Procedure & Active Value-Cut Slabs
                </h4>

                <div className="space-y-2">
                  <span className="font-bold text-slate-900 block text-xs">Paddy — Base Moisture Limit 17.0%:</span>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 font-mono text-[11px]">
                    <div>• <strong>≤ 17.0%</strong> → No cut, full MSP (Rs 2,369 / Rs 2,389 per Qtl)</div>
                    <div>• <strong>17.01% – 22.0%*</strong> → 1% value cut per 1% (or part) excess moisture</div>
                    <div className="text-red-600">• <strong>&gt; 22.0%</strong> → Reject</div>
                  </div>
                  <p className="text-[10px] text-slate-500 italic">* The 22.0% outer ceiling applies only under an active state relaxation order (e.g., wet-harvest relief). Default central ceiling is tighter.</p>
                </div>

                <div className="space-y-2 pt-1">
                  <span className="font-bold text-slate-900 block text-xs">Wheat — Base Moisture Limit 12.0%:</span>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 font-mono text-[11px]">
                    <div>• <strong>≤ 12.0%</strong> → No cut, full MSP (Rs 2,425 per Qtl)</div>
                    <div>• <strong>12.01% – 14.0%</strong> → 1% value cut per 1% (or part) excess moisture</div>
                    <div className="text-red-600">• <strong>&gt; 14.0%</strong> → Reject</div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600">
                  Non-moisture parameters (foreign matter, damaged/discoloured, shrivelled, admixture): graded strictly Accept/Reject against the base limit unless the current season's DFPD circular explicitly publishes a value-cut rate for that parameter. If no cut rate is published, a lot exceeding the base limit is rejected outright — the officer must not estimate or invent a discount.
                </p>

                <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2 font-mono text-[11px]">
                  <span className="text-emerald-400 font-bold block text-xs border-b border-slate-800 pb-1">MANDATORY GRADING RECORD FIELDS</span>
                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div>Booking ID: __________</div>
                    <div>Officer ID: __________</div>
                    <div>Sample ID: __________</div>
                    <div>Timestamp: __________</div>
                    <div>Moisture: ___%</div>
                    <div>Foreign Matter: ___%</div>
                    <div>Damaged/Discoloured: ___%</div>
                    <div>Shrivelled: ___%</div>
                    <div>Final Verdict: ACCEPT / DISCOUNT / REJECT</div>
                    <div>Value Cut Applied: Rs ___/quintal</div>
                  </div>
                </div>
              </div>

              {/* Section 6: Weighment Procedure */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <h4 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-2">
                  6. Weighment Procedure
                </h4>
                <div className="space-y-1.5 font-mono text-xs text-slate-700">
                  <p>1. Place Lot on Calibrated Digital Scale</p>
                  <p>2. Record GROSS WEIGHT (system-captured, not manual entry where connected scale is available)</p>
                  <p>3. Record TARE WEIGHT (empty container/vehicle)</p>
                  <p>4. NET WEIGHT = GROSS − TARE</p>
                  <p>5. Convert to Quintals → lock the figure into the transaction</p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-[11px] font-bold text-amber-900">
                  📌 Rule: Any manual override of a digital reading requires a logged reason and a second officer's sign-off (typically the Centre In-Charge). Unexplained manual overrides should be flagged for the District Marketing Officer's review during routine audit.
                </div>
              </div>

              {/* Section 7: Payment Authorization Procedure */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <h4 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-2">
                  7. Payment Authorization Procedure
                </h4>
                <div className="space-y-1.5 font-mono text-xs text-slate-700">
                  <p>• Net Quantity × Applicable MSP (post value-cut, if any)</p>
                  <p>• Officer reviews computed Final Payable Amount against the Grading Record and Weighment Record</p>
                  <p>• Officer authorizes → Transaction finalized</p>
                  <p>• Payment pushed to DBT pipeline: Pending → Processing → Processed → Credited</p>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-[11px] font-bold text-emerald-950">
                  📌 Rule: The officer authorizing payment must be someone other than whoever performed the grading, wherever centre staffing allows — this separation is what makes a later audit trail meaningful.
                </div>
              </div>

              {/* Section 8: Handling a Farmer Dispute at the Counter */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <h4 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-2">
                  8. Handling a Farmer Dispute at the Counter (Dispute Protocol)
                </h4>
                <div className="space-y-2 font-mono text-xs text-slate-700">
                  <p>1. Farmer disputes grading/weighment result.</p>
                  <p>2. Officer explains the specific parameter, measured value, and cited rule (never a vague "it failed quality check").</p>
                  <p>3. If farmer still disputes: Retrieve SEALED counter-sample → re-test in farmer's presence (or refer to next-level QC if re-test infrastructure isn't available on-site).</p>
                  <p>4. If unresolved: Officer files a Complaint on the farmer's behalf with full transaction context attached, and informs the farmer of the Complaint ID and expected response window.</p>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-[11px] font-bold text-red-900">
                  📌 Rule: An officer must never simply tell a farmer to "come back later" without logging a Complaint ID — every disputed transaction needs a traceable record, even if it's resolved on the spot.
                </div>
              </div>

              {/* Section 9: End-of-Day Reconciliation */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <h4 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-2">
                  9. End-of-Day Reconciliation
                </h4>
                <div className="space-y-1.5 font-mono text-xs">
                  {[
                    "Total quintals procured today vs. capacity allocated",
                    "Count of Accepted / Discounted / Rejected lots",
                    "All Grading Records signed and archived",
                    "All Weighment Records match Payment authorizations (no orphaned records either direction)",
                    "Any manual scale overrides flagged and reasoned",
                    "Any relaxation order applied today logged with reference number",
                    "Pending complaints updated with today's status & remaining centre capacity updated for tomorrow's slot availability"
                  ].map((rec, i) => (
                    <label key={i} className="flex items-center gap-2.5 p-2 bg-slate-50 rounded-xl border border-slate-100 text-slate-800 font-bold cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-emerald-600 w-4 h-4" />
                      <span>{rec}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 10: Escalation Matrix & Prohibitions */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h4 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-2">
                  10. Escalation Matrix & Mandatory Prohibitions
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-slate-50 text-slate-700 font-extrabold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5 w-1/2">ISSUE TYPE</th>
                        <th className="p-2.5">ESCALATE TO</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr><td className="p-2.5 font-bold">Grading dispute (unresolved)</td><td className="p-2.5 text-emerald-800 font-bold">District Marketing / Procurement Officer</td></tr>
                      <tr><td className="p-2.5 font-bold">Suspected relaxation-order applicability question</td><td className="p-2.5 text-emerald-800 font-bold">District Marketing / Procurement Officer</td></tr>
                      <tr><td className="p-2.5 font-bold">Scale calibration failure</td><td className="p-2.5 text-emerald-800 font-bold">Technical / Weights & Measures Authority</td></tr>
                      <tr><td className="p-2.5 font-bold">Payment / DBT failure</td><td className="p-2.5 text-emerald-800 font-bold">Payment Settlement Cell</td></tr>
                      <tr><td className="p-2.5 font-bold">Staff conduct complaint</td><td className="p-2.5 text-emerald-800 font-bold">Centre In-Charge → District Authority</td></tr>
                      <tr><td className="p-2.5 font-bold">Suspected quantity/quality fraud pattern</td><td className="p-2.5 text-emerald-800 font-bold">District Authority + Flagged for Audit</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-red-950 text-white rounded-2xl space-y-2 font-mono text-xs">
                  <span className="text-red-400 font-black block text-sm border-b border-red-800 pb-1">
                    WHAT THE OFFICER MUST NEVER DO (MANDATORY PROHIBITIONS)
                  </span>
                  <div className="space-y-1.5 text-red-200 font-bold">
                    <p>✘ Apply last season's MSP or specification to a current transaction</p>
                    <p>✘ Apply a relaxed moisture ceiling without a verified active order</p>
                    <p>✘ Estimate a value-cut rate for a parameter with no published rate</p>
                    <p>✘ Finalize Accept/Reject without recording measured values</p>
                    <p>✘ Override a digital weighment reading without a logged reason and second sign-off</p>
                    <p>✘ Turn away a disputed farmer without issuing a Complaint ID</p>
                    <p>✘ Authorize payment for a transaction lacking a matching Grading Record and Weighment Record</p>
                  </div>
                </div>
              </div>

              {/* Section 11: Grading Decision Console */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h4 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-2 flex justify-between items-center">
                  <span>11. FAQ Norms — Grading Decision Console</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                    Active KMS 2025-26 Standard
                  </span>
                </h4>
                <p className="text-xs text-slate-600">
                  Use this at the grading counter to check a sample against active Uniform Specification and value-cut slabs before recording the verdict on the Grading Record.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Paddy Moisture Measured (%):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={activeSession.moistureActual}
                      onChange={(e) => setActiveSession({...activeSession, moistureActual: Number(e.target.value)})}
                      className="w-full p-2.5 rounded-xl border bg-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Foreign Matter Measured (%):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={activeSession.foreignMatterActual}
                      onChange={(e) => setActiveSession({...activeSession, foreignMatterActual: Number(e.target.value)})}
                      className="w-full p-2.5 rounded-xl border bg-white font-bold"
                    />
                  </div>
                </div>

                <div className="p-4 bg-emerald-950 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">EVALUATED VERDICT:</span>
                    <span className="text-base font-black text-emerald-400">
                      {activeSession.moistureActual <= 17.0 ? 'ACCEPT (FULL MSP Rs 2,389/QTL)' :
                       activeSession.moistureActual <= 22.0 ? `ACCEPT WITH DISCOUNT (1% CUT: Rs ${(2389 * 0.01 * (activeSession.moistureActual - 17)).toFixed(2)}/QTL)` :
                       'REJECT (EXCEEDS MOISTURE CEILING 22.0%)'}
                    </span>
                  </div>
                  <span className="text-[10px] bg-emerald-900 text-emerald-300 font-bold px-3 py-1.5 rounded-xl border border-emerald-700">
                    Source: DFPD/FCI Uniform Specifications 2025-26
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* VIEW: EXCEPTIONS & DISPUTES */}
          {activeMenu === 'exceptions' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-black text-slate-900 text-base border-b border-slate-100 pb-2">
                  {at('exceptionsTitle')}
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-slate-50 text-slate-700 font-extrabold border-b border-slate-200">
                      <tr>
                        <th className="p-3">{at('thExceptionId')}</th>
                        <th className="p-3">{at('thDisputeType')}</th>
                        <th className="p-3">{at('thFarmerDetails')}</th>
                        <th className="p-3">{at('thParameter')}</th>
                        <th className="p-3">{at('thStatus')}</th>
                        <th className="p-3 text-right">{at('thAction')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {exceptionsList.map((ex) => (
                        <tr key={ex.id} className="hover:bg-slate-50">
                          <td className="p-3 font-black text-amber-800">{ex.id}</td>
                          <td className="p-3 font-bold text-slate-900">{ex.type}</td>
                          <td className="p-3">{ex.farmer}</td>
                          <td className="p-3 font-semibold">{ex.parameter || 'Weight'}</td>
                          <td className="p-3 font-bold">{trStatus(ex.status)}</td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => showToast(`Inspecting dispute ${ex.id}`)}
                              className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-300 font-bold rounded-lg text-[11px] cursor-pointer"
                            >
                              {at('btnInspectDispute')}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ========================================================================= */}
      {/* 4. PRINTABLE OFFICIAL RECEIPT MODAL                                       */}
      {/* ========================================================================= */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 text-slate-800 shadow-2xl space-y-4 font-mono">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">{at('receiptHeaderTitle')}</h3>
              <button
                onClick={() => {
                  setShowReceiptModal(false);
                  setSelectedTxnForReceipt(null);
                }}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {(() => {
              const r = selectedTxnForReceipt || {
                receiptId: activeSession.receiptId,
                farmerName: activeSession.farmerName,
                farmerId: activeSession.farmerId,
                crop: activeSession.declaredCrop,
                netWeightQtl: activeSession.netWeightQtl,
                mspRate: activeSession.mspRatePerQtl,
                finalPayable: activeSession.finalPayable,
                centre: 'PC-BNK-001 (Siliguri)',
                date: '18-09-2026'
              };

              return (
                <div className="space-y-2 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-slate-500">Receipt No:</span>
                    <span className="font-black text-emerald-800">{r.receiptId}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-slate-500">Farmer Name:</span>
                    <span className="font-bold text-slate-900">{r.farmerName} ({r.farmerId})</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-slate-500">Procurement Centre:</span>
                    <span className="font-bold text-slate-900">{r.centre || 'PC-BNK-001'}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-slate-500">Procured Crop:</span>
                    <span className="font-bold text-slate-900">{trCrop(r.crop)}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-slate-500">Net Grain Weight:</span>
                    <span className="font-black text-slate-900">{r.netWeightQtl} Quintals</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-slate-500">MSP Rate:</span>
                    <span className="font-bold text-emerald-800">₹{r.mspRate} / Qtl</span>
                  </div>
                  <div className="flex justify-between pt-2 text-sm font-black text-emerald-800 border-t-2 border-slate-900">
                    <span>TOTAL PAYABLE:</span>
                    <span>₹{r.finalPayable.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              );
            })()}

            <div className="flex gap-2">
              <button
                onClick={() => {
                  window.print();
                  showToast('Official receipt printed successfully.');
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs cursor-pointer uppercase"
              >
                {at('btnPrintReceipt')}
              </button>
              <button
                onClick={() => {
                  setShowReceiptModal(false);
                  setSelectedTxnForReceipt(null);
                }}
                className="py-2.5 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs cursor-pointer"
              >
                {at('btnCloseReceipt')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}