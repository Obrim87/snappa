import { Model, DataTypes } from 'sequelize';
import config from '../utils/db';

const { sequelize } = config;

class UserGame extends Model {}

UserGame.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'games', key: 'id' },
    },
    team: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tings: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sinks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    for: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    against: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    win: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'userGame',
  }
);

export default UserGame;

// insert some data into tables
// suspect that games may not working how its connected to users
