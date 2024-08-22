import { QueryInterface } from 'sequelize';
import { faker } from '@faker-js/faker';

export async function up(queryInterface: QueryInterface): Promise<void> {
  const insertData = [
    createApplication(1, 1, '5 Blazey Rd, Croydon South VIC 3136', '2451 Kersbrook Rd, SA 5231', 'submitted'),
    createApplication(2, 1, '3 Woolwich Rd, Hunters Hill NSW 2110', '3 Mason Cl, Healesville VIC 3777', 'submitted'),
    createApplication(3, 1, '36 Teneriffe Dr, QLD 4005', '425 Riversdale Rd, Hawthorn East VIC 3123', 'cancelled'),
  ];
  await queryInterface.bulkInsert('applications', insertData);
  await queryInterface.sequelize.query('ALTER SEQUENCE applications_id_seq RESTART WITH 4;');
}

function createApplication(
  id: number,
  brokerId: number,
  address: string,
  address2: string,
  status: string,
): Record<string, string | number> {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName, provider: 'tech-test.bridgit.com.au' });
  const mobilePhoneNumber = faker.phone.number('04########');
  return {
    id,
    broker_id: brokerId,
    applicant_name: `${firstName} ${lastName}`,
    applicant_email: email,
    applicant_mobile_phone_number: mobilePhoneNumber,
    applicant_address: address,
    annual_income_before_tax: 110000,
    incoming_address: address2,
    incoming_deposit: 180000,
    incoming_price: 850000,
    incoming_stamp_duty: 32000,
    loan_amount: 800000,
    loan_duration: 4,
    monthly_expenses: 3250,
    outgoing_address: address,
    outgoing_mortgage: 75000,
    outgoing_valuation: 1250000,
    savings_contribution: 12000,
    status: status,
  };
}
