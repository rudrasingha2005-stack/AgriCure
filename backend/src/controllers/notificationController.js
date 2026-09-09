const Notification = require('../models/Notification');

exports.getMine = async (req, res) => {
  const items = await Notification.find({ userId: req.user.userId }).sort({ createdAt: -1 }).limit(100);
  res.json(items);
};

exports.markRead = async (req, res) => {
  const item = await Notification.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.userId }, { read: true }, { new: true }
  );
  res.json(item);
};

exports.markAllRead = async (req, res) => {
  await Notification.updateMany({ userId: req.user.userId, read: false }, { read: true });
  res.json({ message: 'All notifications marked read' });
};
