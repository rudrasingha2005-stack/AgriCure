const mongoose = require('mongoose');

const centreSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  address: { type: String, default: 'Siliguri, West Bengal' },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  capacityPerDay: { type: Number, required: true, default: 100 },
  workingHours: { type: String, default: '08:00 AM - 05:00 PM' },
  productsAccepted: { type: [String], default: ['Potato', 'Rice', 'Wheat', 'Tomato', 'Corn'] },
  status: { type: String, enum: ['Active', 'High Load', 'Inactive'], default: 'Active' },
  assignedProfessionals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dailyTokenCounter: { type: Map, of: Number, default: {} } // Format: YYYY-MM-DD -> Count
}, { timestamps: true });

centreSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Centre', centreSchema);