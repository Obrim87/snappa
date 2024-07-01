import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import configs from './configs';

const sequelize = new Sequelize(configs.DATABASE_URL, {
  dialect: 'postgres',
});

const migratorConfig = {
  migrations: {
    glob: 'migrations/*.ts',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

// starts the migration
const runMigrations = async () => {
  if (process.env.NODE_ENV === 'test') return;
  const migrator = new Umzug(migratorConfig);
  const migrations = await migrator.up();

  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

// used to rollback migration (down)
const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migratorConfig);
  await migrator.down();
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log('Connected to the database');
  } catch (err) {
    console.log('failed to connect to the database');
    return process.exit(1);
  }

  return null;
};
export default { connectToDatabase, sequelize, rollbackMigration };
