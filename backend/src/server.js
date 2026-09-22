require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const { initSocket } = require('./sockets/queueSocket');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_URL || '*' } });

connectDB();
initSocket(io);

app.use(cors({ origin: process.env.CLIENT_URL || true }));
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'agrisetu-api' });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/quality', require('./routes/qualityRoutes'));
app.use('/api/company', require('./routes/companyRoutes'));
app.use('/api/farmer', require('./routes/farmerRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/grievances', require('./routes/grievanceRoutes'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  server.listen(PORT, () => console.log(`AgriSetu Server running on port ${PORT}`));
}

module.exports = app;
