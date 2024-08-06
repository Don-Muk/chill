import { Injectable, NotFoundException } from '@nestjs/common';
import { Playlist } from './entities/playlist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistRepository } from './playlist.repository';
@Injectable()
export class PlaylistService {
    constructor(@InjectRepository(Playlist) private readonly playlistRepo: Repository<Playlist>, private readonly playlistRepository: PlaylistRepository){}

    findAll(){
        return this.playlistRepository.findAll();
    }

    async findOne(id: number){
        const playlist = await this.playlistRepository.findOne(id);
        if (!playlist) {
            throw new NotFoundException(`Playlist with ID ${id} not found`);
        }
        return playlist;
    }

    create(data: CreatePlaylistDto): Promise<Playlist> {
        const newPlaylist = this.playlistRepo.create(data);
        return this.playlistRepo.save(newPlaylist);
    }
    
    async update(id: number, data: UpdatePlaylistDto): Promise<Playlist> {
        const playlist = await this.playlistRepository.findOne(id);
        if (!playlist) {
            throw new NotFoundException(`Playlist with ID ${id} not found`);
        } 
        await this.playlistRepo.update(id, data);
        return this.findOne(id);
    }

    async remove(id: number){
        const playlist = await this.findOne(id);
        await this.playlistRepo.remove(playlist);
    }
}
