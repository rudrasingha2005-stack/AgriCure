import React, { useState } from 'react';
import API from '../../services/api';

export default function Centres() {
  const [centres,setCentres]=useState([]); const [pos,setPos]=useState(null);
  const find = () => navigator.geolocation.getCurrentPosition(async p => {
    const lat=p.coords.latitude,lng=p.coords.longitude; setPos({lat,lng});
    setCentres((await API.get('/bookings/nearby',{params:{lat,lng}})).data);
  }, ()=>alert('Location permission is required to find nearby centres.'));
  return <div className="page"><h1>Nearby Procurement Centres</h1><button className="btn mt-3" onClick={find}>Use My Location</button>{pos&&<p className="mt-2">Showing centres within 50 km.</p>}<div className="grid md:grid-cols-2 gap-4 mt-4">{centres.map(c=><div className="card" key={c._id}><h3>{c.name}</h3><p>{c.address}</p><p>Distance: {(c.distance/1000).toFixed(1)} km</p><p>Capacity/day: {c.capacityPerDay}</p></div>)}</div></div>;
}
