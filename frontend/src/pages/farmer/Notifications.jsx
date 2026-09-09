import React,{useContext,useEffect} from 'react';
import API from '../../services/api';
import { NotificationContext } from '../../context/NotificationContext';
export default function Notifications(){
 const {items,refresh}=useContext(NotificationContext);
 useEffect(()=>{refresh();},[]);
 const read=async id=>{await API.patch(`/notifications/${id}/read`);refresh();};
 return <div className="page"><h1>Notifications</h1><div className="space-y-3 mt-4">{items.map(x=><button key={x._id} onClick={()=>read(x._id)} className="card w-full text-left"><strong>{x.title}</strong><p>{x.message}</p><small>{new Date(x.createdAt).toLocaleString()}</small></button>)}</div></div>;
}
