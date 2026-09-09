const Feedback = require('../models/Feedback');

exports.getMine = async (req, res) => {
  const items = await Feedback.find({ fromUserId: req.user.userId, type: 'allegation' }).sort({ createdAt: -1 });
  res.json(items);
};

exports.escalateOverdue = async (req, res) => {
  const days = Number(process.env.GRIEVANCE_ESCALATION_DAYS || 7);
  const cutoff = new Date(Date.now() - days * 86400000);
  const result = await Feedback.updateMany(
    { type: 'allegation', status: { $in: ['open', 'in_review'] }, createdAt: { $lt: cutoff } },
    { status: 'escalated', escalatedAt: new Date() }
  );
  res.json({ escalated: result.modifiedCount });
};
