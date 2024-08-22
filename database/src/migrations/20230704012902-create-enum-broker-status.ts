import { QueryInterface } from 'sequelize';

/**
 * Creates the broker status enum
 */
export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.sequelize.query(
    `CREATE TYPE "public"."enum_broker_status" AS ENUM('active', 'inactive', 'review_required', 'rejected');`,
  );
}

/**
 * Removes the broker status enum
 */
export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.sequelize.query('DROP TYPE enum_broker_status');
}
