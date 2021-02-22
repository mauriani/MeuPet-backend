module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products_dogs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name_product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cod_product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description_product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price_product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category_product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount_product: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      size_product: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('products_dogs');
  },
};
