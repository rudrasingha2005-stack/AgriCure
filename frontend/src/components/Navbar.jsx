import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (!user || location.pathname.startsWith('/farmer')) return null;

  return (
    <nav className="bg-emerald-700 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>AgriProcure</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm bg-emerald-800 px-3 py-1 rounded-full">{user.name} ({user.role})</span>
        <button onClick={() => { logout(); navigate('/login'); }} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm">Logout</button>
      </div>
    </nav>
  );
}