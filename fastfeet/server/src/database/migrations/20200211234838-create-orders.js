"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("orders", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      recipient_id: {
        type: Sequelize.INTEGER,
        references: { model: "recipients", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false
      },
      signature_id: {
        type: Sequelize.INTEGER,
        references: { model: "files", key: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      },
      product: {
        type: Sequelize.STRING,
        allowNull: false
      },

      courier_id: {
        type: Sequelize.INTEGER,
        references: { model: "couriers", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false
      },
      cancelled_at: Sequelize.DATE,
      start_date: Sequelize.DATE,
      end_date: Sequelize.DATE,

      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("orders");
  }
};
