import * as bcrypt from 'bcryptjs';
import { QueryInterface } from 'sequelize';
import { faker } from '@faker-js/faker';

export async function up(queryInterface: QueryInterface): Promise<void> {
  const insertData = [createBroker(1), createBroker(2), createBroker(3)];
  await queryInterface.bulkInsert('brokers', insertData);
  await queryInterface.sequelize.query('ALTER SEQUENCE brokers_id_seq RESTART WITH 4;');
}

function createBroker(id: number): Record<string, string | number> {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = `broker${id}@tech-test.bridgit.com.au`;
  const mobilePhoneNumber = faker.phone.number(`040000000${id}`);
  return {
    id,
    first_name: firstName,
    last_name: lastName,
    broker_fee: 0.0038,
    broker_status: 'active',
    address_line_1: '123 Some St',
    address_city: 'Sydney',
    address_state: 'nsw',
    address_post_code: '2000',
    email,
    mobile_phone_number: mobilePhoneNumber,
    password_hash: bcrypt.hashSync('password', 10),
  };
}
