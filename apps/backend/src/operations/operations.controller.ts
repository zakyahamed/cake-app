import { Controller, Get, Param } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Get('dashboard/:businessId')
  getDashboard(
    @CurrentUser() user: any,
    @Param('businessId') businessId: string,
  ) {
    return this.operationsService.getDashboard(user.userId, businessId);
  }

  @Get('earnings/:businessId')
  getEarnings(
    @CurrentUser() user: any,
    @Param('businessId') businessId: string,
  ) {
    return this.operationsService.getEarnings(user.userId, businessId);
  }
}
