import { DataTypes, QueryInterface, Sequelize } from 'sequelize';

/**
 * Creates the loan applications table hodling the information for a loan
 */
export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('applications', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    broker_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'brokers',
        key: 'id',
      },
    },
    applicant_name: DataTypes.STRING(50),
    applicant_email: DataTypes.STRING(255),
    applicant_mobile_phone_number: DataTypes.STRING(20),
    applicant_address: DataTypes.STRING(255),
    annual_income_before_tax: DataTypes.DECIMAL(10, 2),
    incoming_address: DataTypes.STRING(50),
    incoming_deposit: DataTypes.DECIMAL(10, 2),
    incoming_price: DataTypes.DECIMAL(10, 2),
    incoming_stamp_duty: DataTypes.DECIMAL(10, 2),
    loan_amount: DataTypes.DECIMAL(10, 2),
    loan_duration: DataTypes.INTEGER,
    monthly_expenses: DataTypes.DECIMAL(10, 2),
    outgoing_address: DataTypes.STRING(50),
    outgoing_mortgage: DataTypes.DECIMAL(10, 2),
    outgoing_valuation: DataTypes.DECIMAL(10, 2),
    savings_contribution: DataTypes.DECIMAL(10, 2),
    status: 'enum_application_status',
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
 * Removes the loan applications table
 */
export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('applications');
}
