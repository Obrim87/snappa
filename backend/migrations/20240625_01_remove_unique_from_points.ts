import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.removeConstraint(
      'user_stats',
      'user_stats_points_for_key'
    );
    await queryInterface.removeConstraint(
      'user_stats',
      'user_stats_points_for_key1'
    );
    await queryInterface.removeConstraint(
      'user_stats',
      'user_stats_points_for_key2'
    );
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn('user_stats', 'points_for', {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    });
  },
};
