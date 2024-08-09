import { Injectable, NotFoundException } from '@nestjs/common';
import { Playlist } from './entities/playlist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistRepository } from './playlist.repository';
import { MusicRepository } from 'src/music/music.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class PlaylistService {
    constructor(@InjectRepository(Playlist) private readonly playlistRepo: Repository<Playlist>, private readonly playlistRepository: PlaylistRepository, 
    private readonly userRepository: UserRepository, private readonly musicRepository: MusicRepository){}

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

    async create(data: CreatePlaylistDto): Promise<Playlist> {
        const newPlaylist = this.playlistRepo.create(data);
        newPlaylist.user = await this.userRepository.findOne(data.userId);
        return this.playlistRepo.save(newPlaylist);
    }
    
    async update(id: number, data: UpdatePlaylistDto): Promise<Playlist> {
        const playlist = await this.playlistRepository.findOne(id);
        if (!playlist) {
            throw new NotFoundException(`Playlist with ID ${id} not found`);
        } 

        if (data.userId) {
            playlist.user = await this.userRepository.findOne(data.userId);
        }

        if (data.order !== undefined && data.order !== playlist.order) {
            await this.reorderPlaylists(id, data.order);
        }

        await this.playlistRepo.update(id, data);
        return this.findOne(id);
    }

    async remove(id: number){
        const playlist = await this.findOne(id);
        await this.playlistRepo.remove(playlist);
    }

    async reorderPlaylists(id: number, newOrder: number) {
        const playlists = await this.playlistRepo.find({
            order: { order: 'ASC' }
        });

        const oldPlaylist = playlists.find(p => p.id === id);
        if (!oldPlaylist) {
            throw new NotFoundException(`Playlist with ID ${id} not found`);
        }

        const oldOrder = oldPlaylist.order;

        if (newOrder > oldOrder) {
            for (const music of playlists) {
                if (music.order > oldOrder && music.order <= newOrder) {
                    music.order--;
                }
            }
        } else if (newOrder < oldOrder) {
            for (const music of playlists) {
                if (music.order >= newOrder && music.order < oldOrder) {
                    music.order++;
                }
            }
        }

        oldPlaylist.order = newOrder;
        await this.playlistRepo.save(playlists);
    }

    async addMusicToPlaylist(playlistId: number, musicId: number): Promise<Playlist> {
        const playlist = await this.playlistRepository.findOneBy(playlistId, { relations: ['music'] });

        if (!playlist) {
            throw new NotFoundException(`Playlist with ID ${playlistId} not found`);
        }

        const music = await this.musicRepository.findOne(musicId);
        if (!music) {
            throw new NotFoundException(`Music with ID ${musicId} not found`);
        }

        playlist.music.push(music);
        return this.playlistRepo.save(playlist);
    }

    async removeMusicFromPlaylist(playlistId: number, musicId: number): Promise<Playlist> {
        const playlist = await this.playlistRepository.findOneBy(playlistId, { relations: ['music'] });
    
        if (!playlist) {
            throw new NotFoundException(`Playlist with ID ${playlistId} not found`);
        }
    
        const musicIndex = playlist.music.findIndex(m => m.id === musicId);
        if (musicIndex === -1) {
            throw new NotFoundException(`Music with ID ${musicId} not found in playlist`);
        }
    
        playlist.music.splice(musicIndex, 1);
        return this.playlistRepo.save(playlist);
    }

}
