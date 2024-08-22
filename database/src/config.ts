/* eslint-disable no-console */
import * as dotenv from 'dotenv';
dotenv.config();

const database = {
  url: process.env.DATABASE_URL,
  dialect: 'postgres',
  schema: 'public',
  logging: process.env.DEBUG_SEQUELIZE ? console.log : false,
};

module.exports = {
  dev: database,
  uat: database,
  prod: database,
};
