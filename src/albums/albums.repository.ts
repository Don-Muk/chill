import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Albums } from './entities/albums.entity';
import { UpdateAlbumsDto } from './dtos/update-albums.dto';
import { CreateAlbumsDto } from './dtos/create-albums.dto';
import { MusicEntity } from 'src/music/entities/music.entity';
import { Listeners } from 'src/listeners/entities/listeners.entity';

@Injectable()
export class AlbumsRepository {
    constructor(@InjectRepository(Albums) private readonly albumsRepo: Repository<Albums>){}

    findAll(){
        return this.albumsRepo
        .createQueryBuilder('albums')
        .getMany()
    }

    async findAllOrderBy() {
        return this.albumsRepo 
        .createQueryBuilder('albums')
        .leftJoinAndSelect(MusicEntity, 'music_entity', 'music_entity.albumsId = albums.id')
        .leftJoin(Listeners, 'listeners', 'music_entity.id = listeners.musicId')
        .select([
            'albums.*',
            'COUNT(listeners.id) AS totalAlbumListeners'
        ])
        .groupBy('albums.id')
        .orderBy('totalAlbumListeners', 'DESC')
        .getRawMany();
    }
    findOne(id: number){
        return this.albumsRepo
        .createQueryBuilder('albums')
        .andWhere('albums.id = :id', {id})
        .getOne()
    }

    create(data: CreateAlbumsDto){
        const newAlbum = this.albumsRepo.create(data);
        return this.albumsRepo.save(newAlbum);
    }

    async update(id: number, data: UpdateAlbumsDto){
        await this.albumsRepo
        .createQueryBuilder('albums')
        .update()
        .set(data)
        .andWhere('albums.id = :id', {id})
        .execute()

        return this.albumsRepo.findOneBy({id})
    }

    remove(id: number){
        return this.albumsRepo.softDelete({id})
    }

    findByAlbum(search: string) {
        return this.albumsRepo
            .createQueryBuilder('albums')
            .where('albums.title Like :search', { search: `%${search}%` })
            .getMany();
    }
}