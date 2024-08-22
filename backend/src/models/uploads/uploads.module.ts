import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { uploadProviders } from './uploads.provider';

@Module({
  imports: [DatabaseModule],
  providers: uploadProviders,
  exports: [DatabaseModule],
})
export class UploadDataModule {}
