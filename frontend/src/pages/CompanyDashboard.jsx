import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { farmerRulebookData } from '../data/farmerRulebookData';
import {
  LayoutDashboard,
  Users,
  Building,
  UserCheck,
  Sprout,
  Calendar,
  BookOpen,
  Clock,
  ShoppingBag,
  CreditCard,
  AlertTriangle,
  Bell,
  Activity,
  FileSpreadsheet,
  FileText,
  Settings,
  Search,
  PlusCircle,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Upload,
  Lock,
  LogOut,
  ChevronRight,
  Sparkles,
  Printer,
  BarChart3,
  Sliders,
  Check,
  Globe,
  X,
  Scale,
  RefreshCw,
  Download,
  Eye,
  Filter,
  ArrowUpRight,
  AlertOctagon,
  FileCheck,
  ShieldAlert,
  Zap,
  DollarSign
} from 'lucide-react';

// =========================================================================
// COMPLETE MULTI-LANGUAGE TRANSLATION DICTIONARY FOR GOVT DASHBOARD
// =========================================================================
const govtDict = {
  // Header Bar
  portalTitle: {
    en: 'AGRISETU — ADMIN MASTER CONTROL CENTER',
    bn: 'কৃষিসেতু — অ্যাডমিন মাস্টার কন্ট্রোল সেন্টার',
    hi: 'कृषिसेतु — एडमिन मास्टर कंट्रोल सेंटर'
  },
  portalSub: {
    en: 'Food Corporation of India & State Department Procurement Control • 17 SEPT 2026',
    bn: 'ফুড কর্পোরেশন অব ইন্ডিয়া ও রাজ্য খাদ্য দপ্তর সংগ্রহ নিয়ন্ত্রণ • ১৭ সেপ্টেম্বর ২০২৬',
    hi: 'भारतीय खाद्य निगम एवं राज्य खाद्य विभाग खरीद नियंत्रण • 17 सितंबर 2026'
  },
  adminRoleBadge: {
    en: 'Admin: ADM001 (Super Admin)',
    bn: 'অ্যাডমিন: ADM001 (সুপার অ্যাডমিন)',
    hi: 'एडमिन: ADM001 (सुपर एडमिन)'
  },
  logout: {
    en: 'Logout',
    bn: 'লগ আউট',
    hi: 'लॉग आउट'
  },

  // Sidebar Menu Items & Categories
  systemDashboard: {
    en: 'System Dashboard',
    bn: 'সিস্টেম ড্যাশবোর্ড',
    hi: 'सिस्टम डैशबोर्ड'
  },
  catAdmin: {
    en: '🏛️ ADMINISTRATION',
    bn: '🏛️ প্রশাসনিক ক্ষেত্র',
    hi: '🏛️ प्रशासनिक क्षेत्र'
  },
  farmerMgmt: {
    en: 'Farmer Management',
    bn: 'কৃষক ব্যবস্থাপনা',
    hi: 'किसान प्रबंधन'
  },
  procCentres: {
    en: 'Procurement Centres',
    bn: 'সংগ্রহ কেন্দ্রসমূহ',
    hi: 'खरीद केंद्र'
  },
  staffRoles: {
    en: 'Staff & User Roles',
    bn: 'কর্মী ও ভূমিকা (RBAC)',
    hi: 'कर्मचारी व भूमिकाएं'
  },
  cropRegistry: {
    en: 'Crop Registry',
    bn: 'ফসল রেজিস্ট্রি',
    hi: 'फसल रजिस्ट्री'
  },
  seasonMgmt: {
    en: 'Season Management',
    bn: 'মৌসুম ব্যবস্থাপনা',
    hi: 'सीजन प्रबंधन'
  },
  catGovernance: {
    en: '⚖️ GOVERNANCE & POLICY',
    bn: '⚖️ শাসন ও নীতি',
    hi: '⚖️ शासन एवं नीति'
  },
  mspPolicy: {
    en: 'MSP & Policy Rates',
    bn: 'এমএসপি ও সরকারি দর',
    hi: 'एमएसपी व सरकारी दरें'
  },
  rulebookCalc: {
    en: 'Rulebook & Quality Calculator',
    bn: 'রুলবুক ও মান ক্যালকুলেটর',
    hi: 'नियम पुस्तिका व गुणवत्ता कैलकुलेटर'
  },
  bookingsSlots: {
    en: 'Bookings & Slots',
    bn: 'বুকিং ও সময় স্লট',
    hi: 'बुकिंग एवं स्लॉट'
  },
  paymentCtrl: {
    en: 'Payment Control',
    bn: 'পেমেন্ট নিয়ন্ত্রণ',
    hi: 'भुगतान नियंत्रण'
  },
  grievanceCentre: {
    en: 'Grievance Centre',
    bn: 'অভিযোগ কেন্দ্র',
    hi: 'शिकायत निवारण केंद्र'
  },
  catAudit: {
    en: '📊 AUDIT & SYSTEM',
    bn: '📊 রিপোর্ট ও সিস্টেম',
    hi: '📊 रिपोर्ट्स एवं सिस्टम'
  },
  reportsAnalytics: {
    en: 'Reports & Analytics',
    bn: 'রিপোর্ট ও বিশ্লেষণ',
    hi: 'रिपोर्ट्स एवं विश्लेषण'
  },
  systemSettings: {
    en: 'System Settings',
    bn: 'সিস্টেম সেটিংস',
    hi: 'सिस्टम सेटिंग्स'
  },

  // View 1: System Overview & KPIs
  overviewTitle: {
    en: 'SYSTEM OVERVIEW & NATIONAL PROCUREMENT SUMMARY',
    bn: 'সিস্টেম সারসংক্ষেপ ও জাতীয় সংগ্রহ সমাহার',
    hi: 'सिस्टम अवलोकन एवं राष्ट्रीय खरीद सारांश'
  },
  overviewSub: {
    en: 'Live Feed from 1,193 Active Procurement Centres across All Districts • Crops Restricted to Paddy & Wheat',
    bn: 'সমস্ত জেলার ১,১৯৩ টি সক্রিয় কেন্দ্র থেকে সরাসরি তথ্য • ফসল কেবল ধান ও গমে সীমাবদ্ধ',
    hi: 'सभी जिलों के 1,193 सक्रिय खरीद केंद्रों से लाइव फीड • फसलें केवल धान और गेहूं तक सीमित'
  },
  manageMspBtn: {
    en: '[ Manage MSP ]',
    bn: '[ এমএসপি ব্যবস্থাপনা ]',
    hi: '[ एमएसपी प्रबंधन ]'
  },
  manageCentresBtn: {
    en: '[ Manage Centres ]',
    bn: '[ কেন্দ্র ব্যবস্থাপনা ]',
    hi: '[ केंद्र प्रबंधन ]'
  },
  kpiRegFarmers: {
    en: 'REGISTERED FARMERS',
    bn: 'নিবন্ধিত কৃষক',
    hi: 'पंजीकृत किसान'
  },
  kpiSeasonIncrease: {
    en: '+2,184 this season',
    bn: '+২,১৮৪ এই মৌসুমে',
    hi: '+2,184 इस सीजन'
  },
  kpiActiveCentres: {
    en: 'ACTIVE CENTRES',
    bn: 'সক্রিয় কেন্দ্রসমূহ',
    hi: 'सक्रिय खरीद केंद्र'
  },
  kpiCentresSub: {
    en: '37 Limited • 18 Closed',
    bn: '৩৭ সীমিত • ১৮ বন্ধ',
    hi: '37 सीमित • 18 बंद'
  },
  kpiTodaysBookings: {
    en: "TODAY'S BOOKINGS",
    bn: 'আজকের বুকিং',
    hi: 'आज की बुकिंग'
  },
  kpiConfirmedSub: {
    en: 'Confirmed: 17,842',
    bn: 'নিশ্চিত: ১৭,৮৪২',
    hi: 'पुष्ट: 17,842'
  },
  kpiTotalProcured: {
    en: 'TOTAL PROCURED',
    bn: 'মোট সংগৃহীত',
    hi: 'कुल खरीद'
  },
  kpiProcuredSub: {
    en: '64% of 20 L Target',
    bn: '২০ লক্ষ লক্ষ্যের ৬৪%',
    hi: '20 लाख लक्ष्य का 64%'
  },
  kpiQualityAcceptance: {
    en: 'QUALITY ACCEPTANCE',
    bn: 'গুণমান গ্রহণযোগ্যতা',
    hi: 'गुणवत्ता स्वीकार्यता'
  },
  kpiAcceptedClean: {
    en: 'Accepted Clean',
    bn: 'মানদণ্ডে গৃহীত',
    hi: 'मानक पर स्वीकृत'
  },
  kpiPaymentValue: {
    en: 'PAYMENT VALUE',
    bn: 'পেমেন্টের মোট মূল্য',
    hi: 'भुगतान मूल्य'
  },
  kpiCreditedSub: {
    en: '91.4% Credited',
    bn: '৯১.৪% জমা হয়েছে',
    hi: '91.4% जमा हुआ'
  },
  kpiOpenComplaints: {
    en: 'OPEN COMPLAINTS',
    bn: 'অমীমাংসিত অভিযোগ',
    hi: 'खुली शिकायतें'
  },
  kpiEscalatedSub: {
    en: '234 Escalated',
    bn: '২৩৪ টি উর্ধ্বতন স্তরে',
    hi: '234 उच्च स्तर पर'
  },
  kpiSystemHealth: {
    en: 'SYSTEM HEALTH',
    bn: 'সিস্টেমের স্বাস্থ্য',
    hi: 'सिस्टम स्वास्थ्य'
  },
  kpiHealthSub: {
    en: 'All Services Operational',
    bn: 'সমস্ত পরিষেবা সচল',
    hi: 'सभी सेवाएं संचालित'
  },
  targetTitle: {
    en: '📊 KHARIF 2026 PROCUREMENT TARGET PROGRESS',
    bn: '📊 খরিফ ২০২৬ সংগ্রহ লক্ষ্যমাত্রা অগ্রগতি',
    hi: '📊 खरीफ 2026 खरीद लक्ष्य प्रगति'
  },
  targetMet: {
    en: '64% Target Met',
    bn: '৬৪% লক্ষ্য অর্জিত',
    hi: '64% लक्ष्य प्राप्त'
  },
  targetLabel: {
    en: 'Target: 20.00 Lakh Qtl',
    bn: 'লক্ষ্য: ২০.০০ লক্ষ কুইন্টাল',
    hi: 'लक्ष्य: 20.00 लाख क्विंटल'
  },
  procuredLabel: {
    en: 'Procured: 12.84 Lakh Qtl',
    bn: 'সংগৃহীত: ১২.৮৪ লক্ষ কুইন্টাল',
    hi: 'खरीद: 12.84 लाख क्विंटल'
  },
  alertsTitle: {
    en: 'REAL-TIME SYSTEM ALERTS',
    bn: 'সরাসরি সিস্টেম সতর্কতা বার্তা',
    hi: 'रियल-टाइम सिस्टम अलर्ट'
  },
  alertsActionReq: {
    en: '3 Action Required',
    bn: '৩ টি ব্যবস্থা প্রয়োজন',
    hi: '3 कार्रवाई आवश्यक'
  },
  alert1Text: {
    en: '🔴 CRITICAL: Centre C103 queue wait > 45 min',
    bn: '🔴 জরুরি: C103 কেন্দ্রে অপেক্ষার সময় > ৪৫ মিনিট',
    hi: '🔴 गंभीर: केंद्र C103 पर प्रतीक्षा समय > 45 मिनट'
  },
  alert2Text: {
    en: '🟠 HIGH: Centre C103 rejection rate 7.1% (abnormal)',
    bn: '🟠 উচ্চ: C103 কেন্দ্রে প্রত্যাখ্যানের হার ৭.১% (অস্বাভাবিক)',
    hi: '🟠 उच्च: केंद्र C103 पर अस्वीकृति दर 7.1% (असामान्य)'
  },
  alert3Text: {
    en: '🟡 MEDIUM: 23 unresolved complaints approaching SLA limit',
    bn: '🟡 মাঝারি: ২৩ টি অভিযোগের সময়সীমা (SLA) উত্তীর্ণের পথে',
    hi: '🟡 मध्यम: 23 शिकायतें SLA सीमा के करीब हैं'
  },
  resolveBtn: { en: 'Resolve', bn: 'মীমাংসা', hi: 'समाधान' },
  auditBtn: { en: 'Audit', bn: 'নিরীক্ষা', hi: 'ऑडिट' },
  viewBtn: { en: 'View', bn: 'দেখুন', hi: 'देखें' },

  // View 2: Farmer Management
  farmerTitle: {
    en: '👨‍🌾 FARMER MANAGEMENT & LAND PARCHA DIRECTORY',
    bn: '👨‍🌾 কৃষক ব্যবস্থাপনা ও খতিয়ান পর্চা ডিরেক্টরি',
    hi: '👨‍🌾 किसान प्रबंधन एवं भूमि पर्चा निर्देशिका'
  },
  farmerSub: {
    en: 'Verify land details, crop eligibility, and maximum quintal quotas based on Parcha records.',
    bn: 'পর্চার তথ্য যাচাই করে জমির পরিমাণ, ফসল ও কুইন্টাল কোটা নির্ধারণ করুন।',
    hi: 'पर्चा रिकॉर्ड के आधार पर भूमि विवरण, फसल पात्रता और क्विंटल कोटा सत्यापित करें।'
  },
  searchFarmerPlaceholder: {
    en: 'Search Farmer ID / Mobile / Parcha...',
    bn: 'কৃষক আইডি / মোবাইল / পর্চা খুঁজুন...',
    hi: 'किसान आईडी / मोबाइल / पर्चा खोजें...'
  },
  thFarmerId: { en: 'Farmer ID', bn: 'কৃষক আইডি', hi: 'किसान आईडी' },
  thFullName: { en: 'Full Name', bn: 'পুরো নাম', hi: 'पूरा नाम' },
  thDistrict: { en: 'District', bn: 'জেলা', hi: 'जिला' },
  thParchaRef: { en: 'Parcha Ref No.', bn: 'পর্চা রেফারেন্স নং', hi: 'पर्चा संदर्भ संख्या' },
  thLandArea: { en: 'Land Area', bn: 'জমির পরিমাণ', hi: 'भूमि क्षेत्र' },
  thQuotaQtl: { en: 'Quota (Qtl)', bn: 'কোটা (কুইন্টাল)', hi: 'कोटा (क्विंटल)' },
  thCrops: { en: 'Crops', bn: 'নিবন্ধিত ফসল', hi: 'फसलें' },
  thStatus: { en: 'Status', bn: 'অবস্থা', hi: 'स्थिति' },
  thActions: { en: 'Actions', bn: 'পদক্ষেপ', hi: 'कार्रवाई' },
  btnViewParcha: { en: 'View Parcha', bn: 'পর্চা দেখুন', hi: 'पर्चा देखें' },

  // View 3: Procurement Centres
  centresTitle: {
    en: '🏛️ PROCUREMENT CENTRES DIRECTORY & OPERATIONAL STATUS',
    bn: '🏛️ ধান/গম সংগ্রহ কেন্দ্র ও পরিচালনা স্থিতি',
    hi: '🏛️ खरीद केंद्र निर्देशिका एवं परिचालन स्थिति'
  },
  centresSub: {
    en: 'Manage mandi yards, monitoring daily intake capacities, rejection ratios, and supervisor assignments.',
    bn: 'সংগ্রহ কেন্দ্র পরিচালনা, দৈনিক ক্ষমতা, প্রত্যাখ্যানের হার ও সুপারভাইজার তত্ত্বাবধান করুন।',
    hi: 'मंडी यार्ड प्रबंधित करें, दैनिक क्षमता, अस्वीकृति दर और पर्यवेक्षक आवंटन की निगरानी करें।'
  },
  optAllStatuses: { en: 'All Statuses', bn: 'সব অবস্থা', hi: 'सभी स्थितियां' },
  btnRegisterYard: { en: '+ Register New Yard', bn: '+ নতুন কেন্দ্র নিবন্ধন', hi: '+ नया यार्ड पंजीकृत करें' },
  thCentreCode: { en: 'Centre Code', bn: 'কেন্দ্র কোড', hi: 'केंद्र कोड' },
  thYardName: { en: 'Procurement Yard Name', bn: 'সংগ্রহ কেন্দ্রের নাম', hi: 'खरीद केंद्र का नाम' },
  thIntakeTarget: { en: 'Daily Intake vs Target', bn: 'দৈনিক সংগ্রহ ও লক্ষ্য', hi: 'दैनिक खरीद व लक्ष्य' },
  thRejectionRate: { en: 'Rejection Rate', bn: 'প্রত্যাখ্যানের হার', hi: 'अस्वीकृति दर' },
  thAvgQueueTime: { en: 'Avg Queue Time', bn: 'গড় অপেক্ষার সময়', hi: 'औसत प्रतीक्षा समय' },
  thSupervisor: { en: 'In-Charge Supervisor', bn: 'দায়িত্বরত সুপারভাইজার', hi: 'प्रभारी पर्यवेक्षक' },
  btnToggleStatus: { en: 'Toggle Status', bn: 'স্ট্যাটাস পরিবর্তন', hi: 'स्थिति बदलें' },

  // View 4: Staff & RBAC
  staffTitle: {
    en: '👤 STAFF DIRECTORY & ROLE-BASED ACCESS CONTROL (RBAC)',
    bn: '👤 কর্মী ডিরেক্টরি ও ভূমিকা-ভিত্তিক প্রবেশাধিকার (RBAC)',
    hi: '👤 कर्मचारी निर्देशिका एवं भूमिका-आधारित पहुंच नियंत्रण (RBAC)'
  },
  staffSub: {
    en: 'Enforce strict administrative permissions across Super Admin, Admin, Supervisor, Agent, and Auditor roles.',
    bn: 'সুপার অ্যাডমিন, অ্যাডমিন, সুপারভাইজার, এজেন্ট ও অডিটরদের সুনির্দিষ্ট অনুমতি বলবৎ রাখুন।',
    hi: 'सुपर एडमिन, एडमिन, सुपरवाइजर, एजेंट और ऑडिटर भूमिकाओं के लिए सख्त प्रशासनिक अनुमतियां लागू करें।'
  },
  agentNoticeTitle: {
    en: 'SECURITY POLICY: AGENT ROLE RESTRICTIONS ENFORCED',
    bn: 'নিরাপত্তা নীতি: এজেন্টদের সীমিত ক্ষমতা বলবৎ',
    hi: 'सुरक्षा नीति: एजेंट भूमिका प्रतिबंध लागू'
  },
  agentNoticeText: {
    en: 'Field Agents are strictly prohibited from modifying MSP rates, deleting transaction logs, creating user accounts, or updating farmer bank payout details. All sensitive overrides require Supervisor PIN authorization.',
    bn: 'ফিল্ড এজেন্টদের এমএসপি হার সংশোধন, লেনদেনের হিসেব মোছা, নতুন অ্যাকাউন্ট তৈরি বা ব্যাংক তথ্য পরিবর্তন করার কোনো অনুমতি নেই। সমস্ত পরিবর্তন সুপারভাইজার পিন দ্বারা অনুমোদিত হতে হবে।',
    hi: 'फील्ड एजेंटों को एमएसपी दरें संशोधित करने, लेनदेन हटाने, नए खाते बनाने या बैंक विवरण अपडेट करने की अनुमति नहीं है। सभी संवेदनशील ओवरराइड पर्यवेक्षक पिन द्वारा अधिकृत हैं।'
  },
  thStaffId: { en: 'Staff ID', bn: 'কর্মী আইডি', hi: 'कर्मचारी आईडी' },
  thAssignedRole: { en: 'Assigned Role', bn: 'নির্ধারিত ভূমিকা', hi: 'आवंटित भूमिका' },
  thDeptYard: { en: 'Department / Yard', bn: 'বিভাগ / কেন্দ্র', hi: 'विभाग / यार्ड' },
  thPermissionScope: { en: 'Permission Scope', bn: 'অনুমতির পরিসীমা', hi: 'अनुमति दायरा' },

  // View 5: Crop Registry
  cropsTitle: {
    en: '🌾 MASTER CROP REGISTRY & QUALITY SPECIFICATIONS',
    bn: '🌾 মাস্টার ফসল রেজিস্ট্রি ও গুণমানের নির্দেশিকা',
    hi: '🌾 मास्टर फसल रजिस्ट्री एवं गुणवत्ता विनिर्देश'
  },
  cropsSub: {
    en: 'Strict System Constraint: Only Paddy and Wheat crops are registered and permitted for government procurement.',
    bn: 'কঠোর নিয়ম: সরকারি সংগ্রহের জন্য কেবল ধান এবং গম ফসলই নিবন্ধিত ও অনুমোদিত।',
    hi: 'सख्त नियम: सरकारी खरीद के लिए केवल धान और गेहूं की फसलें पंजीकृत और अनुमत हैं।'
  },
  thCropCode: { en: 'Crop Code', bn: 'ফসল কোড', hi: 'फसल कोड' },
  thCropName: { en: 'Crop Name & Variety', bn: 'ফসলের নাম ও জাত', hi: 'फसल का नाम व किस्म' },
  thCategory: { en: 'Category', bn: 'শ্রেণী', hi: 'श्रेणी' },
  thMaxMoisture: { en: 'Max Moisture Limit', bn: 'সর্বোচ্চ আর্দ্রতার সীমা', hi: 'अधिकतम नमी सीमा' },
  thMaxForeign: { en: 'Max Foreign Matter', bn: 'সর্বোচ্চ অপদ্রব্য', hi: 'अधिकतम बाह्य पदार्थ' },
  thMaxDamaged: { en: 'Max Damaged Grains', bn: 'সর্বোচ্চ ক্ষতিগ্রস্ত দানা', hi: 'अधिकतम क्षतिग्रस्त दाने' },
  thCurrentMsp: { en: 'Current MSP Rate', bn: 'বর্তমান এমএসপি দর', hi: 'वर्तमान एमएसपी दर' },

  // View 6: Season Management
  seasonsTitle: {
    en: '📅 SEASON MASTER & PROCUREMENT LIFECYCLE MANAGER',
    bn: '📅 মৌসুম মাস্টার ও সংগ্রহ জীবনচক্র ব্যবস্থাপনা',
    hi: '📅 सीजन मास्टर एवं खरीद जीवनचक्र प्रबंधक'
  },
  seasonsSub: {
    en: 'Manage Kharif and Rabi procurement cycles across lifecycle states: DRAFT → UPCOMING → ACTIVE → CLOSING → CLOSED → ARCHIVED.',
    bn: 'খরিফ ও রবি সংগ্রহের জীবনচক্রের বিভিন্ন ধাপ পরিচালনা করুন: খসড়া → আসন্ন → সক্রিয় → সমাপ্তি → বন্ধ → আর্কাইভড।',
    hi: 'खरीफ और रबी खरीद चक्रों को विभिन्न चरणों में प्रबंधित करें: ड्राफ्ट → आगामी → सक्रिय → समापन → बंद → संग्रहीत।'
  },
  thSeasonId: { en: 'Season ID', bn: 'মৌসুম আইডি', hi: 'सीजन आईडी' },
  thSeasonName: { en: 'Season Name', bn: 'মৌসুমের নাম', hi: 'सीजन का नाम' },
  thLifecycleStage: { en: 'Lifecycle Stage', bn: 'জীবনচক্রের ধাপ', hi: 'जीवनचक्र चरण' },
  thStartDate: { en: 'Start Date', bn: 'শুরুর তারিখ', hi: 'प्रारंभ तिथि' },
  thEndDate: { en: 'End Date', bn: 'শেষের তারিখ', hi: 'समाप्ति तिथि' },
  thTargetVsAchieved: { en: 'Target vs Achieved', bn: 'লক্ষ্য বনাম অর্জিত', hi: 'लक्ष्य बनाम प्राप्त' },
  btnConfigure: { en: 'Configure', bn: 'কনফিগার', hi: 'कॉन्फ़िगर' },

  // View 7: MSP Management
  mspTitle: {
    en: '🏛️ OFFICIAL MSP & MINIMUM SUPPORT PRICE MANAGEMENT',
    bn: '🏛️ সরকারি এমএসপি (সর্বনিম্ন সহায়ক মূল্য) ব্যবস্থাপনা',
    hi: '🏛️ आधिकारिक एमएसपी (न्यूनतम समर्थन मूल्य) प्रबंधन'
  },
  mspSub: {
    en: 'Controlled module for CCEA published policy rates across Paddy & Wheat',
    bn: 'ধান ও গমের জন্য সিসিইএ প্রকাশিত সরকারি সর্বনিম্ন দর নিয়ন্ত্রণ ব্যবস্থা',
    hi: 'धान और गेहूं के लिए सीसीईए द्वारा प्रकाशित सरकारी दरों का नियंत्रण मॉड्यूल'
  },
  btnAddMsp: { en: '+ ADD NEW MSP RATE', bn: '+ নতুন এমএসপি দর যোগ করুন', hi: '+ नया एमएसपी दर जोड़ें' },
  thCropVariety: { en: 'Crop Variety', bn: 'ফসলের জাত', hi: 'फसल की किस्म' },
  thMarketingSeason: { en: 'Marketing Season', bn: 'বিক্রয় মৌসুম', hi: 'विपणन सीजन' },
  thMspRate: { en: 'MSP Rate (₹/Qtl)', bn: 'এমএসপি দর (টাকা/কুইন্টাল)', hi: 'एमएसपी दर (₹/क्विंटल)' },
  thGovtRef: { en: 'Government Order / Reference', bn: 'সরকারি নির্দেশিকা / রেফারেন্স', hi: 'सरकारी आदेश / संदर्भ' },

  // View 8: Quality Calculator
  calcTitle: {
    en: '🧮 INTERACTIVE FAQ QUALITY GRADING & DEDUCTION CALCULATOR',
    bn: '🧮 স্বয়ংক্রিয় এফএকিউ মান নির্ধারণ ও মূল্য হ্রাস ক্যালকুলেটর',
    hi: '🧮 स्वचालित एफएक्यू गुणवत्ता ग्रेडिंग और कटौती कैलकुलेटर'
  },
  calcSub: {
    en: 'Input moisture and impurity test parameters to immediately compute FAQ grade, price discount, and final payout per quintal.',
    bn: 'আর্দ্রতা ও খড়কুটোর পরিমাণ দিয়ে তাত্ক্ষণিকভাবে গ্রেড, মূল্য কাটছাঁট ও চূড়ান্ত প্রদেয় টাকা গণনা করুন।',
    hi: 'नमी और अशुद्धता परीक्षण मापदंड दर्ज करके तुरंत एफएक्यू ग्रेड, छूट और अंतिम देय दर की गणना करें।'
  },
  boxInputTitle: { en: 'QUALITY PARAMETERS INPUT', bn: 'গুণমান পরীক্ষার ইনপুট', hi: 'गुणवत्ता परीक्षण इनपुट' },
  lblSelectCrop: { en: 'Select Crop:', bn: 'ফসল নির্বাচন করুন:', hi: 'फसल चुनें:' },
  lblMoisture: { en: 'Moisture Content (%):', bn: 'আর্দ্রতার পরিমাণ (%):', hi: 'नमी की मात्रा (%):' },
  lblForeign: { en: 'Foreign Matter (%):', bn: 'অপদ্রব্য / খড়কুটো (%):', hi: 'बाह्य पदार्थ (%):' },
  lblDamaged: { en: 'Damaged / Discolored Grains (%):', bn: 'ক্ষতিগ্রস্ত/বিবর্ণ দানা (%):', hi: 'क्षतिग्रस्त/क्षतिग्रस्त दाने (%):' },
  boxOutputTitle: { en: 'CALCULATED QUALITY EVALUATION OUTPUT', bn: 'গুণমান মূল্যায়নের ফলাফল', hi: 'गुणवत्ता मूल्यांकन परिणाम' },
  lblAssessedGrade: { en: 'Assessed Quality Grade:', bn: 'মূল্যায়নকৃত মান / গ্রেড:', hi: 'मूल्यांकित गुणवत्ता ग्रेड:' },
  lblBaseMsp: { en: 'Base MSP Price:', bn: 'মূল এমএসপি মূল্য:', hi: 'मूल एमएसपी मूल्य:' },
  lblDeduction: { en: 'Moisture Deduction / Discount:', bn: 'আর্দ্রতার জন্য মূল্য হ্রাস:', hi: 'नमी कटौती / छूट:' },
  lblNetPayable: { en: 'NET PAYABLE RATE:', bn: 'নিট প্রদেয় মূল্য:', hi: 'शुद्ध देय दर:' },
  lblDecision: { en: 'DECISION:', bn: 'সিদ্ধান্ত:', hi: 'निर्णय:' },

  // View 9: Bookings & Slots
  slotsTitle: {
    en: '⏱️ LIVE BOOKINGS & SLOT CONTROL ROOM (TOKENS T-001 TO T-010)',
    bn: '⏱️ সরাসরি বুকিং ও সময় স্লট নিয়ন্ত্রণ কক্ষ (টোকেন T-001 থেকে T-010)',
    hi: '⏱️ लाइव बुकिंग एवं स्लॉट नियंत्रण कक्ष (टोकन T-001 से T-010)'
  },
  slotsSub: {
    en: 'Real-time token status progression: DONE → SERVING → WAITING → CANCELLED.',
    bn: 'টোকেনের লাইভ স্থিতি: সমাপ্ত → প্রদানরত → অপেক্ষারত → বাতিল।',
    hi: 'वास्तविक समय टोकन स्थिति: पूर्ण → सेवा में → प्रतीक्षा में → रद्द।'
  },
  badgeServing: { en: 'Serving Token: T-003', bn: 'বর্তমান টোকেন: T-003', hi: 'वर्तमान टोकन: T-003' },
  badgeWaiting: { en: 'Waiting Queue: 7 Farmers', bn: 'অপেক্ষারত: ৭ জন কৃষক', hi: 'प्रतीक्षा कतार: 7 किसान' },
  thTokenNo: { en: 'Token No.', bn: 'টোকেন নং', hi: 'टोकन सं.' },
  thFarmerName: { en: 'Farmer Name', bn: 'কৃষকের নাম', hi: 'किसान का नाम' },
  thCrop: { en: 'Crop', bn: 'ফসল', hi: 'फसल' },
  thWeightQtl: { en: 'Weight (Qtl)', bn: 'ওজন (কুইন্টাল)', hi: 'वजन (क्विंटल)' },
  thSlotWindow: { en: 'Slot Time Window', bn: 'স্লটের সময়সীমা', hi: 'स्लॉट समय सीमा' },
  thAssignedYard: { en: 'Assigned Yard', bn: 'নির্দিষ্ট কেন্দ্র', hi: 'आवंटित यार्ड' },
  thTokenStatus: { en: 'Token Status', bn: 'টোকেনের অবস্থা', hi: 'टोकन स्थिति' },

  // View 10: Payment Control
  paymentTitle: {
    en: '💳 PAYMENT PIPELINE & DISBURSEMENT CONTROL',
    bn: '💳 পেমেন্ট পাইপলাইন ও অর্থ প্রদান নিয়ন্ত্রণ',
    hi: '💳 भुगतान पाइपलाइन एवं संवितरण नियंत्रण'
  },
  paymentSub: {
    en: 'Pipeline: Pending Advice → PFMS Processing → Bank Clearing → Credited to Farmer Account.',
    bn: 'ধাপসমূহ: নির্দেশিকা অপেক্ষারত → PFMS প্রসেসিং → ব্যাংক ক্লিয়ারিং → কৃষক অ্যাকাউন্টে জমা।',
    hi: 'चरण: सलाह लंबित → पीएफएमएस प्रसंस्करण → बैंक समाशोधन → किसान खाते में जमा।'
  },
  badgeTotalDisbursed: {
    en: 'Total Disbursed: ₹342.8 Crore (91.4%)',
    bn: 'মোট স্থানান্তরিত: ৩৪২.৮ কোটি টাকা (৯১.৪%)',
    hi: 'कुल संवितरित: ₹342.8 करोड़ (91.4%)'
  },
  thPaymentId: { en: 'Payment ID', bn: 'পেমেন্ট আইডি', hi: 'भुगतान आईडी' },
  thPayoutValue: { en: 'Payout Value', bn: 'প্রদেয় মূল্য', hi: 'भुगतान राशि' },
  thPfmsRef: { en: 'PFMS Reference', bn: 'পিএফএমএস রেফারেন্স', hi: 'पीएफएमएस संदर्भ' },
  thDestBank: { en: 'Destination Bank', bn: 'গন্তব্য ব্যাংক', hi: 'गंतव्य बैंक' },
  thPipelineStatus: { en: 'Pipeline Status', bn: 'পাইপলাইন অবস্থা', hi: 'पाइपलाइन स्थिति' },
  btnRetryAdvice: { en: 'Retry Advice', bn: 'পুনরায় চেষ্টা করুন', hi: 'पुनः प्रयास करें' },

  // View 11: Grievance Centre
  grievanceTitle: {
    en: '🚨 NATIONAL GRIEVANCE & COMPLAINT CONTROL CENTRE',
    bn: '🚨 জাতীয় অভিযোগ ও সমস্যার সমাধান কেন্দ্র',
    hi: '🚨 राष्ट्रीय शिकायत एवं निवारण नियंत्रण केंद्र'
  },
  grievanceSub: {
    en: 'SLA Resolution timers & escalation hierarchy to District Nodal Officers.',
    bn: 'সময়সীমা (SLA) কাউন্টডাউন ও জেলা নোডাল কর্মকর্তাদের কাছে পাঠানোর ব্যবস্থা।',
    hi: 'एसएलए समाधान टाइमर और जिला नोडल अधिकारियों को भेजने की व्यवस्था।'
  },
  cardFiled: { en: 'Total Filed:', bn: 'মোট দায়েরকৃত:', hi: 'कुल दर्ज:' },
  cardOpen: { en: 'Open Complaints:', bn: 'অমীমাংসিত অভিযোগ:', hi: 'खुली शिकायतें:' },
  cardEscalated: { en: 'Escalated:', bn: 'উর্ধ্বতন স্তরে প্রেরণ:', hi: 'उच्च स्तर पर प्रेषित:' },
  cardResolved: { en: 'Resolved:', bn: 'মীমাংসিত:', hi: 'समाधान किया गया:' },
  thTicketId: { en: 'Ticket ID', bn: 'টিকিট আইডি', hi: 'टिकट आईडी' },
  thComplainant: { en: 'Complainant', bn: 'অভিযোগকারী', hi: 'शिकायतकर्ता' },
  thPriority: { en: 'Priority', bn: 'অগ্রাধিকার', hi: 'प्राथमिकता' },
  thSlaCountdown: { en: 'SLA Countdown', bn: 'এসএলএ বাকি সময়', hi: 'एसएलए उलटी गिनती' },
  btnEscalate: { en: 'Escalate', bn: 'উর্ধ্বতন স্থানে পাঠান', hi: 'उच्च स्तर पर भेजें' },

  // View 12: Reports & Analytics
  reportsTitle: {
    en: '📊 REPORTS & ANALYTICS WORKBENCH',
    bn: '📊 রিপোর্ট ও পরিসংখ্যান বিশ্লেষণ ওয়ার্কবেঞ্চ',
    hi: '📊 रिपोर्ट्स एवं विश्लेषण वर्कबेंच'
  },
  reportsSub: {
    en: 'Generate, inspect, and export comprehensive daily procurement, quality, and financial logs.',
    bn: 'দৈনিক সংগ্রহ, গুণমান ও আর্থিক লেনদেনের সামগ্রিক রিপোর্ট ও ফাইল ডাউনলোড করুন।',
    hi: 'व्यापक दैनिक खरीद, गुणवत्ता और वित्तीय लॉग उत्पन्न करें, निरीक्षण करें और निर्यात करें।'
  },
  btnExportPdf: { en: 'Export PDF', bn: 'পিডিএফ ডাউনলোড', hi: 'पीडीएफ डाउनलोड' },
  btnExportExcel: { en: 'Export Excel', bn: 'এক্সেল ডাউনলোড', hi: 'एक्सेल डाउनलोड' },
  lblDateRange: { en: 'Season / Date Range:', bn: 'মৌসুম / সময়সীমা:', hi: 'सीजन / तारीख सीमा:' },
  lblYardSelect: { en: 'Procurement Yard:', bn: 'সংগ্রহ কেন্দ্র:', hi: 'खरीद यार्ड:' },
  lblTargetCrop: { en: 'Target Crop:', bn: 'নির্দিষ্ট ফসল:', hi: 'लक्ष्य फसल:' },
  btnApplyFilters: { en: 'Apply Filters', bn: 'ফিল্টার প্রয়োগ করুন', hi: 'फ़िल्टर लागू करें' },
  previewTitle: { en: 'GENERATED REPORT SUMMARY PREVIEW', bn: 'তৈরিকৃত রিপোর্টের পূর্বরূপ', hi: 'उत्पन्न रिपोर्ट सारांश पूर्वावलोकन' },
  lblTotalIntake: { en: 'TOTAL INTAKE', bn: 'মোট সংগ্রহ', hi: 'कुल खरीद' },
  lblTotalPayout: { en: 'TOTAL PAYOUT', bn: 'মোট পরিশোধিত টাকা', hi: 'कुल भुगतान' },
  lblAvgRejection: { en: 'AVG REJECTION RATE', bn: 'গড় প্রত্যাখ্যানের হার', hi: 'औसत अस्वीकृति दर' },
  lblFarmersServed: { en: 'TOTAL FARMERS SERVED', bn: 'মোট উপকৃত কৃষক', hi: 'कुल लाभान्वित किसान' },

  // View 13: System Settings
  settingsTitle: {
    en: '⚙️ SYSTEM SETTINGS & CHANGE APPROVAL QUEUE',
    bn: '⚙️ সিস্টেম সেটিংস ও পরিবর্তন অনুমোদন তালিকা',
    hi: '⚙️ सिस्टम सेटिंग्स एवं परिवर्तन स्वीकृति कतार'
  },
  settingsSub: {
    en: '5 Configuration Groups: General, Procurement Rules, Quality Thresholds, Payment Gateway, Security.',
    bn: '৫ টি কনফিগারেশন দল: সাধারণ, সংগ্রহ নীতি, গুণমান সীমা, পেমেন্ট গেটওয়ে, নিরাপত্তা।',
    hi: '5 कॉन्फ़िगरेशन समूह: सामान्य, खरीद नियम, गुणवत्ता सीमा, भुगतान गेटवे, सुरक्षा।'
  },
  boxSysConfig: { en: 'SYSTEM CONFIGURATION PARAMETERS', bn: 'সিস্টেম কনফিগারেশন প্যারামিটার', hi: 'सिस्टम कॉन्फ़िगरेशन मापदंड' },
  lblMaxQuota: { en: 'Max Daily Farmer Quota Limit (Qtl):', bn: 'সর্বোচ্চ দৈনিক কৃষক কোটা (কুইন্টাল):', hi: 'अधिकतम दैनिक किसान कोटा सीमा (क्विंटल):' },
  lblMoistureLimit: { en: 'Moisture Rejection Hard Limit (%):', bn: 'আর্দ্রতার সর্বোচ্চ অনুমোদনযোগ্য সীমা (%):', hi: 'नमी अस्वीकृति अधिकतम सीमा (%):' },
  lblAutoApprove: { en: 'Auto-Approve Batch Payment Limit (₹ Crore):', bn: 'স্বয়ংক্রিয় ব্যাচ পেমেন্ট অনুমোদন সীমা (কোটি টাকা):', hi: 'स्वचालित बैच भुगतान स्वीकृति सीमा (करोड़ रुपये):' },
  btnSubmitReq: { en: 'Submit Change Request', bn: 'পরিবর্তনের আবেদন জমা দিন', hi: 'परिवर्तन अनुरोध जमा करें' },
  boxPendingAppr: { en: 'PENDING CHANGE REQUEST APPROVALS', bn: 'অনুমোদনের অপেক্ষায় থাকা পরিবর্তনের তালিকা', hi: 'स्वीकृति के लिए लंबित परिवर्तन अनुरोध' },
  btnApprove: { en: 'Approve', bn: 'অনুমোদন করুন', hi: 'स्वीकृत करें' },
  btnReject: { en: 'Reject', bn: 'বাতিল করুন', hi: 'অस्वीकृत करें' },

  // Modals & Common
  modalAddMspTitle: { en: '🏛️ ADD MSP RATE — ADMIN CONTROLLED', bn: '🏛️ নতুন এমএসপি দর যোগ — অ্যাডমিন নিয়ন্ত্রিত', hi: '🏛️ नया एमएसपी दर जोड़ें — एडमिन नियंत्रित' },
  lblGovtRefInput: { en: 'Government Notification Reference:', bn: 'সরকারি বিজ্ঞপ্তির রেফারেন্স নম্বর:', hi: 'सरकारी अधिसूचना संदर्भ:' },
  btnSubmitMsp: { en: '[ SUBMIT FOR APPROVAL ]', bn: '[ অনুমোদনের জন্য জমা দিন ]', hi: '[ स्वीकृति के लिए जमा करें ]' },
  modalAddCentreTitle: { en: '🏛️ REGISTER NEW PROCUREMENT YARD', bn: '🏛️ নতুন ধান/গম সংগ্রহ কেন্দ্র নিবন্ধন', hi: '🏛️ नया खरीद केंद्र पंजीकृत करें' },
  lblYardNameInput: { en: 'Centre Yard Name:', bn: 'সংগ্রহ কেন্দ্রের নাম:', hi: 'खरीद केंद्र का नाम:' },
  lblDailyCapacity: { en: 'Daily Capacity (Quintals):', bn: 'দৈনিক ক্ষমতা (কুইন্টাল):', hi: 'दैनिक क्षमता (क्विंटल):' },
  lblSupervisorInput: { en: 'Assigned Supervisor Name:', bn: 'দায়িত্বরত সুপারভাইজারের নাম:', hi: 'आवंटित पर्यवेक्षक का नाम:' },
  btnRegisterYardSubmit: { en: '[ REGISTER PROCUREMENT YARD ]', bn: '[ কেন্দ্র নিবন্ধিত করুন ]', hi: '[ केंद्र पंजीकृत करें ]' },
  modalParchaTitle: { en: '📜 LAND PARCHA RECORD', bn: '📜 জমিন খতিয়ান পর্চা নথি', hi: '📜 भूमि पर्चा रिकॉर्ड' },
  lblParchaRefNo: { en: 'Parcha Reference:', bn: 'পর্চা রেফারেন্স নম্বর:', hi: 'पर्चा संदर्भ संख्या:' },
  lblTotalHolding: { en: 'Total Land Holding:', bn: 'মোট জমির পরিমাণ:', hi: 'कुल भूमि क्षेत्र:' },
  lblMaxQuotaModal: { en: 'Max Produce Quota:', bn: 'সর্বোচ্চ উৎপাদন কোটা:', hi: 'अधिकतम उत्पादन कोटा:' },
  lblRegCropsModal: { en: 'Registered Crops:', bn: 'নিবন্ধিত ফসলসমূহ:', hi: 'पंजीकृत फसलें:' },
  btnCloseParcha: { en: 'Close Parcha Record', bn: 'পর্চা রেকর্ড বন্ধ করুন', hi: 'पर्चा रिकॉर्ड बंद करें' },
  modalExportTitle: { en: '📥 EXPORT REPORT FILE', bn: '📥 রিপোর্ট ফাইল ডাউনলোড করুন', hi: '📥 रिपोर्ट फाइल निर्यात करें' }
};

export default function CompanyDashboard() {
  const { user, logout } = useContext(AuthContext);
  const { language, setLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();

  // Translation helper function
  const gt = (key) => {
    if (govtDict[key]) {
      return govtDict[key][language] || govtDict[key].en || key;
    }
    return key;
  };

  // Status Badge Translation Helper
  const trStatus = (status) => {
    const map = {
      Active: { en: 'Active', bn: 'সক্রিয়', hi: 'सक्रिय' },
      ACTIVE: { en: 'ACTIVE', bn: 'সক্রিয়', hi: 'सक्रिय' },
      'Pending Verification': { en: 'Pending Verification', bn: 'যাচাইকরণের অপেক্ষায়', hi: 'सत्यापन लंबित' },
      LIMITED: { en: 'LIMITED', bn: 'সীমিত', hi: 'सीमित' },
      MAINTENANCE: { en: 'MAINTENANCE', bn: 'রক্ষণাবেক্ষণ', hi: 'रखरखाव' },
      CLOSED: { en: 'CLOSED', bn: 'বন্ধ', hi: 'बंद' },
      UPCOMING: { en: 'UPCOMING', bn: 'আসন্ন', hi: 'आगामी' },
      Published: { en: 'Published', bn: 'প্রকাশিত', hi: 'प्रकाशित' },
      'Submitted for Approval': { en: 'Submitted for Approval', bn: 'অনুমোদনের অপেক্ষায়', hi: 'स्वीकृति लंबित' },
      DONE: { en: 'DONE', bn: 'সম্পন্ন', hi: 'पूर्ण' },
      SERVING: { en: 'SERVING', bn: 'প্রদানরত', hi: 'सेवा में' },
      WAITING: { en: 'WAITING', bn: 'অপেক্ষারত', hi: 'प्रतीक्षा में' },
      CANCELLED: { en: 'CANCELLED', bn: 'বাতিল', hi: 'रद्द' },
      CREDITED: { en: 'CREDITED', bn: 'জমা হয়েছে', hi: 'जमा हुआ' },
      PROCESSED: { en: 'PROCESSED', bn: 'প্রসেস করা হয়েছে', hi: 'प्रसंस्कृत' },
      PROCESSING: { en: 'PROCESSING', bn: 'প্রসেসিং হচ্ছে', hi: 'प्रसंस्करण में' },
      PENDING_APPROVAL: { en: 'PENDING APPROVAL', bn: 'অনুমোদন অপেক্ষারত', hi: 'अनुमोदन लंबित' },
      CRITICAL: { en: 'CRITICAL', bn: 'জরুরি', hi: 'गंभीर' },
      HIGH: { en: 'HIGH', bn: 'উচ্চ', hi: 'उच्च' },
      MEDIUM: { en: 'MEDIUM', bn: 'মাঝারি', hi: 'मध्यम' },
      LOW: { en: 'LOW', bn: 'নিম্ন', hi: 'निम्न' },
      ESCALATED: { en: 'ESCALATED', bn: 'প্রেরিত', hi: 'प्रेषित' },
      IN_PROGRESS: { en: 'IN PROGRESS', bn: 'চলমান', hi: 'प्रगति में' },
      RESOLVED: { en: 'RESOLVED', bn: 'মীমাংসিত', hi: 'समाधान' }
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

  // Admin Active Sidebar Navigation Menu Item
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // Floating Toast Notification State
  const [toastMsg, setToastMsg] = useState(null);
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // =========================================================================
  // STATE DEFINITIONS FOR ALL BLUEPRINT MODULES
  // =========================================================================

  // Module 1: Admin Top 8 KPI Cards
  const [kpiCards, setKpiCards] = useState({
    registeredFarmers: 482641,
    farmersSeasonIncrease: 2184,
    activeCentres: 1193,
    totalCentres: 1248,
    todaysBookings: 18492,
    bookingsConfirmed: 17842,
    bookingsPending: 650,
    totalProcuredLakhQtl: 12.84,
    procurementTargetLakhQtl: 20.0,
    procurementProgressPct: 64,
    qualityAcceptanceRate: 91.2,
    totalPaymentCrore: 342.8,
    paymentCreditedPct: 91.4,
    openComplaints: 2184,
    escalatedComplaints: 234,
    systemHealthPct: 99.8
  });

  // Module 2: Farmer Management State
  const [farmerSearchQuery, setFarmerSearchQuery] = useState('');
  const [selectedFarmerModal, setSelectedFarmerModal] = useState(null);
  const [farmersList, setFarmersList] = useState([
    { id: 'F10231', name: 'Ramesh Kumar', district: 'Siliguri', landArea: '2.5 Acres', quotaQtl: 50, crops: 'Paddy', parchaNo: 'P-SLG-2024-88', status: 'Active' },
    { id: 'F10232', name: 'Harish Verma', district: 'Jalpaiguri', landArea: '4.0 Acres', quotaQtl: 80, crops: 'Paddy', parchaNo: 'P-JPG-2024-12', status: 'Active' },
    { id: 'F10233', name: 'Gurpreet Singh', district: 'Darjeeling', landArea: '1.8 Acres', quotaQtl: 36, crops: 'Wheat', parchaNo: 'P-DAR-2024-45', status: 'Pending Verification' },
    { id: 'F10234', name: 'Sunil Mondal', district: 'Malda', landArea: '3.2 Acres', quotaQtl: 64, crops: 'Paddy', parchaNo: 'P-MLD-2024-99', status: 'Active' },
    { id: 'F10235', name: 'Biren Sarkar', district: 'Cooch Behar', landArea: '5.0 Acres', quotaQtl: 100, crops: 'Paddy & Wheat', parchaNo: 'P-COB-2024-03', status: 'Active' }
  ]);

  // Module 3: Procurement Centres Management State
  const [centreFilter, setCentreFilter] = useState('ALL');
  const [showAddCentreModal, setShowAddCentreModal] = useState(false);
  const [newCentreForm, setNewCentreForm] = useState({ name: '', district: '', capacityQtl: 2500, supervisor: '' });
  const [centresList, setCentresList] = useState([
    { id: 'C101', name: 'Matigara Procurement Yard', district: 'Siliguri', status: 'ACTIVE', capacityQtl: 2500, procuredQtl: 1850, rejectionRate: 4.2, avgWaitMin: 18, supervisor: 'Rakesh Roy' },
    { id: 'C102', name: 'Siliguri Central Mandi', district: 'Siliguri', status: 'ACTIVE', capacityQtl: 3000, procuredQtl: 2840, rejectionRate: 3.8, avgWaitMin: 22, supervisor: 'Anil Gupta' },
    { id: 'C103', name: 'Jalpaiguri Main Yard', district: 'Jalpaiguri', status: 'LIMITED', capacityQtl: 2000, procuredQtl: 1980, rejectionRate: 7.1, avgWaitMin: 45, supervisor: 'Subhash Das' },
    { id: 'C104', name: 'Malda North Hub', district: 'Malda', status: 'MAINTENANCE', capacityQtl: 1800, procuredQtl: 420, rejectionRate: 2.1, avgWaitMin: 12, supervisor: 'Pradip Ghosh' },
    { id: 'C105', name: 'Phansidewa Sub-Yard', district: 'Siliguri', status: 'CLOSED', capacityQtl: 1500, procuredQtl: 0, rejectionRate: 0.0, avgWaitMin: 0, supervisor: 'Inactive' }
  ]);

  // Module 4: Staff & User Roles RBAC State
  const [staffList, setStaffList] = useState([
    { id: 'ADM001', name: 'Super Admin Officer', role: 'Super Admin', dept: 'Central FCI HQ', status: 'Active', permissions: 'Full System Control' },
    { id: 'ADM002', name: 'District Procurement Admin', role: 'Admin', dept: 'State Dept of Ag', status: 'Active', permissions: 'District Management' },
    { id: 'SUP023', name: 'Mandi Quality Supervisor', role: 'Supervisor', dept: 'Quality Control', status: 'Active', permissions: 'Scale & Quality Approval' },
    { id: 'AGT104', name: 'Field Procurement Agent', role: 'Agent', dept: 'Matigara Yard C101', status: 'Active', permissions: 'Token & Verification Only' },
    { id: 'AUD005', name: 'Chief Financial Auditor', role: 'Auditor', dept: 'Internal Audit', status: 'Active', permissions: 'Read-Only Audit Trail' }
  ]);

  // Module 5: Master Crop Registry State — Strictly Paddy & Wheat
  const [cropsList, setCropsList] = useState([
    { code: 'CR-PAD-001', name: 'Paddy (Common)', category: 'Cereals', maxMoisturePct: 17.0, maxForeignMatterPct: 2.0, maxDamagedPct: 3.0, currentMsp: 2369, status: 'Active' },
    { code: 'CR-PAD-002', name: 'Paddy (Grade A)', category: 'Cereals', maxMoisturePct: 17.0, maxForeignMatterPct: 1.5, maxDamagedPct: 2.0, currentMsp: 2389, status: 'Active' },
    { code: 'CR-WHT-001', name: 'Wheat (FAQ Standard)', category: 'Cereals', maxMoisturePct: 12.0, maxForeignMatterPct: 1.5, maxDamagedPct: 2.0, currentMsp: 2425, status: 'Active' }
  ]);

  // Module 6: Season Management State
  const [seasonsList, setSeasonsList] = useState([
    { id: 'S2026-K', name: 'Kharif Marketing Season 2026', lifecycle: 'ACTIVE', startDate: '2026-10-01', endDate: '2027-03-31', targetLakhQtl: 20.0, achievedLakhQtl: 12.84 },
    { id: 'S2025-R', name: 'Rabi Marketing Season 2025-26', lifecycle: 'UPCOMING', startDate: '2026-04-01', endDate: '2026-06-30', targetLakhQtl: 15.0, achievedLakhQtl: 0.0 },
    { id: 'S2025-K', name: 'Kharif Marketing Season 2025', lifecycle: 'CLOSED', startDate: '2025-10-01', endDate: '2026-03-31', targetLakhQtl: 18.5, achievedLakhQtl: 18.22 }
  ]);

  // Module 7: MSP Management State
  const [showAddMspModal, setShowAddMspModal] = useState(false);
  const [mspForm, setMspForm] = useState({ crop: 'Paddy (Common)', season: 'Kharif Marketing Season 2026', mspRate: '', govtReference: '' });
  const [mspList, setMspList] = useState([
    { id: 1, crop: 'Paddy (Common)', season: 'Kharif 2026', mspRate: 2369, status: 'Published', reference: 'CCEA 29 May 2025 (Notification No. 1-4/2025-Py.III)' },
    { id: 2, crop: 'Paddy (Grade A)', season: 'Kharif 2026', mspRate: 2389, status: 'Published', reference: 'CCEA 29 May 2025 (Notification No. 1-4/2025-Py.III)' },
    { id: 3, crop: 'Wheat', season: 'Rabi 2025-26', mspRate: 2425, status: 'Published', reference: 'CCEA Oct 2024 (Notification No. 2-1/2024-RMS)' }
  ]);

  // Module 8: Interactive FAQ Quality Calculator State
  const [calcInput, setCalcInput] = useState({ crop: 'Paddy', moisture: 14.5, foreignMatter: 1.2, damagedGrains: 1.8 });
  const calculateQualityGrade = () => {
    const isPaddy = calcInput.crop === 'Paddy';
    const maxMoisture = isPaddy ? 17.0 : 12.0;
    const baseMsp = isPaddy ? 2369 : 2425;

    if (calcInput.moisture > maxMoisture) {
      return {
        grade: language === 'bn' ? 'প্রত্যাখ্যাত' : language === 'hi' ? 'अस्वीकृत' : 'REJECTED',
        discountPerQtl: 0,
        netPayablePerQtl: 0,
        decision: (language === 'bn' ? 'প্রত্যাখ্যান — আর্দ্রতা সীমা অতিক্রম করেছে (> ' : language === 'hi' ? 'अस्वीकार — नमी सीमा से अधिक (> ' : 'REJECT — Moisture Exceeds Safe Limit (> ') + maxMoisture + '%)',
        color: 'bg-red-500 text-white'
      };
    }
    if (calcInput.moisture > (maxMoisture - 2.0)) {
      const discount = Math.round((calcInput.moisture - (maxMoisture - 2.0)) * 25);
      return {
        grade: language === 'bn' ? 'এফএকিউ (গ্রেড বি - মূল্য হ্রাস)' : language === 'hi' ? 'एफएक्यू (ग्रेड बी - डिस्काउंट)' : 'FAQ (Grade B - Discounted)',
        discountPerQtl: discount,
        netPayablePerQtl: baseMsp - discount,
        decision: language === 'bn' ? 'মূল্য কাটছাঁট সহ গ্রহণযোগ্য' : language === 'hi' ? 'कटौती के साथ स्वीकार्य' : 'ACCEPT WITH DEDUCTION',
        color: 'bg-amber-500 text-white'
      };
    }
    return {
      grade: language === 'bn' ? 'এফএকিউ (গ্রেড এ - প্রিমিয়াম)' : language === 'hi' ? 'एफएक्यू (ग्रेड ए - प्रीमियम)' : 'FAQ (Grade A - Premium)',
      discountPerQtl: 0,
      netPayablePerQtl: baseMsp,
      decision: language === 'bn' ? 'পূর্ণ এমএসপি মূল্যে গ্রহণযোগ্য' : language === 'hi' ? 'पूर्ण एमएसपी मूल्य पर स्वीकृत' : 'ACCEPT FULL MSP PRICE',
      color: 'bg-emerald-600 text-white'
    };
  };

  // Module 9: Booking & Slot Control Room State
  const [liveTokensList, setLiveTokensList] = useState([
    { token: 'T-001', farmer: 'Ramesh Kumar', crop: 'Paddy', weightQtl: 40, slotTime: '08:00 - 09:00 AM', centre: 'Matigara Yard C101', status: 'DONE' },
    { token: 'T-002', farmer: 'Harish Verma', crop: 'Paddy', weightQtl: 50, slotTime: '09:00 - 10:00 AM', centre: 'Matigara Yard C101', status: 'DONE' },
    { token: 'T-003', farmer: 'Sunil Mondal', crop: 'Paddy', weightQtl: 35, slotTime: '10:00 - 11:00 AM', centre: 'Matigara Yard C101', status: 'SERVING' },
    { token: 'T-004', farmer: 'Gurpreet Singh', crop: 'Wheat', weightQtl: 36, slotTime: '11:00 - 12:00 PM', centre: 'Siliguri Central C102', status: 'WAITING' },
    { token: 'T-005', farmer: 'Biren Sarkar', crop: 'Paddy', weightQtl: 60, slotTime: '12:00 - 01:00 PM', centre: 'Matigara Yard C101', status: 'WAITING' },
    { token: 'T-006', farmer: 'Anish Ray', crop: 'Paddy', weightQtl: 25, slotTime: '01:00 - 02:00 PM', centre: 'Matigara Yard C101', status: 'WAITING' },
    { token: 'T-007', farmer: 'Pritam Paul', crop: 'Wheat', weightQtl: 30, slotTime: '02:00 - 03:00 PM', centre: 'Jalpaiguri Yard C103', status: 'WAITING' },
    { token: 'T-008', farmer: 'Deepak Saha', crop: 'Paddy', weightQtl: 45, slotTime: '03:00 - 04:00 PM', centre: 'Siliguri Central C102', status: 'WAITING' },
    { token: 'T-009', farmer: 'Kalyan Roy', crop: 'Paddy', weightQtl: 20, slotTime: '04:00 - 05:00 PM', centre: 'Matigara Yard C101', status: 'WAITING' },
    { token: 'T-010', farmer: 'Subir Majumdar', crop: 'Paddy', weightQtl: 40, slotTime: '05:00 - 06:00 PM', centre: 'Matigara Yard C101', status: 'WAITING' }
  ]);

  // Module 11: Payment Control State
  const [paymentTransactionsList, setPaymentTransactionsList] = useState([
    { id: 'PAY-8821', farmer: 'Ramesh Kumar', amount: '₹94,760', status: 'CREDITED', date: '17 Sept 2026', bank: 'SBI (A/C ****4821)', pfmsRef: 'PFMS-994821' },
    { id: 'PAY-8822', farmer: 'Harish Verma', amount: '₹1,18,450', status: 'PROCESSED', date: '17 Sept 2026', bank: 'PNB (A/C ****1024)', pfmsRef: 'PFMS-994822' },
    { id: 'PAY-8823', farmer: 'Sunil Mondal', amount: '₹82,915', status: 'PROCESSING', date: '17 Sept 2026', bank: 'UCO (A/C ****9923)', pfmsRef: 'PFMS-994823' },
    { id: 'PAY-8824', farmer: 'Biren Sarkar', amount: '₹1,42,140', status: 'PENDING_APPROVAL', date: '17 Sept 2026', bank: 'Axis (A/C ****3341)', pfmsRef: 'PFMS-994824' }
  ]);

  // Module 12: Grievance Control Centre State
  const [complaintsList, setComplaintsList] = useState([
    { id: 'GRV-401', farmer: 'Gurpreet Singh', category: 'Quality Rejection Dispute', priority: 'HIGH', slaHoursLeft: 6, status: 'OPEN', details: 'Moisture dispute at Siliguri Yard C102' },
    { id: 'GRV-402', farmer: 'Harish Verma', category: 'Payment Credit Delay', priority: 'CRITICAL', slaHoursLeft: 2, status: 'ESCALATED', details: 'Bank IFSC mismatch failure' },
    { id: 'GRV-403', farmer: 'Biren Sarkar', category: 'Token Queue Delay', priority: 'MEDIUM', slaHoursLeft: 14, status: 'IN_PROGRESS', details: 'Weighbridge hardware calibration pause' },
    { id: 'GRV-404', farmer: 'Sunil Mondal', category: 'Slot Cancellation Error', priority: 'LOW', slaHoursLeft: 24, status: 'RESOLVED', details: 'Rebooked slot for tomorrow 10 AM' }
  ]);

  // Module 13: Reports & Analytics Workbench State
  const [reportFilter, setReportFilter] = useState({ dateRange: 'Season 2026', centre: 'ALL', crop: 'ALL', format: 'PDF' });
  const [exportModal, setExportModal] = useState(null);

  // Module 15: System Settings State
  const [systemSettings, setSystemSettings] = useState({
    maxDailyFarmerQuotaQtl: 100,
    moistureHardLimitPct: 17.0,
    autoApprovePaymentLimitCr: 5.0,
    requireSupervisorOverridePin: true,
    emergencySlotHold: false
  });

  // Action Handlers
  const handleSaveMspRate = (e) => {
    e.preventDefault();
    if (!mspForm.mspRate) return;

    const newItem = {
      id: Date.now(),
      crop: mspForm.crop,
      season: mspForm.season,
      mspRate: Number(mspForm.mspRate),
      status: 'Submitted for Approval',
      reference: mspForm.govtReference || 'Official Government Notification'
    };

    setMspList([newItem, ...mspList]);
    setShowAddMspModal(false);
    showToast(`New MSP Rate ₹${mspForm.mspRate}/Qtl for ${mspForm.crop} submitted for CCEA approval.`);
    setMspForm({ crop: 'Paddy (Common)', season: 'Kharif Marketing Season 2026', mspRate: '', govtReference: '' });
  };

  const handleAddCentre = (e) => {
    e.preventDefault();
    if (!newCentreForm.name) return;

    const newYard = {
      id: `C${100 + centresList.length + 1}`,
      name: newCentreForm.name,
      district: newCentreForm.district || 'Siliguri',
      status: 'ACTIVE',
      capacityQtl: Number(newCentreForm.capacityQtl),
      procuredQtl: 0,
      rejectionRate: 0.0,
      avgWaitMin: 15,
      supervisor: newCentreForm.supervisor || 'Assigned Agent'
    };

    setCentresList([newYard, ...centresList]);
    setShowAddCentreModal(false);
    showToast(`New Procurement Centre ${newYard.name} (${newYard.id}) registered successfully.`);
    setNewCentreForm({ name: '', district: '', capacityQtl: 2500, supervisor: '' });
  };

  const handleToggleCentreStatus = (centreId) => {
    setCentresList(centresList.map(c => {
      if (c.id === centreId) {
        const nextStatus = c.status === 'ACTIVE' ? 'LIMITED' : c.status === 'LIMITED' ? 'MAINTENANCE' : 'ACTIVE';
        showToast(`Centre ${c.id} status updated to ${nextStatus}`);
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans antialiased flex flex-col">
      
      {/* Toast Banner */}
      {toastMsg && (
        <div className="fixed top-16 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl text-xs font-mono font-bold flex items-center gap-2 border border-emerald-500/50 animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. GOV / FCI PROCUREMENT ADMIN HEADER BAR                                 */}
      {/* ========================================================================= */}
      <header className="bg-[#004d35] text-white px-4 py-3 sm:px-6 shadow-md border-b border-emerald-600/40 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 border-2 border-amber-400 p-0.5 shadow-md flex items-center justify-center overflow-hidden">
              <img src="/agriprocure-logo.png" alt="AgriSetu Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black tracking-wider text-emerald-300 uppercase">
                {gt('portalTitle')}
              </h1>
              <span className="text-[10px] text-emerald-200/90 font-mono flex items-center gap-1">
                <img src="/govt-avatar.png" className="w-3.5 h-3.5 rounded-full inline-block" alt="Govt" />
                {gt('portalSub')}
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
              {gt('adminRoleBadge')}
            </span>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 flex items-center gap-1 font-bold cursor-pointer transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{gt('logout')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row">
        
        {/* ========================================================================= */}
        {/* 2. ADMIN SIDEBAR NAVIGATION                                               */}
        {/* ========================================================================= */}
        <aside className="w-full md:w-64 bg-[#004d35] text-emerald-100 p-4 space-y-6 flex-shrink-0 border-r border-emerald-600/40 shadow-xl">
          
          <nav className="space-y-4 text-xs font-semibold">
            
            {/* 1. Dashboard */}
            <button
              onClick={() => setActiveMenu('dashboard')}
              className={`w-full text-left p-2.5 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer ${
                activeMenu === 'dashboard' ? 'bg-emerald-600 text-white font-black shadow-md' : 'hover:bg-emerald-900/80 text-emerald-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-400" />
              <span>{gt('systemDashboard')}</span>
            </button>

            {/* 2. Core Administration Modules */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/80 px-2 font-bold block">
                {gt('catAdmin')}
              </span>
              {[
                { id: 'farmers', label: gt('farmerMgmt'), icon: Users },
                { id: 'centres', label: gt('procCentres'), icon: Building },
                { id: 'staff', label: gt('staffRoles'), icon: UserCheck },
                { id: 'crops', label: gt('cropRegistry'), icon: Sprout },
                { id: 'seasons', label: gt('seasonMgmt'), icon: Calendar }
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

            {/* 3. Governance & Policy */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/80 px-2 font-bold block">
                {gt('catGovernance')}
              </span>
              {[
                { id: 'msp', label: gt('mspPolicy'), icon: CreditCard },
                { id: 'rulebook', label: gt('rulebookCalc'), icon: BookOpen },
                { id: 'slots', label: gt('bookingsSlots'), icon: Clock },
                { id: 'payments', label: gt('paymentCtrl'), icon: CreditCard },
                { id: 'complaints', label: gt('grievanceCentre'), icon: AlertTriangle }
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

            {/* 4. Analytics & Audit */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/80 px-2 font-bold block">
                {gt('catAudit')}
              </span>
              {[
                { id: 'reports', label: gt('reportsAnalytics'), icon: FileSpreadsheet },
                { id: 'settings', label: gt('systemSettings'), icon: Settings }
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

          </nav>
        </aside>

        {/* ========================================================================= */}
        {/* 3. MAIN EXECUTIVE DASHBOARD CONTENT                                       */}
        {/* ========================================================================= */}
        <main className="flex-1 p-4 sm:p-6 space-y-5 overflow-y-auto">
          
          {/* VIEW 1: HOME SYSTEM OVERVIEW VIEW */}
          {activeMenu === 'dashboard' && (
            <div className="space-y-5">
              
              {/* Header Title */}
              <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <span>{gt('overviewTitle')}</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {gt('overviewSub')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddMspModal(true)}
                    className="py-2.5 px-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>{gt('manageMspBtn')}</span>
                  </button>
                  <button
                    onClick={() => setActiveMenu('centres')}
                    className="py-2.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Building className="w-4 h-4" />
                    <span>{gt('manageCentresBtn')}</span>
                  </button>
                </div>
              </div>

              {/* Top 8 Admin KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                
                {/* KPI 1 — Farmers */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{gt('kpiRegFarmers')}</span>
                  <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">4,82,641</div>
                  <span className="text-[10px] text-emerald-700 font-bold block">{gt('kpiSeasonIncrease')}</span>
                </div>

                {/* KPI 2 — Active Centres */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">{gt('kpiActiveCentres')}</span>
                  <div className="text-xl sm:text-2xl font-black font-mono text-emerald-700">1,193 <span className="text-xs text-slate-400 font-normal">/ 1,248</span></div>
                  <span className="text-[10px] text-slate-500 block">{gt('kpiCentresSub')}</span>
                </div>

                {/* KPI 3 — Today's Bookings */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">{gt('kpiTodaysBookings')}</span>
                  <div className="text-xl sm:text-2xl font-black font-mono text-blue-700">18,492</div>
                  <span className="text-[10px] text-slate-500 block">{gt('kpiConfirmedSub')}</span>
                </div>

                {/* KPI 4 — Total Procured */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider block">{gt('kpiTotalProcured')}</span>
                  <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">12.84 L Qtl</div>
                  <span className="text-[10px] text-emerald-700 font-bold block">{gt('kpiProcuredSub')}</span>
                </div>

                {/* KPI 5 — Quality Acceptance */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">{gt('kpiQualityAcceptance')}</span>
                  <div className="text-xl sm:text-2xl font-black font-mono text-emerald-700">91.2%</div>
                  <span className="text-[10px] text-slate-500 block">{gt('kpiAcceptedClean')}</span>
                </div>

                {/* KPI 6 — Payment Disbursed */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">{gt('kpiPaymentValue')}</span>
                  <div className="text-xl sm:text-2xl font-black font-mono text-purple-700">₹342.8 Cr</div>
                  <span className="text-[10px] text-emerald-700 font-bold block">{gt('kpiCreditedSub')}</span>
                </div>

                {/* KPI 7 — Complaints */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">{gt('kpiOpenComplaints')}</span>
                  <div className="text-xl sm:text-2xl font-black font-mono text-amber-700">2,184</div>
                  <span className="text-[10px] text-red-600 font-bold block">{gt('kpiEscalatedSub')}</span>
                </div>

                {/* KPI 8 — System Health */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">{gt('kpiSystemHealth')}</span>
                  <div className="text-xl sm:text-2xl font-black font-mono text-emerald-800">99.8%</div>
                  <span className="text-[10px] text-slate-500 block">{gt('kpiHealthSub')}</span>
                </div>

              </div>

              {/* Progress & Operational Status Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Target Progress Card */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="font-black text-slate-900 text-xs uppercase tracking-wider">
                      {gt('targetTitle')}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700">{gt('targetMet')}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span>{gt('targetLabel')}</span>
                      <span>{gt('procuredLabel')}</span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden border border-slate-200 p-0.5">
                      <div className="bg-emerald-600 h-full rounded-full transition-all" style={{ width: '64%' }} />
                    </div>
                  </div>
                </div>

                {/* System Alerts Stream */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="font-black text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      {gt('alertsTitle')}
                    </span>
                    <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-md">
                      {gt('alertsActionReq')}
                    </span>
                  </div>

                  <div className="space-y-2 font-mono text-xs">
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-950 flex justify-between font-bold">
                      <span>{gt('alert1Text')}</span>
                      <button onClick={() => showToast('Dispatched operational overflow alert to Centre C103')} className="text-[10px] underline cursor-pointer">{gt('resolveBtn')}</button>
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 flex justify-between font-bold">
                      <span>{gt('alert2Text')}</span>
                      <button onClick={() => showToast('Assigned quality audit inspector to Centre C103')} className="text-[10px] underline cursor-pointer">{gt('auditBtn')}</button>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 flex justify-between font-bold">
                      <span>{gt('alert3Text')}</span>
                      <button onClick={() => setActiveMenu('complaints')} className="text-[10px] underline cursor-pointer">{gt('viewBtn')}</button>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* VIEW 2: FARMER MANAGEMENT */}
          {activeMenu === 'farmers' && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                      <span>{gt('farmerTitle')}</span>
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{gt('farmerSub')}</p>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={gt('searchFarmerPlaceholder')}
                      value={farmerSearchQuery}
                      onChange={(e) => setFarmerSearchQuery(e.target.value)}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold w-64"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-slate-50 text-slate-700 font-extrabold border-b border-slate-200">
                      <tr>
                        <th className="p-3">{gt('thFarmerId')}</th>
                        <th className="p-3">{gt('thFullName')}</th>
                        <th className="p-3">{gt('thDistrict')}</th>
                        <th className="p-3">{gt('thParchaRef')}</th>
                        <th className="p-3">{gt('thLandArea')}</th>
                        <th className="p-3">{gt('thQuotaQtl')}</th>
                        <th className="p-3">{gt('thCrops')}</th>
                        <th className="p-3">{gt('thStatus')}</th>
                        <th className="p-3 text-right">{gt('thActions')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {farmersList
                        .filter(f => f.name.toLowerCase().includes(farmerSearchQuery.toLowerCase()) || f.id.toLowerCase().includes(farmerSearchQuery.toLowerCase()) || f.parchaNo.toLowerCase().includes(farmerSearchQuery.toLowerCase()))
                        .map((f) => (
                        <tr key={f.id} className="hover:bg-slate-50">
                          <td className="p-3 font-black text-emerald-800">{f.id}</td>
                          <td className="p-3 font-bold text-slate-900">{f.name}</td>
                          <td className="p-3">{f.district}</td>
                          <td className="p-3 font-bold text-slate-700">{f.parchaNo}</td>
                          <td className="p-3">{f.landArea}</td>
                          <td className="p-3 font-black text-emerald-700">{f.quotaQtl} Qtl</td>
                          <td className="p-3 font-semibold text-emerald-900">{trCrop(f.crops)}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                              f.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {trStatus(f.status)}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => setSelectedFarmerModal(f)}
                              className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold rounded-xl text-[11px] cursor-pointer"
                            >
                              {gt('btnViewParcha')}
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

          {/* VIEW 3: PROCUREMENT CENTRES */}
          {activeMenu === 'centres' && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                      <span>{gt('centresTitle')}</span>
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{gt('centresSub')}</p>
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={centreFilter}
                      onChange={(e) => setCentreFilter(e.target.value)}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold"
                    >
                      <option value="ALL">{gt('optAllStatuses')}</option>
                      <option value="ACTIVE">{trStatus('ACTIVE')}</option>
                      <option value="LIMITED">{trStatus('LIMITED')}</option>
                      <option value="MAINTENANCE">{trStatus('MAINTENANCE')}</option>
                      <option value="CLOSED">{trStatus('CLOSED')}</option>
                    </select>

                    <button
                      onClick={() => setShowAddCentreModal(true)}
                      className="py-2.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>{gt('btnRegisterYard')}</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-slate-50 text-slate-700 font-extrabold border-b border-slate-200">
                      <tr>
                        <th className="p-3">{gt('thCentreCode')}</th>
                        <th className="p-3">{gt('thYardName')}</th>
                        <th className="p-3">{gt('thDistrict')}</th>
                        <th className="p-3">{gt('thStatus')}</th>
                        <th className="p-3">{gt('thIntakeTarget')}</th>
                        <th className="p-3">{gt('thRejectionRate')}</th>
                        <th className="p-3">{gt('thAvgQueueTime')}</th>
                        <th className="p-3">{gt('thSupervisor')}</th>
                        <th className="p-3 text-right">{gt('thActions')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {centresList
                        .filter(c => centreFilter === 'ALL' || c.status === centreFilter)
                        .map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50">
                          <td className="p-3 font-black text-slate-900">{c.id}</td>
                          <td className="p-3 font-bold text-slate-900">{c.name}</td>
                          <td className="p-3">{c.district}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                              c.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' :
                              c.status === 'LIMITED' ? 'bg-amber-100 text-amber-800' :
                              c.status === 'MAINTENANCE' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {trStatus(c.status)}
                            </span>
                          </td>
                          <td className="p-3 font-bold">
                            {c.procuredQtl} / {c.capacityQtl} Qtl
                            <div className="w-24 bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                              <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${Math.min(100, (c.procuredQtl / c.capacityQtl) * 100)}%` }} />
                            </div>
                          </td>
                          <td className="p-3 font-bold text-amber-700">{c.rejectionRate}%</td>
                          <td className="p-3 font-bold">{c.avgWaitMin} min</td>
                          <td className="p-3 text-slate-600">{c.supervisor}</td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleToggleCentreStatus(c.id)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-[11px] cursor-pointer"
                            >
                              {gt('btnToggleStatus')}
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

          {/* VIEW 4: STAFF & USER ROLES */}
          {activeMenu === 'staff' && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                    <span>{gt('staffTitle')}</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{gt('staffSub')}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs font-mono space-y-1">
                  <div className="font-black flex items-center gap-1.5 text-amber-900">
                    <ShieldAlert className="w-4 h-4 text-amber-700" />
                    <span>{gt('agentNoticeTitle')}</span>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    {gt('agentNoticeText')}
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-slate-50 text-slate-700 font-extrabold border-b border-slate-200">
                      <tr>
                        <th className="p-3">{gt('thStaffId')}</th>
                        <th className="p-3">{gt('thFullName')}</th>
                        <th className="p-3">{gt('thAssignedRole')}</th>
                        <th className="p-3">{gt('thDeptYard')}</th>
                        <th className="p-3">{gt('thPermissionScope')}</th>
                        <th className="p-3">{gt('thStatus')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {staffList.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-50">
                          <td className="p-3 font-black text-emerald-800">{s.id}</td>
                          <td className="p-3 font-bold text-slate-900">{s.name}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-slate-200 text-slate-800">
                              {s.role}
                            </span>
                          </td>
                          <td className="p-3 text-slate-700">{s.dept}</td>
                          <td className="p-3 font-semibold text-emerald-900">{s.permissions}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-emerald-100 text-emerald-800">
                              {trStatus(s.status)}
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

          {/* VIEW 5: MASTER CROP REGISTRY — Paddy & Wheat Only */}
          {activeMenu === 'crops' && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                    <span>{gt('cropsTitle')}</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{gt('cropsSub')}</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-slate-50 text-slate-700 font-extrabold border-b border-slate-200">
                      <tr>
                        <th className="p-3">{gt('thCropCode')}</th>
                        <th className="p-3">{gt('thCropName')}</th>
                        <th className="p-3">{gt('thCategory')}</th>
                        <th className="p-3">{gt('thMaxMoisture')}</th>
                        <th className="p-3">{gt('thMaxForeign')}</th>
                        <th className="p-3">{gt('thMaxDamaged')}</th>
                        <th className="p-3">{gt('thCurrentMsp')}</th>
                        <th className="p-3">{gt('thStatus')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {cropsList.map((cr) => (
                        <tr key={cr.code} className="hover:bg-slate-50">
                          <td className="p-3 font-black text-emerald-800">{cr.code}</td>
                          <td className="p-3 font-bold text-slate-900">{trCrop(cr.name)}</td>
                          <td className="p-3">{cr.category}</td>
                          <td className="p-3 font-bold text-slate-800">{cr.maxMoisturePct}%</td>
                          <td className="p-3 font-bold text-slate-800">{cr.maxForeignMatterPct}%</td>
                          <td className="p-3 font-bold text-slate-800">{cr.maxDamagedPct}%</td>
                          <td className="p-3 font-black text-emerald-700">₹{cr.currentMsp} / Qtl</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-md font-bold text-[10px] bg-emerald-100 text-emerald-800">
                              {trStatus(cr.status)}
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

          {/* VIEW 6: SEASON MANAGEMENT */}
          {activeMenu === 'seasons' && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                    <span>{gt('seasonsTitle')}</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{gt('seasonsSub')}</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-slate-50 text-slate-700 font-extrabold border-b border-slate-200">
                      <tr>
                        <th className="p-3">{gt('thSeasonId')}</th>
                        <th className="p-3">{gt('thSeasonName')}</th>
                        <th className="p-3">{gt('thLifecycleStage')}</th>
                        <th className="p-3">{gt('thStartDate')}</th>
                        <th className="p-3">{gt('thEndDate')}</th>
                        <th className="p-3">{gt('thTargetVsAchieved')}</th>
                        <th className="p-3 text-right">{gt('thActions')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {seasonsList.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-50">
                          <td className="p-3 font-black text-slate-900">{s.id}</td>
                          <td className="p-3 font-bold text-slate-900">{s.name}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-1 rounded-lg font-black text-[10px] ${
                              s.lifecycle === 'ACTIVE' ? 'bg-emerald-600 text-white' :
                              s.lifecycle === 'UPCOMING' ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {trStatus(s.lifecycle)}
                            </span>
                          </td>
                          <td className="p-3">{s.startDate}</td>
                          <td className="p-3">{s.endDate}</td>
                          <td className="p-3 font-bold text-emerald-800">
                            {s.achievedLakhQtl} / {s.targetLakhQtl} L Qtl
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => showToast(`Season ${s.name} configuration updated.`)}
                              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 font-bold rounded-lg text-[11px] cursor-pointer"
                            >
                              {gt('btnConfigure')}
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

          {/* VIEW 7: MSP MANAGEMENT */}
          {activeMenu === 'msp' && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-black text-slate-900 text-base">
                      {gt('mspTitle')}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{gt('mspSub')}</p>
                  </div>

                  <button
                    onClick={() => setShowAddMspModal(true)}
                    className="py-2.5 px-5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>{gt('btnAddMsp')}</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-slate-50 text-slate-700 font-extrabold border-b border-slate-200">
                      <tr>
                        <th className="p-3">{gt('thCropVariety')}</th>
                        <th className="p-3">{gt('thMarketingSeason')}</th>
                        <th className="p-3">{gt('thMspRate')}</th>
                        <th className="p-3">{gt('thStatus')}</th>
                        <th className="p-3">{gt('thGovtRef')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {mspList.map((m) => (
                        <tr key={m.id} className="hover:bg-slate-50">
                          <td className="p-3 font-black text-slate-900">{trCrop(m.crop)}</td>
                          <td className="p-3 font-bold text-emerald-800">{m.season}</td>
                          <td className="p-3 font-black text-base text-slate-900">₹{m.mspRate} / Qtl</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                              m.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {trStatus(m.status)}
                            </span>
                          </td>
                          <td className="p-3 text-[11px] text-slate-600">{m.reference}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 8: RULEBOOK & FAQ QUALITY CALCULATOR */}
          {activeMenu === 'rulebook' && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                    <span>{gt('calcTitle')}</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{gt('calcSub')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Calculator Input Form */}
                  <div className="space-y-3 font-mono text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <span className="font-black text-slate-900 block text-xs border-b border-slate-200 pb-2 uppercase">
                      {gt('boxInputTitle')}
                    </span>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">{gt('lblSelectCrop')}</label>
                      <select
                        value={calcInput.crop}
                        onChange={(e) => setCalcInput({...calcInput, crop: e.target.value})}
                        className="w-full p-2.5 rounded-xl border bg-white font-bold"
                      >
                        <option value="Paddy">{trCrop('Paddy (Common / Grade A)')}</option>
                        <option value="Wheat">{trCrop('Wheat (FAQ Standard)')}</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        {gt('lblMoisture')} <span className="text-slate-500 font-normal">(Max allowed: {calcInput.crop === 'Paddy' ? '17.0%' : '12.0%'})</span>
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={calcInput.moisture}
                        onChange={(e) => setCalcInput({...calcInput, moisture: Number(e.target.value)})}
                        className="w-full p-2.5 rounded-xl border bg-white font-black text-sm"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">{gt('lblForeign')}</label>
                      <input
                        type="number"
                        step="0.1"
                        value={calcInput.foreignMatter}
                        onChange={(e) => setCalcInput({...calcInput, foreignMatter: Number(e.target.value)})}
                        className="w-full p-2.5 rounded-xl border bg-white font-bold text-xs"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">{gt('lblDamaged')}</label>
                      <input
                        type="number"
                        step="0.1"
                        value={calcInput.damagedGrains}
                        onChange={(e) => setCalcInput({...calcInput, damagedGrains: Number(e.target.value)})}
                        className="w-full p-2.5 rounded-xl border bg-white font-bold text-xs"
                      />
                    </div>
                  </div>

                  {/* Calculator Output Card */}
                  {(() => {
                    const result = calculateQualityGrade();
                    return (
                      <div className="space-y-4 font-mono text-xs bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                        <div>
                          <span className="font-black text-slate-900 block text-xs border-b border-slate-100 pb-2 uppercase">
                            {gt('boxOutputTitle')}
                          </span>

                          <div className="mt-4 space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-500 font-bold">{gt('lblAssessedGrade')}</span>
                              <span className={`px-3 py-1 rounded-xl font-black text-xs ${result.color}`}>
                                {result.grade}
                              </span>
                            </div>

                            <div className="flex justify-between items-center border-t border-slate-100 pt-2">
                              <span className="text-slate-500 font-bold">{gt('lblBaseMsp')}</span>
                              <span className="font-black text-slate-900 text-sm">
                                ₹{calcInput.crop === 'Paddy' ? 2369 : 2425} / Qtl
                              </span>
                            </div>

                            <div className="flex justify-between items-center border-t border-slate-100 pt-2 text-red-600 font-bold">
                              <span>{gt('lblDeduction')}</span>
                              <span>- ₹{result.discountPerQtl} / Qtl</span>
                            </div>

                            <div className="flex justify-between items-center border-t-2 border-slate-900 pt-2 text-base font-black text-emerald-800">
                              <span>{gt('lblNetPayable')}</span>
                              <span>₹{result.netPayablePerQtl} / Qtl</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900 text-white font-bold text-center text-xs">
                          {gt('lblDecision')} {result.decision}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 9: BOOKINGS & SLOT CONTROL ROOM */}
          {activeMenu === 'slots' && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                      <span>{gt('slotsTitle')}</span>
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{gt('slotsSub')}</p>
                  </div>

                  <div className="flex gap-2 font-mono text-xs font-bold">
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-300">
                      {gt('badgeServing')}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-xl border border-blue-300">
                      {gt('badgeWaiting')}
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-slate-50 text-slate-700 font-extrabold border-b border-slate-200">
                      <tr>
                        <th className="p-3">{gt('thTokenNo')}</th>
                        <th className="p-3">{gt('thFarmerName')}</th>
                        <th className="p-3">{gt('thCrop')}</th>
                        <th className="p-3">{gt('thWeightQtl')}</th>
                        <th className="p-3">{gt('thSlotWindow')}</th>
                        <th className="p-3">{gt('thAssignedYard')}</th>
                        <th className="p-3">{gt('thTokenStatus')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {liveTokensList.map((t) => (
                        <tr key={t.token} className="hover:bg-slate-50">
                          <td className="p-3 font-black text-base text-emerald-800">{t.token}</td>
                          <td className="p-3 font-bold text-slate-900">{t.farmer}</td>
                          <td className="p-3 font-semibold">{trCrop(t.crop)}</td>
                          <td className="p-3 font-black text-slate-800">{t.weightQtl} Qtl</td>
                          <td className="p-3 text-slate-600">{t.slotTime}</td>
                          <td className="p-3 text-slate-700">{t.centre}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-1 rounded-lg font-black text-[10px] ${
                              t.status === 'SERVING' ? 'bg-emerald-600 text-white animate-pulse' :
                              t.status === 'DONE' ? 'bg-slate-200 text-slate-700' :
                              t.status === 'WAITING' ? 'bg-amber-500 text-white' : 'bg-red-500 text-white'
                            }`}>
                              {trStatus(t.status)}
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

          {/* VIEW 10: PAYMENT CONTROL */}
          {activeMenu === 'payments' && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                      <span>{gt('paymentTitle')}</span>
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{gt('paymentSub')}</p>
                  </div>

                  <span className="font-mono font-black text-emerald-700 text-sm bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                    {gt('badgeTotalDisbursed')}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-slate-50 text-slate-700 font-extrabold border-b border-slate-200">
                      <tr>
                        <th className="p-3">{gt('thPaymentId')}</th>
                        <th className="p-3">{gt('thFarmerName')}</th>
                        <th className="p-3">{gt('thPayoutValue')}</th>
                        <th className="p-3">{gt('thPfmsRef')}</th>
                        <th className="p-3">{gt('thDestBank')}</th>
                        <th className="p-3">{gt('thPipelineStatus')}</th>
                        <th className="p-3 text-right">{gt('thActions')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paymentTransactionsList.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50">
                          <td className="p-3 font-black text-emerald-800">{p.id}</td>
                          <td className="p-3 font-bold text-slate-900">{p.farmer}</td>
                          <td className="p-3 font-black text-slate-900 text-sm">{p.amount}</td>
                          <td className="p-3 text-slate-600">{p.pfmsRef}</td>
                          <td className="p-3 text-slate-700">{p.bank}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-1 rounded-lg font-black text-[10px] ${
                              p.status === 'CREDITED' ? 'bg-emerald-600 text-white' :
                              p.status === 'PROCESSED' ? 'bg-blue-600 text-white' :
                              p.status === 'PROCESSING' ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-800'
                            }`}>
                              {trStatus(p.status)}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => showToast(`Retried payout advice for ${p.id}`)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 font-bold rounded-lg text-[11px] cursor-pointer"
                            >
                              {gt('btnRetryAdvice')}
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

          {/* VIEW 11: GRIEVANCE CENTRE */}
          {activeMenu === 'complaints' && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-black text-slate-900 text-base">
                      {gt('grievanceTitle')}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{gt('grievanceSub')}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 font-bold block">{gt('cardFiled')}</span>
                    <span className="text-xl font-black text-slate-900">8,421</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                    <span className="text-amber-800 font-bold block">{gt('cardOpen')}</span>
                    <span className="text-xl font-black text-amber-700">2,184</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200">
                    <span className="text-red-800 font-bold block">{gt('cardEscalated')}</span>
                    <span className="text-xl font-black text-red-600">234</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <span className="text-emerald-800 font-bold block">{gt('cardResolved')}</span>
                    <span className="text-xl font-black text-emerald-700">4,762</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-slate-50 text-slate-700 font-extrabold border-b border-slate-200">
                      <tr>
                        <th className="p-3">{gt('thTicketId')}</th>
                        <th className="p-3">{gt('thComplainant')}</th>
                        <th className="p-3">{gt('thCategory')}</th>
                        <th className="p-3">{gt('thPriority')}</th>
                        <th className="p-3">{gt('thSlaCountdown')}</th>
                        <th className="p-3">{gt('thStatus')}</th>
                        <th className="p-3 text-right">{gt('thActions')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {complaintsList.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50">
                          <td className="p-3 font-black text-amber-800">{c.id}</td>
                          <td className="p-3 font-bold text-slate-900">{c.farmer}</td>
                          <td className="p-3 text-slate-700">{c.category}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                              c.priority === 'CRITICAL' ? 'bg-red-600 text-white font-black' :
                              c.priority === 'HIGH' ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-800'
                            }`}>
                              {trStatus(c.priority)}
                            </span>
                          </td>
                          <td className="p-3 font-black text-red-600">{c.slaHoursLeft}h Remaining</td>
                          <td className="p-3 font-bold">{trStatus(c.status)}</td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => showToast(`Escalated ticket ${c.id} to District Nodal Officer.`)}
                              className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-300 font-bold rounded-lg text-[11px] cursor-pointer"
                            >
                              {gt('btnEscalate')}
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

          {/* VIEW 12: REPORTS & ANALYTICS */}
          {activeMenu === 'reports' && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                      <span>{gt('reportsTitle')}</span>
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{gt('reportsSub')}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setExportModal({ type: 'PDF', title: 'Daily National Procurement Summary' })}
                      className="py-2.5 px-4 rounded-2xl bg-red-700 hover:bg-red-800 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>{gt('btnExportPdf')}</span>
                    </button>
                    <button
                      onClick={() => setExportModal({ type: 'EXCEL', title: 'Procurement Transaction Master Spreadsheet' })}
                      className="py-2.5 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>{gt('btnExportExcel')}</span>
                    </button>
                  </div>
                </div>

                {/* Filter Workbench */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{gt('lblDateRange')}</label>
                    <select value={reportFilter.dateRange} onChange={(e) => setReportFilter({...reportFilter, dateRange: e.target.value})} className="w-full p-2 bg-white rounded-xl border font-bold">
                      <option value="Season 2026">Kharif Season 2026</option>
                      <option value="Today">Today (17 Sept 2026)</option>
                      <option value="This Month">This Month (Sept 2026)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{gt('lblYardSelect')}</label>
                    <select value={reportFilter.centre} onChange={(e) => setReportFilter({...reportFilter, centre: e.target.value})} className="w-full p-2 bg-white rounded-xl border font-bold">
                      <option value="ALL">All Procurement Yards</option>
                      <option value="C101">C101 Matigara Yard</option>
                      <option value="C102">C102 Siliguri Mandi</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{gt('lblTargetCrop')}</label>
                    <select value={reportFilter.crop} onChange={(e) => setReportFilter({...reportFilter, crop: e.target.value})} className="w-full p-2 bg-white rounded-xl border font-bold">
                      <option value="ALL">All Crops (Paddy & Wheat)</option>
                      <option value="Paddy">Paddy Only</option>
                      <option value="Wheat">Wheat Only</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={() => showToast('Report data re-compiled with active filters.')}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs cursor-pointer"
                    >
                      {gt('btnApplyFilters')}
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 font-mono text-xs space-y-2">
                  <span className="font-bold text-slate-900 block border-b border-slate-100 pb-2">
                    {gt('previewTitle')} ({reportFilter.dateRange} • Crop: {trCrop(reportFilter.crop)})
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-500 font-bold block text-[10px]">{gt('lblTotalIntake')}</span>
                      <span className="text-lg font-black text-slate-900">12,84,000 Qtl</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-500 font-bold block text-[10px]">{gt('lblTotalPayout')}</span>
                      <span className="text-lg font-black text-emerald-800">₹342.8 Crore</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-500 font-bold block text-[10px]">{gt('lblAvgRejection')}</span>
                      <span className="text-lg font-black text-amber-700">4.1%</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-500 font-bold block text-[10px]">{gt('lblFarmersServed')}</span>
                      <span className="text-lg font-black text-blue-700">4,82,641</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 13: SYSTEM SETTINGS */}
          {activeMenu === 'settings' && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                    <span>{gt('settingsTitle')}</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{gt('settingsSub')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <span className="font-black text-slate-900 block border-b border-slate-200 pb-2">
                      {gt('boxSysConfig')}
                    </span>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">{gt('lblMaxQuota')}</label>
                      <input
                        type="number"
                        value={systemSettings.maxDailyFarmerQuotaQtl}
                        onChange={(e) => setSystemSettings({...systemSettings, maxDailyFarmerQuotaQtl: Number(e.target.value)})}
                        className="w-full p-2.5 rounded-xl border bg-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">{gt('lblMoistureLimit')}</label>
                      <input
                        type="number"
                        step="0.1"
                        value={systemSettings.moistureHardLimitPct}
                        onChange={(e) => setSystemSettings({...systemSettings, moistureHardLimitPct: Number(e.target.value)})}
                        className="w-full p-2.5 rounded-xl border bg-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">{gt('lblAutoApprove')}</label>
                      <input
                        type="number"
                        step="0.5"
                        value={systemSettings.autoApprovePaymentLimitCr}
                        onChange={(e) => setSystemSettings({...systemSettings, autoApprovePaymentLimitCr: Number(e.target.value)})}
                        className="w-full p-2.5 rounded-xl border bg-white font-bold"
                      />
                    </div>

                    <button
                      onClick={() => showToast('Submitted setting change request for Super Admin authorization.')}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs cursor-pointer mt-2"
                    >
                      {gt('btnSubmitReq')}
                    </button>
                  </div>

                  <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                    <span className="font-black text-slate-900 block border-b border-slate-100 pb-2">
                      {gt('boxPendingAppr')}
                    </span>

                    <div className="space-y-2 text-xs">
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                        <div className="flex justify-between font-bold text-amber-900">
                          <span>Request #REQ-102</span>
                          <span className="text-[10px] bg-amber-200 px-1.5 py-0.5 rounded">PENDING SUPER ADMIN</span>
                        </div>
                        <p className="text-slate-700 text-[11px]">
                          Increase Matigara Yard C101 daily intake capacity from 2,500 Qtl to 3,000 Qtl.
                        </p>
                        <div className="pt-2 flex gap-2">
                          <button onClick={() => showToast('Approved Request #REQ-102')} className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-lg text-[10px]">{gt('btnApprove')}</button>
                          <button onClick={() => showToast('Rejected Request #REQ-102')} className="px-3 py-1 bg-red-600 text-white font-bold rounded-lg text-[10px]">{gt('btnReject')}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ========================================================================= */}
      {/* 4. MODALS & FORMS                                                         */}
      {/* ========================================================================= */}

      {/* Add MSP Rate Modal */}
      {showAddMspModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 text-slate-800 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">{gt('modalAddMspTitle')}</h3>
              <button onClick={() => setShowAddMspModal(false)} className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveMspRate} className="space-y-3 text-xs font-mono">
              <div>
                <label className="font-bold text-slate-700 block mb-1">{gt('lblSelectCrop')}</label>
                <select value={mspForm.crop} onChange={(e) => setMspForm({...mspForm, crop: e.target.value})} className="w-full p-2.5 rounded-xl border font-bold">
                  <option value="Paddy (Common)">{trCrop('Paddy (Common)')}</option>
                  <option value="Paddy (Grade A)">{trCrop('Paddy (Grade A)')}</option>
                  <option value="Wheat">{trCrop('Wheat')}</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">{gt('thMarketingSeason')}:</label>
                <select value={mspForm.season} onChange={(e) => setMspForm({...mspForm, season: e.target.value})} className="w-full p-2.5 rounded-xl border font-bold">
                  <option value="Kharif Marketing Season 2026">Kharif Marketing Season 2026</option>
                  <option value="Rabi Marketing Season 2025-26">Rabi Marketing Season 2025-26</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">{gt('thMspRate')}:</label>
                <input type="number" required placeholder="e.g. 2369" value={mspForm.mspRate} onChange={(e) => setMspForm({...mspForm, mspRate: e.target.value})} className="w-full p-2.5 rounded-xl border font-black text-sm" />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">{gt('lblGovtRefInput')}</label>
                <input type="text" placeholder="e.g. Notification No. 1-4/2025-Py.III" value={mspForm.govtReference} onChange={(e) => setMspForm({...mspForm, govtReference: e.target.value})} className="w-full p-2.5 rounded-xl border" />
              </div>

              <div className="pt-2 flex gap-2">
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black uppercase text-xs cursor-pointer shadow-xs">
                  {gt('btnSubmitMsp')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Procurement Yard Modal */}
      {showAddCentreModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 text-slate-800 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">{gt('modalAddCentreTitle')}</h3>
              <button onClick={() => setShowAddCentreModal(false)} className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCentre} className="space-y-3 text-xs font-mono">
              <div>
                <label className="font-bold text-slate-700 block mb-1">{gt('lblYardNameInput')}</label>
                <input type="text" required placeholder="e.g. Naxalbari Sub-Yard" value={newCentreForm.name} onChange={(e) => setNewCentreForm({...newCentreForm, name: e.target.value})} className="w-full p-2.5 rounded-xl border font-bold" />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">{gt('thDistrict')}:</label>
                <input type="text" required placeholder="e.g. Siliguri" value={newCentreForm.district} onChange={(e) => setNewCentreForm({...newCentreForm, district: e.target.value})} className="w-full p-2.5 rounded-xl border font-bold" />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">{gt('lblDailyCapacity')}</label>
                <input type="number" required placeholder="e.g. 2500" value={newCentreForm.capacityQtl} onChange={(e) => setNewCentreForm({...newCentreForm, capacityQtl: e.target.value})} className="w-full p-2.5 rounded-xl border font-bold" />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">{gt('lblSupervisorInput')}</label>
                <input type="text" placeholder="e.g. Rakesh Roy" value={newCentreForm.supervisor} onChange={(e) => setNewCentreForm({...newCentreForm, supervisor: e.target.value})} className="w-full p-2.5 rounded-xl border" />
              </div>

              <div className="pt-2 flex gap-2">
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase text-xs cursor-pointer shadow-xs">
                  {gt('btnRegisterYardSubmit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Farmer Parcha Details Modal */}
      {selectedFarmerModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 text-slate-800 shadow-2xl space-y-4 font-mono">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">{gt('modalParchaTitle')} — {selectedFarmerModal.id}</h3>
              <button onClick={() => setSelectedFarmerModal(null)} className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex justify-between border-b pb-1">
                <span className="text-slate-500 font-bold">{gt('thFarmerName')}:</span>
                <span className="font-black text-slate-900">{selectedFarmerModal.name}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-slate-500 font-bold">{gt('lblParchaRefNo')}</span>
                <span className="font-bold text-emerald-800">{selectedFarmerModal.parchaNo}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-slate-500 font-bold">{gt('lblTotalHolding')}</span>
                <span>{selectedFarmerModal.landArea}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-slate-500 font-bold">{gt('lblMaxQuotaModal')}</span>
                <span className="font-black text-emerald-700">{selectedFarmerModal.quotaQtl} Quintals</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-slate-500 font-bold">{gt('lblRegCropsModal')}</span>
                <span className="font-bold text-slate-900">{trCrop(selectedFarmerModal.crops)}</span>
              </div>
            </div>

            <button onClick={() => setSelectedFarmerModal(null)} className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-black text-xs cursor-pointer">
              {gt('btnCloseParcha')}
            </button>
          </div>
        </div>
      )}

      {/* Export Report Confirmation Modal */}
      {exportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 text-slate-800 shadow-2xl space-y-4 font-mono">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">{gt('modalExportTitle')} ({exportModal.type})</h3>
              <button onClick={() => setExportModal(null)} className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Compiling official report document: <strong>{exportModal.title}</strong> in {exportModal.type} format.
            </p>

            <button
              onClick={() => {
                showToast(`Report downloaded as ${exportModal.type} file successfully.`);
                setExportModal(null);
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs cursor-pointer uppercase"
            >
              [ DOWNLOAD {exportModal.type} FILE ]
            </button>
          </div>
        </div>
      )}

    </div>
  );
}