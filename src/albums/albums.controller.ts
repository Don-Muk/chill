import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumsDto } from './dtos/create-albums.dto';
import { UpdateAlbumsDto } from './dtos/update-albums.dto';

@Controller('albums')
export class AlbumsController {
    constructor(private readonly albumsService: AlbumsService){}
    
    @Get()
    findAll(){
        return this.albumsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.albumsService.findOne(+id);
    }

    @Post()
    create(@Body() createAlbumsDto: CreateAlbumsDto){
        return this.albumsService.create(createAlbumsDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAlbumsDto: UpdateAlbumsDto){
        return this.albumsService.update(+id, updateAlbumsDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.albumsService.remove(+id);
    }
}
