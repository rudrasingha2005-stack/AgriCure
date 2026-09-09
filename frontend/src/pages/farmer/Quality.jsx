import React,{useEffect,useState} from 'react';
import API from '../../services/api';
import QualityReportCard from '../../components/farmer/QualityReportCard';
export default function Quality(){
 const [bookings,setBookings]=useState([]),[id,setId]=useState(''),[report,setReport]=useState(null);
 useEffect(()=>{API.get('/bookings/my-bookings').then(r=>{setBookings(r.data);if(r.data[0])setId(r.data[0]._id);});},[]);
 useEffect(()=>{if(id)API.get(`/farmer/quality/${id}`).then(r=>setReport(r.data)).catch(()=>setReport(null));},[id]);
 return <div className="page space-y-4"><h1>Quality Reports</h1><select className="input max-w-xl" value={id} onChange={e=>setId(e.target.value)}>{bookings.map(b=><option key={b._id} value={b._id}>Token #{b.tokenNumber}</option>)}</select><QualityReportCard report={report}/></div>;
}
