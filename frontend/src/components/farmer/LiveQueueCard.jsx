import React from 'react';
export default function LiveQueueCard({ queue }) {
  if (!queue) return <div className="card">Select a booking to see queue status.</div>;
  return <div className="card">
    <h3>Token #{queue.tokenNumber}</h3>
    <p>Status: <strong>{queue.status}</strong></p>
    <p>People ahead: {queue.peopleAhead}</p>
    <p>Estimated wait: {queue.estimatedWaitMinutes} minutes</p>
  </div>;
}
