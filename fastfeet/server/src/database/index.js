import Sequelize from "sequelize";
import User from "../app/models/User";
import databaseConfig from "../config/database";
import Courier from "../app/models/Courier";
import File from "../app/models/File";
import Recipient from "../app/models/Recipient";
import Order from "../app/models/Order";
import Problem from "../app/models/Problems";

// this is the the file that connects to the database
const models = [User, Recipient, Courier, File, Order, Problem];

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
    // run if there is associate property inside of model
    // .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
