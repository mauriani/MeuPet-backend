module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('products_dogs', 'product_file_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', Key: 'id' },
      onUpdate: 'CASCADE', // Caso ele seja alterado
      onDelete: 'SET NULL', // caso seja deletado
      allowNull: true,
    });
  },

  down: (queryInterface) =>
    queryInterface.removeColumn('products_dogs', 'product_file_id'),
};
