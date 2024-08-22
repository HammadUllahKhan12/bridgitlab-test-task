import { QueryInterface } from 'sequelize';

/**
 * Creates the task status enum
 */
export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.sequelize.query(
    `CREATE TYPE "public"."enum_task_status" AS ENUM('pending', 'cancelled', 'completed', 'review_required');`,
  );
}

/**
 * Removes the task status enum
 */
export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.sequelize.query('DROP TYPE enum_task_status');
}
