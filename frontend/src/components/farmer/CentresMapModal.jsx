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
    },
    {
      id: 'jalpaiguri-02',
      name: 'Jalpaiguri Krishak Yard',
      distanceKm: 28,
      freeCapacityKg: 5000,
      totalCapacityKg: 8000,
      address: 'Main Town APMC Mandi, Jalpaiguri',
      ratePerKg: 12.5,
      operatingHours: '08:30 AM - 04:30 PM',
      phone: '+91 94340 54321',
      status: 'Open Now'
    },
    {
      id: 'malda-03',
      name: 'Malda Central Procurement Depot',
      distanceKm: 45,
      freeCapacityKg: 8100,
      totalCapacityKg: 12000,
      address: 'NH-34 Depot, English Bazar, Malda',
      ratePerKg: 11.8,
      operatingHours: '09:00 AM - 06:00 PM',
      phone: '+91 94340 98765',
      status: 'Open Now'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/30 rounded-3xl p-5 sm:p-7 text-white shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-mono tracking-wider text-emerald-400 font-bold uppercase">
              PDF Section 2: Centres List & Location Map
            </span>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <span>{t('findCentre')}</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Map Placeholder Graphic */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>GPS: <strong>Darjeeling / Siliguri Region</strong> • 3 centres matched</span>
          </div>
          <span className="text-emerald-400 font-bold">Max distance: 50 KM</span>
        </div>

        {/* Centres List */}
        <div className="mt-4 space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {centres.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/50 transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-black text-base text-white flex items-center gap-2">
                    {c.name}
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {c.status}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> {c.address}
                  </p>
                </div>
                <span className="text-sm font-black text-emerald-400 font-mono bg-white/5 px-2.5 py-1 rounded-xl">
                  {c.distanceKm} KM
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-1 border-t border-slate-700/60 font-mono">
                <div>
                  <span className="text-slate-400 block text-[11px]">Free Capacity:</span>
                  <span className="text-emerald-300 font-bold">
                    🟢 {c.freeCapacityKg.toLocaleString()} KG
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Mandi Benchmark:</span>
                  <span className="text-amber-400 font-bold">₹{c.ratePerKg}/KG</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-slate-400 block text-[11px]">Hours:</span>
                  <span className="text-slate-200">{c.operatingHours}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onSelectCentreForBooking) onSelectCentreForBooking(c);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Slot at {c.name}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
