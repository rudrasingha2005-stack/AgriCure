const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const c = require('../controllers/notificationController');
router.get('/', protect, c.getMine);
router.patch('/:id/read', protect, c.markRead);
router.patch('/read-all', protect, c.markAllRead);
module.exports = router;
