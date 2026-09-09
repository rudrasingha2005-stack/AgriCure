import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import SlotCalendar from '../../components/farmer/SlotCalendar';
import VoiceInput from '../../components/farmer/VoiceInput';
import { queueOfflineAction } from '../../services/offlineQueue';

export default function BookSlot() {
  const [params] = useSearchParams(); const navigate = useNavigate();
  const [items, setItems] = useState([]); const [saved, setSaved] = useState([]);
  const [announcementId, setAnnouncementId] = useState(params.get('announcementId') || '');
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [cropProfile, setCropProfile] = useState({ cropType:'', variety:'', expectedQuantity:'' });
  const [groupSize, setGroupSize] = useState(1);
  const announcement = useMemo(() => items.find(x => x._id === announcementId), [items, announcementId]);

  useEffect(() => { API.get('/farmer/announcements').then(r => setItems(r.data)); API.get('/farmer/saved-crops').then(r => setSaved(r.data)); }, []);
  useEffect(() => { if (announcement && !cropProfile.cropType) setCropProfile(p => ({...p, cropType: announcement.cropType})); }, [announcement]);

  const submit = async () => {
    const data = { announcementId, slotDate: date, cropProfile: {...cropProfile, expectedQuantity:Number(cropProfile.expectedQuantity || 0)}, groupSize:Number(groupSize) };
    try {
      if (!navigator.onLine) { queueOfflineAction({ method:'post', url:'/bookings', data }); alert('Offline: booking saved and will sync when internet returns.'); return; }
      await API.post('/bookings', data); alert('Slot booked successfully'); navigate('/farmer/queue');
    } catch (e) { alert(e.response?.data?.message || 'Booking failed'); }
  };

  return <div className="page max-w-3xl space-y-4">
    <h1>Compare Centres & Book Slot</h1>
    <div className="card"><label>Procurement demand</label><select className="input" value={announcementId} onChange={e=>setAnnouncementId(e.target.value)}><option value="">Select crop demand</option>{items.map(x=><option key={x._id} value={x._id}>{x.cropType} — ₹{x.ratePerKg}/kg — {x.centreId?.name}</option>)}</select></div>
    {announcement && <SlotCalendar announcement={announcement} value={date} onChange={setDate}/>}
    <div className="card space-y-3"><h3>Crop profile</h3>
      <select className="input" onChange={e=>{const x=saved.find(s=>s._id===e.target.value); if(x)setCropProfile({cropType:x.cropType,variety:x.variety,expectedQuantity:x.expectedQuantity});}}><option>Use saved crop profile</option>{saved.map(x=><option key={x._id} value={x._id}>{x.cropType} {x.variety}</option>)}</select>
      <input className="input" placeholder="Crop type" value={cropProfile.cropType} onChange={e=>setCropProfile({...cropProfile,cropType:e.target.value})}/>
      <div className="flex gap-2"><VoiceInput onResult={text=>setCropProfile({...cropProfile,cropType:text})}/><input className="input" placeholder="Variety" value={cropProfile.variety} onChange={e=>setCropProfile({...cropProfile,variety:e.target.value})}/></div>
      <input type="number" className="input" placeholder="Expected quantity (kg)" value={cropProfile.expectedQuantity} onChange={e=>setCropProfile({...cropProfile,expectedQuantity:e.target.value})}/>
      <input type="number" min="1" className="input" value={groupSize} onChange={e=>setGroupSize(e.target.value)} placeholder="Group size"/>
    </div>
    <button className="btn" disabled={!announcementId} onClick={submit}>Confirm Booking</button>
  </div>;
}
