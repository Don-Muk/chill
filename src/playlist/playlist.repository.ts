import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './entities/playlist.entity';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistRepository {
    constructor(@InjectRepository(Playlist) private readonly playlistRepo: Repository<Playlist>){}

    async findAll(){
        return await this.playlistRepo
        .createQueryBuilder('playlist')
        .orderBy('playlist.order', 'ASC')
        .getMany()
    }

    async findOne(id: number){
        return await this.playlistRepo
        .createQueryBuilder('playlist')
        .andWhere('playlist.id = :id', {id})
        .getOne()
    }

    async create(data: CreatePlaylistDto){
        const newPlaylist = this.playlistRepo.create(data);
        return await this.playlistRepo.save(newPlaylist);
    }

    async update(id: number, data: UpdatePlaylistDto){
        await this.playlistRepo
        .createQueryBuilder('playlist')
        .update()
        .set(data)
        .andWhere('playlist.id = :id', {id})
        .execute()

        return this.playlistRepo.findOneBy({id})
    }

    async remove(id: number){
        return await this.playlistRepo.softDelete({id})
    }

    async findOneBy(id: number, options: { relations?: string[] }) {
        return await this.playlistRepo.findOne({
            where: { id },
            relations: options.relations
        });
    }
}