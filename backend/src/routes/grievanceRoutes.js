const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const c = require('../controllers/grievanceController');
router.get('/mine', protect, c.getMine);
router.post('/escalate-overdue', protect, c.escalateOverdue);
module.exports = router;
