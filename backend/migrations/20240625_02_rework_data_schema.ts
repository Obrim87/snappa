import { DataTypes } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('games', 'team1_player1');
    await queryInterface.removeColumn('games', 'team1_player2');
    await queryInterface.removeColumn('games', 'team2_player1');
    await queryInterface.removeColumn('games', 'team2_player2');

    await queryInterface.addColumn('user_games', 'team', {
      type: DataTypes.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('user_games', 'position', {
      type: DataTypes.STRING,
      allowNull: false,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('games', 'team1_player1', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    });

    await queryInterface.addColumn('games', 'team1_player2', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    });

    await queryInterface.addColumn('games', 'team2_player1', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    });

    await queryInterface.addColumn('games', 'team2_player2', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    });

    await queryInterface.removeColumn('user_games', 'team');
    await queryInterface.removeColumn('user_games', 'position');
  },
};
