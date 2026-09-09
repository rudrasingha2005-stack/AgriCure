import React, { useEffect, useState } from 'react';
import API from '../../services/api';

export default function SlotCalendar({ announcement, value, onChange }) {
  const [availability, setAvailability] = useState(null);
  const dates = announcement?.availableDates?.length ? announcement.availableDates : [new Date().toISOString().slice(0, 10)];

  useEffect(() => {
    if (!announcement || !value) return;
    API.get(`/bookings/announcement/${announcement._id}/availability`, { params: { date: value } })
      .then(r => setAvailability(r.data)).catch(() => setAvailability(null));
  }, [announcement, value]);

  return <div className="card">
    <label className="font-semibold">Choose procurement date</label>
    <select className="input mt-2" value={value} onChange={e => onChange(e.target.value)}>
      {dates.map(d => <option key={d} value={d}>{d}</option>)}
    </select>
    {availability && <p className={availability.centreFull ? 'text-red-600 mt-2' : 'text-emerald-700 mt-2'}>
      {availability.centreFull ? 'Centre Full' : `${availability.remaining} slots remaining of ${availability.capacity}`}
    </p>}
  </div>;
}
