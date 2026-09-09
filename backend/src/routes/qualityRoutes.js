const router = require('express').Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { analyzeAndSave, getReportByBooking } = require('../controllers/qualityController');

router.post('/analyze', protect, authorize('professional'), upload.single('image'), analyzeAndSave);
router.get('/:bookingId', protect, getReportByBooking);

module.exports = router;