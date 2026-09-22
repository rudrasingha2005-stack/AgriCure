import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Return null on portal pages that feature dedicated header bars to prevent double header & logout redundancy
  if (!user || ['/login', '/register', '/farmer', '/professional', '/company', '/admin'].some(path => location.pathname.startsWith(path))) {
    return null;
  }

  return (
    <header className="bg-emerald-700 text-white p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 border border-amber-400 p-0.5 flex items-center justify-center">
          <img src="/agriprocure-logo.png" alt="AgriSetu" className="w-full h-full object-contain" />
        </div>
        <span className="text-xl font-black tracking-tight">AgriSetu</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm bg-emerald-800 px-3 py-1 rounded-full">{user.name} ({user.role})</span>
        <button onClick={() => { logout(); navigate('/login'); }} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm cursor-pointer">Logout</button>
      </div>
    </header>
  );
}