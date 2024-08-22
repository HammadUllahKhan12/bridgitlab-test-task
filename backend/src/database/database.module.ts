import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { modelProviders } from 'src/models/models.provider';

@Module({
  providers: [...databaseProviders, ...modelProviders],
  exports: [...databaseProviders, ...modelProviders],
})
export class DatabaseModule {}
