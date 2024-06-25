import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn('user_stats', 'points_for', {
      type: DataTypes.INTEGER,
      allowNull: false,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn('user_stats', 'points_for', {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    });
  },
};
