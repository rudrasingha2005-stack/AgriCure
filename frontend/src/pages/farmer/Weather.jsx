import React,{useEffect,useState} from 'react'; import API from '../../services/api';
export default function Weather(){const [b,setB]=useState([]),[id,setId]=useState(''),[w,setW]=useState(null);
useEffect(()=>API.get('/bookings/my-bookings').then(r=>{setB(r.data);if(r.data[0])setId(r.data[0]._id)}),[]);
useEffect(()=>{if(id)API.get(`/farmer/weather/${id}`).then(r=>setW(r.data))},[id]);
return <div className="page"><h1>Booked Slot Weather Alert</h1><select className="input max-w-xl mt-3" value={id} onChange={e=>setId(e.target.value)}>{b.map(x=><option key={x._id} value={x._id}>Token #{x.tokenNumber} — {x.slotDate}</option>)}</select>{w&&<div className="card mt-4"><h3>{w.condition}</h3><p>Rain probability: {w.rainProbability}%</p><p>{w.advisory}</p></div>}</div>}
