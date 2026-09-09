const router = require('express').Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  createAnnouncement,
  getAnnouncements,
  releasePayment,
  submitAllegation,
  getAdminStats,
  getCentres,
  addCentre,
  updateCentre,
  getProfessionals,
  addProfessional,
  updateProfessional,
  getLiveProcurement,
  getFarmers,
  getComplaints,
  updateComplaint,
  getFeedback,
  getReports
} = require('../controllers/companyController');

// Allow both 'company' and 'admin' roles
const adminAuth = [protect, authorize('company', 'admin')];

router.post('/announcements', ...adminAuth, createAnnouncement);
router.get('/announcements', protect, getAnnouncements);
router.post('/pay', ...adminAuth, releasePayment);
router.post('/allegation', protect, upload.single('proof'), submitAllegation);

router.get('/stats', ...adminAuth, getAdminStats);
router.get('/centres', protect, getCentres);
router.post('/centres', ...adminAuth, addCentre);
router.patch('/centres/:id', ...adminAuth, updateCentre);

router.get('/professionals', ...adminAuth, getProfessionals);
router.post('/professionals', ...adminAuth, addProfessional);
router.patch('/professionals/:id', ...adminAuth, updateProfessional);

router.get('/live-procurement', ...adminAuth, getLiveProcurement);
router.get('/farmers', ...adminAuth, getFarmers);

router.get('/complaints', ...adminAuth, getComplaints);
router.patch('/complaints/:id', ...adminAuth, updateComplaint);

router.get('/feedback', ...adminAuth, getFeedback);
router.get('/reports', ...adminAuth, getReports);

module.exports = router;