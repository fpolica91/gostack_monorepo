"use strict";
// THIS IS THE RELATIONSHIP MODEL,LINKS THE USERS TO THE FILE
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("couriers", "file_id", {
      type: Sequelize.INTEGER,
      references: { model: "files", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("couriers", "file_id");
  }
};
