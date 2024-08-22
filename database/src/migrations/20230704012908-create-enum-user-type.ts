import { QueryInterface } from 'sequelize';

/**
 * Creates the task status enum
 */
export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.sequelize.query(`CREATE TYPE "public"."enum_user_type" AS ENUM('applicant', 'broker');`);
}

/**
 * Removes the task status enum
 */
export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.sequelize.query('DROP TYPE enum_user_type');
}
