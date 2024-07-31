import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Albums } from './entities/albums.entity';
import { UpdateAlbumsDto } from './dtos/update-albums.dto';
import { CreateAlbumsDto } from './dtos/create-albums.dto';

@Injectable()
export class AlbumsRepository {
    constructor(@InjectRepository(Albums) private readonly albumsRepo: Repository<Albums>){}

    findAll(){
        return this.albumsRepo
        .createQueryBuilder('albums')
        .getMany()
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
}