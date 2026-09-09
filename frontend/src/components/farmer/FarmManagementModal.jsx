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
    cropType: 'Potato',
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
      cropType: 'Potato',
      area: '1.0',
      expectedYield: '1500',
      plantingDate: new Date().toISOString().slice(0, 10),
      expectedHarvest: '2026-10-15',
      status: 'Growing'
    });
  };

  const getCropEmoji = (type) => {
    const map = {
      Potato: '🥔',
      Rice: '🌾',
      Tomato: '🍅',
      Onion: '🧅',
      Wheat: '🌾',
      Maize: '🌽',
      Mustard: '🌼'
    };
    return map[type] || '🌱';
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/30 rounded-3xl p-5 sm:p-7 text-white shadow-2xl my-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
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
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold text-sm bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{selectedField || showAddForm ? t('back') : t('myFarm')}</span>
          </button>

          <div className="text-right">
            <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase block">
              PDF Section 3
            </span>
            <span className="text-xs font-bold text-emerald-400">
              {t('totalArea')}: <span className="text-white text-sm font-black">{totalArea} {t('acre')}</span>
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: CROP FIELD DETAIL SCREEN (Page 2-3 of PDF)                         */}
        {/* ========================================================================= */}
        {selectedField ? (
          <div className="py-5 space-y-5 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{getCropEmoji(selectedField.cropType)}</span>
                <div>
                  <h3 className="text-xl font-extrabold text-white">
                    {t('cropFieldDetail')}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {selectedField.fieldName || `${selectedField.cropType} Plot`}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {t(selectedField.status?.toLowerCase()) || selectedField.status || t('growing')}
              </span>
            </div>

            {/* Field Metrics Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-2xl">
                <span className="text-xs text-slate-400 block font-medium">{t('selectedCrop')}</span>
                <span className="text-lg font-bold text-emerald-300 flex items-center gap-2 mt-0.5">
                  <span>{getCropEmoji(selectedField.cropType)}</span> {selectedField.cropType}
                </span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-2xl">
                <span className="text-xs text-slate-400 block font-medium">{t('area')}</span>
                <span className="text-lg font-bold text-white mt-0.5 block">
                  {selectedField.area} {t('acre')}
                </span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-2xl">
                <span className="text-xs text-slate-400 block font-medium">{t('expectedYield')}</span>
                <span className="text-lg font-extrabold text-amber-400 mt-0.5 block">
                  {Number(selectedField.expectedYield).toLocaleString()} KG
                </span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-2xl">
                <span className="text-xs text-slate-400 block font-medium">{t('status')}</span>
                <span className="text-lg font-bold text-emerald-400 mt-0.5 block flex items-center gap-1">
                  🟢 {selectedField.status || t('growing')}
                </span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-2xl">
                <span className="text-xs text-slate-400 block font-medium">{t('plantingDate')}</span>
                <span className="text-sm font-semibold text-slate-200 mt-0.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {selectedField.plantingDate || '12 August'}
                </span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-2xl">
                <span className="text-xs text-slate-400 block font-medium">{t('expectedHarvest')}</span>
                <span className="text-sm font-semibold text-slate-200 mt-0.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {selectedField.expectedHarvest || '20 September'}
                </span>
              </div>
            </div>

            {/* Direct Action Button to 5-Step Slot Booking */}
            <div className="pt-3 border-t border-slate-800 flex gap-3">
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
                className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{t('bookSlot')} for {selectedField.cropType} ({selectedField.expectedYield} KG)</span>
              </button>
            </div>
          </div>
        ) : showAddForm ? (
          /* ========================================================================= */
          /* VIEW 2: ADD FIELD FORM (Page 3 of PDF)                                    */
          /* ========================================================================= */
          <form onSubmit={handleSaveField} className="py-5 space-y-4 animate-fade-in">
            <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              <span>{t('addField')}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Field / Plot Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. North Plot, Canal View"
                  value={newField.fieldName}
                  onChange={(e) => setNewField({ ...newField, fieldName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('selectCrop')}
                </label>
                <select
                  value={newField.cropType}
                  onChange={(e) => setNewField({ ...newField, cropType: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="Potato">🥔 Potato</option>
                  <option value="Rice">🌾 Rice (Paddy)</option>
                  <option value="Tomato">🍅 Tomato</option>
                  <option value="Onion">🧅 Onion</option>
                  <option value="Wheat">🌾 Wheat</option>
                  <option value="Maize">🌽 Maize</option>
                  <option value="Mustard">🌼 Mustard</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
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
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
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
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('plantingDate')}
                </label>
                <input
                  type="date"
                  required
                  value={newField.plantingDate}
                  onChange={(e) => setNewField({ ...newField, plantingDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('expectedHarvest')}
                </label>
                <input
                  type="date"
                  required
                  value={newField.expectedHarvest}
                  onChange={(e) => setNewField({ ...newField, expectedHarvest: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex gap-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all cursor-pointer"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                [ {t('save')} FIELD ]
              </button>
            </div>
          </form>
        ) : (
          /* ========================================================================= */
          /* VIEW 3: MY CROPS LIST (Page 2-3 ASCII Wireframe)                           */
          /* ========================================================================= */
          <div className="py-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-200">
                {t('myCrops')}:
              </h3>
              <span className="text-xs text-slate-400 font-medium">
                Tap any crop to view full field schedule
              </span>
            </div>

            {/* List of Crop Fields */}
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {fields.map((field) => (
                <div
                  key={field.id}
                  onClick={() => setSelectedField(field)}
                  className="group p-4 rounded-2xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/50 transition-all cursor-pointer flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-3xl p-2 rounded-xl bg-slate-900/60 border border-slate-700">
                      {getCropEmoji(field.cropType)}
                    </span>
                    <div>
                      <h4 className="font-extrabold text-white text-base group-hover:text-emerald-300 transition-colors">
                        {field.cropType}{' '}
                        <span className="text-xs font-medium text-slate-400 font-mono">
                          ({field.area} {t('acre')})
                        </span>
                      </h4>
                      <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                        Exp: {Number(field.expectedYield).toLocaleString()} KG
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      🟢 {field.status || t('growing')}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))}
            </div>

            {/* [ + ADD FIELD ] Button (Page 3 of PDF) */}
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="w-full mt-3 py-3.5 px-4 rounded-2xl border-2 border-dashed border-emerald-500/50 hover:border-emerald-400 bg-emerald-950/30 hover:bg-emerald-950/60 text-emerald-300 hover:text-emerald-200 font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
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
