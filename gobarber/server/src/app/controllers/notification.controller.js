import Notification from '../schemas/Notification'
import User from '../models/User'

class NotificationController {
  async list(req, res) {
    const notifications = await Notification.find()
    return res.json(notifications)
  }

  async index(req, res) {
    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true }
    })
    if (!isProvider) {
      return res.status(401).json({ err: ' User is not a Provider' })
    }
    const notifications = await Notification.find({
      user: req.userId
    })
      .sort({ createdAt: 'desc' })
      .limit(20)
    return res.json(notifications)
  }
  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    )
    return res.json(notification)
  }
}

export default new NotificationController()
