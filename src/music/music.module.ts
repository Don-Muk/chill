import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';
import { MusicRepository } from './music.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MusicEntity])],
  controllers: [MusicController],
  providers: [MusicService,MusicRepository],
  exports: [MusicRepository], // Add this line
})
export class MusicModule {}
