import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Public()
  @Get('businesses')
  searchBusinesses(
    @Query('q') q?: string,
    @Query('categoryId') categoryId?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20'
  ) {
    return this.searchService.searchBusinesses(q, categoryId, +page, +limit);
  }

  @Public()
  @Get('products')
  searchProducts(
    @Query('q') q?: string,
    @Query('categoryId') categoryId?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20'
  ) {
    return this.searchService.searchProducts(
      q,
      categoryId,
      minPrice ? +minPrice : undefined,
      maxPrice ? +maxPrice : undefined,
      +page,
      +limit
    );
  }

  @Public()
  @Get('services')
  searchServices(
    @Query('q') q?: string,
    @Query('categoryId') categoryId?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20'
  ) {
    return this.searchService.searchServices(
      q,
      categoryId,
      minPrice ? +minPrice : undefined,
      maxPrice ? +maxPrice : undefined,
      +page,
      +limit
    );
  }
}
