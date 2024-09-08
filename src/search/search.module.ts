import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { AlbumsModule } from 'src/albums/albums.module';
import { AuthorsModule } from 'src/authors/authors.module';
import { MusicModule } from 'src/music/music.module';

@Module({
  imports: [MusicModule, AlbumsModule, AuthorsModule],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
