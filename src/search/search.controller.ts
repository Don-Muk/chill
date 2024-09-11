import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { PublicGuard } from 'src/auth/guards/public.guard';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService){}

    @UseGuards(PublicGuard)
    @Get()
    search(@Query('search') search: string, @Query('category') category: string){
        return this.searchService.search(search,category);
    }
}
