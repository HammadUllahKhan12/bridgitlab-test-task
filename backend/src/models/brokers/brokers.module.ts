import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { brokerProviders } from './brokers.provider';

@Module({
  imports: [DatabaseModule],
  providers: brokerProviders,
  exports: [DatabaseModule],
})
export class BrokersDataModule {}
