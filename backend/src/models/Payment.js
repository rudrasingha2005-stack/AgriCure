// const mongoose = require('mongoose');

// const paymentSchema = new mongoose.Schema({
//   bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
//   farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   amount: { type: Number, required: true },
//   status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
//   transactionRef: { type: String }
// }, { timestamps: true });

// module.exports = mongoose.model('Payment', paymentSchema);
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true, unique: true },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Processing', 'Completed', 'Failed'], default: 'Pending' },
  expectedSettlementDate: Date,
  transactionRef: String,
  paidAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
