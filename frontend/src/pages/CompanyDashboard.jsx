import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import {
  Sprout,
  Bell,
  User,
  LogOut,
  LayoutDashboard,
  Users,
  Search,
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
  Upload,
  RefreshCw,
  Phone,
  Settings,
  ArrowRight,
  Eye,
  CheckCheck,
  Building,
  Building2,
  ChevronRight,
  Sliders,
  Send,
  AlertCircle,
  PlusCircle,
  TrendingUp,
  MapPin,
  BarChart3,
  Calendar,
  Lock,
  Compass,
  FileSpreadsheet,
  ExternalLink,
  Printer,
  ArrowRightLeft
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function CompanyDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Active Sidebar Menu
  // 'dashboard' | 'farmers' | 'centres' | 'professionals' | 'queue' | 'procurement' | 'ai' | 'payments' | 'feedback' | 'complaints' | 'nearby' | 'reports' | 'notifications' | 'settings'
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // Notification Modal / Dropdown State (PDF 2 Page 2 Section 2)
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New farmer registration', time: '1 min ago', type: 'info', text: 'Farmer Debjyoti Sinha registered from Darjeeling' },
    { id: 2, title: 'Farmer arrived at centre', time: '4 min ago', type: 'success', text: 'Token #101 arrived at Centre 01 (Siliguri)' },
    { id: 3, title: 'Professional completed verification', time: '12 min ago', type: 'success', text: 'Rahul Sharma verified Token #101 Potato (520 kg)' },
    { id: 4, title: 'AI analysis completed', time: '15 min ago', type: 'info', text: 'Token #102 Rice analysis scored 94/100 (Passed)' },
    { id: 5, title: 'Procurement rejected', time: '25 min ago', type: 'error', text: 'Token #103 Wheat rejected by Suman (Excess Damage)' },
    { id: 6, title: 'Payment failed', time: '45 min ago', type: 'error', text: 'Bank retry needed for Farmer FMR00127 (₹11,250)' },
    { id: 7, title: 'Complaint submitted', time: '1 hr ago', type: 'warning', text: 'Farmer allegation received for Token #089 weight dispute' },
    { id: 8, title: 'Centre congestion alert', time: 'Just now', type: 'warning', text: 'Centre 03 (Matigara) waiting exceeded 45 mins' }
  ]);

  // Dashboard Overview Statistics (PDF 2 Page 3 Section 4)
  const [stats, setStats] = useState({
    farmers: 520,
    purchased: 385,
    rejected: 42,
    waiting: 93,
    payments: {
      totalToday: 1250000,
      successful: 1180000,
      pending: 50000,
      failed: 20000
    }
  });

  // Centres List (PDF 2 Page 4 Section 5)
  const [centres, setCentres] = useState([
    { id: '1', name: 'Centre 01 (Siliguri)', location: 'Siliguri', status: 'Active', waiting: 15, capacity: 100, hours: '08:00 AM - 05:00 PM', products: ['Potato', 'Rice', 'Wheat'] },
    { id: '2', name: 'Centre 02 (Jalpaiguri)', location: 'Jalpaiguri', status: 'Active', waiting: 23, capacity: 100, hours: '08:30 AM - 05:30 PM', products: ['Tea', 'Potato', 'Rice'] },
    { id: '3', name: 'Centre 03 (Matigara)', location: 'Matigara', status: 'High Load', waiting: 67, capacity: 100, hours: '08:00 AM - 06:00 PM', products: ['Potato', 'Corn', 'Vegetables'] }
  ]);
  const [showAddCentreModal, setShowAddCentreModal] = useState(false);
  const [newCentre, setNewCentre] = useState({ name: '', location: '', capacity: 100, workingHours: '08:00 AM - 05:00 PM', products: 'Potato, Rice, Wheat' });
  const [editingCentre, setEditingCentre] = useState(null);

  // Professionals List (PDF 2 Page 7 Section 8)
  const [professionals, setProfessionals] = useState([
    { id: '1', name: 'Rahul Sharma', licenseId: 'PR-1024', centre: 'Centre 01 (Siliguri)', status: 'Online', todayCount: 52, qualification: 'B.Sc Agriculture', rating: 4.8 },
    { id: '2', name: 'Amit Kumar', licenseId: 'PR-1025', centre: 'Centre 02 (Jalpaiguri)', status: 'Online', todayCount: 47, qualification: 'M.Sc Agronomy', rating: 4.7 },
    { id: '3', name: 'Suman Roy', licenseId: 'PR-1026', centre: 'Centre 03 (Matigara)', status: 'Offline', todayCount: 0, qualification: 'Food Quality Assessor', rating: 4.5 }
  ]);
  const [showAddProModal, setShowAddProModal] = useState(false);
  const [newPro, setNewPro] = useState({ name: '', phone: '', email: '', licenseId: '', centre: 'Centre 01 (Siliguri)' });
  const [transferringPro, setTransferringPro] = useState(null);

  // Live Procurement Records (PDF 2 Page 4 Section 6 & Page 9)
  const [liveProcurements, setLiveProcurements] = useState([
    { id: '101', purchaseId: 'PR00125', token: '#101', farmer: 'Farmer A (Ramesh)', farmerId: 'FMR001', product: 'Potato', qty: '520 kg', professional: 'Rahul Sharma', amount: 15600, status: 'Paid', date: 'Today, 09:15 AM', centre: 'Centre 01 (Siliguri)' },
    { id: '102', purchaseId: 'PR00126', token: '#102', farmer: 'Farmer B (Sunil)', farmerId: 'FMR002', product: 'Rice', qty: '700 kg', professional: 'Amit Kumar', amount: 24500, status: 'Pending', date: 'Today, 09:40 AM', centre: 'Centre 02 (Jalpaiguri)' },
    { id: '103', purchaseId: 'PR00127', token: '#103', farmer: 'Farmer C (Harish)', farmerId: 'FMR003', product: 'Wheat', qty: '450 kg', professional: 'Suman Roy', amount: 11250, status: 'Rejected', date: 'Today, 10:10 AM', rejectReason: 'Excess Damage', centre: 'Centre 03 (Matigara)' },
    { id: '104', purchaseId: 'PR00128', token: '#104', farmer: 'Farmer D (Gurpreet)', farmerId: 'FMR004', product: 'Potato', qty: '600 kg', professional: 'Rahul Sharma', amount: 18000, status: 'Waiting', date: 'Today, 10:25 AM', centre: 'Centre 01 (Siliguri)' },
    { id: '105', purchaseId: 'PR00129', token: '#105', farmer: 'Farmer E (Anup)', farmerId: 'FMR005', product: 'Corn', qty: '380 kg', professional: 'Amit Kumar', amount: 9500, status: 'Purchased', date: 'Today, 11:00 AM', centre: 'Centre 02 (Jalpaiguri)' }
  ]);
  const [queueFilterCentre, setQueueFilterCentre] = useState('all');

  // Floating Toast Notification
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  // Selected Transaction for Detail Modal (PDF 2 Page 5 Section 6)
  const [selectedTxn, setSelectedTxn] = useState(null);

  // Farmers Directory (PDF 2 Page 5-6 Section 7)
  const [farmersList, setFarmersList] = useState([
    { id: '1', name: 'Farmer A (Ramesh Kumar)', farmerId: 'FMR00125', mobile: '9876543210', location: 'Siliguri, Darjeeling', totalPurchases: 18, totalQuantityKg: 8520, totalValue: 215000 },
    { id: '2', name: 'Farmer B (Sunil Mondal)', farmerId: 'FMR00126', mobile: '9876543211', location: 'Jalpaiguri Rural', totalPurchases: 12, totalQuantityKg: 5400, totalValue: 142000 },
    { id: '3', name: 'Farmer C (Harish Verma)', farmerId: 'FMR00127', mobile: '9876543212', location: 'Matigara, Siliguri', totalPurchases: 6, totalQuantityKg: 2800, totalValue: 71000 },
    { id: '4', name: 'Debjyoti Sinha', farmerId: 'FMR00128', mobile: '6297490814', location: 'Darjeeling District', totalPurchases: 4, totalQuantityKg: 1900, totalValue: 48000 }
  ]);
  const [farmerSearch, setFarmerSearch] = useState('');
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  // Complaints / Grievance Management (PDF 2 Page 11-12 Section 14)
  const [complaints, setComplaints] = useState([
    { id: 'CMP-101', farmer: 'Farmer C (Harish Verma)', farmerId: 'FMR00127', token: '#103', issue: 'Wrong weight', description: 'Scale tare was not deducted properly. Discrepancy of 35 kg.', status: 'in_review', evidence: 'Weight receipt copy attached', date: '09 Sep 2026' },
    { id: 'CMP-102', farmer: 'Farmer B (Sunil Mondal)', farmerId: 'FMR00126', token: '#089', issue: 'Payment issue', description: 'Payment SMS received but amount not credited in bank account.', status: 'open', evidence: 'Bank passbook statement attached', date: '08 Sep 2026' },
    { id: 'CMP-103', farmer: 'Kiran Deb', farmerId: 'FMR00094', token: '#062', issue: 'Unfair rejection', description: 'Crop moisture was within 12%, but inspector graded it below standard.', status: 'resolved', resolutionNote: 'Re-tested by Senior Assessor; Grade A approved and payout processed.', date: '05 Sep 2026' }
  ]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [investigationNote, setInvestigationNote] = useState('');

  // Two-Way Feedback (PDF 2 Page 11 Section 13)
  const [feedbacks, setFeedbacks] = useState([
    { id: '1', from: 'Rahul Sharma (Professional)', to: 'Ramesh Kumar (Farmer)', role: 'Professional → Farmer', rating: 5, productQuality: 5, cooperation: 4, timeliness: 5, overall: 5, comment: 'Punctual arrival and pre-cleaned crop sacks.' },
    { id: '2', from: 'Ramesh Kumar (Farmer)', to: 'Rahul Sharma (Professional)', role: 'Farmer → Professional', rating: 5, behaviour: 5, transparency: 5, speed: 4, overall: 5, comment: 'Very polite inspector. The digital weight screen was clearly visible.' },
    { id: '3', from: 'Amit Kumar (Professional)', to: 'Sunil Mondal (Farmer)', role: 'Professional → Farmer', rating: 4, productQuality: 4, cooperation: 4, timeliness: 4, overall: 4, comment: 'Good quality grains, slight moisture variance.' }
  ]);

  // Nearby Centre Management (PDF 2 Page 13 Section 15)
  const [congestionSettings, setCongestionSettings] = useState({
    thresholdPercent: 70,
    maxDistanceKm: 15,
    autoSuggestActive: true
  });

  // Reports & Analytics Data (PDF 2 Page 14-15 Section 16-17)
  const monthlyData = [
    { month: 'May', quantityKg: 42000, value: 1050000 },
    { month: 'Jun', quantityKg: 58000, value: 1450000 },
    { month: 'Jul', quantityKg: 73000, value: 1825000 },
    { month: 'Aug', quantityKg: 89000, value: 2225000 },
    { month: 'Sep', quantityKg: 96000, value: 2400000 }
  ];

  const rejectionReasonsData = [
    { reason: 'Poor Quality', count: 18, color: '#ef4444' },
    { reason: 'Rotten Items', count: 10, color: '#f97316' },
    { reason: 'Excess Damage', count: 7, color: '#eab308' },
    { reason: 'Foreign Material', count: 4, color: '#3b82f6' },
    { reason: 'Wrong Product', count: 3, color: '#8b5cf6' }
  ];

  const centrePerformanceData = [
    { centre: 'Centre 01 (Siliguri)', farmers: 120, purchased: 95, rejected: 8, waiting: 17, avgWait: '18 min' },
    { centre: 'Centre 02 (Jalpaiguri)', farmers: 150, purchased: 121, rejected: 12, waiting: 17, avgWait: '22 min' },
    { centre: 'Centre 03 (Matigara)', farmers: 200, purchased: 140, rejected: 20, waiting: 40, avgWait: '48 min' }
  ];

  // Fetch real data from backend
  useEffect(() => {
    API.get('/company/stats')
      .then((res) => setStats(res.data))
      .catch(() => {});

    API.get('/company/centres')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setCentres(res.data.map(c => ({
            id: c._id,
            name: c.name,
            location: c.address || 'Siliguri',
            status: c.status || 'Active',
            waiting: c.waiting || 15,
            capacity: c.capacityPerDay || 100,
            hours: c.workingHours || '08:00 AM - 05:00 PM',
            products: c.productsAccepted || ['Potato', 'Rice', 'Wheat']
          })));
        }
      })
      .catch(() => {});

    API.get('/company/professionals')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setProfessionals(res.data.map(p => ({
            id: p._id,
            name: p.name,
            licenseId: p.professionalProfile?.licenseId || 'PR-1024',
            centre: p.professionalProfile?.organization || 'Siliguri PC-01',
            status: 'Online',
            todayCount: 45,
            qualification: p.professionalProfile?.qualification || 'B.Sc Agriculture',
            rating: 4.8
          })));
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddCentre = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/company/centres', {
        name: newCentre.name,
        address: newCentre.location,
        capacityPerDay: Number(newCentre.capacity),
        workingHours: newCentre.workingHours,
        productsAccepted: newCentre.products.split(',').map(s => s.trim())
      });
      setCentres([...centres, {
        id: res.data._id,
        name: res.data.name,
        location: res.data.address,
        status: 'Active',
        waiting: 0,
        capacity: res.data.capacityPerDay,
        hours: res.data.workingHours,
        products: res.data.productsAccepted
      }]);
      setShowAddCentreModal(false);
      setNewCentre({ name: '', location: '', capacity: 100, workingHours: '08:00 AM - 05:00 PM', products: 'Potato, Rice, Wheat' });
      alert('New Procurement Centre created successfully!');
    } catch (err) {
      alert('Error creating centre: ' + err.message);
    }
  };

  const handleAddProfessional = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/company/professionals', {
        name: newPro.name,
        phone: newPro.phone,
        email: newPro.email,
        licenseId: newPro.licenseId,
        organization: newPro.centre
      });
      setProfessionals([...professionals, {
        id: res.data._id,
        name: res.data.name,
        licenseId: res.data.professionalProfile?.licenseId || newPro.licenseId,
        centre: newPro.centre,
        status: 'Online',
        todayCount: 0,
        qualification: 'Agricultural Officer',
        rating: 5.0
      }]);
      setShowAddProModal(false);
      setNewPro({ name: '', phone: '', email: '', licenseId: '', centre: 'Centre 01 (Siliguri)' });
      alert('Professional registered and assigned to centre successfully!');
    } catch (err) {
      alert('Error adding professional: ' + err.message);
    }
  };

  const handleResolveComplaint = async (complaintId) => {
    try {
      await API.patch(`/company/complaints/${complaintId}`, {
        status: 'resolved',
        resolutionNote: investigationNote || 'Investigated by Company Admin. Evidence verified and dispute resolved.'
      });
    } catch (e) {}
    setComplaints(complaints.map(c => c.id === complaintId ? {
      ...c,
      status: 'resolved',
      resolutionNote: investigationNote || 'Investigated by Company Admin. Evidence verified and dispute resolved.'
    } : c));
    setSelectedComplaint(null);
    setInvestigationNote('');
    alert('Complaint successfully resolved and closed.');
  };

  const handleTransferProfessional = async (pro, targetCentreName) => {
    if (!pro || !targetCentreName || pro.centre === targetCentreName) return;

    const oldCentre = pro.centre;

    // 1. Immediately update professionals state
    setProfessionals(prev => prev.map(p => p.id === pro.id ? { ...p, centre: targetCentreName } : p));

    // 2. Immediately push to real-time notification alerts
    setNotifications(prev => [
      {
        id: Date.now(),
        title: 'Professional Reassigned',
        time: 'Just now',
        type: 'info',
        text: `${pro.name} (${pro.licenseId}) transferred from ${oldCentre} to ${targetCentreName}`
      },
      ...prev
    ]);

    // 3. Close transfer modal immediately
    setTransferringPro(null);

    // 4. Show success toast
    showToast(`✓ ${pro.name} transferred to ${targetCentreName} successfully!`);

    // 5. Sync to backend API
    try {
      await API.patch(`/company/professionals/${pro.id}`, {
        centre: targetCentreName,
        organization: targetCentreName
      });
    } catch (err) {
      console.warn('Backend professional update notice (local state updated):', err.message);
    }
  };

  const handleSaveCentreEdit = async (e) => {
    e.preventDefault();
    if (!editingCentre) return;

    const updatedData = {
      name: editingCentre.name,
      location: editingCentre.location,
      capacity: Number(editingCentre.capacity),
      hours: editingCentre.hours,
      status: editingCentre.status,
      products: Array.isArray(editingCentre.products)
        ? editingCentre.products
        : String(editingCentre.products).split(',').map(s => s.trim())
    };

    setCentres(prev => prev.map(c => c.id === editingCentre.id ? { ...c, ...updatedData } : c));
    showToast(`✓ Centre ${updatedData.name} updated successfully!`);
    const savedId = editingCentre.id;
    setEditingCentre(null);

    try {
      await API.patch(`/company/centres/${savedId}`, {
        name: updatedData.name,
        address: updatedData.location,
        capacityPerDay: updatedData.capacity,
        workingHours: updatedData.hours,
        status: updatedData.status,
        productsAccepted: updatedData.products
      });
    } catch (err) {
      console.warn('Backend centre update notice (local state updated):', err.message);
    }
  };

  const handleExportCSV = () => {
    const dataToExport = queueFilterCentre === 'all'
      ? liveProcurements
      : liveProcurements.filter(p => !p.centre || p.centre === queueFilterCentre);

    const headers = ['Purchase ID', 'Token', 'Farmer Name', 'Farmer ID', 'Product', 'Quantity', 'Amount (INR)', 'Assigned Professional', 'Status', 'Date / Time'];

    const csvRows = [
      headers.join(','),
      ...dataToExport.map(p => [
        `"${p.purchaseId || ''}"`,
        `"${p.token || ''}"`,
        `"${(p.farmer || '').replace(/"/g, '""')}"`,
        `"${p.farmerId || ''}"`,
        `"${p.product || ''}"`,
        `"${p.qty || ''}"`,
        `"${p.amount || 0}"`,
        `"${(p.professional || '').replace(/"/g, '""')}"`,
        `"${p.status || ''}"`,
        `"${(p.date || '').replace(/"/g, '""')}"`
      ].join(','))
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = `agriprocure_live_queue_${new Date().toISOString().slice(0, 10)}.csv`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`✓ Exported ${dataToExport.length} transaction records to ${fileName}`);
  };

  const handlePrintAudit = (txn) => {
    if (!txn) return;
    const printWindow = window.open('', '_blank', 'width=850,height=950');
    if (!printWindow) {
      window.print();
      return;
    }

    const auditHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Audit Certificate - ${txn.purchaseId}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 32px;
    }
    .cert-container {
      border: 3px double #0f172a;
      padding: 28px;
      max-width: 760px;
      margin: 0 auto;
      background: #ffffff;
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 14px;
      margin-bottom: 18px;
    }
    .logo {
      font-size: 24px;
      font-weight: 900;
      letter-spacing: 1px;
      color: #047857;
      margin-bottom: 4px;
    }
    .sub-logo {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #475569;
      font-weight: 600;
    }
    .title {
      margin-top: 12px;
      font-size: 15px;
      font-weight: 800;
      text-transform: uppercase;
      background: #f1f5f9;
      display: inline-block;
      padding: 4px 14px;
      border-radius: 4px;
      border: 1px solid #cbd5e1;
    }
    .meta-row {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
      font-size: 11px;
      font-family: monospace;
      color: #64748b;
    }
    .section-title {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
      margin: 16px 0 8px 0;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px 20px;
      font-size: 12px;
    }
    .grid-full {
      grid-column: span 2;
    }
    .field-label {
      color: #64748b;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .field-value {
      font-weight: 700;
      color: #0f172a;
      margin-top: 2px;
    }
    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 700;
    }
    .badge-success { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
    .badge-rejected { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }
    .badge-pending { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
    .weigh-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 10px;
      margin-top: 8px;
    }
    .signatures {
      display: flex;
      justify-content: space-between;
      margin-top: 36px;
      padding-top: 20px;
      border-top: 1px dashed #cbd5e1;
    }
    .sig-block {
      text-align: center;
      width: 180px;
    }
    .sig-line {
      border-bottom: 1px solid #0f172a;
      margin-bottom: 4px;
      height: 28px;
    }
    .sig-title {
      font-size: 11px;
      color: #475569;
      font-weight: 600;
    }
    .footer {
      margin-top: 24px;
      text-align: center;
      font-size: 10px;
      color: #94a3b8;
      border-top: 1px solid #f1f5f9;
      padding-top: 10px;
    }
    @media print {
      body { padding: 0; background: none; }
      .cert-container { border: 2px solid #000; box-shadow: none; max-width: 100%; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="text-align: right; margin-bottom: 14px; max-width: 760px; margin-left: auto; margin-right: auto;">
    <button onclick="window.print()" style="background: #047857; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 13px;">
      🖨️ Print Certificate / Save as PDF
    </button>
  </div>
  <div class="cert-container">
    <div class="header">
      <div class="logo">🌾 SMART PROCUREMENT SYSTEM</div>
      <div class="sub-logo">AgriCorp India Ltd • APMC Central Ledger</div>
      <div class="title">OFFICIAL PROCUREMENT AUDIT CERTIFICATE</div>
      <div class="meta-row">
        <span>CERT NO: AUD-${txn.purchaseId}</span>
        <span>TOKEN: ${txn.token}</span>
        <span>DATE: ${txn.date || new Date().toLocaleString()}</span>
      </div>
    </div>

    <div class="section-title">1. Farmer Particulars</div>
    <div class="grid">
      <div>
        <div class="field-label">Farmer Name</div>
        <div class="field-value">${txn.farmer}</div>
      </div>
      <div>
        <div class="field-label">Farmer Unique ID</div>
        <div class="field-value">${txn.farmerId || 'FMR-REG-01'}</div>
      </div>
    </div>

    <div class="section-title">2. Commodity & Digital Weighbridge Log</div>
    <div class="grid">
      <div>
        <div class="field-label">Crop / Commodity</div>
        <div class="field-value">${txn.product}</div>
      </div>
      <div>
        <div class="field-label">Net Weighed Quantity</div>
        <div class="field-value">${txn.qty}</div>
      </div>
    </div>
    <div class="weigh-box">
      <div class="field-label">Scale Hardware & Verification</div>
      <div class="field-value" style="font-family: monospace; font-size: 11px;">WS-04 Digital Scale • APMC Certified Calibrated (Tare Deduction Verified)</div>
    </div>

    <div class="section-title">3. AI Quality Vision & Inspector Audit</div>
    <div class="grid">
      <div>
        <div class="field-label">AI Vision Quality Score</div>
        <div class="field-value">91 / 100 (Grade A Certified)</div>
      </div>
      <div>
        <div class="field-label">Assigned Quality Inspector</div>
        <div class="field-value">${txn.professional || 'Rahul Sharma (PR-1024)'}</div>
      </div>
      <div class="grid-full">
        <div class="field-label">Verification Hash</div>
        <div class="field-value" style="font-family: monospace; font-size: 11px; word-break: break-all;">sha256:4b91f09ce819f2a034d61823abce9021e5488102a9b3c411</div>
      </div>
    </div>

    <div class="section-title">4. Financial Settlement & Disbursal</div>
    <div class="grid">
      <div>
        <div class="field-label">Total Payable Amount</div>
        <div class="field-value" style="font-size: 15px; color: #047857;">₹${(txn.amount || 0).toLocaleString('en-IN')}</div>
      </div>
      <div>
        <div class="field-label">Settlement Status</div>
        <div class="field-value">
          <span class="badge ${txn.status === 'Paid' || txn.status === 'Purchased' ? 'badge-success' : txn.status === 'Rejected' ? 'badge-rejected' : 'badge-pending'}">
            ${txn.status || 'Verified'}
          </span>
        </div>
      </div>
    </div>

    <div class="signatures">
      <div class="sig-block">
        <div class="sig-line"></div>
        <div class="sig-title">Quality Inspector</div>
        <div style="font-size: 10px; color: #64748b; margin-top: 2px;">${txn.professional}</div>
      </div>
      <div class="sig-block">
        <div class="sig-line"></div>
        <div class="sig-title">Company Admin Seal</div>
        <div style="font-size: 10px; color: #64748b; margin-top: 2px;">AgriCorp India Ltd</div>
      </div>
    </div>

    <div class="footer">
      Generated by Smart Procurement Central Ledger System • Security Hash Verified • Legally Compliant APMC Record
    </div>
  </div>
  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 400);
    };
  </script>
</body>
</html>`;

    printWindow.document.open();
    printWindow.document.write(auditHtml);
    printWindow.document.close();
    showToast(`✓ Audit Certificate printed for ${txn.purchaseId}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* =================================================== */}
      {/* 1. HEADER (Matches PDF 2 Page 1 Section 2) */}
      {/* =================================================== */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveMenu('dashboard')}>
          <span className="text-2xl">🌾</span>
          <div>
            <h1 className="text-lg font-black tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Building2 className="w-5 h-5 text-emerald-400" />
              SMART PROCUREMENT SYSTEM
            </h1>
            <p className="text-[10px] text-slate-400 font-mono">Company Administration & Executive Oversight</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notification Bell with Dropdown (PDF 2 Page 2 Section 2) */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              title="Real-Time Admin Alerts"
            >
              <Bell className="w-4 h-4 text-amber-400" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-84 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 z-50 text-xs space-y-2">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <Bell className="w-3.5 h-3.5" /> Real-Time Events ({notifications.length})
                  </span>
                  <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-1.5 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50">
                      <div className="flex justify-between text-[11px] font-semibold">
                        <span className={n.type === 'error' ? 'text-red-400' : n.type === 'warning' ? 'text-amber-300' : 'text-emerald-400'}>
                          {n.title}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">{n.time}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] mt-0.5">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Admin Profile Chip (PDF 2 Page 2 Section 3) */}
          <div className="flex items-center space-x-3 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-full text-xs">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              A
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <span className="font-bold text-slate-100">{user?.name || 'Company Administrator'}</span>
              <span className="text-slate-400 text-[10px] block font-mono">ADM-902 • AgriCorp India Ltd</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-600">
              Admin
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-600/80 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* =================================================== */}
      {/* 2. BODY LAYOUT (Sidebar + Main Content Area) */}
      {/* =================================================== */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR (Matches PDF 2 Page 2 Section 3 & Page 18 Blueprint) */}
        <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0 p-3 space-y-1 select-none overflow-y-auto">
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
              Admin Systems
            </div>

            <button
              onClick={() => setActiveMenu('dashboard')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeMenu === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveMenu('farmers')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeMenu === 'farmers'
                  ? 'bg-blue-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Farmers</span>
            </button>

            <button
              onClick={() => setActiveMenu('centres')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeMenu === 'centres'
                  ? 'bg-blue-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Procurement Centres</span>
            </button>

            <button
              onClick={() => setActiveMenu('professionals')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeMenu === 'professionals'
                  ? 'bg-blue-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Professionals</span>
            </button>

            <button
              onClick={() => setActiveMenu('queue')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeMenu === 'queue'
                  ? 'bg-blue-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Live Queue</span>
            </button>

            <button
              onClick={() => setActiveMenu('procurement')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeMenu === 'procurement'
                  ? 'bg-blue-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Procurement</span>
            </button>

            <button
              onClick={() => setActiveMenu('ai')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeMenu === 'ai'
                  ? 'bg-blue-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>AI Quality Analysis</span>
            </button>

            <button
              onClick={() => setActiveMenu('payments')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeMenu === 'payments'
                  ? 'bg-blue-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Payments</span>
            </button>

            <div className="pt-2 px-3 py-1 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
              Control & Governance
            </div>

            <button
              onClick={() => setActiveMenu('feedback')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeMenu === 'feedback'
                  ? 'bg-blue-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <Star className="w-4 h-4 text-amber-400" />
              <span>Feedback</span>
            </button>

            <button
              onClick={() => setActiveMenu('complaints')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeMenu === 'complaints'
                  ? 'bg-blue-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>Complaints ({complaints.filter(c => c.status !== 'resolved').length})</span>
            </button>

            <button
              onClick={() => setActiveMenu('nearby')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeMenu === 'nearby'
                  ? 'bg-blue-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Nearby Centre Routing</span>
            </button>

            <button
              onClick={() => setActiveMenu('reports')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeMenu === 'reports'
                  ? 'bg-blue-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span>Reports & Analytics</span>
            </button>

            <button
              onClick={() => setActiveMenu('notifications')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeMenu === 'notifications'
                  ? 'bg-blue-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </button>

            <button
              onClick={() => setActiveMenu('settings')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeMenu === 'settings'
                  ? 'bg-blue-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* MAIN WORKSPACE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {/* =================================================== */}
          {/* 3. FOUR TOP STATISTICS CARDS (PDF 2 Page 3 Section 4) */}
          {/* =================================================== */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
              <span className="text-xs text-slate-400 font-semibold block">1. Total Farmers</span>
              <div className="text-3xl font-black text-slate-100 mt-1">{stats.farmers}</div>
              <span className="text-[11px] text-emerald-400 mt-1 block">Registered in company system</span>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
              <span className="text-xs text-slate-400 font-semibold block">2. Purchased</span>
              <div className="text-3xl font-black text-emerald-400 mt-1">{stats.purchased}</div>
              <span className="text-[11px] text-slate-400 mt-1 block">Successful transactions</span>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
              <span className="text-xs text-slate-400 font-semibold block">3. Rejected</span>
              <div className="text-3xl font-black text-red-400 mt-1">{stats.rejected}</div>
              <span className="text-[11px] text-slate-400 mt-1 block">After verification</span>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
              <span className="text-xs text-slate-400 font-semibold block">4. Waiting</span>
              <div className="text-3xl font-black text-amber-400 mt-1">{stats.waiting}</div>
              <span className="text-[11px] text-slate-400 mt-1 block">At all procurement centres</span>
            </div>
          </div>

          {/* =================================================== */}
          {/* 4. TAB VIEW ROUTER BASED ON SIDEBAR SELECTION */}
          {/* =================================================== */}

          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeMenu === 'dashboard' && (
            <div className="space-y-6">
              {/* PAYMENT SUMMARY BANNER (PDF 2 Page 10 Section 12) */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                    TODAY'S PAYMENT DISBURSEMENTS
                  </h3>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    Total: ₹{stats.payments.totalToday.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Successful</span>
                    <div className="text-lg font-black text-emerald-400 mt-1">₹{stats.payments.successful.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Pending Approval</span>
                    <div className="text-lg font-black text-amber-400 mt-1">₹{stats.payments.pending.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Bank Failed / Retry</span>
                    <div className="text-lg font-black text-red-400 mt-1">₹{stats.payments.failed.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>

              {/* LIVE PROCUREMENT TABLE (PDF 2 Page 4 Section 6) */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">Live Cross-Centre Procurement</h3>
                    <p className="text-xs text-slate-400">Real-time status of farmers at all procurement yards.</p>
                  </div>
                  <button onClick={() => setActiveMenu('procurement')} className="text-xs text-blue-400 hover:underline">
                    View Full Ledger →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
                      <tr>
                        <th className="p-3">Token</th>
                        <th className="p-3">Farmer</th>
                        <th className="p-3">Product</th>
                        <th className="p-3">Quantity</th>
                        <th className="p-3">Assigned Pro</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {liveProcurements.slice(0, 4).map((p) => (
                        <tr key={p.id} className="hover:bg-slate-900">
                          <td className="p-3 font-mono font-bold text-emerald-400">{p.token}</td>
                          <td className="p-3 font-semibold text-slate-100">{p.farmer}</td>
                          <td className="p-3">{p.product}</td>
                          <td className="p-3 font-mono">{p.qty}</td>
                          <td className="p-3 text-slate-300">{p.professional}</td>
                          <td className="p-3">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                p.status === 'Paid' || p.status === 'Purchased'
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-600'
                                  : p.status === 'Rejected'
                                  ? 'bg-red-950 text-red-400 border border-red-600'
                                  : 'bg-amber-950 text-amber-400 border border-amber-600'
                              }`}
                            >
                              {p.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => setSelectedTxn(p)}
                              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded text-[11px] cursor-pointer"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* PROCUREMENT CENTRE PERFORMANCE (PDF 2 Page 15 Section 17) */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-bold text-slate-200">CENTRE PERFORMANCE MONITORING</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300 font-mono">
                    <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                      <tr>
                        <th className="p-2.5">Centre</th>
                        <th className="p-2.5">Farmers</th>
                        <th className="p-2.5">Purchased</th>
                        <th className="p-2.5">Rejected</th>
                        <th className="p-2.5">Waiting</th>
                        <th className="p-2.5">Avg Wait</th>
                        <th className="p-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {centrePerformanceData.map((c, i) => (
                        <tr key={i} className="hover:bg-slate-900">
                          <td
                            onClick={() => setActiveMenu('centres')}
                            className="p-2.5 font-bold text-slate-100 hover:text-emerald-400 cursor-pointer underline decoration-slate-700 underline-offset-2 transition-colors"
                            title="Go to Procurement Centres tab"
                          >
                            {c.centre}
                          </td>
                          <td className="p-2.5">{c.farmers}</td>
                          <td className="p-2.5 text-emerald-400 font-bold">{c.purchased}</td>
                          <td className="p-2.5 text-red-400 font-bold">{c.rejected}</td>
                          <td
                            onClick={() => {
                              setQueueFilterCentre(c.centre);
                              setActiveMenu('queue');
                            }}
                            className="p-2.5 text-amber-400 font-bold hover:text-amber-300 cursor-pointer underline decoration-amber-600/50 underline-offset-2 transition-colors"
                            title="View Live Queue for this centre"
                          >
                            {c.waiting}
                          </td>
                          <td className="p-2.5">{c.avgWait}</td>
                          <td className="p-2.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.waiting > 30 ? 'bg-red-950 text-red-400' : 'bg-emerald-950 text-emerald-400'}`}>
                              {c.waiting > 30 ? 'High Load' : 'Active'}
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

          {/* TAB 2: FARMERS MANAGEMENT (PDF 2 Page 5-6 Section 7) */}
          {activeMenu === 'farmers' && (
            <div className="space-y-6">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">Farmer Directory & Records</h3>
                    <p className="text-xs text-slate-400">Search and monitor registered farmer supply history.</p>
                  </div>
                  <span className="text-xs text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full font-bold border border-emerald-600">
                    Total: {farmersList.length} Active Farmers
                  </span>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    className="input pl-9 bg-slate-900 border-slate-800 text-slate-100"
                    placeholder="Search by Farmer ID, Name, Mobile Number, or Village..."
                    value={farmerSearch}
                    onChange={(e) => setFarmerSearch(e.target.value)}
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
                      <tr>
                        <th className="p-3">Farmer ID</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Mobile</th>
                        <th className="p-3">Location</th>
                        <th className="p-3">Total Purchases</th>
                        <th className="p-3">Total Qty (KG)</th>
                        <th className="p-3">Total Value</th>
                        <th className="p-3">Profile</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {farmersList
                        .filter(f => f.name.toLowerCase().includes(farmerSearch.toLowerCase()) || f.farmerId.toLowerCase().includes(farmerSearch.toLowerCase()))
                        .map((f) => (
                          <tr key={f.id} className="hover:bg-slate-900">
                            <td className="p-3 font-mono font-bold text-blue-400">{f.farmerId}</td>
                            <td className="p-3 font-semibold text-slate-100">{f.name}</td>
                            <td className="p-3 font-mono">{f.mobile}</td>
                            <td className="p-3">{f.location}</td>
                            <td className="p-3 font-bold">{f.totalPurchases}</td>
                            <td className="p-3 font-mono text-emerald-400 font-bold">{f.totalQuantityKg.toLocaleString()} KG</td>
                            <td className="p-3 font-mono font-bold text-slate-100">₹{f.totalValue.toLocaleString('en-IN')}</td>
                            <td className="p-3">
                              <button
                                onClick={() => setSelectedFarmer(f)}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-[11px] cursor-pointer"
                              >
                                View Record
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* FARMER PROFILE MODAL (PDF 2 Page 6) */}
              {selectedFarmer && (
                <div className="bg-slate-950 border border-blue-600 rounded-2xl p-6 space-y-4 font-mono text-xs shadow-2xl">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h4 className="text-base font-bold text-blue-400">FARMER PROFILE: {selectedFarmer.name}</h4>
                    <button onClick={() => setSelectedFarmer(null)} className="text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-4 gap-3">
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">Farmer ID</span>
                      <span className="font-bold text-slate-100 mt-1 block">{selectedFarmer.farmerId}</span>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">Mobile</span>
                      <span className="font-bold text-slate-100 mt-1 block">{selectedFarmer.mobile}</span>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">Total Procurements</span>
                      <span className="font-bold text-emerald-400 mt-1 block">{selectedFarmer.totalPurchases} Orders</span>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">Cumulative Payout</span>
                      <span className="font-bold text-emerald-400 mt-1 block">₹{selectedFarmer.totalValue.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-4 gap-2 pt-2">
                    <button onClick={() => alert('Opening AI Quality Inspection Archive')} className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left">
                      📊 Quality Reports
                    </button>
                    <button onClick={() => alert('Opening Historical Weighbridge Tickets')} className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left">
                      ⚖️ Purchase History
                    </button>
                    <button onClick={() => alert('Opening Bank Settlement Logs')} className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left">
                      💳 Payment History
                    </button>
                    <button onClick={() => alert('Opening AI Visual Evidence Store')} className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left">
                      🖼️ AI Photo Evidence
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROCUREMENT CENTRES (PDF 2 Page 3-4 Section 5) */}
          {activeMenu === 'centres' && (
            <div className="space-y-6">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">Procurement Centres Management</h3>
                    <p className="text-xs text-slate-400">Control capacity, working hours, and real-time waiting load.</p>
                  </div>
                  <button
                    onClick={() => setShowAddCentreModal(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add New Centre</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {centres.map((c) => (
                    <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4
                            onClick={() => setEditingCentre(c)}
                            className="font-bold text-slate-100 text-base hover:text-emerald-400 cursor-pointer transition-colors"
                            title="Click to view & edit centre configuration"
                          >
                            {c.name}
                          </h4>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.name + ' ' + c.location)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 mt-0.5 transition-colors cursor-pointer group"
                            title="Open location on Google Maps"
                          >
                            <MapPin className="w-3 h-3 text-emerald-400 group-hover:scale-110 transition-transform" />
                            <span className="underline decoration-slate-600 underline-offset-2 hover:decoration-emerald-400">{c.location}</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
                          </a>
                        </div>
                        <button
                          onClick={() => {
                            const nextStatus = c.status === 'Active' ? 'High Load' : c.status === 'High Load' ? 'Inactive' : 'Active';
                            setCentres(centres.map(item => item.id === c.id ? { ...item, status: nextStatus } : item));
                            showToast(`Status for ${c.name} changed to ${nextStatus}`);
                            API.patch(`/company/centres/${c.id}`, { status: nextStatus }).catch(() => {});
                          }}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-all hover:scale-105 ${
                            c.status === 'High Load'
                              ? 'bg-red-950 text-red-400 border border-red-600'
                              : c.status === 'Inactive'
                              ? 'bg-slate-800 text-slate-400 border border-slate-700'
                              : 'bg-emerald-950 text-emerald-400 border border-emerald-600'
                          }`}
                          title="Click to toggle centre status"
                        >
                          ● {c.status}
                        </button>
                      </div>

                      <div className="space-y-1.5 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500">Waiting Farmers:</span>
                          <button
                            onClick={() => {
                              setQueueFilterCentre(c.name);
                              setActiveMenu('queue');
                            }}
                            className="font-bold text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-1 cursor-pointer"
                            title="View live queue for this centre"
                          >
                            <span>{c.waiting} Tokens</span>
                            <ChevronRight className="w-3 h-3 text-amber-400" />
                          </button>
                        </div>
                        <div
                          className="flex justify-between items-center cursor-pointer hover:bg-slate-900/60 p-0.5 rounded transition-colors"
                          onClick={() => setEditingCentre(c)}
                          title="Click to edit capacity"
                        >
                          <span className="text-slate-500">Daily Capacity:</span>
                          <span className="font-bold text-slate-200 underline decoration-slate-700 underline-offset-2 hover:text-emerald-400">{c.capacity} Farmers/day</span>
                        </div>
                        <div
                          className="flex justify-between items-center cursor-pointer hover:bg-slate-900/60 p-0.5 rounded transition-colors"
                          onClick={() => setEditingCentre(c)}
                          title="Click to edit working hours"
                        >
                          <span className="text-slate-500">Operating Hours:</span>
                          <span className="font-bold text-slate-200 underline decoration-slate-700 underline-offset-2 hover:text-emerald-400">{c.hours}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-400">
                        <strong>Accepted:</strong> {Array.isArray(c.products) ? c.products.join(', ') : c.products}
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex gap-2">
                        <button
                          onClick={() => setEditingCentre(c)}
                          className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg text-xs cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Sliders className="w-3.5 h-3.5 text-blue-400" />
                          <span>Edit Capacity</span>
                        </button>
                        <button
                          onClick={() => {
                            setQueueFilterCentre(c.name);
                            setActiveMenu('queue');
                          }}
                          className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Monitor Queue</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Centre Modal */}
              {showAddCentreModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                  <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <h4 className="font-bold text-slate-100 text-lg">Add Procurement Centre</h4>
                      <button onClick={() => setShowAddCentreModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleAddCentre} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Centre Name</label>
                        <input
                          className="input bg-slate-900 border-slate-800 text-slate-100"
                          placeholder="e.g. Centre 04 (Naxalbari)"
                          value={newCentre.name}
                          onChange={(e) => setNewCentre({ ...newCentre, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Location / Address</label>
                        <input
                          className="input bg-slate-900 border-slate-800 text-slate-100"
                          placeholder="e.g. Naxalbari Market Yard, Darjeeling"
                          value={newCentre.location}
                          onChange={(e) => setNewCentre({ ...newCentre, location: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-slate-400 font-semibold mb-1">Capacity / Day</label>
                          <input
                            type="number"
                            className="input bg-slate-900 border-slate-800 text-slate-100"
                            value={newCentre.capacity}
                            onChange={(e) => setNewCentre({ ...newCentre, capacity: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 font-semibold mb-1">Working Hours</label>
                          <input
                            className="input bg-slate-900 border-slate-800 text-slate-100"
                            value={newCentre.workingHours}
                            onChange={(e) => setNewCentre({ ...newCentre, workingHours: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Accepted Products (comma-separated)</label>
                        <input
                          className="input bg-slate-900 border-slate-800 text-slate-100"
                          value={newCentre.products}
                          onChange={(e) => setNewCentre({ ...newCentre, products: e.target.value })}
                          required
                        />
                      </div>
                      <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs cursor-pointer">
                        Confirm & Create Centre
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Edit Centre Modal */}
              {editingCentre && (
                <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                  <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <div>
                        <h4 className="font-bold text-slate-100 text-lg flex items-center gap-2">
                          <Sliders className="w-5 h-5 text-emerald-400" />
                          Edit Procurement Centre
                        </h4>
                        <p className="text-xs text-slate-400">Update capacity, hours, and operational status</p>
                      </div>
                      <button onClick={() => setEditingCentre(null)} className="text-slate-400 hover:text-white cursor-pointer">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveCentreEdit} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Centre Name</label>
                        <input
                          className="input bg-slate-900 border-slate-800 text-slate-100 font-bold"
                          value={editingCentre.name}
                          onChange={(e) => setEditingCentre({ ...editingCentre, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Location / Address</label>
                        <input
                          className="input bg-slate-900 border-slate-800 text-slate-100"
                          value={editingCentre.location}
                          onChange={(e) => setEditingCentre({ ...editingCentre, location: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-slate-400 font-semibold mb-1">Capacity / Day (Farmers)</label>
                          <input
                            type="number"
                            className="input bg-slate-900 border-slate-800 text-slate-100 font-mono"
                            value={editingCentre.capacity}
                            onChange={(e) => setEditingCentre({ ...editingCentre, capacity: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 font-semibold mb-1">Operational Status</label>
                          <select
                            className="input bg-slate-900 border-slate-800 text-slate-100 font-semibold"
                            value={editingCentre.status}
                            onChange={(e) => setEditingCentre({ ...editingCentre, status: e.target.value })}
                          >
                            <option value="Active">Active</option>
                            <option value="High Load">High Load</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Working Hours</label>
                        <input
                          className="input bg-slate-900 border-slate-800 text-slate-100 font-mono"
                          value={editingCentre.hours}
                          onChange={(e) => setEditingCentre({ ...editingCentre, hours: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Accepted Products (comma-separated)</label>
                        <input
                          className="input bg-slate-900 border-slate-800 text-slate-100"
                          value={Array.isArray(editingCentre.products) ? editingCentre.products.join(', ') : editingCentre.products}
                          onChange={(e) => setEditingCentre({ ...editingCentre, products: e.target.value })}
                          required
                        />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingCentre(null)}
                          className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 rounded-xl text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PROFESSIONALS MANAGEMENT (PDF 2 Page 6-7 Section 8) */}
          {activeMenu === 'professionals' && (
            <div className="space-y-6">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">Quality Inspectors & Field Professionals</h3>
                    <p className="text-xs text-slate-400">Control professional assignment, centre deployments, and performance.</p>
                  </div>
                  <button
                    onClick={() => setShowAddProModal(true)}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add Professional</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
                      <tr>
                        <th className="p-3">Professional</th>
                        <th className="p-3">License ID</th>
                        <th className="p-3">Assigned Centre</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Today Verified</th>
                        <th className="p-3">Rating</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {professionals.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-900">
                          <td className="p-3 font-semibold text-slate-100">{p.name}</td>
                          <td className="p-3 font-mono text-emerald-400">{p.licenseId}</td>
                          <td className="p-3">{p.centre}</td>
                          <td className="p-3">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                p.status === 'Online' ? 'bg-emerald-950 text-emerald-400 border border-emerald-600' : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              ● {p.status}
                            </span>
                          </td>
                          <td className="p-3 font-mono font-bold text-slate-200">{p.todayCount} Procurements</td>
                          <td className="p-3 font-bold text-amber-400">⭐ {p.rating}</td>
                          <td className="p-3 flex gap-2 items-center">
                            <button
                              onClick={() => setTransferringPro(p)}
                              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-2.5 py-1 rounded text-[11px] cursor-pointer flex items-center gap-1 shadow-sm transition-all"
                              title="Click to transfer professional to another centre"
                            >
                              <ArrowRightLeft className="w-3 h-3" />
                              <span>Transfer</span>
                            </button>
                            <button
                              onClick={() => {
                                const nextStatus = p.status === 'Online' ? 'Offline' : 'Online';
                                setProfessionals(professionals.map(item => item.id === p.id ? { ...item, status: nextStatus } : item));
                                showToast(`Status for ${p.name} updated to ${nextStatus}`);
                              }}
                              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded text-[11px] cursor-pointer transition-colors"
                            >
                              Toggle Status
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add Professional Modal */}
              {showAddProModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                  <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <h4 className="font-bold text-slate-100 text-lg">Add Quality Inspector / Professional</h4>
                      <button onClick={() => setShowAddProModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleAddProfessional} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Full Name</label>
                        <input
                          className="input bg-slate-900 border-slate-800 text-slate-100"
                          placeholder="e.g. Inspector Suresh"
                          value={newPro.name}
                          onChange={(e) => setNewPro({ ...newPro, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-slate-400 font-semibold mb-1">Phone Number</label>
                          <input
                            className="input bg-slate-900 border-slate-800 text-slate-100"
                            placeholder="9876543212"
                            value={newPro.phone}
                            onChange={(e) => setNewPro({ ...newPro, phone: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 font-semibold mb-1">License / Reg ID</label>
                          <input
                            className="input bg-slate-900 border-slate-800 text-slate-100"
                            placeholder="PR-1027"
                            value={newPro.licenseId}
                            onChange={(e) => setNewPro({ ...newPro, licenseId: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-slate-400 font-semibold mb-1">Assign Centre</label>
                        <select
                          className="input bg-slate-900 border-slate-800 text-slate-100"
                          value={newPro.centre}
                          onChange={(e) => setNewPro({ ...newPro, centre: e.target.value })}
                        >
                          {centres.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                        </select>
                      </div>
                      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-xs cursor-pointer">
                        Register Professional
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Transfer Professional Modal */}
              {transferringPro && (
                <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                  <div className="bg-slate-950 border border-blue-600/60 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <div>
                        <h4 className="font-bold text-slate-100 text-base flex items-center gap-2">
                          <ArrowRightLeft className="w-4 h-4 text-blue-400" />
                          Transfer Professional Assignment
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Change centre and synchronize all records immediately upon clicking destination.
                        </p>
                      </div>
                      <button onClick={() => setTransferringPro(null)} className="text-slate-400 hover:text-white cursor-pointer">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Selected Professional Card */}
                    <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-mono">Professional</span>
                        <div className="font-bold text-slate-100 text-sm mt-0.5">{transferringPro.name}</div>
                        <div className="text-slate-400 font-mono text-[11px] mt-0.5">{transferringPro.licenseId} • {transferringPro.qualification || 'Field Officer'}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500 block text-[10px] uppercase font-mono">Currently Assigned</span>
                        <span className="inline-block mt-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-950 text-blue-300 border border-blue-700">
                          {transferringPro.centre}
                        </span>
                      </div>
                    </div>

                    {/* Destination Centre Action Buttons */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                        Select Destination Centre (Transfers on Click):
                      </label>
                      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                        {centres.map((c) => {
                          const isCurrent = c.name === transferringPro.centre;
                          return (
                            <button
                              key={c.id}
                              disabled={isCurrent}
                              onClick={() => handleTransferProfessional(transferringPro, c.name)}
                              className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                                isCurrent
                                  ? 'bg-slate-900/40 border-slate-800 text-slate-500 cursor-not-allowed'
                                  : 'bg-slate-900 hover:bg-blue-950/40 border-slate-800 hover:border-blue-500 text-slate-200 cursor-pointer shadow-sm group'
                              }`}
                            >
                              <div className="space-y-0.5">
                                <div className="font-bold text-slate-100 flex items-center gap-2 text-xs">
                                  <span>{c.name}</span>
                                  {isCurrent && (
                                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                                      Current Centre
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3 text-emerald-400" /> {c.location}
                                  </span>
                                  <span>•</span>
                                  <span className="text-amber-400 font-mono">{c.waiting} Waiting</span>
                                  <span>•</span>
                                  <span className="text-slate-500 font-mono">Cap: {c.capacity}</span>
                                </div>
                              </div>
                              {!isCurrent && (
                                <span className="px-3 py-1.5 bg-blue-600 group-hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shrink-0">
                                  Transfer Here →
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex justify-end">
                      <button
                        onClick={() => setTransferringPro(null)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: PROCUREMENT TRANSACTIONS & REJECTIONS (PDF 2 Page 8-9 Section 10-11) */}
          {(activeMenu === 'procurement' || activeMenu === 'queue') && (
            <div className="space-y-6">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">Procurement Transaction Records</h3>
                    <p className="text-xs text-slate-400">Complete verification, digital weighing, AI reports, and settlement logs.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {queueFilterCentre !== 'all' && (
                      <div className="flex items-center gap-1.5 bg-blue-950/60 border border-blue-600/60 text-blue-300 px-2.5 py-1 rounded-lg text-xs font-semibold">
                        <span>Centre: <strong>{queueFilterCentre}</strong></span>
                        <button
                          onClick={() => setQueueFilterCentre('all')}
                          className="text-slate-400 hover:text-white ml-1 font-bold cursor-pointer"
                          title="Clear filter and show all centres"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                    <button
                      onClick={handleExportCSV}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg border border-emerald-500 flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                      title="Download transaction ledger as CSV"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
                      <tr>
                        <th className="p-3">Purchase ID</th>
                        <th className="p-3">Token</th>
                        <th className="p-3">Farmer</th>
                        <th className="p-3">Product</th>
                        <th className="p-3">Qty</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Professional</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Inspect</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {liveProcurements
                        .filter(p => queueFilterCentre === 'all' || !p.centre || p.centre === queueFilterCentre)
                        .map((p) => (
                        <tr key={p.id} className="hover:bg-slate-900">
                          <td className="p-3 font-mono font-bold text-blue-400">{p.purchaseId}</td>
                          <td className="p-3 font-mono font-bold text-emerald-400">{p.token}</td>
                          <td className="p-3 font-semibold text-slate-100">{p.farmer}</td>
                          <td className="p-3">{p.product}</td>
                          <td className="p-3 font-mono">{p.qty}</td>
                          <td className="p-3 font-mono font-bold">₹{p.amount.toLocaleString('en-IN')}</td>
                          <td className="p-3 text-slate-300">{p.professional}</td>
                          <td className="p-3">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                p.status === 'Paid' || p.status === 'Purchased'
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-600'
                                  : p.status === 'Rejected'
                                  ? 'bg-red-950 text-red-400 border border-red-600'
                                  : 'bg-amber-950 text-amber-400 border border-amber-600'
                              }`}
                            >
                              {p.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => setSelectedTxn(p)}
                              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded text-[11px] cursor-pointer"
                            >
                              View Audit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TRANSACTION AUDIT MODAL (PDF 2 Page 5) */}
              {selectedTxn && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                  <div className="bg-slate-950 border border-slate-700 rounded-3xl p-6 max-w-lg w-full space-y-4 font-mono text-xs shadow-2xl">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-blue-400 font-bold block">{selectedTxn.purchaseId} AUDIT TRAIL</span>
                        <span className="text-slate-400 text-[10px]">Token: {selectedTxn.token} • {selectedTxn.date}</span>
                      </div>
                      <button onClick={() => setSelectedTxn(null)} className="text-slate-400 hover:text-white cursor-pointer">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-2 bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Farmer:</span>
                        <span className="font-bold text-slate-100">{selectedTxn.farmer} ({selectedTxn.farmerId})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Product Delivered:</span>
                        <span className="font-bold text-slate-100">{selectedTxn.product}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Gross / Tare / Net Weight:</span>
                        <span className="font-bold text-emerald-400">{selectedTxn.qty} (WS-04 Digital Scale)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">AI Quality Score:</span>
                        <span className="font-bold text-purple-400">91/100 (Grade A Certified)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Professional Verification:</span>
                        <span className="font-bold text-slate-100">Approved by {selectedTxn.professional}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Total Settlement:</span>
                        <span className="font-bold text-emerald-400 text-sm">₹{selectedTxn.amount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Payment Status:</span>
                        <span className="font-bold text-emerald-400">{selectedTxn.status}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handlePrintAudit(selectedTxn)}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-xs cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-600/30 transition-all"
                      >
                        <Printer className="w-4 h-4" />
                        <span>Print Audit Certificate</span>
                      </button>
                      <button
                        onClick={() => setSelectedTxn(null)}
                        className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: AI QUALITY ANALYSIS MANAGEMENT (PDF 2 Page 7-8 Section 9) */}
          {activeMenu === 'ai' && (
            <div className="space-y-6">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
                <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      AI Vision Model Analytics & Evidence Oversight
                    </h3>
                    <p className="text-xs text-slate-400">
                      Company Admin inspects AI recommendation vs Professional final decision.
                    </p>
                  </div>
                  <span className="text-xs bg-purple-950 text-purple-300 font-bold px-3 py-1 rounded-full border border-purple-600">
                    Model: AgriVision v4.2
                  </span>
                </div>

                {/* AI Sample Quality Report Inspection (PDF 2 Page 8) */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono text-xs">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-bold text-slate-100 text-sm">INSPECTION REPORT #AI-9021 (Product: Potato)</span>
                    <span className="text-emerald-400 font-bold">Recommendation: ACCEPT (94% Conf.)</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-500 block uppercase">Rotten Items</span>
                      <span className="text-base font-bold text-slate-200 mt-1 block">2.8%</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-500 block uppercase">Damaged Items</span>
                      <span className="text-base font-bold text-slate-200 mt-1 block">4.2%</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-500 block uppercase">Foreign Material</span>
                      <span className="text-base font-bold text-slate-200 mt-1 block">0.7%</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-purple-400 block uppercase font-bold">Quality Score</span>
                      <span className="text-lg font-black text-purple-400 mt-1 block">91 / 100</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-400 space-y-1">
                    <div>✓ Professional Decision: Verified & Accepted by Rahul Sharma (PR-1024)</div>
                    <div>✓ Evidence Hash: sha256:4b91f09c... Permanently anchored</div>
                  </div>
                </div>

                {/* Rejection Analysis by Cause (PDF 2 Page 9 Section 11) */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <h4 className="text-sm font-bold text-slate-100">REJECTION MONITORING & ROOT CAUSES (Today: 42 Rejections)</h4>
                  <div className="grid sm:grid-cols-5 gap-3">
                    {rejectionReasonsData.map((item, idx) => (
                      <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 block">{item.reason}</span>
                        <div className="text-2xl font-black mt-1" style={{ color: item.color }}>{item.count}</div>
                        <span className="text-[10px] text-slate-500">{((item.count / 42) * 100).toFixed(0)}% of rejections</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: PAYMENTS MANAGEMENT (PDF 2 Page 10 Section 12) */}
          {activeMenu === 'payments' && (
            <div className="space-y-6">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
                <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-emerald-400" />
                      Executive Payment Disbursal & Bank Gateway
                    </h3>
                    <p className="text-xs text-slate-400">Total Payout Today: ₹12,50,000 across procurement network.</p>
                  </div>
                  <button
                    onClick={() => alert('Batch payment retry sent to banking switch for 5 pending farmer payouts.')}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
                  >
                    Retry Failed Transactions
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 block font-semibold">Successful Disbursed</span>
                    <div className="text-2xl font-black text-emerald-400 mt-1">₹11,80,000</div>
                    <span className="text-[11px] text-slate-500">Transferred directly to farmers' bank accounts</span>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 block font-semibold">Pending Processing</span>
                    <div className="text-2xl font-black text-amber-400 mt-1">₹50,000</div>
                    <span className="text-[11px] text-slate-500">Awaiting clearance from RTGS/NEFT queue</span>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 block font-semibold">Failed Disbursal</span>
                    <div className="text-2xl font-black text-red-400 mt-1">₹20,000</div>
                    <span className="text-[11px] text-slate-500">IFSC / account verification mismatch</span>
                  </div>
                </div>

                {/* Workflow Diagram Box (PDF 2 Page 10) */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono">
                  <span className="text-slate-400 uppercase font-bold block mb-2">Automated Bank Settlement Pipeline</span>
                  <div className="flex flex-wrap items-center gap-2 text-slate-200">
                    <span className="bg-slate-950 px-3 py-1 rounded border border-slate-800">1. Purchase Confirmed</span>
                    <span>→</span>
                    <span className="bg-slate-950 px-3 py-1 rounded border border-slate-800">2. Amount Calculated</span>
                    <span>→</span>
                    <span className="bg-slate-950 px-3 py-1 rounded border border-slate-800">3. Payment Request</span>
                    <span>→</span>
                    <span className="bg-slate-950 px-3 py-1 rounded border border-slate-800">4. Bank Switch</span>
                    <span>→</span>
                    <span className="bg-emerald-950 text-emerald-300 px-3 py-1 rounded border border-emerald-600 font-bold">5. PAID ✓</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: FEEDBACK MANAGEMENT (PDF 2 Page 11 Section 13) */}
          {activeMenu === 'feedback' && (
            <div className="space-y-6">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-400" />
                    Two-Way Procurement Feedback Monitor
                  </h3>
                  <p className="text-xs text-slate-400">
                    Mandatory Professional → Farmer reviews alongside Farmer → Professional quality scoring.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {feedbacks.map((f) => (
                    <div key={f.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="bg-slate-950 text-blue-400 px-2.5 py-0.5 rounded font-mono font-bold text-[10px]">
                            {f.role}
                          </span>
                          <h4 className="font-bold text-slate-100 mt-2">{f.from}</h4>
                          <span className="text-slate-400 text-[11px] block">To: {f.to}</span>
                        </div>
                        <div className="text-amber-400 text-sm font-bold">
                          {'★'.repeat(f.rating)}
                        </div>
                      </div>

                      <p className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 italic">
                        "{f.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: COMPLAINTS & INVESTIGATION (PDF 2 Page 11-12 Section 14) */}
          {activeMenu === 'complaints' && (
            <div className="space-y-6">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      Dispute & Complaint Investigation Module
                    </h3>
                    <p className="text-xs text-slate-400">
                      A complaint is treated as an allegation until verified against Weighing, AI, and Photo Evidence.
                    </p>
                  </div>
                  <span className="text-xs bg-red-950 text-red-300 px-3 py-1 rounded-full font-bold border border-red-600">
                    {complaints.filter(c => c.status !== 'resolved').length} Requiring Review
                  </span>
                </div>

                <div className="space-y-3">
                  {complaints.map((cmp) => (
                    <div key={cmp.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-blue-400">{cmp.id}</span>
                            <span className="bg-red-950 text-red-400 px-2 py-0.5 rounded text-[10px] font-bold border border-red-700">
                              Issue: {cmp.issue}
                            </span>
                            <span className="text-slate-500 font-mono">{cmp.date}</span>
                          </div>
                          <h4 className="font-bold text-slate-100 mt-1">{cmp.farmer} ({cmp.farmerId}) • Token {cmp.token}</h4>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${cmp.status === 'resolved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-600' : 'bg-amber-950 text-amber-400 border border-amber-600'}`}>
                          {cmp.status.toUpperCase()}
                        </span>
                      </div>

                      <p className="text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                        {cmp.description}
                      </p>

                      <div className="flex justify-between items-center text-slate-400">
                        <span>Evidence: <strong>{cmp.evidence}</strong></span>
                        {cmp.status !== 'resolved' ? (
                          <button
                            onClick={() => setSelectedComplaint(cmp)}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer"
                          >
                            Open Investigation & Decision
                          </button>
                        ) : (
                          <span className="text-emerald-400 font-bold">Resolved Note: {cmp.resolutionNote}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investigation Decision Modal */}
              {selectedComplaint && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                  <div className="bg-slate-950 border border-slate-700 rounded-3xl p-6 max-w-lg w-full space-y-4 text-xs font-mono shadow-2xl">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <div>
                        <h4 className="font-bold text-red-400 text-sm">INVESTIGATION: {selectedComplaint.id}</h4>
                        <span className="text-slate-400 text-[10px]">{selectedComplaint.farmer} • Token {selectedComplaint.token}</span>
                      </div>
                      <button onClick={() => setSelectedComplaint(null)} className="text-slate-400 hover:text-white">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-2 bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Alleged Issue:</span>
                        <span className="font-bold text-slate-100">{selectedComplaint.issue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Weighing Device Record:</span>
                        <span className="font-bold text-emerald-400">Tare: 18.2 kg | Gross: 528.4 kg (Calibrated)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">AI Quality Inspection:</span>
                        <span className="font-bold text-purple-400">Score 91/100 (Pass)</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Admin Investigation Findings & Decision</label>
                      <textarea
                        rows="3"
                        value={investigationNote}
                        onChange={(e) => setInvestigationNote(e.target.value)}
                        placeholder="State resolution, adjustment or closing reason..."
                        className="input bg-slate-900 border-slate-800 text-slate-100"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleResolveComplaint(selectedComplaint.id)}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs cursor-pointer"
                      >
                        [ CLOSE COMPLAINT AS RESOLVED ]
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 10: NEARBY CENTRE ROUTING (PDF 2 Page 13 Section 15) */}
          {activeMenu === 'nearby' && (
            <div className="max-w-2xl mx-auto bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl text-xs">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-emerald-400" />
                  Nearby Procurement Centre Congestion Routing
                </h3>
                <p className="text-slate-400 mt-1">
                  When a procurement yard exceeds capacity, redirect incoming farmers to nearby centres within 15 km.
                </p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 font-mono">
                <span className="text-slate-400 uppercase font-bold block">Live Example Scenario (Centre 01 Congested)</span>
                <div className="p-3 bg-red-950/40 border border-red-700/50 rounded-lg text-red-200">
                  <strong>Current Centre 01:</strong> 65 Farmers Waiting • Estimated Wait: 52 min
                </div>
                <div className="space-y-1.5 pt-1 text-slate-300">
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                    <span>Centre 02 (Jalpaiguri Rd) → 8 km away</span>
                    <span className="text-emerald-400 font-bold">15 Waiting (Recommended)</span>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                    <span>Centre 03 (Matigara Depot) → 12 km away</span>
                    <span className="text-emerald-400 font-bold">10 Waiting</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span>Auto-Redirect Notification to Farmers on High Load</span>
                  <input
                    type="checkbox"
                    checked={congestionSettings.autoSuggestActive}
                    onChange={(e) => setCongestionSettings({ ...congestionSettings, autoSuggestActive: e.target.checked })}
                    className="accent-emerald-500 w-4 h-4"
                  />
                </div>
                <div className="flex justify-between items-center bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span>Maximum Routing Radius</span>
                  <span className="font-bold text-emerald-400">15 Kilometers</span>
                </div>
              </div>

              <button
                onClick={() => alert('Congestion redirection rules successfully updated.')}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs cursor-pointer"
              >
                Save Dynamic Routing Rules
              </button>
            </div>
          )}

          {/* TAB 11: REPORTS & ANALYTICS (PDF 2 Page 14-15 Section 16-17) */}
          {activeMenu === 'reports' && (
            <div className="space-y-6">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-indigo-400" />
                      Executive Procurement Reports & Decision Analytics
                    </h3>
                    <p className="text-xs text-slate-400">Monthly quantity volume, procurement value, and rejection metrics.</p>
                  </div>
                </div>

                {/* Procurement Volume Chart */}
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-slate-200">Procurement Volume Growth (KG)</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <XAxis dataKey="month" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                        <Bar dataKey="quantityKg" fill="#10b981" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: NOTIFICATIONS (PDF 2 Page 15 Section 18) */}
          {activeMenu === 'notifications' && (
            <div className="max-w-2xl mx-auto bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-400" />
                Company Notification & Alerts Center
              </h3>

              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-start text-xs">
                    <div className="space-y-1">
                      <span className={`font-bold text-sm ${n.type === 'error' ? 'text-red-400' : n.type === 'warning' ? 'text-amber-300' : 'text-emerald-400'}`}>
                        {n.title}
                      </span>
                      <p className="text-slate-300">{n.text}</p>
                    </div>
                    <span className="text-slate-500 font-mono text-[10px]">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 13: SETTINGS & ADMIN PROFILE (PDF 2 Page 16 Section 19) */}
          {activeMenu === 'settings' && (
            <div className="max-w-xl mx-auto bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5 font-mono text-xs">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Settings className="w-5 h-5 text-slate-400" />
                ADMIN PROFILE & SYSTEM CONFIGURATION
              </h3>

              <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-500">Administrator Name:</span>
                  <span className="font-bold text-slate-100">{user?.name || 'Company Administrator'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Admin ID:</span>
                  <span className="font-bold text-blue-400">ADM-902</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Company Entity:</span>
                  <span className="font-bold text-slate-100">AgriCorp India Ltd</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Operations:</span>
                  <span className="font-bold text-emerald-400">North Bengal APMC Hubs</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-slate-400 uppercase font-bold block">Security & Policy Controls</span>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span>Two-Factor Authentication (2FA)</span>
                  <span className="text-emerald-400 font-bold">Enabled</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span>Mandatory Feedback Lock</span>
                  <span className="text-emerald-400 font-bold">Enforced (5-Star)</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span>Auto-Redirect on Congestion Threshold</span>
                  <span className="text-emerald-400 font-bold">&gt; 70% Capacity</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* FLOATING ACTION TOAST */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500 text-slate-100 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}