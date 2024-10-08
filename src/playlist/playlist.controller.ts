import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistService } from './playlist.service';
import { NotFoundException } from '@nestjs/common';
import { PublicGuard } from 'src/auth/guards/public.guard';
import { UserGuard } from 'src/auth/guards/user.guard';

@Controller('playlist')
export class PlaylistController {
    constructor(private readonly playlistService: PlaylistService){}

    @UseGuards(UserGuard)
    @Get()
    async findAll() {
        try {
            return await this.playlistService.findAll();
        } catch (error) {
            throw new Error('Failed to retrieve playlists');
        }
    }

    @UseGuards(UserGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.playlistService.findOne(+id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new Error('Failed to retrieve the playlist');
        }
    }

    @UseGuards(UserGuard)
    @Post()
    async create(@Body() data: CreatePlaylistDto) {
        try {
            return await this.playlistService.create(data);
        } catch (error) {
            throw new Error('Failed to create playlist');
        }
    }

    @UseGuards(UserGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: UpdatePlaylistDto) {
        try {
            return await this.playlistService.update(+id, data);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new Error('Failed to update playlist');
        }
    }

    @UseGuards(UserGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            return await this.playlistService.remove(+id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new Error('Failed to delete playlist');
        }
    }

    @UseGuards(UserGuard)
    @Post(':playlistId/:musicId')
    async addMusic(@Param('playlistId') playlistId: string, @Param('musicId') musicId: string) {
        try {
            return await this.playlistService.addMusicToPlaylist(+playlistId, +musicId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new Error('Failed to add music to playlist');
        }
    }

    @UseGuards(UserGuard)
    @Delete(':playlistId/:musicId')
    async removeMusic(@Param('playlistId') playlistId: string, @Param('musicId') musicId: string) {
        try {
            return await this.playlistService.removeMusicFromPlaylist(+playlistId, +musicId);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new Error('Failed to remove music from playlist');
        }
    }
}