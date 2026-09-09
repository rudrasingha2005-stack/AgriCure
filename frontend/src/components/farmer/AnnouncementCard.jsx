import React from 'react';
import { Link } from 'react-router-dom';
export default function AnnouncementCard({ item }) {
  const centre = item.centreId || {};
  return <div className="card">
    <div className="flex justify-between"><h3>{item.cropType}</h3><strong>₹{item.ratePerKg}/kg</strong></div>
    <p>Centre: {centre.name}</p><p>Demand: {item.quantityNeeded} kg</p>
    <p>Quality: {item.qualitySpec}</p>
    <Link className="btn mt-3 inline-block" to={`/farmer/book?announcementId=${item._id}`}>Compare & Book</Link>
  </div>;
}
