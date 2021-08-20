import * as Yup from 'yup'
import User from '../models/User'
import File from '../models/File'

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6)
    })

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'validation fails' })

    const userExist = await User.findOne({ where: { email: req.body.email } })
    if (userExist) return res.status(400).json({ error: 'User already exists' })
    const user = await User.create(req.body)
    return res.json(user)
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string(),
      password: Yup.string()
        .min(6)
        // validates only when oldpassword is provided
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      )
    })
    // MINOR CHANGES

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'validation fails' })

    const { email, oldPassword } = req.body
    // user find by primary key
    const user = await User.findByPk(req.userId)
    // check if user trying to change their email
    if (email && email !== user.email) {
      // find new user by new email
      const userExists = await User.findOne({ where: { email } })
      // if new email is already registered
      if (userExists)
        return res.status(401).json({ error: 'User already exist' })
    }
    // check old password is corret
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' })
    }
    await user.update(req.body)
    const { id, name, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          // avatar is the as: for referencing
          as: 'avatar',
          attributes: ['id', 'path', 'url']
        }
      ]
    })

    return res.json({
      avatar,
      id,
      name,
      email
    })
  }
}

export default new UserController()
