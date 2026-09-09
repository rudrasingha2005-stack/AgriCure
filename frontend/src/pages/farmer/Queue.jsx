import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { socket } from '../../services/socket';
import LiveQueueCard from '../../components/farmer/LiveQueueCard';

export default function Queue() {
  const [bookings, setBookings] = useState([]); const [selected, setSelected] = useState(''); const [queue, setQueue] = useState(null);
  const load = async () => { const r = await API.get('/bookings/my-bookings'); setBookings(r.data); if(!selected && r.data[0]) setSelected(r.data[0]._id); };
  useEffect(() => { load(); socket.connect(); const handler=d=>{ if(d.bookingId===selected) setQueue(q=>({...q,...d})); load(); }; socket.on('queue:update',handler); return ()=>{socket.off('queue:update',handler);socket.disconnect();}; }, [selected]);
  useEffect(() => { if(selected) API.get(`/bookings/${selected}/queue`).then(r=>setQueue(r.data)); }, [selected]);
  return <div className="page space-y-4"><h1>Live Queue</h1><select className="input max-w-xl" value={selected} onChange={e=>setSelected(e.target.value)}>{bookings.map(b=><option key={b._id} value={b._id}>Token #{b.tokenNumber} — {b.slotDate} — {b.status}</option>)}</select><LiveQueueCard queue={queue}/></div>;
}
