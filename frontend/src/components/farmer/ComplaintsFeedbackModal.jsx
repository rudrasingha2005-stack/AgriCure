import React, { useState, useContext, useRef } from 'react';
import {
  X,
  AlertCircle,
  Star,
  CheckCircle2,
  Clock,
  Camera,
  Upload,
  Send,
  MessageSquare,
  FileText,
  Trash2,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';

export default function ComplaintsFeedbackModal({ isOpen, onClose }) {
  const { t } = useContext(LanguageContext);
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState('complaint'); // 'complaint' | 'feedback' | 'tracking'

  // Complaint Form state
  const [complaintType, setComplaintType] = useState('Payment Issue');
  const [description, setDescription] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState('');

  // Mandatory Photo proof state
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoError, setPhotoError] = useState('');
  const [viewingProof, setViewingProof] = useState(null);

  // 5-Star Rating Feedback state
  const [rating, setRating] = useState(5);
  const [attributes, setAttributes] = useState({
    Staff: true,
    Payment: true,
    Queue: false,
    Quality: true,
    Centre: false
  });
  const [feedbackComment, setFeedbackComment] = useState('');

  // Sample Tracking list matching Page 4 of PDF
  const [complaintsList, setComplaintsList] = useState([
    {
      id: 'CMP-2026-0081',
      type: 'Payment',
      date: '06 Sept 2026',
      description: 'Disbursement delay for Token A-112 batch',
      status: 'Resolved',
      resolution: 'Funds credited to SBI account on Sept 7',
      proofImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'CMP-2026-0094',
      type: 'Centre Facilities',
      date: 'Today',
      description: 'Weighbridge calibration query at Siliguri yard',
      status: 'Under Review',
      resolution: 'Assigned to Inspector Suresh for re-check',
      proofImage: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=400&auto=format&fit=crop&q=80'
    }
  ]);

  if (!isOpen) return null;

  const handleToggleAttribute = (attr) => {
    setAttributes((prev) => ({ ...prev, [attr]: !prev[attr] }));
  };

  // Handle Photo File Selection
  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setPhotoError('Please select a valid image file (PNG, JPG, JPEG).');
        return;
      }
      setPhotoError('');
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to load sample receipt photo for instant demo
  const handleUseSampleProof = () => {
    setPhotoError('');
    setPhotoFile({ name: 'mandi_weigh_slip_proof.jpg', size: 148500 });
    setPhotoPreview('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80');
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setPhotoError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    setPhotoError('');

    // STRICT VALIDATION: Photo proof is mandatory
    if (!photoPreview) {
      setPhotoError('Photo proof is mandatory! Please attach an image of the weighment slip, defective crop, or payment receipt before submitting.');
      return;
    }

    const newEntry = {
      id: `CMP-2026-0${Math.floor(100 + Math.random() * 900)}`,
      type: complaintType,
      date: 'Just Now',
      description: description,
      status: 'Under Review',
      resolution: 'Ticket generated with verified photo proof. Mandi officer assigned.',
      proofImage: photoPreview
    };

    setComplaintsList([newEntry, ...complaintsList]);
    setDescription('');
    setPhotoFile(null);
    setPhotoPreview(null);
    setSubmittedMessage(`Complaint ${newEntry.id} logged with photo proof! Status: Under Review.`);
    setTimeout(() => {
      setSubmittedMessage('');
      setActiveTab('tracking');
    }, 1500);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    setSubmittedMessage('Thank you! Your 5-star appraisal has been recorded.');
    setTimeout(() => {
      setSubmittedMessage('');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-emerald-500/30 rounded-3xl p-5 sm:p-7 text-white shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-mono tracking-wider text-emerald-400 font-bold uppercase">
              PDF Section 6: Farmer Grievance & Rating
            </span>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span>🚨</span> {t('complaintsFeedback')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="mt-4 flex gap-1 bg-slate-800/80 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('complaint')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'complaint'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {t('raiseComplaint')}
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'feedback'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {t('rateCentre')} (5-Star)
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'tracking'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Live Tracking
          </button>
        </div>

        {submittedMessage && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-bold text-center animate-fade-in">
            {submittedMessage}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 1: RAISE COMPLAINT (Photo Proof MANDATORY)                            */}
        {/* ========================================================================= */}
        {activeTab === 'complaint' && (
          <form onSubmit={handleSubmitComplaint} className="mt-4 space-y-4 animate-fade-in">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Select Complaint Type
              </label>
              <select
                value={complaintType}
                onChange={(e) => setComplaintType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="Payment Issue">Payment Issue (Delayed settlement, deduction)</option>
                <option value="Centre Facilities">Centre Facilities (Long queue, weighing scale)</option>
                <option value="Weighment Discrepancy">Weighment Discrepancy</option>
                <option value="Quality Assessment Dispute">Quality Assessment Dispute</option>
                <option value="Staff Conduct">Staff Conduct / Behavior</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Description of the Issue <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={3}
                required
                placeholder="Explain the incident with token or date..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* MANDATORY PHOTO ATTACHMENT SECTION */}
            <div
              className={`p-4 rounded-2xl border-2 transition-all ${
                photoError
                  ? 'border-red-500/80 bg-red-950/20'
                  : photoPreview
                  ? 'border-emerald-500/60 bg-emerald-950/20'
                  : 'border-dashed border-slate-700 bg-slate-800/60 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-extrabold text-white flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-emerald-400" />
                  <span>Attach Photo / Proof of Incident</span>
                  <span className="text-red-400 text-xs font-black uppercase tracking-wider">
                    * (Mandatory)
                  </span>
                </label>
                {photoPreview && (
                  <span className="text-[11px] text-emerald-400 font-extrabold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Attached
                  </span>
                )}
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                capture="environment"
                onChange={handlePhotoSelect}
                className="hidden"
              />

              {/* Display photo preview if attached */}
              {photoPreview ? (
                <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-700">
                  <div className="flex items-center gap-3">
                    <img
                      src={photoPreview}
                      alt="Proof"
                      className="w-14 h-14 rounded-lg object-cover border border-emerald-500/50 shadow-md"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block truncate max-w-[200px]">
                        {photoFile?.name || 'receipt_proof.jpg'}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {photoFile?.size ? `${Math.round(photoFile.size / 1024)} KB` : 'Verified Image'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-all cursor-pointer"
                    title="Remove Photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* No photo attached yet - show action buttons */
                <div className="text-center py-2 space-y-2">
                  <p className="text-xs text-slate-300">
                    A photographic proof (weighing scale slip, rejected harvest batch, or payment receipt) is required to process complaints.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Take Photo / Browse File</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleUseSampleProof}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white font-medium text-xs rounded-xl border border-slate-700 transition-all cursor-pointer"
                    >
                      Use Sample Proof (Demo)
                    </button>
                  </div>
                </div>
              )}

              {/* Validation Error Message */}
              {photoError && (
                <div className="mt-2.5 p-2 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-xs flex items-center gap-1.5 font-bold animate-shake">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{photoError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>SUBMIT COMPLAINT (WITH MANDATORY PROOF)</span>
            </button>
          </form>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: RATING FEEDBACK (5-Star Scale with Checkboxes per PDF)              */}
        {/* ========================================================================= */}
        {activeTab === 'feedback' && (
          <form onSubmit={handleSubmitFeedback} className="mt-4 space-y-4 animate-fade-in">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-center space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Rate Procurement Centre Experience
              </span>
              <div className="flex items-center justify-center gap-2 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-2xl transition-transform hover:scale-125 cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-extrabold text-amber-400">
                {rating} / 5 Stars Selected
              </span>
            </div>

            {/* Attribute checkboxes specified in Page 4 of PDF: Staff, Payment, Queue, Quality, Centre */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 block">
                Attribute Checkboxes:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Staff', 'Payment', 'Queue', 'Quality', 'Centre'].map((attr) => (
                  <button
                    key={attr}
                    type="button"
                    onClick={() => handleToggleAttribute(attr)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                      attributes[attr]
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-800 border border-slate-700 text-slate-400'
                    }`}
                  >
                    <span>{attr}</span>
                    <span>{attributes[attr] ? '✓' : '+'}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <textarea
                rows={2}
                placeholder="Optional remarks on staff courtesy, quick settlement..."
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <span>SUBMIT 5-STAR RATING</span>
            </button>
          </form>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: REAL-TIME TRACKING LIST WITH PHOTO PROOF INSPECTOR                  */}
        {/* ========================================================================= */}
        {activeTab === 'tracking' && (
          <div className="mt-4 space-y-2.5 max-h-[320px] overflow-y-auto pr-1 animate-fade-in">
            {complaintsList.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-white">{item.id}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase ${
                      item.status === 'Resolved'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {item.status === 'Resolved' ? '✓ Resolved' : '⏳ Under Review'}
                  </span>
                </div>

                <p className="text-slate-300 font-medium">{item.description}</p>

                {/* Attached proof inspection row */}
                {item.proofImage && (
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <img
                      src={item.proofImage}
                      alt="Proof"
                      className="w-10 h-10 rounded-lg object-cover border border-slate-700 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setViewingProof(item.proofImage)}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-bold text-slate-300 block">
                        Verified Photo Proof Attached
                      </span>
                      <button
                        type="button"
                        onClick={() => setViewingProof(item.proofImage)}
                        className="text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3 h-3" /> Click to view full proof image
                      </button>
                    </div>
                  </div>
                )}

                <div className="pt-1 text-[11px] text-slate-400 border-t border-slate-700/50 flex justify-between">
                  <span>Type: <strong>{item.type}</strong></span>
                  <span>Update: <strong className="text-emerald-400">{item.resolution}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for full-size proof viewing */}
        {viewingProof && (
          <div className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4">
            <div className="relative max-w-lg w-full bg-slate-900 p-4 rounded-2xl border border-slate-700 space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white">Attached Evidence / Proof Image</span>
                <button
                  onClick={() => setViewingProof(null)}
                  className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <img
                src={viewingProof}
                alt="Full Proof"
                className="w-full max-h-[70vh] object-contain rounded-xl border border-slate-800"
              />
            </div>
          </div>
        )}

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
