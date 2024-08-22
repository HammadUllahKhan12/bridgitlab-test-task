import { DataTypes, QueryInterface } from 'sequelize';

/**
 * Adds a "password_hash" column to the brokers table
 */
export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addColumn('brokers', 'password_hash', {
    type: DataTypes.STRING(70),
  });
}

/**
 * Removes the "password_hash" column from the brokers table
 */
export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeColumn('brokers', 'password_hash');
}
