import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Application } from 'src/models/applications/application.entity';
import { BrokerDto } from 'src/models/brokers/broker.dto';
import { BrokerGuard } from '../../broker.guard';
import {
  BrokerTasksListBrokerApplicationsListBadRequestResponseDto,
  BrokerTasksListRequestDto,
  BrokerTasksListResponseDto,
} from './list-tasks.dto';
import { Controller, Get, HttpCode, HttpException, HttpStatus, Inject, Query, UseGuards } from '@nestjs/common';
import { INTERNAL_SERVER_ERROR } from 'src/common/constants/response-messages';
import { InternalServerErrorResponseDto } from 'src/common/responses';
import { Op } from 'sequelize';
import { TASK_REPOSITORY } from 'src/common/constants/repositories';
import { Task } from 'src/models/tasks/task.entity';
import { TaskStatus } from 'src/enums/task-status.enum';
import { createDateFilter } from 'src/common/query-filters';
import { formatResponseTable } from 'src/common/swagger';
import User from 'src/common/decorators/user';

/**
 * Broker API endpoint for listing tasks with optional filters
 */
@Controller('brokers/tasks')
@ApiTags('Broker API')
export class BrokerTasksListController {
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
   * Receives an applicant's financial information and evaluates their eligiblity for a loan
   * @param query {ListApplicationsDto} The query payload
   * @returns {BrokerTasksListResponseDto}
   */
  @Get('list-tasks')
  @UseGuards(BrokerGuard)
  @ApiBearerAuth('BROKER')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Finds applications belonging to a broker',
    description: 'Uses various querystring parameters to filter the applications associated with a broker',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: BrokerTasksListResponseDto,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponseDto,
    description: `Returns \`${INTERNAL_SERVER_ERROR}\` when the result could not be computed`,
  })
  @ApiBadRequestResponse({
    type: BrokerTasksListBrokerApplicationsListBadRequestResponseDto,
    description: formatResponseTable({}),
  })
  async find(@User() user: BrokerDto, @Query() query: BrokerTasksListRequestDto): Promise<BrokerTasksListResponseDto> {
    let dueDateFilter;
    try {
      dueDateFilter = createDateFilter('dueDate', query.minimumDateDue, query.maximumDateDue);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    let completedDateFilter;
    try {
      completedDateFilter = createDateFilter('completedDate', query.minimumDateCompleted, query.maximumDateCompleted);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    const statusFilter: Record<string, string> = {};
    if (query?.status) {
      statusFilter.status = query.status;
    }
    const tasks = await this.taskEntity.findAll({
      where: {
        assignedToBrokerId: user.id,
        ...statusFilter,
        ...dueDateFilter,
        ...completedDateFilter,
      },
      include: [
        {
          model: Application,
          attributes: ['id', 'createdAt', 'status', 'loanAmount', 'loanDuration'],
          where: {
            status: {
              [Op.ne]: TaskStatus.Cancelled,
            },
          },
        },
      ],
    });
    return {
      success: true,
      tasks,
    };
  }
}
