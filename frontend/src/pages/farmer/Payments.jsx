import React,{useEffect,useState} from 'react';
import API from '../../services/api';
import PaymentTracker from '../../components/farmer/PaymentTracker';
export default function Payments(){
 const [items,setItems]=useState([]);
 useEffect(()=>{API.get('/farmer/transactions').then(r=>setItems(r.data));},[]);
 return <div className="page"><h1>Payments & Transactions</h1><div className="space-y-4 mt-4">{items.map(p=><div key={p._id}><PaymentTracker payment={p}/><a className="btn-secondary inline-block mt-2" href={`${import.meta.env.VITE_API_URL||'http://localhost:5000/api'}/farmer/receipts/${p.bookingId?._id||p.bookingId}`} target="_blank">Download PDF Receipt</a></div>)}</div></div>;
}
