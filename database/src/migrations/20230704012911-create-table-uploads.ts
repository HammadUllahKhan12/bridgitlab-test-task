import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

/**
 * Adds a "password_hash" column to the brokers table
 */
export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('uploads', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    application_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'applications',
        key: 'id',
      },
    },
    broker_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'brokers',
        key: 'id',
      },
    },
    file: DataTypes.BLOB,
    task_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tasks',
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('now()'),
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  });
}

/**
 * Removes the "password_hash" column from the brokers table
 */
export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('uploads');
}
