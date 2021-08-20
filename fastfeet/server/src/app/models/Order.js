import Sequelize, { Model } from "sequelize";

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        cancelled_at: Sequelize.DATE
      },
      {
        sequelize
      }
    );
    return this;
  }
  static associate(models) {
    // association to  recipient
    this.belongsTo(models.Recipient, {
      foreignKey: "recipient_id",
      as: "recipient"
    });
    // association to delivery
    this.belongsTo(models.Courier, { foreignKey: "courier_id", as: "courier" });
    // signature of the recipient
    this.belongsTo(models.File, {
      foreignKey: "signature_id",
      as: "signature"
    });
  }
}

export default Order;
