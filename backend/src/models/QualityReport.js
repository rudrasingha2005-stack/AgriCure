const mongoose = require('mongoose');

const qualityReportSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true, unique: true },
  moisturePct: { type: Number, required: true },
  drynessScore: { type: Number, required: true },
  rottenPct: { type: Number, required: true },
  grade: { type: String, enum: ['A', 'B', 'C', 'Rejected'], required: true },
  imagePath: { type: String, required: true },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('QualityReport', qualityReportSchema);