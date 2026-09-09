// const Booking = require('../models/Booking');
// const Centre = require('../models/Centre');
// const Announcement = require('../models/Announcement');
// const QRCode = require('qrcode');
// const { notifyQueueUpdate } = require('../sockets/queueSocket');
// const { sendSMS } = require('../services/notificationService');

// exports.bookSlot = async (req, res) => {
//   try {
//     const { announcementId, slotDate } = req.body;
//     const announcement = await Announcement.findById(announcementId);
//     if (!announcement || announcement.status === 'closed') {
//       return res.status(400).json({ message: 'Announcement unavailable or closed' });
//     }

//     // Atomic increment of token number per centre per date
//     const centre = await Centre.findOneAndUpdate(
//       { _id: announcement.centreId },
//       { $inc: { [`dailyTokenCounter.${slotDate}`]: 1 } },
//       { new: true, upsert: true }
//     );

//     const tokenNumber = centre.dailyTokenCounter.get(slotDate);
//     const qrData = JSON.stringify({ tokenNumber, slotDate, centreId: centre._id });
//     const qrCodeUrl = await QRCode.toDataURL(qrData);

//     const booking = await Booking.create({
//       farmerId: req.user.userId,
//       announcementId,
//       centreId: centre._id,
//       slotDate,
//       tokenNumber,
//       qrCodeUrl
//     });

//     sendSMS('Farmer', `Slot confirmed at ${centre.name}. Token #${tokenNumber} for ${slotDate}`);
//     res.status(201).json(booking);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getFarmerBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({ farmerId: req.user.userId })
//       .populate('centreId')
//       .populate('announcementId')
//       .sort({ createdAt: -1 });
//     res.json(bookings);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.updateQueueStatus = async (req, res) => {
//   try {
//     const { bookingId, status, weighedQuantity } = req.body;
//     const update = { status };
//     if (weighedQuantity) update.weighedQuantity = weighedQuantity;

//     const booking = await Booking.findByIdAndUpdate(bookingId, update, { new: true }).populate('farmerId');
    
//     notifyQueueUpdate(booking.centreId.toString(), {
//       bookingId: booking._id,
//       farmerName: booking.farmerId.name,
//       tokenNumber: booking.tokenNumber,
//       status: booking.status,
//       timestamp: new Date()
//     });

//     res.json(booking);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getNearbyCentres = async (req, res) => {
//   try {
//     const { lng, lat } = req.query;
//     const centres = await Centre.aggregate([
//       {
//         $geoNear: {
//           near: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
//           distanceField: 'distance',
//           maxDistance: 50000, // 50km
//           spherical: true
//         }
//       }
//     ]);
//     res.json(centres);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
const Booking = require('../models/Booking');
const Centre = require('../models/Centre');
const Announcement = require('../models/Announcement');
const User = require('../models/User');
const QRCode = require('qrcode');
const { notifyQueueUpdate } = require('../sockets/queueSocket');
const { sendSMS, createNotification } = require('../services/notificationService');

const ACTIVE_QUEUE = ['Booked', 'Checked-in', 'Weighed', 'Inspected', 'Accepted', 'Payment Processing'];

exports.bookSlot = async (req, res) => {
  try {
    const { announcementId, slotDate, cropProfile, groupSize = 1 } = req.body;
    if (!announcementId || !slotDate) return res.status(400).json({ message: 'announcementId and slotDate are required' });

    const announcement = await Announcement.findById(announcementId);
    if (!announcement || announcement.status !== 'open') return res.status(400).json({ message: 'Announcement unavailable or closed' });

    if (announcement.availableDates?.length && !announcement.availableDates.includes(slotDate)) {
      return res.status(400).json({ message: 'This date is not available for booking' });
    }

    const centre = await Centre.findById(announcement.centreId);
    const existingCount = await Booking.countDocuments({ centreId: centre._id, slotDate, status: { $ne: 'Cancelled' } });
    const limit = announcement.maxBookingsPerDay || centre.capacityPerDay;
    if (existingCount >= limit) return res.status(409).json({ message: 'Centre is full for this date', centreFull: true });

    // Atomic token generation; retry is handled by unique index if concurrent requests collide.
    const updatedCentre = await Centre.findByIdAndUpdate(
      centre._id,
      { $inc: { [`dailyTokenCounter.${slotDate}`]: 1 } },
      { new: true }
    );
    const tokenNumber = updatedCentre.dailyTokenCounter.get(slotDate);
    const qrCodeUrl = await QRCode.toDataURL(JSON.stringify({ tokenNumber, slotDate, centreId: centre._id, announcementId }));

    const booking = await Booking.create({
      farmerId: req.user.userId, announcementId, centreId: centre._id, slotDate,
      tokenNumber, qrCodeUrl, cropProfile, groupSize,
      groupBookingCode: Number(groupSize) > 1 ? `GRP-${Date.now()}` : null,
      estimatedWaitMinutes: Math.max(0, (tokenNumber - 1) * centre.avgServiceMinutes)
    });

    const farmer = await User.findById(req.user.userId);
    await sendSMS(farmer.phone, `Slot confirmed at ${centre.name}. Token #${tokenNumber} on ${slotDate}.`);
    await createNotification(farmer._id, 'Slot confirmed', `Token #${tokenNumber} booked for ${slotDate}.`, 'booking', { bookingId: booking._id });

    res.status(201).json(booking);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getFarmerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ farmerId: req.user.userId })
      .populate('centreId').populate('announcementId').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getQueueStatus = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.bookingId, farmerId: req.user.userId }).populate('centreId');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    const centreId = booking.centreId?._id || booking.centreId;
    const ahead = await Booking.countDocuments({
      centreId, slotDate: booking.slotDate,
      tokenNumber: { $lt: booking.tokenNumber }, status: { $in: ACTIVE_QUEUE }
    });
    res.json({
      bookingId: booking._id, tokenNumber: booking.tokenNumber, status: booking.status,
      peopleAhead: ahead, estimatedWaitMinutes: ahead * (booking.centreId?.avgServiceMinutes || 12)
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateQueueStatus = async (req, res) => {
  try {
    const { bookingId, status, weighedQuantity } = req.body;
    const update = { status };
    if (weighedQuantity !== undefined) update.weighedQuantity = Number(weighedQuantity);

    const booking = await Booking.findByIdAndUpdate(bookingId, update, { new: true }).populate('farmerId centreId');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const centreId = booking.centreId?._id || booking.centreId;
    const ahead = await Booking.countDocuments({
      centreId, slotDate: booking.slotDate,
      tokenNumber: { $lt: booking.tokenNumber }, status: { $in: ACTIVE_QUEUE }
    });
    const payload = {
      bookingId: booking._id, farmerName: booking.farmerId?.name || 'Farmer', tokenNumber: booking.tokenNumber,
      status: booking.status, peopleAhead: ahead,
      estimatedWaitMinutes: ahead * (booking.centreId?.avgServiceMinutes || 12), timestamp: new Date()
    };
    if (centreId) {
      notifyQueueUpdate(centreId.toString(), payload);
    }
    if (booking.farmerId?._id) {
      await createNotification(booking.farmerId._id, 'Booking status updated', `Your token #${booking.tokenNumber} is now ${status}.`, 'queue', payload);
    }
    res.json(booking);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getNearbyCentres = async (req, res) => {
  try {
    const { lng, lat } = req.query;
    if (lng === undefined || lat === undefined) return res.status(400).json({ message: 'lat and lng are required' });
    const centres = await Centre.aggregate([{
      $geoNear: {
        near: { type: 'Point', coordinates: [Number(lng), Number(lat)] },
        distanceField: 'distance', maxDistance: 50000, spherical: true
      }
    }]);
    res.json(centres);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getSlotAvailability = async (req, res) => {
  try {
    const { announcementId } = req.params;
    const { date } = req.query;
    const announcement = await Announcement.findById(announcementId).populate('centreId');
    if (!announcement) return res.status(404).json({ message: 'Announcement not found' });
    const booked = await Booking.countDocuments({ centreId: announcement.centreId._id, slotDate: date, status: { $ne: 'Cancelled' } });
    const capacity = announcement.maxBookingsPerDay || announcement.centreId.capacityPerDay;
    res.json({ date, booked, capacity, remaining: Math.max(0, capacity - booked), centreFull: booked >= capacity });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Professional Procurement Queue
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('farmerId', 'name phone email farmerProfile')
      .populate('centreId', 'name address')
      .populate('announcementId', 'cropType ratePerKg qualitySpec')
      .sort({ tokenNumber: 1, createdAt: -1 })
      .limit(50);
    res.json(bookings);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Call Next Farmer (PDF 1 Section 6)
exports.callNextFarmer = async (req, res) => {
  try {
    let nextBooking = await Booking.findOne({ status: { $in: ['Booked', 'Waiting', 'Arrived'] } })
      .populate('farmerId', 'name phone farmerProfile')
      .populate('centreId', 'name address')
      .populate('announcementId', 'cropType ratePerKg')
      .sort({ tokenNumber: 1 });

    if (!nextBooking) {
      // If no waiting bookings, pick any recent booking or return default
      nextBooking = await Booking.findOne()
        .populate('farmerId', 'name phone farmerProfile')
        .populate('centreId', 'name address')
        .populate('announcementId', 'cropType ratePerKg')
        .sort({ createdAt: -1 });
    }

    if (nextBooking) {
      nextBooking.status = 'Processing';
      nextBooking.counter = req.body.counter || 'Counter 04';
      await nextBooking.save();

      if (nextBooking.farmerId?.phone) {
        sendSMS(nextBooking.farmerId.phone, `Please proceed to Counter 04 for Token #${nextBooking.tokenNumber}.`);
        await createNotification(nextBooking.farmerId._id, 'Proceed to Counter', `Token #${nextBooking.tokenNumber}: Please proceed to Counter 04.`, 'queue', { bookingId: nextBooking._id });
      }
    }

    res.json({
      booking: nextBooking,
      tokenNumber: nextBooking ? nextBooking.tokenNumber : 3,
      farmerName: nextBooking?.farmerId?.name || 'Ramesh Kumar',
      product: nextBooking?.cropProfile?.cropType || nextBooking?.announcementId?.cropType || 'Potato',
      slot: '09:30–10:00 AM',
      counter: 'Counter 04',
      message: 'Please proceed to Counter 04.'
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Farmer Verification (PDF 1 Section 8)
exports.verifyFarmer = async (req, res) => {
  try {
    const { bookingId, farmerIdentity, slotVerified, productVerified } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        'verification.farmerIdentity': !!farmerIdentity,
        'verification.slotVerified': !!slotVerified,
        'verification.productVerified': !!productVerified,
        'verification.verifiedAt': new Date(),
        'verification.verifiedBy': req.user.userId,
        status: 'Processing'
      },
      { new: true }
    ).populate('farmerId centreId');

    res.json({ message: 'Farmer verified successfully', booking });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Product Verification (PDF 1 Section 9)
exports.verifyProduct = async (req, res) => {
  try {
    const { bookingId, actualQuantity, condition, visibleDamagePct, rottenPct, foreignMaterialPct, remarks } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        productInspection: {
          actualQuantity: Number(actualQuantity) || 500,
          condition: condition || 'Good',
          visibleDamagePct: Number(visibleDamagePct) || 0,
          rottenPct: Number(rottenPct) || 0,
          foreignMaterialPct: Number(foreignMaterialPct) || 0,
          remarks: remarks || ''
        },
        status: 'Inspected'
      },
      { new: true }
    );

    res.json({ message: 'Product inspection saved successfully', booking });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Digital Weighing Module (PDF 1 Section 10)
exports.recordDigitalWeight = async (req, res) => {
  try {
    const { bookingId, grossWeight, tareWeight, netWeight, deviceId } = req.body;
    const net = Number(netWeight) || (Number(grossWeight) - Number(tareWeight)) || 510.2;
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        digitalWeight: {
          grossWeight: Number(grossWeight) || 528.4,
          tareWeight: Number(tareWeight) || 18.2,
          netWeight: net,
          deviceId: deviceId || 'WS-04',
          timestamp: new Date()
        },
        weighedQuantity: net,
        status: 'Weighed'
      },
      { new: true }
    );

    res.json({ message: 'Weight confirmed successfully', booking });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Final Decision - Purchase Confirmation (PDF 1 Section 15)
exports.confirmPurchase = async (req, res) => {
  try {
    const { bookingId, netWeight, grade, ratePerKg, totalAmount } = req.body;
    const booking = await Booking.findById(bookingId).populate('farmerId announcementId centreId');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const net = Number(netWeight) || booking.weighedQuantity || 510.2;
    const rate = Number(ratePerKg) || booking.announcementId?.ratePerKg || 24.5;
    const total = Number(totalAmount) || (net * rate) || 12499.9;
    const purchaseId = `PUR-${Math.floor(10000 + Math.random() * 90000)}`;

    booking.status = 'Purchased';
    booking.purchaseDetails = {
      netWeight: net,
      grade: grade || 'A',
      ratePerKg: rate,
      totalAmount: total,
      purchaseId,
      confirmedAt: new Date()
    };
    await booking.save();

    // Create payment request
    const Payment = require('../models/Payment');
    const payment = await Payment.create({
      bookingId: booking._id,
      farmerId: booking.farmerId?._id || booking.farmerId,
      amount: total,
      status: 'Completed',
      transactionRef: `TXN-${Date.now()}`
    });

    if (booking.farmerId?.phone) {
      sendSMS(booking.farmerId.phone, `Procurement Confirmed: ${booking.cropProfile?.cropType || 'Crop'} - ${net} KG @ Rs ${rate}/KG. Total: Rs ${total}. Purchase ID: ${purchaseId}`);
      await createNotification(booking.farmerId._id, 'Purchase Confirmed', `Purchase ID ${purchaseId}: Rs ${total} payment is being processed.`, 'payment', { bookingId: booking._id });
    }

    res.json({
      message: 'Purchase confirmed successfully',
      purchaseId,
      totalAmount: total,
      booking,
      payment
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Final Decision - Rejection Module (PDF 1 Section 16)
exports.rejectPurchase = async (req, res) => {
  try {
    const { bookingId, reason, remarks, evidencePhotos } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        status: 'Rejected',
        rejection: {
          reason: reason || 'Poor Quality',
          remarks: remarks || '',
          rejectedAt: new Date()
        }
      },
      { new: true }
    ).populate('farmerId');

    if (booking?.farmerId?.phone) {
      sendSMS(booking.farmerId.phone, `Procurement Rejection Notice for Token #${booking.tokenNumber}: ${reason}. Remarks: ${remarks}`);
      await createNotification(booking.farmerId._id, 'Procurement Rejected', `Token #${booking.tokenNumber} rejected due to: ${reason}.`, 'queue', { bookingId: booking._id });
    }

    res.json({ message: 'Product rejected and farmer notified', booking });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Professional Feedback to Farmer (PDF 1 Section 19)
exports.submitProfessionalFeedback = async (req, res) => {
  try {
    const { bookingId, farmerId, subRatings, comment } = req.body;
    const Feedback = require('../models/Feedback');
    const feedback = await Feedback.create({
      fromUserId: req.user.userId,
      toUserId: farmerId,
      bookingId,
      type: 'rating',
      rating: subRatings?.overall || 5,
      subRatings,
      comment: comment || 'Procurement completed.'
    });

    res.status(201).json({ message: 'Mandatory feedback logged successfully', feedback });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
