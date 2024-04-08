import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import envSetup from '../dotenv.setup';

const Config: DataSourceOptions = {
  type: 'mysql',
  host: envSetup.getEnviroment('DB_HOST'),
  port: envSetup.getNumberEnv('DB_PORT'),
  username: envSetup.getEnviroment('DB_USER'),
  password: envSetup.getEnviroment('DB_PASSWORD'),
  database: envSetup.getEnviroment('DB_DATABASE'),
  entities: [__dirname + '/../../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../../migrations/*{.ts,.js}'],
  synchronize: envSetup.getBoolEnv('DB_SYNCHRONIZE'),
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

const AppDataSource: DataSource = new DataSource(Config);

const dbConnect = async () => {
  try {
    const dataSource = await AppDataSource.initialize();
    return dataSource
  } catch (error) {
    console.log(error);
    dbConnect()
  }
};

export default dbConnect;
