import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumsRepository } from 'src/albums/albums.repository';
import { AuthorRepository } from 'src/authors/authors.repository';
import { MusicRepository } from 'src/music/music.repository';

@Injectable()
export class SearchService {
    constructor(
        private readonly musicsRepository: MusicRepository,
        private readonly albumsRepository: AlbumsRepository,
        private readonly authorRepository: AuthorRepository
    ) {}

    async search(search: string, category: string) {
        if (category === 'music') {
            const music = await this.musicsRepository.findByMusic(search);
            if (!music) {
                throw new NotFoundException(`Not found musics`);
            } else {
                return music;
            }
        } else if (category === 'album') {
            const album = await this.albumsRepository.findByAlbum(search);
            if (!album) {
                throw new NotFoundException('Not found albums');
            } else {
                return album;
            }
        } else if (category === 'author') {
            const author = await this.authorRepository.findByAuthor(search);
            if (!author) {
                throw new NotFoundException('Not found authors');
            } else {
                return author;
            }
        }
        const [author, album, music] = await Promise.all([
            this.authorRepository.findByAuthor(search),
            this.albumsRepository.findByAlbum(search),
            this.musicsRepository.findByMusic(search),
        ]);

        return { author, album, music };
    }
}