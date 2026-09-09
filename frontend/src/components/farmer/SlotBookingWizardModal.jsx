import React, { useState, useContext, useEffect } from 'react';
import {
  X,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Scale,
  DollarSign,
  QrCode,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';

export default function SlotBookingWizardModal({
  isOpen,
  onClose,
  initialCrop = 'Potato',
  initialQuantity = 2000,
  onBookingComplete,
  onViewLiveQueue
}) {
  const { t } = useContext(LanguageContext);

  // Wizard Step: 1, 2, 3, 4, 5, or 'confirmed'
  const [step, setStep] = useState(1);

  // Selections across the 5 atomic screens
  const [selectedCrop, setSelectedCrop] = useState(initialCrop);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [selectedCentre, setSelectedCentre] = useState({
    id: 'siliguri-01',
    name: 'Siliguri APMC Centre',
    distanceKm: 12,
    freeCapacityKg: 2450,
    ratePerKg: 12
  });
  const [bookingDate, setBookingDate] = useState('2026-09-18');
  const [timeSlot, setTimeSlot] = useState('10:00 - 11:00 AM');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    if (initialCrop) setSelectedCrop(initialCrop);
    if (initialQuantity) setQuantity(Number(initialQuantity) || 2000);
  }, [initialCrop, initialQuantity]);

  if (!isOpen) return null;

  // Available nearby centres (Page 3 of PDF: e.g., Siliguri - 12 KM - 2,450 KG free)
  const nearbyCentres = [
    {
      id: 'siliguri-01',
      name: 'Siliguri APMC Centre',
      distanceKm: 12,
      freeCapacityKg: 2450,
      ratePerKg: selectedCrop === 'Rice' ? 28 : selectedCrop === 'Tomato' ? 18 : 12,
      address: 'Sevoke Road, Siliguri Market Yard'
    },
    {
      id: 'jalpaiguri-02',
      name: 'Jalpaiguri Krishak Yard',
      distanceKm: 28,
      freeCapacityKg: 5000,
      ratePerKg: selectedCrop === 'Rice' ? 27.5 : selectedCrop === 'Tomato' ? 17.5 : 12.5,
      address: 'Main Town Mandi, Jalpaiguri'
    },
    {
      id: 'malda-03',
      name: 'Malda Central Procurement Depot',
      distanceKm: 45,
      freeCapacityKg: 8100,
      ratePerKg: selectedCrop === 'Rice' ? 28.5 : selectedCrop === 'Tomato' ? 19 : 11.8,
      address: 'National Highway Depot, Malda'
    }
  ];

  // Estimated Value calculation: Quantity * Rate
  const estimatedValue = quantity * (selectedCentre?.ratePerKg || 12);

  const handleConfirm = () => {
    const booking = {
      bookingId: 'BK-2026-004521',
      tokenNumber: 'A-124',
      cropType: selectedCrop,
      quantityKg: quantity,
      centre: selectedCentre.name,
      centreAddress: selectedCentre.address,
      date: bookingDate,
      timeSlot: timeSlot,
      estimatedValue: estimatedValue,
      status: 'Active',
      createdAt: new Date().toISOString()
    };
    setConfirmedBooking(booking);
    setStep('confirmed');
    if (onBookingComplete) onBookingComplete(booking);
  };

  const getCropEmoji = (c) => {
    const map = { Potato: '🥔', Rice: '🌾', Tomato: '🍅', Onion: '🧅', Other: '🌽' };
    return map[c] || '🌱';
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-emerald-500/30 rounded-3xl p-5 sm:p-7 text-white shadow-2xl my-auto">
        {/* Header with Close */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-mono tracking-wider text-emerald-400 font-bold uppercase">
              PDF Section 4: 5-Step Slot Booking Workflow
            </span>
            <h2 className="text-lg font-black text-white">
              {step === 'confirmed'
                ? t('bookingConfirmed')
                : `Step ${step} of 5: ${
                    step === 1
                      ? t('selectCrop')
                      : step === 2
                      ? t('selectQuantity')
                      : step === 3
                      ? t('selectCentre')
                      : step === 4
                      ? t('dateTime')
                      : t('reviewConfirm')
                  }`}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Atomic Step Indicator (1 to 5) */}
        {step !== 'confirmed' && (
          <div className="flex items-center gap-1.5 py-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  s === step
                    ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50'
                    : s < step
                    ? 'bg-emerald-700'
                    : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 1: SELECT CROP                                                       */}
        {/* ========================================================================= */}
        {step === 1 && (
          <div className="py-4 space-y-4 animate-fade-in">
            <p className="text-xs text-slate-300 font-medium">
              Choose between: Potato, Rice, Tomato, Onion, Other
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Potato', 'Rice', 'Tomato', 'Onion', 'Other'].map((crop) => (
                <button
                  key={crop}
                  type="button"
                  onClick={() => setSelectedCrop(crop)}
                  className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                    selectedCrop === crop
                      ? 'bg-emerald-950/70 border-emerald-400 text-white ring-2 ring-emerald-500/50 scale-[1.02]'
                      : 'bg-slate-800/70 border-slate-700 hover:border-slate-600 text-slate-300'
                  }`}
                >
                  <span className="text-4xl">{getCropEmoji(crop)}</span>
                  <span className="font-extrabold text-sm">{crop}</span>
                  {selectedCrop === crop && (
                    <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded-full">
                      SELECTED
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="p-3 bg-slate-800/60 rounded-xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Selection Output: <strong>{selectedCrop} Selected</strong></span>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full mt-4 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <span>Next: {t('selectQuantity')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: SELECT QUANTITY                                                   */}
        {/* ========================================================================= */}
        {step === 2 && (
          <div className="py-4 space-y-5 animate-fade-in">
            <p className="text-xs text-slate-300 font-medium">
              Increment/Decrement Buttons `[-] 2,000 KG [+]`
            </p>

            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 text-center space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Target Harvest Quantity
              </span>

              {/* Big Touch Stepper */}
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(100, quantity - 250))}
                  className="w-14 h-14 rounded-2xl bg-slate-700 hover:bg-slate-600 text-white font-black text-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-md"
                >
                  -
                </button>

                <div className="px-6 py-3 rounded-2xl bg-slate-900 border border-emerald-500/40 min-w-[180px]">
                  <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono block">
                    {quantity.toLocaleString()}
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                    KILOGRAMS (KG)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 250)}
                  className="w-14 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-lg shadow-emerald-600/30"
                >
                  +
                </button>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {[500, 1000, 1500, 2000, 3000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setQuantity(preset)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      quantity === preset
                        ? 'bg-emerald-500 text-slate-950 font-extrabold'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    {preset.toLocaleString()} KG
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Selection Output: <strong>{quantity.toLocaleString()} KG Set</strong></span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> {t('back')}
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-2/3 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <span>Next: {t('selectCentre')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: SELECT CENTRE                                                     */}
        {/* ========================================================================= */}
        {step === 3 && (
          <div className="py-4 space-y-4 animate-fade-in">
            <p className="text-xs text-slate-300 font-medium">
              View nearby centres with live capacity (e.g., Siliguri - 12 KM - 2,450 KG free)
            </p>

            <div className="space-y-2.5">
              {nearbyCentres.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCentre(c)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedCentre.id === c.id
                      ? 'bg-emerald-950/70 border-emerald-400 ring-2 ring-emerald-500/50 shadow-md'
                      : 'bg-slate-800/70 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-white">{c.name}</span>
                      <span className="text-[11px] font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded-md">
                        {c.distanceKm} KM
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{c.address}</p>
                    <div className="flex items-center gap-3 pt-1 text-xs">
                      <span className="text-emerald-400 font-bold">
                        🟢 {c.freeCapacityKg.toLocaleString()} KG free
                      </span>
                      <span className="text-amber-400 font-bold">
                        ₹{c.ratePerKg}/KG
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    {selectedCentre.id === c.id ? (
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-bold">
                        ✓
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400 hover:text-white">
                        Select
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-800/60 rounded-xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Selection Output: <strong>{selectedCentre.name} Selected</strong></span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> {t('back')}
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="w-2/3 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <span>Next: {t('dateTime')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: DATE & TIME                                                       */}
        {/* ========================================================================= */}
        {step === 4 && (
          <div className="py-4 space-y-4 animate-fade-in">
            <p className="text-xs text-slate-300 font-medium">
              Select Date from Calendar & Time Slot (e.g., 18 Sept, 10:00 - 11:00 AM)
            </p>

            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-3">
              <label className="block text-xs font-bold text-slate-300">
                Choose Delivery Date
              </label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm font-semibold focus:outline-none focus:border-emerald-500"
              />

              <label className="block text-xs font-bold text-slate-300 pt-2">
                Available Time Slots
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  '09:00 - 10:00 AM',
                  '10:00 - 11:00 AM',
                  '11:00 - 12:00 PM',
                  '02:00 - 03:00 PM'
                ].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      timeSlot === slot
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{slot}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Selection Output: <strong>18 Sept, {timeSlot} Reserved</strong></span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-1/3 py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> {t('back')}
              </button>
              <button
                type="button"
                onClick={() => setStep(5)}
                className="w-2/3 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <span>Next: {t('reviewConfirm')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 5: REVIEW & CONFIRM                                                  */}
        {/* ========================================================================= */}
        {step === 5 && (
          <div className="py-4 space-y-4 animate-fade-in">
            <p className="text-xs text-slate-300 font-medium">
              Displays summary: Crop, Qty, Centre, Date, Time, Estimated Value (₹24,000)
            </p>

            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-3 font-mono text-xs sm:text-sm">
              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span className="text-slate-400">Crop:</span>
                <span className="font-bold text-white flex items-center gap-1">
                  <span>{getCropEmoji(selectedCrop)}</span> {selectedCrop}
                </span>
              </div>

              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span className="text-slate-400">Quantity:</span>
                <span className="font-bold text-emerald-400">{quantity.toLocaleString()} KG</span>
              </div>

              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span className="text-slate-400">Procurement Centre:</span>
                <span className="font-bold text-white">{selectedCentre.name}</span>
              </div>

              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span className="text-slate-400">Date & Slot:</span>
                <span className="font-bold text-white">{bookingDate} ({timeSlot})</span>
              </div>

              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span className="text-slate-400">Mandi Rate:</span>
                <span className="font-bold text-white">₹{selectedCentre.ratePerKg}/KG</span>
              </div>

              <div className="flex justify-between pt-1 text-base">
                <span className="text-slate-300 font-bold">Estimated Value:</span>
                <span className="font-black text-amber-400">₹{estimatedValue.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="w-1/3 py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> {t('back')}
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="w-2/3 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>[ {t('confirmBooking')} ]</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CONFIRMATION SCREEN (Output: BK-2026-004521, Token: A-124, QR Code)       */}
        {/* ========================================================================= */}
        {step === 'confirmed' && confirmedBooking && (
          <div className="py-5 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/50 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-black uppercase tracking-widest text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              Output / Selection: Booking Confirmed (ID: BK-2026-004521)
            </span>

            <h3 className="text-2xl font-black text-white">
              Slot Reserved Successfully!
            </h3>

            {/* Token Badge */}
            <div className="p-4 rounded-2xl bg-slate-800/90 border border-emerald-500/50 inline-block shadow-lg">
              <span className="text-xs text-slate-400 block uppercase font-mono">{t('yourToken')}</span>
              <span className="text-4xl font-black text-emerald-400 font-mono tracking-wider block mt-0.5">
                {confirmedBooking.tokenNumber}
              </span>
              <span className="text-[11px] text-slate-300 mt-1 block">
                Booking ID: <span className="font-bold text-white">{confirmedBooking.bookingId}</span>
              </span>
            </div>

            {/* Simulated QR Code */}
            <div className="w-32 h-32 bg-white rounded-2xl p-2 mx-auto flex items-center justify-center shadow-lg">
              <QrCode className="w-28 h-28 text-slate-950" />
            </div>
            <p className="text-[11px] text-slate-400">
              Present this QR Code or Token #{confirmedBooking.tokenNumber} at the entry gate.
            </p>

            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onViewLiveQueue) onViewLiveQueue();
                }}
                className="flex-1 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <span>[ View Live Queue ]</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all cursor-pointer"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
