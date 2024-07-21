import { Injectable } from '@nestjs/common';
import { AlbumsRepository } from 'src/albums/albums.repository';
import { AuthorRepository } from 'src/authors/authors.repository';
import { MusicRepository } from 'src/musics/dto/entities/music.repository';

@Injectable()
export class SearchService {
    constructor(
        private readonly musicsRepository: MusicRepository,
        private readonly albumsRepository: AlbumsRepository,
        private readonly authorRepository: AuthorRepository
    ) {}

    async search(search: string, category: string) {
        if (category === 'music') {
            const music = await this.musicsRepository.findBySearch(search);
            return music ?? 'not found music';
        }

        if (category === 'album') {
            const album = await this.albumsRepository.findBySearch(search);
            return album ?? 'not found album';
        }

        if (category === 'author') {
            const author = await this.authorRepository.findBySearch(search);
            return author ?? 'not found author';
        }

        const [author, album, music] = await Promise.all([
            this.authorRepository.findBySearch(search),
            this.albumsRepository.findBySearch(search),
            this.musicsRepository.findBySearch(search),
        ]);

        return { author, album, music };
    }
}