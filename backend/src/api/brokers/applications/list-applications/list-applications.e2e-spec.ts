import * as request from 'supertest';
import { AUTH_ERROR, INVALID_JWT_TOKEN_ERROR } from 'src/common/constants/response-messages';
import { Broker } from 'src/models/brokers/broker.entity';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtService } from 'src/config/jwt/jwt.service';
import { Sequelize } from 'sequelize';
import { getTestApp } from 'src/test.helper';

describe('/brokers/applications/list-applications', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let sequelize: Sequelize;

  beforeAll(async () => {
    app = await getTestApp();
    sequelize = app?.get<Sequelize>('SEQUELIZE');
    jwtService = app.get<JwtService>(JwtService);
  });

  describe('/brokers/applications/list-applications (GET)', () => {
    it('should reject no token', async () => {
      const {
        status,
        body: { message },
      } = await request(app.getHttpServer()).get('/brokers/applications/list-applications');
      expect(status).toBe(HttpStatus.UNAUTHORIZED);
      expect(message).toBe(AUTH_ERROR);
    });

    it('should reject invalid token', async () => {
      const {
        status,
        body: { message },
      } = await request(app.getHttpServer())
        .get('/brokers/applications/list-applications')
        .set('authorization', `Bearer invalid-token`);
      expect(status).toBe(HttpStatus.BAD_REQUEST);
      expect(message).toBe(INVALID_JWT_TOKEN_ERROR);
    });

    it('should list applications', async () => {
      const broker = (await sequelize.models.Broker.findByPk(1)) as Broker;
      const token = jwtService.generateBrokerToken(broker);
      const {
        body: { applications },
      } = await request(app.getHttpServer())
        .get('/brokers/applications/list-applications')
        .set('authorization', `Bearer ${token}`);
      expect(applications?.length).toBe(2);
    });
  });
});
