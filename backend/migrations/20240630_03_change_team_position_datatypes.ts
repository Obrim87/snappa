import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('user_games', 'team');
    await queryInterface.removeColumn('user_games', 'position');

    await queryInterface.addColumn('user_games', 'team', {
      type: DataTypes.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn('user_games', 'position', {
      type: DataTypes.INTEGER,
      allowNull: false,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('user_games', 'team');
    await queryInterface.removeColumn('user_games', 'position');

    await queryInterface.addColumn('user_games', 'team', {
      type: DataTypes.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('user_games', 'position', {
      type: DataTypes.STRING,
      allowNull: false,
    });
  },
};
