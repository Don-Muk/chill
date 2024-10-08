import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { PlaylistRepository } from './playlist.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { UserModule } from 'src/user/user.module';
import { MusicModule } from 'src/music/music.module';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist]), UserModule, MusicModule],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistRepository],
})
export class PlaylistModule {}
