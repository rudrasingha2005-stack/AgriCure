// const mongoose = require('mongoose');

// const announcementSchema = new mongoose.Schema({
//   companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   centreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Centre', required: true },
//   cropType: { type: String, required: true },
//   quantityNeeded: { type: Number, required: true },
//   qualitySpec: { type: String, required: true },
//   ratePerKg: { type: Number, required: true },
//   status: { type: String, enum: ['open', 'closed'], default: 'open' }
// }, { timestamps: true });

// module.exports = mongoose.model('Announcement', announcementSchema);
const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  centreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Centre', required: true },
  cropType: { type: String, required: true },
  quantityNeeded: { type: Number, required: true },
  fulfilledQuantity: { type: Number, default: 0 },
  qualitySpec: { type: String, required: true },
  ratePerKg: { type: Number, required: true },
  availableDates: { type: [String], default: [] },
  maxBookingsPerDay: { type: Number, default: 0 },
  status: { type: String, enum: ['open', 'closed'], default: 'open' }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);
