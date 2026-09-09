const router = require('express').Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  bookSlot,
  getFarmerBookings,
  updateQueueStatus,
  getNearbyCentres,
  getQueueStatus,
  getSlotAvailability,
  getAllBookings,
  callNextFarmer,
  verifyFarmer,
  verifyProduct,
  recordDigitalWeight,
  confirmPurchase,
  rejectPurchase,
  submitProfessionalFeedback
} = require('../controllers/bookingController');

const staffAuth = [protect, authorize('professional', 'company', 'admin')];

router.post('/', protect, authorize('farmer'), bookSlot);
router.get('/my-bookings', protect, authorize('farmer'), getFarmerBookings);
router.patch('/queue', ...staffAuth, updateQueueStatus);
router.get('/nearby', protect, getNearbyCentres);
router.get('/all', ...staffAuth, getAllBookings);
router.post('/call-next', ...staffAuth, callNextFarmer);
router.post('/verify-farmer', ...staffAuth, verifyFarmer);
router.post('/verify-product', ...staffAuth, verifyProduct);
router.post('/record-weight', ...staffAuth, recordDigitalWeight);
router.post('/confirm-purchase', ...staffAuth, confirmPurchase);
router.post('/reject-purchase', ...staffAuth, rejectPurchase);
router.post('/professional-feedback', ...staffAuth, submitProfessionalFeedback);

router.get('/:bookingId/queue', protect, getQueueStatus);
router.get('/announcement/:announcementId/availability', protect, getSlotAvailability);
router.get('/availability/:announcementId', protect, getSlotAvailability);

module.exports = router;