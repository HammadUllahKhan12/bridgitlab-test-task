import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, HttpCode, HttpException, HttpStatus, Inject, Patch, Query, UseGuards } from '@nestjs/common';
import { BrokerDto } from 'src/models/brokers/broker.dto';
import { BrokerGuard } from '../../broker.guard';
import {
  BrokerTasksUpdateBadRequestResponseDto,
  BrokerTasksUpdateBodyDto,
  BrokerTasksUpdateQueryDto,
  BrokerTasksUpdateResponseDto,
} from './update-task.dto';
import {
  INTERNAL_SERVER_ERROR,
  INVALID_USER_ERROR,
  TASK_NOT_FOUND_ERROR,
  TASK_SUBMITTED_ERROR,
  TASK_UPLOADS_EXCEEDED_ERROR,
} from 'src/common/constants/response-messages';
import { InternalServerErrorResponseDto } from 'src/common/responses';
import { TASK_REPOSITORY } from 'src/common/constants/repositories';
import { Task } from 'src/models/tasks/task.entity';
import { TaskStatus } from 'src/enums/task-status.enum';
import { Upload } from 'src/models/uploads/upload.entity';
import { formatResponseTable } from 'src/common/swagger';
import User from 'src/common/decorators/user';

/**
 * Broker API endpoint for listing tasks with optional filters
 */
@Controller('brokers/tasks')
@ApiTags('Broker API')
export class BrokerTasksUpdateController {
  /**
   * Initializes the controller's dependencies injected by NestJS
   * @param applicationEntity {Application} Database entity for querying the applications table
   * @param taskEntity {Broker} Task entity for querying the tasks table
   */
  constructor(
    @Inject(TASK_REPOSITORY)
    private taskEntity: typeof Task,
  ) {}

  /**
   * Updates a task to complete a requirement assigned to the broker
   * such as submitting supporting documentation for an application
   * and optionally marks the task as ready for review when all files
   * have been provided.
   * @param query {BrokerTasksUpdateQueryDto} The query payload specifying the task
   * @param body {BrokerTasksUpdateBodyDto} The information or file(s) required to complete the task
   * @returns {BrokerTasksUpdateResponseDto}
   */
  @Patch('update-task')
  @UseGuards(BrokerGuard)
  @ApiBearerAuth('BROKER')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Updates a task with an uploaded file',
    description: 'Uploads a file and if specified as completed sets the task to the review status',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: BrokerTasksUpdateResponseDto,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponseDto,
    description: `Returns \`${INTERNAL_SERVER_ERROR}\` when the result could not be computed`,
  })
  @ApiBadRequestResponse({
    type: BrokerTasksUpdateBadRequestResponseDto,
    description: formatResponseTable({}),
  })
  async update(
    @User() user: BrokerDto,
    @Query() query: BrokerTasksUpdateQueryDto,
    @Body() body: BrokerTasksUpdateBodyDto,
  ): Promise<BrokerTasksUpdateResponseDto> {
    const task = await this.taskEntity.findByPk(query.taskId.toString(), {
      include: [Upload],
    });
    if (!task?.id) {
      throw new HttpException(TASK_NOT_FOUND_ERROR, HttpStatus.BAD_REQUEST);
    }
    if (task.assignedToBrokerId !== user.id) {
      throw new HttpException(INVALID_USER_ERROR, HttpStatus.BAD_REQUEST);
    }
    if (task.status !== TaskStatus.Pending) {
      throw new HttpException(TASK_SUBMITTED_ERROR, HttpStatus.BAD_REQUEST);
    }
    if (task.uploads?.length === 5) {
      throw new HttpException(TASK_UPLOADS_EXCEEDED_ERROR, HttpStatus.BAD_REQUEST);
    }
    await Upload.create({
      applicationId: task.applicationId,
      taskId: task.id,
      brokerId: user.id,
      file: Buffer.from(body.file, 'base64'),
    });
    if (body.complete) {
      task.completedDate = new Date();
      task.status = TaskStatus.ReviewRequired;
      await task.save();
    }
    return {
      success: true,
    };
  }
}
