import React, { useState, useContext } from 'react';
import {
  ArrowLeft,
  Plus,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  Sprout,
  X,
  ChevronRight,
  TrendingUp,
  MapPin,
  Clock
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';

export default function FarmManagementModal({
  isOpen,
  onClose,
  fields,
  onAddField,
  onSelectCropForBooking
}) {
  const { t } = useContext(LanguageContext);

  // Selected crop field detail view state
  const [selectedField, setSelectedField] = useState(null);

  // Add field form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newField, setNewField] = useState({
    fieldName: '',
    cropType: 'Paddy',
    area: '1.2',
    expectedYield: '2000',
    plantingDate: '2026-08-12',
    expectedHarvest: '2026-09-20',
    status: 'Growing'
  });

  if (!isOpen) return null;

  // Calculate total area dynamically
  const totalArea = fields.reduce((acc, curr) => acc + (parseFloat(curr.area) || 0), 0).toFixed(1);

  const handleSaveField = (e) => {
    e.preventDefault();
    if (!newField.fieldName.trim()) {
      newField.fieldName = `${newField.cropType} Field ${fields.length + 1}`;
    }
    onAddField({
      ...newField,
      id: Date.now(),
      area: parseFloat(newField.area) || 1.0,
      expectedYield: parseFloat(newField.expectedYield) || 1000
    });
    setShowAddForm(false);
    setNewField({
      fieldName: '',
      cropType: 'Paddy',
      area: '1.0',
      expectedYield: '1500',
      plantingDate: new Date().toISOString().slice(0, 10),
      expectedHarvest: '2026-10-15',
      status: 'Growing'
    });
  };

  const getCropEmoji = (type) => {
    const map = {
      Paddy: '🌾',
      Rice: '🌾',
      Wheat: '🌾'
    };
    return map[type] || '🌾';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl border border-white/90 rounded-3xl p-5 sm:p-7 text-slate-900 shadow-2xl my-auto ring-1 ring-black/5">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <button
            onClick={() => {
              if (selectedField) {
                setSelectedField(null);
              } else if (showAddForm) {
                setShowAddForm(false);
              } else {
                onClose();
              }
            }}
            className="flex items-center gap-2 text-emerald-800 hover:text-emerald-950 font-black text-sm bg-emerald-50 hover:bg-emerald-100/80 px-3.5 py-2 rounded-2xl transition-all cursor-pointer border border-emerald-200 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{selectedField || showAddForm ? t('back') : t('myFarm')}</span>
          </button>

          <div className="text-right">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block font-bold">
              {t('fieldRegistry')}
            </span>
            <span className="text-xs font-bold text-emerald-700">
              {t('totalArea')}: <span className="text-slate-900 text-sm font-black">{totalArea} {t('acre')}</span>
            </span>
          </div>
        </div>

        {/* PARCHA LAND RECORD BANNER */}
        <div className="mt-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">📜</span>
            <div>
              <span className="font-extrabold text-emerald-950 block">{t('parchaRecord')}</span>
              <span className="text-[11px] text-emerald-800 font-mono">
                Khatian: 1245/A | Dag: 782 | Mouza: Matigara (JL 45)
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">{t('totalQuota')}</span>
            <span className="text-xs font-black text-emerald-900 font-mono">50 Quintals</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: CROP FIELD DETAIL SCREEN (Page 2-3 of PDF)                         */}
        {/* ========================================================================= */}
        {selectedField ? (
          <div className="py-5 space-y-5 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl p-2 bg-emerald-50 rounded-2xl border border-emerald-100">{getCropEmoji(selectedField.cropType)}</span>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    {t('cropFieldDetail')}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    {selectedField.fieldName || `${selectedField.cropType} Plot`}
                  </p>
                </div>
              </div>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide uppercase bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {t(selectedField.status?.toLowerCase()) || selectedField.status || t('growing')}
              </span>
            </div>

            {/* Field Metrics Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-slate-50/90 border border-slate-200/80 p-4 rounded-2xl shadow-xs">
                <span className="text-xs text-slate-500 block font-semibold">{t('selectedCrop')}</span>
                <span className="text-lg font-black text-emerald-800 flex items-center gap-2 mt-0.5">
                  <span>{getCropEmoji(selectedField.cropType)}</span> {selectedField.cropType}
                </span>
              </div>

              <div className="bg-slate-50/90 border border-slate-200/80 p-4 rounded-2xl shadow-xs">
                <span className="text-xs text-slate-500 block font-semibold">{t('area')}</span>
                <span className="text-lg font-black text-slate-900 mt-0.5 block">
                  {selectedField.area} {t('acre')}
                </span>
              </div>

              <div className="bg-slate-50/90 border border-slate-200/80 p-4 rounded-2xl shadow-xs">
                <span className="text-xs text-slate-500 block font-semibold">{t('expectedYield')}</span>
                <span className="text-lg font-black text-amber-700 mt-0.5 block">
                  {Number(selectedField.expectedYield).toLocaleString()} KG
                </span>
              </div>

              <div className="bg-slate-50/90 border border-slate-200/80 p-4 rounded-2xl shadow-xs">
                <span className="text-xs text-slate-500 block font-semibold">{t('status')}</span>
                <span className="text-lg font-black text-emerald-700 mt-0.5 block flex items-center gap-1">
                  🟢 {selectedField.status || t('growing')}
                </span>
              </div>

              <div className="bg-slate-50/90 border border-slate-200/80 p-4 rounded-2xl shadow-xs">
                <span className="text-xs text-slate-500 block font-semibold">{t('plantingDate')}</span>
                <span className="text-sm font-bold text-slate-700 mt-0.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {selectedField.plantingDate || '12 August'}
                </span>
              </div>

              <div className="bg-slate-50/90 border border-slate-200/80 p-4 rounded-2xl shadow-xs">
                <span className="text-xs text-slate-500 block font-semibold">{t('expectedHarvest')}</span>
                <span className="text-sm font-bold text-slate-700 mt-0.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {selectedField.expectedHarvest || '20 September'}
                </span>
              </div>
            </div>

            {/* Direct Action Button to 5-Step Slot Booking */}
            <div className="pt-3 border-t border-slate-100 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  onSelectCropForBooking({
                    cropType: selectedField.cropType,
                    quantity: selectedField.expectedYield
                  });
                  setSelectedField(null);
                  onClose();
                }}
                className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{t('bookSlot')} for {selectedField.cropType} ({selectedField.expectedYield} KG)</span>
              </button>
            </div>
          </div>
        ) : showAddForm ? (
          /* ========================================================================= */
          /* VIEW 2: ADD FIELD FORM                                                    */
          /* ========================================================================= */
          <form onSubmit={handleSaveField} className="py-5 space-y-4 animate-fade-in">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-600" />
              <span>{t('addField')}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Field / Plot Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. North Plot, Canal View"
                  value={newField.fieldName}
                  onChange={(e) => setNewField({ ...newField, fieldName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t('selectCrop')}
                </label>
                <select
                  value={newField.cropType}
                  onChange={(e) => setNewField({ ...newField, cropType: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                >
                  <option value="Paddy">🌾 Paddy (Rice)</option>
                  <option value="Wheat">🌾 Wheat</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t('area')} ({t('acre')})
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  required
                  placeholder="e.g. 1.2"
                  value={newField.area}
                  onChange={(e) => setNewField({ ...newField, area: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t('expectedYield')} (KG)
                </label>
                <input
                  type="number"
                  step="50"
                  min="50"
                  required
                  placeholder="e.g. 2000"
                  value={newField.expectedYield}
                  onChange={(e) => setNewField({ ...newField, expectedYield: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t('plantingDate')}
                </label>
                <input
                  type="date"
                  required
                  value={newField.plantingDate}
                  onChange={(e) => setNewField({ ...newField, plantingDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t('expectedHarvest')}
                </label>
                <input
                  type="date"
                  required
                  value={newField.expectedHarvest}
                  onChange={(e) => setNewField({ ...newField, expectedHarvest: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
              >
                [ {t('save')} FIELD ]
              </button>
            </div>
          </form>
        ) : (
          /* ========================================================================= */
          /* VIEW 3: MY CROPS LIST                                                     */
          /* ========================================================================= */
          <div className="py-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900">
                {t('myCrops')}:
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                Tap any crop to view full field schedule
              </span>
            </div>

            {/* List of Crop Fields */}
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {fields.map((field) => (
                <div
                  key={field.id}
                  onClick={() => setSelectedField(field)}
                  className="group p-4 rounded-2xl bg-slate-50/90 hover:bg-white border border-slate-200 hover:border-emerald-400/80 transition-all cursor-pointer flex items-center justify-between shadow-xs hover:shadow-md"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-3xl p-2 rounded-2xl bg-white border border-slate-200 shadow-xs">
                      {getCropEmoji(field.cropType)}
                    </span>
                    <div>
                      <h4 className="font-black text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                        {field.cropType}{' '}
                        <span className="text-xs font-semibold text-slate-500 font-mono">
                          ({field.area} {t('acre')})
                        </span>
                      </h4>
                      <p className="text-xs text-emerald-700 font-bold mt-0.5">
                        Exp: {Number(field.expectedYield).toLocaleString()} KG
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                      🟢 {field.status || t('growing')}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))}
            </div>

            {/* [ + ADD FIELD ] Button */}
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="w-full mt-3 py-3.5 px-4 rounded-2xl border-2 border-dashed border-emerald-400 hover:border-emerald-600 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>[ {t('addField')} ]</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
