import { Model, DataTypes } from 'sequelize';
import config from '../utils/db';

const { sequelize } = config;

class UserStat extends Model {
  declare id: number;
  declare totalTings: number;
  declare totalSinks: number;
  declare pointsFor: number;
  declare pointsAgainst: number;
  declare totalGames: number;
  declare totalWins: number;
  declare totalLosses: number;
}

UserStat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    totalTings: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalSinks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pointsFor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pointsAgainst: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalGames: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalWins: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalLosses: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'userStat',
  }
);

export default UserStat;
