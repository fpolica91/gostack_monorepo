import User from '../models/User'
import File from '../models/File'

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      // properties of User I want
      attributes: ['id', 'name', 'email', 'file_id'],
      include: [
        {
          // name of the file
          model: File,
          as: 'avatar',
          // properties of file I want
          attributes: ['name', 'path', 'url'],
        },
      ],
    })
    return res.json(providers)
  }
}

export default new ProviderController()
