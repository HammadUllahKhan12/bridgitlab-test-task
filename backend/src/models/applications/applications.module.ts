import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { applicationProviders } from './applications.provider';

@Module({
  imports: [DatabaseModule],
  providers: applicationProviders,
  exports: [DatabaseModule],
})
export class ApplicationsDataModule {}
