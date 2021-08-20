import Order from '../models/Order'
import Recipient from '../models/Recipient'
import * as Yup from 'yup'
import Courier from '../models/Courier'
import User from '../models/User'
import Mail from '../../lib/Mail'
import { Op } from 'sequelize'
import Problem from '../models/Problems'

class OrderController {
  async index(req, res) {
    const { product } = req.query

    const orders = await Order.findAll({
      where: {
        cancelled_at: null,
        product: {
          [Op.iLike]: `%${product}%`,
        },
      },
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'street', 'state', 'city'],
        },
        {
          model: Courier,
          as: 'courier',
          attributes: ['id', 'name', 'email'],
        },
      ],
    })

    return res.json(orders)
  }
  async store(req, res) {
    // check user is admin
    const admin = await User.findByPk(req.userId)
    if (!admin) {
      return res.status(401).json({ error: 'Permission Denied' })
    }
    // check values are correct
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      courier_id: Yup.number().required(),
      recipient_id: Yup.number().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'check fileds' })
    }
    const { courier_id, recipient_id, product } = req.body

    const courier = await Courier.findByPk(courier_id)
    const recipient = await Recipient.findByPk(recipient_id)
    if (!courier) return res.json({ error: 'verify courier id' })
    if (!recipient) return res.json({ error: 'verify recipient id' })

    const order = await Order.create({
      courier_id,
      recipient_id,
      product,
    })

    await Mail.sendMail({
      to: `${courier.name} <${courier.email}>`,
      subject: 'New Order Assigned',
      template: 'confirmation',
      context: {
        courier: courier.name,
        recipient: recipient.name,
        product: product,
        date: new Date(),
      },
    })

    return res.json({
      recipient_id,
      courier_id,
      product,
    })
  }

  async delete(req, res) {
    const { id } = req.params
    const order = await Order.findByPk(id)
    await order.destroy()
    return res.json('Order deleted by admin')
  }

  async update(req, res) {
    const { id } = req.params
    console.log(req.body)
    // const { courier_id, recipient_id, product } = req.body
    const order = await Order.findByPk(id)
    await order.update(req.body)
    const _order = await Order.findByPk(id, {
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'street', 'state', 'city'],
        },
        {
          model: Courier,
          as: 'courier',
          attributes: ['id', 'name', 'email'],
        },
      ],
    })
    return res.json(_order)
  }
}

export default new OrderController()
