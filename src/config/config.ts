// import * as dotenv from 'dotenv';
import { join } from 'path';
// dotenv.config();

export default () => ({
  app: {
    port: process.env.APP_PORT || 5000,
    name: process.env.APP_NAME,
    node_env: process.env.NODE_ENV,
    api_version: process.env.API_VERSION,
    cors_allowed: process.env.CORS_ALLOWED_DOMAIN,
  },
  database: {
    type: process.env.TYPEORM_CONNECTION,
    name: process.env.TYPEORM_DATABASE,
    host: process.env.TYPEORM_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrationsRun: false,
    migrations: [join(__dirname, '../migration/**/*{.ts,.js}')],
    migrationTableName: 'migrations',
    cli: {
      migrationsDir: 'src/migration',
      entitiesDir: __dirname + '/../**/**/*.entity{.ts,.js}',
    },
    synchronize: true,
  },
});
