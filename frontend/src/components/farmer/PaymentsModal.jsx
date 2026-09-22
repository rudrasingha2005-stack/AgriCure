import React, { useState, useContext } from 'react';
import {
  X,
  CreditCard,
  CheckCircle2,
  Download,
  Printer,
  ShieldCheck,
  FileText,
  Building,
  QrCode,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { LanguageContext } from '../../context/LanguageContext';

export default function PaymentsModal({ isOpen, onClose }) {
  const { t } = useContext(LanguageContext);
  const [selectedSlip, setSelectedSlip] = useState(null);

  if (!isOpen) return null;

  const payments = [
    {
      id: 'TXN-2026-009421',
      bookingId: 'BK-2026-004521',
      token: '#003',
      crop: 'Paddy (Grade A)',
      weightKg: 1980,
      rate: 14.50,
      amount: 28710,
      status: 'Paid',
      date: 'Today, 02:45 PM',
      bankRef: 'PFMS/NPCI/SBI998102',
      utr: 'UTR20260911009821IN',
      accountMasked: 'SBI (XXXX 4582)',
      ifsc: 'SBIN0001245',
      centre: 'APMC Central Procurement Yard (Siliguri)',
      farmerName: 'Ramesh Patel',
      farmerId: 'FMR-WB-09214',
      moisture: '10.8%',
      officer: 'Suresh Inspector (Bay 04)'
    },
    {
      id: 'TXN-2026-008102',
      bookingId: 'BK-2026-003890',
      token: '#088',
      crop: 'Rice (Grade A Paddy)',
      weightKg: 1500,
      rate: 28.00,
      amount: 42000,
      status: 'Paid',
      date: '02 Sept 2026',
      bankRef: 'PFMS/NPCI/SBI881920',
      utr: 'UTR20260902004519IN',
      accountMasked: 'SBI (XXXX 4582)',
      ifsc: 'SBIN0001245',
      centre: 'APMC Central Procurement Yard (Siliguri)',
      farmerName: 'Ramesh Patel',
      farmerId: 'FMR-WB-09214',
      moisture: '11.5%',
      officer: 'Suresh Inspector (Bay 02)'
    }
  ];

  // Workable PDF Receipt Download function
  const handleDownloadPdf = (payment) => {
    // Generate a printable HTML Blob representing official APMC Payment Slip
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Popup blocker active. Please allow popups to view & download the payment receipt.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>AgriSetu-Payment-Slip-${payment.token}.pdf</title>
        <style>
          @page { size: A4; margin: 20mm; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #0f172a; margin: 0; padding: 20px; background: #fff; }
          .receipt-box { border: 2px solid #059669; border-radius: 12px; padding: 24px; max-width: 750px; margin: auto; }
          .header { background: #064e3b; color: white; padding: 18px 24px; border-radius: 8px; margin: -24px -24px 20px -24px; }
          .header h1 { margin: 0; font-size: 22px; }
          .header p { margin: 4px 0 0 0; font-size: 12px; opacity: 0.9; }
          .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; font-size: 13px; }
          .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; }
          .meta-box h3 { margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; color: #065f46; letter-spacing: 0.5px; }
          .row { display: flex; justify-content: space-between; margin: 4px 0; }
          .table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px; }
          .table th { background: #047857; color: white; text-align: left; padding: 10px; }
          .table td { padding: 10px; border-bottom: 1px solid #e2e8f0; }
          .total-row { font-size: 16px; font-weight: bold; background: #f0fdf4; color: #064e3b; }
          .badge { display: inline-block; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; background: #d1fae5; color: #065f46; }
          .stamp { border: 2px dashed #059669; border-radius: 8px; padding: 10px; text-align: center; color: #059669; font-weight: bold; font-size: 12px; display: inline-block; margin-top: 10px; }
          .footer { margin-top: 30px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 15px; }
          .actions { text-align: center; margin-bottom: 20px; }
          .btn { background: #059669; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 14px; margin: 0 5px; }
          @media print { .actions { display: none; } }
        </style>
      </head>
      <body>
        <div class="actions">
          <button class="btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
        </div>
        <div class="receipt-box">
          <div class="header">
            <h1>AgriSetu Mandi Procurement & Payment Slip</h1>
            <p>Direct Agricultural Producer-Buyer Settlement Portal • APMC Mandi Approved</p>
          </div>

          <div class="meta-grid">
            <div class="meta-box">
              <h3>Farmer Details</h3>
              <div class="row"><span>Name:</span><strong>${payment.farmerName}</strong></div>
              <div class="row"><span>Farmer ID:</span><strong>${payment.farmerId}</strong></div>
              <div class="row"><span>Bank Account:</span><strong>${payment.accountMasked}</strong></div>
              <div class="row"><span>IFSC:</span><strong>${payment.ifsc}</strong></div>
            </div>
            <div class="meta-box">
              <h3>Procurement & Payment</h3>
              <div class="row"><span>Receipt No:</span><strong>${payment.id}</strong></div>
              <div class="row"><span>Token No:</span><strong style="color:#059669">${payment.token}</strong></div>
              <div class="row"><span>Date & Time:</span><strong>${payment.date}</strong></div>
              <div class="row"><span>Payment Mode:</span><span class="badge">DBT Direct Transfer</span></div>
            </div>
          </div>

          <table class="table">
            <thead>
              <tr>
                <th>Commodity</th>
                <th>Quality Grade</th>
                <th>Weighed Quantity</th>
                <th>MSP Rate</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>${payment.crop}</strong></td>
                <td><span class="badge">Grade A (Moisture ${payment.moisture})</span></td>
                <td>${payment.weightKg.toLocaleString()} KG</td>
                <td>₹${payment.rate.toFixed(2)} / KG</td>
                <td>₹${payment.amount.toLocaleString()}</td>
              </tr>
              <tr>
                <td colspan="4" style="text-align:right">Gross Valuation:</td>
                <td>₹${payment.amount.toLocaleString()}</td>
              </tr>
              <tr>
                <td colspan="4" style="text-align:right; color:#059669;">APMC Mandi Commission Fee:</td>
                <td style="color:#059669;">₹0.00 (Waived)</td>
              </tr>
              <tr class="total-row">
                <td colspan="4" style="text-align:right">NET DISBURSED AMOUNT:</td>
                <td>₹${payment.amount.toLocaleString()}.00</td>
              </tr>
            </tbody>
          </table>

          <div class="meta-box" style="margin-top: 15px; background: #f0fdf4; border-color: #86efac;">
            <div class="row"><span>Bank UTR / Ref:</span><strong>${payment.utr}</strong></div>
            <div class="row"><span>Clearing Switch:</span><strong>PFMS / National Automated Clearing House (NACH)</strong></div>
            <div class="row"><span>Procurement Centre:</span><strong>${payment.centre}</strong></div>
            <div class="row"><span>Weighbridge Officer:</span><strong>${payment.officer}</strong></div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px;">
            <div class="stamp">
              ✓ AgriSetu VERIFIED<br>
              DIGITALLY CLEARED & SIGNED
            </div>
            <div style="text-align:right; font-size:12px; color:#475569;">
              <br><br>
              ___________________________<br>
              Authorized Signature / Seal
            </div>
          </div>

          <div class="footer">
            This is an official computer-generated receipt issued by AgriSetu Direct Procurement Portal.<br>
            Toll-Free Kisan Helpline: 1800-180-1551 • support@agrisetu.in
          </div>
        </div>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl border border-white/80 rounded-3xl p-5 sm:p-7 text-slate-800 shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-mono tracking-wider text-emerald-700 font-bold uppercase bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Financials & Direct Benefit Transfer
            </span>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 mt-1">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              <span>{t('payments')} & Receipts</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bank Direct Settlement Banner */}
        <div className="mt-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <span className="font-extrabold text-slate-900 block">
                Direct Benefit Transfer (DBT / PFMS)
              </span>
              <span className="text-slate-600">
                Linked Account: State Bank of India (XXXX 4582) • Status: Active & Verified
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
            0% Commission
          </span>
        </div>

        {/* Transactions List */}
        <div className="mt-4 space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {payments.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400/80 shadow-xs hover:shadow-sm transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 text-sm">{p.id}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Token {p.token} • {p.crop} ({p.weightKg.toLocaleString()} KG @ ₹{p.rate}/KG)
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-amber-700 font-mono block">
                    ₹{p.amount.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">{p.date}</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl text-[11px] font-mono text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-slate-200/80">
                <span>Bank Ref: <strong className="text-slate-800">{p.bankRef}</strong></span>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={() => setSelectedSlip(p)}
                    className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Slip</span>
                  </button>
                  <button
                    onClick={() => handleDownloadPdf(p)}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF Receipt</span>
                  </button>
                </div>
              </div>
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

        {/* ========================================================================= */}
        {/* INTERACTIVE APMC PAYMENT SLIP POPUP MODAL                                 */}
        {/* ========================================================================= */}
        {selectedSlip && (
          <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className="relative w-full max-w-lg bg-white border-2 border-emerald-500 rounded-3xl p-6 text-slate-800 shadow-2xl my-auto space-y-4">
              {/* Slip Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl p-1.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    🌾
                  </span>
                  <div>
                    <h3 className="text-base font-black text-slate-900">{t('procurementPayment')}</h3>
                    <p className="text-[10px] text-emerald-700 font-mono">APMC Certified Direct Settlement</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSlip(null)}
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Slip Body Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs font-mono">
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">{t('receiptNo')}</span>
                  <span className="text-slate-900 font-bold">{selectedSlip.id}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">{t('farmerDetails')}</span>
                  <span className="text-emerald-700 font-bold">{selectedSlip.farmerName} ({selectedSlip.farmerId})</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">{t('tokenNo')}</span>
                  <span className="text-slate-900 font-bold">{selectedSlip.token} • {selectedSlip.date}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">{t('commodity')}</span>
                  <span className="text-slate-900 font-bold">{selectedSlip.crop}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">{t('weighedQty')}</span>
                  <span className="text-slate-900 font-bold">{selectedSlip.weightKg.toLocaleString()} KG</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">{t('mspRate')}</span>
                  <span className="text-slate-900 font-bold">₹{selectedSlip.rate.toFixed(2)} / KG</span>
                </div>
                <div className="flex justify-between text-sm pt-1">
                  <span className="text-slate-700 font-bold">{t('netPaidAmount')}</span>
                  <span className="text-emerald-700 font-black text-base">₹{selectedSlip.amount.toLocaleString()}.00</span>
                </div>
              </div>

              {/* DBT Bank Reference Card */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] space-y-1 font-mono">
                <div className="flex justify-between text-emerald-800 font-bold">
                  <span>DBT Status: PAID (Instant Transfer)</span>
                  <span>UTR Verified ✓</span>
                </div>
                <div className="text-slate-600 text-[10px]">
                  Bank: {selectedSlip.accountMasked} • IFSC: {selectedSlip.ifsc}
                </div>
                <div className="text-slate-600 text-[10px]">
                  Ref: {selectedSlip.utr}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleDownloadPdf(selectedSlip)}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('printPdfReceipt')}</span>
                </button>
                <button
                  onClick={() => setSelectedSlip(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200"
                >
                  {t('close')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
