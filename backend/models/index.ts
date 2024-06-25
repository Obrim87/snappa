import User from './user';
import Game from './game';
import UserStat from './userStat';
import UserGame from './userGame';

// 1-to-1
User.hasOne(UserStat);
UserStat.belongsTo(User);

// super many-to-many
User.belongsToMany(Game, { through: UserGame });
Game.belongsToMany(User, { through: UserGame });
User.hasMany(UserGame);
UserGame.belongsTo(User);
Game.hasMany(UserGame);
UserGame.belongsTo(Game);

export default { User, Game, UserStat, UserGame };
