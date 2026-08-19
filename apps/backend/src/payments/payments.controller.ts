import { Controller, Get, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, ConfirmPaymentDto } from './dto/payments.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-intent')
  createPaymentIntent(@CurrentUser() user: any, @Body() dto: CreatePaymentDto) {
    return this.paymentsService.createPaymentIntent(user.userId, dto);
  }

  /**
   * In production this would be a webhook endpoint called by Stripe,
   * so it's marked @Public (no JWT required).
   */
  @Public()
  @Post('confirm')
  confirmPayment(@Body() dto: ConfirmPaymentDto) {
    return this.paymentsService.confirmPayment(dto);
  }

  @Get('me')
  getMyPayments(@CurrentUser() user: any) {
    return this.paymentsService.getMyPayments(user.userId);
  }
}
