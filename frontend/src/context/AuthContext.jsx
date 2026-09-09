// import React, { createContext, useState, useEffect } from 'react';
// import API from '../services/api';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

//   const login = async (email, password) => {
//     const res = await API.post('/auth/login', { email, password });
//     localStorage.setItem('token', res.data.token);
//     localStorage.setItem('user', JSON.stringify(res.data.user));
//     setUser(res.data.user);
//     return res.data.user;
//   };

//   const logout = () => {
//     localStorage.clear();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import React, { createContext, useEffect, useState } from 'react';
import API from '../services/api';
import { syncOfflineActions } from '../services/offlineQueue';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const persist = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const login = async (identifier, password) => {
    const res = await API.post('/auth/login', { identifier, password });
    return persist(res.data);
  };

  const requestOtp = async (phone) => (await API.post('/auth/request-otp', { phone })).data;
  const verifyOtp = async (phone, otp) => persist((await API.post('/auth/verify-otp', { phone, otp })).data);

  const logout = () => {
    localStorage.removeItem('token'); localStorage.removeItem('user'); setUser(null);
  };

  useEffect(() => {
    const sync = () => user && syncOfflineActions(API);
    window.addEventListener('online', sync);
    sync();
    return () => window.removeEventListener('online', sync);
  }, [user]);

  return <AuthContext.Provider value={{ user, login, requestOtp, verifyOtp, logout }}>{children}</AuthContext.Provider>;
};
