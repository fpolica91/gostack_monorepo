import Sequelize from "sequelize";
import User from "../app/models/User";
import File from "../app/models/File";
import mongoose from "mongoose";
import Appointment from "../app/models/Appointment";
import databaseConfig from "../config/database";

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      // THIS MAP EXECUTES IF THERE  ARE MODEL.ASSOCIATE IN  THE MODEL
      .map(model => model.associate && model.associate(this.connection.models));
  }
  // intializes mongodb
  mongo() {
    this.mongoConnection = mongoose.connect(
      process.env.MONGO_URL,
      // "mongodb://localhost:27017/gobarber",
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true
      }
    );
  }
}

export default new Database();
