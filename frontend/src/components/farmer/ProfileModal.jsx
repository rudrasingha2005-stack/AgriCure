import React, { useContext } from 'react';
import {
  X,
  User,
  MapPin,
  CreditCard,
  CheckCircle2,
  Globe,
  LogOut,
  ShieldCheck,
  Layers,
  Phone
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfileModal({ isOpen, onClose, farmerData }) {
  const { language, setLanguage, t } = useContext(LanguageContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl border border-white/80 rounded-3xl p-5 sm:p-7 text-slate-800 shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-mono tracking-wider text-emerald-700 font-bold uppercase bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {t('pdfSection6')}
            </span>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 mt-1">
              <User className="w-5 h-5 text-emerald-600" />
              <span>{t('profile')}</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Farmer Identification Card (Page 4) */}
        <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/70 border border-emerald-200 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-emerald-600/20">
                👨‍🌾
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {farmerData?.name || 'Ramesh Das'}
                </h3>
                <span className="text-xs font-mono font-bold text-emerald-700">
                  ID: {farmerData?.farmerId || 'FMR-001245'}
                </span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> {t('verified')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-200/60 text-xs">
            <div className="flex items-center gap-1.5 text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{farmerData?.district || 'Darjeeling'}, {farmerData?.state || 'West Bengal'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>+91 {farmerData?.phone || '9876543210'}</span>
            </div>
          </div>
        </div>

        {/* Linked Bank Details (Page 4 of PDF) */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs shadow-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-emerald-600" /> {t('linkedBank')}
            </span>
            <span className="text-emerald-700 font-extrabold flex items-center gap-1 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> {t('npciPfms')}
            </span>
          </div>
          <div className="p-3 bg-white rounded-xl space-y-1 font-mono border border-slate-200/80">
            <div className="flex justify-between text-slate-500">
              <span>{t('bankName')}</span>
              <span className="text-slate-900 font-semibold">State Bank of India (SBI)</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>{t('accountNumber')}</span>
              <span className="text-slate-900 font-semibold">XXXX XXXX 4582</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>{t('ifscCode')}</span>
              <span className="text-slate-900 font-semibold">SBIN0001234</span>
            </div>
          </div>
        </div>

        {/* Multilingual Support Toggle (Page 4 of PDF) */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-600" /> {t('appLanguage')}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">{t('instantToggle')}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { code: 'en', label: 'English' },
              { code: 'bn', label: 'বাংলা (Bengali)' },
              { code: 'hi', label: 'हिन्दी (Hindi)' }
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                  language === lang.code
                    ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Logout Action */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center">
          <button
            onClick={handleLogout}
            className="py-2 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('logout')}</span>
          </button>

          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-all border border-slate-200"
          >
            {t('done')}
          </button>
        </div>
      </div>
    </div>
  );
}
