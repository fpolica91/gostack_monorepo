import { startOfDay, endOfDay, parseISO } from 'date-fns'
import { Op } from 'sequelize'
import Appointment from '../models/Appointment'
import User from '../models/User'
class ScheduleController {
  async index(req, res) {
    const checkUserIsProvider = await User.findOne({
      where: { id: req.userId, provider: true }
    })
    // CHECK IF USER IS PROVIDER
    if (!checkUserIsProvider)
      return res.json({ error: 'User is not  provider' })

    const { date } = req.query
    const parseDate = parseISO(date)
    // APPOINTMENTES FOR USER THAT ARE ACTIVE, BETWEEN HOURS
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        cancelled_at: null,
        date: {
          // between start and end of day
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)]
        }
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name']
        }
      ],
      order: ['date']
    })
    //
    return res.json(appointments)
  }
}
export default new ScheduleController()
