import Sequelize, { Model } from "sequelize";

class Problem extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        severity: Sequelize.VIRTUAL
      },
      {
        sequelize
      }
    );
    return this;
  }
  static associate(models) {
    // association to Order
    this.belongsTo(models.Order, {
      foreignKey: "order_id",
      as: "order"
    });
  }
}

export default Problem;
