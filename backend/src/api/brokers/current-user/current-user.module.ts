import * as currentUserController from './current-user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  controllers: [currentUserController.BrokerCurrentUserController],
})
export class BrokerCurrentUserModule {}
