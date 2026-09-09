import React,{useEffect,useState} from 'react';
import API from '../../services/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
export default function PriceTrends(){
 const [data,setData]=useState([]),[crop,setCrop]=useState('');
 const load=()=>API.get('/farmer/price-trends',{params:crop?{cropType:crop}:{}}).then(r=>setData(r.data.map(x=>({...x,date:new Date(x.createdAt).toLocaleDateString()}))));
 useEffect(load,[]);
 return <div className="page"><h1>Crop Price Trend</h1><div className="flex gap-2 mt-3"><input className="input" placeholder="Crop type e.g. Paddy" value={crop} onChange={e=>setCrop(e.target.value)}/><button className="btn" onClick={load}>Show</button></div><div className="card mt-4 h-80"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><XAxis dataKey="date"/><YAxis/><Tooltip/><Line type="monotone" dataKey="ratePerKg"/></LineChart></ResponsiveContainer></div></div>;
}
