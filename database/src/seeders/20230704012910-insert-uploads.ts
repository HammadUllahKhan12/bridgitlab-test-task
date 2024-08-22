import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  const insertData = [
    {
      id: 1,
      application_id: 1,
      broker_id: 1,
      task_id: 1,
      file: Buffer.from('file body'),
    },
    {
      id: 2,
      application_id: 1,
      broker_id: 1,
      task_id: 1,
      file: Buffer.from('file body'),
    },
    {
      id: 3,
      application_id: 1,
      broker_id: 1,
      task_id: 1,
      file: Buffer.from('file body'),
    },
    {
      id: 4,
      application_id: 2,
      broker_id: 1,
      task_id: 1,
      file: Buffer.from('file body'),
    },
    {
      id: 5,
      application_id: 2,
      broker_id: 1,
      task_id: 1,
      file: Buffer.from('file body'),
    },
    {
      id: 6,
      application_id: 2,
      broker_id: 1,
      task_id: 5,
      file: Buffer.from('file body'),
    },
    {
      id: 7,
      application_id: 3,
      broker_id: 2,
      task_id: 6,
      file: Buffer.from('file body'),
    },
  ];
  await queryInterface.bulkInsert('uploads', insertData);
  await queryInterface.sequelize.query('ALTER SEQUENCE uploads_id_seq RESTART WITH 8;');
}
