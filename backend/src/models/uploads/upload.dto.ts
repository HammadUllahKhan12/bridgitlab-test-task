import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsDataURI, IsDate, IsInt, IsOptional } from 'class-validator';

/**
 * Data model for the Upload table which holds files the applicant
 * or broker has submitted as required during the loan application
 * approval process.
 */
export class UploadDto {
  /**
   * The primary key for the row
   */
  @ApiProperty({
    description: 'The primary key for the row',
  })
  @Exclude()
  @IsOptional()
  id?: number;
  /**
   * The application id
   */
  @ApiProperty({
    description: 'The application id',
    type: String,
    format: 'uuid',
  })
  @IsInt()
  @IsOptional()
  applicationId?: number;
  /**
   * The broker id performing the upload
   */
  @ApiPropertyOptional({
    description: 'The broker id performing the upload',
    type: String,
    format: 'uuid',
  })
  @IsInt()
  @IsOptional()
  brokerId?: number;
  /**
   * The file uploaded for the task
   */
  @ApiProperty({ description: 'The file uploaded for the task' })
  @IsDataURI()
  @IsOptional()
  file?: Buffer;
  /**
   * The task id the upload is for
   */
  @ApiPropertyOptional({
    description: 'The task id the upload is for',
    type: String,
    format: 'uuid',
  })
  @IsInt()
  @IsOptional()
  taskId?: number;
  /**
   * The date the row was created
   */
  @ApiProperty({
    description: 'The date the row was created',
    type: Date,
    format: 'date-time',
  })
  @Exclude()
  @IsDate()
  @IsOptional()
  createdAt?: Date;
  /**
   * The date the row last modified
   */
  @ApiPropertyOptional({
    description: 'The date the row was last modified',
    type: Date,
    format: 'date-time',
  })
  @Exclude()
  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
