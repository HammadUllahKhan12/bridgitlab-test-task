import { APIModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from './config/jwt/jwt.module';
import { Module, NestModule } from '@nestjs/common';

/**
 * If the application starts in production ENV files are ignored
 */
const ignoreEnvFile = process.env.NODE_ENV === 'prod';

/**
 * Path to the ENV file if the application starts in dev or test
 */
const envFilePath = process.env.NODE_ENV !== 'prod' ? '.env' : undefined;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [envFilePath],
      ignoreEnvFile,
      isGlobal: true,
      expandVariables: true,
    }),
    DatabaseModule,
    APIModule,
    {
      module: JwtModule,
      global: true,
    },
  ],
})
export class AppModule implements NestModule {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  configure() {}
}
