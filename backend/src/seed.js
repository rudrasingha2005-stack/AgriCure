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

    const passwordHash = await bcrypt.hash('AgriSetu@2025', 10);

    const farmer = await User.create({
      name: 'Ramesh Patel', phone: '9876543210', email: 'farmer@test.com',
      passwordHash, role: 'farmer', farmerProfile: { identityDocId: 'FMR-WB-09214', bankAccount: 'SBI00001234' }
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
      name: 'APMC Central Procurement Yard (Siliguri)',
      location: { type: 'Point', coordinates: [88.4286, 26.7271] }, // Siliguri
      capacityPerDay: 50
    });

    const announcement = await Announcement.create({
      companyId: company._id,
      centreId: centre._id,
      cropType: 'Potato (Grade A)',
      quantityNeeded: 25000,
      qualitySpec: 'Moisture < 12%, Zero Mold, Uniform Grading',
      ratePerKg: 14.5
    });

    // Create 12+ farmers & bookings for queue
    const demoFarmers = [
      { name: 'Ramesh Patel', phone: '9876543210', crop: 'Potato', qty: 520, token: 1, status: 'Purchased' },
      { name: 'Harish Verma', phone: '9876543219', crop: 'Potato', qty: 430, token: 2, status: 'Purchased' },
      { name: 'Ramesh Kumar', phone: '9876543210', crop: 'Potato', qty: 500, token: 3, status: 'Processing' },
      { name: 'Gurpreet Singh', phone: '9876543222', crop: 'Wheat', qty: 850, token: 4, status: 'Waiting' },
      { name: 'Sunil Mondal', phone: '9876543233', crop: 'Rice', qty: 700, token: 5, status: 'Waiting' },
      { name: 'Debjyoti Sinha', phone: '9876543244', crop: 'Tomato', qty: 400, token: 6, status: 'Waiting' },
      { name: 'Manish Roy', phone: '9876543255', crop: 'Potato', qty: 620, token: 7, status: 'Waiting' },
      { name: 'Bikash Das', phone: '9876543266', crop: 'Rice', qty: 950, token: 8, status: 'Waiting' },
      { name: 'Pradip Biswas', phone: '9876543277', crop: 'Wheat', qty: 540, token: 9, status: 'Waiting' },
      { name: 'Subhash Barman', phone: '9876543288', crop: 'Onion', qty: 780, token: 10, status: 'Waiting' },
      { name: 'Anil Sengupta', phone: '9876543299', crop: 'Tomato', qty: 350, token: 11, status: 'Waiting' },
      { name: 'Kalyan Ghosh', phone: '9876543201', crop: 'Potato', qty: 800, token: 12, status: 'Waiting' }
    ];

    const todayStr = new Date().toISOString().slice(0, 10);
    const Booking = require('./models/Booking');
    const Payment = require('./models/Payment');
    await Booking.deleteMany({});
    await Payment.deleteMany({});

    for (const df of demoFarmers) {
      const u = df.phone === '9876543210' ? farmer : await User.create({
        name: df.name, phone: df.phone, email: `${df.phone}@test.com`,
        passwordHash, role: 'farmer', farmerProfile: { identityDocId: `FMR-WB-${df.token + 100}`, bankAccount: `SBI0000${df.token + 100}` }
      });

      const b = await Booking.create({
        farmerId: u._id,
        announcementId: announcement._id,
        centreId: centre._id,
        slotDate: todayStr,
        tokenNumber: df.token,
        cropProfile: { cropType: df.crop, variety: 'Standard', expectedQuantity: df.qty },
        weighedQuantity: df.qty,
        status: df.status,
        counter: 'Counter 04',
        purchaseDetails: {
          netWeight: df.qty,
          grade: 'A',
          ratePerKg: 14.5,
          totalAmount: Math.round(df.qty * 14.5),
          purchaseId: `PUR-${20000 + df.token}`
        }
      });

      if (df.status === 'Purchased') {
        await Payment.create({
          farmerId: u._id,
          bookingId: b._id,
          amount: Math.round(df.qty * 14.5),
          status: 'Completed',
          transactionRef: `DBT${Date.now()}${df.token}`
        });
      }
    }

    console.log('Seed completed successfully for AgriSetu!');
    console.log('Demo Users Created (Password for all: AgriSetu@2025):');
    console.log('Farmer: 9876543210 (farmer@test.com) | Company: company@test.com | Pro: pro@test.com');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();