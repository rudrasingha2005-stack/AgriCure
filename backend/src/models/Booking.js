// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   announcementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Announcement', required: true },
//   centreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Centre', required: true },
//   slotDate: { type: String, required: true }, // YYYY-MM-DD
//   tokenNumber: { type: Number, required: true },
//   qrCodeUrl: { type: String },
//   status: { 
//     type: String, 
//     enum: ['Booked', 'Checked-in', 'Weighed', 'Inspected', 'Accepted', 'Rejected', 'Payment Processing', 'Paid'], 
//     default: 'Booked' 
//   },
//   weighedQuantity: { type: Number, default: 0 }
// }, { timestamps: true });

// module.exports = mongoose.model('Booking', bookingSchema);
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  announcementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Announcement', required: true },
  centreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Centre', required: true },
  slotDate: { type: String, required: true },
  tokenNumber: { type: Number, required: true },
  qrCodeUrl: String,
  cropProfile: {
    cropType: String,
    variety: String,
    expectedQuantity: Number
  },
  groupBookingCode: { type: String, default: null },
  groupSize: { type: Number, default: 1 },
  status: {
    type: String,
    enum: ['Booked', 'Waiting', 'Arrived', 'Processing', 'Checked-in', 'Weighed', 'Inspected', 'AI Analysis', 'Accepted', 'Purchased', 'Rejected', 'Payment Processing', 'Paid', 'Cancelled'],
    default: 'Booked'
  },
  weighedQuantity: { type: Number, default: 0 },
  estimatedWaitMinutes: { type: Number, default: 0 },
  counter: { type: String, default: 'Counter 04' },
  verification: {
    farmerIdentity: { type: Boolean, default: false },
    slotVerified: { type: Boolean, default: false },
    productVerified: { type: Boolean, default: false },
    verifiedAt: Date,
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  productInspection: {
    actualQuantity: Number,
    condition: { type: String, enum: ['Excellent', 'Good', 'Average', 'Poor'], default: 'Good' },
    visibleDamagePct: { type: Number, default: 0 },
    rottenPct: { type: Number, default: 0 },
    foreignMaterialPct: { type: Number, default: 0 },
    remarks: String
  },
  digitalWeight: {
    grossWeight: Number,
    tareWeight: Number,
    netWeight: Number,
    deviceId: { type: String, default: 'WS-04' },
    timestamp: Date
  },
  photos: {
    front: String,
    top: String,
    sample: String,
    damage: String
  },
  purchaseDetails: {
    netWeight: Number,
    grade: { type: String, default: 'A' },
    ratePerKg: Number,
    totalAmount: Number,
    purchaseId: String,
    confirmedAt: Date
  },
  rejection: {
    reason: String,
    remarks: String,
    rejectedAt: Date
  }
}, { timestamps: true });

bookingSchema.index({ centreId: 1, slotDate: 1, tokenNumber: 1 }, { unique: true });
module.exports = mongoose.model('Booking', bookingSchema);
