const KEY = 'agrisetu_offline_actions';
export const queueOfflineAction = (action) => {
  const items = JSON.parse(localStorage.getItem(KEY) || '[]');
  items.push({ ...action, id: crypto.randomUUID(), createdAt: Date.now() });
  localStorage.setItem(KEY, JSON.stringify(items));
};
export const syncOfflineActions = async (API) => {
  const items = JSON.parse(localStorage.getItem(KEY) || '[]');
  const remaining = [];
  for (const item of items) {
    try { await API({ method: item.method, url: item.url, data: item.data }); }
    catch { remaining.push(item); }
  }
  localStorage.setItem(KEY, JSON.stringify(remaining));
  return { synced: items.length - remaining.length, remaining: remaining.length };
};
