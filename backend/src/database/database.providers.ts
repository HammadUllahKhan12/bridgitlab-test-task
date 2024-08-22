/* eslint-disable no-console */
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { models } from 'src/models/models.list';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelizeOptions: SequelizeOptions = {
        dialect: 'postgres',
        dialectOptions: {
          idle_in_transaction_session_timeout: 60000,
        },
        logging: process.env.DEBUG_SEQUELIZE ? console.log : false,
        pool: {
          max: 10,
          min: 0,
          idle: 1000,
          evict: 2000,
          acquire: 3000,
        },
        schema: process.env.DATABASE_SCHEMA || 'public',
        models,
      };
      return new Sequelize(process.env.DATABASE_URL, sequelizeOptions);
    },
  },
];
