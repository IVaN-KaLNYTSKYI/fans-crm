import * as dotenv from 'dotenv';

dotenv.config();

export const AppConfig = {
  database: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    type: process.env.DB_TYPE,
    entities: ['dist/**/*.entity{.ts,.js}'],
    dialect: 'mysql',
    autoLoadModels: true,
    synchronize: true,
  },
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION,
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
  },
};
