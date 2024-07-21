import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { MusicModule } from 'src/musics/dto/entities/music.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports: [MusicModule, AlbumsModule, AuthorsModule, AuthorsModule],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
