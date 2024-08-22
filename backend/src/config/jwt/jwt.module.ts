import { JwtModule as BaseJwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [BaseJwtModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
