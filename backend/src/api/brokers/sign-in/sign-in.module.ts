import { BrokerSignInController } from './sign-in.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from 'src/config/jwt/jwt.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, JwtModule],
  controllers: [BrokerSignInController],
})
export class BrokerSignInModule {}
