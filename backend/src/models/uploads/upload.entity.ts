import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Application } from '../applications/application.entity';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Broker } from '../brokers/broker.entity';
import { Exclude } from 'class-transformer';
import { IsDate, IsInt, IsOptional } from 'class-validator';
import { Task } from '../tasks/task.entity';

/**
 * Data model for the Upload table which holds files the applicant
 * or broker has submitted as required during the loan application
 * approval process.
 */
@Table({
  tableName: 'uploads',
  timestamps: true,
})
export class Upload extends Model<Upload> {
  /**
   * The primary key for the row
   */
  @ApiProperty({
    description: 'The primary key for the row',
  })
  @Exclude()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  /**
   * A branded version of the id to distinguish between data types
   */
  @Column({
    type: DataType.VIRTUAL,
    get() {
      const id = this.getDataValue('id');
      return `U${id.toString().padStart(5, '0')}`;
    },
  })
  uploadId: string;
  /**
   * The application the task belongs to
   */
  @ApiProperty({ description: 'The application the task belongs to' })
  @BelongsTo(() => Application, 'applicationId')
  application: Application;
  /**
   * The application id
   */
  @ApiProperty({
    description: 'The application id',
    type: String,
    format: 'uuid',
  })
  @ForeignKey(() => Application)
  @Column({ type: DataType.INTEGER, field: 'application_id' })
  @IsInt()
  applicationId: number;
  /**
   * The broker performing the upload
   */
  @ApiProperty({ description: 'The broker performing the upload' })
  @BelongsTo(() => Broker, 'brokerId')
  broker?: Broker;
  /**
   * The broker id performing the upload
   */
  @ApiPropertyOptional({
    description: 'The broker id performing the upload',
    type: String,
    format: 'uuid',
  })
  @ForeignKey(() => Broker)
  @Column({ type: DataType.INTEGER, field: 'broker_id' })
  @IsInt()
  @IsOptional()
  brokerId?: number;
  /**
   * The file uploaded for the task
   */
  @ApiProperty({ description: 'The file uploaded for the task' })
  @Column({ type: DataType.BLOB })
  file: Buffer;
  /**
   * The task the upload is for
   */
  @ApiProperty({ description: 'The task the upload is for' })
  @BelongsTo(() => Task, 'taskId')
  task: Task;
  /**
   * The task id the upload is for
   */
  @ApiPropertyOptional({
    description: 'The task id the upload is for',
    type: String,
    format: 'uuid',
  })
  @ForeignKey(() => Task)
  @Column({ type: DataType.INTEGER, field: 'task_id' })
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
  @Column({
    field: 'created_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  @IsDate()
  createdAt: Date;
  /**
   * The date the row last modified
   */
  @ApiPropertyOptional({
    description: 'The date the row was last modified',
    type: Date,
    format: 'date-time',
  })
  @Exclude()
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
