import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './entities/playlist.entity';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistRepository {
    constructor(@InjectRepository(Playlist) private readonly playlistRepo: Repository<Playlist>){}

    findAll(){
        return this.playlistRepo
        .createQueryBuilder('playlist')
        .getMany()
    }

    findOne(id: number){
        return this.playlistRepo
        .createQueryBuilder('playlist')
        .andWhere('playlist.id = :id', {id})
        .getOne()
    }

    create(data: CreatePlaylistDto){
        const newPlaylist = this.playlistRepo.create(data);
        return this.playlistRepo.save(newPlaylist);
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

    remove(id: number){
        return this.playlistRepo.softDelete({id})
    }
}