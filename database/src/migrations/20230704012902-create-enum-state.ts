import { QueryInterface } from 'sequelize';

/**
 * Creates the state enum
 */
export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.sequelize.query(
    `CREATE TYPE "public"."enum_state" AS ENUM('act','nsw','nt','other','qld','sa','tas','vic','wa');`,
  );
}

/**
 * Removes the state enum
 */
export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.sequelize.query('DROP TYPE enum_state');
}
