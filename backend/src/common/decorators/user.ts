import { BrokerCurrentUserDto } from 'src/api/brokers/current-user/current-user.dto';
import { BrokerDto } from 'src/models/brokers/broker.dto';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export default createParamDecorator((_: unknown, executionContext: ExecutionContext): BrokerDto => {
  return getUser<BrokerCurrentUserDto>(executionContext);
});

function getUser<T>(executionContext: ExecutionContext): T {
  const httpContext = executionContext.switchToHttp();
  const request = httpContext.getRequest();
  if (request.user) {
    return request.user as T;
  }
}
