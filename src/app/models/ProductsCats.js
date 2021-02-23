import Sequelize, { Model } from 'sequelize';

class ProductsDogs extends Model {
  static init(sequelize) {
    super.init(
      {
        cod_product: Sequelize.STRING,
        name_product: Sequelize.STRING,
        description_product: Sequelize.STRING,
        price_product: Sequelize.STRING,
        category_product: Sequelize.STRING,
        amount_product: Sequelize.INTEGER,
        size_product: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default ProductsDogs;
