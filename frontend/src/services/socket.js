import { io } from 'socket.io-client';

function getSocketUrl() {
  if (import.meta.env.VITE_BACKEND_URL) return import.meta.env.VITE_BACKEND_URL;
  const fromApi = import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '');
  if (fromApi) return fromApi;
  if (import.meta.env.PROD && typeof window !== 'undefined') return window.location.origin;
  return 'http://localhost:5000';
}

export const socket = io(getSocketUrl(), { autoConnect: false });