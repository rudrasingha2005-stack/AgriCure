// const mongoose = require('mongoose');

// const feedbackSchema = new mongoose.Schema({
//   fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   toUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   type: { type: String, enum: ['rating', 'allegation'], required: true },
//   rating: { type: Number, min: 1, max: 5 },
//   comment: { type: String },
//   proofFilePath: { type: String } // Mandatory if type === 'allegation'
// }, { timestamps: true });

// module.exports = mongoose.model('Feedback', feedbackSchema);
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  toUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  type: { type: String, enum: ['rating', 'allegation', 'complaint'], required: true },
  rating: { type: Number, min: 1, max: 5 },
  subRatings: {
    productQuality: Number,
    cooperation: Number,
    timeliness: Number,
    overall: Number,
    behaviour: Number,
    transparency: Number,
    speed: Number
  },
  issueType: {
    type: String,
    enum: ['Wrong weight', 'Unfair rejection', 'Wrong grading', 'Behaviour', 'Payment issue', 'Other']
  },
  comment: String,
  proofFilePath: String,
  status: { type: String, enum: ['open', 'in_review', 'resolved', 'escalated'], default: 'open' },
  escalatedAt: Date,
  resolutionNote: String
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
