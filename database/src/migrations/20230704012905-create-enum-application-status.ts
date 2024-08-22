import { QueryInterface } from 'sequelize';

/**
 * Creates the application status enum
 */
export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.sequelize.query(
    `CREATE TYPE "public"."enum_application_status" AS ENUM('submitted', 'under_review', 'cancelled', 'funded', 'repaid');`,
  );
}

/**
 * Removes the application status enum
 */
export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.sequelize.query('DROP TYPE enum_application_status');
}
