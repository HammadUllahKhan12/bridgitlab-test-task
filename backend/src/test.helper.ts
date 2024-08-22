import { AppModule } from './app.module';
import { DtoValidationPipe } from './common/validation/dto-validation.pipe';
import { ErrorFilter } from './common/exceptions/error.filter';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { Test } from '@nestjs/testing';

let app: INestApplication;
let sequelize: Sequelize;

beforeAll(async () => {
  const testingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = testingModule.createNestApplication();
  app.useGlobalFilters(new ErrorFilter(), new HttpExceptionFilter());
  app.useGlobalPipes(new DtoValidationPipe());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  sequelize = app?.get<Sequelize>('SEQUELIZE');
  await app.init();
});

afterAll(async () => {
  await sequelize?.close();
});

export function getTestApp() {
  return app;
}
