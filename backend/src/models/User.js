// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   phone: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   passwordHash: { type: String, required: true },
//   role: { type: String, enum: ['farmer', 'company', 'professional'], required: true },
//   farmerProfile: {
//     identityDocId: { type: String }, // Aadhaar/Land ID placeholder
//     bankAccount: { type: String }
//   },
//   companyProfile: {
//     companyName: { type: String }
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const savedCropSchema = new mongoose.Schema({
  cropType: { type: String, required: true },
  variety: { type: String, default: '' },
  expectedQuantity: { type: Number, default: 0 }
}, { _id: true });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true, trim: true },
  email: { type: String, trim: true, lowercase: true, sparse: true },
  passwordHash: { type: String, default: '' },
  role: { type: String, enum: ['farmer', 'company', 'professional', 'admin'], default: 'farmer' },
  preferredLanguage: { type: String, default: 'en' },
  dob: { type: String, default: '' },
  gender: { type: String, default: '' },
  farmerProfile: {
    farmerId: String,
    identityDocId: String,
    landId: String,
    totalFarmArea: Number,
    landType: String,
    mainCrops: { type: [String], default: [] },
    expectedQuantity: Number,
    address: String,
    state: String,
    district: String,
    block: String,
    village: String,
    pincode: String,
    locationCoordinates: { lat: Number, lng: Number },
    bankAccount: String,
    bankDetails: {
      accountHolder: String,
      bankName: String,
      accountNumber: String,
      ifsc: String,
      isVerified: { type: Boolean, default: false }
    },
    savedCrops: { type: [savedCropSchema], default: [] }
  },
  companyProfile: {
    companyName: String,
    gstin: String,
    cin: String,
    businessType: String,
    procurementCategories: { type: [String], default: [] },
    storageCapacity: Number
  },
  professionalProfile: {
    qualification: String,
    licenseId: String,
    specialization: String,
    organization: String
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
