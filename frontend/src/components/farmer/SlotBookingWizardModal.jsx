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
  initialCrop = 'Paddy',
  initialQuantity = 5000,
  onBookingComplete,
  onViewLiveQueue
}) {
  const { t } = useContext(LanguageContext);

  // Wizard Step: 1, 2, 3, 4, 5, or 'confirmed'
  const [step, setStep] = useState(1);

  // Selections locked to Parcha & official database
  const [selectedCrop, setSelectedCrop] = useState('Paddy');
  const [quantity, setQuantity] = useState(5000); // 50 Quintals auto-locked from 2.5 Acre Parcha
  const [selectedCentre, setSelectedCentre] = useState({
    id: 'siliguri-hub-01',
    name: 'ABC Procurement Centre - Siliguri Hub',
    distanceKm: 8,
    freeCapacityKg: 50000,
    ratePerKg: 23.89,
    address: 'Central Grain Yard, Siliguri, Darjeeling (West Bengal)'
  });
  const [bookingDate, setBookingDate] = useState('2026-09-18');
  const [timeSlot, setTimeSlot] = useState('10:00 - 11:00 AM');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    if (initialCrop && (initialCrop === 'Paddy' || initialCrop === 'Wheat')) setSelectedCrop(initialCrop);
    if (initialQuantity) setQuantity(Number(initialQuantity) || 5000);
  }, [initialCrop, initialQuantity]);

  if (!isOpen) return null;

  // Single official procurement centre database entry
  const nearbyCentres = [
    {
      id: 'siliguri-hub-01',
      name: 'ABC Procurement Centre - Siliguri Hub',
      distanceKm: 8,
      freeCapacityKg: 50000,
      ratePerKg: selectedCrop === 'Paddy' ? 23.89 : 24.25,
      address: 'Central Grain Yard, Siliguri, Darjeeling (West Bengal)'
    }
  ];

  // Estimated Value calculation: Quantity * Rate
  const estimatedValue = quantity * (selectedCentre?.ratePerKg || 23.89);

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
    const map = { Paddy: '🌾', Wheat: '🌾' };
    return map[c] || '🌾';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white/95 backdrop-blur-2xl border border-white/90 rounded-3xl p-5 sm:p-7 text-slate-900 shadow-2xl my-auto ring-1 ring-black/5">
        {/* Header with Close */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-mono tracking-wider text-emerald-700 font-bold uppercase">
              {t('slotBookingWorkflow')}
            </span>
            <h2 className="text-lg font-black text-slate-900">
              {step === 'confirmed'
                ? t('bookingConfirmed')
                : `${t('stepXof5', { step })}: ${
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
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
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
                    ? 'bg-emerald-600 shadow-xs'
                    : s < step
                    ? 'bg-emerald-300'
                    : 'bg-slate-200'
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
            <p className="text-xs text-slate-500 font-semibold">
              Select Authorized Procurement Crop:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {['Paddy', 'Wheat'].map((crop) => (
                <button
                  key={crop}
                  type="button"
                  onClick={() => setSelectedCrop(crop)}
                  className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                    selectedCrop === crop
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400/40 shadow-sm scale-[1.02]'
                      : 'bg-slate-50/80 border-slate-200 hover:border-emerald-300 text-slate-700'
                  }`}
                >
                  <span className="text-4xl">🌾</span>
                  <span className="font-black text-sm">{crop === 'Paddy' ? 'Paddy (Dhan)' : 'Wheat (Gehun)'}</span>
                  {selectedCrop === crop && (
                    <span className="text-[10px] bg-emerald-600 text-white font-black px-2 py-0.5 rounded-full shadow-xs">
                      AUTHORIZED
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2 border border-emerald-200">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Selection Output: <strong>{selectedCrop} Authorized</strong></span>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full mt-4 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <span>Next: {t('selectQuantity')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: PARCHA LOCKED WEIGHT QUOTA                                       */}
        {/* ========================================================================= */}
        {step === 2 && (
          <div className="py-4 space-y-5 animate-fade-in">
            <div className="p-3.5 bg-emerald-100/70 border border-emerald-300 rounded-2xl text-xs text-emerald-950 font-bold flex items-center gap-2.5">
              <span className="text-lg">📜</span>
              <div>
                <span className="block font-black">Weight Locked to Parcha Quota</span>
                <span className="text-[11px] text-emerald-800 font-medium">
                  50 Quintals (5,000 KG) maximum produce allocated from your 2.5 Acres land record.
                </span>
              </div>
            </div>

            <div className="bg-slate-50/90 border border-slate-200 rounded-3xl p-6 text-center space-y-4 shadow-xs">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">
                Authorized Procurement Quantity
              </span>

              {/* Locked Quantity Card */}
              <div className="flex items-center justify-center gap-4">
                <div className="px-8 py-4 rounded-2xl bg-white border-2 border-emerald-500 shadow-md">
                  <span className="text-4xl font-black text-emerald-800 font-mono block">
                    50 Quintals <span className="text-sm text-slate-500 font-bold">(5,000 KG)</span>
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 mt-1 block">
                    ✓ Parcha Record Verified Quota
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2 border border-emerald-200">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Quota Status: <strong>50 Quintals (5,000 KG) Locked & Confirmed</strong></span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> {t('back')}
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-2/3 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
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
            <p className="text-xs text-slate-500 font-semibold">
              View nearby centres with live capacity (e.g., Siliguri - 12 KM - 2,450 KG free)
            </p>

            <div className="space-y-2.5">
              {nearbyCentres.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCentre(c)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-xs ${
                    selectedCentre.id === c.id
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400/40 shadow-sm'
                      : 'bg-slate-50/80 border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-slate-900">{c.name}</span>
                      <span className="text-[11px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-md">
                        {c.distanceKm} KM
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{c.address}</p>
                    <div className="flex items-center gap-3 pt-1 text-xs">
                      <span className="text-emerald-700 font-black">
                        🟢 {c.freeCapacityKg.toLocaleString()} KG free
                      </span>
                      <span className="text-amber-700 font-black">
                        ₹{c.ratePerKg}/KG
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    {selectedCentre.id === c.id ? (
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                        ✓
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-emerald-700 hover:text-emerald-900">
                        Select
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2 border border-emerald-200">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Selection Output: <strong>{selectedCentre.name} Selected</strong></span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> {t('back')}
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="w-2/3 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
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
            <p className="text-xs text-slate-500 font-semibold">
              Select Date from Calendar & Time Slot (e.g., 18 Sept, 10:00 - 11:00 AM)
            </p>

            <div className="bg-slate-50/90 border border-slate-200 rounded-3xl p-4 space-y-3 shadow-xs">
              <label className="block text-xs font-bold text-slate-700">
                Choose Delivery Date
              </label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <label className="block text-xs font-bold text-slate-700 pt-2">
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
                    className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      timeSlot === slot
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{slot}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2 border border-emerald-200">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Selection Output: <strong>18 Sept, {timeSlot} Reserved</strong></span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-1/3 py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> {t('back')}
              </button>
              <button
                type="button"
                onClick={() => setStep(5)}
                className="w-2/3 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
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
            <p className="text-xs text-slate-500 font-semibold">
              Displays summary: Crop, Qty, Centre, Date, Time, Estimated Value (₹24,000)
            </p>

            <div className="bg-slate-50/90 border border-slate-200 rounded-3xl p-5 space-y-3 font-mono text-xs sm:text-sm shadow-xs">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-bold">Crop:</span>
                <span className="font-black text-slate-900 flex items-center gap-1">
                  <span>{getCropEmoji(selectedCrop)}</span> {selectedCrop}
                </span>
              </div>

              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-bold">Quantity:</span>
                <span className="font-black text-emerald-700">{quantity.toLocaleString()} KG</span>
              </div>

              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-bold">Procurement Centre:</span>
                <span className="font-black text-slate-900">{selectedCentre.name}</span>
              </div>

              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-bold">Date & Slot:</span>
                <span className="font-black text-slate-900">{bookingDate} ({timeSlot})</span>
              </div>

              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-bold">Mandi Rate:</span>
                <span className="font-black text-slate-900">₹{selectedCentre.ratePerKg}/KG</span>
              </div>

              <div className="flex justify-between pt-1 text-base">
                <span className="text-slate-700 font-bold">Estimated Value:</span>
                <span className="font-black text-emerald-700">₹{estimatedValue.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="w-1/3 py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> {t('back')}
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="w-2/3 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
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
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              Booking Confirmed (ID: {confirmedBooking.bookingId})
            </span>

            <h3 className="text-2xl font-black text-slate-900">
              Slot Reserved Successfully!
            </h3>

            {/* Token Badge */}
            <div className="p-4 rounded-3xl bg-slate-50 border border-emerald-300 inline-block shadow-sm">
              <span className="text-xs text-slate-500 block uppercase font-mono font-bold">{t('yourToken')}</span>
              <span className="text-4xl font-black text-emerald-700 font-mono tracking-wider block mt-0.5">
                {confirmedBooking.tokenNumber}
              </span>
              <span className="text-[11px] text-slate-600 mt-1 block">
                Booking ID: <span className="font-bold text-slate-900">{confirmedBooking.bookingId}</span>
              </span>
            </div>

            {/* Simulated QR Code */}
            <div className="w-32 h-32 bg-white border border-slate-200 rounded-2xl p-2 mx-auto flex items-center justify-center shadow-md">
              <QrCode className="w-28 h-28 text-slate-900" />
            </div>
            <p className="text-[11px] text-slate-500 font-semibold">
              Present this QR Code or Token #{confirmedBooking.tokenNumber} at the entry gate.
            </p>

            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onViewLiveQueue) onViewLiveQueue();
                }}
                className="flex-1 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <span>[ {t('liveQueue')} ]</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
              >
                {t('back')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
