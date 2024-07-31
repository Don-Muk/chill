import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicRepository } from './music.repository';

@Injectable()
export class MusicService {

  constructor(private readonly musicRepository:MusicRepository){}

  async create(createMusicDto: CreateMusicDto) {
    return await this.musicRepository.create(createMusicDto);
  }

  findAll() {
    return this.musicRepository.findAll();
  }

  findOne(id: number) {
    return this.musicRepository.findOne(id);
  }

  update(id: number, updateMusicDto: UpdateMusicDto) {
    return this.musicRepository.update(id,updateMusicDto);
  }

  remove(id: number) {
    return this.musicRepository.remove(id);
  }
}
