import { APPLICATION_REPOSITORY } from 'src/common/constants/repositories';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Application } from 'src/models/applications/application.entity';
import {
  ApplicationDto,
  BrokerApplicationPostResponseDto,
  BrokerApplicationsListBadRequestResponseDto,
  BrokerApplicationsListRequestDto,
  BrokerApplicationsListResponseDto,
} from './list-applications.dto';
import { ApplicationStatus } from 'src/enums/application-status.enum';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BrokerDto } from 'src/models/brokers/broker.dto';
import { BrokerGuard } from '../../broker.guard';
import { INTERNAL_SERVER_ERROR } from 'src/common/constants/response-messages';
import { InternalServerErrorResponseDto } from 'src/common/responses';
import { Op } from 'sequelize';
import { Task } from 'src/models/tasks/task.entity';
import { TaskStatus } from 'src/enums/task-status.enum';
import { createDateFilter } from 'src/common/query-filters';
import { formatResponseTable } from 'src/common/swagger';
import User from 'src/common/decorators/user';

/**
 * Broker API endpoint for listing applications they have submitted with optional result filtering.
 */
@Controller('brokers/applications')
@ApiTags('Broker API')
export class BrokerApplicationsListController {
  /**
   * Initializes the controller
   * @param applicationEntity {Application} Database entity for querying the applications table
   */
  constructor(
    @Inject(APPLICATION_REPOSITORY)
    private applicationEntity: typeof Application,
  ) {}

  /**
   * Fetches the applications that the broker has submitted.  The applications are optionally filtered
   * by date via the query string parameters, and by the status of the task being pending or complete.
   * @param query {BrokerApplicationsListRequestDto} The query payload
   * @returns {BrokerApplicationsListResponseDto}
   */
  @Get('list-applications')
  @UseGuards(BrokerGuard)
  @ApiBearerAuth('BROKER')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Finds applications belonging to a broker',
    description:
      'Fetches the applications that the broker has submitted.  The applications are optionally filtered by date via the query string parameters, and by the status of the task being pending or complete.',
  })
  @ApiOkResponse({
    type: BrokerApplicationsListResponseDto,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponseDto,
    description: `Returns \`${INTERNAL_SERVER_ERROR}\` when the result could not be computed`,
  })
  @ApiBadRequestResponse({
    type: BrokerApplicationsListBadRequestResponseDto,
    description: formatResponseTable({}),
  })
  async find(
    @User() user: BrokerDto,
    @Query() query: BrokerApplicationsListRequestDto,
  ): Promise<BrokerApplicationsListResponseDto> {
    let dateFilter;
    try {
      dateFilter = createDateFilter('createdAt', query.minimumDate, query.maximumDate);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    const relatedData = [];
    if (query.completed) {
      relatedData.push({
        model: Task,
        where: {
          status: TaskStatus.Completed,
          assignedToBrokerId: user.id,
        },
      });
    } else {
      relatedData.push({
        model: Task,
        where: {
          status: TaskStatus.Pending,
          assignedToBrokerId: user.id,
        },
        required: false,
      });
    }
    const whereOptions = {
      brokerId: user.id,
      ...dateFilter,
    };
    if (query.status) {
      whereOptions.status = { [Op.in]: query.status };
      console.log(whereOptions);
    }
    const applications = await this.applicationEntity.findAll({
      where: whereOptions,
      include: relatedData,
    });
    return {
      success: true,
      applications,
    };
  }

  @Post('create-applications')
  @UseGuards(BrokerGuard)
  @ApiBearerAuth('BROKER')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Create applications',
    description: 'Create the applications that the broker has submitted.',
  })
  @ApiOkResponse({
    type: BrokerApplicationPostResponseDto,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponseDto,
    description: `Returns \`${INTERNAL_SERVER_ERROR}\` when the result could not be computed`,
  })
  @ApiBadRequestResponse({
    type: BrokerApplicationsListBadRequestResponseDto,
    description: formatResponseTable({}),
  })
  async post(@User() user: BrokerDto, @Body() body: ApplicationDto): Promise<BrokerApplicationPostResponseDto> {
    const avgLoanAmount = await this.applicationEntity.getAverageLoanAmount();
    const loanAmount = avgLoanAmount === body.loanAmount ? 0 : body.loanAmount;
    await this.applicationEntity.create({
      ...body,
      status: ApplicationStatus.Submitted,
      brokerId: user.id,
    });
    const response: any = {
      success: true,
    };
    if (loanAmount !== 0) {
      response.loanAmount = loanAmount;
    }
    return response;
  }
}
