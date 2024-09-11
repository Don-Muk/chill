import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthorGuard } from 'src/auth/guards/author.guard';
import { PublicGuard } from 'src/auth/guards/public.guard';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}


  @UseGuards(AuthGuard,AuthorGuard)
  @Post()
  async create(@Body() createMusicDto: CreateMusicDto) {
    return await this.musicService.create(createMusicDto);
  }

  @UseGuards(PublicGuard)
  @Get()
  findAll() {
    return this.musicService.findAll();
  }

  @UseGuards(PublicGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicService.findOne(+id);
  }

  @UseGuards(AuthGuard,AuthorGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return this.musicService.update(+id, updateMusicDto);
  }

  @UseGuards(AuthGuard,AuthorGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicService.remove(+id);
  }
}
