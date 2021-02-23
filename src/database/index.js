import Sequelize from 'sequelize';
import ProductsDogs from '../app/models/ProductsDogs';
import ProductsCats from '../app/models/ProductsCats';
import File from '../app/models/File';
import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [User, ProductsDogs, File, ProductsCats];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}
export default new Database();
