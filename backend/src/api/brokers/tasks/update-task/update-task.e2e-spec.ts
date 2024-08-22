import * as request from 'supertest';
import {
  AUTH_ERROR,
  INVALID_JWT_TOKEN_ERROR,
  INVALID_TASK_ID_ERROR,
  INVALID_USER_ERROR,
  TASK_SUBMITTED_ERROR,
  TASK_UPLOADS_EXCEEDED_ERROR,
} from 'src/common/constants/response-messages';
import { Broker } from 'src/models/brokers/broker.entity';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtService } from 'src/config/jwt/jwt.service';
import { Sequelize } from 'sequelize';
import { Task } from 'src/models/tasks/task.entity';
import { TaskStatus } from 'src/enums/task-status.enum';
import { getTestApp } from 'src/test.helper';
const file = Buffer.from('file contents').toString('base64');

describe('/brokers/tasks/update-task', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let sequelize: Sequelize;

  beforeAll(async () => {
    app = await getTestApp();
    sequelize = app?.get<Sequelize>('SEQUELIZE');
    jwtService = app.get<JwtService>(JwtService);
    // reset "task 3" for upload
    await sequelize.models.Upload.destroy({
      where: {
        taskId: 3,
      },
    });
    const task3 = await sequelize.models.Task.findByPk(3);
    (<Task>task3).status = TaskStatus.Pending;
    task3.save();
  });

  describe('/brokers/tasks/update-task (PATCH)', () => {
    it('should reject no token', async () => {
      const {
        status,
        body: { message },
      } = await request(app.getHttpServer()).patch('/brokers/tasks/update-task?taskId=1').send({
        file,
        complete: true,
      });
      expect(status).toBe(HttpStatus.UNAUTHORIZED);
      expect(message).toBe(AUTH_ERROR);
    });

    it('should reject invalid token', async () => {
      const {
        status,
        body: { message },
      } = await request(app.getHttpServer())
        .patch('/brokers/tasks/update-task?taskId=1')
        .send({
          file,
          complete: true,
        })
        .set('authorization', `Bearer invalid-token`);
      expect(status).toBe(HttpStatus.BAD_REQUEST);
      expect(message).toBe(INVALID_JWT_TOKEN_ERROR);
    });

    it('should reject invalid task id', async () => {
      const broker = (await sequelize.models.Broker.findByPk(1)) as Broker;
      const token = jwtService.generateBrokerToken(broker);
      const {
        status,
        body: { message },
      } = await request(app.getHttpServer())
        .patch('/brokers/tasks/update-task?taskId=invalid')
        .send({
          file,
          complete: true,
        })
        .set('authorization', `Bearer ${token}`);
      expect(status).toBe(HttpStatus.BAD_REQUEST);
      expect(message).toBe(INVALID_TASK_ID_ERROR);
    });

    it('should reject task not associated with broker', async () => {
      const broker = (await sequelize.models.Broker.findByPk(1)) as Broker;
      const token = jwtService.generateBrokerToken(broker);
      const {
        status,
        body: { message },
      } = await request(app.getHttpServer())
        .patch('/brokers/tasks/update-task?taskId=7')
        .send({
          file,
          complete: true,
        })
        .set('authorization', `Bearer ${token}`);
      expect(status).toBe(HttpStatus.BAD_REQUEST);
      expect(message).toBe(INVALID_USER_ERROR);
    });

    it('should reject task that is not pending', async () => {
      const broker = (await sequelize.models.Broker.findByPk(1)) as Broker;
      const token = jwtService.generateBrokerToken(broker);
      const {
        status,
        body: { message },
      } = await request(app.getHttpServer())
        .patch('/brokers/tasks/update-task?taskId=2')
        .send({
          file,
          complete: true,
        })
        .set('authorization', `Bearer ${token}`);
      expect(status).toBe(HttpStatus.BAD_REQUEST);
      expect(message).toBe(TASK_SUBMITTED_ERROR);
    });

    it('should reject task with too many uploads', async () => {
      const broker = (await sequelize.models.Broker.findByPk(1)) as Broker;
      const token = jwtService.generateBrokerToken(broker);
      const {
        status,
        body: { message },
      } = await request(app.getHttpServer())
        .patch('/brokers/tasks/update-task?taskId=1')
        .send({
          file,
          complete: true,
        })
        .set('authorization', `Bearer ${token}`);
      expect(status).toBe(HttpStatus.BAD_REQUEST);
      expect(message).toBe(TASK_UPLOADS_EXCEEDED_ERROR);
    });

    it('should upload file and leave task pending', async () => {
      const broker = (await sequelize.models.Broker.findByPk(1)) as Broker;
      const token = jwtService.generateBrokerToken(broker);
      const {
        status,
        body: { success },
      } = await request(app.getHttpServer())
        .patch('/brokers/tasks/update-task?taskId=3')
        .send({
          file,
          complete: false,
        })
        .set('authorization', `Bearer ${token}`);
      expect(status).toBe(HttpStatus.OK);
      expect(success).toBe(true);
      const task = (await sequelize.models.Task.findByPk(3)) as Task;
      expect(task.status).toBe(TaskStatus.Pending);
    });

    it('should upload file and complete task', async () => {
      const broker = (await sequelize.models.Broker.findByPk(1)) as Broker;
      const token = jwtService.generateBrokerToken(broker);
      const {
        status,
        body: { success },
      } = await request(app.getHttpServer())
        .patch('/brokers/tasks/update-task?taskId=3')
        .send({
          file,
          complete: true,
        })
        .set('authorization', `Bearer ${token}`);
      expect(status).toBe(HttpStatus.OK);
      expect(success).toBe(true);
      const task = (await sequelize.models.Task.findByPk(3)) as Task;
      expect(task.status).toBe(TaskStatus.ReviewRequired);
    });
  });
});
