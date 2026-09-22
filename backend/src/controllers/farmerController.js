const User = require('../models/User');
const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const QualityReport = require('../models/QualityReport');
const Feedback = require('../models/Feedback');
const Announcement = require('../models/Announcement');
const { getWeatherForBooking } = require('../services/weatherService');
const { streamReceipt } = require('../services/pdfService');

exports.getDashboard = async (req, res) => {
  const [bookings, payments] = await Promise.all([
    Booking.find({ farmerId: req.user.userId }).populate('centreId announcementId').sort({ createdAt: -1 }).limit(5),
    Payment.find({ farmerId: req.user.userId }).sort({ createdAt: -1 }).limit(5)
  ]);
  res.json({ bookings, payments });
};

exports.getSavedCrops = async (req, res) => {
  const user = await User.findById(req.user.userId).select('farmerProfile.savedCrops');
  res.json(user?.farmerProfile?.savedCrops || []);
};

exports.saveCrop = async (req, res) => {
  const { cropType, variety = '', expectedQuantity = 0 } = req.body;
  if (!cropType) return res.status(400).json({ message: 'cropType is required' });
  const user = await User.findById(req.user.userId);
  user.farmerProfile.savedCrops.push({ cropType, variety, expectedQuantity });
  await user.save();
  res.status(201).json(user.farmerProfile.savedCrops);
};

exports.deleteSavedCrop = async (req, res) => {
  const user = await User.findById(req.user.userId);
  user.farmerProfile.savedCrops = user.farmerProfile.savedCrops.filter(x => x._id.toString() !== req.params.cropId);
  await user.save();
  res.json({ message: 'Saved crop removed' });
};

exports.getTransactions = async (req, res) => {
  const payments = await Payment.find({ farmerId: req.user.userId })
    .populate({ path: 'bookingId', populate: ['centreId', 'announcementId'] }).sort({ createdAt: -1 });
  res.json(payments);
};

exports.getPaymentByBooking = async (req, res) => {
  const payment = await Payment.findOne({ bookingId: req.params.bookingId, farmerId: req.user.userId });
  res.json(payment);
};

exports.getReceipt = async (req, res) => {
  const payment = await Payment.findOne({ bookingId: req.params.bookingId, farmerId: req.user.userId });
  const booking = await Booking.findOne({ _id: req.params.bookingId, farmerId: req.user.userId }).populate('centreId');
  const farmer = await User.findById(req.user.userId);
  if (!payment || !booking) return res.status(404).json({ message: 'Receipt unavailable' });
  streamReceipt(res, { booking, payment, farmer });
};

exports.getQualityReport = async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.bookingId, farmerId: req.user.userId });
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  const report = await QualityReport.findOne({ bookingId: booking._id });
  res.json(report);
};

exports.getWeather = async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.bookingId, farmerId: req.user.userId }).populate('centreId');
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  const [lng, lat] = booking.centreId.location.coordinates;
  res.json(await getWeatherForBooking(lat, lng, booking.slotDate));
};

exports.getPriceTrend = async (req, res) => {
  const { cropType } = req.query;
  const items = await Announcement.find(cropType ? { cropType: new RegExp(cropType, 'i') } : {})
    .sort({ createdAt: -1 }).limit(30).select('cropType ratePerKg createdAt');
  res.json(items.reverse());
};

exports.submitFeedback = async (req, res) => {
  const { toUserId, rating, comment } = req.body;
  const feedback = await Feedback.create({
    fromUserId: req.user.userId, toUserId, type: 'rating', rating: Number(rating), comment
  });
  res.status(201).json(feedback);
};

exports.submitAllegation = async (req, res) => {
  const { toUserId, comment } = req.body;
  if (!req.file) return res.status(400).json({ message: 'Proof upload is required' });
  const item = await Feedback.create({
    fromUserId: req.user.userId, toUserId, type: 'allegation', comment, proofFilePath: req.file.path
  });
  res.status(201).json(item);
};

exports.getAnnouncements = async (req, res) => {
  const list = await Announcement.find({ status: 'open' }).populate('centreId').sort({ ratePerKg: -1 });
  res.json(list);
};

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.userId).select('-passwordHash');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

exports.scanCropQuality = async (req, res) => {
  try {
    const { cropType = 'Potato' } = req.body;
    const moisture = Number((10.5 + Math.random() * 3.5).toFixed(1));
    const defectPct = Number((0.4 + Math.random() * 2.2).toFixed(1));
    const score = Math.round(100 - defectPct * 4 - (moisture > 13 ? 5 : 0));
    const grade = score >= 85 ? 'Grade A' : score >= 70 ? 'Grade B' : 'Grade C';
    res.json({
      cropType,
      grade: `${grade} Estimate`,
      score,
      size: 'GOOD',
      colour: 'EXCELLENT',
      moisture: `${moisture}%`,
      foreignMatter: `${(0.4 + Math.random() * 0.6).toFixed(1)}%`,
      defectPct: `${defectPct}%`,
      imagePath: req.file ? req.file.path : null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const { handleFarmerQuery } = require('../services/aiChatService');

exports.aiChatAssistant = async (req, res) => {
  try {
    const { query, language = 'en' } = req.body;
    if (!query) return res.status(400).json({ message: 'Query is required' });
    const response = await handleFarmerQuery(query, language);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

