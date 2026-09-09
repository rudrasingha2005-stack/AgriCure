import React from 'react';
export default function QualityReportCard({ report }) {
  if (!report) return <div className="card">Quality report is not available yet.</div>;
  return <div className="card">
    <h3>AI Quality Report — Grade {report.grade}</h3>
    <div className="grid grid-cols-3 gap-3 mt-3">
      <div>Moisture<br/><strong>{report.moisturePct}%</strong></div>
      <div>Dryness<br/><strong>{report.drynessScore}/100</strong></div>
      <div>Rotten<br/><strong>{report.rottenPct}%</strong></div>
    </div>
    {report.imagePath && <a className="btn mt-4 inline-block" href={`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/${report.imagePath.replace(/\\/g, '/')}`} target="_blank">View inspection image</a>}
  </div>;
}
