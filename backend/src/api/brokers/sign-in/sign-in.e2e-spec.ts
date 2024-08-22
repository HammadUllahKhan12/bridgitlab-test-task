import * as request from 'supertest';
import { Broker } from 'src/models/brokers/broker.entity';
import {
  EMAIL_NOT_FOUND_ERROR,
  INVALID_EMAIL_ERROR,
  INVALID_PASSWORD_ERROR,
} from 'src/common/constants/response-messages';
import { INestApplication } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { getTestApp } from 'src/test.helper';

describe('/brokers/sign-in', () => {
  let app: INestApplication;
  let sequelize: Sequelize;

  beforeAll(async () => {
    app = await getTestApp();
    sequelize = app?.get<Sequelize>('SEQUELIZE');
  });

  describe('/brokers/sign-in (POST)', () => {
    it(INVALID_EMAIL_ERROR, async () => {
      const {
        body: { message },
      } = await request(app.getHttpServer()).post('/brokers/sign-in').send({
        email: 'not-an-email-address',
        password: 'password',
      });
      expect(message).toBe(INVALID_EMAIL_ERROR);
    });

    it(EMAIL_NOT_FOUND_ERROR, async () => {
      const {
        body: { message },
      } = await request(app.getHttpServer()).post('/brokers/sign-in').send({
        email: 'unknown@email.com',
        password: 'password',
      });
      expect(message).toBe(EMAIL_NOT_FOUND_ERROR);
    });

    it(INVALID_PASSWORD_ERROR, async () => {
      const broker = (await sequelize.models.Broker.findByPk(1)) as Broker;
      const {
        body: { message },
      } = await request(app.getHttpServer()).post('/brokers/sign-in').send({
        email: broker.email,
        password: 'invalid',
      });
      expect(message).toBe(INVALID_PASSWORD_ERROR);
    });

    it('should return jwt token', async () => {
      const broker = (await sequelize.models.Broker.findByPk(1)) as Broker;
      const {
        body: { token },
      } = await request(app.getHttpServer()).post('/brokers/sign-in').send({
        email: broker.email,
        password: 'password',
      });
      expect(token?.length).toBeGreaterThan(10);
    });
  });
});
