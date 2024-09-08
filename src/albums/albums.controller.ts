import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumsDto } from './dtos/create-albums.dto';
import { UpdateAlbumsDto } from './dtos/update-albums.dto';
import { AuthorGuard } from 'src/auth/guards/author.guard';
import { PublicGuard } from 'src/auth/guards/public.guard';

@Controller('albums')
export class AlbumsController {
    constructor(private readonly albumsService: AlbumsService){}
    
    @UseGuards(PublicGuard)
    @Get()
    findAll(){
        return this.albumsService.findAll();
    }

    @UseGuards(PublicGuard)
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.albumsService.findOne(+id);
    }

    @UseGuards(AuthorGuard)
    @Post()
    create(@Body() createAlbumsDto: CreateAlbumsDto){
        return this.albumsService.create(createAlbumsDto);
    }

    @UseGuards(AuthorGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAlbumsDto: UpdateAlbumsDto){
        return this.albumsService.update(+id, updateAlbumsDto);
    }

    @UseGuards(AuthorGuard)
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.albumsService.remove(+id);
    }
}
