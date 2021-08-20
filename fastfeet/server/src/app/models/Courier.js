import Sequelize, { Model } from 'sequelize'

class Courier extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING
      },
      {
        sequelize
      }
    )
    // this will be excuted before saving the document

    return this
  }
  // association  property to visuable  inside of postbird
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'file_id', as: 'avatar' })
  }
}

export default Courier
