const QualityReport = require('../models/QualityReport');
const Booking = require('../models/Booking');
const { analyzeCropImage } = require('../services/aiQualityService');
const { notifyQueueUpdate } = require('../sockets/queueSocket');

exports.analyzeAndSave = async (req, res) => {
  try {
    const { bookingId } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Crop image is required' });

    const aiResult = await analyzeCropImage(req.file.path);
    
    const report = await QualityReport.create({
      bookingId,
      ...aiResult,
      verifiedBy: req.user.userId
    });

    const booking = await Booking.findByIdAndUpdate(bookingId, { status: 'Inspected' }, { new: true });
    notifyQueueUpdate(booking.centreId.toString(), {
      bookingId,
      tokenNumber: booking.tokenNumber,
      status: 'Inspected',
      timestamp: new Date()
    });

    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReportByBooking = async (req, res) => {
  try {
    const report = await QualityReport.findOne({ bookingId: req.params.bookingId });
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};