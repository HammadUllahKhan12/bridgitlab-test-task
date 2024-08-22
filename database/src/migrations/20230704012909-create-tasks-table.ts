import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

/**
 * Creates the task table which contains things the applicants or brokers
 * must complete before their loan application can be finalized.
 */
export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('tasks', {
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
    assigned_to: 'enum_user_type',
    assigned_to_broker_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'brokers',
        key: 'id',
      },
    },
    completed_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    title: DataTypes.STRING(255),
    status: {
      type: 'enum_task_status',
      allowNull: false,
      defaultValue: 'pending',
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
 * Removes the task table
 */
export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('tasks');
}
