import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN
      },
      {
        sequelize
      }
    )
    // this will be excuted before saving the document
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8)
      }
    })
    return this
  }
  // association  property to visuable  inside of postbird
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'file_id', as: 'avatar' })
  }

  // checks passwords match, used in session.controller
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash)
  }
}

export default User
