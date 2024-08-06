import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistService } from './playlist.service';

@Controller('playlist')
export class PlaylistController {
    constructor(private readonly playlistService: PlaylistService){}

    @Get()
    findAll(){
        return this.playlistService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.playlistService.findOne(+id);
    }

    @Post()
    create(@Body() data: CreatePlaylistDto){
        return this.playlistService.create(data);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: UpdatePlaylistDto){
        return this.playlistService.update(+id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.playlistService.remove(+id);
    }
}
