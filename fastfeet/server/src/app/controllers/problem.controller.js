import Problem from '../models/Problems'
import * as Yup from 'yup'
import Order from '../models/Order'
import Courier from '../models/Courier'

class ProblemController {
  async index(req, res) {
    const problems = await Problem.findAll()
    return res.json(problems)
  }

  async delete(req, res) {
    const { id } = req.params
    const problem = await Problem.findByPk(id, {
      include: [
        {
          model: Order,
          as: 'order',
          attributes: ['id', 'courier_id'],
        },
      ],
    })

    const courier = await Courier.findByPk(problem.order.courier_id)
    const order = await Order.findByPk(problem.order_id)
    await problem.destroy()
    await order.destroy()

    await Mail.sendMail({
      to: `${courier.name} <${courier.email}>`,
      subject: 'Cancelled Order By Admin',
      template: 'cancellation',
      context: {
        courier: courier.name,
        id: problem.order_id,
        date: new Date(),
      },
    })

    return res.json({ success: 'order was succesfully deleted' })
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      severity: Yup.number().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Descript issue' })
    }
    const order = await Order.findByPk(req.params.id)
    if (!order) return res.json({ error: 'order not found' })
    if (!order.start_date) return res.json({ error: 'order not picked up' })
    const { description, severity } = req.body

    const problem = await Problem.create({
      description,
      order_id: req.params.id,
      severity,
    })
    return res.json(problem)
  }
}

export default new ProblemController()
