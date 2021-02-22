import Sequelize from 'sequelize';
import ProductsDogs from '../app/models/ProductsDogs';
import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [User, ProductsDogs];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
  }
}
export default new Database();
