import React, { useContext } from 'react';
import {
  X,
  MapPin,
  Calendar,
  Navigation,
  CheckCircle2,
  Clock,
  Phone,
  Scale
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';

export default function CentresMapModal({ isOpen, onClose, onSelectCentreForBooking }) {
  const { t } = useContext(LanguageContext);

  if (!isOpen) return null;

  // Filter to display only 1 relevant Procurement Centre for the farmer's location
  const centres = [
    {
      id: 'siliguri-01',
      name: 'Siliguri APMC Centre',
      distanceKm: 12,
      freeCapacityKg: 2450,
      totalCapacityKg: 5000,
      address: 'Sevoke Road, Siliguri Market Yard, Darjeeling District',
      ratePerKg: 12,
      operatingHours: '08:00 AM - 05:00 PM',
      phone: '+91 94340 12345',
      status: 'Open Now'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl border border-white/80 rounded-3xl p-5 sm:p-7 text-slate-800 shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-mono tracking-wider text-emerald-700 font-bold uppercase bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Allocated Procurement Yard
            </span>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 mt-1">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span>{t('findCentre')}</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Location Notice Banner */}
        <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-center gap-3 text-xs font-bold text-amber-950 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 font-black">
            📍
          </div>
          <span className="text-sm">This Procurement Centre is only applicable for your location</span>
        </div>

        {/* Map Placeholder Graphic */}
        <div className="mt-3 p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex items-center justify-between text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>{t('gpsMatched')}</span>
          </div>
          <span className="text-emerald-700 font-bold">{t('maxDistance')}</span>
        </div>

        {/* Centres List */}
        <div className="mt-4 space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {centres.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400/80 shadow-xs hover:shadow-sm transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-black text-base text-slate-900 flex items-center gap-2">
                    {c.name}
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {c.status}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {c.address}
                  </p>
                </div>
                <span className="text-sm font-black text-emerald-700 font-mono bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                  {c.distanceKm} KM
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-2 border-t border-slate-100 font-mono">
                <div>
                  <span className="text-slate-500 block text-[11px]">{t('freeCapacity')}</span>
                  <span className="text-emerald-700 font-bold">
                    🟢 {c.freeCapacityKg.toLocaleString()} KG
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">{t('mandiBenchmark')}</span>
                  <span className="text-amber-700 font-bold">₹{c.ratePerKg}/KG</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-slate-500 block text-[11px]">{t('hours')}</span>
                  <span className="text-slate-700">{c.operatingHours}</span>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.name + ' ' + c.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm no-underline"
              >
                <MapPin className="w-4 h-4 text-emerald-200" />
                <span>View {c.name} in Google Maps 🗺️</span>
              </a>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-all border border-slate-200"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
}
