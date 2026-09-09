import React, { createContext, useEffect, useState } from 'react';
import API from '../services/api';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const refresh = async () => {
    try { setItems((await API.get('/notifications')).data); } catch {}
  };
  useEffect(() => { refresh(); }, []);
  return <NotificationContext.Provider value={{ items, refresh, unread: items.filter(x => !x.read).length }}>{children}</NotificationContext.Provider>;
};
