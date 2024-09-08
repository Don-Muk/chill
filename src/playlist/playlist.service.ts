import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    async findAll(): Promise<Playlist[]> {
        try {
            return await this.playlistRepository.findAll();
        } catch (error) {
            throw new BadRequestException('Failed to retrieve playlists');
        }
    }

    async findOne(id: number): Promise<Playlist> {
        try {
            const playlist = await this.playlistRepository.findOne(id);
            if (!playlist) {
                throw new NotFoundException(`Playlist with ID ${id} not found`);
            }
            return playlist;
        } catch (error) {
            throw new BadRequestException('Failed to retrieve playlist');
        }
    }

    async create(data: CreatePlaylistDto): Promise<Playlist> {
        try {
            const user = await this.userRepository.findOne(data.userId);
            if (!user) {
                throw new NotFoundException(`User with ID ${data.userId} not found`);
            }
            const newPlaylist = this.playlistRepo.create(data);
            newPlaylist.user = user;
            return await this.playlistRepo.save(newPlaylist);
        } catch (error) {
            throw new BadRequestException('Failed to create playlist');
        }
    }
    
    async update(id: number, data: UpdatePlaylistDto): Promise<Playlist> {
        try {
            const playlist = await this.playlistRepository.findOne(id);
            if (!playlist) {
                throw new NotFoundException(`Playlist with ID ${id} not found`);
            }

            if (data.userId) {
                const user = await this.userRepository.findOne(data.userId);
                if (!user) {
                    throw new NotFoundException(`User with ID ${data.userId} not found`);
                }
                playlist.user = user;
            }

            if (data.order !== undefined && data.order !== playlist.order) {
                await this.reorderPlaylists(id, data.order);
            }

            await this.playlistRepo.update(id, data);
            return this.findOne(id);
        } catch (error) {
            throw new BadRequestException('Failed to update playlist');
        }
    }

    async remove(id: number): Promise<void> {
        try {
            const playlist = await this.findOne(id);
            await this.playlistRepo.remove(playlist);
        } catch (error) {
            throw new BadRequestException('Failed to remove playlist');
        }
    }

    async reorderPlaylists(id: number, newOrder: number): Promise<void> {
        try {
            const playlists = await this.playlistRepo.find({
                order: { order: 'ASC' }
            });

            const oldPlaylist = playlists.find(p => p.id === id);
            if (!oldPlaylist) {
                throw new NotFoundException(`Playlist with ID ${id} not found`);
            }

            const oldOrder = oldPlaylist.order;

            if (newOrder > oldOrder) {
                playlists.forEach(playlist => {
                    if (playlist.order > oldOrder && playlist.order <= newOrder) {
                        playlist.order--;
                    }
                });
            } else if (newOrder < oldOrder) {
                playlists.forEach(playlist => {
                    if (playlist.order >= newOrder && playlist.order < oldOrder) {
                        playlist.order++;
                    }
                });
            }

            oldPlaylist.order = newOrder;
            await this.playlistRepo.save(playlists);
        } catch (error) {
            throw new BadRequestException('Failed to reorder playlists'); 
        }
    }

    async addMusicToPlaylist(playlistId: number, musicId: number): Promise<Playlist> {
        try {
            const playlist = await this.playlistRepository.findOneBy(playlistId, { relations: ['music'] });
            if (!playlist) {
                throw new NotFoundException(`Playlist with ID ${playlistId} not found`);
            }

            const music = await this.musicRepository.findOne(musicId);
            if (!music) {
                throw new NotFoundException(`Music with ID ${musicId} not found`);
            }

            playlist.music.push(music);
            return await this.playlistRepo.save(playlist);
        } catch (error) {
            throw new BadRequestException('Failed to add music to playlist');
        }
    }

    async removeMusicFromPlaylist(playlistId: number, musicId: number): Promise<Playlist> {
        try {
            const playlist = await this.playlistRepository.findOneBy(playlistId, { relations: ['music'] });
            if (!playlist) {
                throw new NotFoundException(`Playlist with ID ${playlistId} not found`);
            }

            const musicIndex = playlist.music.findIndex(m => m.id === musicId);
            if (musicIndex === -1) {
                throw new NotFoundException(`Music with ID ${musicId} not found in playlist`);
            }

            playlist.music.splice(musicIndex, 1);
            return await this.playlistRepo.save(playlist); 
        } catch (error) {
            throw new BadRequestException('Failed to remove music from playlist');
        }
    }
}
