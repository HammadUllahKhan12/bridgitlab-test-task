/* eslint-disable no-console */
import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config();

// reset the database
(async (): Promise<void> => {
  const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres' });
  if ((process.env.DATABASE_URL || '').indexOf('amazon') > -1) {
    throw new Error('Cannot reset databases hosted on amazon');
  }
  await sequelize.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
})();
