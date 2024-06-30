import { Model, DataTypes, InferAttributes } from 'sequelize';
import config from '../utils/db';

const { sequelize } = config;

class Game extends Model<InferAttributes<Game>> {
  declare id: number;
  declare date: string;
  declare location: string | null;
  declare team1Score: number;
  declare team2Score: number;
  declare winningTeam: string;
}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
    },
    team1Score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    team2Score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    winningTeam: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'game',
  }
);

export default Game;
