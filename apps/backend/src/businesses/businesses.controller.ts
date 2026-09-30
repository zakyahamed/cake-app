import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { CreateBusinessDto, UpdateBusinessDto } from './dto/businesses.dto';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @Post()
  create(@CurrentUser() user: any, @Body() dto: CreateBusinessDto) {
    return this.businessesService.create(user.userId, dto);
  }

  @Public()
  @Get()
  findAll(
    @Query('categoryId') categoryId?: string,
    @Query('search') search?: string,
    @Query('city') city?: string,
    @Query('rating') rating?: string,
    @Query('deliveryOption') deliveryOption?: string,
  ) {
    return this.businessesService.findAll({
      categoryId,
      search,
      city,
      rating: rating ? +rating : undefined,
      deliveryOption,
    });
  }

  @Public()
  @Get(':idOrSlug')
  findOne(@Param('idOrSlug') idOrSlug: string) {
    return this.businessesService.findOne(idOrSlug);
  }

  @Patch(':id')
  async update(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: UpdateBusinessDto,
  ) {
    const business = await this.businessesService.findOne(id);
    if (business.ownerId !== user.userId) {
      throw new UnauthorizedException('You do not own this business');
    }
    return this.businessesService.update(id, dto);
  }
}
