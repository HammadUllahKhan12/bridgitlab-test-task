import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Application } from '../applications/application.entity';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Broker } from '../brokers/broker.entity';
import { Exclude } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from 'src/enums/task-status.enum';
import { Upload } from '../uploads/upload.entity';
import { UserType } from 'src/enums/user-type.enum';

/**
 * Data model for the tasks table which holds things the
 * applicant or broker must do to continue a loan application
 * such as uploading a supporting document like their ID
 */
@Table({
  tableName: 'tasks',
  timestamps: true,
})
export class Task extends Model<Task> {
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
      return `T${id.toString().padStart(5, '0')}`;
    },
  })
  taskId: string;
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
   * The type of user the task is assigned to
   */
  @ApiProperty({ description: 'The type of user the task is assigned to', enum: UserType, enumName: 'UserType' })
  @Column({
    type: 'enum_user_type',
    field: 'assigned_to',
  })
  @IsEnum(UserType)
  assignedTo: UserType;
  /**
   * The broker the task is assigned to
   */
  @ApiProperty({ description: 'The broker the task is assigned to' })
  @BelongsTo(() => Broker, 'assignedToBrokerId')
  assignedToBroker: Broker;
  /**
   * The assigned broker id
   */
  @ApiPropertyOptional({
    description: 'The assigned broker id',
    type: String,
    format: 'uuid',
  })
  @ForeignKey(() => Broker)
  @Column({ type: DataType.INTEGER, field: 'assigned_to_broker_id' })
  @IsInt()
  @IsOptional()
  assignedToBrokerId?: number;
  /**
   * The date the task was completed
   */
  @ApiPropertyOptional({ description: 'The date the task was completed' })
  @Column({ type: DataType.DATE, field: 'completed_date' })
  @IsDate()
  @IsOptional()
  completedDate?: Date;
  /**
   * The date the task must be completed by
   */
  @ApiProperty({ description: 'The date the task must be completed by' })
  @Column({ type: DataType.DATE, field: 'due_date' })
  @IsDate()
  dueDate: Date;
  /**
   * The status of the task
   */
  @ApiProperty({ description: 'The status of the task', enum: TaskStatus, enumName: 'TaskStatus' })
  @Column({
    type: 'enum_task_status',
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;
  /**
   * The title of the task
   */
  @ApiProperty({ description: 'The title of the task' })
  @Column({ type: DataType.STRING(50) })
  @IsString()
  title: string;
  /**
   * The applicant the task is assigned to
   */
  @ApiProperty({ description: 'The applicant the task is assigned to' })
  @HasMany(() => Upload, 'task_id')
  uploads: Upload[];
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
