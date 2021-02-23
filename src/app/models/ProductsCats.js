import Sequelize, { Model } from 'sequelize';

class ProductsCats extends Model {
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

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'product_file_id',
      as: 'product_image',
    });
  }
}

export default ProductsCats;
