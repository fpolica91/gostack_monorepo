import * as Yup from 'yup'
import User from '../models/User'
import Courier from '../models/Courier'
import File from '../models/File'
import { Op } from 'sequelize'

class CourierController {
  // create
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      file_id: Yup.number(),
    })

    const isAdmin = await User.findByPk(req.userId)
    const { email, name } = req.body

    // IF ADMIN IS LOGGED IN
    if (!isAdmin)
      return res.status(401).json({ error: 'only admins can create couriers' })

    // IF SCHEMA VALIDATION FAILS
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ err: 'Validation error' })
    }
    const courierExists = await Courier.findOne({
      where: { email },
    })

    if (courierExists) {
      return res
        .status(401)
        .json({ error: 'courier already registered with provided email' })
    }

    try {
      const courier = await Courier.create(req.body)
      return res.json(courier)
    } catch (err) {
      throw new Error(err)
    }
  }
  // update
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      file_id: Yup.number(),
    })

    const { email, file_id } = req.body

    const admin = await User.findByPk(req.userId)
    if (!admin) {
      return res.status(401).json({ error: 'only admins can make changes' })
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ err: 'Validation error' })
    }

    const courier = await Courier.findByPk(req.params.id)

    if (!courier) {
      return res.status(401).json({ error: 'Courier does not exist' })
    }

    if (email && email !== courier.email) {
      const emailExist = await Courier.findOne({ where: { email } })
      if (emailExist) {
        return res.status(401).json({ error: 'email already in use' })
      }
    }
    if (file_id && file_id !== courier.file_id) {
      const fileInUse = await Courier.findOne({ where: { file_id } })
      if (fileInUse) {
        return res.status(401).json({ error: 'file already in use' })
      }
    }

    const { id, name } = await courier.update(req.body)
    return res.json({
      id,
      email,
      name,
    })
  }
  // DELETE
  async delete(req, res) {
    const admin = await User.findByPk(req.userId)
    if (!admin) {
      return res.status(401).json({ error: 'only admins can delete couriers' })
    }
    const courier = await Courier.findByPk(req.params.id)
    if (!courier) {
      return res.status(401).json({ error: 'No courier found' })
    }
    await courier.destroy()
    return res.status(200).json({ succes: `${courier.name} has been deleted` })
  }
  // added  index
  async index(req, res) {
    const { name } = req.query
    const couriers = await Courier.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
      attributes: ['id', 'name', 'email'],
      order: ['id'],
    })
    return res.json(couriers)
  }
}

export default new CourierController()
