import React from 'react';
export default function PaymentTracker({ payment }) {
  if (!payment) return <div className="card">No payment record yet.</div>;
  return <div className="card">
    <h3>Payment Status</h3>
    <p>Amount: <strong>₹{payment.amount}</strong></p>
    <p>Status: <strong>{payment.status}</strong></p>
    <p>Expected settlement: {payment.expectedSettlementDate ? new Date(payment.expectedSettlementDate).toLocaleDateString() : 'Not announced'}</p>
    <p>Reference: {payment.transactionRef || 'Pending'}</p>
  </div>;
}
