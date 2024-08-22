import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

/**
 * Creates the broker table which contains their personal information
 */
export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('brokers', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    australian_credit_license: DataTypes.STRING(20),
    address_line_1: DataTypes.STRING(50),
    address_line_2: DataTypes.STRING(50),
    address_city: DataTypes.STRING(50),
    address_state: 'enum_state',
    address_post_code: DataTypes.STRING(4),
    broker_fee: DataTypes.DECIMAL(5),
    broker_firm: DataTypes.DECIMAL(50),
    broker_status: 'enum_broker_status',
    credit_representative_number: DataTypes.STRING(20),
    date_of_birth: DataTypes.DATEONLY,
    email: DataTypes.STRING(255),
    first_name: DataTypes.STRING(50),
    last_name: DataTypes.STRING(50),
    mobile_phone_number: DataTypes.STRING(10),
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
 * Removes the broker table
 */
export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('brokers');
}
