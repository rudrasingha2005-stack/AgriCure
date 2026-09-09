require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Centre = require('./models/Centre');
const Announcement = require('./models/Announcement');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany({});
    await Centre.deleteMany({});
    await Announcement.deleteMany({});

    const passwordHash = await bcrypt.hash('password123', 10);

    const farmer = await User.create({
      name: 'Ramesh Patel', phone: '9876543210', email: 'farmer@test.com',
      passwordHash, role: 'farmer', farmerProfile: { identityDocId: 'DOC123456', bankAccount: 'SBI00001234' }
    });

    const company = await User.create({
      name: 'AgriCorp Buying', phone: '9876543211', email: 'company@test.com',
      passwordHash, role: 'company', companyProfile: { companyName: 'AgriCorp India Ltd' }
    });

    const pro = await User.create({
      name: 'Inspector Suresh', phone: '9876543212', email: 'pro@test.com',
      passwordHash, role: 'professional'
    });

    const centre = await Centre.create({
      companyId: company._id,
      name: 'APMC Central Procurement Yard',
      location: { type: 'Point', coordinates: [77.5946, 12.9716] }, // Bangalore
      capacityPerDay: 50
    });

    await Announcement.create({
      companyId: company._id,
      centreId: centre._id,
      cropType: 'Wheat (Grade A)',
      quantityNeeded: 5000,
      qualitySpec: 'Moisture < 12%, Zero Mold',
      ratePerKg: 28.5
    });

    console.log('Seed completed successfully!');
    console.log('Demo Users Created (Password for all: password123):');
    console.log('Farmer: farmer@test.com | Company: company@test.com | Pro: pro@test.com');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();