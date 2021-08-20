import User from '../models/User'
import File from '../models/File'
import Appointment from '../models/Appointment'
import Notification from '../schemas/Notification'
import Queue from '../../lib/Queue'
import CancellationMail from '../jobs/cancellationMail'
// import Mail from "../../lib/Mail";

import * as Yup from 'yup'
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns'
class AppointmentController {
  async index(req, res) {
    console.log(req.userId, 'user id')
    const { page = 1 } = req.query
    const appointment = await Appointment.findAll({
      where: { user_id: req.userId, cancelled_at: null },
      order: ['date'],
      attributes: ['id', 'date', 'past', 'cancellable'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    })

    return res.json(appointment)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    })
    // end of schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }
    const { provider_id, date } = req.body
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    })
    if (!isProvider) res.status(401).json({ error: 'user is not a provider' })

    // CHECKING IF DATE HAS NO PASSED

    const hourStart = startOfHour(parseISO(date))
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' })
    }

    // CHECK AVAILABILITY
    const appointmentBooked = await Appointment.findOne({
      where: {
        provider_id,
        cancelled_at: null,
        date: hourStart,
      },
    })

    if (appointmentBooked) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' })
    }

    //IF ALL TEST PASSS

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    })

    const user = await User.findByPk(req.userId)
    const formattedDate = format(hourStart, "MMMM, dd , 'at' H:mm'h' ")

    await Notification.create({
      content: `Appointment for ${user.name} on ${formattedDate}`,
      user: provider_id,
    })

    return res.json(appointment)
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    })
    if (appointment.user_id !== req.userId) {
      return res.status(401).json({ error: 'you dont have permission' })
    }

    const dateWithSub = subHours(appointment.date, 2)
    // example appoinment time is 4:00pm
    // dateWithSub is 2:00pm, user can only cancel up to 2 pm

    if (isBefore(dateWithSub, new Date())) {
      return res.json({ error: 'Appointments can be cancelled 2 hours prior' })
    }
    appointment.cancelled_at = new Date()
    await appointment.save()

    Queue.add(CancellationMail.key, {
      appointment,
    })

    // await Mail.sendMail({
    //   to: `${appointment.provider.name} <${appointment.provider.email}>`,
    //   subject: "Cancelled Appointment",
    //   template: "cancellation",
    //   context: {
    //     provider: appointment.provider.name,
    //     user: appointment.user.name,
    //     date: format(appointment.date, "MMMM, dd , 'at' H:mm'h' ")
    //   }
    // });

    return res.json(appointment)
  }
}

export default new AppointmentController()
